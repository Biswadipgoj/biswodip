"""Generate the one-page, ATS-safe résumé PDF from lib/data.ts.

ATS rules this file follows (and checks at the end):
- one column, no tables, no text inside images; icons are decorative and every value is real text
- the photo is drawn on the page outside the text flow, so it never breaks the reading order
- standard section headings (Professional Summary, Technical Skills, Professional Experience, Projects, Education)
- each role/project/degree line keeps title and dates on one baseline so parsers read them as one line
- standard embedded font (Liberation Sans, Arial metrics) with a Unicode map, plain bullets, contact details in the body (not a header/footer)
- consistent date format, both acronyms and full terms for key skills, PDF title/keywords metadata
"""
import json
import re
from html import escape
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, HRFlowable, Flowable
from pypdf import PdfReader
import fitz
from PIL import Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping

# Embedded Liberation Sans (SIL OFL, Arial-compatible metrics). Unlike the built-in Helvetica it carries a
# Unicode map, so every parser extracts bullets, dashes and ligature-free text exactly as printed.
FONTS = Path(__file__).parent / 'fonts'
for name, file in [('Sans', 'Regular'), ('Sans-Bold', 'Bold'), ('Sans-Italic', 'Italic'), ('Sans-BoldItalic', 'BoldItalic')]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS / f'LiberationSans-{file}.ttf')))
for bold, italic, face in [(0, 0, 'Sans'), (1, 0, 'Sans-Bold'), (0, 1, 'Sans-Italic'), (1, 1, 'Sans-BoldItalic')]:
    addMapping('Sans', bold, italic, face)

data = json.loads(Path('artifacts/resume/content.json').read_text(encoding='utf-8'))
person = data['personal']
socials = {s['label']: s['url'] for s in data['socials']}
repos = {p['slug']: p for p in data['projects']}

def safe(value):
    return escape(str(value)).replace('–', '-').replace('—', '-').replace('’', "'")

def link(url, label):
    return f'<link href="{escape(url, quote=True)}" color="#0957c3">{safe(label)}</link>'

def bare(url):
    return url.split('://', 1)[-1].rstrip('/')

ICONS = Path('artifacts/resume/icons')

def icon(name, size=8):
    return f'<img src="{ICONS / (name + ".png")}" width="{size}" height="{size}" valign="-1.5"/>'

def project_links(slug):
    # Repository and live URLs come from lib/data.ts; hand-typed copies had drifted to a 404 account.
    project = repos[slug]
    return (f"{icon('github', 7.4)} {link(project['repo'], bare(project['repo']))}"
            f"  {icon('website', 7.4)} {link(project['url'], bare(project['url']))}")

INK = colors.HexColor('#0f172a')
TEXT = colors.HexColor('#1f2937')
MUTED = colors.HexColor('#475569')
ACCENT = colors.HexColor('#0f5e6e')

styles = {
    'name': ParagraphStyle('name', fontName='Sans-Bold', fontSize=20, leading=23, textColor=INK),
    'role': ParagraphStyle('role', fontName='Sans-Bold', fontSize=10, leading=13, textColor=ACCENT, spaceAfter=1.5),
    'contact': ParagraphStyle('contact', fontName='Sans', fontSize=8, leading=11, textColor=MUTED),
    'heading': ParagraphStyle('heading', fontName='Sans-Bold', fontSize=9.4, leading=11.5, textColor=ACCENT, spaceBefore=8),
    'title': ParagraphStyle('title', fontName='Sans-Bold', fontSize=8.8, leading=11, textColor=INK),
    'date': ParagraphStyle('date', fontName='Sans-Bold', fontSize=8.8, leading=11, textColor=INK, alignment=2),
    'meta': ParagraphStyle('meta', fontName='Sans-Italic', fontSize=7.9, leading=10, textColor=MUTED),
    'meta_r': ParagraphStyle('meta_r', fontName='Sans', fontSize=7.9, leading=10, textColor=MUTED, alignment=2),
    'body': ParagraphStyle('body', fontName='Sans', fontSize=8.3, leading=11, textColor=TEXT),
    'bullet': ParagraphStyle('bullet', fontName='Sans', fontSize=8, leading=10.3, textColor=TEXT, leftIndent=9, firstLineIndent=-6, spaceBefore=1.2),
    'skill': ParagraphStyle('skill', fontName='Sans', fontSize=8, leading=11, textColor=TEXT, leftIndent=0),
}

