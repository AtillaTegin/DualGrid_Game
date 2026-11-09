from pathlib import Path
import json,re,html,math
from reportlab.pdfgen import canvas
from reportlab.platypus import BaseDocTemplate,PageTemplate,Frame,Paragraph,Spacer,PageBreak,KeepTogether,Table,TableStyle,Flowable
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

ROOT=Path(r'C:/Users/User/Documents/ChatGPT/Bloxorz New Mechanics')
TMP=ROOT/'tmp/pdfs'
D=json.loads((TMP/'modbook_data.json').read_text(encoding='utf-8'))
OUT=ROOT/'output/pdf/Dual Grid mod kitabxanası.pdf'
pdfmetrics.registerFont(TTFont('Segoe',r'C:/Windows/Fonts/segoeui.ttf'))
pdfmetrics.registerFont(TTFont('SegoeBold',r'C:/Windows/Fonts/seguisb.ttf'))
pdfmetrics.registerFont(TTFont('Georgia',r'C:/Windows/Fonts/georgia.ttf'))
pdfmetrics.registerFontFamily('Segoe',normal='Segoe',bold='SegoeBold',italic='Segoe',boldItalic='SegoeBold')
PAPER=colors.HexColor('#F7F5EE'); INK=colors.HexColor('#20343A'); TEAL=colors.HexColor('#147E82'); AMBER=colors.HexColor('#BA793C'); MUTED=colors.HexColor('#5B6C70'); LINE=colors.HexColor('#D6DEDA')
W,H=595.276,841.89
L,R,T,B=51,51,59,51
WIDTH=W-L-R
body=ParagraphStyle('body',fontName='Segoe',fontSize=11,leading=14.7,textColor=INK,spaceAfter=9,allowWidows=0,allowOrphans=0)
small=ParagraphStyle('small',parent=body,fontSize=9,leading=12,textColor=MUTED)
h1=ParagraphStyle('h1',fontName='SegoeBold',fontSize=22,leading=27,textColor=INK,spaceAfter=13,keepWithNext=True)
h2=ParagraphStyle('h2',fontName='SegoeBold',fontSize=13,leading=17,textColor=TEAL,spaceBefore=8,spaceAfter=8,keepWithNext=True)
eyebrow=ParagraphStyle('eyebrow',fontName='SegoeBold',fontSize=9,leading=12,textColor=AMBER,spaceAfter=7,keepWithNext=True)
caption=ParagraphStyle('caption',parent=small,fontSize=9,leading=12)

def markup(s):
    s=s.replace('\u00ad','')
    s=s.replace('<br/>','___BR___')
    s=html.escape(s,quote=False)
    s=s.replace('___BR___','<br/>')
    s=re.sub(r'\*\*([^*]+)\*\*',r'<b>\1</b>',s)
    # Clickable human titles remain readable, with URLs in source register.
    s=re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)',lambda m:f'<a href="{html.escape(m.group(2),quote=True)}" color="#147E82">{m.group(1)}</a>',s)
    return s

def P(s,style=body): return Paragraph(markup(s),style)
def paras(s,style=body): return [P(p,style) for p in s.split('\n\n') if p.strip()]

class Book(BaseDocTemplate):
    def __init__(self,*args,**kw):
        super().__init__(*args,**kw);self.sec='';self.serial=0;self.bookmarks=[]
    def afterFlowable(self,f):
        if isinstance(f,Paragraph) and f.style.name=='h1':
            txt=f.getPlainText(); self.sec=txt; self.serial+=1;k='chapter'+str(self.serial)
            self.canv.bookmarkPage(k);self.canv.addOutlineEntry(txt,k,0,False);self.bookmarks.append((txt,self.page))

def page_bg(canv,doc):
    canv.setFillColor(INK if doc.page==1 else PAPER);canv.rect(0,0,W,H,fill=1,stroke=0)
    if doc.page>1:
        canv.setStrokeColor(LINE);canv.setLineWidth(.5);canv.line(L,H-35,W-R,H-35);canv.line(L,35,W-R,35)
        canv.setFont('SegoeBold',8);canv.setFillColor(TEAL);canv.drawString(L,H-26,'DUAL GRID  /  MOD KİTABXANASI')
        canv.setFont('Segoe',8);canv.setFillColor(MUTED);canv.drawRightString(W-R,22,f'{doc.page:02d}')
        canv.drawString(L,22,'Konsept araşdırması • Oyun faylları dəyişdirilməyib')

