'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { sourceCode, personal } from '@/lib/data';

/** Flattens the token structure into a single string for character-by-character typing */
function flattenCode(): string {
  return sourceCode.plainText;
}

/** Maps a character index in the plain text back to its syntax token type */
function getTokenType(charIndex: number): string {
  let idx = 0;
  for (const line of sourceCode.lines) {
    for (const token of line.tokens) {
      const end = idx + token.text.length;
      if (charIndex < end) return token.type;
      idx = end;
    }
    idx++; // newline
  }
  return 'punctuation';
}

const TOKEN_CLASS_MAP: Record<string, string> = {
  keyword: 'tok-keyword',
  string: 'tok-string',
  function: 'tok-function',
  punctuation: 'tok-punctuation',
  variable: 'tok-variable',
  comment: 'tok-comment',
};

export default function SourceHero() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<'typing' | 'code' | 'reveal'>( reduceMotion ? 'reveal' : 'typing');
  const [typedLength, setTypedLength] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const codeText = flattenCode();

  // Typing animation — variable cadence, ~2s total
  const typingDuration = 2200; // ms

  const animateTyping = useCallback((timestamp: number) => {
    if (!startRef.current) startRef.current = timestamp;
    const elapsed = timestamp - startRef.current;
    const progress = Math.min(1, elapsed / typingDuration);

    // Ease-out for natural typing feel (faster start, slower end)
    const easedProgress = 1 - Math.pow(1 - progress, 2.5);
    const chars = Math.floor(easedProgress * codeText.length);

    setTypedLength(chars);

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animateTyping);
    } else {
      setTypedLength(codeText.length);
      // Brief hold on completed code before transform
      setTimeout(() => setPhase('reveal'), 600);
    }
  }, [codeText.length]);

  useEffect(() => {
    if (reduceMotion) {
      setPhase('reveal');
      return;
    }

    // Small delay before typing starts
    const delay = setTimeout(() => {
      setPhase('typing');
      rafRef.current = requestAnimationFrame(animateTyping);
    }, 800);

    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion, animateTyping]);

  // Render the typed characters with syntax highlighting
  function renderTypedCode() {
    const visibleText = codeText.slice(0, typedLength);
    const spans: React.ReactNode[] = [];
    let currentType = '';
    let currentText = '';

    for (let i = 0; i < visibleText.length; i++) {
      const tokenType = getTokenType(i);
      if (tokenType !== currentType) {
        if (currentText) {
          spans.push(
            <span key={`${spans.length}`} className={TOKEN_CLASS_MAP[currentType] || 'tok-punctuation'}>
              {currentText}
            </span>
          );
        }
        currentType = tokenType;
        currentText = visibleText[i];
      } else {
        currentText += visibleText[i];
      }
    }
    if (currentText) {
      spans.push(
        <span key={`${spans.length}`} className={TOKEN_CLASS_MAP[currentType] || 'tok-punctuation'}>
          {currentText}
        </span>
      );
    }

    return spans;
  }

  // Render the full code with all syntax highlighting (for reduced motion / reveal)
  function renderFullCode() {
    return sourceCode.lines.map((line, li) => (
      <div key={li}>
        {line.tokens.map((token, ti) => (
          <span key={ti} className={TOKEN_CLASS_MAP[token.type] || 'tok-punctuation'}>
            {token.text}
          </span>
        ))}
      </div>
    ));
  }

  return (
    <section id="source" className="source-chapter" aria-labelledby="source-title">
      <div className="chapter-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100dvh - 140px)' }}>
        <AnimatePresence mode="wait">
          {phase !== 'reveal' ? (
            <motion.div
              key="code-phase"
              className="source-code mono"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: -20,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ whiteSpace: 'pre' }}
            >
              {phase === 'typing' ? (
                <>
                  {renderTypedCode()}
                  {showCursor && <span className="cursor-blink" aria-hidden="true" />}
                </>
              ) : (
                renderFullCode()
              )}
            </motion.div>
          ) : (
            <motion.div
              key="name-phase"
              className="source-name"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: reduceMotion ? 0 : 0.1 }}
            >
              {/* Bracket shape hint */}
              <motion.div
                aria-hidden="true"
                className="mono"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  fontWeight: 400,
                  color: 'var(--source-ink-muted)',
                  marginBottom: '16px',
                  letterSpacing: '0.3em',
                  opacity: 0.3,
                }}
                initial={reduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                {'{ }'}
              </motion.div>

              <h1 id="source-title">{personal.name}</h1>
              <p className="tagline">{personal.tagline}</p>

              <motion.div
                className="source-actions"
                initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.35 }}
              >
                <a href="#runtime" className="btn-solid">
                  View Work <span aria-hidden="true">→</span>
                </a>
                <a href="#compile" className="btn-ghost">
                  See the Stack
                </a>
              </motion.div>

              {/* Quiet cursor blink next to name */}
              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                <span className="cursor-blink" aria-hidden="true" style={{ opacity: 0.4, height: '16px' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