def p(text, style='body'):
    return Paragraph(text, styles[style])

FRAME = A4[0] - 72 - 12  # page minus margins minus the frame's own 6pt padding on each side

class Line(Flowable):
    """Left and right text on one shared baseline (no table), so extraction yields a single line."""
    def __init__(self, left, right, lstyle='title', rstyle='date', right_width=150):
        super().__init__()
        self.left, self.right, self.rw = p(left, lstyle), p(right, rstyle), right_width
    def wrap(self, aw, ah):
        _, self.lh = self.left.wrap(aw - self.rw - 6, ah)
        _, self.rh = self.right.wrap(self.rw, ah)
        self.width, self.height = aw, max(self.lh, self.rh)
        return self.width, self.height
    def draw(self):
        self.left.drawOn(self.canv, 0, self.height - self.lh)
        self.right.drawOn(self.canv, self.width - self.rw, self.height - self.rh)

class DatedLine(Flowable):
    """Title and dates written in ONE text object on one baseline: every parser reads them as one line.

    left: list of (text, font) runs; right: plain text drawn flush right.
    """
    def __init__(self, left, right, size=8.8, color=INK, right_font='Sans-Bold', leading=11):
        super().__init__()
        self.left, self.right, self.size, self.color, self.rfont, self.leading = left, right, size, color, right_font, leading
    def wrap(self, aw, ah):
        self.width, self.height = aw, self.leading
        return self.width, self.height
    def draw(self):
        from reportlab.pdfbase.pdfmetrics import stringWidth
        c = self.canv
        base = self.leading - self.size * 1.02
        t = c.beginText(0, base)
        t.setFillColor(self.color)
        for run, font in self.left:
            t.setFont(font, self.size)
            t.textOut(run)
        t.setFont(self.rfont, self.size)
        t.setTextOrigin(self.width - stringWidth(self.right, self.rfont, self.size), base)
        t.textOut(self.right)
        c.drawText(t)

def heading(text):
    return [p(text.upper(), 'heading'),
            HRFlowable(width='100%', thickness=0.8, color=ACCENT, spaceBefore=1.5, spaceAfter=3)]

def bullets(items):
    return [p('&bull; ' + item, 'bullet') for item in items]

story = []

# --- PHOTO ---
# Drawn straight onto the page (top right), outside the text flow: parsers still read name, title and contacts
# first and in order, and the photo never sits inside a table cell or between words.
PHOTO = 62
TOP_MARGIN = 30

def portrait_png():
    """Circular head-and-shoulders crop of public/biswodip.png, antialiased by supersampling."""
    from PIL import ImageDraw
    source = Image.open('public/biswodip.png').convert('RGB')
    w, h = source.size
    side = int(w * 0.78)
    left, top = (w - side) // 2, int(h * 0.08)
    crop = source.crop((left, top, left + side, top + side)).resize((600, 600), Image.LANCZOS)
    mask = Image.new('L', (2400, 2400), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, 2399, 2399), fill=255)
    avatar = Image.new('RGBA', (600, 600), (255, 255, 255, 0))
    avatar.paste(crop, (0, 0), mask.resize((600, 600), Image.LANCZOS))
    path = Path('artifacts/resume/portrait.png')
    avatar.save(path)
    return str(path)

PORTRAIT = portrait_png()

def draw_photo(canvas, doc):
    canvas.saveState()
    x = A4[0] - doc.rightMargin - 6 - PHOTO
    y = A4[1] - TOP_MARGIN - 4 - PHOTO
    canvas.drawImage(PORTRAIT, x, y, PHOTO, PHOTO, mask='auto')
    canvas.setStrokeColor(colors.HexColor('#cbd5e1'))
    canvas.setLineWidth(0.8)
    canvas.circle(x + PHOTO / 2, y + PHOTO / 2, PHOTO / 2)
    canvas.restoreState()

