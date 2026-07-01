'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

type Ripple = { id: number; x: number; y: number };

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

/**
 * Premium magnetic CTA: the button leans toward the cursor and emits a colorful
 * ripple on click. Used for hero + contact calls to action.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  target,
  rel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function handleMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.32, y: y * 0.32 });
  }

  function reset() {
    setPos({ x: 0, y: 0 });
  }

  function spawnRipple(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
    onClick?.();
  }

  const base =
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-shadow duration-300 will-change-transform';
  const styles =
    variant === 'primary'
      ? 'text-white shadow-[0_14px_40px_-10px_rgba(139,92,246,0.6)]'
      : 'text-ink glass-strong hover:shadow-[0_14px_40px_-14px_rgba(34,211,238,0.5)]';

  const inner = (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 animate-gradient-pan"
          style={{
            backgroundImage:
              'linear-gradient(110deg,#3b82f6,#22d3ee,#8b5cf6,#f472b6,#fbbf24)',
            backgroundSize: '250% 250%',
          }}
        />
      )}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: r.x,
            top: r.y,
            background: 'rgba(255,255,255,0.7)',
            animation: 'ripple-grow 0.7s ease-out forwards',
          }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <style>{`@keyframes ripple-grow{to{width:320px;height:320px;opacity:0}}`}</style>
    </>
  );

  const motionProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onClick: spawnRipple,
    animate: { x: pos.x, y: pos.y },
    transition: { type: 'spring' as const, stiffness: 260, damping: 18, mass: 0.4 },
    className: `${base} ${styles} ${className}`,
    'aria-label': ariaLabel,
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" {...motionProps}>
      {inner}
    </motion.button>
  );
}
