"""Build an ATS-optimized, text-selectable, one-page resume from lib/data.ts via build-resume.mjs."""
import json
from html import escape
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether
from pypdf import PdfReader

data = json.loads(Path('artifacts/resume/content.json').read_text(encoding='utf-8'))
person = data['personal']
exp_list = data.get('experience', [])
school = data.get('schooling', {})

ink = colors.HexColor('#1b302a')
muted = colors.HexColor('#3a4f47')
rule_color = colors.HexColor('#9eb0a5')

styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=18, leading=20, textColor=ink),
    'role': ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=9.2, leading=11.5, textColor=ink),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=7.6, leading=10.2, textColor=muted),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=8.2, leading=10.5, textColor=ink, spaceBefore=6, spaceAfter=2),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=7.4, leading=9.8, textColor=ink),
    'project': ParagraphStyle('project', fontName='Helvetica-Bold', fontSize=7.8, leading=10.2, textColor=ink),
    'small': ParagraphStyle('small', fontName='Helvetica', fontSize=7.2, leading=9.4, textColor=muted),
}

def para(text, style='body'):
    return Paragraph(text, styles[style])

def safe(text):
    if not text:
        return ""
    return escape(str(text)).replace('\u2013', '-').replace('\u2014', '-').replace('\u2019', "'")

def link(url, label):
    return '<link href="' + escape(url, quote=True) + '">' + safe(label) + '</link>'

output = Path('public/Biswodip-Goj-Resume.pdf')
doc = SimpleDocTemplate(
    str(output),
    pagesize=A4,
    rightMargin=32,
    leftMargin=32,
    topMargin=22,
    bottomMargin=20,
    title=person['name'] + ' - Resume',
    author=person['name']
)

story = []

# Header: Name, Role, and ATS-parseable contact info
story.append(para(safe(person['name']).upper(), 'name'))
story.append(para(safe(person.get('role', 'Full-Stack Software Engineer')) + ' &amp; Business Analyst', 'role'))

contacts = [
    'Phone: ' + safe(person.get('phone', '+91 7003617074')),
    'Email: ' + link('mailto:' + person['email'], person['email']),
    'Location: ' + safe(person['location'])
]
story.append(para(' | '.join(contacts), 'contact'))

web_links = [
    link(data['socials'][1]['url'], 'GitHub: Biswadipgoj'),
    link(data['socials'][2]['url'], 'LinkedIn: biswadipgoj'),
    link(person.get('canonicalUrl', 'https://biswodip.in'), 'Portfolio: biswodip.in')
]
story.append(para(' | '.join(web_links), 'contact'))
story.append(Spacer(1, 3))
story.append(HRFlowable(width='100%', thickness=0.6, color=rule_color, spaceBefore=1, spaceAfter=2))

# 1. Professional Summary (ATS Standard)
story.append(para('PROFESSIONAL SUMMARY', 'section'))
summary_text = (
    safe(person['name']) + ' is a ' + safe(person.get('role', 'Full-Stack Software Engineer')) +
    ' &amp; Business Analyst with 60+ independently shipped products and systems. '
    'Proven track record spanning ASP.NET Core 6.0 MVC, React, Next.js, Node.js, and PostgreSQL. '
    'Combines requirements elicitation, workflow modeling, and domain schemas with deterministic REST APIs and production CI/CD delivery.'
)
story.append(para(summary_text, 'body'))

# 2. Technical Skills (Categorized for ATS Keyword Matching)
story.append(para('TECHNICAL SKILLS', 'section'))
skill_categories = [
    ('Languages', 'TypeScript, JavaScript, Python, C#, SQL, HTML5, CSS3'),
    ('Frameworks &amp; Runtimes', 'Next.js (App Router), React, Node.js, ASP.NET Core 6.0 MVC, Express'),
    ('Databases &amp; ORM', 'PostgreSQL, Prisma ORM, Row-Level Security (RLS), ACID Transactions, pgvector'),
    ('Business Analysis &amp; Architecture', 'Requirement Elicitation, Workflow Modeling, Acceptance Criteria, Domain Schemas, System Contracts'),
    ('Tools &amp; Delivery', 'Git, GitHub Actions, Docker, CI/CD, REST APIs, Zod, Vite, Electron, Capacitor')
]
for cat, tools in skill_categories:
    story.append(para('<b>' + cat + ':</b> ' + tools, 'body'))

