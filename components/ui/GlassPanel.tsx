'use client';

import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { useExperience } from '../ExperienceProvider';

type Props = {
  children: ReactNode;
  className?: string;
  /** Parallax distance in px across the element's full scroll traversal. */
  drift?: number;
  /** Extra rotateX applied from scroll progress, in degrees. */
  tilt?: number;
  /** Adds pointer-reactive sheen + depth (fine pointers only). */
  interactive?: boolean;
};

/**
 * A glass object with real depth.
 *
 * Three motion sources compose on one element:
 *  1. entrance — opacity/translateY settle as it enters the viewport
 *  2. scroll   — `drift` translateY and optional rotateX track scroll progress
 *  3. pointer  — a small spring-driven sheen, only when `spatial` is true
 *
 * Everything animates transform/opacity only. The pointer path is written
 * straight to motion values, so it stays on the compositor and never triggers
 * React re-renders.
 */
export default function GlassPanel({
  children,
  className = '',
  drift = 0,
  tilt = 0,
  interactive = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { animated, spatial } = useExperience();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [drift * 0.5, -drift * 0.5]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [tilt, 0, -tilt]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 140, damping: 20, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 140, damping: 20, mass: 0.6 });
  // Hooks must run unconditionally; the value is simply unused when not spatial.
  const sheenOpacity = useTransform(springX, [-4, 0, 4], [0.44, 0.12, 0.44]);

  const canTilt = interactive && spatial;

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canTilt || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
    pointerY.set(-((event.clientY - rect.top) / rect.height - 0.5) * 7);
  };
  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`glass specular ${className}`}
      initial={animated ? { opacity: 0, y: 34, scale: 0.985 } : false}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{
        ...(drift ? { y } : {}),
        ...(tilt ? { rotateX } : {}),
        ...(canTilt ? { rotateY: springY } : {}),
        transformStyle: 'preserve-3d',
      }}
    >
      {canTilt && (
        <motion.span aria-hidden="true" className="panel-sheen" style={{ opacity: sheenOpacity }} />
      )}
      {children}
    </motion.div>
  );
}
