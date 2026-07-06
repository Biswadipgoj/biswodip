'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Tilt3D — the interaction primitive of the whole site.
 *
 * Wraps any block in a pointer-tracked 3D tilt with a travelling glare
 * highlight, so every card on the page responds to the visitor like an
 * object floating in the world rather than ink on a flat page.
 */
export default function Tilt3D({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  /** max degrees of rotation toward the pointer */
  maxTilt?: number;
  /** show the moving light reflection */
  glare?: boolean;
  /** raise slightly on hover */
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 20, mass: 0.35 });
  const sy = useSpring(py, { stiffness: 180, damping: 20, mass: 0.35 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const glareX = useTransform(sx, [-0.5, 0.5], ['20%', '80%']);
  const glareY = useTransform(sy, [-0.5, 0.5], ['20%', '80%']);
  const glareBg = useTransform([glareX, glareY], ([gx, gy]) =>
    `radial-gradient(320px circle at ${gx} ${gy}, rgba(255,255,255,0.14), transparent 65%)`,
  );

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={lift ? { y: -6 } : undefined}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative h-full"
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}
