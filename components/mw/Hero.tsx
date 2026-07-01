import LoginCard from './LoginCard';
import { hero } from '@/lib/data';

const rise = (delay: number) => ({
  animation: `riseIn .8s ${delay}s cubic-bezier(.2,.7,.2,1) both`,
});

/**
 * Design screen 1a — Portal + login. A two-column aurora hero: pitch + stats on
 * the left, a frosted sign-in card floating over glowing art on the right.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:pb-28 lg:pt-36"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
        {/* ---------- Left: pitch ---------- */}
        <div>
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-[15px] py-2 text-[13px] font-bold uppercase tracking-[.12em]"
            style={{
              background: 'rgba(255,255,255,.7)',
              border: '1px solid rgba(124,58,237,.25)',
              color: '#6D28D9',
              ...rise(0.05),
            }}
          >
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ background: '#C026D3', boxShadow: '0 0 0 4px rgba(192,38,211,.18)' }}
            />
            {hero.eyebrow}
          </div>

          <h1
            className="mt-6 font-display font-bold"
            style={{
              fontSize: 'clamp(44px, 8vw, 80px)',
              lineHeight: 0.96,
              letterSpacing: '-.035em',
              color: '#0B0B16',
            }}
          >
            <span className="block" style={rise(0.12)}>
              {hero.title.line1}
            </span>
            <span className="block" style={rise(0.2)}>
              <span className="aurora-text">{hero.title.gradientWord}</span>
              {hero.title.line2Rest}
            </span>
            <span className="block" style={rise(0.28)}>
              {hero.title.line3}
            </span>
          </h1>

          <p
            className="mt-6 max-w-[500px] text-[19px] font-medium"
            style={{ lineHeight: 1.55, color: '#504C66', ...rise(0.36) }}
          >
            {hero.subtitle}
          </p>

          <div className="mt-[30px] flex flex-wrap gap-2.5" style={rise(0.44)}>
            {hero.featurePills.map((pill) => (
              <div
                key={pill}
                className="rounded-full px-4 py-[9px] text-[14px] font-bold"
                style={{
                  background: 'rgba(255,255,255,.7)',
                  border: '1px solid rgba(11,11,22,.1)',
                  color: '#3B3752',
                }}
              >
                {pill}
              </div>
            ))}
          </div>

          <div className="mt-11 flex flex-wrap gap-10 sm:gap-11" style={{ animation: 'fadeIn 1s .6s both' }}>
            {hero.stats.map((s) => (
              <div key={s.label}>
                <div
                  className="font-display"
                  style={{ fontSize: 34, fontWeight: 700, color: '#0B0B16', letterSpacing: '-.02em' }}
                >
                  {s.value}
                  {s.suffix && <span style={{ fontSize: 20, color: '#7C3AED' }}>{s.suffix}</span>}
                </div>
                <div className="mt-0.5 text-[13px] font-semibold" style={{ color: '#6B6784' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Right: login art ---------- */}
        <div className="relative flex min-h-[520px] items-center justify-center">
          {/* Glow blob */}
          <div
            className="absolute hidden sm:block"
            style={{
              width: 460,
              height: 460,
              borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(192,38,211,.42),transparent 65%)',
              filter: 'blur(18px)',
              animation: 'glow 5s ease-in-out infinite',
            }}
          />
          {/* Tilted aurora slab behind the card */}
          <div
            className="absolute hidden sm:block"
            style={{
              width: 360,
              height: 460,
              borderRadius: 26,
              background: 'linear-gradient(160deg,rgba(124,58,237,.92),rgba(79,70,229,.92))',
              transform: 'translate(38px,44px) rotate(6deg)',
              boxShadow: '0 40px 80px -30px rgba(79,70,229,.7)',
            }}
          />

          <LoginCard />
        </div>
      </div>
    </section>
  );
}