# Header lines stop short of the photo.
for key in ('name', 'role', 'contact'):
    styles['head_' + key] = ParagraphStyle('head_' + key, parent=styles[key], rightIndent=PHOTO + 12)

# --- CONTACT ---
contact_one = ' &nbsp;|&nbsp; '.join([
    f"{icon('location')} {safe(person['location'])}",
    f"{icon('phone')} {link('tel:' + person['phone'].replace(' ', ''), person['phone'])}",
    f"{icon('email')} {link('mailto:' + person['email'], person['email'])}",
])
contact_two = ' &nbsp;|&nbsp; '.join([
    f"{icon('linkedin')} {link(socials['LinkedIn'], bare(socials['LinkedIn']).replace('www.', ''))}",
    f"{icon('github')} {link(socials['GitHub'], bare(socials['GitHub']))}",
    f"{icon('website')} Portfolio: {link(person['canonicalUrl'], bare(person['canonicalUrl']))}",
])
story += [
    p(safe(person['name']), 'head_name'),
    p('Full-Stack Software Engineer &nbsp;|&nbsp; React, Next.js, Node.js, TypeScript, PostgreSQL', 'head_role'),
    p(contact_one, 'head_contact'),
    p(contact_two, 'head_contact'),
    p('Open to remote &amp; relocation, available immediately', 'head_contact'),
]

# --- SUMMARY ---
story += heading('Professional Summary')
story.append(p(
    "Full-Stack Software Engineer / full-stack developer (B.Tech Computer Science, 2024) building production web applications with "
    "React, Next.js, Node.js, TypeScript and PostgreSQL. Owns delivery end to end: requirements, REST API and database design, secure "
    "multi-tenant access control, automated testing, CI/CD and deployment. 50+ projects shipped for client companies and remote teams, "
    "including a live fintech EMI/payment platform, a multi-tenant SaaS ERP and a fine-tuned LLM for a client support assistant.", 'body'))

# --- SKILLS ---
story += heading('Technical Skills')
skills = [
    ("Languages", "TypeScript, JavaScript (ES6+), SQL, Python, C#, HTML5, CSS3"),
    ("Frontend", "React, Next.js (App Router, Server Components), Tailwind CSS, Zustand, React Hook Form, responsive design, Electron"),
    ("Backend", "Node.js, REST APIs, Next.js Route Handlers, Zod validation, FastAPI, ASP.NET Core MVC, authentication and authorization"),
    ("Databases", "PostgreSQL, SQL, data modelling, Row-Level Security (RLS), migrations, triggers, indexing, Prisma ORM, Redis"),
    ("Cloud &amp; DevOps", "Docker, Kubernetes, CI/CD, GitHub Actions, Amazon Web Services (AWS S3), Vercel, Linux, Git, GitHub"),
    ("Testing &amp; Security", "Unit testing (Vitest), end-to-end testing (Playwright), role-based access control (RBAC), OAuth 2.0, multi-tenant isolation"),
    ("AI / ML", "Large language models (LLMs), fine-tuning (QLoRA), model serving (FastAPI), RAG, prompt engineering"),
    ("CS Fundamentals", "Data structures and algorithms, object-oriented programming (OOP), DBMS, operating systems, networks, system design"),
]
for label, values in skills:
    story.append(p(f'<b>{label}:</b> {values}', 'skill'))

