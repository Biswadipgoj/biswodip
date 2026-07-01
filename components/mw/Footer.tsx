import Logo from './Logo';
import { brand, footer } from '@/lib/data';

/** Closing band — brand mark, tagline and workspace link columns. */
export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-16 sm:px-8">
      <div
        className="mx-auto max-w-6xl rounded-[28px] px-7 py-12 sm:px-12"
        style={{
          background: 'linear-gradient(160deg,#0B0B16,#1a1430)',
          boxShadow: '0 40px 90px -50px rgba(58,30,110,.8)',
        }}
      >
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={36} />
              <span className="font-display text-[18px] font-semibold text-white">{brand.name}</span>
            </div>
            <p className="mt-4 max-w-[280px] text-[15px] font-medium" style={{ color: '#A7A2C0', lineHeight: 1.55 }}>
              {footer.tagline}
            </p>
            <div className="mt-5 text-[14px] font-semibold" style={{ color: '#C4B5FD' }}>
              {brand.email}
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <div className="text-[13px] font-bold uppercase tracking-[.08em]" style={{ color: '#6B6784' }}>
                {col.title}
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li
                    key={link}
                    className="cursor-pointer text-[15px] font-semibold transition-colors hover:text-white"
                    style={{ color: '#A7A2C0' }}
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-10 flex flex-col items-start justify-between gap-3 border-t pt-6 text-[13px] font-medium sm:flex-row sm:items-center"
          style={{ borderColor: 'rgba(255,255,255,.1)', color: '#6B6784' }}
        >
          <span>
            © {new Date().getFullYear()} {brand.name} · {brand.location}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: '#16A34A', boxShadow: '0 0 0 4px rgba(22,163,74,.18)' }} />
            All systems synced
          </span>
        </div>
      </div>
    </footer>
  );
}
