'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { useExperience } from '../ExperienceProvider';

const STAGES = [
  { title: 'Understand', body: 'Map the real business problem before a single component exists.', code: '> analyse --scope=product --depth=domain' },
  { title: 'Build', body: 'Typed, reviewable engineering with the architecture decided up front.', code: '> git commit -m "feat: core domain model"' },
  { title: 'Verify', body: 'Tests, types and real-device checks run before anything reaches a user.', code: '> vitest run && tsc --noEmit' },
  { title: 'Deploy', body: 'Shipped, observed and iterated on with live users in mind.', code: '> deploy --env=production --observe' },
];

export default function Pipeline() {
  const track = useRef<HTMLDivElement>(null);
  const { animated } = useExperience();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', value => {
    const next = Math.min(STAGES.length - 1, Math.floor(value * STAGES.length));
    setActive(next < 0 ? 0 : next);
  });

  return (
    <section id="process" className="pipeline-section">
      <div ref={track} className="pipeline-track">
        <div className="pipeline-sticky">
          <div className="pipeline-inner section-shell spatial-stage py-16 sm:py-24">
            <div className="pipeline-head">
              <p className="eyebrow">How the work moves</p>
              <h2>From question to production.</h2>
            </div>

            <div className="pipeline-rail">
              {STAGES.map((stage, i) => (
                <motion.article
                  key={stage.title}
                  className={`stage ${i === active ? 'is-live' : ''} ${i < active ? 'is-done' : ''}`}
                  animate={animated ? { rotateX: i === active ? 0 : 5, z: i === active ? 40 : 0 } : undefined}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="stage-num">0{i + 1}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                  <div className="stage-code">{stage.code}</div>
                </motion.article>
              ))}
            </div>

            <div className="pipeline-progress">
              <motion.div style={animated ? { scaleX: progress } : { transform: 'scaleX(1)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
