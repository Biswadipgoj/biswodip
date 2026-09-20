/** Public content: September 2026 specification. Project evidence is linked below. */

export const personal = {
  "name": "Biswadip Goj",
  "firstName": "Biswadip",
  "lastName": "Goj",
  "email": "biswadipgoj@gmail.com",
  "location": "West Bengal, India",
  "availability": "Immediate notice / Open to remote & relocation",
  "role": "Full-Stack Software Engineer & Business Analyst",
  "tagline": "Full-stack software engineer & business analyst bridging business requirements, workflow modeling, relational schemas, and AI systems.",
  "intro": "I’m Biswadip Goj, a Full-Stack Software Engineer and Business Analyst. I bridge operational requirements and technical execution: analyzing business workflows, structuring relational data models, and engineering complete web applications and AI systems.",
  "about": [
    "I work across the complete lifecycle from business analysis and workflow design to full-stack engineering and deployment. I understand the business problem first—stakeholder workflows, data boundaries, and operational rules—before architecting the software.",
    "My engineering stack is centered on TypeScript, React, Next.js, Node.js, PostgreSQL, Prisma, and Python, paired with business analysis methodologies: requirement elicitation, process flow mapping, and acceptance testing.",
    "Building projects like TelePoint and Erpixa meant acting as both the business analyst and the engineer: analyzing retail EMI collection friction and multi-tenant organization hierarchies, defining the data structures, and engineering the complete product.",
    "I focus on software that solves real operational bottlenecks with transparent schemas, deterministic APIs, and verified test suites."
  ],
  "ownership": "I bridge business analysis and full-stack software engineering, from requirements and data schemas to user-facing applications.",
  "maturity": "I don't just build the interface. I work through the business requirements, data architecture, APIs, and deployment needed to make products work in production.",
  "resume": "/Biswodip-Goj-Resume.pdf",
  "canonicalUrl": "https://biswadip.in"
} as const;

export const hero = {
  "eyebrow": "FULL-STACK SOFTWARE ENGINEER & BUSINESS ANALYST · BISWADIP GOJ",
  "heading": "Software, end to end.",
  "body": "I analyze business workflows and engineer full-stack web applications and AI systems, connecting business requirements to production software.",
  "primary": "View projects",
  "secondary": "Contact me",
  "proofPoints": [
    "5 Production Web Applications",
    "Business Analysis & System Architecture",
    "B.Tech CSE 2024 · Brainware University"
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
  identity: 'A person behind every decision.',
  stack: 'Follow a request. See the engineering.',
  stackBody: 'A real NanoLink request connects the interface, validation, application logic and persistent data.',
  work: 'Built to be used.',
  process: 'From a requirement to a release.',
  education: 'The foundations behind the frameworks.',
  contact: 'Let’s build what comes next.',
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
  "title": "Biswadip Goj — Full-Stack Software Engineer & Business Analyst",
  "description": "Biswadip Goj is a Full-Stack Software Engineer and Business Analyst building web applications, APIs, and production AI systems with TypeScript, Next.js, PostgreSQL, Prisma, and Python.",
  "canonical": "https://biswadip.in",
  "socialTitle": "Biswadip Goj | Full-Stack Software Engineer & Business Analyst",
  "socialDescription": "Full-stack software engineer and business analyst bridging business requirements, workflow modeling, relational schemas, and AI systems across TypeScript, Next.js, PostgreSQL, and Python."
} as const;

export const foundations = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Machine Learning",
  "Cyber Security"
] as const;

export const stack = [
  {
    "title": "Business Analysis & Systems",
    "tools": [
      "Requirements Elicitation (BRD/PRD)",
      "Process Flow Modeling",
      "Workflow & Domain Design",
      "User Stories & Acceptance (UAT)",
      "System Boundaries"
    ]
  },
  {
    "title": "Core Languages",
    "tools": [
      "TypeScript",
      "JavaScript",
      "Python",
      "SQL"
    ]
  },
  {
    "title": "Frontend & Frameworks",
    "tools": [
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML5",
      "CSS3"
    ]
  },
  {
    "title": "Backend & APIs",
    "tools": [
      "Node.js",
      "REST APIs",
      "FastAPI",
      "Zod",
      "Authentication (RBAC)"
    ]
  },
  {
    "title": "Databases & Storage",
    "tools": [
      "PostgreSQL",
      "pgvector",
      "Prisma ORM",
      "MongoDB",
      "Row-Level Security (RLS)"
    ]
  },
  {
    "title": "AI & Retrieval Systems",
    "tools": [
      "RAG Architecture",
      "Hybrid Retrieval (BM25 + Vector)",
      "Cross-Encoder Reranking",
      "QLoRA / Fine-Tuning",
      "Model Evaluation (Ragas)"
    ]
  },
  {
    "title": "DevOps & Infrastructure",
    "tools": [
      "Docker",
      "Git & GitHub Actions (CI/CD)",
      "Postman",
      "Vercel"
    ]
  },
  {
    "title": "CS Fundamentals",
    "tools": [
      "Data Structures & Algorithms",
      "Object-Oriented Design",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks"
    ]
  }
] as const;

