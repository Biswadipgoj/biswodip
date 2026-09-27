'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * LiveReplay — a looping, recorded-style session played over a project's real screenshot:
 * the site opens behind a loading bar, then a cursor moves, clicks, types into the real fields
 * and (for Nexora) drags a board card. Coordinates are percentages of the screenshot itself and
 * are mapped through object-fit: cover / object-position: top so they stay on target at every
 * container size. Purely decorative (aria-hidden); the screenshot and its alt text remain the
 * accessible content. Reduced motion and no-JS render the still screenshot only.
 */
type Box = { x: number; y: number; w: number; h: number };
type Step =
  | { kind: 'move'; x: number; y: number; ms?: number }
  | { kind: 'click' }
  | { kind: 'type'; box: Box; text: string; mask?: boolean }
  | { kind: 'drag'; from: Box; x: number; y: number; ms?: number }
  | { kind: 'toast'; x: number; y: number; text: string }
  | { kind: 'wait'; ms: number };
type Script = { ratio: number; start: { x: number; y: number }; steps: Step[] };

const SCRIPTS: Record<string, Script> = {
  erpixa: {
    ratio: 1.6,
    start: { x: 70, y: 82 },
    steps: [
      { kind: 'move', x: 46, y: 54.6 }, { kind: 'click' },
      { kind: 'type', box: { x: 41.2, y: 53.1, w: 17.6, h: 3 }, text: 'recruiter@company.com' },
      { kind: 'move', x: 46, y: 61.4, ms: 520 }, { kind: 'click' },
      { kind: 'type', box: { x: 41.2, y: 59.9, w: 15.5, h: 3 }, text: '••••••••••', mask: true },
      { kind: 'move', x: 50, y: 66, ms: 560 }, { kind: 'click' },
      { kind: 'wait', ms: 900 },
    ],
  },
  nanolink: {
    ratio: 1.6,
    start: { x: 78, y: 30 },
    steps: [
      { kind: 'move', x: 44, y: 49.1 }, { kind: 'click' },
      { kind: 'type', box: { x: 40.4, y: 47.8, w: 8.1, h: 2.7 }, text: 'example.com/launch' },
      { kind: 'move', x: 58.8, y: 49.1, ms: 620 }, { kind: 'click' },
      { kind: 'toast', x: 50, y: 58.5, text: 'nanl.vercel.app/read' },
      { kind: 'move', x: 63, y: 62.5, ms: 700 },
      { kind: 'wait', ms: 1100 },
    ],
  },
  telepoint: {
    ratio: 1.44,
    start: { x: 76, y: 24 },
    steps: [
      { kind: 'move', x: 55.6, y: 45.3 }, { kind: 'click' },
      { kind: 'move', x: 44.4, y: 45.3, ms: 520 }, { kind: 'click' },
      { kind: 'move', x: 46, y: 56.6, ms: 560 }, { kind: 'click' },
      { kind: 'type', box: { x: 41.5, y: 55.1, w: 19, h: 3 }, text: 'admin' },
      { kind: 'move', x: 46, y: 64.8, ms: 520 }, { kind: 'click' },
      { kind: 'type', box: { x: 41.5, y: 63.3, w: 16.3, h: 3 }, text: '••••••••••', mask: true },
      { kind: 'move', x: 50, y: 71, ms: 560 }, { kind: 'click' },
      { kind: 'wait', ms: 900 },
    ],
  },
  nexora: {
    ratio: 1.6,
    start: { x: 80, y: 20 },
    steps: [
      { kind: 'move', x: 56.4, y: 32.6 }, { kind: 'click' },
      { kind: 'move', x: 20, y: 59.5, ms: 780 },
      { kind: 'drag', from: { x: 9.4, y: 56.2, w: 25.6, h: 7.6 }, x: 75.7, y: 68.6, ms: 1500 },
      { kind: 'wait', ms: 1200 },
    ],
  },
  tripmate: {
    ratio: 1.6,
    start: { x: 72, y: 76 },
    steps: [
      { kind: 'move', x: 50, y: 26.2 }, { kind: 'click' },
      { kind: 'move', x: 50, y: 37.3, ms: 560 }, { kind: 'click' },
      { kind: 'move', x: 44, y: 45.6, ms: 620 },
      { kind: 'move', x: 57, y: 47.8, ms: 900 },
      { kind: 'wait', ms: 900 },
    ],
  },
};

const ease = 'cubic-bezier(.45,.05,.25,1)';
const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

