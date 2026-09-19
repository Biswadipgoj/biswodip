'use client';
import { storyCopy, type Project } from '@/lib/data';
import { FlowLine } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowUpRightIcon } from '@/components/icons';

export default function TelePointScene({project}: {project: Project}) {
  return <div className="product-story tele-story">
    <div className="glass-panel" data-tilt-3d style={{padding: '32px', borderRadius: '16px'}}>
      <h4>{storyCopy.tele.title}</h4>
      <p>{storyCopy.tele.note}</p>
      <div className="emi-widget" style={{margin: '20px 0', padding: '16px', background: 'rgba(255,255,255,0.35)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.45)'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', opacity: 0.75, marginBottom: '8px'}}>
          <span>EMI Schedule Model</span>
          <span>Status: Verified Active</span>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '12px'}}>
          <div><span style={{opacity: 0.7, fontSize: '10px', display: 'block'}}>Principal</span><strong>₹1,20,000</strong></div>
          <div><span style={{opacity: 0.7, fontSize: '10px', display: 'block'}}>Tenure</span><strong>12 Months</strong></div>
          <div><span style={{opacity: 0.7, fontSize: '10px', display: 'block'}}>Monthly EMI</span><strong>₹10,550</strong></div>
        </div>
      </div>
      <a className="text-link" href={project.evidence[0].url} target="_blank" rel="noopener noreferrer">
        Read the payment API<ArrowUpRightIcon aria-hidden="true"/>
      </a>
    </div>
    <div className="glass-panel" data-tilt-3d style={{padding: '32px', borderRadius: '16px'}}>
      <h4 style={{fontSize: '20px', marginBottom: '16px'}}>Payment Settlement Engine</h4>
      <FlowLine steps={storyCopy.tele.labels}/>
      <p className="flow-note" style={{marginTop: '16px'}}>EMI validation → gateway callback → reconciliation receipt</p>
    </div>
  </div>;
}
