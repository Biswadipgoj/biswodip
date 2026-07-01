/**
 * The Mobile World mark — an aurora-gradient rounded square with a thin white
 * "screen" outline inset. Sized via `size` (px); used in the nav, sidebar and footer.
 */
export default function Logo({ size = 34, glow = true }: { size?: number; glow?: boolean }) {
  const inset = Math.round(size * 0.24);
  const insetX = Math.round(size * 0.32);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(8, size * 0.29),
        background: 'linear-gradient(135deg,#7C3AED,#C026D3 55%,#4F46E5)',
        position: 'relative',
        boxShadow: glow ? '0 8px 18px -6px rgba(124,58,237,.7)' : 'none',
        flexShrink: 0,
      }}
      aria-hidden
    >
      <div
        style={{
          position: 'absolute',
          top: inset,
          bottom: inset,
          left: insetX,
          right: insetX,
          border: '2px solid rgba(255,255,255,.92)',
          borderRadius: 3,
        }}
      />
    </div>
  );
}
