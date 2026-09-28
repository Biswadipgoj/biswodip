"""Generate the one-page résumé PDF from lib/data.ts."""
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

ICONS = Path('artifacts/resume/icons')

def icon(name, size=8.2):
    return f'<img src="{ICONS / (name + ".png")}" width="{size}" height="{size}" valign="-1.6"/>'

def project_links(slug):
    # Repository and live URLs come from lib/data.ts; hand-typed copies had drifted to a 404 account.
    project = repos[slug]
    return (f"{icon('github', 7.6)}&nbsp;{link(project['repo'], bare(project['repo']).split('/', 1)[1])}"
            f"&nbsp;&nbsp;&nbsp;{icon('website', 7.6)}&nbsp;{link(project['url'], bare(project['url']))}")

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

INK = colors.HexColor('#0f172a')
TEXT = colors.HexColor('#1f2937')
MUTED = colors.HexColor('#4b5563')
ACCENT = colors.HexColor('#0f5e6e')
RULE = colors.HexColor('#cbd5e1')

styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=21, leading=24, textColor=INK, spaceAfter=1),
    'role': ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=10.5, leading=13.5, textColor=ACCENT, spaceAfter=2),
    'pitch': ParagraphStyle('pitch', fontName='Helvetica', fontSize=8.6, leading=11.4, textColor=TEXT, spaceAfter=3),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=8, leading=10.8, textColor=MUTED),
    'heading': ParagraphStyle('heading', fontName='Helvetica-Bold', fontSize=9, leading=11, textColor=ACCENT, spaceBefore=6.5, spaceAfter=0),
    'title': ParagraphStyle('title', fontName='Helvetica-Bold', fontSize=8.8, leading=11, textColor=INK),
    'date': ParagraphStyle('date', fontName='Helvetica-Bold', fontSize=8.2, leading=11, textColor=INK, alignment=2),
    'meta': ParagraphStyle('meta', fontName='Helvetica-Oblique', fontSize=7.8, leading=9.8, textColor=MUTED),
    'meta_r': ParagraphStyle('meta_r', fontName='Helvetica', fontSize=7.6, leading=9.8, textColor=MUTED, alignment=2),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=8.2, leading=10.9, textColor=TEXT),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=7.9, leading=10.1, textColor=TEXT, leftIndent=9, firstLineIndent=-6, spaceBefore=0.8),
    'skill': ParagraphStyle('skill', fontName='Helvetica', fontSize=7.9, leading=10.1, textColor=TEXT),
}

def p(text, style='body'):
    return Paragraph(text, styles[style])

FRAME = A4[0] - 72 - 12  # page minus margins minus the frame's own 6pt padding on each side

def row(left, right, lstyle='title', rstyle='date', split=0.72):
    """Two-column row so titles stay left and dates/links align on the right edge."""
    t = Table([[p(left, lstyle), p(right, rstyle)]], colWidths=[FRAME * split, FRAME * (1 - split)])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'BOTTOM'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return t

def heading(text):
    return [p(text.upper().replace(' ', '&nbsp;&nbsp;'), 'heading'),
            HRFlowable(width='100%', thickness=0.8, color=ACCENT, spaceBefore=1.5, spaceAfter=3)]

def bullets(items):
    return [p('&bull;&nbsp;' + item, 'bullet') for item in items]

story = []

# --- HEADER ---
# Text stays in its own column so parsers read name, role and contacts in order; the photo sits beside it.
def contact(kind, content):
    return f'{icon(kind)}&nbsp;{content}'
line_one = [
    contact('location', safe(person['location'])),
    contact('phone', link('tel:' + person['phone'].replace(' ', ''), person['phone'])),
    contact('email', link(f"mailto:{person['email']}", person['email'])),
]
line_two = [
    contact('website', link(person['canonicalUrl'], bare(person['canonicalUrl']))),
    contact('linkedin', link(socials['LinkedIn'], bare(socials['LinkedIn']).replace('www.', ''))),
    contact('github', link(socials['GitHub'], bare(socials['GitHub']))),
]
header_text = [
    p(safe(person['name']), 'name'),
    p(safe(person['role']) + ' &nbsp;|&nbsp; TypeScript &middot; React &middot; Next.js &middot; Node.js &middot; PostgreSQL &middot; AI', 'role'),
    p('&nbsp;&nbsp;&nbsp;'.join(line_one), 'contact'),
    p('&nbsp;&nbsp;&nbsp;'.join(line_two), 'contact'),
]
PHOTO = 62
header = Table([[header_text, portrait(PHOTO)]], colWidths=[FRAME - PHOTO - 12, PHOTO + 12])
header.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
    ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
]))
story.append(header)