# --- EXPERIENCE ---
story += heading('Professional Experience')
story.append(KeepTogether([
    DatedLine([('Full-Stack Software Engineer', 'Sans-Bold')], '2024 \u2013 Present'),
    DatedLine([('Freelance / Contract \u2014 client companies, startups and remote teams', 'Sans-Italic')], 'Remote', size=7.9, color=MUTED, right_font='Sans', leading=10),
    *bullets([
        "Delivered multi-tenant SaaS, fintech/payment and productivity apps end to end: requirements, data model, REST API, React UI, tests, release.",
        "Designed PostgreSQL schemas and Node.js/Next.js REST APIs with tenant isolation enforced in the database through Row-Level Security.",
        "Fixed production payment defects: an approval API returning invalid JSON intermittently and triggers that could double-apply payments.",
        "Fine-tuned Qwen2.5-3B-Instruct with QLoRA and served it through a FastAPI endpoint for a client's customer-support assistant.",
        "Protected releases with Vitest and Playwright suites in GitHub Actions CI/CD covering access control and core business rules.",
    ]),
]))
story.append(Spacer(1, 3))
story.append(KeepTogether([
    DatedLine([('Software Engineering Trainee (Industrial Training)', 'Sans-Bold')], 'Sep 2023 \u2013 Nov 2023'),
    DatedLine([('Logicrack Infosystem Pvt. Ltd.', 'Sans-Italic')], 'Kolkata, India', size=7.9, color=MUTED, right_font='Sans', leading=10),
    *bullets(["Built <i>Office CRM</i>, a customer and workflow management app, in C# / ASP.NET Core 6.0 MVC: relational schema, controllers, Razor views."]),
]))
story.append(Spacer(1, 3))
story.append(KeepTogether([
    DatedLine([('Web Development Trainee', 'Sans-Bold')], '2022'),
    DatedLine([('Webguru Technology \u2014 responsive web interfaces, client-server fundamentals, UI components', 'Sans-Italic')], 'Kolkata, India', size=7.9, color=MUTED, right_font='Sans', leading=10),
]))

# --- PROJECTS ---
story += heading('Projects')

def project(slug, title, stack, items):
    return KeepTogether([
        Line(f'{safe(repos[slug]["name"])} &mdash; <font name="Sans">{title}</font>', project_links(slug), 'title', 'meta_r', right_width=235),
        p(f'Tech: {stack}', 'meta'),
        *bullets(items),
        Spacer(1, 3),
    ])

story.append(project('telepoint', 'Fintech EMI and payment collection platform',
    'Next.js, React, TypeScript, PostgreSQL, AWS S3, jsPDF, Recharts', [
    "Built role-based portals for customers, retailers and admins; every write verifies record ownership server-side (403 on cross-account access).",
    "Modelled partial payments and made reversals undo EMI, fine and balance effects; added PDF receipts, QR payments and analytics.",
]))
story.append(project('nexora', 'Multi-tenant project and task management platform',
    'Next.js, React, TypeScript, PostgreSQL (RLS), Electron, Capacitor, Vitest, GitHub Actions', [
    "Shipped one codebase to web, Windows (Electron) and Android (Capacitor), with the Android APK built in CI.",
    "Enforced Row-Level Security on every data path, verified by 103 automated tests for tenant isolation, IDOR and role hierarchy.",
]))
story.append(project('erpixa', 'Modular SaaS ERP for small and mid-sized businesses',
    'React, TypeScript, Vite, PostgreSQL (RLS), Zustand, OAuth 2.0', [
    "Designed an organization-scoped data model enforced by Row-Level Security; onboarding enables only the modules needed (9 domains).",
]))
story.append(project('tripmate', 'Group expense splitting and settlement app',
    'Next.js, React, TypeScript, PostgreSQL (RLS), Zustand', [
    "Greedy settlement algorithm reduces group balances to the fewest payments; 4 split types, UPI QR, PDF reports, offline mode.",
]))
story.append(project('nanolink', 'URL shortener with protected and expiring links',
    'Next.js, TypeScript, Prisma, PostgreSQL, Zod, bcrypt', [
    "Built a Zod-validated REST API with unique aliases, bcrypt-protected and expiring links, click tracking and one-time links.",
]))

# --- EDUCATION ---
story += heading('Education')
for degree, place, years in [
    ('Bachelor of Technology (B.Tech), Computer Science and Engineering', 'Brainware University, Kolkata', '2021 \u2013 2024'),
    ('Diploma in Computer Science and Engineering', 'Brainware University, Kolkata', '2018 \u2013 2021'),
    ('Secondary and Higher Secondary', 'Uluberia High School, West Bengal Board', '2011 \u2013 2018'),
]:
    story.append(DatedLine([(degree, 'Sans-Bold'), (' \u2014 ' + place, 'Sans')], years))
    story.append(Spacer(1, 1.5))

