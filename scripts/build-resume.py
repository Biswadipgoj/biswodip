"""Generate the two-page résumé PDF from lib/data.ts."""
import json
from html import escape
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, PageBreak, HRFlowable, Table, TableStyle
from reportlab.platypus import Image as PdfImage
from pypdf import PdfReader
import fitz
from PIL import Image, ImageDraw

data = json.loads(Path('artifacts/resume/content.json').read_text(encoding='utf-8'))
person = data['personal']
socials = {s['label']: s['url'] for s in data['socials']}
repos = {p['slug']: p for p in data['projects']}

def safe(value):
    return escape(str(value)).replace('\u2013', '-').replace('\u2014', '-').replace('\u2019', "'")

def link(url, label):
    return f'<link href="{escape(url, quote=True)}" color="#0969da">{safe(label)}</link>'

def bare(url):
    return url.split('://', 1)[-1].rstrip('/')

def project_links(slug):
    # Repository and live URLs come from lib/data.ts; hand-typed copies had drifted to a 404 account.
    project = repos[slug]
    return f"{link(project['repo'], bare(project['repo']))} &middot; {link(project['url'], bare(project['url']))}"

def portrait(size_pt=66):
    """Circular head-and-shoulders crop of public/biswodip.png, antialiased by supersampling."""
    source = Image.open('public/biswodip.png').convert('RGB')
    w, h = source.size
    side = int(w * 0.78)
    left = (w - side) // 2
    top = int(h * 0.08)
    crop = source.crop((left, top, left + side, top + side)).resize((720, 720), Image.LANCZOS)
    scale = 4
    mask = Image.new('L', (720 * scale, 720 * scale), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, 720 * scale - 1, 720 * scale - 1), fill=255)
    mask = mask.resize((720, 720), Image.LANCZOS)
    avatar = Image.new('RGBA', (720, 720), (255, 255, 255, 0))
    avatar.paste(crop, (0, 0), mask)
    ring = Image.new('RGBA', (720 * scale, 720 * scale), (0, 0, 0, 0))
    ImageDraw.Draw(ring).ellipse((6, 6, 720 * scale - 7, 720 * scale - 7), outline=(148, 163, 184, 255), width=10)
    avatar = Image.alpha_composite(avatar, ring.resize((720, 720), Image.LANCZOS))
    path = Path('artifacts/resume/portrait.png')
    avatar.save(path)
    return PdfImage(str(path), width=size_pt, height=size_pt)

styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=18, leading=21, textColor=colors.HexColor('#0f172a'), spaceAfter=2),
    'role': ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=colors.HexColor('#1e293b'), spaceAfter=2),
    'tags': ParagraphStyle('tags', fontName='Helvetica', fontSize=8.5, leading=11, textColor=colors.HexColor('#475569'), spaceAfter=3),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=8, leading=10.5, textColor=colors.HexColor('#334155'), spaceAfter=4),
    'heading': ParagraphStyle('heading', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=colors.HexColor('#0f172a'), spaceBefore=5, spaceAfter=2),
    'item_title': ParagraphStyle('item_title', fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=colors.HexColor('#0f172a'), spaceAfter=1),
    'item_meta': ParagraphStyle('item_meta', fontName='Helvetica', fontSize=8, leading=10.5, textColor=colors.HexColor('#475569'), spaceAfter=2),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=colors.HexColor('#1e293b'), spaceAfter=4),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=8, leading=10.5, textColor=colors.HexColor('#1e293b'), leftIndent=10, firstLineIndent=-7, spaceAfter=1.8),
    'skill_line': ParagraphStyle('skill_line', fontName='Helvetica', fontSize=8, leading=10.5, textColor=colors.HexColor('#1e293b'), spaceAfter=1.5),
}

def p(text, style='body'):
    return Paragraph(text, styles[style])

def section_hr():
    return HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#94a3b8'), spaceBefore=2, spaceAfter=4)

story = []