export function LiveReplay({ slug, image }: { slug: string; image: string }) {
  const script = SCRIPTS[slug];
  const rootRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!script) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [script]);

  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root || !script) return;
    const host = root.parentElement as HTMLElement;
    const q = <T extends HTMLElement>(sel: string) => root.querySelector(sel) as T;
    const cursor = q<HTMLDivElement>('.replay-cursor');
    const ripple = q<HTMLSpanElement>('.replay-ripple');
    const veil = q<HTMLDivElement>('.replay-veil');
    const bar = q<HTMLSpanElement>('.replay-bar');
    const clock = q<HTMLSpanElement>('.replay-clock');
    const layer = q<HTMLDivElement>('.replay-layer');

    let visible = false;
    let run = 0;
    let started = 0;
    let wake: (() => void) | null = null;
    let pos = { ...script.start };

    // Map a point on the screenshot (percent) into container pixels, honoring cover/top.
    const frame = () => {
      const W = host.clientWidth, H = host.clientHeight;
      const scale = Math.max(W / (script.ratio * 100), H / 100);
      const iw = script.ratio * 100 * scale, ih = 100 * scale;
      return { W, H, iw, ih, ox: (W - iw) / 2, oy: 0 };
    };
    const px = (x: number, y: number) => {
      const f = frame();
      return { left: f.ox + (x / 100) * f.iw, top: f.oy + (y / 100) * f.ih };
    };
    const boxPx = (b: Box) => {
      const f = frame();
      return { left: f.ox + (b.x / 100) * f.iw, top: f.oy + (b.y / 100) * f.ih, width: (b.w / 100) * f.iw, height: (b.h / 100) * f.ih, f };
    };
    const place = (el: HTMLElement, x: number, y: number) => {
      const p = px(x, y);
      el.style.transform = `translate3d(${p.left}px,${p.top}px,0)`;
    };
    const alive = (id: number) => id === run;
    const gate = async (id: number) => {
      while (alive(id) && !visible) await new Promise<void>(r => { wake = r; });
    };

    const moveTo = async (id: number, x: number, y: number, ms = 700, extra?: HTMLElement, dx = 0, dy = 0) => {
      const a = px(pos.x, pos.y), b = px(x, y);
      const kf = [{ transform: `translate3d(${a.left}px,${a.top}px,0)` }, { transform: `translate3d(${b.left}px,${b.top}px,0)` }];
      const anims = [cursor.animate(kf, { duration: ms, easing: ease, fill: 'forwards' })];
      if (extra) anims.push(extra.animate([
        { transform: `translate3d(${a.left - dx}px,${a.top - dy}px,0) rotate(-2deg) scale(1.04)` },
        { transform: `translate3d(${b.left - dx}px,${b.top - dy}px,0) rotate(1.5deg) scale(1.04)` },
      ], { duration: ms, easing: ease, fill: 'forwards' }));
      await Promise.all(anims.map(an => an.finished.catch(() => undefined)));
      pos = { x, y };
      if (alive(id)) place(cursor, x, y);
    };
    const click = async () => {
      const p = px(pos.x, pos.y);
      ripple.style.transform = `translate3d(${p.left}px,${p.top}px,0)`;
      cursor.animate([{ scale: '1' }, { scale: '.82' }, { scale: '1' }], { duration: 260, easing: 'ease-out' });
      await ripple.animate([{ opacity: .85, scale: '.2' }, { opacity: 0, scale: '1.9' }], { duration: 520, easing: 'ease-out' }).finished.catch(() => undefined);
    };
    const type = async (id: number, box: Box, text: string, mask?: boolean) => {
      const r = boxPx(box);
      const field = document.createElement('span');
      field.className = 'replay-field' + (mask ? ' is-mask' : '');
      Object.assign(field.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', fontSize: Math.max(7, r.f.iw * 0.0105) + 'px' });
      const caret = document.createElement('i');
      field.appendChild(caret);
      layer.appendChild(field);
      for (const ch of text) {
        if (!alive(id)) return;
        await gate(id);
        caret.before(ch);
        await sleep(55 + Math.random() * 45);
      }
      caret.remove();
    };
    const toast = (x: number, y: number, text: string) => {
      const p = px(x, y);
      const el = document.createElement('span');
      el.className = 'replay-toast';
      el.textContent = '✓ ' + text;
      Object.assign(el.style, { left: p.left + 'px', top: p.top + 'px', fontSize: Math.max(8, frame().iw * 0.013) + 'px' });
      layer.appendChild(el);
      el.animate([{ opacity: 0, translate: '-50% 30%' }, { opacity: 1, translate: '-50% -50%' }], { duration: 420, easing: 'cubic-bezier(.2,1.3,.4,1)', fill: 'forwards' });
    };
    const drag = async (id: number, from: Box, x: number, y: number, ms = 1400) => {
      const r = boxPx(from);
      const hole = document.createElement('span');
      hole.className = 'replay-hole';
      Object.assign(hole.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
      const card = document.createElement('span');
      card.className = 'replay-card';
      Object.assign(card.style, {
        width: r.width + 'px', height: r.height + 'px', backgroundImage: `url(${image})`,
        backgroundSize: `${r.f.iw}px ${r.f.ih}px`, backgroundPosition: `${-(r.left - r.f.ox)}px ${-(r.top - r.f.oy)}px`,
        transform: `translate3d(${r.left}px,${r.top}px,0)`,
      });
      layer.append(hole, card);
      const grab = px(pos.x, pos.y);
      await click();
      if (!alive(id)) return;
      await moveTo(id, x, y, ms, card, grab.left - r.left, grab.top - r.top);
      card.animate([{ boxShadow: '0 18px 40px rgb(30 30 60 / .28)' }, { boxShadow: '0 2px 6px rgb(30 30 60 / .12)' }], { duration: 380, fill: 'forwards' });
    };

    const loop = async (id: number) => {
      while (alive(id)) {
        await gate(id);
        layer.replaceChildren();
        root.getAnimations({ subtree: true }).forEach(an => an.cancel());
        pos = { ...script.start };
        place(cursor, pos.x, pos.y);
        started = performance.now();
        // Open the site: veil + loading bar, then the page paints in.
        veil.style.opacity = '1';
        cursor.style.opacity = '0';
        await bar.animate([{ transform: 'scaleX(0)', opacity: 1 }, { transform: 'scaleX(.72)', offset: .55 }, { transform: 'scaleX(1)', opacity: 1 }], { duration: 1050, easing: 'ease-in-out', fill: 'forwards' }).finished.catch(() => undefined);
        bar.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, fill: 'forwards' });
        await veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 520, easing: 'ease-out', fill: 'forwards' }).finished.catch(() => undefined);
        veil.style.opacity = '0';
        cursor.style.opacity = '1';
        for (const step of script.steps) {
          if (!alive(id)) return;
          await gate(id);
          if (step.kind === 'move') await moveTo(id, step.x, step.y, step.ms);
          else if (step.kind === 'click') await click();
          else if (step.kind === 'type') await type(id, step.box, step.text, step.mask);
          else if (step.kind === 'drag') await drag(id, step.from, step.x, step.y, step.ms);
          else if (step.kind === 'toast') toast(step.x, step.y, step.text);
          else await sleep(step.ms);
          await sleep(140);
        }
      }
    };

    const tick = window.setInterval(() => {
      if (!visible || !started) return;
      const s = Math.floor((performance.now() - started) / 1000);
      clock.textContent = `0:${String(s).padStart(2, '0')}`;
    }, 250);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      host.classList.toggle('is-replaying', visible);
      if (visible && wake) { const w = wake; wake = null; w(); }
    }, { threshold: 0.2 });
    io.observe(host);

    let resizeTimer = 0;
    let lastWidth = host.clientWidth;
    const ro = new ResizeObserver(() => {
      if (host.clientWidth === lastWidth) return;
      lastWidth = host.clientWidth;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { run++; wake?.(); wake = null; void loop(run); }, 200);
    });
    ro.observe(host);

    void loop(++run);
    return () => {
      run++;
      wake?.();
      io.disconnect();
      ro.disconnect();
      window.clearInterval(tick);
      window.clearTimeout(resizeTimer);
      host.classList.remove('is-replaying');
    };
  }, [enabled, script, image]);

  if (!script || !enabled) return null;
  return (
    <div ref={rootRef} className="replay" aria-hidden="true">
      <div className="replay-veil"><span className="replay-bar" /></div>
      <div className="replay-layer" />
      <span className="replay-ripple" />
      <div className="replay-cursor">
        <svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M4 2.5 19.5 13l-6.9 1.2L9.2 21 4 2.5Z" fill="#141722" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>
      </div>
      <span className="replay-rec"><i />REC <span className="replay-clock">0:00</span></span>
    </div>
  );
}