output = Path('public/Biswodip-Goj-Resume.pdf')
SimpleDocTemplate(
    str(output),
    pagesize=A4,
    leftMargin=36,
    rightMargin=36,
    topMargin=TOP_MARGIN,
    bottomMargin=26,
    title=f"{person['name']} - Full-Stack Software Engineer - Resume",
    author=person['name'],
    subject='Resume: Full-Stack Software Engineer (React, Next.js, Node.js, TypeScript, PostgreSQL)',
    keywords='Full-Stack Software Engineer, Full-Stack Developer, React, Next.js, Node.js, TypeScript, JavaScript, PostgreSQL, REST API, Docker, CI/CD, AWS',
).build(story, onFirstPage=draw_photo)

# --- ATS CHECKS: read the PDF back the way a parser does ---
reader = PdfReader(output)
text = '\n'.join(page.extract_text() or '' for page in reader.pages)
lines = [line.strip() for line in text.splitlines() if line.strip()]
assert len(reader.pages) == 1, f'Expected one readable page, got {len(reader.pages)}'
assert 'supabase' not in text.lower(), 'Supabase is not listed as a skill'
assert 'supportpilot' not in text.lower(), 'Confidential client project must stay unnamed'
assert all(ord(ch) >= 32 or ch == '\n' for ch in text), 'No control characters in extracted text'
assert '\xa0' not in ''.join(l for l in lines if l.isupper()), 'Headings must use plain spaces'
for section in ['PROFESSIONAL SUMMARY', 'TECHNICAL SKILLS', 'PROFESSIONAL EXPERIENCE', 'PROJECTS', 'EDUCATION']:
    assert section in lines, f'Missing standard heading {section}'
assert lines[0] == person['name'], 'Name is the first line a parser reads'
assert re.search(r'[\w.+-]+@[\w-]+\.[\w.]+', text) and person['email'] in text
assert person['phone'] in text and 'linkedin.com/in/biswodipgoj' in text
assert any('Full-Stack Software Engineer' in l and 'Present' in l for l in lines), 'Job title and dates share a line'
assert any('Industrial Training' in l and 'Nov 2023' in l for l in lines), 'Trainee title and dates share a line'
assert text.count('Brainware University, Kolkata') == 2
assert all(project['name'] in text for project in data['projects'])
assert 'Uluberia High School' in text

urls = [a.get_object().get('/A', {}).get('/URI', '') for page in reader.pages for a in page.get('/Annots', [])]
assert 'https://www.linkedin.com/in/biswodipgoj' in urls
assert socials['GitHub'] in urls, 'GitHub profile link must come from lib/data.ts'
assert all(project['repo'] in urls for project in data['projects']), 'Every repository link must come from lib/data.ts'
assert 'tel:' + person['phone'].replace(' ', '') in urls, 'Phone number is tappable'
large = [img for img in reader.pages[0].images if img.image.size[0] > 200]
assert len(large) == 1, 'Exactly one large image: the portrait (everything else is a small icon)'
assert 'biswadip.in' in text and 'biswodip.in' not in text, 'Portfolio domain is biswadip.in'
assert 'https://biswadip.in' in urls, 'Portfolio link points to biswadip.in'
assert 'tripmate.boats' in text and 'https://tripmate.boats/' in urls, 'Tripmate links to tripmate.boats'
assert 'trip-mu-coral' not in text and not any('trip-mu-coral' in u for u in urls), 'Old Tripmate URL is gone'

Path('artifacts/resume/resume.txt').write_text(text, encoding='utf-8')
pdf = fitz.open(output)
for index, page in enumerate(pdf):
    page.get_pixmap(dpi=130).save(f'artifacts/resume/page-{index+1}.png')
Image.open('artifacts/resume/page-1.png').save('public/resume-preview.webp', quality=88)
print(f'Generated {len(reader.pages)} pages; {len(text)} selectable characters; {len(urls)} clickable links.')
