import Logo from './Logo';
import Reveal from '@/components/ui/Reveal';
import { dashboard as d, sections, brand } from '@/lib/data';

const cardBase: React.CSSProperties = {
  padding: 20,
  borderRadius: 20,
  background: '#fff',
  border: '1px solid rgba(11,11,22,.06)',
  boxShadow: '0 14px 30px -20px rgba(0,0,0,.2)',
};

const toneColor: Record<string, string> = {
  green: '#16A34A',
  red: '#DC2626',
  neutral: '#6B6784',
  brand: '#E9D5FF',
};

/** Design screen 1b — Dashboard home, framed as an in-browser product showcase. */
export default function Dashboard() {
  return (
    <section id="workspace" className="scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-9 max-w-2xl">
          <div className="text-[13px] font-bold uppercase tracking-[.14em]" style={{ color: '#6D28D9' }}>
            {sections.dashboard.eyebrow}
          </div>
          <h2
            className="mt-2 font-display font-bold"
            style={{ fontSize: 'clamp(30px,5vw,46px)', letterSpacing: '-.03em', color: '#0B0B16' }}
          >
            {sections.dashboard.title}
          </h2>
          <p className="mt-3 text-[17px] font-medium" style={{ color: '#504C66', lineHeight: 1.55 }}>
            {sections.dashboard.subtitle}
          </p>
        </Reveal>

        <Reveal
          y={40}
          scale
          className="overflow-hidden rounded-[24px]"
          style={{ boxShadow: '0 60px 120px -40px rgba(58,30,110,.45), 0 8px 24px -12px rgba(0,0,0,.2)' }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: '#EDEAF6', borderBottom: '1px solid rgba(11,11,22,.06)' }}
          >
            <span className="h-3 w-3 rounded-full" style={{ background: '#FF5F57' }} />
            <span className="h-3 w-3 rounded-full" style={{ background: '#FEBC2E' }} />
            <span className="h-3 w-3 rounded-full" style={{ background: '#28C840' }} />
            <div
              className="ml-3 hidden rounded-md px-3 py-1 text-[12px] font-semibold sm:block"
              style={{ background: '#fff', color: '#9A96AE' }}
            >
              app.mobileworld.shop
            </div>
          </div>

          {/* Scroll wrapper so the fixed-width app fits any viewport */}
          <div className="mw-scroll overflow-x-auto" style={{ background: '#F0EDF8' }}>
            <div className="flex" style={{ minWidth: 1120, background: 'linear-gradient(180deg,#F5F3FB,#F0EDF8)' }}>
              {/* ---------- Sidebar ---------- */}
              <aside
                className="flex flex-shrink-0 flex-col gap-1.5"
                style={{ width: 248, padding: '30px 20px', background: '#0B0B16' }}
              >
                <div className="flex items-center gap-3 px-2 pb-5">
                  <Logo size={34} glow={false} />
                  <span className="font-display text-[16px] font-semibold text-white">{brand.short}</span>
                </div>
                {d.sidebar.map((item) =>
                  item.active ? (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,rgba(124,58,237,.9),rgba(79,70,229,.9))' }}
                    >
                      <span className="h-2 w-2 rounded-full bg-white" />
                      {item.label}
                    </div>
                  ) : (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] font-semibold"
                      style={{ color: '#A7A2C0' }}
                    >
                      <span className="h-2 w-2 rounded-[3px]" style={{ background: '#4B4766' }} />
                      {item.label}
                    </div>
                  ),
                )}
                <div
                  className="mt-auto rounded-2xl p-4"
                  style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)' }}
                >
                  <div className="text-[13px] font-bold text-white">{d.storeHealth.title}</div>
                  <div className="mt-0.5 text-[12px]" style={{ color: '#A7A2C0' }}>
                    {d.storeHealth.note}
                  </div>
                  <div
                    className="mt-2.5 h-1.5 overflow-hidden rounded-full"
                    style={{ background: 'rgba(255,255,255,.12)' }}
                  >
                    <div
                      className="h-full"
                      style={{ width: `${d.storeHealth.pct}%`, background: 'linear-gradient(90deg,#7C3AED,#C026D3)' }}
                    />
                  </div>
                </div>
              </aside>

              {/* ---------- Main ---------- */}
              <div className="flex-1" style={{ padding: '28px 34px' }}>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="font-display"
                      style={{ fontSize: 28, fontWeight: 700, color: '#0B0B16', letterSpacing: '-.02em' }}
                    >
                      {d.greeting}
                    </div>
                    <div className="mt-0.5 text-[14px] font-medium" style={{ color: '#6B6784' }}>
                      {d.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="text-[14px]"
                      style={{
                        width: 300,
                        padding: '11px 16px',
                        borderRadius: 12,
                        background: '#fff',
                        border: '1px solid rgba(11,11,22,.08)',
                        color: '#9A96AE',
                        boxShadow: '0 4px 14px -8px rgba(0,0,0,.15)',
                      }}
                    >
                      {d.searchPlaceholder}
                    </div>
                    <div
                      className="text-[14px] font-bold text-white"
                      style={{
                        padding: '11px 20px',
                        borderRadius: 12,
                        background: 'var(--aurora)',
                        boxShadow: '0 14px 30px -12px rgba(124,58,237,.6)',
                      }}
                    >
                      {d.primaryAction}
                    </div>
                    <div
                      className="font-display flex items-center justify-center font-bold text-white"
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg,#0B0B16,#3B3752)',
                      }}
                    >
                      {d.avatar}
                    </div>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="mt-6 grid grid-cols-4 gap-[18px]">
                  {d.stats.map((s) => {
                    const brandCard = s.tone === 'brand';
                    return (
                      <div
                        key={s.label}
                        style={
                          brandCard
                            ? {
                                padding: 20,
                                borderRadius: 20,
                                background: 'linear-gradient(150deg,#7C3AED,#4F46E5)',
                                color: '#fff',
                                boxShadow: '0 24px 44px -22px rgba(79,70,229,.7)',
                              }
                            : cardBase
                        }
                      >
                        <div
                          className="text-[13px] font-bold uppercase"
                          style={{ color: brandCard ? '#DDD6FE' : '#6B6784' }}
                        >
                          {s.label}
                        </div>
                        <div
                          className="font-display mt-2"
                          style={{ fontSize: 32, fontWeight: 700, color: brandCard ? '#fff' : '#0B0B16' }}
                        >
                          {s.value}
                          {s.unit && <span style={{ fontSize: 15, color: '#DC2626' }}> {s.unit}</span>}
                        </div>
                        <div
                          className="mt-1 text-[13px] font-semibold"
                          style={{ color: toneColor[s.tone] }}
                        >
                          {s.delta}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chart + top models */}
                <div className="mt-[18px] grid gap-[18px]" style={{ gridTemplateColumns: '1.55fr 1fr' }}>
                  <div style={{ ...cardBase, padding: 22 }}>
                    <div className="flex items-center justify-between">
                      <div className="font-display text-[17px] font-bold" style={{ color: '#0B0B16' }}>
                        Sales · last 7 days
                      </div>
                      <div className="flex gap-1.5">
                        <span
                          className="rounded-full px-3 py-[5px] text-[12px] font-bold text-white"
                          style={{ background: '#0B0B16' }}
                        >
                          Week
                        </span>
                        <span
                          className="rounded-full px-3 py-[5px] text-[12px] font-bold"
                          style={{ background: '#F1EEF9', color: '#6B6784' }}
                        >
                          Month
                        </span>
                      </div>
                    </div>
                    <div className="mt-[22px] flex items-end gap-[18px] pt-2.5" style={{ height: 210 }}>
                      {d.week.map((b) => (
                        <div key={b.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                          <div
                            className="w-full"
                            style={{
                              height: `${b.height}%`,
                              borderRadius: '9px 9px 4px 4px',
                              background: b.active
                                ? 'linear-gradient(180deg,#7C3AED,#C026D3)'
                                : 'linear-gradient(180deg,#C4B5FD,#A78BFA)',
                              boxShadow: b.active ? '0 12px 24px -10px rgba(124,58,237,.6)' : 'none',
                            }}
                          />
                          <span
                            className="text-[12px] font-semibold"
                            style={{ color: b.active ? '#6D28D9' : '#9A96AE', fontWeight: b.active ? 700 : 600 }}
                          >
                            {b.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ ...cardBase, padding: 22 }}>
                    <div className="font-display text-[17px] font-bold" style={{ color: '#0B0B16' }}>
                      Top selling models
                    </div>
                    <div className="mt-[18px] flex flex-col gap-4">
                      {d.topModels.map((m) => (
                        <div key={m.name}>
                          <div className="flex justify-between text-[14px] font-bold" style={{ color: '#0B0B16' }}>
                            <span>{m.name}</span>
                            <span>{m.count}</span>
                          </div>
                          <div
                            className="mt-[7px] h-2 overflow-hidden rounded-full"
                            style={{ background: '#F1EEF9' }}
                          >
                            <div
                              className="h-full"
                              style={{ width: `${m.pct}%`, background: 'linear-gradient(90deg,#7C3AED,#C026D3)' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent bills */}
                <div className="mt-[18px]" style={{ ...cardBase, padding: 22 }}>
                  <div className="flex items-center justify-between">
                    <div className="font-display text-[17px] font-bold" style={{ color: '#0B0B16' }}>
                      Recent bills
                    </div>
                    <span className="text-[13px] font-bold" style={{ color: '#6D28D9' }}>
                      View all →
                    </span>
                  </div>
                  <div
                    className="mt-4 grid gap-2.5 px-1.5 text-[12px] font-bold uppercase tracking-[.04em]"
                    style={{ gridTemplateColumns: '1.2fr 1.6fr 1fr .9fr .8fr', color: '#9A96AE' }}
                  >
                    <span>Invoice</span>
                    <span>Customer</span>
                    <span>Item</span>
                    <span>Amount</span>
                    <span>Status</span>
                  </div>
                  <div className="mt-2 flex flex-col">
                    {d.recentBills.map((b) => (
                      <div
                        key={b.invoice}
                        className="grid items-center gap-2.5 py-3 text-[14px] font-semibold"
                        style={{
                          gridTemplateColumns: '1.2fr 1.6fr 1fr .9fr .8fr',
                          borderTop: '1px solid #F1EEF9',
                          color: '#3B3752',
                          paddingLeft: 6,
                          paddingRight: 6,
                        }}
                      >
                        <span className="font-display font-bold" style={{ color: '#0B0B16' }}>
                          {b.invoice}
                        </span>
                        <span>{b.customer}</span>
                        <span>{b.item}</span>
                        <span className="font-bold" style={{ color: '#0B0B16' }}>
                          {b.amount}
                        </span>
                        <span>
                          <span
                            className="rounded-full px-[11px] py-1 text-[12px] font-bold"
                            style={
                              b.status === 'Paid'
                                ? { background: 'rgba(22,163,74,.12)', color: '#15803D' }
                                : { background: 'rgba(217,119,6,.14)', color: '#B45309' }
                            }
                          >
                            {b.status}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
