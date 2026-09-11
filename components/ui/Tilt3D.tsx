'use client';
import { useEffect, useRef, type ReactNode, type PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useExperience } from '../ExperienceProvider';
export default function Tilt3D({ children, className = '', maxTilt = 5, glare = true, lift = false }: { children: ReactNode; className?: string; maxTilt?: number; glare?: boolean; lift?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { spatial } = useExperience();
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 140, damping: 24 });
  const rotateY = useSpring(x, { stiffness: 140, damping: 24 });
  const shine = useTransform(rotateY, [-6, 6], ['translate3d(-20%,0,0)', 'translate3d(20%,0,0)']);
  useEffect(() => { if (!spatial) { x.jump(0); y.jump(0); } }, [spatial, x, y]);
  const reset = () => { x.set(0); y.set(0); };
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!spatial || event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const limit = Math.min(6, Math.abs(maxTilt));
    const clamp = (value: number) => Math.max(-limit, Math.min(limit, value));
    x.set(clamp(((event.clientX - rect.left) / rect.width - 0.5) * limit * 2));
    y.set(clamp(-((event.clientY - rect.top) / rect.height - 0.5) * limit * 2));
  }
  return <div ref={ref} className={`tilt-anchor ${className}`} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset} onBlur={reset}>
    <motion.div className="tilt-surface spatial-layer" style={{ rotateX: spatial ? rotateX : 0, rotateY: spatial ? rotateY : 0 }} whileHover={spatial && lift ? { y: -3 } : undefined}>
      {children}{glare && <motion.span className="surface-shine" aria-hidden="true" style={{ transform: spatial ? shine : 'none' }} />}
    </motion.div>
  </div>;
}