# --- SUMMARY ---
story += heading('Summary')
story.append(p(
    "Full-stack software engineer (B.Tech CSE, 2024) building production SaaS with TypeScript, React/Next.js, Node.js and PostgreSQL. "
    "Owns features end to end: requirements, API and schema design, secure multi-tenant data access, automated testing, CI/CD and deployment. "
    "50+ builds shipped for client companies and remote teams, including a live EMI/payment platform, a multi-tenant ERP, a cross-platform "
    "(web, Windows, Android) task app and LLM work (QLoRA fine-tuning, FastAPI model serving).", 'body'))

# --- SKILLS ---
story += heading('Technical Skills')
skills = [
    ("Languages", "TypeScript, JavaScript, SQL, Python, C#"),
    ("Frontend", "React, Next.js (App Router, Server Components), Tailwind CSS, Zustand, React Hook Form, Electron, Capacitor"),
    ("Backend &amp; APIs", "Node.js, Next.js Route Handlers, RESTful API design, Zod schema validation, FastAPI, ASP.NET Core MVC"),
    ("Databases", "PostgreSQL (data modelling, Row-Level Security, migrations, triggers, indexing), Prisma ORM, Redis"),
    ("Cloud &amp; DevOps", "Docker, Kubernetes, GitHub Actions CI/CD, Vercel, AWS S3, Linux, Git"),
    ("AI / LLM", "LLM fine-tuning (QLoRA), model serving with FastAPI, retrieval-augmented generation (RAG) design, prompt engineering"),
    ("Security &amp; Testing", "Multi-tenant isolation, RBAC, OAuth 2.0 (Google), bcrypt; Vitest unit/security tests, Playwright end-to-end tests"),
    ("Engineering", "System design, requirements analysis, debugging &amp; root-cause analysis, technical documentation"),
]
grid = Table([[p(f'<b>{k}</b>', 'skill'), p(v, 'skill')] for k, v in skills], colWidths=[84, FRAME - 84])
grid.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 0.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 0.5),
]))
story.append(grid)

# --- EXPERIENCE ---
story += heading('Experience')
story.append(KeepTogether([
    row('Full-Stack Software Engineer &mdash; Freelance &amp; Contract', '2024 &ndash; Present'),
    row('Client companies, startups and remote teams', 'Remote', 'meta', 'meta_r'),
    *bullets([
        "Deliver multi-tenant SaaS, fintech/payment and productivity products end to end: requirements, data model, API, UI, tests and release.",
        "Design PostgreSQL schemas and REST APIs on Node.js/Next.js with tenant isolation enforced in the database through Row-Level Security.",
        "Fixed production payment defects: an approval endpoint that intermittently returned invalid JSON and triggers that could double-apply payments.",
        "Fine-tuned Qwen2.5-3B-Instruct with QLoRA and served it through a FastAPI endpoint for a client's customer-support assistant.",
        "Ship behind automated checks: Vitest and Playwright suites in GitHub Actions CI covering access control and core business rules.",
    ]),
]))
story.append(Spacer(1, 3))
story.append(KeepTogether([
    row('Software Engineering Trainee (Industrial Training)', 'Sep 2023 &ndash; Nov 2023'),
    row('Logicrack Infosystem Pvt. Ltd.', 'Kolkata', 'meta', 'meta_r'),
    *bullets(["Built <i>Office CRM</i> in ASP.NET Core 6.0 MVC during a 10-week certified programme: relational schema, controllers and Razor views."]),
]))
story.append(Spacer(1, 3))
story.append(KeepTogether([
    row('Web Development Trainee', '2022'),
    row('Webguru Technology &mdash; responsive interfaces, client-server fundamentals, UI component integration', 'Kolkata', 'meta', 'meta_r', split=0.85),
]))

# --- PROJECTS ---
story += heading('Selected Projects')

def project(slug, title, stack, items):
    return KeepTogether([
        row(f'<b>{safe(repos[slug]["name"])}</b> &mdash; <font name="Helvetica">{title}</font>', project_links(slug), 'title', 'meta_r', split=0.55),
        p(stack, 'meta'),
        *bullets(items),
        Spacer(1, 3),
    ])

