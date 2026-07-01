import Reveal from '@/components/ui/Reveal';
import { phone as p, sections } from '@/lib/data';

/** The four quick-action glyphs, drawn to match design screen 1c. */
function QuickIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <div style={{ width: 20, height: 20, borderRadius: 5, background: 'linear-gradient(135deg,#7C3AED,#4F46E5)' }} />;
    case 1:
      return <div style={{ width: 20, height: 20, borderRadius: 999, border: '3px solid #C026D3' }} />;
    case 2:
      return <div style={{ width: 20, height: 16, borderRadius: 4, border: '3px solid #4F46E5' }} />;
    default:
      return (
        <div className="flex items-end gap-0.5">
          <span style={{ width: 4, height: 10, background: '#7C3AED', borderRadius: 2 }} />
          <span style={{ width: 4, height: 16, background: '#C026D3', borderRadius: 2 }} />
          <span style={{ width: 4, height: 13, background: '#4F46E5', borderRadius: 2 }} />
        </div>
      );
  }
}

/** Design screen 1c — On the counter phone, beside the "in your pocket" pitch. */
export default function PhoneShowcase() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
        {/* ---------- Copy ---------- */}
        <Reveal className="order-2 lg:order-1">
          <div className="text-[13px] font-bold uppercase tracking-[.14em]" style={{ color: '#6D28D9' }}>
            {sections.phone.eyebrow}
          </div>
          <h2
            className="mt-2 font-display font-bold"
            style={{ fontSize: 'clamp(30px,5vw,46px)', letterSpacing: '-.03em', color: '#0B0B16' }}
          >
            {sections.phone.title}
          </h2>
          <p className="mt-3 max-w-[520px] text-[17px] font-medium" style={{ color: '#504C66', lineHeight: 1.55 }}>
            {sections.phone.subtitle}
          </p>
          <ul className="mt-7 flex flex-col gap-3.5">
            {sections.phone.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[15px] font-semibold" style={{ color: '#3B3752' }}>
                <span
                  className="mt-0.5 inline-flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center text-white"
                  style={{ borderRadius: 7, background: 'linear-gradient(135deg,#7C3AED,#4F46E5)', fontSize: 12 }}
                >
                  ✓
                </span>
                {h}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---------- Phone ---------- */}
        <Reveal y={40} scale className="order-1 flex justify-center lg:order-2">
          <div
            style={{
              width: 390,
              maxWidth: '100%',
              borderRadius: 44,
              padding: 12,
              background: '#0B0B16',
              boxShadow: '0 50px 100px -40px rgba(58,30,110,.7), 0 8px 24px -12px rgba(0,0,0,.3)',
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: '100%',
                height: 792,
                borderRadius: 34,
                background:
                  'radial-gradient(600px 340px at 20% 0%, rgba(124,58,237,.28), transparent 60%), radial-gradient(500px 300px at 100% 12%, rgba(236,72,153,.24), transparent 55%), linear-gradient(180deg,#F7F5FF,#FCFAFF)',
              }}
            >
              {/* Notch */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: 12, width: 116, height: 30, background: '#0B0B16', borderRadius: 999 }}
              />

              <div style={{ padding: '52px 22px 0' }}>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-bold" style={{ color: '#6B6784' }}>
                      {p.date}
                    </div>
                    <div
                      className="font-display mt-0.5"
                      style={{ fontSize: 22, fontWeight: 700, color: '#0B0B16', letterSpacing: '-.02em' }}
                    >
                      {p.greeting}
                    </div>
                  </div>
                  <div
                    className="font-display flex items-center justify-center font-bold text-white"
                    style={{ width: 42, height: 42, borderRadius: 13, background: 'linear-gradient(135deg,#0B0B16,#3B3752)' }}
                  >
                    {p.avatar}
                  </div>
                </div>

                {/* Revenue card */}
                <div
                  className="mt-5 text-white"
                  style={{
                    padding: 22,
                    borderRadius: 24,
                    background: 'linear-gradient(150deg,#7C3AED,#C026D3 55%,#4F46E5)',
                    boxShadow: '0 26px 50px -24px rgba(124,58,237,.8)',
                  }}
                >
                  <div className="text-[13px] font-bold uppercase" style={{ color: '#EDE9FE' }}>
                    {p.revenueLabel}
                  </div>
                  <div
                    className="font-display mt-1.5"
                    style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-.02em' }}
                  >
                    {p.revenue}
                  </div>
                  <div className="mt-3.5 flex gap-[18px]">
                    {p.revenueStats.map((s, i) => (
                      <div key={s.label} className="flex gap-[18px]">
                        {i > 0 && <div style={{ width: 1, background: 'rgba(255,255,255,.25)' }} />}
                        <div>
                          <div className="text-[12px] font-semibold" style={{ color: '#DDD6FE' }}>
                            {s.label}
                          </div>
                          <div className="mt-px text-[17px] font-bold">{s.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="mt-[18px] grid grid-cols-4 gap-2.5">
                  {p.quickActions.map((label, i) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: 17,
                          background: '#fff',
                          border: '1px solid rgba(11,11,22,.07)',
                          boxShadow: '0 10px 20px -14px rgba(0,0,0,.3)',
                        }}
                      >
                        <QuickIcon index={i} />
                      </div>
                      <span className="text-[11px] font-bold" style={{ color: '#3B3752' }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Recent bills */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-display text-[16px] font-bold" style={{ color: '#0B0B16' }}>
                    Recent bills
                  </span>
                  <span className="text-[12px] font-bold" style={{ color: '#6D28D9' }}>
                    See all
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-2.5">
                  {p.bills.map((b) => (
                    <div
                      key={b.meta}
                      className="flex items-center justify-between"
                      style={{
                        padding: 14,
                        borderRadius: 16,
                        background: '#fff',
                        border: '1px solid rgba(11,11,22,.06)',
                        boxShadow: '0 10px 22px -18px rgba(0,0,0,.3)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="font-display flex items-center justify-center font-bold"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            background:
                              b.tone === 'violet'
                                ? 'linear-gradient(135deg,#EDE9FE,#F5D0FE)'
                                : 'linear-gradient(135deg,#FEF3C7,#FDE68A)',
                            color: b.tone === 'violet' ? '#6D28D9' : '#B45309',
                          }}
                        >
                          {b.initial}
                        </div>
                        <div>
                          <div className="text-[14px] font-bold" style={{ color: '#0B0B16' }}>
                            {b.name}
                          </div>
                          <div className="text-[12px] font-semibold" style={{ color: '#9A96AE' }}>
                            {b.meta}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[14px] font-bold" style={{ color: '#0B0B16' }}>
                          {b.amount}
                        </div>
                        <div
                          className="text-[11px] font-bold"
                          style={{ color: b.status === 'Paid' ? '#15803D' : '#B45309' }}
                        >
                          {b.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tab bar */}
              <div
                className="absolute inset-x-0 bottom-0 flex items-center justify-between"
                style={{
                  height: 74,
                  padding: '0 30px',
                  background: 'rgba(255,255,255,.8)',
                  backdropFilter: 'blur(16px)',
                  borderTop: '1px solid rgba(11,11,22,.06)',
                }}
              >
                <div style={{ width: 24, height: 24, borderRadius: 7, background: 'linear-gradient(135deg,#7C3AED,#4F46E5)' }} />
                <div style={{ width: 22, height: 22, borderRadius: 999, border: '2.5px solid #B9B4CC' }} />
                <div
                  className="flex items-center justify-center text-white"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 16,
                    marginTop: -18,
                    background: 'linear-gradient(135deg,#7C3AED,#C026D3 55%,#4F46E5)',
                    boxShadow: '0 14px 26px -10px rgba(124,58,237,.8)',
                    fontSize: 26,
                  }}
                >
                  +
                </div>
                <div style={{ width: 22, height: 18, borderRadius: 4, border: '2.5px solid #B9B4CC' }} />
                <div style={{ width: 24, height: 24, borderRadius: 999, background: '#E4E0EE' }} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
