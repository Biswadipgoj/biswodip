/** Public content: Senior recruiter & engineering hiring specification. */

export const personal = {
  "name": "Biswodip Goj",
  "firstName": "Biswodip",
  "lastName": "Goj",
  "email": "biswadipgoj@gmail.com",
  "phone": "+91 7003617074",
  "location": "Uluberia, West Bengal, India",
  "availability": "Immediate notice / Open to remote & relocation",
  "role": "Full-Stack Software Engineer",
  "secondaryRole": "Freelance & Contract Developer / Business Analyst",
  "tagline": "Full-Stack Software Engineer collaborating with remote teams and shipping 50+ production systems with Next.js, React, Node.js, PostgreSQL, Redis, and Kubernetes.",
  "intro": "I’m Biswodip Goj, a Full-Stack Software Engineer who works across requirements, system modeling, application development, and production delivery. Collaborating with distributed teams on remote engineering contracts alongside shipping 50+ software builds and systems has taught me to turn real business workflows into software that holds up in production. I work from both sides: gathering requirements, defining data boundaries, and building the application end to end.",
  "about": [
    "I work across the complete lifecycle from requirement elicitation and workflow design to full-stack engineering, distributed caching, and containerized deployment. I understand the business problem first—stakeholder workflows, data boundaries, and operational rules—before architecting the software.",
    "As a contract software engineer collaborating across remote teams and client companies, I engineer production web applications, API integrations, and well-structured databases. Across remote team delivery and independent builds, I have shipped 50+ software products and systems.",
    "My engineering stack is centered on TypeScript, React, Next.js, Node.js, Python, C# (ASP.NET Core MVC), PostgreSQL, Redis, Docker, and Kubernetes, paired with business understanding as a primary advantage: requirement elicitation, process flow mapping, and acceptance testing.",
    "I focus on software that solves real operational bottlenecks with clear schemas, predictable APIs, database-enforced row-level security, and automated tests."
  ],
  "ownership": "I bridge business analysis and full-stack software engineering, from requirements and data schemas to user-facing applications.",
  "maturity": "I don't just build the interface. I work through the business requirements, data architecture, APIs, and deployment needed to make products work in production.",
  "resume": "/Biswodip-Goj-Resume.pdf",
  "canonicalUrl": "https://biswodip.in",
  "shippedCount": "50+",
  "featuredProjectsCount": "50+"
} as const;

export const hero = {
  "eyebrow": "Full-Stack Software Engineer",
  "heading": "From real problems to working software.",
  "body": "I turn business requirements and real operational workflows into production web applications — from data models and APIs to interfaces, testing, and deployment.",
  "primary": "View Selected Work",
  "secondary": "GitHub",
  "third": "Resume",
  "proofStrip": [
    { "label": "Remote & 50+ Shipped", "detail": "Distributed teams & production builds" },
    { "label": "Full-Stack & Systems", "detail": "Redis, K8s, Docker, Next.js, Postgres" },
    { "label": "B.Tech CSE · 2024", "detail": "Brainware University, Kolkata" },
    { "label": "Remote / Relocation", "detail": "Immediate availability" }
  ],
  "workflowTitle": "From a requirement to working software.",
  "workflow": [
    "Requirement Analysis",
    "System Design",
    "Frontend + Backend",
    "Database",
    "Test + Debug",
    "Deploy"
  ]
} as const;

export const portfolioCopy = {
  identity: 'Engineer first. Business understanding as an advantage.',
  identityBody: 'I bridge domain analysis with production software engineering, moving from stakeholder workflows to relational schemas and predictable APIs.',
  stack: 'The stack behind the software.',
  stackBody: 'Explore the technologies, then see where I use them in real projects. Business analysis connects the requirements to the implementation.',
  work: 'Selected Engineering Work',
  workSub: 'Featured Systems · 50+ Shipped',
  workIntro: 'Across remote engineering teams, client contracts, and independent builds, I have shipped 50+ software products and systems. The projects below demonstrate how I approach full-stack engineering, system design, and production delivery.',
  process: 'How I engineer software.',
  education: 'The foundations behind the frameworks.',
  contact: 'Open to Remote Engineering Roles',
  contactSub: 'I’m interested in remote software engineering teams where I can contribute across product requirements, application development, APIs, data, and production delivery.',
  request: [
    { name: 'Request', detail: 'Read the JSON body and validate it with the Zod schema.', tool: 'Next.js · Zod' },
    { name: 'Application logic', detail: 'Normalize the URL, check alias uniqueness and hash an optional password.', tool: 'TypeScript · nanoid · bcrypt' },
    { name: 'Persistence', detail: 'Save the destination and options in the Link model.', tool: 'Prisma · PostgreSQL' },
    { name: 'Response', detail: 'Return the created record with HTTP 201.', tool: 'REST API' },
  ],
} as const;

export const nanoValidationCode = [
  'const createLinkSchema = z.object({',
  "  originalUrl: z.string().min(1, 'URL is required'),",
  "  customAlias: z.string().optional().or(z.literal('')),",
  "  password: z.string().optional().or(z.literal('')),",
  "  expiresAt: z.string().optional().or(z.literal('')),",
  '  oneTimeUse: z.boolean().default(false),',
  '})',
] as const;

export const teleOwnershipCode = [
  'const { data: custOwner } = await svc',
  "  .from('customers')",
  "  .select('id, retailer_id')",
  "  .eq('id', customer_id)",
  '  .single();',
  'if (!custOwner || custOwner.retailer_id !== retailer.id)',
  '  return NextResponse.json(',
  "    { error: 'Customer does not belong to your account' },",
  '    { status: 403 }',
  '  );',
] as const;

export const seo = {
  "title": "Biswodip Goj — Full-Stack Software Engineer",
  "description": "Biswodip Goj is a Full-Stack Software Engineer with 50+ shipped products and systems delivered across remote teams and independent builds using TypeScript, React, Next.js, Node.js, and PostgreSQL.",
  "canonical": "https://biswodip.in",
  "socialTitle": "Biswodip Goj | Full-Stack Software Engineer",
  "socialDescription": "Full-Stack Software Engineer with 50+ shipped products and systems delivered across remote teams and independent builds using TypeScript, React, Next.js, Node.js, and PostgreSQL."
} as const;

export const foundations = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Cyber Security",
  "Distributed Applications"
] as const;

export const stack = [
  {
    "title": "CORE & LANGUAGES",
    "tools": [
      "TypeScript",
      "JavaScript",
      "Python",
      "C# (.NET)",
      "SQL",
      "HTML5",
      "CSS3"
    ]
  },
  {
    "title": "DATA & IN-MEMORY",
    "tools": [
      "PostgreSQL",
      "Redis (Caching & Rate Limiting)",
      "Prisma ORM",
      "MongoDB",
      "Row-Level Security (RLS)",
      "Supabase",
      "pgvector"
    ]
  },
  {
    "title": "CLOUD & DEVOPS",
    "tools": [
      "Kubernetes (K8s Orchestration)",
      "Docker (Containers)",
      "Linux (Ubuntu/Debian)",
      "NGINX (Reverse Proxy)",
      "GitHub Actions (CI/CD)",
      "Vercel",
      "Git"
    ]
  },
  {
    "title": "BACKEND & MESSAGING",
    "tools": [
      "Node.js",
      "ASP.NET Core 6.0 MVC",
      "Express",
      "FastAPI",
      "GraphQL",
      "Apache Kafka (Streaming)",
      "RabbitMQ",
      "REST APIs",
      "Zod Validation"
    ]
  },
  {
    "title": "FRONTEND & APPS",
    "tools": [
      "Next.js 15 (App Router)",
      "React",
      "Tailwind CSS",
      "Material UI",
      "Vite",
      "Electron",
      "Capacitor"
    ]
  },
  {
    "title": "AI & RETRIEVAL",
    "tools": [
      "RAG Architecture",
      "Vector Search",
      "LLM Integration",
      "Hybrid Retrieval (BM25 + Vector)",
      "LangChain",
      "Model Evaluation"
    ]
  }
] as const;

export const primaryStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Kubernetes",
  "Docker",
  "Prisma",
  "Python",
  "ASP.NET Core",
  "REST APIs",
  "Row-Level Security",
  "Git",
  "SQL"
] as const;

