'use client';
import { useEffect, useRef, useState } from 'react';
import { nav, personal, socials } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { MenuIcon, XmarkIcon, ArrowUpRightIcon } from '@/components/icons';

export default function PortfolioNav() {
  const [open,setOpen]=useState(false);
  const root=useRef<HTMLElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const progressRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const sections=nav.map(item=>document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    let scheduled=false;
    const update=()=>{
      scheduled=false;
      const active=sections.filter(section=>section.getBoundingClientRect().top<=160).sort((a,b)=>b.getBoundingClientRect().top-a.getBoundingClientRect().top)[0]||sections[0];
      root.current?.querySelectorAll<HTMLAnchorElement>('[data-nav]').forEach(link=>{
        if(link.dataset.nav===active?.id) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });

      if (progressRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
    };
    const scroll=()=>{ if(!scheduled){scheduled=true;requestAnimationFrame(update);} };
    window.addEventListener('scroll',scroll,{passive:true});
    update();
    return ()=>window.removeEventListener('scroll',scroll);
  },[]);

  useEffect(()=>{
    if(!open) return;
    const close=(event:KeyboardEvent)=>{ if(event.key==='Escape'){setOpen(false);trigger.current?.focus();} };
    const outside=(event:PointerEvent)=>{ if(!root.current?.contains(event.target as Node)) setOpen(false); };
    window.addEventListener('keydown',close);window.addEventListener('pointerdown',outside);
    return ()=>{window.removeEventListener('keydown',close);window.removeEventListener('pointerdown',outside);};
  },[open]);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="scroll-progress-bar" aria-hidden="true">
      <div ref={progressRef} className="scroll-progress-fill" style={{width: '100%', height: '100%', background: 'linear-gradient(90deg, #c45b38, #d88135, #358b76, #745199)', transformOrigin: 'left', transform: 'scaleX(0)'}}/>
    </div>
    <header className="portfolio-nav" ref={root}>
      <a className="wordmark" href="#opening" aria-label={personal.name+', home'}>biswodip<span>.</span></a>
      <nav aria-label="Main navigation" className="desktop-nav">{nav.map(item=><a key={item.id} data-nav={item.id} href={'#'+item.id}>{item.label}</a>)}</nav>
      <a className="nav-projects" href="#projects">View projects<ArrowUpRightIcon aria-hidden="true"/></a>
      <div className="mobile-nav-actions"><a href="#projects">Projects</a><Button ref={trigger} variant="ghost" size="icon" className="menu-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<XmarkIcon aria-hidden="true"/>:<MenuIcon aria-hidden="true"/>}</Button></div>
      <div className="nav-secondary"><a href={personal.resume} download>Download resume</a><div>{socials.map(link=><a key={link.label} href={link.url} target={link.label==='Email'?undefined:'_blank'} rel={link.label==='Email'?undefined:'noopener noreferrer'}>{link.label}</a>)}</div></div>
      <nav id="mobile-navigation" aria-label="More navigation" className="mobile-navigation" hidden={!open}>{nav.map(item=><a key={item.id} data-nav={item.id} href={'#'+item.id} onClick={()=>{setOpen(false);document.getElementById(item.id)?.focus({preventScroll:true});}}>{item.label}</a>)}</nav>
    </header>
  </>;
}
