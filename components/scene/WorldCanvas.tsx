'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/* The universe is heavy and browser-only — stream it in after first paint.
   Until it arrives (and forever, under reduced motion) the CSS aurora
   backdrop in the layout carries the scene. */
const WorldScene = dynamic(() => import('@/components/scene/WorldScene'), {
  ssr: false,
  loading: () => null,
});

/**
 * Mounts the persistent 3D world as a fixed layer behind the entire page.
 * Every section floats above this one continuous universe — the camera
 * travels through it as you scroll, so the site never reads as flat pages.
 */
export default function WorldCanvas() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReady(true);
    setReduced(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  }, []);

  if (!ready || reduced) return null;

  return (
    // z-0 (not negative) so the canvas layer composites reliably everywhere;
    // the page content mounts after it in the DOM and therefore paints above.
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <WorldScene />
    </div>
  );
}
