'use client';

import { motion } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';

export default function AnimatedTechGrid() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use useMemo with stable values to avoid hydration mismatch
  const nodes = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: (i * 7.3 + 13) % 100,
      y: (i * 11.7 + 7) % 100,
      size: (i % 4) + 2,
      duration: (i % 8) + 12,
      delay: (i % 5) * 1.2,
      color: ['#22d3ee', '#f472b6', '#10b981', '#a78bfa', '#fb923c'][i % 5],
    })), []
  );

  if (!mounted) return <div className="fixed inset-0 bg-[#05071a] -z-50" />;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#05071a]">

      {/* Large ambient color blobs — give the page color depth */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vh] rounded-full blur-[160px] opacity-25 spatial-layer"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vh] rounded-full blur-[140px] opacity-20 spatial-layer"
        style={{ background: 'radial-gradient(circle, #0891b2, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], x: [0, 40, 0], y: [0, -60, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vh] rounded-full blur-[180px] opacity-15 spatial-layer"
        style={{ background: 'radial-gradient(circle, #be185d, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
        className="absolute bottom-[5%] right-[5%] w-[40vw] h-[40vh] rounded-full blur-[120px] opacity-15 spatial-layer"
        style={{ background: 'radial-gradient(circle, #065f46, transparent 70%)' }}
      />

      {/* Subtle Tech Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(34,211,238,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34,211,238,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated glowing particles */}
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className="absolute rounded-full spatial-layer"
          style={{
            width: node.size,
            height: node.size,
            left: `${node.x}%`,
            top: `${node.y}%`,
            backgroundColor: node.color,
            boxShadow: `0 0 ${node.size * 4}px ${node.color}`,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, 60, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: node.duration,
            delay: node.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Horizontal scanline sweep */}
      <motion.div
        animate={{ y: ['-5%', '105%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
        className="absolute left-0 w-full h-[2px] opacity-10 spatial-layer"
        style={{ background: 'linear-gradient(to right, transparent, #22d3ee, #a78bfa, transparent)' }}
      />

      {/* Edge vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,7,26,0.85)_100%)]" />
    </div>
  );
}