class CoverArt(Flowable):
    def __init__(self): super().__init__();self.width=WIDTH;self.height=280
    def draw(self):
        c=self.canv
        def poly(pts,fill,stroke=None):
            p=c.beginPath();p.moveTo(*pts[0]);[p.lineTo(*q) for q in pts[1:]];p.close()
            c.setFillColor(colors.HexColor(fill));c.setStrokeColor(colors.HexColor(stroke or fill));c.drawPath(p,fill=1,stroke=1)
        def iso(x,z,y): return (240+(x-z)*37,65+(x+z)*21+y*40)
        for x in range(-2,3):
            for z in range(-2,3):
                if (x,z) in [(0,-2),(2,0)]: continue
                poly([iso(x,z,0),iso(x+1,z,0),iso(x+1,z+1,0),iso(x,z+1,0)],'#213A43','#38545A')
        def block(x,z,y,height,top,left,right):
            a,b,d,e=iso(x,z,y),iso(x+1,z,y),iso(x+1,z+1,y),iso(x,z+1,y)
            A,B,D,E=iso(x,z,y+height),iso(x+1,z,y+height),iso(x+1,z+1,y+height),iso(x,z+1,y+height)
            poly([a,b,B,A],right);poly([a,e,E,A],left);poly([A,B,D,E],top)
        block(-1,0,.04,2,'#75CED0','#197A80','#27585F')
        block(1,0,.04,1,'#E0AC67','#9B6339','#70513B')
        c.setStrokeColor(colors.HexColor('#DDA35F'));c.setLineWidth(2);c.line(*iso(0,1,.06),*iso(1,1,.06))
        c.setFont('SegoeBold',10);c.setFillColor(colors.HexColor('#DCE8E5'));c.drawCentredString(240,15,'30 alt-element  +  16 yeni ailə elementi')

def card(it):
    # Split marked rule labels into readable paragraphs, without bullet clutter.
    text=it['body']
    text=re.sub(r'\s+(\*\*(?:Məna|Qərar|Qərar/nümunə|Məna/nümunə|Dərs|İzahla öyrətmə|Vizual dərs|Sinerji|Risk/xərc|Qayda):\*\*)',r'\n\n\1',text)
    flow=[P(it['id']+'  '+it['title'],h2)]+paras(text)
    return KeepTogether(flow)

story=[]
coverbody=ParagraphStyle('coverbody',parent=body,textColor=colors.HexColor('#D9E4E0'))
coverline=ParagraphStyle('coverline',parent=h2,textColor=colors.HexColor('#78CBCD'))
story+=[Spacer(1,37),P('DİZAYN ARAŞDIRMASI  /  YALNIZ PDF',eyebrow),P('Dual Grid<br/>mod kitabxanası',ParagraphStyle('cover',fontName='SegoeBold',fontSize=39,leading=45,textColor=PAPER,spaceAfter=18)),P('Sənin altı ideyanı təhlil edən, genişləndirən və ayrıca yeni ailələrə açan konsept sənədi.',ParagraphStyle('deck',parent=coverbody,fontSize=15,leading=21)),CoverArt(),Spacer(1,15),P('6 ana mod • 46 təklif • 15 cüt • 8 resept',coverline),P('Faktlar, şəxsi dizayn qiymətləndirməsi və gələcək qayda təklifləri bir-birindən ayrılır. Bu sənəd implementasiya və ya təsdiqlənmiş səviyyə paketi deyil.',coverbody),Spacer(1,14),P('8 noyabr 2026  |  Azərbaycan dili  |  Konsept versiyası 1',ParagraphStyle('coversmall',parent=small,textColor=colors.HexColor('#B4C8C8'))),PageBreak()]
story += [P('Oxuma xəritəsi',h1),P(D['intro']),Spacer(1,10)]
toc=[('01','Baza və dizayn müqaviləsi'),('02','M1 Phantom Floor - 6 alt-element'),('03','M2 Reversing Controls - 4 alt-element'),('04','M3 Dinamik ölçü - 6 alt-element'),('05','M4 Kölgə klonu - 5 alt-element'),('06','M5 Divarlar - 5 alt-element'),('07','M6 Saxta final - 4 alt-element'),('08','N1-N4: bizim 4 yeni ailəmiz - 16 element'),('09','15 cüt uyğunluq və 8 resept'),('10','Hadisə sırası, H, undo və sınaq'),('11','Mənbələr və sübut sərhədi')]
for num,title in toc: story += [P(num+'  '+title,h2)]
story += [Spacer(1,12),P('Ana M ideyaları istifadəçinindir. Bütün M alt-elementləri, N ailələri, kombinasiyalar və prototip qaydaları bu araşdırmada təklif etdiyimiz genişləndirmələrdir.',body),PageBreak()]
story += [P('Baza və dizayn müqaviləsi',h1)]+paras(D['baseline'])+[P(D['facts'],small),PageBreak()]

