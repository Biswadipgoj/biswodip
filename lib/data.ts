/** Central content source. Source evidence and corrections: docs/evidence.md. */
export const personal = {
  name: 'Biswodip Goj', firstName: 'Biswodip', lastName: 'Goj',
  email: 'biswadipgoj@gmail.com', location: 'Uluberia, West Bengal, India',
  role: 'Full-Stack Software Engineer', tagline: 'Full-stack software, designed and shipped.',
  intro: 'Full-stack software engineer from West Bengal, India. I build and ship web applications end to end: interfaces, APIs, databases and deployment, with a working interest in the business problems behind them.',
  about: 'I work across the whole stack: interface, application logic, API and database, then the deployment that puts it in front of people. Across Erpixa, NanoLink, Nexora and the rest of the work here, I have built business tooling and data-backed products. I care about clear architecture, typed code and interfaces that hold up under real use, and I am steadily deepening my business-analysis skills alongside engineering.',
} as const;

export type Project = {
  name: string; slug: string; blurb: string; description: string; technicalNote: string;
  url: string; repo?: string; previewImage: string; features: string[]; techStack: string[];
  evidence: { label: string; url: string }[];
  chapter: { index: string; bg: string; ink: string; accent: string; label: string; flow: string[] };
};

export const projects: Project[] = [
  {
    name: 'Erpixa', slug: 'erpixa', blurb: 'A workspace shaped around the business.',
    description: 'A modular, open-source ERP platform for small and mid-sized businesses. Business-type onboarding assembles a workspace with the CRM, sales, inventory, accounting and HR modules the business needs.',
    technicalNote: 'React and TypeScript power the interface. Supabase provides authentication and PostgreSQL storage, with organization membership and row-level security policies in the schema.',
    url: 'https://erpixa.vercel.app/', repo: 'https://github.com/Biswadipgoj/Erpixa', previewImage: '/previews/erpixa.webp',
    features: ['Business-type onboarding', 'Nine business modules', 'CRM, sales and inventory', 'Organization-based workspaces'],
    techStack: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL'],
    evidence: [{ label: 'Application source', url: 'https://github.com/Biswadipgoj/Erpixa' }, { label: 'Database schema', url: 'https://github.com/Biswadipgoj/Erpixa/blob/main/supabase/schema.sql' }],
    chapter: { index: '01', bg: '#efcdbc', ink: '#422f32', accent: '#8b4031', label: 'Business software', flow: ['Business type', 'Enabled modules', 'Workspace', 'Organization data'] },
  },
  {
    name: 'NanoLink', slug: 'nanolink', blurb: 'Shorten any link. Share it anywhere.',
    description: 'A URL shortener with password protection, expiry, burn-after-read, custom aliases and per-link click analytics. Create a short link, then manage its lifecycle from a dashboard.',
    technicalNote: 'A Next.js route validates the request, generates or checks an alias and stores a Link through Prisma in PostgreSQL. The redirect looks up the code, checks access conditions, increments clicks and records lastVisited. One-time links are disabled after access.',
    url: 'https://nanl.vercel.app/', repo: 'https://github.com/Biswadipgoj/nl', previewImage: '/previews/nanolink.webp',
    features: ['Password protection', 'Expiry dates', 'Burn-after-read', 'Custom aliases', 'Click count and last visit'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    evidence: [{ label: 'Create-link route', url: 'https://github.com/Biswadipgoj/nl/blob/master/src/app/api/links/route.ts' }, { label: 'Prisma schema', url: 'https://github.com/Biswadipgoj/nl/blob/master/prisma/schema.prisma' }],
    chapter: { index: '02', bg: '#dce8ca', ink: '#2e402f', accent: '#3a6140', label: 'Link management', flow: ['Request', 'Validate', 'Generate alias', 'Store', 'Short URL'] },
  },
  {
    name: 'TelePoint', slug: 'telepoint', blurb: 'A clear view of every payment.',
    description: 'An EMI management portal with separate access for administrators, retailers and customers. The application organizes payment workflows, account records and reporting.',
    technicalNote: 'The deployed app and public repository identify an EMI portal. Next.js route handlers support payment submissions and approvals, reporting and receipts; Supabase and PostgreSQL provide the data layer.',
    url: 'https://telepoint-topaz.vercel.app/', repo: 'https://github.com/Biswadipgoj/telepoint', previewImage: '/previews/telepoint.webp',
    features: ['Admin and retailer access', 'Customer account access', 'Payment submission and approval', 'Reports and receipts'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    evidence: [{ label: 'Deployed application', url: 'https://telepoint-topaz.vercel.app/' }, { label: 'Application source', url: 'https://github.com/Biswadipgoj/telepoint' }],
    chapter: { index: '03', bg: '#cbe3e5', ink: '#2c434b', accent: '#315f73', label: 'Payment workflows', flow: ['Retailer', 'Submission', 'Review', 'Approval', 'Account record'] },
  },
  {
    name: 'Nexora', slug: 'nexora', blurb: 'Plan the work. Move it forward.',
    description: 'A workspace for planning, tracking and shipping work. Board, list and personal task views keep the same work in focus, with a command palette and shared workspace updates.',
    technicalNote: 'Next.js and TypeScript with Supabase-backed workspaces. The repository includes Electron packaging for Windows and a Capacitor Android wrapper.',
    url: 'https://nexora-xi-rust.vercel.app/', repo: 'https://github.com/Biswadipgoj/nexora', previewImage: '/previews/nexora.webp',
    features: ['Board and list views', 'Personal tasks', 'Command palette', 'Shared workspaces', 'Web, Windows and Android'],
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Material UI', 'Electron', 'Capacitor'],
    evidence: [{ label: 'Application source', url: 'https://github.com/Biswadipgoj/nexora' }],
    chapter: { index: '04', bg: '#e3dcf0', ink: '#3e334d', accent: '#665080', label: 'Project workspace', flow: ['Plan', 'Prioritize', 'Move a task', 'Shared workspace'] },
  },
  {
    name: 'Tripmate', slug: 'tripmate', blurb: 'The trip is shared. The costs should be clear.',
    description: 'A group trip expense manager. Create or join a trip, organize members, split expenses and work out settlements in one shared place.',
    technicalNote: 'Next.js, TypeScript and Supabase support trip data. The source includes equal and custom expense splits, settlement logic, UPI links and PDF reports; Framer Motion supplies interface transitions.',
    url: 'https://trip-mu-coral.vercel.app/', repo: 'https://github.com/Biswadipgoj/trip', previewImage: '/previews/tripmate.webp',
    features: ['Create and join trips', 'Equal and custom splits', 'Member balances and settlements', 'UPI payment links', 'PDF reports'],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    evidence: [{ label: 'Application source', url: 'https://github.com/Biswadipgoj/trip' }],
    chapter: { index: '05', bg: '#f0ddbb', ink: '#4a3b2e', accent: '#7c5231', label: 'Shared trip expenses', flow: ['Create a trip', 'Add expenses', 'Split costs', 'Settle balances'] },
  },
];

/** Verified in source, package manifests, deployments or this repository. */
export const stack = [
  { id: 'interface', title: 'Client interface', description: 'Collect input. Submit a typed request.', tools: ['React', 'TypeScript', 'Tailwind CSS'], evidence: 'ShortenForm.tsx', sample: 'POST /api/links · JSON', detail: 'The form sends the destination and optional alias, password, expiry and one-time setting.', source: 'https://github.com/Biswadipgoj/nl/blob/master/src/components/ShortenForm.tsx' },
  { id: 'application', title: 'API boundary', description: 'Validate before writing.', tools: ['Next.js', 'Zod', 'nanoid', 'bcryptjs'], evidence: 'api/links/route.ts', sample: 'parse → normalize → check uniqueness', detail: 'The route validates input, normalizes the URL, checks the alias and hashes an optional password. A created link returns HTTP 201.', source: 'https://github.com/Biswadipgoj/nl/blob/master/src/app/api/links/route.ts' },
  { id: 'data', title: 'Persistence', description: 'Make the data contract explicit.', tools: ['Prisma', 'PostgreSQL'], evidence: 'prisma/schema.prisma', sample: 'shortCode @unique · customAlias @unique', detail: 'A Link record stores the destination and access rules. Unique constraints and indexed lookups support alias resolution.', source: 'https://github.com/Biswadipgoj/nl/blob/master/prisma/schema.prisma' },
  { id: 'delivery', title: 'Resolve & respond', description: 'Read state. Enforce the lifecycle.', tools: ['Next.js', 'Prisma'], evidence: '[shortCode]/page.tsx', sample: 'lookup → access checks → redirect', detail: 'The redirect checks active state, expiry and password. It updates clicks and lastVisited, and disables one-time links.', source: 'https://github.com/Biswadipgoj/nl/blob/master/src/app/%5BshortCode%5D/page.tsx' },
] as const;

export const heroCode = [
  'async function build(idea: Requirement) {',
  '  const scope = understand(idea);',
  '  const system = architect(scope);',
  '  const product = await implement(system);',
  '  await check(product);',
  '  return ship(product);',
  '}',
];
/** Verbatim contiguous source: nl/src/app/api/links/route.ts. */
export const nanoCode = [
  'const newLink = await prisma.link.create({', '  data: {', '    userId,',
  '    originalUrl: normalizedUrl,', '    shortCode,',
  '    customAlias: parsed.customAlias || null,', '    password: hashedPassword,',
  '    expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : null,',
  '    oneTimeUse: parsed.oneTimeUse,', '  },', '})',
];
export const nanoFields = [
  ['id', 'String · primary key'], ['originalUrl', 'String'], ['shortCode', 'String · unique'],
  ['customAlias', 'String? · unique'], ['expiresAt', 'DateTime?'], ['oneTimeUse', 'Boolean'],
  ['clicks', 'Int'], ['lastVisited', 'DateTime?'], ['isActive', 'Boolean'],
] as const;
export const processStages = [
  { title: 'Understand', body: 'Start from the requirement and the people who will use it. Pin down what the system must actually do.', artifact: 'requirement → scope' },
  { title: 'Architect', body: 'Decide the data model, the API surface and the boundaries between client, server and storage.', artifact: 'scope → system' },
  { title: 'Build', body: 'Implement with typed code, reviewable components and tests on the paths that matter most.', artifact: 'system → implementation' },
  { title: 'Ship', body: 'Build and deploy the application. Check the paths people need to use.', artifact: 'implementation → deployment' },
  { title: 'Iterate', body: 'Watch how it behaves in real use, and improve it from feedback and what the data can actually tell you.', artifact: 'feedback → next requirement' },
] as const;
export const principles = [
  { title: 'Architecture', line: 'Design before code.' },
  { title: 'Reliability', line: 'Typed, tested, reviewable.' },
  { title: 'Delivery', line: 'Ship, then iterate.' },
] as const;
export const education = [
  { date: '2021–2024', title: 'B.Tech in Computer Science & Engineering', subtitle: 'Undergraduate engineering degree · lateral entry', institution: 'Maulana Abul Kalam Azad University of Technology (MAKAUT)', coursework: ['Data Structures & Algorithms', 'Database Management Systems', 'Operating Systems & Concurrency', 'Computer Networks', 'Compiler Design', 'Software Engineering'] },
  { date: '2018–2021', title: 'Diploma in Computer Science & Technology', subtitle: 'Polytechnic engineering foundation', institution: 'West Bengal State Council of Technical Education (WBSCTE)', coursework: ['C & C++ Programming', 'Data Structures in C', 'Digital Electronics', 'Computer Organization', 'Relational Databases & SQL'] },
] as const;
export const journey = [
  { date: '2018–2021', title: 'The foundations.', detail: education[1] },
  { date: '2021–2024', title: 'Deeper into software.', detail: education[0] },
  { date: '2024', title: 'B.Tech complete.', body: 'Graduated and continued building independently.' },
  { date: 'Now', title: 'Engineer + analyst.', body: 'Pairing hands-on engineering with business analysis.' },
] as const;
export const socials = [
  { label: 'Email', url: 'mailto:' + personal.email, handle: personal.email },
  { label: 'GitHub', url: 'https://github.com/Biswadipgoj', handle: '@Biswadipgoj' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/biswadipgoj', handle: 'Biswodip Goj' },
] as const;
export const nav = [
  { id: 'opening', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Work' }, { id: 'process', label: 'Process' },
  { id: 'journey', label: 'Journey' }, { id: 'contact', label: 'Contact' },
] as const;
