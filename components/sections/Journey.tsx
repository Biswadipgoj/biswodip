import { journey, experienceCopy } from '@/lib/data';
import { Spatial, Stagger, StaggerItem } from '../ui/Spatial';
export default function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="section-shell section-space spatial-stage">
      <div className="journey-layout">
        <Spatial>
          <div className="section-heading">
            <h2 id="journey-title">{experienceCopy.journey.title}</h2>
            <p>{experienceCopy.journey.description}</p>
          </div>
        </Spatial>

        <Stagger as="ol" className="journey-list" gap={0.1}>
          {journey.map(step => (
            <StaggerItem as="li" key={step.title}>
              <div className="journey-card !pr-6">
                <span className="journey-year">{step.year}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
