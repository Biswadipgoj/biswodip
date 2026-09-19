'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { storyCopy, nanoFields, type Project } from '@/lib/data';
import { FlowLine } from '@/components/cinematic/SoftwarePrimitives';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
gsap.registerPlugin(ScrollTrigger);

export default function NanoLinkScene({project}: {project: Project}) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const root=ref.current;
    if(!root) return;
    const mm=gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      gsap.fromTo('.url-compression-fill',{scaleX:1},{scaleX:0.33,ease:'none',scrollTrigger:{trigger:root,start:'top 85%',end:'center 45%',scrub:0.5}});
      gsap.fromTo('.short-url',{y:16,opacity:0.6},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:root,start:'top 70%',end:'center 45%',scrub:0.5}});
      gsap.fromTo('.schema-record',{x:22,opacity:0},{x:0,opacity:1,stagger:0.06,duration:0.6,ease:'power3.out',scrollTrigger:{trigger:root,start:'top 75%',toggleActions:'play none none reverse'}});
    },root);
    return ()=>mm.revert();
  },[]);
  return <div ref={ref} className="product-story nano-story">
    <div className="glass-panel" data-tilt-3d style={{padding: '32px', borderRadius: '16px'}}>
      <h4>{storyCopy.nano.title}</h4>
      <div className="url-compression">
        <code className="long-url">{storyCopy.nano.long}</code>
        <span className="url-compression-track" aria-hidden="true"><span className="url-compression-fill"/></span>
        <code className="short-url">{storyCopy.nano.short}</code>
      </div>
      <p>{storyCopy.nano.note}</p>
      <FlowLine steps={project.chapter.flow}/>
    </div>
    <div className="schema-sheet glass-panel" data-tilt-3d style={{padding: '32px', borderRadius: '16px'}}>
      <h4>{storyCopy.nano.dataTitle}</h4>
      <p>{storyCopy.nano.dataBody}</p>
      <Table>
        <TableHeader>
          <TableRow><TableHead>Field</TableHead><TableHead>Purpose</TableHead></TableRow>
        </TableHeader>
        <TableBody>
          {nanoFields.slice(0,4).map(([name,type])=><TableRow className="schema-record" key={name}><TableCell><code>{name}</code></TableCell><TableCell>{type}</TableCell></TableRow>)}
        </TableBody>
      </Table>
      <a className="text-link" href={project.evidence[1].url} target="_blank" rel="noopener noreferrer">View schema source</a>
    </div>
  </div>;
}
