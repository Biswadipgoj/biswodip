'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
declare global { interface Window { portfolioScroll?: Lenis; gsap?: typeof gsap; ScrollTrigger?: typeof ScrollTrigger; } }

/** One clock, native touch scrolling, and complete teardown when motion preferences change. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(()=>{
    // Font and document readiness are combined below; avoid three startup refreshes.
    // ignoreMobileResize is the fix for "no animation works on mobile": every time the
    // address bar collapsed, the resize event forced a full refresh and scrubbed values
    // snapped back mid-animation. Width changes still refresh via the handler below.
    ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,resize', ignoreMobileResize: true });
    if (process.env.NODE_ENV !== 'production') { window.gsap=gsap; window.ScrollTrigger=ScrollTrigger; }
    const media = gsap.matchMedia();
    let disposed = false;
    let refreshFrame = 0;
    const refresh = ()=>{if(!disposed) ScrollTrigger.refresh();};
    const scheduleRefresh = ()=>{
      cancelAnimationFrame(refreshFrame);
      if (!disposed) refreshFrame=requestAnimationFrame(refresh);
    };
    let onLoad: () => void = () => {};
    const loaded = new Promise<void>(resolve=>{
      onLoad = resolve;
      if(document.readyState==='complete') resolve();
      else window.addEventListener('load',onLoad,{once:true});
    });
    Promise.all([document.fonts.ready,loaded]).then(scheduleRefresh);

    // Publish scroll state on <html> so CSS can react without a React render:
    // data-scroll (past the fold) and data-scroll-dir (nav auto-hide). Both are written
    // only when they change — any write on the root restyles the whole document.
    const page = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lastY = window.scrollY;
    let velocityFrame = 0;
    let settle = 0;
    const setState = (key: 'scroll' | 'scrollDir' | 'scrollZone', value: string)=>{ if (page.dataset[key] !== value) page.dataset[key] = value; };

    // Velocity skew is written straight onto the few bands that use it, and only while
    // they are on screen. A custom property on <html> recalculated every element's style
    // every frame, which on a phone cost more than all the scroll animations combined.
    const skewTargets = [...document.querySelectorAll<HTMLElement>('[data-velocity-skew]')];
    const visibleSkew = new Set<HTMLElement>();
    const skewObserver = new IntersectionObserver(entries=>{
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) visibleSkew.add(target);
        else { visibleSkew.delete(target); target.style.transform = ''; }
      }
    });
    skewTargets.forEach(target=>skewObserver.observe(target));
    const skew = (velocity: number)=>{
      if (reduced.matches) return;
      for (const target of visibleSkew) target.style.transform = velocity ? `skewY(${(velocity * Number(target.dataset.velocitySkew)).toFixed(3)}deg)` : '';
    };

    // Sections flag themselves on screen so ambient loops (pulses, sheens, halos) pause
    // everywhere else instead of ticking on thirty screens nobody is looking at.
    const inviewObserver = new IntersectionObserver(entries=>{
      for (const entry of entries) {
        if (entry.isIntersecting) (entry.target as HTMLElement).dataset.inview = '';
        else delete (entry.target as HTMLElement).dataset.inview;
      }
    }, { rootMargin: '120px 0px' });
    document.querySelectorAll('[data-motion-root], .portfolio-nav').forEach(section=>inviewObserver.observe(section));

    // Zone drives the mobile quick-action dock: hidden over the hero and the contact footer
    // (both already carry the same actions), shown everywhere in between. Boundaries are
    // measured on refresh, never inside the scroll frame, so scrolling forces no layout.
    const hero = document.getElementById('opening');
    const contact = document.getElementById('contact');
    let heroEnd = 600;
    let contactStart = Infinity;
    const measureZones = ()=>{
      if (hero) heroEnd = hero.offsetTop + hero.offsetHeight * 0.7;
      if (contact) contactStart = contact.offsetTop - window.innerHeight * 0.6;
    };
    measureZones();
    ScrollTrigger.addEventListener('refresh', measureZones);
    const readScroll = ()=>{
      velocityFrame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      setState('scroll', y > 24 ? 'past' : 'top');
      if (Math.abs(delta) > 2) setState('scrollDir', delta > 0 ? 'down' : 'up');
      setState('scrollZone', y < heroEnd ? 'hero' : y > contactStart ? 'contact' : 'body');
      skew(Math.max(-1, Math.min(1, delta / 60)));
      clearTimeout(settle);
      settle = window.setTimeout(()=>skew(0), 140);
    };
    const onScroll = ()=>{ if(!velocityFrame) velocityFrame = requestAnimationFrame(readScroll); };
    window.addEventListener('scroll', onScroll, { passive: true });
    readScroll();

    // Width-only resizes still need a refresh; height-only ones are the address bar.
    let lastWidth = window.innerWidth;
    const onResize = ()=>{
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      scheduleRefresh();
    };
    window.addEventListener('resize', onResize);

    media.add('(prefers-reduced-motion: no-preference)',()=>{
      const lenis = new Lenis({ duration:1.05, smoothWheel:true, syncTouch:false, anchors:false });
      const tick = (seconds:number)=>lenis.raf(seconds*1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      window.portfolioScroll=lenis;
      const focusTarget = (target:HTMLElement)=>{
        const previous = target.getAttribute('tabindex');
        if(previous===null) target.setAttribute('tabindex','-1');
        target.focus({preventScroll:true});
        if(previous===null) target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});
      };
      const navigate = (event:MouseEvent)=>{
        if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey) return;
        const anchor=(event.target as Element)?.closest<HTMLAnchorElement>('a[href^="#"]');
        if(!anchor?.hash) return;
        const target=document.getElementById(decodeURIComponent(anchor.hash.slice(1)));
        if(!target) return;
        event.preventDefault();
        if(location.hash!==anchor.hash) history.pushState(null,'',anchor.hash);
        lenis.scrollTo(target,{onComplete:()=>focusTarget(target)});
      };
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      const restore = ()=>{
        const target=location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
        if (target) {
          lenis.scrollTo(target, { immediate: true });
        } else {
          lenis.scrollTo(0, { immediate: true });
          window.scrollTo(0, 0);
          requestAnimationFrame(() => {
            window.scrollTo(0, 0);
          });
        }
      };
      document.addEventListener('click',navigate);
      window.addEventListener('popstate',restore);
      return ()=>{
        document.removeEventListener('click',navigate);window.removeEventListener('popstate',restore);
        gsap.ticker.remove(tick);lenis.destroy();
        if(window.portfolioScroll===lenis) delete window.portfolioScroll;
      };
    });
    return ()=>{
      disposed=true;
      window.removeEventListener('load',onLoad);
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onResize);
      skewObserver.disconnect();inviewObserver.disconnect();
      ScrollTrigger.removeEventListener('refresh', measureZones);
      skewTargets.forEach(target=>{ target.style.transform = ''; });
      cancelAnimationFrame(refreshFrame);cancelAnimationFrame(velocityFrame);clearTimeout(settle);
      media.revert();
    };
  },[]);
  return <>{children}</>;
}