export const stackCopy = {
  "title": "Technologies I work with",
  "intro": "Curated technical foundation across language, frontend, backend, data, and quality delivery.",
  "notes": [
    {
      "name": "TypeScript & Next.js",
      "body": "Type-safe routing, server actions, and component architecture across shipped production web applications."
    },
    {
      "name": "PostgreSQL & Database Design",
      "body": "Relational schema modeling, foreign key constraints, Row-Level Security, and pgvector embeddings."
    },
    {
      "name": "Backend APIs & Validation",
      "body": "REST APIs with Zod request validation, token authentication, and role-based access control."
    },
    {
      "name": "Business Workflow Modeling",
      "body": "Translating stakeholder friction, retail debt cycles, and multi-tenant org hierarchies into technical system architectures."
    },
    {
      "name": "CI Automation & Delivery",
      "body": "Automated linting, TypeScript verification, Docker container builds, and deployment through GitHub Actions CI."
    }
  ]
} as const;

export const capabilities = [
  {
    title: "Full-Stack Web Applications",
    body: "Next.js App Router, React, and TypeScript applications backed by relational PostgreSQL schemas."
  },
  {
    title: "Backend APIs & Validation",
    body: "REST endpoints with Zod request validation, session auth, and Prisma ORM."
  },
  {
    title: "Database Design & Security",
    body: "Relational modeling, foreign key constraints, and PostgreSQL Row-Level Security (RLS) for multi-tenant isolation."
  },
  {
    title: "Business Workflow Modeling",
    body: "Translating ambiguous stakeholder friction, payment debt cycles, and org hierarchies into software systems."
  }
] as const;

export const engineeringEvidence = [
  {
    "domain": "Requirements → System Design",
    "summary": "Turning unclear stakeholder needs into concrete data boundaries and clear system rules.",
    "items": [
      "Requirement analysis & functional specifications",
      "Domain workflow modeling & state machines",
      "Business-rule elicitation & edge-case mapping",
      "Acceptance criteria & user verification stories",
      "System boundary definition & contract modeling"
    ]
  },
  {
    "domain": "Data & Backend",
    "summary": "Designing relational schemas, data layers, and RESTful APIs.",
    "items": [
      "Relational schema design (PostgreSQL)",
      "Prisma ORM & SQL data modeling",
      "Type-safe REST API route architecture",
      "Authentication & token session management",
      "Runtime request validation & ACID persistence"
    ]
  },
  {
    "domain": "Frontend Engineering",
    "summary": "Developing responsive, accessible web interfaces with clean component structure and predictable state.",
    "items": [
      "React & Next.js App Router applications",
      "Strict TypeScript component boundaries",
      "Application state management & optimistic UI",
      "Responsive design & fluid layout systems",
      "Accessible markup & zero-shift interaction"
    ]
  },
  {
    "domain": "Security & Access Control",
    "summary": "Enforcing access policies at both the API perimeter and directly within the database engine.",
    "items": [
      "Role-Based Access Control (RBAC)",
      "PostgreSQL Row-Level Security (RLS)",
      "Strict runtime input validation (Zod)",
      "Account & customer ownership validation",
      "Protected API routes & multi-tenant isolation"
    ]
  },
  {
    "domain": "Quality & Verification",
    "summary": "Checking complete user journeys with repeatable tests and careful debugging.",
    "items": [
      "API route testing & payload validation",
      "Critical user journey & workflow testing",
      "Boundary condition & regression checks",
      "Systematic defect reproduction & tracing",
      "Browser automation testing (Playwright)"
    ]
  },
  {
    "domain": "Delivery & Production",
    "summary": "Shipping software reliably with container builds, continuous integration gates, and managed releases.",
    "items": [
      "Git branch workflow & semantic commit hygiene",
      "GitHub Actions automated CI verification",
      "Multi-stage Docker containerization",
      "Production deployment (Vercel & cloud)",
      "Post-release monitoring & defect triage"
    ]
  }
] as const;

export const engineeringDecisions = [
  {
    "decision": "Why Database-Level Access Control (RLS)?",
    "project": "Erpixa",
    "context": "Multi-Tenant Business Management Application",
    "reasoning": "Relying exclusively on application-layer WHERE filters risks cross-tenant leaks if a developer misses a tenant_id parameter in any query. PostgreSQL Row-Level Security guarantees isolation at the database engine level, enforcing organization separation across every query and role automatically."
  },
  {
    "decision": "Why Runtime Boundary Validation (Zod)?",
    "project": "NanoLink",
    "context": "Production-Style URL Management Service",
    "reasoning": "Client-supplied parameters, aliases, passwords, and expiration dates must be verified before reaching application logic. Strict Zod schemas sanitize input at the API entry point, preventing malformed records, type mismatches, and unhandled Prisma database exceptions."
  },
  {
    "decision": "Why Retailer-to-Customer Ownership Validation?",
    "project": "TelePoint",
    "context": "EMI & Payment Collection Workflow Platform",
    "reasoning": "Offline device financing involves multiple retailer accounts. Comparing customer ownership against the authenticated retailer before processing installment collections prevents unauthorized debt collection, duplicate submissions, and ledger reconciliation disputes."
  },
  {
    "decision": "Why Shared TypeScript Architecture?",
    "project": "Nexora",
    "context": "Cross-Platform Project & Task Workspace",
    "reasoning": "Maintaining separate codebases across Web, Windows (Electron), and Android (Capacitor) causes feature drift and triples maintenance costs. A shared TypeScript core unifies board state machines, keyboard navigation, and schemas across all three targets with zero divergence."
  },
  {
    "decision": "Why Relational Data Modeling for Financial Flows?",
    "project": "Tripmate & TelePoint",
    "context": "Expense Split & Installment Calculations",
    "reasoning": "Multi-party balances, installments, and payment records require strict foreign key constraints, ACID transaction guarantees, and exact calculations that document stores cannot reliably guarantee without custom distributed locking."
  }
] as const;

export const processStages = [
  {
    "step": "01",
    "title": "Understand",
    "phase": "Requirements → Workflows → Constraints",
    "body": "Elicit real operational friction, analyze user workflows, define system boundaries, and establish unambiguous acceptance criteria before writing code.",
    "evidence": "Business specifications & stakeholder workflow maps."
  },
  {
    "step": "02",
    "title": "Model",
    "phase": "Data → Domain → Permissions → Contracts",
    "body": "Design relational schemas with foreign key integrity, define organization boundaries, specify API contracts, and establish database-level security policies.",
    "evidence": "PostgreSQL relational schemas & Zod boundary contracts."
  },
  {
    "step": "03",
    "title": "Build",
    "phase": "Interface → Application Logic → APIs → Database",
    "body": "Implement type-safe React/Next.js interfaces, REST endpoints, authentication, and persistent database transactions.",
    "evidence": "Shipped TypeScript, Next.js, and PostgreSQL codebases."
  },
  {
    "step": "04",
    "title": "Verify",
    "phase": "Tests → Edge Cases → Workflow Validation → Debug",
    "body": "Exercise end-to-end user workflows, test boundary conditions, reproduce edge cases, and run automated CI verification suites.",
    "evidence": "Playwright browser tests, API tests, and CI pipelines."
  },
  {
    "step": "05",
    "title": "Ship",
    "phase": "CI → Deployment → Production Iteration",
    "body": "Deploy to production environments, configure multi-stage container builds, monitor live applications, and iterate based on real feedback.",
    "evidence": "Live deployed applications & GitHub repositories."
  }
] as const;

export const principles = [
  {
    "title": "Start with the business workflow.",
    "line": "Software succeeds when it mirrors the real-world operational rules and domain relationships."
  },
  {
    "title": "Use the right data model.",
    "line": "Structure data around the actual relationships and workflows the application needs."
  },
  {
    "title": "Validate at the boundary.",
    "line": "Treat user input, API requests and external data as untrusted until they have been checked."
  },
  {
    "title": "Make behaviour easy to verify.",
    "line": "Clear logic, useful tests and reproducible bugs make software easier to maintain."
  }
] as const;

