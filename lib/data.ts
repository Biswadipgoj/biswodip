/** Public content: September 2026 specification. Project evidence is linked below. */

export const personal = {
  "name": "Biswodip Goj",
  "firstName": "Biswodip",
  "lastName": "Goj",
  "email": "biswadipgoj@gmail.com",
  "location": "Uluberia, West Bengal, India",
  "role": "Full-Stack Software Engineer",
  "tagline": "I build and ship web applications across the frontend, backend, APIs and databases.",
  "intro": "I\u2019m Biswodip Goj, a computer science graduate and full-stack software engineer who builds and ships web applications and software products. My work spans frontend development, backend logic, APIs, authentication, databases and deployment.",
  "about": [
    "I like working across the complete application rather than treating the frontend and backend as separate worlds. I start by understanding the workflow, define the data and application boundaries, then build the interface, backend logic and persistence around them.",
    "My work is mainly centered on TypeScript and JavaScript, with React, Next.js and Node.js for application development, PostgreSQL and MongoDB for data, and Python for selected projects and technical work.",
    "Building projects independently has also meant owning the less visible parts of development: handling edge cases, debugging failures, working with APIs, designing data structures, checking permissions, testing important flows and getting the finished software deployed.",
    "I care about software that is understandable, maintainable and useful to the people who actually use it."
  ],
  "ownership": "I work across the full application stack, from data and APIs to the interface users interact with.",
  "maturity": "I don't just build the interface. I work through the data, application logic, APIs and deployment needed to make the product work.",
  "resume": "/Biswodip-Goj-Resume.pdf"
} as const;

export const hero = {
  "eyebrow": "FULL-STACK SOFTWARE ENGINEER",
  "heading": "I build software from the interface to the database.",
  "body": "Web applications, APIs and data-driven products built with TypeScript, React, Next.js, Node.js, PostgreSQL and MongoDB.",
  "primary": "View my work",
  "secondary": "Contact me",
  "workflowTitle": "From a requirement to working software.",
  "workflow": [
    "Requirement",
    "Application Design",
    "Frontend + Backend",
    "Database",
    "Test + Debug",
    "Deploy"
  ]
} as const;

export const seo = {
  "title": "Biswodip Goj — Full-Stack Software Engineer",
  "description": "Biswodip Goj is a full-stack software engineer building web applications with TypeScript, React, Next.js, Node.js, PostgreSQL and MongoDB.",
  "socialTitle": "Biswodip Goj | Full-Stack Software Engineer",
  "socialDescription": "Web applications, APIs and software products built across frontend, backend and databases."
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
    "title": "Languages",
    "tools": [
      "TypeScript",
      "JavaScript",
      "Python",
      "SQL"
    ]
  },
  {
    "title": "Frontend",
    "tools": [
      "React",
      "Next.js",
      "HTML",
      "CSS"
    ]
  },
  {
    "title": "Backend",
    "tools": [
      "Node.js",
      "REST APIs",
      "Authentication",
      "API integration"
    ]
  },
  {
    "title": "Data",
    "tools": [
      "PostgreSQL",
      "MongoDB",
      "SQL",
      "Database design"
    ]
  },
  {
    "title": "Development",
    "tools": [
      "Git",
      "GitHub",
      "Postman",
      "Debugging"
    ]
  },
  {
    "title": "CS fundamentals",
    "tools": [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks"
    ]
  }
] as const;

export const primaryStack = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Python",
  "SQL",
  "Git",
  "GitHub",
  "REST APIs"
] as const;

export const stackCopy = {
  "title": "Technologies I work with",
  "intro": "My core stack is centered on modern web development, application APIs and database-backed software.",
  "notes": [
    {
      "name": "PostgreSQL",
      "body": "Relational database design and SQL."
    },
    {
      "name": "MongoDB",
      "body": "Document-oriented database development."
    },
    {
      "name": "Python",
      "body": "Automation, data work and selected software projects."
    },
    {
      "name": "Git · GitHub",
      "body": "Version control, project history, code organization and software delivery."
    },
    {
      "name": "Postman",
      "body": "API testing and debugging."
    }
  ]
} as const;

