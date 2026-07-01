'use client';

import { useState } from 'react';
import { login, floatingCards } from '@/lib/data';

const inputBase: React.CSSProperties = {
  width: '100%',
  marginTop: 8,
  padding: '14px 16px',
  borderRadius: 13,
  border: '1.5px solid rgba(11,11,22,.12)',
  background: 'rgba(255,255,255,.85)',
  fontFamily: "'Manrope', sans-serif",
  fontSize: 15,
  fontWeight: 600,
  color: '#0B0B16',
  outline: 'none',
};

/** The frosted "Sign in to your workspace" card from design screen 1a. */
export default function LoginCard() {
  const [showPw, setShowPw] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);

  const focusRing = (name: string): React.CSSProperties =>
    focus === name
      ? { borderColor: '#7C3AED', boxShadow: '0 0 0 4px rgba(124,58,237,.16)' }
      : {};

  return (
    <div
      id="signin"
      className="relative w-full max-w-[428px] scroll-mt-28"
      style={{
        padding: '34px 34px 30px',
        borderRadius: 26,
        background: 'rgba(255,255,255,.74)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,.85)',
        boxShadow:
          '0 44px 90px -34px rgba(58,30,110,.6), inset 0 1px 0 rgba(255,255,255,.9)',
        animation: 'riseIn .9s .3s cubic-bezier(.2,.7,.2,1) both',
      }}
    >
      <div
        className="font-display"
        style={{ fontSize: 24, fontWeight: 600, color: '#0B0B16', letterSpacing: '-.02em' }}
      >
        {login.title}
      </div>
      <div style={{ fontSize: 14, color: '#6B6784', marginTop: 6, fontWeight: 500 }}>
        {login.subtitle}
      </div>

      <div style={{ marginTop: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: '#3B3752', letterSpacing: '.02em' }}>
          User ID
        </label>
        <input
          type="text"
          defaultValue={login.userId}
          onFocus={() => setFocus('user')}
          onBlur={() => setFocus(null)}
          style={{ ...inputBase, ...focusRing('user') }}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: '#3B3752', letterSpacing: '.02em' }}>
          Password
        </label>
        <div style={{ position: 'relative', marginTop: 8 }}>
          <input
            type={showPw ? 'text' : 'password'}
            defaultValue={login.password}
            onFocus={() => setFocus('pw')}
            onBlur={() => setFocus(null)}
            style={{ ...inputBase, marginTop: 0, padding: '14px 70px 14px 16px', ...focusRing('pw') }}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '7px 12px',
              borderRadius: 9,
              border: 'none',
              background: 'rgba(124,58,237,.1)',
              color: '#6D28D9',
              fontFamily: "'Manrope', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {showPw ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between">
        <label className="flex items-center gap-2" style={{ fontSize: 13, fontWeight: 600, color: '#504C66' }}>
          <span
            className="inline-flex h-[18px] w-[18px] items-center justify-center text-white"
            style={{
              borderRadius: 6,
              background: 'linear-gradient(135deg,#7C3AED,#4F46E5)',
              fontSize: 12,
            }}
          >
            ✓
          </span>
          Keep me signed in
        </label>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#6D28D9', cursor: 'pointer' }}>Forgot?</span>
      </div>

      <button
        type="button"
        className="mt-[22px] w-full cursor-pointer text-white"
        style={{
          padding: 15,
          borderRadius: 14,
          background: 'linear-gradient(135deg,#7C3AED,#C026D3 55%,#4F46E5)',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 700,
          boxShadow: '0 22px 44px -18px rgba(124,58,237,.75)',
        }}
      >
        {login.cta} →
      </button>

      <div className="mt-[18px] text-center" style={{ fontSize: 13, fontWeight: 600, color: '#6B6784' }}>
        {login.help} <span style={{ color: '#6D28D9', fontWeight: 700 }}>{login.helpAction}</span>
      </div>

      {/* Floating glass stats — anchored to the card, only where there's side room. */}
      <div
        className="absolute z-10 hidden lg:block"
        style={{
          top: 26,
          left: -120,
          padding: '13px 16px',
          borderRadius: 16,
          background: 'rgba(255,255,255,.9)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,.9)',
          boxShadow: '0 20px 44px -20px rgba(58,30,110,.5)',
          animation: 'floaty 6s ease-in-out infinite',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: '#6B6784', textTransform: 'uppercase' }}>
          {floatingCards.sales.label}
        </div>
        <div className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#0B0B16', marginTop: 2 }}>
          {floatingCards.sales.value}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#16A34A', marginTop: 1 }}>
          {floatingCards.sales.delta}
        </div>
      </div>

      <div
        className="absolute z-10 hidden lg:block"
        style={{
          bottom: 40,
          right: -116,
          padding: '13px 16px',
          borderRadius: 16,
          background: 'rgba(11,11,22,.9)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 20px 44px -20px rgba(0,0,0,.6)',
          animation: 'floaty 6s ease-in-out .8s infinite',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: '#C4B5FD', textTransform: 'uppercase' }}>
          {floatingCards.lowStock.label}
        </div>
        <div className="font-display" style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginTop: 3 }}>
          {floatingCards.lowStock.value}
        </div>
      </div>
    </div>
  );
}
