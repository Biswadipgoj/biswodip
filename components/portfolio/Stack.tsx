'use client';
import { gsap } from 'gsap';
import { stack } from '@/lib/data';
import { useScene, type SceneBuilder } from '@/components/cinematic/useScene';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';

const buildStack: SceneBuilder = (tl, root, desktop) => {
  const layers = root.querySelectorAll('.stack-layer');
  const compact = !desktop || window.innerHeight < 880;
  root.dataset.compact = String(compact);
  if (compact) {
    gsap.set(layers, { autoAlpha: 0, y: 35 });
    layers.forEach((layer, index) => {
      const at = index * 0.24;
      tl.to(layer, { autoAlpha: 1, y: 0, duration: 0.07 }, at)
        .fromTo(layer.querySelectorAll('.stack-tool'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', stagger: 0.017, duration: 0.04 }, at + 0.02);
      if (index < layers.length - 1) tl.to(layer, { autoAlpha: 0, y: -25, duration: 0.05 }, at + 0.2);
    });
    return;
  }
  layers.forEach((layer, index) => {
    tl.fromTo(layer, { x: desktop ? (index % 2 ? 90 : -90) : 28, y: index * 25, opacity: 0.25, rotateX: desktop ? 12 : 0 }, { x: 0, y: 0, opacity: 1, rotateX: 0, duration: 0.2 }, index * 0.19);
    tl.fromTo(layer.querySelectorAll('.stack-tool'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', stagger: 0.03, duration: 0.1 }, index * 0.19 + 0.06);
  });
  gsap.set(root.querySelector('.stack-wire-fill'), { scaleY: 0, transformOrigin: 'top' });
  tl.to('.stack-wire-fill', { scaleY: 1, duration: 0.9 }, 0.03);
};

export default function Stack() {
  const ref = useScene(buildStack);
  return <section id="stack" ref={ref} className="scroll-chapter stack-section" data-environment="sky">
    <div className="chapter-viewport stack-viewport">
      <div className="stack-heading"><h2>One request.<br />Across the stack.</h2><p>Trace NanoLink’s create-link request from the interface to a persisted record, then back through the redirect path.</p><div className="stack-contract"><span>Request contract</span><code>POST /api/links</code><span>Validated JSON → 201 Created</span></div><a className="text-link" href="#nanolink">Explore NanoLink<ArrowDownIcon aria-hidden="true" /></a><div className="stack-verification"><span>Delivery &amp; verification</span><p>Vercel deployments. This portfolio uses TypeScript checks, ESLint, production builds and Playwright browser tests.</p></div></div>
      <div className="stack-assembly"><div className="stack-wire"><span className="stack-wire-fill" /></div>{stack.map((layer, i) => <article key={layer.id} className={`stack-layer stack-layer-${i}`} id={layer.id === 'application' ? 'api' : undefined}>
        <div className="stack-layer-heading"><span className="layer-index">0{i + 1}</span><h3>{layer.title}</h3><p>{layer.description}</p></div>
        <div className="stack-tools">{layer.tools.map(tool => <span className="stack-tool" key={tool}>{tool}</span>)}</div>
        <p className="stack-layer-detail">{layer.detail}</p>
        <div className="stack-layer-foot"><code>{layer.sample}</code><a href={layer.source} target="_blank" rel="noopener noreferrer" aria-label={`View ${layer.evidence} source`}>{layer.evidence}<ArrowUpRightIcon aria-hidden="true" /></a></div>
      </article>)}</div>
    </div>
  </section>;
}