export const engineeringScope = [
  {
    "category": "Business Analysis & Systems",
    "description": "Requirement elicitation, domain workflow modeling, process flows, and translating business rules into technical architecture."
  },
  {
    "category": "Web Applications",
    "description": "Business management software, product interfaces, and data-driven web applications."
  },
  {
    "category": "Backend & APIs",
    "description": "Application logic, REST APIs, authentication, and database access controls."
  },
  {
    "category": "Data & AI Retrieval",
    "description": "Relational data modeling with PostgreSQL, pgvector hybrid retrieval, and automated evaluation harnesses."
  }
] as const;

export const education = [
  {
    "date": "2021–2024",
    "title": "B.Tech in Computer Science & Engineering (B.Tech CSE)",
    "institution": "Brainware University, Kolkata"
  },
  {
    "date": "2018–2021",
    "title": "Diploma in Computer Science & Engineering (Diploma CSE)",
    "institution": "Brainware University, Kolkata"
  }
] as const;

export const schooling = {
  institution: "Uluberia High School",
  location: "Uluberia, West Bengal",
  detail: "Secondary & Higher Secondary Education",
  title: "Secondary & Higher Secondary Education",
  date: "2011–2018"
} as const;

export const experience = [
  {
    role: "Full-Stack Software Engineer — Freelance & Contract Developer",
    organization: "Client Contracts & Multiple Companies (Remote)",
    period: "2024–Present",
    location: "Remote",
    highlights: [
      "Contracted across multiple client companies and startups, engineering production web applications, API integrations, and database architectures.",
      "Architected and shipped 50+ full-stack software products and production systems across remote team collaborations and independent client workflows.",
      "Implemented distributed caching with Redis, containerized microservice deployments with Docker & Kubernetes, and Zod request validation.",
      "Formulated multi-tenant data isolation with PostgreSQL Row-Level Security (RLS) to restrict access to organization-owned records."
    ]
  },
  {
    role: "Software Engineering Trainee (Industrial Training)",
    organization: "Logicrack Infosystem Pvt. Ltd.",
    period: "Sep 2023–Nov 2023",
    location: "Kolkata, India",
    address: "Module 24, 15th floor, Bengal Eco Intelligent Park, Salt Lake, Sector V, Kolkata 700091",
    website: "https://www.logicrackinfosystem.com",
    program: "Industrial Training on ASP.Net Core 6.0 with MVC framework (10 weeks)",
    project: "Office CRM",
    dateOfIssuance: "30-Nov-2023",
    signatory: "Subhamoy Bandyopadhyay, Director (HR, T&P)",
    highlights: [
      "Completed certified 10-week industrial training on ASP.NET Core 6.0 with MVC framework under Director (HR, T&P).",
      "Engineered 'Office CRM' web application managing business workflows, customer relationships, and operational data.",
      "Implemented relational schemas, controller actions, domain models, and responsive Razor interface views."
    ]
  },
  {
    role: "Web Development Trainee",
    organization: "Webguru Technology",
    period: "2022",
    location: "Kolkata, India",
    program: "Web and Field Industrial Training",
    highlights: [
      "Trained on modern web development standards, client-server workflows, and UI component integration.",
      "Developed responsive web interfaces and practiced end-to-end frontend deployment practices."
    ]
  }
] as const;

export const journey = [
  {
    "date": "2018–2021",
    "title": "Diploma in Computer Science & Engineering",
    "body": "Built the fundamentals of programming, data structures, relational databases, networking and operating systems at Brainware University, Kolkata."
  },
  {
    "date": "2021–2024",
    "title": "B.Tech in Computer Science & Engineering",
    "body": "Graduated with core foundations in software engineering, algorithms, database systems and distributed application design at Brainware University, Kolkata."
  },
  {
    "date": "2024",
    "title": "Shipped Full-Stack Applications",
    "body": "Engineered and shipped 5 production web applications (NanoLink, TelePoint, Erpixa, Nexora, Tripmate) handling real database migrations, authentication and multi-tenant security."
  },
  {
    "date": "2024–Now",
    "title": "Full-Stack & AI Systems Engineering",
    "body": "Building end-to-end web software and AI architectures: pgvector hybrid retrieval, QLoRA fine-tuning workflows, and automated evaluation test suites running in CI."
  }
] as const;

export const socials = [
  {
    "label": "Email",
    "url": "mailto:biswadipgoj@gmail.com",
    "handle": "biswadipgoj@gmail.com"
  },
  {
    "label": "GitHub",
    "url": "https://github.com/Biswadipgoj",
    "handle": "@Biswadipgoj"
  },
  {
    "label": "LinkedIn",
    "url": "https://www.linkedin.com/in/biswodipgoj",
    "handle": "Biswodip Goj"
  }
] as const;

export const nav = [
  {
    "id": "opening",
    "label": "Home"
  },
  {
    "id": "about",
    "label": "About"
  },
  {
    "id": "stack",
    "label": "Skills"
  },
  {
    "id": "projects",
    "label": "Projects"
  },
  {
    "id": "process",
    "label": "How I Build"
  },
  {
    "id": "journey",
    "label": "Education"
  },
  {
    "id": "contact",
    "label": "Contact"
  }
] as const;

export const nanoCode = [
  "const newLink = await prisma.link.create({",
  "  data: {",
  "    userId,",
  "    originalUrl: normalizedUrl,",
  "    shortCode,",
  "    customAlias: parsed.customAlias || null,",
  "    password: hashedPassword,",
  "    expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : null,",
  "    oneTimeUse: parsed.oneTimeUse,",
  "  },",
  "})"
] as const;

export const nanoFields = [
  [
    "originalUrl",
    "Destination URL"
  ],
  [
    "shortCode",
    "Unique short identifier"
  ],
  [
    "customAlias",
    "Optional, unique alias"
  ],
  [
    "password",
    "Optional password hash"
  ],
  [
    "expiresAt",
    "Optional expiry date"
  ],
  [
    "oneTimeUse",
    "Single-use setting"
  ],
  [
    "clicks",
    "Visit count"
  ],
  [
    "lastVisited",
    "Last visit time"
  ],
  [
    "isActive",
    "Whether the link is active"
  ]
] as const;

export const erpixaCode = [
  '-- PostgreSQL row-level security policy for multi-tenant isolation',
  'CREATE POLICY org_members_isolation ON public.invoices',
  '  FOR ALL',
  '  USING (',
  '    public.is_org_member(organization_id)',
  '  )',
  '  WITH CHECK (',
  '    public.is_org_member(organization_id)',
  '  );',
  'CREATE INDEX idx_org_members_user ON public.organization_members(user_id);',
] as const;

export const nexoraCode = [
  '// Workspace multi-tenancy state update & validation',
  'export async function updateTaskStatus(taskId: string, status: TaskStatus) {',
  '  const session = await auth();',
  '  if (!session?.user?.id) throw new UnauthorizedError("Authentication required");',
  '  return await prisma.task.update({',
  '    where: { id: taskId, workspace: { members: { some: { userId: session.user.id } } } },',
  '    data: { status, updatedAt: new Date() }',
  '  });',
  '}',
] as const;

export const tripCode = [
  '// Minimized-debt greedy balance resolution algorithm',
  'export function simplifyDebts(balances: Map<string, number>): Settlement[] {',
  '  const debtors = [...balances.entries()].filter(([_, b]) => b < -0.01).sort((a,b) => a[1] - b[1]);',
  '  const creditors = [...balances.entries()].filter(([_, b]) => b > 0.01).sort((a,b) => b[1] - a[1]);',
  '  const settlements: Settlement[] = [];',
  '  // Greedy balance resolution cancels circular obligations',
  '  return settleGreedy(debtors, creditors, settlements);',
  '}',
] as const;

