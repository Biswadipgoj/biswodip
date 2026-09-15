'use client';

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { constellation, projects, type Craft } from '@/lib/data';
import { useExperience } from '../ExperienceProvider';
import TechIcon from '../ui/TechIcon';
import Icon from '../ui/Icon';
import { CRAFT_SPECS } from './craftSpecs';
import styles from './Skills.module.css';

const chapters = [
  {
    label: 'Frontend', title: 'Interfaces,\nwith feeling.', subtitle: 'Frontend UI Systems',
    description: 'From the first render to the last interaction. Components, state, and motion that make a product feel right.',
    material: 'INTERFACE', route: 'Browser / Render / Interact', accent: '#8edfe8',
    flow: ['Render', 'Compose', 'Interact'],
  },
  {
    label: 'Backend', title: 'Behind every\ninteraction.', subtitle: 'Distributed Backend & APIs',
    description: 'The logic beneath the interface. Typed contracts, authentication, and services that move data where it needs to go.',
    material: 'SERVICES', route: 'Request / Validate / Respond', accent: '#9dc8ff',
    flow: ['Request', 'Validate', 'Respond'],
  },
  {
    label: 'Cloud', title: 'Built here.\nRunning everywhere.', subtitle: 'Cloud Infrastructure & DevOps',
    description: 'From a local commit to a running application. Containers, delivery pipelines, and the infrastructure in between.',
    material: 'DELIVERY', route: 'Build / Test / Deploy', accent: '#a8dfc2',
    flow: ['Build', 'Test', 'Deploy'],
  },
  {
    label: 'Data', title: 'Structure in.\nClarity out.', subtitle: 'Data Engineering & Distributed Tooling',
    description: 'Data models, queries, and the checks that keep a codebase healthy. The foundations that make the rest work.',
    material: 'FOUNDATION', route: 'Model / Query / Verify', accent: '#e3cfab',
    flow: ['Model', 'Query', 'Verify'],
  },
] as const;

const pageVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 48, rotateY: direction * 5, z: -50 }),
  visible: { opacity: 1, x: 0, rotateY: 0, z: 0 },
  leave: (direction: number) => ({ opacity: 0, x: direction * -32, rotateY: direction * -4, z: -35 }),
};

function ArchitectureScene({ active, moving }: { active: number; moving: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 90, damping: 24 });
  const rotateY = useSpring(x, { stiffness: 90, damping: 24 });

  useEffect(() => {
    if (!moving) { x.set(0); y.set(0); }
  }, [moving, x, y]);

  return (
    <div
      className={styles.scene}
      aria-hidden="true"
      onPointerMove={event => {
        if (!moving || event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - bounds.left) / bounds.width - .5) * 12);
        y.set(((event.clientY - bounds.top) / bounds.height - .5) * -8);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      <div className={styles.sceneCaption}><span>Exploded architecture</span><span>4 connected layers</span></div>
      <motion.div className={styles.rig} style={{ rotateX, rotateY }}>
        <div className={styles.assembly}>
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.label}
              className={styles.plane}
              data-active={index === active}
              style={{ '--plate-accent': chapter.accent } as CSSProperties}
              initial={false}
              animate={{ z: (3 - index) * 68 + (index === active ? 22 : 0), x: index === active ? 18 : 0 }}
              transition={{ duration: moving ? .85 : 0, ease: [.16, 1, .3, 1] }}
            >
              <div className={styles.planeTop}><span>0{index + 1}</span><span>{chapter.material}</span><i /></div>
              <div className={styles.planeBody}>
                <TechIcon name={constellation[index].crafts[0].name} size={58} colorOverride={chapter.accent} />
                <div className={styles.planeTraces}><i /><i /><i /></div>
                <div className={styles.planePorts}>
                  {constellation[index].crafts.slice(1, 4).map(craft => <TechIcon key={craft.name} name={craft.name} size={20} colorOverride={chapter.accent} />)}
                </div>
              </div>
              <div className={styles.planeEdge} />
            </motion.div>
          ))}
          <div className={styles.basePlane} />
        </div>
      </motion.div>
      <div className={styles.sceneFoot}><span className={styles.sceneDot} /><span>{chapters[active].route}</span></div>
    </div>
  );
}

