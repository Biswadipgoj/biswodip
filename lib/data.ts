/**
 * Central content source — restructured for the Compile concept.
 *
 * SOURCE → COMPILE → RUNTIME → DEPLOYED
 * Four chapters, one scroll, all content honest and from the repo.
 */

/* ================================================================
   PERSONAL
   ================================================================ */

export const personal = {
  name: 'Biswodip Goj',
  firstName: 'Biswodip',
  lastName: 'Goj',
  email: 'biswadipgoj@gmail.com',
  location: 'Uluberia, West Bengal, India',
  education: 'B.Tech CSE (2021–2024) · Diploma in CSE (2018–2021)',
  role: 'Full-Stack Software Engineer',
  tagline: 'Software, from source to shipped.',
  intro:
    'Full-stack software engineer from West Bengal, India. I build and ship web applications end to end — interfaces, APIs, databases and deployment — with a working interest in the business problems behind them.',
  about:
    'I work across the whole stack: interface, application logic, API and database, then the deployment that puts it in front of people. Across Erpixa, NanoLink, Nexora and the rest of the work here, I have built business tooling, real-time features and data-backed products. I care about clear architecture, typed code and interfaces that hold up under real use, and I am steadily deepening my business-analysis skills alongside engineering.',
} as const;

/* ================================================================
   CHAPTER 1: SOURCE — Hero code block
   A real, readable TypeScript function. Not decorative.
   ================================================================ */

export const sourceCode = {
  /** The function that types character-by-character in the hero */
  lines: [
    { tokens: [{ type: 'keyword', text: 'async function ' }, { type: 'function', text: 'buildProject' }, { type: 'punctuation', text: '(' }] },
    { tokens: [{ type: 'punctuation', text: '  ' }, { type: 'variable', text: 'idea' }, { type: 'punctuation', text: ': ' }, { type: 'keyword', text: 'Requirement' }] },
    { tokens: [{ type: 'punctuation', text: '): ' }, { type: 'keyword', text: 'Promise' }, { type: 'punctuation', text: '<' }, { type: 'variable', text: 'Deployed' }, { type: 'punctuation', text: '> {' }] },
    { tokens: [{ type: 'punctuation', text: '  ' }, { type: 'keyword', text: 'const ' }, { type: 'variable', text: 'design' }, { type: 'punctuation', text: ' = ' }, { type: 'function', text: 'architect' }, { type: 'punctuation', text: '(' }, { type: 'variable', text: 'idea' }, { type: 'punctuation', text: ');' }] },
    { tokens: [{ type: 'punctuation', text: '  ' }, { type: 'keyword', text: 'const ' }, { type: 'variable', text: 'code' }, { type: 'punctuation', text: ' = ' }, { type: 'keyword', text: 'await ' }, { type: 'function', text: 'implement' }, { type: 'punctuation', text: '(' }, { type: 'variable', text: 'design' }, { type: 'punctuation', text: ');' }] },
    { tokens: [{ type: 'punctuation', text: '  ' }, { type: 'keyword', text: 'return ' }, { type: 'function', text: 'ship' }, { type: 'punctuation', text: '(' }, { type: 'variable', text: 'code' }, { type: 'punctuation', text: ');' }] },
    { tokens: [{ type: 'punctuation', text: '}' }] },
  ],
  /** Full plain text for the typing animation */
  plainText: `async function buildProject(
  idea: Requirement
): Promise<Deployed> {
  const design = architect(idea);
  const code = await implement(design);
  return ship(code);
}`,
} as const;

/* ================================================================
   CHAPTER 2: COMPILE — Tokens & Architecture Layers
   Skills become tokens that reassemble into architecture.
   ================================================================ */

export type CompileToken = {
  name: string;
  layer: 'interface' | 'application' | 'data' | 'infrastructure';
};

