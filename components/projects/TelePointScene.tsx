'use client';
import { storyCopy, teleOwnershipCode, type Project } from '@/lib/data';
import { FlowLine, CodeWindow } from '@/components/cinematic/SoftwarePrimitives';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { ArrowUpRightIcon } from '@/components/icons';

export default function TelePointScene({project}: {project: Project}) {
  return <div className="product-story tele-story">
    <div><h4><AnimatedText>{storyCopy.tele.title}</AnimatedText></h4><p data-reveal>{storyCopy.tele.note}</p><FlowLine steps={storyCopy.tele.labels}/><p className="flow-note">Payment submission workflow</p>
      <div className="payment-boundary" data-stagger>{project.decisions.map(decision=><div key={decision.title}><h5>{decision.title}</h5><p>{decision.how}</p></div>)}</div>
    </div>
    <div data-spatial="panel"><CodeWindow lines={teleOwnershipCode} file="app/api/payments/submit/route.ts" label="Source excerpt · customer ownership check (formatted)"/>
      <a className="text-link" href={project.evidence[0].url} target="_blank" rel="noopener noreferrer">Read the payment API<ArrowUpRightIcon aria-hidden="true"/></a>
    </div>
  </div>;
}