# --- HEADER ---
# Text stays in its own column so parsers read name, role and contacts in order; the photo sits beside it.
contact_parts = [
    f"{safe(person['location'])}",
    f"{safe(person['phone'])}",
    link(f"mailto:{person['email']}", person['email']),
    link(socials['LinkedIn'], bare(socials['LinkedIn'])),
    link(socials['GitHub'], bare(socials['GitHub'])),
    link(person['canonicalUrl'], bare(person['canonicalUrl']))
]
header_text = [
    p(safe(person['name']).upper(), 'name'),
    p('Independent Software & Product Developer', 'role'),
    p('TypeScript &middot; Next.js &middot; PostgreSQL &middot; Supabase &middot; Row-Level Security &middot; Distributed Systems', 'tags'),
    p(' | '.join(contact_parts), 'contact'),
]
PHOTO = 66
FRAME = A4[0] - 72 - 12  # page minus margins minus the frame's own 6pt padding on each side
header = Table([[header_text, portrait(PHOTO)]], colWidths=[FRAME - PHOTO - 14, PHOTO + 14])
header.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 0),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
]))
story.append(header)
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#334155'), spaceBefore=2, spaceAfter=5))

# --- SUMMARY ---
story.append(p('SUMMARY', 'heading'))
story.append(section_hr())
summary_text = (
    "Computer Science graduate and full-stack software engineer with hands-on experience taking applications "
    "from ambiguous requirements to deployed, working systems. Comfortable translating business problems into technical "
    "workflows, integrating APIs and databases, debugging production issues, and iterating on real user feedback. Has delivered "
    "50+ projects and production builds — spanning multi-tenant SaaS, financial/payment workflows, and "
    "cross-platform apps — contributing across remote teams and independent client engagements while retaining full ownership of architecture, testing, and delivery."
)
story.append(p(safe(summary_text), 'body'))
story.append(Spacer(1, 3))

# --- SKILLS ---
story.append(p('SKILLS', 'heading'))
story.append(section_hr())

# Skill categories, matching the résumé the user supplied
ats_skills = [
    ("Programming", "TypeScript, JavaScript, Python, SQL, C#"),
    ("Software & Product", "Requirements Analysis, API Integration, REST APIs, Database Design, Debugging, Software Testing, Product Development, System Design"),
    ("Backend & Data", "Node.js, Next.js API Routes, PostgreSQL, Redis (Caching & Rate Limiting), Supabase, Prisma ORM, Row-Level Security (RLS), AWS S3"),
    ("Frontend & State", "React, Next.js, Tailwind CSS, Zustand, Material UI"),
    ("Validation & Auth", "Zod, React Hook Form, bcrypt, Supabase Auth"),
    ("Testing", "Vitest, Functional Testing, Regression Testing, Bug Diagnosis & Root-Cause Analysis"),
    ("DevOps / Deployment", "Git, GitHub, GitHub Actions (CI), Docker, Kubernetes, Linux (Ubuntu/Debian), Vercel"),
    ("Cross-Platform", "Electron (Windows), Capacitor (Android)")
]

for cat, tools in ats_skills:
    story.append(p(f"<b>{safe(cat)}</b> &mdash; {safe(tools)}", 'skill_line'))

story.append(Spacer(1, 4))

# --- EXPERIENCE ---
story.append(p('EXPERIENCE', 'heading'))
story.append(section_hr())

# Job 1: Independent Software Developer
exp_1 = [
    p("<b>Independent Software & Product Developer</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2024 &ndash; Present", 'item_title'),
    p("&bull; Translate ambiguous business requirements into working software across multi-tenant SaaS, financial/payment, and productivity platforms, owning each build from initial data model through deployment and iteration.", 'bullet'),
    p("&bull; Design relational data models and REST APIs (Node.js, Next.js, PostgreSQL/Supabase), enforcing per-tenant data isolation with Row-Level Security across multi-tenant systems.", 'bullet'),
    p("&bull; Diagnose and fix production defects &mdash; for example, rewriting a payment-approval route to eliminate intermittent JSON-parsing failures, and removing database triggers that could double-apply financial transactions.", 'bullet'),
    p("&bull; Write automated tests (Vitest) covering tenant isolation, access control, and core business logic to validate system behavior before shipping changes.", 'bullet'),
    p("&bull; Contract across multiple client companies and startups, engineering production web applications, API integrations, and database architectures.", 'bullet'),
    Spacer(1, 3)
]
story.extend(exp_1)

# Job 2: Logicrack
exp_2 = [
    p("<b>Software Engineering Trainee (Industrial Training)</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sep 2023 &ndash; Nov 2023", 'item_title'),
    p("Logicrack Infosystem Pvt. Ltd., Kolkata", 'item_meta'),
    p("&bull; Completed a 10-week certified training on ASP.NET Core 6.0 MVC; built \"Office CRM,\" an internal workflow and customer-management application, covering schema design, controller logic, and the interface.", 'bullet'),
    Spacer(1, 3)
]
story.extend(exp_2)