story.append(project('telepoint', 'Fintech EMI and payment collection platform',
    'Next.js &middot; TypeScript &middot; PostgreSQL &middot; AWS S3 &middot; jsPDF &middot; Recharts', [
    "Role-based portals for customers, retailers and admins; every write verifies record ownership server-side (403 on cross-account access).",
    "Modelled partial payments and made payment reversal undo EMI, fine and balance effects; built PDF receipts, QR payments and analytics.",
]))
story.append(project('nexora', 'Multi-tenant project and task management',
    'Next.js &middot; TypeScript &middot; PostgreSQL (RLS) &middot; Electron &middot; Capacitor &middot; Vitest &middot; GitHub Actions', [
    "One codebase shipped to web, Windows (Electron) and Android (Capacitor); CI builds the Android APK.",
    "Row-Level Security on every data path, verified by 103 automated tests for tenant isolation, IDOR and role hierarchy.",
]))
story.append(project('erpixa', 'Modular ERP for small and mid-sized businesses',
    'React &middot; TypeScript &middot; Vite &middot; PostgreSQL (RLS) &middot; Zustand &middot; OAuth', [
    "Organization-scoped data enforced by Row-Level Security; onboarding switches on only the modules a business needs (9 domains).",
]))
story.append(project('tripmate', 'Group expense splitting and settlement',
    'Next.js &middot; TypeScript &middot; PostgreSQL (RLS) &middot; Zustand', [
    "Greedy settlement algorithm nets group balances into the fewest payments; 4 split types, UPI QR payments, PDF reports, offline mode.",
]))
story.append(project('nanolink', 'URL shortener with protected and expiring links',
    'Next.js &middot; TypeScript &middot; Prisma &middot; PostgreSQL &middot; Zod &middot; bcrypt', [
    "Zod-validated REST API with unique aliases, bcrypt-protected and expiring links, click tracking and one-time links.",
]))
# --- EDUCATION ---
story += heading('Education')
for degree, place, years in [
    ('B.Tech, Computer Science &amp; Engineering', 'Brainware University, Kolkata', '2021 &ndash; 2024'),
    ('Diploma, Computer Science &amp; Engineering', 'Brainware University, Kolkata', '2018 &ndash; 2021'),
    ('Secondary &amp; Higher Secondary', 'Uluberia High School, West Bengal Board', '2011 &ndash; 2018'),
]:
    story.append(row(f'<b>{degree}</b> &mdash; <font name="Helvetica">{place}</font>', years, 'title', 'date', split=0.8))
    story.append(Spacer(1, 1))

output = Path('public/Biswodip-Goj-Resume.pdf')
SimpleDocTemplate(
    str(output),
    pagesize=A4,
    leftMargin=36,
    rightMargin=36,
    topMargin=28,
    bottomMargin=24,
    title=f"{person['name']} - Resume",
    author=person['name']
).build(story)

reader = PdfReader(output)
text = '\n'.join(page.extract_text() or '' for page in reader.pages)
assert len(reader.pages) == 1, f'Expected one readable page, got {len(reader.pages)}'
assert 'supabase' not in text.lower(), 'Supabase is not listed as a skill'
assert 'supportpilot' not in text.lower(), 'Confidential client project must stay unnamed'
assert text.count('Brainware University, Kolkata') == 2
assert all(project['name'] in text for project in data['projects'])
assert person['email'] in text and 'linkedin.com/in/biswodipgoj' in text
assert 'Uluberia High School' in text

urls = [a.get_object().get('/A', {}).get('/URI', '') for page in reader.pages for a in page.get('/Annots', [])]
assert 'https://www.linkedin.com/in/biswodipgoj' in urls
assert socials['GitHub'] in urls, 'GitHub profile link must come from lib/data.ts'
assert all(project['repo'] in urls for project in data['projects']), 'Every repository link must come from lib/data.ts'
assert len(reader.pages[0].images) >= 7, 'Page one carries the portrait and contact icons'
assert 'tel:' + person['phone'].replace(' ', '') in urls, 'Phone number is tappable'

Path('artifacts/resume/resume.txt').write_text(text, encoding='utf-8')
pdf = fitz.open(output)
for index, page in enumerate(pdf):
    page.get_pixmap(dpi=130).save(f'artifacts/resume/page-{index+1}.png')
Image.open('artifacts/resume/page-1.png').save('public/resume-preview.webp', quality=88)
print(f'Generated {len(reader.pages)} pages; {len(text)} selectable characters; {len(urls)} clickable links.')
