'use client';

import { Component, useEffect, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';

/* The universe is heavy and browser-only — stream it in after first paint.
   Until it arrives (and forever, under reduced motion) the CSS aurora
   backdrop in the layout carries the scene. */
const WorldScene = dynamic(() => import('@/components/scene/WorldScene'), {
  ssr: false,
  loading: () => null,
});

class SceneErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('WorldScene canvas caught error, gracefully falling back to CSS aurora:', error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

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
      <SceneErrorBoundary>
        <WorldScene />
      </SceneErrorBoundary>
    </div>
  );
}
