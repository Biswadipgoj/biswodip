'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for closest interactive element
      const interactiveEl = target.closest('a, button, .magnetic, input, textarea');
      if (interactiveEl) {
        setIsHovered(true);
        // Optional: grab data attribute for custom cursor text
        const text = interactiveEl.getAttribute('data-cursor');
        if (text) setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Hide default cursor globally on desktop
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY]);

  // Variants for different cursor states
  const variants = {
    default: {
      height: 12,
      width: 12,
      x: '-50%',
      y: '-50%',
      backgroundColor: '#f6f8fc',
      mixBlendMode: 'difference' as any,
    },
    hover: {
      height: cursorText ? 64 : 48,
      width: cursorText ? 64 : 48,
      x: '-50%',
      y: '-50%',
      backgroundColor: '#f6f8fc',
      mixBlendMode: 'difference' as any,
    }
  };

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden items-center justify-center rounded-full text-center text-[10px] font-bold text-black md:flex"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      variants={variants}
      animate={isHovered ? 'hover' : 'default'}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      {cursorText && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