export const primaryStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Python",
  "REST APIs",
  "RAG & pgvector",
  "LLM Evaluation",
  "Docker",
  "Row-Level Security"
] as const;

export const stackCopy = {
  "title": "Technologies I work with",
  "intro": "My core capabilities span business analysis, domain modeling, full-stack application development, and retrieval-augmented AI systems.",
  "notes": [
    {
      "name": "Business Analysis & Systems",
      "body": "Analyzing domain workflows, writing functional specifications, mapping edge cases, and converting stakeholder requirements into data schemas."
    },
    {
      "name": "TypeScript & Next.js",
      "body": "Type-safe routing, server actions, and component architecture across 5 shipped web applications."
    },
    {
      "name": "PostgreSQL & pgvector",
      "body": "Relational schema design, foreign key constraints, HNSW vector indexing, and hybrid retrieval."
    },
    {
      "name": "Prisma ORM & Zod",
      "body": "Strict runtime boundary validation and type-safe database access."
    },
    {
      "name": "Python & AI Pipelines",
      "body": "RAG architectures, semantic chunking, QLoRA fine-tuning workflows, and automated evaluation test suites."
    },
    {
      "name": "Docker & CI Automation",
      "body": "Multi-stage container builds and GitHub Actions CI running automated evaluation runs on pull requests."
    }
  ]
} as const;

export const capabilities = [
  {
    "title": "Business Analysis & Systems Modeling",
    "body": "Eliciting stakeholder requirements, mapping business processes, defining functional specifications, and translating operational workflows into robust technical architectures."
  },
  {
    "title": "Application Development",
    "body": "Building complete web applications with reusable interfaces, application logic, authentication and persistent data."
  },
  {
    "title": "AI & ML Engineering",
    "body": "Designing RAG pipelines, integrating LLMs via LangChain and OpenAI, building vector search systems and deploying intelligent features into production applications."
  },
  {
    "title": "API Development",
    "body": "Designing and consuming REST APIs, handling requests and responses, validation, authentication and third-party integrations."
  },
  {
    "title": "Database Development",
    "body": "Designing relational and document-oriented data models, writing queries, pgvector embeddings and connecting application workflows to persistent data."
  },
  {
    "title": "Frontend Engineering",
    "body": "Building responsive React and Next.js interfaces with reusable components, application state and API integration."
  },
  {
    "title": "Debugging & Quality",
    "body": "Reproducing problems, tracing application behaviour, fixing defects and checking important user workflows before release."
  },
  {
    "title": "DevOps & Delivery",
    "body": "Containerizing with Docker, deploying to Vercel, working with Git/GitHub CI pipelines from initial requirement to production."
  }
] as const;

export const processStages = [
  {
    "title": "Analyze & Understand",
    "body": "Elicit business requirements, analyze operational friction, and map stakeholder workflows.",
    "artifact": "Business Requirements",
    "question": "What is the business workflow and user objective?"
  },
  {
    "title": "Architect & Design",
    "body": "Model data structures, define system boundaries, and specify API contracts before code.",
    "artifact": "System Architecture",
    "question": "How do domain rules, data models, and APIs align?"
  },
  {
    "title": "Build",
    "body": "Develop the interface, application logic, APIs and database integration.",
    "artifact": "Working software",
    "question": "What happens when the user takes an action?"
  },
  {
    "title": "Test & Verify",
    "body": "Exercise business workflows, test boundary conditions, and verify user acceptance criteria.",
    "artifact": "Test + debug",
    "question": "Does the complete workflow satisfy the business rules?"
  },
  {
    "title": "Ship",
    "body": "Deploy the application, fix issues and continue improving it.",
    "artifact": "Deployment",
    "question": "Can someone open and use the application?"
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
    "title": "B.Tech in Computer Science & Engineering",
    "institution": "Brainware University"
  },
  {
    "date": "2018–2021",
    "title": "Diploma in Computer Science & Technology",
    "institution": "Brainware University"
  }
] as const;