function ToolInspector({ craft, onClose }: { craft: Craft; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const spec = CRAFT_SPECS[craft.name];
  // Only claim usage when the published project catalogue lists this technology.
  const names = craft.name.split(/\s+(?:&|\/)\s+/).map(name => name.toLowerCase());
  const examples = projects.filter(project => project.techStack?.some(tech => names.includes(tech.toLowerCase())));

  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.documentElement.style.overflow;
    element?.showModal();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.documentElement.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="tool-inspector-title"
      aria-describedby="tool-inspector-description"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      data-lenis-prevent
    >
      <div className={styles.inspector}>
        <header className={styles.inspectorHeader}>
          <span className={styles.inspectorIcon}><TechIcon name={craft.name} size={32} colorOverride="#8edfe8" /></span>
          <div><p>Tool notes</p><h2 id="tool-inspector-title">{craft.name}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close tool inspector" autoFocus><Icon name="close" /></button>
        </header>
        <div className={styles.inspectorBody}>
          <p id="tool-inspector-description">{spec?.category ?? craft.vibe}</p>
          <h3>Where this is used</h3>
          {examples.length ? (
            <div className={styles.projectLinks}>{examples.map(project => (
              <Link key={project.name} href={`/project/${project.name.toLowerCase()}`} onClick={onClose}>{project.name}<Icon name="arrowUpRight" /></Link>
            ))}</div>
          ) : <p>Not listed in the published project stacks. The example below illustrates a pattern, not deployed project code.</p>}
          {spec?.codeSnippet && <>
            <div className={styles.codeLabel}><h3>Example code</h3><span>Illustrative, not production source</span></div>
            <pre tabIndex={0} aria-label={`${craft.name} example code`}><code>{spec.codeSnippet}</code></pre>
          </>}
        </div>
        <footer className={styles.inspectorFooter}><span>Explore the work to see the complete build.</span><button type="button" onClick={onClose}>Back to stack</button></footer>
      </div>
    </dialog>, document.body,
  );
}

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [inspected, setInspected] = useState<Craft | null>(null);
  const { animated, spatial, ready } = useExperience();
  const inView = useInView(root, { margin: '120px' });
  const chapter = chapters[active];

  function selectChapter(next: number) {
    if (next === active) return;
    setDirection(next > active ? 1 : -1);
    setActive(next);
  }

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % chapters.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + chapters.length) % chapters.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = chapters.length - 1;
    else return;
    event.preventDefault();
    selectChapter(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <section id="skills" ref={root} className={styles.section} data-hydrated={ready ? 'true' : 'false'} aria-labelledby="stack-title" style={{ '--chapter-accent': chapter.accent } as CSSProperties}>
      <div className={`section-shell ${styles.shell}`}>
        <header className={styles.heading}>
          <h2 id="stack-title">Inside the stack<span>.</span></h2>
          <p>One application. Four connected worlds. Explore the tools behind each layer.</p>
        </header>

        <div className={styles.tabs} role="tablist" aria-label="Technology layers">
          {chapters.map((item, index) => (
            <button
              key={item.label}
              ref={node => { tabs.current[index] = node; }}
              id={`skill-tab-${index}`}
              role="tab"
              aria-selected={active === index}
              aria-controls={`skill-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              type="button"
              onClick={() => selectChapter(index)}
              onKeyDown={event => navigateTabs(event, index)}
            >
              <span className={styles.tabNumber}>0{index + 1}</span>
              <span>{item.label}</span>
              <span className={styles.tabCount}>12 tools</span>
              {active === index && <motion.span className={styles.tabLine} layoutId="stack-chapter-line" transition={{ duration: animated ? .45 : 0, ease: [.16, 1, .3, 1] }} />}
            </button>
          ))}
        </div>

        <div className={styles.stage}>
          <div className={styles.chapterWindow}>
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={active}
                className={styles.chapter}
                custom={direction}
                variants={pageVariants}
                initial={animated ? 'enter' : false}
                animate="visible"
                exit={animated ? 'leave' : undefined}
                transition={{ duration: animated ? .4 : 0, ease: [.16, 1, .3, 1] }}
              >
                <span className={styles.chapterIndex}>Chapter 0{active + 1} / 04</span>
                <h3>{chapter.title.split('\n').map(line => <span key={line}>{line}</span>)}</h3>
                <p>{chapter.description}</p>
                <div className={styles.flow} aria-label="Layer workflow">
                  {chapter.flow.map((step, index) => <span key={step}>{index > 0 && <Icon name="arrowUpRight" />}{step}</span>)}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className={styles.chapterNavigation}>
              <button type="button" aria-label="Previous technology layer" disabled={active === 0} onClick={() => selectChapter(active - 1)}><Icon name="arrowDown" /></button>
              <span aria-live="polite" aria-atomic="true">{chapter.label} <span>/ 04</span></span>
              <button type="button" aria-label="Next technology layer" disabled={active === chapters.length - 1} onClick={() => selectChapter(active + 1)}><Icon name="arrowUp" /></button>
            </div>
          </div>
          <ArchitectureScene active={active} moving={spatial && inView} />
        </div>

        <div className={styles.inventory}>
          {chapters.map((item, index) => (
            <div key={item.label} id={`skill-panel-${index}`} role="tabpanel" aria-labelledby={`skill-tab-${index}`} tabIndex={0} hidden={active !== index}>
              {active === index && <>
                <div className={styles.inventoryHeading}><h3>{item.subtitle}</h3><span>Select a tool to look closer <Icon name="arrowDown" /></span></div>
                <div className={styles.tools}>
                  {constellation[index].crafts.map((craft, toolIndex) => (
                    <button
                      key={craft.name}
                      type="button"
                      className={styles.tool}
                      data-inspect-btn={craft.name}
                      aria-label={`Inspect ${craft.name}`}
                      aria-haspopup="dialog"
                      onClick={() => setInspected(craft)}
                      style={{ '--tool-order': toolIndex } as CSSProperties}
                    >
                      <span className={styles.toolLogo}><TechIcon name={craft.name} size={27} colorOverride="currentColor" /></span>
                      <span>{craft.name}</span>
                      <Icon name="arrowUpRight" />
                    </button>
                  ))}
                </div>
              </>}
            </div>
          ))}
        </div>
        <div className={styles.bottomLine}><span>48 tools. The right one for the problem.</span><a href="#projects">See them in the work <Icon name="arrowDown" /></a></div>
      </div>
      {inspected && <ToolInspector craft={inspected} onClose={() => setInspected(null)} />}
    </section>
  );
}