/** Every token is a real skill, assigned to its honest architecture layer */
export const compileTokens: CompileToken[] = [
  // Interface layer
  { name: 'React', layer: 'interface' },
  { name: 'Next.js', layer: 'interface' },
  { name: 'TypeScript', layer: 'interface' },
  { name: 'Tailwind CSS', layer: 'interface' },
  { name: 'Framer Motion', layer: 'interface' },
  { name: 'GSAP', layer: 'interface' },
  { name: 'Vue.js', layer: 'interface' },

  // Application layer
  { name: 'Node.js', layer: 'application' },
  { name: 'Express', layer: 'application' },
  { name: 'Python', layer: 'application' },
  { name: 'FastAPI', layer: 'application' },
  { name: 'REST APIs', layer: 'application' },
  { name: 'GraphQL', layer: 'application' },
  { name: 'WebSockets', layer: 'application' },
  { name: 'JWT & OAuth2', layer: 'application' },

  // Data layer
  { name: 'PostgreSQL', layer: 'data' },
  { name: 'MongoDB', layer: 'data' },
  { name: 'Redis', layer: 'data' },
  { name: 'Prisma', layer: 'data' },
  { name: 'Supabase', layer: 'data' },
  { name: 'Jest', layer: 'data' },
  { name: 'Playwright', layer: 'data' },
  { name: 'Git', layer: 'data' },

  // Infrastructure layer
  { name: 'Docker', layer: 'infrastructure' },
  { name: 'CI/CD', layer: 'infrastructure' },
  { name: 'AWS', layer: 'infrastructure' },
  { name: 'Vercel', layer: 'infrastructure' },
  { name: 'Linux', layer: 'infrastructure' },
  { name: 'Nginx', layer: 'infrastructure' },
  { name: 'Cloudflare', layer: 'infrastructure' },
];

export const architectureLayers = [
  { id: 'interface' as const, label: 'Interface', sublabel: 'What the user sees and touches' },
  { id: 'application' as const, label: 'Application', sublabel: 'Logic, APIs, and services' },
  { id: 'data' as const, label: 'Data', sublabel: 'Storage, queries, and quality' },
  { id: 'infrastructure' as const, label: 'Infrastructure', sublabel: 'Build, deploy, and run' },
];

/* ================================================================
   CHAPTER 3: RUNTIME — Projects
   Each project is a "program" that boots and runs.
   ================================================================ */

export type Project = {
  name: string;
  slug: string;
  terminalCommand: string;
  blurb: string;
  description: string;
  technicalNote: string;
  url: string;
  repo?: string;
  previewImage: string;
  techStack: string[];
};

