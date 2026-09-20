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
    ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,resize' });
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
    media.add('(prefers-reduced-motion: no-preference)',()=>{
      const lenis = new Lenis({ duration:1.05, smoothWheel:true, syncTouch:false, anchors:false });
      const tick = (seconds:number)=>lenis.raf(seconds*1000);
      lenis.on('scroll',ScrollTrigger.update);
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
    return ()=>{disposed=true;window.removeEventListener('load',onLoad);cancelAnimationFrame(refreshFrame);media.revert();};
  },[]);
  return <>{children}</>;
}