for prefix in list(D['parents'])+list(D['newparents']):
    title,assessment=(D['parents']|D['newparents'])[prefix]
    ids=[x for x in D['order'] if x.startswith(prefix+'.')]
    for j in range(0,len(ids),2):
        if j==0:
            story += [P(('SƏNİN ANA İDEYAN' if prefix[0]=='M' else 'BİZİM ƏLAVƏ AİLƏMİZ')+'  /  '+prefix,eyebrow),P(title,h1),P(assessment)]
        else: story += [P(prefix+'  /  ALT-ELEMENTLƏR',eyebrow),P(title+' - davamı',h1)]
        for ident in ids[j:j+2]: story += [card(D['items'][ident]),Spacer(1,10)]
        story.append(PageBreak())

# Matrix as 15 readable mini-rows over two pages, instead of a tiny table.
for start,end in [(0,8),(8,15)]:
    story += [P('15 cüt: əlaqə və risk'+(' - davamı' if start else ''),h1)]
    if start==0: story += [P('Uyğun/Sına/Riskli playtest nəticəsi deyil. M4 burada növbəli kampaniya variantıdır; iki saniyəlik orijinal ayrıca profildir.',body)]
    for pair,rating,insight,bound in D['matrix'][start:end]:
        story += [KeepTogether([P(pair+'  /  '+rating,h2),P(insight+'. '+bound,body)])]
    story += [PageBreak()]

for j in range(0,8,2):
    story += [P('Konsept reseptlər'+(' - davamı' if j else ''),h1)]
    if j==0: story += [P('İlk altı resept iki sistemlidir. Son iki resept üçlüdür. Heç biri koordinat xəritəsi və tam həll ilə təsdiqlənməyib.',body)]
    for rec in D['recipes'][j:j+2]: story += [P(rec['id']+'  '+rec['title'],h2),P(rec['body']),Spacer(1,12)]
    story += [PageBreak()]

story += [P('Vahid hadisə sırası',h1)]+paras(D['contract'])+[PageBreak()]
story += [P('H, undo və sınaq müqaviləsi',h1)]+paras(D['testing'])+[PageBreak()]

for j in range(0,len(D['sources']),6):
    story += [P('Mənbələr və sübut sərhədi'+(' - davamı' if j else ''),h1)]
    if j==0: story += [P('Mənbəli faktlar arxa plan verir; 46 alt-elementin qaydası bizim təklifimizdir. Həllolunma, əyləncə, qədim mənşə və dünyada ilkinlik iddiası yoxdur. Lokal mənbə auditində mövcud testlər yenidən işə salınmayıb.',body)]
    for id,title,url,use in D['sources'][j:j+6]:
        link=html.escape(url,quote=True)
        if url.startswith('http'): linked=f'<a href="{link}" color="#147E82">{html.escape(url)}</a>'
        else: linked=html.escape(url)
        story += [P(id+'  '+title,h2),P(use,body),Paragraph(linked,small),Spacer(1,9)]
    if j+6<len(D['sources']): story.append(PageBreak())

doc=Book(str(OUT),pagesize=(W,H),leftMargin=L,rightMargin=R,topMargin=T,bottomMargin=B,title='Dual Grid mod kitabxanası',author='Dual Grid dizayn araşdırması',pageCompression=1)
frame=Frame(L,B,WIDTH,H-T-B,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
doc.addPageTemplates(PageTemplate(id='paper',frames=frame,onPage=page_bg))
doc.build(story)
reader=PdfReader(str(OUT));text='\n'.join(p.extract_text() or '' for p in reader.pages)
assert len(reader.pages)>20
assert all(ident in text for ident in D['order'])
assert '\u00ad' not in text
(TMP/'pdf_text.txt').write_text(text,encoding='utf-8')
(TMP/'page_index.json').write_text(json.dumps({'pages':len(reader.pages),'headings':doc.bookmarks,'chars_per_page':[len(p.extract_text() or '') for p in reader.pages]},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'pages':len(reader.pages),'items':len(D['items']),'bytes':OUT.stat().st_size},ensure_ascii=True))