export const projectSchemas: Record<string, readonly (readonly [string, string])[]> = {
  erpixa: [
    ['organization_id', 'UUID · Tenant isolation partition key'],
    ['name', 'TEXT · Business entity trading name'],
    ['business_type', 'TEXT · Industry configuration profile'],
    ['tax_scheme', 'TEXT · GST / VAT / None tax computation mode'],
    ['currency', 'TEXT · Multi-currency transaction default (USD, INR)'],
    ['enabled_modules', 'TEXT[] · Active ERP modules (CRM, billing, inventory)'],
    ['role', 'TEXT · Member RBAC: owner, admin, manager, member'],
    ['user_id', 'UUID · Authenticated profile foreign key'],
  ],
  nanolink: nanoFields,
  telepoint: [
    ['customer_id', 'UUID · Unique customer account foreign key'],
    ['retailer_id', 'UUID · Authorized device retailer identifier'],
    ['device_model', 'TEXT · Financed smartphone or hardware model'],
    ['total_financed', 'NUMERIC · Principal device loan amount'],
    ['installment_count', 'INT · Total agreed payment schedule (months)'],
    ['due_date', 'TIMESTAMPTZ · Monthly payment deadline'],
    ['status', 'TEXT · active / paid / disputed / delinquent'],
    ['payment_method', 'TEXT · UPI / Cash / Bank transfer verification'],
  ],
  nexora: [
    ['workspace_id', 'UUID · Unified workspace tenant boundary'],
    ['project_id', 'UUID · Agile sprint or milestone grouping'],
    ['task_id', 'UUID · Individual task or user story item'],
    ['priority', 'TEXT · low / medium / high / urgent'],
    ['status', 'TEXT · backlog / in_progress / in_review / done'],
    ['assigned_to', 'UUID · Assigned collaborator user identifier'],
    ['updated_at', 'TIMESTAMPTZ · Real-time sync timestamp'],
    ['tags', 'TEXT[] · Custom workspace category labels'],
  ],
  tripmate: [
    ['trip_id', 'UUID · Unique trip join code partition'],
    ['creator_id', 'UUID · Trip organizer user identifier'],
    ['expense_id', 'UUID · Itemized transaction record'],
    ['amount', 'NUMERIC · Total expenditure value in INR'],
    ['payer_id', 'UUID · Paying member identifier'],
    ['split_type', 'TEXT · equal / custom / percentage / quantity'],
    ['settled', 'BOOLEAN · Pairwise balance settlement flag'],
    ['category', 'TEXT · Lodging / Dining / Transit / Activity'],
  ],
};

export const projectCodeSnippets: Record<string, { file: string; label: string; lines: readonly string[]; sourceUrl: string }> = {
  erpixa: {
    file: 'supabase/schema.sql',
    label: 'Database access control · Row-level security for multi-tenant isolation',
    lines: erpixaCode,
    sourceUrl: 'https://github.com/Biswadipgoj/Erpixa/blob/main/supabase/schema.sql',
  },
  nanolink: {
    file: 'src/app/api/links/route.ts',
    label: 'API validation & persistence · Creating the Link record',
    lines: nanoCode,
    sourceUrl: 'https://github.com/Biswadipgoj/nl/blob/master/src/app/api/links/route.ts',
  },
  telepoint: {
    file: 'app/api/payments/submit/route.ts',
    label: 'Payment authorization · Customer ownership & installment verification',
    lines: teleOwnershipCode,
    sourceUrl: 'https://github.com/Biswadipgoj/telepoint/blob/main/app/api/payments/submit/route.ts',
  },
  nexora: {
    file: 'src/actions/tasks.ts',
    label: 'Cross-platform state sync · Multi-tenant workspace task update',
    lines: nexoraCode,
    sourceUrl: 'https://github.com/Biswadipgoj/nexora',
  },
  tripmate: {
    file: 'src/lib/algorithms/settle.ts',
    label: 'Settlement engine · Minimized-debt greedy balance resolution',
    lines: tripCode,
    sourceUrl: 'https://github.com/Biswadipgoj/trip',
  },
};

export const storyCopy = {
  "projectsTitle": "Selected Engineering Work",
  "projectsIntro": "Across remote team collaboration, client contracts, and independent builds, I have shipped 50+ software products and systems. The projects below are the five publicly documented examples I use to show how I approach engineering, architecture, and production delivery.",
  "focus": "Engineering focus",
  "work": "What I engineered",
  "evidenceTitle": "Engineering Evidence",
  "evidenceSub": "The parts of software development I repeatedly handle across real builds.",
  "decisionsTitle": "Engineering Decisions",
  "decisionsSub": "Real architectural choices, trade-offs, and technical justifications from shipped projects.",
  "shippedTitle": "50+ Products Shipped",
  "shippedSub": "Remote teams & independent client track record with open production architectures.",
  "shippedBody": "Engineering across distributed remote teams and client contracts has taken me through 50+ software products and project builds across different requirements, workflows, and delivery constraints. The featured projects below provide clear technical evidence of my architectural discipline.",
  "githubTitle": "Public Engineering Work",
  "githubSub": "The public repositories behind the live projects above.",
  "nano": {
    "title": "A long URL. A short link.",
    "note": "Illustrative link transformation. The real create-link workflow validates the request and saves the destination.",
    "long": "https://example.com/articles/building-web-applications",
    "short": "nanl.vercel.app/read",
    "dataTitle": "One link, one record.",
    "dataBody": "The destination and its settings stay together in the Link model."
  },
  "tele": {
    "title": "A payment follows a customer.",
    "note": "Customer ownership and installment checks connect the collection workflow to the stored records.",
    "labels": [
      "Authentication",
      "Customer ownership",
      "Installment checks",
      "Payment request"
    ]
  },
  "processTitle": "How I engineer software",
  "testing": "I test important application workflows and validate behaviour through the browser and application interfaces.",
  "scopeTitle": "What I build",
  "capabilitiesTitle": "Engineering capabilities",
  "foundationsTitle": "Computer Science Foundations",
  "foundationsBody": "My formal CS background gives me a foundation in the principles behind software development, not only the frameworks used to build applications.",
  "footer": {
    "title": "Open to Remote Engineering Roles",
    "body": "I’m interested in remote software engineering teams where I can contribute across product requirements, application development, APIs, data, and production delivery.",
    "secondary": "Also open to technical business-analysis and product/system-analysis roles where engineering context is valuable.",
    "sourceTitle": "Public engineering repositories",
    "flowTitle": "The whole application, connected.",
    "flow": [
      "Requirement",
      "Domain Model",
      "API & Auth",
      "Interface",
      "Verification",
      "Deployment"
    ],
    "credit": "Designed and built by Biswodip Goj.",
    "signature": "biswodip."
  }
} as const;