export const capabilities = [
  {
    "title": "Application Development",
    "body": "Building complete web applications with reusable interfaces, application logic, authentication and persistent data."
  },
  {
    "title": "API Development",
    "body": "Designing and consuming REST APIs, handling requests and responses, validation, authentication and third-party integrations."
  },
  {
    "title": "Database Development",
    "body": "Designing relational and document-oriented data models, writing queries and connecting application workflows to persistent data."
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
    "title": "Delivery",
    "body": "Working with Git and GitHub to develop, maintain and deploy software from an initial requirement to a usable application."
  }
] as const;

export const processStages = [
  {
    "title": "Understand",
    "body": "Understand what the software needs to do and how the user will use it.",
    "artifact": "Requirements",
    "question": "What does the user need to do?"
  },
  {
    "title": "Design",
    "body": "Choose the application structure, data model and API boundaries before implementation.",
    "artifact": "Application design",
    "question": "How do the interface, API and data fit together?"
  },
  {
    "title": "Build",
    "body": "Develop the interface, application logic, APIs and database integration.",
    "artifact": "Working software",
    "question": "What happens when the user takes an action?"
  },
  {
    "title": "Test",
    "body": "Exercise important flows, reproduce bugs and verify the finished behaviour.",
    "artifact": "Test + debug",
    "question": "Does the complete workflow behave as expected?"
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
  },
  {
    "title": "Keep the code understandable.",
    "line": "Prefer straightforward designs that another developer can read and change."
  }
] as const;

export const engineeringScope = [
  {
    "category": "Web Applications",
    "description": "Business software, product interfaces and data-driven web applications."
  },
  {
    "category": "Backend & APIs",
    "description": "Application logic, REST APIs, authentication and integrations."
  },
  {
    "category": "Data",
    "description": "Relational and document-based application data using PostgreSQL and MongoDB."
  },
  {
    "category": "Cross-Platform",
    "description": "Software delivered across web, desktop and Android where a project requires it."
  }
] as const;

export const education = [
  {
    "date": "2021–2024",
    "title": "B.Tech in Computer Science & Engineering",
    "institution": "MAKAUT"
  },
  {
    "date": "2018–2021",
    "title": "Diploma in Computer Science & Technology",
    "institution": "WBSCTE"
  }
] as const;

export const journey = [
  {
    "date": "2018–2021",
    "title": "Computer Science & Technology Diploma",
    "body": "Built the fundamentals of programming, databases, operating systems and computer networks."
  },
  {
    "date": "2021–2024",
    "title": "B.Tech in Computer Science & Engineering",
    "body": "Expanded those foundations through software engineering and computer-science coursework."
  },
  {
    "date": "2024",
    "title": "Independent Software Development",
    "body": "Started focusing heavily on building complete software products and web applications."
  },
  {
    "date": "Now",
    "title": "Full-Stack Software Development",
    "body": "Building applications across frontend, backend, APIs, databases and multiple platforms."
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
    "credit": "Designed and built by Biswodip Goj.",
    "signature": "biswodip."
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
};
export const projects: Project[] = [
  {
    "name": "Erpixa",
    "slug": "erpixa",
    "url": "https://erpixa.vercel.app/",
    "repo": "https://github.com/Biswadipgoj/Erpixa",
    "blurb": "Business management application with organization-based access and modular workflows.",
    "description": "Erpixa is a business management application built around organizations, users and configurable business workflows. It includes modules for areas such as customer management and operations, with database-level access control for organization data.",
    "technicalNote": "A React and TypeScript application backed by PostgreSQL, with authentication, organization membership and modular business functionality.",
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
    "blurb": "EMI management and payment collection platform.",
    "description": "TelePoint is an EMI management application for customer accounts, installments, payment records and reporting. The application provides different roles for managing customer and collection workflows.",
    "technicalNote": "I built the application around role-based access, customer records, installment workflows, payment handling and database-backed reporting.",
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