export const projects: Project[] = [
  {
    name: 'Erpixa',
    slug: 'erpixa',
    terminalCommand: '$ run erpixa',
    blurb: 'Business management, finally without the bloat.',
    description:
      'A modular, open-source ERP platform built for small and mid-sized businesses. Erpixa detects your business type and assembles a custom workspace — CRM, Sales, Inventory, Accounting, HR — activating only what you need.',
    technicalNote:
      'Postgres Row-Level Security for true multi-tenant data isolation. A live KPI engine computes every metric from real data, never mocks. Nine business modules, activated per tenant type.',
    url: 'https://erpixa.vercel.app/',
    repo: 'https://github.com/Biswadipgoj/Erpixa',
    previewImage: '/previews/erpixa.webp',
    techStack: ['React', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
  },
  {
    name: 'NanoLink',
    slug: 'nanolink',
    terminalCommand: '$ run nanolink',
    blurb: 'Shorten any link. Share it anywhere.',
    description:
      'A fast URL shortener with password-protected links, expiry, burn-after-read, custom aliases, and per-link click analytics from a real dashboard.',
    technicalNote:
      'Custom alias resolution via edge function. Click analytics aggregated by day, device, and referrer. Burn-after-read uses a single-use token pattern — once consumed, the redirect row is hard-deleted.',
    url: 'https://nanl.vercel.app/',
    repo: 'https://github.com/Biswadipgoj/nl',
    previewImage: '/previews/nanolink.webp',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Nexora',
    slug: 'nexora',
    terminalCommand: '$ run nexora',
    blurb: 'Plan the work, watch it move, finish it together.',
    description:
      'A calm command center for planning, tracking and shipping work. Board, list and personal task views, a keyboard-first command palette, and instant multi-user sync.',
    technicalNote:
      'Drag-to-move with live column counts. Instant multi-user sync isolated per workspace. Runs on web, Windows (Electron), and Android (Capacitor).',
    url: 'https://nexora-xi-rust.vercel.app/',
    repo: 'https://github.com/Biswadipgoj/nexora',
    previewImage: '/previews/nexora.webp',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Electron', 'Tailwind CSS'],
  },
  {
    name: 'TelePoint',
    slug: 'telepoint',
    terminalCommand: '$ run telepoint',
    blurb: 'Real-time communication, reimagined.',
    description:
      'A communication platform focused on instant, friction-free connection. Built for speed with a modern reactive stack and a clean, responsive interface.',
    technicalNote:
      'WebSocket-driven instant messaging with optimistic UI updates. Mobile-first responsive layout tested across viewports.',
    url: 'https://telepoint-topaz.vercel.app/',
    previewImage: '/previews/telepoint.webp',
    techStack: ['Next.js', 'WebSockets', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Tripmate',
    slug: 'tripmate',
    terminalCommand: '$ run tripmate',
    blurb: 'Plan journeys that feel effortless.',
    description:
      'A travel planning experience that turns scattered ideas into a clear, beautiful itinerary. Thoughtful flows and smooth transitions.',
    technicalNote:
      'Guided multi-step planning flow with state persistence. Smooth page transitions powered by Framer Motion layout animations.',
    url: 'https://trip-mu-coral.vercel.app/',
    previewImage: '/previews/tripmate.webp',
    techStack: ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
  },
];

/* ================================================================
   CHAPTER 4: DEPLOYED — Process, Journey, Contact
   ================================================================ */

export const processStages = [
  {
    title: 'Understand',
    body: 'Start from the requirement and the people who will use it. Pin down what the system must actually do.',
  },
  {
    title: 'Architect',
    body: 'Decide the data model, the API surface and the boundaries between client, server and storage.',
  },
  {
    title: 'Build',
    body: 'Implement with typed code, reviewable components and tests on the paths that matter most.',
  },
  {
    title: 'Ship',
    body: 'Deploy, watch how it behaves in real use, and iterate on what the users and the data tell you.',
  },
];

export type JourneyEntry = {
  date: string;
  title: string;
  body: string;
  current?: boolean;
};

export const journey: JourneyEntry[] = [
  {
    date: '2018–2021',
    title: 'Diploma in Computer Science & Engineering',
    body: 'Three years of fundamentals — programming, systems and the first real projects.',
  },
  {
    date: '2021–2024',
    title: 'B.Tech in Computer Science & Engineering',
    body: 'Deeper engineering while shipping working software for real people.',
  },
  {
    date: '2024',
    title: 'B.Tech complete, went independent',
    body: 'Graduated and went all-in as an independent developer.',
  },
  {
    date: 'Now',
    title: 'Engineer + analyst',
    body: 'Pairing hands-on engineering with business analysis.',
    current: true,
  },
];

export const socials = [
  { label: 'Email', url: `mailto:${personal.email}`, handle: personal.email },
  { label: 'GitHub', url: 'https://github.com/Biswadipgoj', handle: '@Biswadipgoj' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/biswadipgoj', handle: 'Biswodip Goj' },
];

/* ================================================================
   NAV — Four chapters only
   ================================================================ */

export const nav = [
  { id: 'source', label: 'Source' },
  { id: 'compile', label: 'Compile' },
  { id: 'runtime', label: 'Runtime' },
  { id: 'deployed', label: 'Deployed' },
] as const;