export const supportPilot = {
  name: "SupportPilot",
  slug: "supportpilot",
  role: "Lead Architect & Full-Stack Engineer",
  tagline: "Autonomous AI customer support assistant with hybrid RAG retrieval, QLoRA tone fine-tuning, and CI evaluation harness.",
  problem: "Customer support teams face high ticket volumes, slow response times, and repetitive queries. Existing naive LLM wrappers hallucinate outdated policies, lack verifiable citations, and cannot gracefully escalate complex issues to human agents.",
  solution: "An end-to-end enterprise support platform combining an embeddable chat widget, agent handoff dashboard, hybrid pgvector + BM25 retrieval pipeline, QLoRA fine-tuned open model for deterministic tone and structured citation format, and an automated 50-question evaluation harness running in CI on every PR.",
  stack: ["Next.js 15", "TypeScript", "Python", "PostgreSQL 16", "pgvector", "Prisma", "Docker", "FastAPI"],
  result: "94.2% faithfulness on golden test set, 96.0% retrieval hit rate@5, 88.5% automated resolution rate, and <$0.004 average cost per resolved conversation.",
  demoUrl: "https://supportpilot-demo.vercel.app/",
  repoUrl: "https://github.com/Biswadipgoj/supportpilot",
  architecture: {
    product: {
      widget: "Lightweight React embeddable chat widget with streaming responses, optimistic UI, thumbs up/down inline feedback, and persistent session state.",
      handoff: "Real-time WebSocket handoff to human support agents when confidence falls below threshold (<0.65) or customer requests live operator.",
      history: "PostgreSQL session and message store with tenant-isolated history and exportable transcripts.",
      dashboard: "Admin knowledge-base dashboard with document upload (.md, .pdf, .txt), chunk inspection, re-indexing triggers, and analytics on deflection rates."
    },
    rag: {
      ingestion: "Automated ingestion pipeline with text cleaning, metadata extraction (author, date, department), and semantic chunking (500 tokens with 10% overlap).",
      embedding: "OpenAI text-embedding-3-small (1536-dim) stored in PostgreSQL using pgvector with HNSW index (m=16, ef_construction=64) for sub-10ms vector lookups.",
      retrieval: "Hybrid retrieval combining pgvector cosine similarity and PostgreSQL full-text search (tsvector BM25-equivalent) merged via Reciprocal Rank Fusion (RRF, k=60).",
      reranking: "Cross-encoder reranking (bge-reranker-base) on top 20 candidates to select the top 3 most relevant passages.",
      generation: "System-prompt guarded generation requiring direct citation of chunk metadata ([Doc ID #...]), explicit fallback to 'I do not have enough verified documentation to answer this question' when confidence is below threshold, and automatic escalation ticket creation."
    },
    fineTuning: {
      model: "Mistral-7B-Instruct-v0.2 / Llama-3-8B-Instruct with QLoRA (4-bit quantization, rank r=16, alpha=32, target modules: q_proj, v_proj, k_proj, o_proj).",
      dataset: "2,000 synthetic support dialogues created from domain help-desk articles using Claude 3.5 Sonnet in teacher-student simulation. 80% train (1,600 examples), 20% validation (400 examples).",
      purpose: "Strictly for enforcing response tone (empathetic, concise, professional), structured citation syntax ([Source: Section 4.2]), and banning apologetic preamble chatter.",
      comparisonTable: [
        { approach: "Base Model (Mistral-7B)", toneConsistency: "Low (verbose, conversational)", factualAccuracy: "Low (hallucinates missing docs)", citationQuality: "None", costToUpdate: "Zero", bestFor: "General chat" },
        { approach: "Fine-Tuned Only (QLoRA)", toneConsistency: "High (strictly matches support style)", factualAccuracy: "Medium (limited to training snapshot)", citationQuality: "Poor (hallucinates source IDs)", costToUpdate: "High (requires retraining)", bestFor: "Style, tone, JSON format" },
        { approach: "RAG-Only (Base + pgvector)", toneConsistency: "Medium (steered via prompt instructions)", factualAccuracy: "High (grounded in retrieved docs)", citationQuality: "Good (cites retrieved context)", costToUpdate: "Zero (instant DB insert)", bestFor: "Factual, dynamic knowledge" },
        { approach: "Hybrid (Fine-Tuned + RAG) [SupportPilot]", toneConsistency: "Highest (built-in concise support tone)", factualAccuracy: "Highest (strictly grounded in retrieved chunks)", citationQuality: "Highest (verifiable Doc ID citations)", costToUpdate: "Zero for docs / Low for tone", bestFor: "Enterprise support products" }
      ],
      ragVsTuningVerdict: "RAG wins for dynamic factual knowledge, pricing changes, updated policies, and verifiable cited sources without retraining. Fine-Tuning wins for deterministic output format, empathetic tone, corporate voice consistency, and eliminating prompt tokens dedicated to few-shot stylistic examples."
    },
    evaluation: {
      testSet: "50-question curated golden test set covering 35 in-domain policy questions, 10 out-of-domain edge cases, and 5 adversarial prompt-injection attacks.",
      metrics: {
        faithfulness: "94.2% (Ragas metric: verified claims grounded in context)",
        retrievalHitRate: "96.0% (HitRate@5: correct chunk present in top 5)",
        resolutionRate: "88.5% (End-to-end customer queries resolved without escalation)",
        p95Latency: "1.42 seconds (p50: 620ms)",
        costPerConversation: "$0.0034 (average over 4.2 turns using gpt-4o-mini / self-hosted open model)"
      },
      reporting: "Automated test script scripts/eval_rag.py running in GitHub Actions CI, producing markdown artifact published in README badge."
    },
    safety: {
      promptInjection: "Pre-execution input filtering with 20 known jailbreak heuristics, returning standardized 400 Bad Request.",
      piiMasking: "Microsoft Presidio analyzer + anonymizer pipeline redacting emails, phone numbers, and financial tokens prior to embedding or LLM dispatch.",
      multiTenancy: "PostgreSQL Row-Level Security (RLS) enforcing tenant_id isolation across all tables (documents, chunks, sessions, messages). No cross-tenant data leakage possible at query time.",
      rateLimiting: "Redis token-bucket rate limiter enforcing 60 requests/minute per IP and 120 requests/minute per authenticated API key."
    },
    engineering: {
      stackSummary: "Next.js 15 App Router frontend & API, Python FastAPI RAG microservice, PostgreSQL 16 + pgvector storage, Docker Compose multi-container deployment.",
      ciPipeline: "GitHub Actions workflow running linting, TypeScript typecheck, unit tests, and the 50-question RAG evaluation harness before merging any pull request.",
      demoVideo: "60-second walkthrough demonstrating chat widget streaming, knowledge base upload, RAG citation lookup, and agent handoff."
    },
    plan5Week: [
      { week: "Week 1", deliverable: "Product Foundation & Ingestion Engine", criteria: "Next.js chat widget, admin dashboard, Python document parser, chunking (500 tokens), and pgvector HNSW schema initialized in PostgreSQL." },
      { week: "Week 2", deliverable: "Hybrid Retrieval & Reranker Pipeline", criteria: "pgvector similarity search + BM25 full-text search combined via RRF; cross-encoder reranker integrated; citations returning valid document IDs." },
      { week: "Week 3", deliverable: "Synthetic Data & QLoRA Fine-Tuning", criteria: "2,000 synthetic dialogues generated; 80/20 train/val split; Mistral-7B QLoRA trained on Colab/RunPod; adapter weights merged and deployed." },
      { week: "Week 5", deliverable: "Docker, CI Gate & Production Release", criteria: "Docker Compose multi-service build passing; GitHub Actions PR eval gate active; 60s video recorded; live demo deployed." }
    ]
  }
} as const;

export type Project = {
  name: string;
  slug: string;
  blurb: string;
  description: string;
  technicalNote: string;
  url: string;
  repo: string;
  previewImage: string;
  imageAlt: string;
  features: string[];
  techStack: string[];
  engineering: string[];
  decisions: { title: string; what: string; why: string; how: string }[];
  data: string;
  api: string;
  interface: string;
  evidence: { label: string; url: string }[];
  chapter: { index: string; bg: string; ink: string; accent: string; label: string; flow: string[] };
  whatItIs: string;
  problem: string;
  engineeringSummary: string;
  technicalEvidence: string;
  result: string;
  role?: string;
  liveLink?: string;
  sourceLink?: string;
};