# 3. Work Experience & Industrial Training (ATS Standard Heading)
story.append(para('WORK EXPERIENCE &amp; INDUSTRIAL TRAINING', 'section'))

# Remote Independent Work
indep_item = [
    para('<b>Independent Software Engineer &amp; Technical Consultant</b> <font name="Helvetica" size="7.2">| Remote (2023 - Present)</font>', 'project'),
    para('&bull; Architected and shipped <b>60+ software products and systems</b> independently across web and cross-platform targets.', 'small'),
    para('&bull; Implemented multi-tenant data isolation with PostgreSQL Row-Level Security and deterministic REST API boundaries via Zod.', 'small'),
    para('&bull; Developed custom algorithmic workflows including greedy debt-minimization graphs and role-based access controls.', 'small'),
    Spacer(1, 2)
]
story.append(KeepTogether(indep_item))

# Logicrack Infosystem
logicrack_item = [
    para('<b>Software Engineering Trainee (Industrial Training)</b> <font name="Helvetica" size="7.2">| Logicrack Infosystem Pvt. Ltd., Kolkata (Sep 2023 - Nov 2023)</font>', 'project'),
    para('&bull; Completed certified 10-week industrial training on <b>ASP.Net Core 6.0 with MVC framework</b> under HR T&amp;P Directorate.', 'small'),
    para('&bull; Engineered the <b>Office CRM</b> web application managing business workflows, customer entities, and operational data.', 'small'),
    para('&bull; Developed MVC controllers, relational data models, dependency injection services, and responsive client-side views.', 'small'),
    Spacer(1, 2)
]
story.append(KeepTogether(logicrack_item))

# Webguru Technology
webguru_item = [
    para('<b>Web Development Trainee (Field Training)</b> <font name="Helvetica" size="7.2">| Webguru Technology (2022)</font>', 'project'),
    para('&bull; Completed industrial and field training covering core web standards, client-server data flow, and modern responsive UI development.', 'small'),
    Spacer(1, 2)
]
story.append(KeepTogether(webguru_item))

# 4. Selected Projects
story.append(para('SELECTED PROJECTS', 'section'))
for project in data['projects']:
    proj_group = [
        para(link(project['repo'], project['name']) + ' <font name="Helvetica" size="7.2">| ' + safe(' / '.join(project['techStack'])) + '</font>', 'project'),
        para(safe(project['blurb']) + ' ' + safe(project['decisions'][0]['how']), 'small'),
        para(link(project['url'], 'Live application') + ' | ' + link(project['repo'], 'Source code'), 'small'),
        Spacer(1, 2)
    ]
    story.append(KeepTogether(proj_group))

# 5. Education
story.append(para('EDUCATION', 'section'))
for degree in data['education']:
    deg_group = [
        para('<b>' + safe(degree['title']) + '</b> <font name="Helvetica" size="7.2">| ' + safe(degree['institution']) + ' (' + safe(degree['date']) + ')</font>', 'body'),
    ]
    story.append(KeepTogether(deg_group))

# Add Uluberia High School
if school and school.get('institution'):
    story.append(para('<b>' + safe(school['detail']) + '</b> <font name="Helvetica" size="7.2">| ' + safe(school['institution']) + ', Uluberia</font>', 'body'))

doc.build(story)

reader = PdfReader(output)
text = '\n'.join(page.extract_text() or '' for page in reader.pages)

assert len(reader.pages) == 1, f"Resume must remain one page, got {len(reader.pages)}"
assert text.count('Brainware University') == 2
assert 'MAKAUT' not in text and 'WBSCTE' not in text
assert all(project['name'] in text for project in data['projects'])
assert person['email'] in text
assert '7003617074' in text, "Phone number must be present in resume text"
assert 'Logicrack' in text, "Logicrack must be present in resume text"
assert 'ASP.Net Core' in text, "ASP.Net Core must be present in resume text"
assert 'Office CRM' in text, "Office CRM must be present in resume text"
assert 'Webguru' in text, "Webguru must be present in resume text"
assert 'Uluberia High School' in text, "Uluberia High School must be present in resume text"
assert len(text) > 1800, f"Expected >1800 selectable characters, got {len(text)}"

print(f"Generated {output}: {len(reader.pages)} page, {len(text)} selectable characters")
