'use client';
import { useEffect, useRef, useState } from 'react';
import { nav, personal } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { MenuIcon, XmarkIcon, ArrowDownIcon } from '@/components/icons';

export default function PortfolioNav() {
  const [open,setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const sections = nav.map(item=>document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    let frame = 0;
    const update = ()=>{
      frame = 0;
      let active = sections[0];
      for (const section of sections) if (section.getBoundingClientRect().top <= 170) active = section;
      root.current?.querySelectorAll<HTMLAnchorElement>('[data-nav]').forEach(link=>{
        if (link.dataset.nav === active?.id) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = 'scaleX('+(total>0?Math.min(1,window.scrollY/total):0)+')';
    };
    const scroll = ()=>{if(!frame) frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',scroll,{passive:true});
    update();
    return ()=>{window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame);};
  },[]);
  useEffect(()=>{
    if (!open) return;
    const close = (event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);trigger.current?.focus();}};
    const outside = (event:PointerEvent)=>{if(!root.current?.contains(event.target as Node)) setOpen(false);};
    const resize = ()=>{if(window.innerWidth>=1100) setOpen(false);};
    window.addEventListener('keydown',close);window.addEventListener('pointerdown',outside);window.addEventListener('resize',resize);
    return ()=>{window.removeEventListener('keydown',close);window.removeEventListener('pointerdown',outside);window.removeEventListener('resize',resize);};
  },[open]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="portfolio-nav" ref={root}>
      <a className="wordmark" href="#opening" aria-label="biswodip. Home">biswodip<span>.</span></a>
      <nav aria-label="Main navigation" className="desktop-nav">{nav.map(item=><a key={item.id} data-nav={item.id} href={'#'+item.id}>{item.label}</a>)}</nav>
      <a className="nav-resume" href="#resume">Resume<ArrowDownIcon aria-hidden="true"/></a>
      <div className="mobile-nav-actions"><a href="#projects">Projects</a><Button ref={trigger} variant="ghost" size="icon" className="menu-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<XmarkIcon aria-hidden="true"/>:<MenuIcon aria-hidden="true"/>}</Button></div>
      <nav id="mobile-navigation" aria-label="More navigation" className="mobile-navigation" hidden={!open}>{nav.map(item=><a key={item.id} data-nav={item.id} href={'#'+item.id} onClick={()=>setOpen(false)}>{item.label}</a>)}<a href={personal.resume} download>Download resume</a></nav>
      <div className="scroll-progress-bar" aria-hidden="true"><div ref={progressRef} className="scroll-progress-fill"/></div>
    </header>
  </>;
}

