'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { nav, personal } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { MenuIcon, XmarkIcon, ArrowDownIcon, ArrowRightIcon } from '@/components/icons';

export default function PortfolioNav() {
  const [open,setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const sections = nav.map(item=>document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const links = [...(root.current?.querySelectorAll<HTMLAnchorElement>('[data-nav]') ?? [])];
    // Section offsets are measured when the page changes size, never inside the scroll frame:
    // reading rects there forced a synchronous layout on every frame while GSAP was writing.
    let tops: number[] = [];
    let total = 0;
    let current = '';
    let frame = 0;
    const measure = ()=>{
      tops = sections.map(section=>section.getBoundingClientRect().top + window.scrollY);
      total = document.documentElement.scrollHeight - window.innerHeight;
    };
    const update = ()=>{
      frame = 0;
      const y = window.scrollY;
      let active = sections[0]?.id ?? '';
      tops.forEach((top,index)=>{ if (top - 170 <= y) active = sections[index].id; });
      if (active !== current) {
        current = active;
        for (const link of links) {
          if (link.dataset.nav === active) link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        }
      }
      if (progressRef.current) progressRef.current.style.transform = 'scaleX('+(total>0?Math.min(1,y/total):0)+')';
    };
    const scroll = ()=>{if(!frame) frame=requestAnimationFrame(update);};
    const resized = new ResizeObserver(()=>{ measure(); scroll(); });
    resized.observe(document.body);
    window.addEventListener('scroll',scroll,{passive:true});
    measure();
    update();
    return ()=>{window.removeEventListener('scroll',scroll);resized.disconnect();cancelAnimationFrame(frame);};
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
    <header className="portfolio-nav" ref={root} data-menu-open={open || undefined}>
      <a className="wordmark" href="#opening" aria-label="biswodip. Home">biswodip<span>.</span></a>
      <nav aria-label="Main navigation" className="desktop-nav">{nav.map(item=><a key={item.id} data-nav={item.id} href={'#'+item.id}>{item.label}</a>)}</nav>
      <a className="nav-resume" href="#resume">Resume<ArrowDownIcon aria-hidden="true"/></a>
      <div className="mobile-nav-actions"><a href="#projects">Projects</a><Button ref={trigger} variant="ghost" size="icon" className="menu-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<XmarkIcon aria-hidden="true"/>:<MenuIcon aria-hidden="true"/>}</Button></div>
      <nav id="mobile-navigation" aria-label="More navigation" className="mobile-navigation" data-open={open} aria-hidden={!open}>{nav.map((item,index)=><a key={item.id} data-nav={item.id} href={'#'+item.id} style={{'--stagger':index} as CSSProperties} onClick={()=>setOpen(false)}>{item.label}</a>)}<a href={personal.resume} download style={{'--stagger':nav.length} as CSSProperties}>Download resume<ArrowDownIcon aria-hidden="true"/></a></nav>
      <div className="scroll-progress-bar" aria-hidden="true"><div ref={progressRef} className="scroll-progress-fill"/></div>
    </header>
    {/* Phones: the three things a recruiter comes back for, one thumb away. Shown by CSS between the hero and the footer. */}
    <nav className="quick-dock" aria-label="Quick actions">
      <a href="#projects">Work</a>
      <a href={personal.resume} download>Resume<ArrowDownIcon aria-hidden="true"/></a>
      <a href="#contact" className="dock-primary">Contact<ArrowRightIcon aria-hidden="true"/></a>
    </nav>
  </>;
}

