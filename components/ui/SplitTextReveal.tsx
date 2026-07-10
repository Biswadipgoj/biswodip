'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitTextReveal({ text, className = '', delay = 0 }: SplitTextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  // Split text into words, then words into characters for fine-grained control
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: 'flex', flexWrap: 'wrap' }}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <span key={index} style={{ display: 'inline-flex', marginRight: '0.25em', overflow: 'hidden' }}>
          {Array.from(word).map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={child}
              style={{ display: 'inline-block', transformOrigin: '50% 50% -20px' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}