# Job 3: Webguru
exp_3 = [
    p("<b>Web Development Trainee</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2022", 'item_title'),
    p("Webguru Technology", 'item_meta'),
    p("&bull; First hands-on web development experience: client-server fundamentals, UI component integration, and responsive interface design.", 'bullet'),
    Spacer(1, 4)
]
story.extend(exp_3)

# --- PROJECTS: PAGE 1 FIRST PROJECT ---
story.append(p('PROJECTS', 'heading'))
story.append(section_hr())

# Project 1: TelePoint (starts on Page 1)
story.append(p("<b>TelePoint</b> &mdash; Role-based EMI (loan installment) portal for customer, retailer, and admin operations.", 'item_title'))
story.append(p("Next.js &middot; TypeScript &middot; Supabase (PostgreSQL) &middot; AWS S3 &middot; PDF/QR Generation", 'tags'))
story.append(p(project_links('telepoint'), 'contact'))
story.append(p("&bull; Maintain and extend an EMI portal with separate customer, retailer, and administrator dashboards, backed by Supabase (Auth + Postgres) and a direct pg client for lower-level database access.", 'bullet'))
story.append(p("&bull; Built payment receipt/report generation (PDF export via jsPDF), QR-code payment support, and analytics dashboards (Recharts) for tracking dues and collections.", 'bullet'))

# --- PAGE BREAK TO EXACT 2-PAGE SPREAD ---
story.append(PageBreak())

# Top of Page 2: TelePoint continuation
story.append(p("&bull; Added partial-payment tracking (a new PARTIALLY_PAID status) so EMI records correctly retain paid and remaining amounts instead of a simple paid/unpaid flag, and standardized currency formatting across the app.", 'bullet'))
story.append(p("&bull; Diagnosed and fixed a payment-approval API route that intermittently returned invalid JSON, and removed legacy database triggers that could double-apply payment effects.", 'bullet'))
story.append(p("&bull; Corrected payment-deletion logic so reversing an approved payment properly reverses its EMI, fine, and balance effects, and rebuilt the retailer-management UI for mobile with a card-based layout.", 'bullet'))
story.append(Spacer(1, 5))

# Project 2: Nexora
story.append(p("<b>Nexora</b> &mdash; Work/task management platform running from one codebase on web, Windows, and Android.", 'item_title'))
story.append(p("Next.js &middot; TypeScript &middot; React &middot; Electron &middot; Capacitor &middot; Supabase (PostgreSQL, RLS) &middot; Vitest", 'tags'))
story.append(p(project_links('nexora'), 'contact'))
story.append(p("&bull; Built a single Next.js codebase that ships as a responsive web app, a native Windows desktop app (Electron), and an Android app (Capacitor).", 'bullet'))
story.append(p("&bull; Implemented a multi-tenant workspace data model with PostgreSQL Row-Level Security, reaching full RLS coverage across all data-access paths.", 'bullet'))
story.append(p("&bull; Wrote 103 automated security tests (Vitest) verifying tenant isolation, resistance to insecure direct object reference (IDOR) access, and role-hierarchy enforcement.", 'bullet'))
story.append(p("&bull; Set up a cloud CI pipeline (GitHub Actions) to build the Android APK without a local Android Studio install, and documented the desktop/mobile build paths.", 'bullet'))
story.append(Spacer(1, 5))

# Project 3: TripMate / Tripmate
story.append(p("<b>TripMate (Tripmate)</b> &mdash; Group trip expense-splitting and settlement application with UPI payment collection.", 'item_title'))
story.append(p("Next.js &middot; TypeScript &middot; Supabase (PostgreSQL, RLS) &middot; Zustand", 'tags'))
story.append(p(project_links('tripmate'), 'contact'))
story.append(p("&bull; Implemented four expense-split types (equal, custom amount, percentage, quantity) plus independent per-room cost allocation for shared hotel stays.", 'bullet'))
story.append(p("&bull; Built a minimized-transaction settlement algorithm that nets group balances &mdash; including sponsorships, where one member covers another's share &mdash; down to the fewest necessary payments.", 'bullet'))
story.append(p("&bull; Integrated UPI payment collection with QR codes and deep links, and added PDF export of full trip expense and settlement reports.", 'bullet'))
story.append(p("&bull; Designed the Supabase/PostgreSQL schema with Row-Level Security policies, plus an offline localStorage mode so the app works fully without a backend connection.", 'bullet'))
story.append(Spacer(1, 5))

