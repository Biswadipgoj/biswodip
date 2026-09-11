import { impacts, experienceCopy } from '@/lib/data';
import { Spatial, Stagger, StaggerItem } from '../ui/Spatial';
import Sticker, { type StickerName } from '../ui/Sticker';

const IMPACT_ART: StickerName[] = ['rocket', 'cube', 'spark'];

export default function Impact() {
  return (
    <section id="impact" className="tinted-section section-space">
      <div className="section-shell spatial-stage">
        <Spatial>
          <div className="section-heading">
            <p className="eyebrow">05 / Delivery principles</p>
            <h2>{experienceCopy.impact.title}</h2>
            <p>{experienceCopy.impact.description}</p>
          </div>
        </Spatial>

        <Stagger className="impact-grid" gap={0.1}>
          {impacts.map((impact, i) => (
            <StaggerItem as="article" className="impact-card" key={impact.title}>
              <Sticker name={IMPACT_ART[i]} size={58} className="card-art" />
              <span className="eyebrow">0{i + 1} / {impact.metric}</span>
              <h3>{impact.title}</h3>
              <p>{impact.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