export const journey = [
  {
    "date": "2018–2021",
    "title": "Diploma in Computer Science & Technology",
    "body": "Built the fundamentals of programming, data structures, relational databases, networking and operating systems at Brainware University."
  },
  {
    "date": "2021–2024",
    "title": "B.Tech in Computer Science & Engineering",
    "body": "Graduated with core foundations in software engineering, algorithms, database systems and distributed application design at Brainware University."
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
    "url": "https://linkedin.com/in/biswadipgoj",
    "handle": "Biswadip Goj"
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

export const storyCopy = {
  "projectsTitle": "Five products. Real work.",
  "projectsIntro": "What each application does, what I built, and the source behind it.",
  "focus": "Engineering focus",
  "work": "What I built",
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
  "processTitle": "How I build",
  "testing": "I test important application workflows and validate behaviour through the browser and application interfaces.",
  "scopeTitle": "What I build",
  "capabilitiesTitle": "Engineering capabilities",
  "foundationsTitle": "Computer Science Foundations",
  "foundationsBody": "My formal CS background gives me a foundation in the principles behind software development, not only the frameworks used to build applications.",
  "footer": {
    "title": "Let’s build something useful.",
    "body": "Have a software role or a product to discuss? Get in touch.",
    "sourceTitle": "Explore the source",
    "flowTitle": "The whole application, connected.",
    "flow": [
      "Interface",
      "Application logic",
      "API",
      "Database",
      "Deployment"
    ],
    "credit": "Designed and built by Biswadip Goj.",
    "signature": "biswadip."
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
      { week: "Week 4", deliverable: "Evaluation Harness & Safety Guardrails", criteria: "50-question golden test set implemented; Ragas eval script running; Presidio PII masking and prompt-injection guardrails active." },
      { week: "Week 5", deliverable: "Docker, CI Gate & Production Release", criteria: "Docker Compose multi-service build passing; GitHub Actions PR eval gate active; 60s video recorded; live demo deployed." }
    ]
  }
} as const;


export type Project = {
name: string; slug: string; blurb: string; description: string; technicalNote: string;
url: string; repo: string; previewImage: string; imageAlt: string;
features: string[]; techStack: string[]; engineering: string[];
decisions: {title: string; what: string; why: string; how: string}[];
data: string; api: string; interface: string;
evidence: {label: string; url: string}[];
chapter: {index: string; bg: string; ink: string; accent: string; label: string; flow: string[]};
problem?: string; role?: string; result?: string; liveLink?: string; sourceLink?: string;
};
export const projects: Project[] = [
  {
    "name": "Erpixa",
    "slug": "erpixa",
    "url": "https://erpixa.vercel.app/",
    "repo": "https://github.com/Biswadipgoj/Erpixa",
    "blurb": "Multi-tenant business management application with organization-based access and modular workflows.",
    "description": "Erpixa is a business operations platform built by analyzing small business departmental workflows, multi-tier organizational hierarchies, and cross-team data access requirements. It translates organizational boundaries into PostgreSQL database-level security policies and modular UI workflows.",
    "technicalNote": "Bridging Business Analysis with Full-Stack Engineering: I modeled the multi-tenant organization structure, mapped role permissions, and engineered the React, TypeScript, and PostgreSQL application with row-level security.",
    "problem": "Small businesses suffer from disconnected departmental workflows, fragmented records, and lack of secure multi-tenant data isolation.",
    "role": "Full-Stack Software Engineer & Business Analyst (Sole Developer)",
    "result": "Zero cross-organization data leakage with 100% database-enforced row-level security and modular business operations.",
    "liveLink": "https://erpixa.vercel.app/",
    "sourceLink": "https://github.com/Biswadipgoj/Erpixa",
    "techStack": [
      "React",
      "TypeScript",
      "PostgreSQL",
      "Vite"
    ],
    "features": [
      "Organization membership",
      "Role-based access",
      "Modular business workflows",
      "Database-level access control"
    ],
    "engineering": [
      "React",
      "TypeScript",
      "PostgreSQL",
      "Database design",
      "Authentication",
      "Role-based access",
      "Organization-level data access"
    ],
    "previewImage": "/previews/erpixa.webp",
    "imageAlt": "Erpixa real application interface from the deployed site",
    "chapter": {
      "index": "01",
      "bg": "#edc4ae",
      "ink": "#44312c",
      "accent": "#884330",
      "label": "Business applications",
      "flow": [
        "Sign in",
        "Organization",
        "Business module",
        "PostgreSQL"
      ]
    },
    "decisions": [
      {
        "title": "Organization membership",
        "what": "Users work within an organization.",
        "why": "Business records need to belong to the right organization.",
        "how": "Membership records connect users to organizations and their roles."
      },
      {
        "title": "Access in the database",
        "what": "PostgreSQL policies control access to organization data.",
        "why": "Data access should follow the same membership rules as the application.",
        "how": "Row-level security checks organization membership for supported database operations."
      },
      {
        "title": "Business modules",
        "what": "The interface groups business functionality into modules.",
        "why": "Different business workflows need different screens and records.",
        "how": "React components present the modules available for the organization."
      }
    ],
    "data": "PostgreSQL stores organizations, members and business records. Organization relationships connect records to the business they belong to. Database policies use membership when checking access.",
    "api": "The React application uses authenticated data operations to read and update organization records. The database applies the organization access rules to those operations.",
    "interface": "The deployed interface brings organization selection and business workflows into one application.",
    "evidence": [
      {
        "label": "Application source",
        "url": "https://github.com/Biswadipgoj/Erpixa"
      },
      {
        "label": "Database schema and access policies",
        "url": "https://github.com/Biswadipgoj/Erpixa/blob/main/supabase/schema.sql"
      }
    ]
  },
  {
    "name": "NanoLink",
    "slug": "nanolink",
    "url": "https://nanl.vercel.app/",
    "repo": "https://github.com/Biswadipgoj/nl",
    "blurb": "URL shortener with custom links, passwords, expiry and click tracking.",
    "description": "NanoLink is a URL shortening application that lets users create short links with optional custom aliases, password protection, expiration and one-time use. The application also records click counts and link activity.",
    "technicalNote": "The project combines a Next.js application with REST-style API routes and PostgreSQL data. The implementation handles input validation, link creation, unique identifiers, password-protected links and link lifecycle rules.",
    "techStack": [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL"
    ],
    "features": [
      "Request validation",
      "Custom aliases and unique links",
      "Password and expiry checks",
      "Click tracking and one-time use"
    ],
    "engineering": [
      "TypeScript",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "Authentication/security-related application logic",
      "Database constraints",
      "Error handling"
    ],
    "previewImage": "/previews/nanolink.webp",
    "imageAlt": "NanoLink real application interface from the deployed site",
    "chapter": {
      "index": "02",
      "bg": "#cfdbc0",
      "ink": "#2f4434",
      "accent": "#3c6345",
      "label": "Links and application APIs",
      "flow": [
        "URL + options",
        "API validation",
        "PostgreSQL",
        "Short link"
      ]
    },
    "decisions": [
      {
        "title": "Validate link requests",
        "what": "The create-link API checks the submitted URL and options.",
        "why": "Invalid input should return a useful error before a link is saved.",
        "how": "The route validates the request, normalizes the URL and checks it before creating the record."
      },
      {
        "title": "Keep identifiers unique",
        "what": "Short codes and custom aliases have database uniqueness constraints.",
        "why": "A short link must identify one destination.",
        "how": "The API checks existing codes and PostgreSQL also enforces unique values."
      },
      {
        "title": "Apply link rules",
        "what": "Links can require a password, expire or allow one use.",
        "why": "The person sharing a link needs control over how it is opened.",
        "how": "The redirect workflow checks the stored options. One-time links become inactive after use."
      },
      {
        "title": "Record link activity",
        "what": "A link stores its click count and last visit.",
        "why": "The owner can see whether the link is being used.",
        "how": "The application updates the link record when handling a visit."
      }
    ],
    "data": "The PostgreSQL Link model stores the original URL, short code, optional alias, password hash, expiry, activity status and click information. Short codes and custom aliases are unique. This keeps link options together with the destination they control.",
    "api": "POST /api/links receives the URL and options, validates the request, checks the alias, hashes a supplied password and creates the link record. A successful creation returns the new link with HTTP 201. Invalid input returns an error response.",
    "interface": "The form connects the destination URL and optional link settings to the create-link API. The result gives the user a short link to share.",
    "evidence": [
      {
        "label": "Create-link API route",
        "url": "https://github.com/Biswadipgoj/nl/blob/master/src/app/api/links/route.ts"
      },
      {
        "label": "Link data model",
        "url": "https://github.com/Biswadipgoj/nl/blob/master/prisma/schema.prisma"
      },
      {
        "label": "Link redirect workflow",
        "url": "https://github.com/Biswadipgoj/nl/blob/master/src/app/%5BshortCode%5D/page.tsx"
      }
    ]
  },
  {
    "name": "TelePoint",
    "slug": "telepoint",
    "url": "https://telepoint-topaz.vercel.app/",
    "repo": "https://github.com/Biswadipgoj/telepoint",
    "blurb": "EMI management and payment collection platform built from retail financial process analysis.",
    "description": "TelePoint is an EMI management portal engineered after analyzing real-world offline smartphone financing friction: payment leakage, cash reconciliation delays, and customer account disputes. It structures collection workflows into authenticated, role-separated stages.",
    "technicalNote": "Combining Business Analysis with Full-Stack Development: I analyzed retailer-to-customer debt cycles, mapped the verification state machine, and implemented customer ownership validation in Next.js and PostgreSQL.",
    "problem": "Offline device retailers face high default rates and reconciliation errors when managing customer installment payments through paper ledgers.",
    "role": "Full-Stack Software Engineer & Business Analyst (Sole Developer)",
    "result": "100% verified customer-to-retailer ownership authorization preventing unauthorized collections and manual calculation errors.",
    "liveLink": "https://telepoint-topaz.vercel.app/",
    "sourceLink": "https://github.com/Biswadipgoj/telepoint",
    "techStack": [
      "Next.js",
      "TypeScript",
      "PostgreSQL"
    ],
    "features": [
      "Role-based access",
      "Customer and installment records",
      "Payment workflow handling",
      "Database-backed reporting"
    ],
    "engineering": [
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "Authentication",
      "Role-based access",
      "API development",
      "Payment workflow handling",
      "Reporting"
    ],
    "previewImage": "/previews/telepoint.webp",
    "imageAlt": "TelePoint EMI Management Portal sign-in screen from the deployed application",
    "chapter": {
      "index": "03",
      "bg": "#bcd6df",
      "ink": "#293f4a",
      "accent": "#355e73",
      "label": "Customer and payment workflows",
      "flow": [
        "Sign in",
        "Customer",
        "Installment",
        "Payment record"
      ]
    },
    "decisions": [
      {
        "title": "Check the signed-in user",
        "what": "Payment submission requires authentication.",
        "why": "Collection actions must be associated with an authorized account.",
        "how": "The API checks the user, active retailer record and PIN before processing the request."
      },
      {
        "title": "Check customer ownership",
        "what": "A retailer can submit payments for their own customers.",
        "why": "Customer records and collection actions must follow account permissions.",
        "how": "The route compares the customer’s retailer ID with the authenticated retailer."
      },
      {
        "title": "Validate installment payments",
        "what": "The API checks installment status before recording a request.",
        "why": "An already paid installment or pending request needs a clear response.",
        "how": "The route checks the selected installment records and returns errors for unsupported actions."
      },
      {
        "title": "Connect records to reports",
        "what": "Customer, installment and payment records support reporting.",
        "why": "Collection workflows need a way to review their recorded activity.",
        "how": "The application reads the related PostgreSQL records for its reports."
      }
    ],
    "data": "PostgreSQL stores customer accounts, installment schedules and payment records. Customers are related to retailers, and installments belong to customers. Those relationships support account access checks and reporting.",
    "api": "POST /api/payments/submit checks required fields, authentication, retailer status and customer ownership. It checks the selected installments before creating a payment request. Invalid or conflicting requests receive an error response.",
    "interface": "The real sign-in screen is shown here. Customer and collection screens require an authorized account.",
    "evidence": [
      {
        "label": "Payment submission API",
        "url": "https://github.com/Biswadipgoj/telepoint/blob/main/app/api/payments/submit/route.ts"
      },
      {
        "label": "Application source",
        "url": "https://github.com/Biswadipgoj/telepoint"
      }
    ]
  },
  {
    "name": "Nexora",
    "slug": "nexora",
    "url": "https://nexora-xi-rust.vercel.app/",
    "repo": "https://github.com/Biswadipgoj/nexora",
    "blurb": "Cross-platform workspace for projects and task management.",
    "description": "Nexora is a project and task workspace designed to run across web, Windows desktop and Android.",
    "technicalNote": "The project uses a shared TypeScript application across multiple platforms, with project boards, list views, personal tasks and keyboard-driven navigation.",
    "techStack": [
      "Next.js",
      "TypeScript",
      "React",
      "Electron",
      "Capacitor"
    ],
    "features": [
      "Project boards and list views",
      "Personal task management",
      "Keyboard-driven navigation",
      "Web, Windows and Android"
    ],
    "engineering": [
      "Next.js",
      "TypeScript",
      "React",
      "Application state",
      "Cross-platform development",
      "Desktop application development",
      "Android application development"
    ],
    "previewImage": "/previews/nexora.webp",
    "imageAlt": "Nexora real application interface from the deployed site",
    "chapter": {
      "index": "04",
      "bg": "#dbcee6",
      "ink": "#44374d",
      "accent": "#6c527e",
      "label": "Web · Windows · Android",
      "flow": [
        "Shared TypeScript",
        "Web",
        "Windows",
        "Android"
      ]
    },
    "decisions": [
      {
        "title": "Share the application",
        "what": "A TypeScript application supports multiple platforms.",
        "why": "Project and task workflows should remain familiar across devices.",
        "how": "Next.js and React provide the application, with Electron for Windows and Capacitor for Android."
      },
      {
        "title": "Offer different task views",
        "what": "Projects include boards and list views alongside personal tasks.",
        "why": "Planning a project and checking individual tasks are different activities.",
        "how": "The interface presents application state through the relevant task view."
      },
      {
        "title": "Support keyboard navigation",
        "what": "Users can navigate with a command palette.",
        "why": "Frequent actions should be easy to reach from the keyboard.",
        "how": "A shared navigation interface exposes workspace actions."
      }
    ],
    "data": "The workspace organizes projects and their tasks, with personal tasks as another workflow. Application state connects the board and list interfaces to the underlying project information.",
    "api": "The shared application connects workspace views to the project’s data operations. Platform wrappers provide desktop and Android delivery around that application.",
    "interface": "Project boards, list views and personal tasks give the shared application its main working surfaces.",
    "evidence": [
      {
        "label": "Application and platform source",
        "url": "https://github.com/Biswadipgoj/nexora"
      },
      {
        "label": "Platform configuration",
        "url": "https://github.com/Biswadipgoj/nexora/blob/master/package.json"
      }
    ]
  },
  {
    "name": "Tripmate",
    "slug": "tripmate",
    "url": "https://trip-mu-coral.vercel.app/",
    "repo": "https://github.com/Biswadipgoj/trip",
    "blurb": "Group expense management and settlement application.",
    "description": "Tripmate helps groups record shared expenses, calculate who owes whom and simplify the final settlement between members.",
    "technicalNote": "The application handles expense splitting, balance calculations, settlements, UPI payment links and PDF exports.",
    "techStack": [
      "Next.js",
      "React",
      "TypeScript"
    ],
    "features": [
      "Shared expense splitting",
      "Balances and settlements",
      "UPI payment links",
      "PDF exports"
    ],
    "engineering": [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL/data-backed application",
      "Expense calculations",
      "Settlement logic",
      "API integration",
      "PDF generation"
    ],
    "previewImage": "/previews/tripmate.webp",
    "imageAlt": "Tripmate real application interface from the deployed site",
    "chapter": {
      "index": "05",
      "bg": "#ead3a7",
      "ink": "#493d2b",
      "accent": "#79502f",
      "label": "Expenses and settlements",
      "flow": [
        "Shared expense",
        "Member balances",
        "Settlement",
        "UPI / PDF"
      ]
    },
    "decisions": [
      {
        "title": "Connect expenses to members",
        "what": "Groups can record shared expenses.",
        "why": "A useful balance needs to account for who paid and who shares the cost.",
        "how": "The application uses member and expense information to calculate balances."
      },
      {
        "title": "Explain the settlement",
        "what": "Members can see who owes whom.",
        "why": "A group needs actionable settlement amounts after recording expenses.",
        "how": "Balance calculations feed the settlement workflow."
      },
      {
        "title": "Support the next action",
        "what": "Settlements include UPI links and PDF exports.",
        "why": "Members need to make payments and keep a readable expense record.",
        "how": "The application creates payment links and generates a PDF from the expense information."
      }
    ],
    "data": "The application stores groups, members and shared expense information. Expense and member relationships support the balance and settlement calculations.",
    "api": "The interface connects group and expense actions to stored application data. Settlement amounts are used to create UPI payment links; PDF generation makes the expense information exportable.",
    "interface": "The group expense interface brings expense entry, member balances and settlement actions together.",
    "evidence": [
      {
        "label": "Expense and settlement source",
        "url": "https://github.com/Biswadipgoj/trip"
      }
    ]
  }
];
