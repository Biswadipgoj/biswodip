import { impacts, experienceCopy } from '@/lib/data';
import { Spatial, Stagger, StaggerItem } from '../ui/Spatial';
export default function Impact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="tinted-section section-space">
      <div className="section-shell spatial-stage">
        <Spatial>
          <div className="section-heading">
            <h2 id="impact-title">{experienceCopy.impact.title}</h2>
            <p>{experienceCopy.impact.description}</p>
          </div>
        </Spatial>

        <Stagger className="impact-grid" gap={0.1}>
          {impacts.map(impact => (
            <StaggerItem as="article" className="impact-card" key={impact.title}>
              <h3 className="!mt-0 !pr-0">{impact.title}</h3>
              <p>{impact.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
