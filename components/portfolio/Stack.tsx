'use client';
import { primaryStack, stack, stackCopy, personal } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import TechLogo from '@/components/ui/TechLogo';
import { ArrowRightIcon } from '@/components/icons';

const requestPipeline = [
  { step: '01', name: 'Zod Validation', detail: 'URL normalization, optional alias & expiry schema' },
  { step: '02', name: 'nanoid(7) / bcrypt', detail: 'Collision-safe shortCode & salted password hash' },
  { step: '03', name: 'Prisma Client', detail: 'Type-safe query with relational constraints' },
  { step: '04', name: 'PostgreSQL Link Table', detail: 'Atomic insert with customAlias uniqueness' },
  { step: '05', name: '302 Redirect + Analytics', detail: 'Single-use deactivation & click counter increment' },
];

export default function Stack() {
  const ref = useEditorialReveal();
  return <section id="stack" ref={ref} className="stack-section section-space">
    <header className="section-heading" data-reveal="clip">
      <h2 data-split>{stackCopy.title}</h2>
      <p data-reveal>{stackCopy.intro}</p>
    </header>

    <div className="primary-stack" data-stagger aria-label="Core technologies">
      {primaryStack.map(tech => <span key={tech} className="glass-pill" data-reveal="3d-depth" data-magnetic style={{padding: '8px 16px', borderRadius: '30px'}}>
        <TechLogo craft={tech} mono size={22}/>
        <span>{tech}</span>
      </span>)}
    </div>

    {/* Technical Request Pipeline: NanoLink verification */}
    <div className="request-pipeline glass-panel" data-reveal="3d-flip" data-tilt-3d style={{margin: '48px 0', padding: '32px', borderRadius: '16px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '12px'}}>
        <span style={{fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.8}}>
          Technical Request Contract · NanoLink POST /api/links
        </span>
        <span style={{fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--chapter-accent, #3f7b70)'}}>200 OK Response</span>
      </div>
      <div className="pipeline-flow" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
        {requestPipeline.map((item, idx) => (
          <div key={item.step} className="pipeline-step" data-reveal="3d-depth" style={{position: 'relative', padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.4)'}}>
            <span style={{fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: 0.6}}>{item.step}</span>
            <h4 style={{fontSize: '15px', fontWeight: 600, margin: '6px 0 4px'}}>{item.name}</h4>
            <p style={{fontSize: '12px', lineHeight: 1.4, margin: 0, opacity: 0.85}}>{item.detail}</p>
            {idx < requestPipeline.length - 1 && (
              <span className="pipeline-arrow" aria-hidden="true" style={{position: 'absolute', right: '-12px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, display: 'none'}}>
                <ArrowRightIcon style={{width: '14px', height: '14px'}}/>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>

    <div className="stack-categories" data-stagger>
      {stack.map(category => <div className="stack-category glass-panel" key={category.title} data-reveal="3d-depth" data-tilt-3d style={{padding: '28px', borderRadius: '14px'}}>
        <h3>{category.title}</h3>
        <ul data-stagger>{category.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
      </div>)}
    </div>

    <dl className="stack-notes" data-stagger>
      {stackCopy.notes.map(note => <div key={note.name} className="glass-panel" data-reveal="3d-flip" data-tilt-3d style={{padding: '22px', borderRadius: '12px'}}>
        <dt>{note.name}</dt>
        <dd>{note.body}</dd>
      </div>)}
    </dl>

    <p className="ownership" data-reveal="blur">{personal.ownership}</p>
  </section>;
}
