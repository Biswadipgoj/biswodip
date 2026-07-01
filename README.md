# Dipali's Mobile World — ERP workspace

> Run the whole counter from a single screen.

A product landing experience for **Dipali's Mobile World**, the internal ERP
workspace for a mobile-phone retail shop: GST-ready billing, IMEI-level
inventory, dealer ledgers and live analytics — unified and fast enough to keep
up with the counter.

Implemented from the **Mobile World** design doc, which defines three screens:

| # | Screen | What it shows |
| - | ------ | ------------- |
| 1a | **Portal + login** | Aurora hero, glass navbar, headline + stats, frosted sign-in card with floating live stats |
| 1b | **Dashboard home** | Dark sidebar, revenue / bills / stock / dues cards, 7-day sales chart, top-selling models, recent-bills table |
| 1c | **Counter phone** | Mobile app view — greeting, gradient revenue card, quick actions, recent bills, tab bar with FAB |

All three are composed into one scrolling page: **Hero → Dashboard → Phone → footer**.

## 🎨 Design system

- **Aurora palette** — violet `#7C3AED` → fuchsia `#C026D3` → indigo `#4F46E5`,
  with sky/pink accents, over airy off-white surfaces and `#0B0B16` ink.
- **Type** — Space Grotesk (display) + Manrope (body) via `next/font`.
- **Feel** — glassmorphism, soft coloured shadows, radial aurora washes and
  gentle `riseIn` / `floaty` / `glow` motion. Fully light-themed, high-contrast.

## 🧱 Tech stack

| Area      | Tools                                               |
| --------- | --------------------------------------------------- |
| Framework | Next.js 14 (App Router), TypeScript                 |
| Styling   | Tailwind CSS + a small aurora token layer           |
| Motion    | Framer Motion (scroll reveals), Lenis smooth scroll |
| Fonts     | Space Grotesk + Manrope via `next/font`             |

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## 🗂 Project structure

```
app/
  layout.tsx            # Fonts, metadata, smooth-scroll shell
  globals.css           # Aurora tokens, keyframes, helpers
  page.tsx              # Composes the three screens
  icon.svg              # Aurora app mark (favicon)
components/
  mw/Navbar.tsx         # Glass floating navigation (1a)
  mw/Hero.tsx           # Portal hero (1a)
  mw/LoginCard.tsx      # Sign-in card + floating live stats (1a)
  mw/Dashboard.tsx      # Dashboard home in a browser frame (1b)
  mw/PhoneShowcase.tsx  # Counter phone + pitch (1c)
  mw/Footer.tsx         # Closing band
  mw/Logo.tsx           # Shared aurora mark
  ui/Reveal.tsx         # Scroll-reveal wrapper
  SmoothScroll.tsx      # Lenis smooth scrolling
lib/data.ts             # Single content source (all copy, stats, tables)
```

## ✏️ Editing content

Every visitor-facing string, stat and table row lives in
[`lib/data.ts`](lib/data.ts) — the single content layer a future admin panel or
CMS would write to, so the experience stays fully content-driven.
