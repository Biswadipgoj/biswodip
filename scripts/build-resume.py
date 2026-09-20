"""Build a text-selectable, one-page resume from lib/data.ts via build-resume.mjs."""
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
ink = colors.HexColor('#243c36')
muted = colors.HexColor('#42574d')
styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=25, leading=28, textColor=ink),
    'role': ParagraphStyle('role', fontName='Helvetica', fontSize=11, leading=16, textColor=ink),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=8, leading=12, textColor=muted),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=9, leading=13, textColor=ink, spaceBefore=13, spaceAfter=5),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=8.6, leading=12.5, textColor=ink),
    'project': ParagraphStyle('project', fontName='Helvetica-Bold', fontSize=9.5, leading=14, textColor=ink),
    'small': ParagraphStyle('small', fontName='Helvetica', fontSize=8, leading=11.5, textColor=muted),
}
def para(text, style='body'):
    return Paragraph(text, styles[style])
def safe(text):
    return escape(text).replace('\u2013', '-').replace('\u2014', '-').replace('\u2019', "'")
def link(url, label):
    return '<link href="' + escape(url, quote=True) + '">' + safe(label) + '</link>'

output = Path('public/Biswodip-Goj-Resume.pdf')
doc = SimpleDocTemplate(str(output), pagesize=A4, rightMargin=40, leftMargin=40, topMargin=32, bottomMargin=30, title=person['name']+' - Resume', author=person['name'])
story = [para(safe(person['name']), 'name'), para(safe(person['role']), 'role')]
contacts = [link('mailto:'+person['email'],person['email']), safe(person['location'])]
story += [para(' | '.join(contacts), 'contact')]
story += [para(link(data['socials'][1]['url'],'GitHub: Biswadipgoj')+' | '+link(data['socials'][2]['url'],'LinkedIn: biswadipgoj')+' | '+link('https://biswodip.in','biswodip.in'),'contact')]
story += [Spacer(1,9),HRFlowable(width='100%',thickness=.6,color=colors.HexColor('#9eafa3'))]
story += [para('PROFILE','section'),para(safe(person['tagline'])+' Computer science graduate with independently built projects spanning business applications, URL shortening, payment workflows, collaboration and shared expenses.')]
story += [para('TECHNICAL SKILLS','section')]
for category in data['stack'][:5]:
    story.append(para('<b>'+safe(category['title'])+':</b> '+safe(', '.join(category['tools']))))
story += [para('SELECTED PROJECTS','section')]
for project in data['projects']:
    group = [para(link(project['repo'],project['name'])+' <font name="Helvetica" size="8"> | '+safe(' / '.join(project['techStack']))+'</font>','project')]
    group += [para(safe(project['blurb'])),para(safe(project['decisions'][0]['how']), 'small')]
    group += [para(link(project['url'],'Live application')+' | '+link(project['repo'],'Source code'),'small'),Spacer(1,7)]
    story.append(KeepTogether(group))
story += [para('EDUCATION','section')]
for degree in data['education']:
    story.append(KeepTogether([para('<b>'+safe(degree['title'])+'</b>'),para(safe(degree['institution'])+' | '+safe(degree['date']),'small'),Spacer(1,6)]))
doc.build(story)
reader=PdfReader(output)
text='\n'.join(page.extract_text() or '' for page in reader.pages)
assert len(reader.pages)==1, 'Resume must remain one page'
assert text.count('Brainware University')==2
assert 'MAKAUT' not in text and 'WBSCTE' not in text
assert all(project['name'] in text for project in data['projects'])
assert person['email'] in text and len(text)>1500
print(f'Generated {output}: {len(reader.pages)} page, {len(text)} selectable characters')
