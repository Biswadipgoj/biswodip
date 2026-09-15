'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { processCopy } from '@/lib/data';
import { useExperience } from '../ExperienceProvider';
import Icon from '../ui/Icon';

const stages = processCopy.stages;

export default function Pipeline() {
  const section = useRef<HTMLElement>(null);
  const { animated, spatial } = useExperience();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start center', 'end center'] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', value => {
    if (!animated) return;
    const next = Math.min(stages.length - 1, Math.max(0, Math.floor(value * stages.length)));
    setActive(next);
  });

  return (
    <section
      id="pipeline"
      ref={section}
      aria-labelledby="pipeline-title"
      className="section-shell section-space spatial-stage"
    >
      <div className="pipeline-head">
        <h2 id="pipeline-title">{processCopy.title}</h2>
        <p className="pipeline-note">{processCopy.note}</p>
        <a href="#projects" className="text-link pipeline-skip">
          Skip section <Icon name="arrowDown" />
        </a>
      </div>

      <div className="pipeline-rail">
        {stages.map((stage, i) => (
          <motion.article
            key={stage.title}
            className={`stage ${animated && i === active ? 'is-live' : ''} ${animated && i < active ? 'is-done' : ''}`}
            initial={false}
             animate={{ rotateX: spatial && i !== active ? 3 : 0 }}
             transition={{ duration: animated ? 0.6 : 0, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="stage-num">0{i + 1}</span>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
            <div className="stage-code !whitespace-normal ![overflow-wrap:anywhere]">{stage.code}</div>
          </motion.article>
        ))}
      </div>

      <div className="pipeline-progress" aria-hidden="true">
        <motion.div style={animated ? { scaleX: progress } : { transform: 'scaleX(1)' }} />
      </div>
    </section>
  );
}