# Project 4: Erpixa
story.append(p("<b>Erpixa</b> &mdash; Modular ERP (CRM, sales, inventory, accounting, HR, manufacturing, helpdesk, marketing) for small and mid-sized businesses.", 'item_title'))
story.append(p("React &middot; TypeScript &middot; Vite &middot; Supabase (PostgreSQL, RLS) &middot; Zustand", 'tags'))
story.append(p(project_links('erpixa'), 'contact'))
story.append(p("&bull; Designed a multi-tenant data model where every record belongs to exactly one organization, enforced with PostgreSQL Row-Level Security so no tenant can read another's data.", 'bullet'))
story.append(p("&bull; Built an onboarding flow that activates only the modules relevant to a business's type &mdash; CRM, sales, inventory, accounting, HR, projects, manufacturing, helpdesk, and marketing &mdash; so different business types each get a workspace shaped for their workflow.", 'bullet'))
story.append(p("&bull; Implemented Google sign-in and Zustand state stores covering auth/organization, currency, UI, notifications, and core business data.", 'bullet'))
story.append(Spacer(1, 5))

# Project 5: NanoLink
story.append(p("<b>NanoLink</b> &mdash; Production-style URL shortener with password protection, expiry, and click tracking.", 'item_title'))
story.append(p("Next.js &middot; TypeScript &middot; Prisma &middot; PostgreSQL &middot; Supabase Auth", 'tags'))
story.append(p(project_links('nanolink'), 'contact'))
story.append(p("&bull; Built a URL shortener with custom short codes (nanoid) and QR-code generation for each link, validating and normalizing submitted URLs before creating the record.", 'bullet'))
story.append(p("&bull; Implemented bcrypt-hashed password protection and expiry dates on links, with click tracking and form validation (React Hook Form + Zod).", 'bullet'))
story.append(p("&bull; Used Prisma with a direct Postgres adapter alongside Supabase for authentication, structuring the schema through migrations.", 'bullet'))
story.append(Spacer(1, 4))

# Additional mention
story.append(p("<b>Additional:</b> delivered a fine-tuned customer-support LLM (Qwen2.5-3B-Instruct via QLoRA, served through FastAPI) for a client engagement &mdash; details at biswodip.in.", 'item_meta'))
story.append(Spacer(1, 5))

# --- EDUCATION ---
story.append(p('EDUCATION', 'heading'))
story.append(section_hr())

story.append(p("<b>B.Tech in Computer Science &amp; Engineering</b> &mdash; Brainware University, Kolkata &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2021 &ndash; 2024", 'bullet'))
story.append(p("<b>Diploma in Computer Science &amp; Engineering</b> &mdash; Brainware University, Kolkata &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2018 &ndash; 2021", 'bullet'))
story.append(p("<b>Secondary &amp; Higher Secondary Education</b> &mdash; Uluberia High School, West Bengal Board &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2011 &ndash; 2018", 'bullet'))

output = Path('public/Biswodip-Goj-Resume.pdf')
SimpleDocTemplate(
    str(output),
    pagesize=A4,
    leftMargin=36,
    rightMargin=36,
    topMargin=28,
    bottomMargin=26,
    title=f"{person['name']} - Resume",
    author=person['name']
).build(story)

reader = PdfReader(output)
text = '\n'.join(page.extract_text() or '' for page in reader.pages)
assert len(reader.pages) == 2, f'Expected two readable pages, got {len(reader.pages)}'
assert text.count('Brainware University, Kolkata') == 2
assert all(project['name'] in text for project in data['projects'])
assert person['email'] in text and 'www.linkedin.com/in/biswodipgoj' in text
assert 'Uluberia High School' in text

urls = [a.get_object().get('/A', {}).get('/URI', '') for page in reader.pages for a in page.get('/Annots', [])]
assert 'https://www.linkedin.com/in/biswodipgoj' in urls
assert socials['GitHub'] in urls, 'GitHub profile link must come from lib/data.ts'
assert all(project['repo'] in urls for project in data['projects']), 'Every repository link must come from lib/data.ts'
assert len(reader.pages[0].images) == 1, 'Page one carries the portrait'

Path('artifacts/resume/resume.txt').write_text(text, encoding='utf-8')
pdf = fitz.open(output)
for index, page in enumerate(pdf):
    page.get_pixmap(dpi=130).save(f'artifacts/resume/page-{index+1}.png')
Image.open('artifacts/resume/page-1.png').save('public/resume-preview.webp', quality=88)
print(f'Generated {len(reader.pages)} pages; {len(text)} selectable characters; {len(urls)} clickable links.')
