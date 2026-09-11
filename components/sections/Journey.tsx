import { journey, experienceCopy } from '@/lib/data';
import { Spatial, Stagger, StaggerItem } from '../ui/Spatial';
import Sticker, { type StickerName } from '../ui/Sticker';

const STEP_ART: StickerName[] = ['brackets', 'branch', 'merge', 'rocket'];

export default function Journey() {
  return (
    <section id="journey" className="section-shell section-space spatial-stage">
      <div className="journey-layout">
        <Spatial>
          <div className="section-heading">
            <p className="eyebrow">04 / Field notes</p>
            <h2>{experienceCopy.journey.title}</h2>
            <p>{experienceCopy.journey.description}</p>
          </div>
        </Spatial>

        <Stagger as="ol" className="journey-list" gap={0.1}>
          {journey.map((step, i) => (
            <StaggerItem as="li" key={step.title}>
              <div className="journey-card">
                <Sticker name={STEP_ART[i % STEP_ART.length]} size={44} className="step-art" />
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
