"""Generate a readable, single-column resume exclusively from lib/data.ts exports."""
import json
from html import escape
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, PageBreak
from pypdf import PdfReader
import fitz
from PIL import Image

data=json.loads(Path('artifacts/resume/content.json').read_text(encoding='utf-8'))
person=data['personal']
def safe(value):
    return escape(str(value)).replace('\u2013','-').replace('\u2014','-').replace('\u2019',"'")
def link(url,label):
    return '<link href="'+escape(url,quote=True)+'" color="#234c75">'+safe(label)+'</link>'
styles={key:ParagraphStyle(key,fontName='Helvetica-Bold' if key in ['name','heading','title'] else 'Helvetica',fontSize=size,leading=leading,textColor=colors.HexColor('#17232b'),spaceAfter=space) for key,size,leading,space in [('name',23,27,5),('heading',12,16,8),('title',10,14,4),('body',10,14,6),('small',9,12,5)]}
def p(text,style='body'):return Paragraph(text,styles[style])
story=[p(safe(person['name']),'name'),p(safe(person['role']),'title'),p(link('mailto:'+person['email'],person['email'])+' | '+safe(person['phone'])+'<br/>'+safe(person['location']),'small')]
story += [p(' | '.join([link(s['url'],s['url'].replace('https://','')) for s in data['socials'] if s['label']!='Email']),'small'),p(link(person['canonicalUrl'],person['canonicalUrl']),'small'),Spacer(1,8),p('PROFESSIONAL SUMMARY','heading'),p(safe(data['resumeCopy']['summary'])),Spacer(1,6),p('TECHNICAL SKILLS','heading')]
# Preserve the source categories; omit no supported stack entries and add no keywords.
for group in data['stack']:
    story.append(p('<b>'+safe(group['title'].title())+':</b> '+safe(', '.join(group['tools'])),'small'))
story += [Spacer(1,8),p('PROFESSIONAL EXPERIENCE','heading')]
for job in data['experience']:
    block=[p(safe(job['role']),'title'),p(safe(job['organization'])+' | '+safe(job['period']),'small')]
    for line in job['highlights']:
        if '60+' not in line: block.append(p('- '+safe(line),'small'))
    story.append(KeepTogether(block+[Spacer(1,8)]))
story += [PageBreak(),p('TECHNICAL PROJECTS','heading')]
for project in data['projects']:
    story.append(KeepTogether([p(safe(project['name']),'title'),p(safe(' / '.join(project['techStack'])),'small'),p(safe(project['blurb'])+' '+safe(project['decisions'][0]['how'])),p(link(project['repo'],'Source: '+project['repo'])+'<br/>'+link(project['url'],'Live: '+project['url']),'small'),Spacer(1,9)]))
story += [Spacer(1,8),p('EDUCATION','heading')]
for degree in data['education']:
    story += [p(safe(degree['title']),'title'),p(safe(degree['institution'])+' | '+safe(degree['date']),'small')]
output=Path('public/Biswodip-Goj-Resume.pdf')
SimpleDocTemplate(str(output),pagesize=A4,leftMargin=40,rightMargin=40,topMargin=34,bottomMargin=32,title=person['name']+' - Resume',author=person['name']).build(story)
reader=PdfReader(output)
text='\n'.join(page.extract_text() or '' for page in reader.pages)
assert len(reader.pages)==2, f'Expected two readable pages, got {len(reader.pages)}'
assert text.count('Brainware University, Kolkata')==2
assert all(project['name'] in text for project in data['projects'])
assert person['email'] in text and 'www.linkedin.com/in/biswodipgoj' in text
urls=[a.get_object().get('/A',{}).get('/URI','') for page in reader.pages for a in page.get('/Annots',[])]
assert 'https://www.linkedin.com/in/biswodipgoj' in urls
Path('artifacts/resume/resume.txt').write_text(text,encoding='utf-8')
pdf=fitz.open(output)
for index,page in enumerate(pdf):
    page.get_pixmap(dpi=120).save(f'artifacts/resume/page-{index+1}.png')
Image.open('artifacts/resume/page-1.png').save('public/resume-preview.webp',quality=85)
print(f'Generated {len(reader.pages)} pages; {len(text)} selectable characters; {len(urls)} clickable links.')
