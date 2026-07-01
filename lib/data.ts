/**
 * Single content source for Dipali's Mobile World — the internal ERP workspace.
 * Every visitor-facing string, stat and table row lives here so the whole
 * experience stays content-driven (a future admin panel / CMS would write here).
 *
 * Ported from the "Mobile World" design doc — three screens:
 *   1a  Portal + login   1b  Dashboard home   1c  On the counter phone
 */

export const brand = {
  name: "Dipali's Mobile World",
  short: 'Mobile World',
  kind: 'internal ERP workspace',
  email: 'dipali@mobileworld.shop',
  location: 'Uluberia, West Bengal',
};

/** Top navigation labels (shared by the marketing nav and the app sidebar). */
export const nav = ['Billing', 'Inventory', 'Retailers', 'Analytics'] as const;

/* ------------------------------------------------------------------ */
/* 1a — Portal + login                                                 */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: 'The Mobile World ERP workspace',
  /** The headline renders as three lines; `counter` is the aurora-gradient word. */
  title: {
    line1: 'Run the whole',
    gradientWord: 'counter',
    line2Rest: ' from',
    line3: 'a single screen.',
  },
  subtitle:
    'Billing, inventory, retailers and live analytics for the shop — unified in one workspace fast enough to keep up with the counter.',
  featurePills: ['GST-ready billing', 'IMEI-level tracking', 'Dealer ledgers'],
  stats: [
    { value: '₹4.2', suffix: 'Cr', label: 'billed this year' },
    { value: '12,480', label: 'SKUs in stock' },
    { value: '340', label: 'dealers on ledger' },
  ],
};

export const login = {
  title: 'Sign in to your workspace',
  subtitle: 'Welcome back. Pick up right at the counter.',
  userId: 'dipali.admin',
  password: 'counter2026',
  cta: 'Sign in',
  help: 'Trouble signing in?',
  helpAction: 'Contact your admin',
};

/** Floating glass badges over the login art. */
export const floatingCards = {
  sales: { label: "Today's sales", value: '₹1,24,500', delta: '▲ 18% vs yesterday' },
  lowStock: { label: 'Low stock', value: 'iPhone 15 · 3 left' },
};

/* ------------------------------------------------------------------ */
/* 1b — Dashboard home                                                 */
/* ------------------------------------------------------------------ */

export const dashboard = {
  sidebar: [
    { label: 'Overview', active: true },
    { label: 'Billing' },
    { label: 'Inventory' },
    { label: 'Retailers' },
    { label: 'Analytics' },
    { label: 'Settings' },
  ],
  storeHealth: { title: 'Store health', note: '99.98% uptime · all synced', pct: 92 },
  greeting: 'Good morning, Dipali',
  date: "Tuesday, 1 July · Here's how the store is doing today.",
  searchPlaceholder: 'Search bills, IMEI, dealers…',
  primaryAction: '+ New bill',
  avatar: 'D',
  stats: [
    { label: "Today's revenue", value: '₹1,24,500', delta: '▲ 18% vs yesterday', tone: 'brand' },
    { label: 'Bills today', value: '86', delta: '▲ 12 more than avg', tone: 'green' },
    { label: 'Low stock', value: '7', unit: 'items', delta: 'Needs reorder', tone: 'red' },
    { label: 'Dealer dues', value: '₹3.8L', delta: 'across 22 dealers', tone: 'neutral' },
  ] as {
    label: string;
    value: string;
    unit?: string;
    delta: string;
    tone: 'brand' | 'green' | 'red' | 'neutral';
  }[],
  /** Sales · last 7 days — bar heights are percentages; `active` = today. */
  week: [
    { day: 'Wed', height: 52 },
    { day: 'Thu', height: 68 },
    { day: 'Fri', height: 44 },
    { day: 'Sat', height: 82 },
    { day: 'Sun', height: 74 },
    { day: 'Mon', height: 58 },
    { day: 'Tue', height: 100, active: true },
  ] as { day: string; height: number; active?: boolean }[],
  topModels: [
    { name: 'Samsung Galaxy A55', count: 42, pct: 90 },
    { name: 'Redmi Note 14', count: 36, pct: 77 },
    { name: 'iPhone 15', count: 28, pct: 60 },
    { name: 'vivo T3x', count: 21, pct: 45 },
  ],
  recentBills: [
    { invoice: '#MW-4821', customer: 'Rahul Deshmukh', item: 'Galaxy A55', amount: '₹38,999', status: 'Paid' },
    { invoice: '#MW-4820', customer: 'Sneha Kulkarni', item: 'Redmi Note 14', amount: '₹18,499', status: 'Paid' },
    { invoice: '#MW-4819', customer: 'Amit Traders (dealer)', item: 'iPhone 15 ×4', amount: '₹2,55,960', status: 'Credit' },
    { invoice: '#MW-4818', customer: 'Priya Sharma', item: 'vivo T3x', amount: '₹14,999', status: 'Paid' },
  ] as { invoice: string; customer: string; item: string; amount: string; status: 'Paid' | 'Credit' }[],
};

/* ------------------------------------------------------------------ */
/* 1c — On the counter phone                                           */
/* ------------------------------------------------------------------ */

export const phone = {
  date: 'Tuesday, 1 July',
  greeting: 'Hello, Dipali',
  avatar: 'D',
  revenueLabel: "Today's revenue",
  revenue: '₹1,24,500',
  revenueStats: [
    { label: 'Bills', value: '86' },
    { label: 'vs avg', value: '▲ 18%' },
    { label: 'Dues', value: '₹3.8L' },
  ],
  quickActions: ['New bill', 'Stock', 'Dealers', 'Reports'],
  bills: [
    { initial: 'R', name: 'Rahul Deshmukh', meta: 'Galaxy A55 · #MW-4821', amount: '₹38,999', status: 'Paid', tone: 'violet' },
    { initial: 'A', name: 'Amit Traders', meta: 'iPhone 15 ×4 · #MW-4819', amount: '₹2,55,960', status: 'Credit', tone: 'amber' },
  ] as { initial: string; name: string; meta: string; amount: string; status: 'Paid' | 'Credit'; tone: 'violet' | 'amber' }[],
};

/* ------------------------------------------------------------------ */
/* Section framing for the marketing page                              */
/* ------------------------------------------------------------------ */

export const sections = {
  dashboard: {
    eyebrow: 'The workspace',
    title: 'One home screen for the whole shop',
    subtitle:
      'Revenue, bills, stock alerts and dealer dues at a glance — with a live 7-day pulse and your top-selling models, updated as each bill is raised.',
  },
  phone: {
    eyebrow: 'In your pocket',
    title: 'The counter, wherever you are',
    subtitle:
      'The same workspace on the phone — raise a bill, check stock, settle a dealer or pull a report between customers. Everything syncs the instant you tap.',
    highlights: [
      'Raise GST bills in seconds with saved customers',
      'IMEI-level stock, so every handset is accounted for',
      'Dealer ledgers and dues that always reconcile',
    ],
  },
};

export const footer = {
  tagline: 'Built for the counter — fast, unified and always in sync.',
  columns: [
    { title: 'Workspace', links: ['Overview', 'Billing', 'Inventory', 'Analytics'] },
    { title: 'Business', links: ['Retailers', 'Dealer ledgers', 'GST filing', 'Reports'] },
    { title: 'Support', links: ['Help centre', 'Contact admin', 'Status', 'Privacy'] },
  ],
};