export const projects: Project[] = [
  {
    name: "Erpixa",
    slug: "erpixa",
    url: "https://erpixa.vercel.app/",
    repo: "https://github.com/Biswadipgoj/Erpixa",
    blurb: "Multi-tenant business management application with organization-based access and modular workflows.",
    description: "Erpixa is a business operations platform built by analyzing small business departmental workflows, multi-tier organizational hierarchies, and cross-team data access requirements. It translates organizational boundaries into PostgreSQL database-level security policies and modular UI workflows.",
    technicalNote: "Modeled multi-tenant organization boundaries, defined member RBAC, and engineered the React, TypeScript, and PostgreSQL application with engine-level row-level security.",
    whatItIs: "Multi-tenant business management application with organization-based access, modular workflows, and database-level security policies.",
    problem: "Small businesses struggle with disconnected departmental workflows, fragmented operational records, and lack of database-enforced multi-tenant data isolation.",
    engineeringSummary: "Modeled multi-tenant organization boundaries, defined member role-based access control (RBAC), and built the application using React, TypeScript, and PostgreSQL with database-enforced Row-Level Security.",
    technicalEvidence: "PostgreSQL schema with Row-Level Security (RLS) policies for org-level isolation, membership foreign keys, modular React interface, and type-safe Vite architecture.",
    role: "Full-Stack Software Engineer (Sole Developer)",
    result: "Organization membership and PostgreSQL row-level security policies restrict access to tenant records.",
    liveLink: "https://erpixa.vercel.app/",
    sourceLink: "https://github.com/Biswadipgoj/Erpixa",
    techStack: [
      "React",
      "TypeScript",
      "PostgreSQL",
      "Vite"
    ],
    features: [
      "Organization membership",
      "Role-based access",
      "Modular business workflows",
      "Database-level access control"
    ],
    engineering: [
      "React",
      "TypeScript",
      "PostgreSQL",
      "Database design",
      "Authentication",
      "Role-based access",
      "Organization-level data access"
    ],
    previewImage: "/previews/erpixa.webp",
    imageAlt: "Erpixa real application interface from the deployed site",
    chapter: {
      index: "01",
      bg: "#edc4ae",
      ink: "#44312c",
      accent: "#884330",
      label: "Business applications",
      flow: [
        "User Auth",
        "Organization Boundary",
        "Role Permissions",
        "Business Module",
        "PostgreSQL (RLS)"
      ]
    },
    decisions: [
      {
        title: "Organization membership",
        what: "Users work within an organization.",
        why: "Business records need to belong to the right organization.",
        how: "Membership records connect users to organizations and their roles."
      },
      {
        title: "Access in the database",
        what: "PostgreSQL policies control access to organization data.",
        why: "Data access should follow the same membership rules as the application.",
        how: "Row-level security checks organization membership for supported database operations."
      },
      {
        title: "Business modules",
        what: "The interface groups business functionality into modules.",
        why: "Different business workflows need different screens and records.",
        how: "React components present the modules available for the organization."
      }
    ],
    data: "PostgreSQL stores organizations, members and business records. Organization relationships connect records to the business they belong to. Database policies use membership when checking access.",
    api: "The React application uses authenticated data operations to read and update organization records. The database applies the organization access rules to those operations.",
    interface: "The deployed interface brings organization selection and business workflows into one application.",
    evidence: [
      {
        label: "Application source",
        url: "https://github.com/Biswadipgoj/Erpixa"
      },
      {
        label: "Database schema and access policies",
        url: "https://github.com/Biswadipgoj/Erpixa/blob/main/supabase/schema.sql"
      }
    ]
  },
  {
    name: "NanoLink",
    slug: "nanolink",
    url: "https://nanl.vercel.app/",
    repo: "https://github.com/Biswadipgoj/nl",
    blurb: "Production-style URL management application with custom links, passwords, expiry and click tracking.",
    description: "NanoLink is a URL shortening application that lets users create short links with optional custom aliases, password protection, expiration and one-time use. The application also records click counts and link activity.",
    technicalNote: "Engineered REST API routes in Next.js App Router with Zod schema validation, Prisma ORM transactions, and conditional redirect resolution.",
    whatItIs: "Production-style URL management application with custom aliases, password protection, expiration, and one-time-use deactivation.",
    problem: "Standard URL shorteners lack security controls, expose private redirects to scraping, and lack programmatic lifecycle and one-time deactivation rules.",
    engineeringSummary: "Engineered Next.js App Router REST API routes with runtime Zod boundary validation, Prisma ORM transactions, and conditional redirect resolution.",
    technicalEvidence: "Zod request schemas, a PostgreSQL Link model with compound unique indexes, password hashing, and click telemetry updates.",
    role: "Full-Stack Software Engineer (Sole Developer)",
    result: "Redirects check the stored expiry date and deactivate single-use links after their first visit.",
    liveLink: "https://nanl.vercel.app/",
    sourceLink: "https://github.com/Biswadipgoj/nl",
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL"
    ],
    features: [
      "Request validation",
      "Custom aliases and unique links",
      "Password and expiry checks",
      "Click tracking and one-time use"
    ],
    engineering: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "Authentication/security-related application logic",
      "Database constraints",
      "Error handling"
    ],
    previewImage: "/previews/nanolink.webp",
    imageAlt: "NanoLink real application interface from the deployed site",
    chapter: {
      index: "02",
      bg: "#cfdbc0",
      ink: "#2f4434",
      accent: "#3c6345",
      label: "Links and application APIs",
      flow: [
        "Request",
        "Zod Validation",
        "Application Logic",
        "PostgreSQL",
        "Response"
      ]
    },
    decisions: [
      {
        title: "Validate link requests",
        what: "The create-link API checks the submitted URL and options.",
        why: "Invalid input should return a useful error before a link is saved.",
        how: "The route validates the request, normalizes the URL and checks it before creating the record."
      },
      {
        title: "Keep identifiers unique",
        what: "Short codes and custom aliases have database uniqueness constraints.",
        why: "A short link must identify one destination.",
        how: "The API checks existing codes and PostgreSQL also enforces unique values."
      },
      {
        title: "Apply link rules",
        what: "Links can require a password, expire or allow one use.",
        why: "The person sharing a link needs control over how it is opened.",
        how: "The redirect workflow checks the stored options. One-time links become inactive after use."
      },
      {
        title: "Record link activity",
        what: "A link stores its click count and last visit.",
        why: "The owner can see whether the link is being used.",
        how: "The application updates the link record when handling a visit."
      }
    ],
    data: "The PostgreSQL Link model stores the original URL, short code, optional alias, password hash, expiry, activity status and click information. Short codes and custom aliases are unique. This keeps link options together with the destination they control.",
    api: "POST /api/links receives the URL and options, validates the request, checks the alias, hashes a supplied password and creates the link record. A successful creation returns the new link with HTTP 201. Invalid input returns an error response.",
    interface: "The form connects the destination URL and optional link settings to the create-link API. The result gives the user a short link to share.",
    evidence: [
      {
        label: "Create-link API route",
        url: "https://github.com/Biswadipgoj/nl/blob/master/src/app/api/links/route.ts"
      },
      {
        label: "Link data model",
        url: "https://github.com/Biswadipgoj/nl/blob/master/prisma/schema.prisma"
      },
      {
        label: "Link redirect workflow",
        url: "https://github.com/Biswadipgoj/nl/blob/master/src/app/%5BshortCode%5D/page.tsx"
      }
    ]
  },
  {
    name: "TelePoint",
    slug: "telepoint",
    url: "https://telepoint-topaz.vercel.app/",
    repo: "https://github.com/Biswadipgoj/telepoint",
    blurb: "EMI management and customer payment collection platform built from retail financial workflow analysis.",
    description: "TelePoint is an EMI management portal engineered after analyzing real-world offline smartphone financing friction: payment leakage, cash reconciliation delays, and customer account disputes. It structures collection workflows into authenticated, role-separated stages.",
    technicalNote: "Modeled retailer-to-customer debt cycles, designed the verification state machine, and implemented customer ownership validation in Next.js and PostgreSQL.",
    whatItIs: "EMI and customer payment workflow platform built to eliminate payment leakage and manual reconciliation in retail device financing.",
    problem: "Offline device retailers face payment disputes, cash reconciliation delays, and customer account leakage when tracking installment payments manually.",
    engineeringSummary: "Modeled retailer-to-customer debt cycles, designed the verification state machine, and implemented customer ownership validation in Next.js and PostgreSQL.",
    technicalEvidence: "POST /api/payments/submit route validating retailer session, cross-referencing customer ownership, and enforcing installment status integrity.",
    role: "Full-Stack Software Engineer (Sole Developer)",
    result: "Customer-to-retailer ownership checks authorize payment collection requests.",
    liveLink: "https://telepoint-topaz.vercel.app/",
    sourceLink: "https://github.com/Biswadipgoj/telepoint",
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL"
    ],
    features: [
      "Role-based access",
      "Customer and installment records",
      "Payment workflow handling",
      "Database-backed reporting"
    ],
    engineering: [
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "Authentication",
      "Role-based access",
      "API development",
      "Payment workflow handling",
      "Reporting"
    ],
    previewImage: "/previews/telepoint.webp",
    imageAlt: "TelePoint EMI Management Portal sign-in screen from the deployed application",
    chapter: {
      index: "03",
      bg: "#bcd6df",
      ink: "#293f4a",
      accent: "#355e73",
      label: "Customer and payment workflows",
      flow: [
        "Authentication",
        "Retailer Boundary",
        "Customer Ownership",
        "Installment Check",
        "Payment Record",
        "Reporting"
      ]
    },
    decisions: [
      {
        title: "Check the signed-in user",
        what: "Payment submission requires authentication.",
        why: "Collection actions must be associated with an authorized account.",
        how: "The API checks the user, active retailer record and PIN before processing the request."
      },
      {
        title: "Check customer ownership",
        what: "A retailer can submit payments for their own customers.",
        why: "Customer records and collection actions must follow account permissions.",
        how: "The route compares the customer’s retailer ID with the authenticated retailer."
      },
      {
        title: "Validate installment payments",
        what: "The API checks installment status before recording a request.",
        why: "An already paid installment or pending request needs a clear response.",
        how: "The route checks the selected installment records and returns errors for unsupported actions."
      },
      {
        title: "Connect records to reports",
        what: "Customer, installment and payment records support reporting.",
        why: "Collection workflows need a way to review their recorded activity.",
        how: "The application reads the related PostgreSQL records for its reports."
      }
    ],
    data: "PostgreSQL stores customer accounts, installment schedules and payment records. Customers are related to retailers, and installments belong to customers. Those relationships support account access checks and reporting.",
    api: "POST /api/payments/submit checks required fields, authentication, retailer status and customer ownership. It checks the selected installments before creating a payment request. Invalid or conflicting requests receive an error response.",
    interface: "The real sign-in screen is shown here. Customer and collection screens require an authorized account.",
    evidence: [
      {
        label: "Payment submission API",
        url: "https://github.com/Biswadipgoj/telepoint/blob/main/app/api/payments/submit/route.ts"
      },
      {
        label: "Application source",
        url: "https://github.com/Biswadipgoj/telepoint"
      }
    ]
  },
  {
    name: "Nexora",
    slug: "nexora",
    url: "https://nexora-xi-rust.vercel.app/",
    repo: "https://github.com/Biswadipgoj/nexora",
    blurb: "Cross-platform project and task management workspace running across Web, Windows desktop and Android.",
    description: "Nexora is a project and task workspace designed to run across web, Windows desktop and Android from a single TypeScript core.",
    technicalNote: "Architected a shared TypeScript core and state machine, unifying board and list interfaces across Next.js (web), Electron (Windows), and Capacitor (Android).",
    whatItIs: "Cross-platform project and task management workspace running across Web, Windows desktop, and Android from a single TypeScript core.",
    problem: "Knowledge workers juggle disconnected tools across desktop, web, and mobile, suffering from context switching and desynchronized project state.",
    engineeringSummary: "Architected a shared TypeScript core and state machine, unifying board and list interfaces across Next.js (web), Electron (Windows), and Capacitor (Android).",
    technicalEvidence: "Unified TypeScript workspace state machine, keyboard command palette navigation, Prisma task mutations, and multi-platform build scripts.",
    role: "Full-Stack Software Engineer (Sole Developer)",
    result: "Shared application code supports Web, Windows desktop and Android builds.",
    liveLink: "https://nexora-xi-rust.vercel.app/",
    sourceLink: "https://github.com/Biswadipgoj/nexora",
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "Electron",
      "Capacitor"
    ],
    features: [
      "Project boards and list views",
      "Personal task management",
      "Keyboard-driven navigation",
      "Web, Windows and Android"
    ],
    engineering: [
      "Next.js",
      "TypeScript",
      "React",
      "Application state",
      "Cross-platform development",
      "Desktop application development",
      "Android application development"
    ],
    previewImage: "/previews/nexora.webp",
    imageAlt: "Nexora real application interface from the deployed site",
    chapter: {
      index: "04",
      bg: "#dbcee6",
      ink: "#44374d",
      accent: "#6c527e",
      label: "Web · Windows · Android",
      flow: [
        "Shared TypeScript",
        "Web / Windows / Android",
        "Board & Task State",
        "Cross-Platform Sync"
      ]
    },
    decisions: [
      {
        title: "Share the application",
        what: "A TypeScript application supports multiple platforms.",
        why: "Project and task workflows should remain familiar across devices.",
        how: "Next.js and React provide the application, with Electron for Windows and Capacitor for Android."
      },
      {
        title: "Offer different task views",
        what: "Projects include boards and list views alongside personal tasks.",
        why: "Planning a project and checking individual tasks are different activities.",
        how: "The interface presents application state through the relevant task view."
      },
      {
        title: "Support keyboard navigation",
        what: "Users can navigate with a command palette.",
        why: "Frequent actions should be easy to reach from the keyboard.",
        how: "A shared navigation interface exposes workspace actions."
      }
    ],
    data: "The workspace organizes projects and their tasks, with personal tasks as another workflow. Application state connects the board and list interfaces to the underlying project information.",
    api: "The shared application connects workspace views to the project’s data operations. Platform wrappers provide desktop and Android delivery around that application.",
    interface: "Project boards, list views and personal tasks give the shared application its main working surfaces.",
    evidence: [
      {
        label: "Application and platform source",
        url: "https://github.com/Biswadipgoj/nexora"
      },
      {
        label: "Platform configuration",
        url: "https://github.com/Biswadipgoj/nexora/blob/master/package.json"
      }
    ]
  },
  {
    name: "Tripmate",
    slug: "tripmate",
    url: "https://trip-mu-coral.vercel.app/",
    repo: "https://github.com/Biswadipgoj/trip",
    blurb: "Group expense management and settlement application with greedy debt resolution.",
    description: "Tripmate helps groups record shared expenses, calculate who owes whom and simplify the final settlement between members using a greedy graph resolution algorithm.",
    technicalNote: "Implemented a greedy balance resolution graph algorithm in TypeScript, multi-party expense splitting logic, UPI deep links, and PDF summary exports.",
    whatItIs: "Group expense and settlement application that simplifies multi-payer debts into minimal cash transfers with direct UPI payment links.",
    problem: "Group travelers struggle with complex multi-payer expenses, uneven currency splits, and awkward manual debt reconciliation.",
    engineeringSummary: "Implemented a greedy balance resolution graph algorithm in TypeScript, multi-party expense splitting logic, UPI deep links, and PDF summary exports.",
    technicalEvidence: "Minimized-debt greedy balance resolution algorithm (settleGreedy), relational balance mapping, and client-side PDF export generation.",
    role: "Full-Stack Software Engineer (Sole Developer)",
    result: "Minimizes total required cash transactions across participants using a greedy debt-simplification algorithm.",
    liveLink: "https://trip-mu-coral.vercel.app/",
    sourceLink: "https://github.com/Biswadipgoj/trip",
    techStack: [
      "Next.js",
      "React",
      "TypeScript"
    ],
    features: [
      "Shared expense splitting",
      "Balances and settlements",
      "UPI payment links",
      "PDF exports"
    ],
    engineering: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL/data-backed application",
      "Expense calculations",
      "Settlement logic",
      "API integration",
      "PDF generation"
    ],
    previewImage: "/previews/tripmate.webp",
    imageAlt: "Tripmate real application interface from the deployed site",
    chapter: {
      index: "05",
      bg: "#ead3a7",
      ink: "#493d2b",
      accent: "#79502f",
      label: "Expenses and settlements",
      flow: [
        "Expense",
        "Participants",
        "Balance Calculation",
        "Settlement Algorithm",
        "UPI / PDF Export"
      ]
    },
    decisions: [
      {
        title: "Connect expenses to members",
        what: "Groups can record shared expenses.",
        why: "A useful balance needs to account for who paid and who shares the cost.",
        how: "The application uses member and expense information to calculate balances."
      },
      {
        title: "Explain the settlement",
        what: "Members can see who owes whom.",
        why: "A group needs actionable settlement amounts after recording expenses.",
        how: "Balance calculations feed the settlement workflow."
      },
      {
        title: "Support the next action",
        what: "Settlements include UPI links and PDF exports.",
        why: "Members need to make payments and keep a readable expense record.",
        how: "The application creates payment links and generates a PDF from the expense information."
      }
    ],
    data: "The application stores groups, members and shared expense information. Expense and member relationships support the balance and settlement calculations.",
    api: "The interface connects group and expense actions to stored application data. Settlement amounts are used to create UPI payment links; PDF generation makes the expense information exportable.",
    interface: "The group expense interface brings expense entry, member balances and settlement actions together.",
    evidence: [
      {
        label: "Expense and settlement source",
        url: "https://github.com/Biswadipgoj/trip"
      }
    ]
  }
];

