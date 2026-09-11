'use client';

import { useRef, type ReactNode, type ElementType } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { useExperience } from '../ExperienceProvider';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-driven 3D reveal. Content lifts out of depth, settles perfectly flat
 * while it is being read, then recedes slightly as it leaves.
 * Layout box never moves, so this cannot create overlap.
 */
export function Spatial({
  children,
  className = '',
  as = 'div',
  depth = 1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  depth?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { animated, spatial } = useExperience();
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const Tag = motion[as as 'div'] ?? motion.div;

  if (!animated) {
    const Plain = as as ElementType;
    return <Plain className={className} ref={ref}>{children}</Plain>;
  }

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 34 * depth, rotateX: spatial ? 7 * depth : 0, z: spatial ? -70 * depth : 0, filter: 'blur(7px)' }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0, z: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.85, delay, ease: EASE }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </Tag>
  );
}

/** Staggered container: children animate in sequence. */
export function Stagger({
  children,
  className = '',
  gap = 0.07,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { animated } = useExperience();
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const Tag = motion[as as 'div'] ?? motion.div;

  if (!animated) {
    const Plain = as as ElementType;
    return <Plain className={className} ref={ref}>{children}</Plain>;
  }

  return (
    <Tag
      ref={ref}
      className={className}
      initial="hide"
      animate={inView ? 'show' : 'hide'}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Tag>
  );
}

/** A single staggered child. Must sit inside <Stagger>. */
export function StaggerItem({
  children,
  className = '',
  as = 'div',
  lift = 26,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  lift?: number;
}) {
  const { animated } = useExperience();
  const Tag = motion[as as 'div'] ?? motion.div;

  if (!animated) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      variants={{
        hide: { opacity: 0, y: lift, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  );
}

/** Continuous scroll parallax on a decorative or media layer. */
export function Parallax({
  children,
  className = '',
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { animated } = useExperience();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={animated ? { y } : undefined}>{children}</motion.div>
    </div>
  );
}

/**
 * Counts a numeric value up when scrolled into view.
 * Non-numeric figures (e.g. "∞") are rendered unchanged.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { animated } = useExperience();
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const match = value.match(/^(\d+)(.*)$/);

  if (!match || !animated) return <span ref={ref}>{value}</span>;

  const target = Number(match[1]);
  const suffix = match[2];

  return (
    <span ref={ref}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {inView ? <Ticker target={target} /> : 0}
      </motion.span>
      {suffix}
    </span>
  );
}

function Ticker({ target }: { target: number }) {
  const spring = useSpring(0, { stiffness: 58, damping: 20, mass: 0.8 });
  const rounded = useTransform(spring, latest => String(Math.round(latest)));
  spring.set(target);
  return <motion.span>{rounded}</motion.span>;
}
