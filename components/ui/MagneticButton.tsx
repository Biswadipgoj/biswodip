'use client';
import type { ReactNode, PointerEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useExperience } from '../ExperienceProvider';
type Props = { children: ReactNode; href?: string; onClick?: () => void; variant?: 'primary' | 'ghost'; className?: string; target?: string; rel?: string; ariaLabel?: string };
export default function MagneticButton({ children, href, onClick, variant = 'primary', className = '', target, rel, ariaLabel }: Props) {
  const { spatial } = useExperience();
  const px = useMotionValue(0); const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 230, damping: 22 }); const y = useSpring(py, { stiffness: 230, damping: 22 });
  const reset = () => { px.set(0); py.set(0); };
  const move = (event: PointerEvent<HTMLElement>) => {
    if (!spatial || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left - rect.width / 2) * 0.07); py.set((event.clientY - rect.top - rect.height / 2) * 0.07);
  };
  const props = { className: `button button-${variant} ${className}`, onPointerMove: move, onPointerLeave: reset, onBlur: reset, onClick, style: { x: spatial ? x : 0, y: spatial ? y : 0 }, 'aria-label': ariaLabel };
  return href ? <motion.a {...props} href={href} target={target} rel={rel}>{children}</motion.a> : <motion.button {...props} type="button">{children}</motion.button>;
}