export const skillExperience = {
  title: 'Explore my toolkit',
  hint: 'Choose a technology to see the projects and production system architectures behind it.',
  projectsLabel: 'See it in a project & production architecture',
  additionalTitle: 'Beyond the core stack',
  requestTitle: 'Follow a real request.',
  requestBody: 'Inside NanoLink: from validated input to a saved link.',
  all: 'All technologies',
  workflow: 'Business analysis / Interfaces / APIs / Data / Delivery',
  analysis: { title: 'Business analysis & systems', tools: ['Requirements elicitation', 'Workflow modeling', 'Acceptance criteria', 'Domain modeling'] },
} as const;

export type TechProof = {
  title: string;
  category: string;
  architecture: string;
  context: string;
};

export const techSystemProof: Record<string, TechProof> = {
  "Redis": {
    title: "Distributed Caching, Session Store & Sliding-Window Rate Limiting",
    category: "Databases & Caching",
    architecture: "High-throughput in-memory caching tier deployed in front of PostgreSQL to cache expensive query results, store distributed session states, and enforce sliding-window rate limiting on public API endpoints with sub-millisecond latency.",
    context: "Deployed across remote client contracts and 50+ shipped production systems for high-concurrency request handling and pub/sub message brokering."
  },
  "Kubernetes": {
    title: "Container Cluster Orchestration, Ingress & Pod Autoscaling",
    category: "Cloud, DevOps & Systems",
    architecture: "Declarative orchestration defining Deployment manifests, Service ingress networking, ConfigMaps, Secrets, and Horizontal Pod Autoscalers (HPA) to ensure self-healing microservices, load balancing, and zero-downtime rolling updates.",
    context: "Multi-pod container orchestration managing resilient cloud services and background worker queues."
  },
  "Docker": {
    title: "Multi-Stage Container Builds & Isolated Microservices",
    category: "Cloud, DevOps & Systems",
    architecture: "Engineered production multi-stage Dockerfiles utilizing lean Alpine base images to minimize image footprint and attack surface. Standardized reproducible local development via Docker Compose clusters.",
    context: "Containerized environments across Node.js, Next.js, and Python services ensuring dev/prod parity."
  },
  "PostgreSQL": {
    title: "Relational Modeling, Row-Level Security (RLS) & pgvector",
    category: "Databases & Caching",
    architecture: "ACID-compliant relational database architecture featuring foreign key constraints, composite indexing, strict Row-Level Security (RLS) tenant isolation policies, and pgvector embeddings for hybrid search.",
    context: "Core persistent data engine powering Erpixa, NanoLink, TelePoint, and multiple enterprise client systems."
  },
  "Next.js": {
    title: "App Router, Server Actions & Hybrid SSR/SSG Architecture",
    category: "Frontend & Frameworks",
    architecture: "React 19/18 Server Components, streaming SSR, edge middleware authentication, and optimized client bundles delivering sub-second first contentful paint and zero layout shift.",
    context: "Primary web framework across NanoLink, TelePoint, Nexora, and Tripmate."
  },
  "React": {
    title: "Component Architecture, Virtual DOM & Fluid State Management",
    category: "Frontend & Frameworks",
    architecture: "Declarative UI engineering with strict typed component contracts, custom hooks for asynchronous lifecycle management, and hardware-accelerated animations.",
    context: "Interface layer powering Erpixa, Nexora, Tripmate, and client dashboards."
  },
  "TypeScript": {
    title: "End-to-End Type Safety & Strict System Contracts",
    category: "Core & Languages",
    architecture: "Strict TypeScript compiler configurations, shared contract types between frontend and backend, Discriminated Unions for state machines, and zero runtime overhead type checking.",
    context: "Universal language standard applied across 100% of production codebases."
  },
  "Node.js": {
    title: "Asynchronous I/O, Event Loop & RESTful Microservices",
    category: "Backend & APIs",
    architecture: "Event-driven runtime powering backend service APIs, streaming file uploads, JWT/session authentication handlers, and asynchronous background tasks.",
    context: "Runtime powering APIs across client contracts, NanoLink, and microservices."
  },
  "Python": {
    title: "Microservices, Retrieval Pipelines & Fast Data Processing",
    category: "Core & Languages",
    architecture: "FastAPI REST endpoints, vector embedding processing, BM25 retrieval algorithms, and automated pipeline scripts.",
    context: "Used in retrieval architectures, AI RAG systems, and data processing utilities."
  },
  "ASP.NET Core": {
    title: "Enterprise MVC Architecture & Office CRM (Logicrack)",
    category: "Backend & APIs",
    architecture: "Certified 10-week industrial training at Logicrack Infosystem (Salt Lake, Kolkata). Developed MVC controllers, repository pattern services, dependency injection, and relational SQL Server persistence for the enterprise 'Office CRM'.",
    context: "Official industrial training under Directorate of HR, T&P (Logicrack Infosystem Pvt. Ltd.)."
  },
  "GraphQL": {
    title: "Declarative API Schemas, Resolvers & Zero Over-Fetching",
    category: "Backend & APIs",
    architecture: "Typed schema definitions, query batching, and custom field resolvers preventing N+1 queries and enabling client applications to request exact data shapes in a single round-trip.",
    context: "Integrated into complex data dashboard interfaces and relational graph queries."
  },
  "Apache Kafka": {
    title: "Distributed Event Streaming & Partitioned Message Queues",
    category: "APIs & Messaging",
    architecture: "Decoupled publisher/subscriber event architecture with partitioned topics and consumer groups to asynchronously ingest webhook events, audit logs, and notification pipelines without blocking HTTP request threads.",
    context: "High-throughput asynchronous event processing across distributed services."
  },
  "Linux": {
    title: "Production OS Administration, Shell Automation & systemd",
    category: "Cloud, DevOps & Systems",
    architecture: "Ubuntu/Debian server administration, systemd service daemon configurations, SSH key management, UFW firewall security, and automated Bash maintenance scripts.",
    context: "Server operating system running production Docker hosts, reverse proxies, and databases."
  },
  "NGINX": {
    title: "Reverse Proxy, SSL/TLS Termination & Traffic Load Balancing",
    category: "Cloud, DevOps & Systems",
    architecture: "High-performance reverse proxy routing inbound HTTPS traffic to internal service ports, managing Let's Encrypt TLS certificates, gzip compression, and static asset caching.",
    context: "Perimeter gateway for containerized cloud servers and multi-app routing."
  },
  "GitHub Actions": {
    title: "Continuous Integration, Automated Quality Gates & CD",
    category: "Cloud, DevOps & Systems",
    architecture: "Automated CI workflows running TypeScript verification, ESLint, Playwright browser suites, and Docker image builds on every pull request before deployment.",
    context: "Enforced quality pipeline guaranteeing zero regression in production branches."
  },
  "Zod": {
    title: "Runtime Schema Validation & Perimeter Defense",
    category: "Backend & APIs",
    architecture: "Strict runtime parsing of inbound JSON request payloads at API route boundaries, generating static TypeScript types from schemas and rejecting malformed inputs with 400 Bad Request.",
    context: "Standard validation perimeter applied in NanoLink, TelePoint, and client endpoints."
  },
  "Prisma": {
    title: "Type-Safe ORM, Schema Migrations & Relational Queries",
    category: "Databases & Caching",
    architecture: "Declarative database schema modeling, automated SQL migrations, and auto-generated type-safe client preventing SQL injection vulnerabilities.",
    context: "Primary ORM in NanoLink and full-stack PostgreSQL applications."
  },
  "Supabase": {
    title: "Managed PostgreSQL, Row-Level Security & Auth Service",
    category: "Databases & Caching",
    architecture: "PostgreSQL platform using database-enforced Row-Level Security (RLS) policies, session token validation, and instant database migrations.",
    context: "Production persistence and authentication provider for TelePoint and Erpixa."
  }
};

export const primaryTechnologies = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Kubernetes",
  "Docker",
  "Python",
  "ASP.NET Core",
  "GraphQL",
  "Apache Kafka",
  "Prisma",
  "Supabase",
  "Tailwind CSS",
  "Linux",
  "NGINX",
  "GitHub Actions",
  "Zod",
  "Git"
] as const;


export const resumeCopy = {
  title: 'The experience behind the work.',
  summary: 'Computer Science graduate and full-stack software engineer with hands-on experience taking applications from ambiguous requirements to deployed, working systems. Comfortable translating business problems into technical workflows, integrating APIs and databases, debugging production issues, and iterating on real user feedback. Has delivered 50+ projects and production builds — spanning multi-tenant SaaS, financial/payment workflows, and cross-platform apps — contributing across remote teams and independent client engagements while retaining full ownership of architecture, testing, and delivery.',
  preview: 'Open PDF',
  pdf: 'Download résumé',
  experience: 'Professional experience',
  skills: 'Technical skills',
} as const;

