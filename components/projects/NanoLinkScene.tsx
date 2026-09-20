'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { storyCopy, nanoFields, nanoCode, type Project } from '@/lib/data';
import { CodeWindow, FlowLine } from '@/components/cinematic/SoftwarePrimitives';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

gsap.registerPlugin(ScrollTrigger);
export default function NanoLinkScene({project}: {project: Project}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      gsap.fromTo('.url-compression-fill',{scaleX:1},{scaleX:0.33,ease:'none',scrollTrigger:{trigger:root,start:'top 80%',end:'top 25%',scrub:0.35}});
      gsap.fromTo('.short-url',{y:18},{y:0,ease:'none',scrollTrigger:{trigger:root,start:'top 75%',end:'top 35%',scrub:0.35}});
    }, root);
    return ()=>mm.revert();
  },[]);
  return <div ref={ref} className="product-story nano-story">
    <div className="url-story">
      <h4><AnimatedText>{storyCopy.nano.title}</AnimatedText></h4>
      <div className="url-compression"><code className="long-url">{storyCopy.nano.long}</code><span className="url-compression-track" aria-hidden="true"><span className="url-compression-fill"/></span><code className="short-url">{storyCopy.nano.short}</code></div>
      <p>{storyCopy.nano.note}</p><FlowLine steps={project.chapter.flow}/>
      <CodeWindow lines={nanoCode} file="src/app/api/links/route.ts" label="Source excerpt · creating the Link record"/>
      <a className="text-link" href={project.evidence[0].url} target="_blank" rel="noopener noreferrer">Read the create-link route</a>
    </div>
    <div className="schema-sheet">
      <h4><AnimatedText>{storyCopy.nano.dataTitle}</AnimatedText></h4><p>{storyCopy.nano.dataBody}</p>
      <Table><TableHeader><TableRow><TableHead>Field</TableHead><TableHead>Purpose</TableHead></TableRow></TableHeader><TableBody data-stagger>{nanoFields.map(([name,type])=><TableRow key={name}><TableCell><code>{name}</code></TableCell><TableCell>{type}</TableCell></TableRow>)}</TableBody></Table>
      <a className="text-link" href={project.evidence[1].url} target="_blank" rel="noopener noreferrer">View schema source</a>
    </div>
  </div>;
}
