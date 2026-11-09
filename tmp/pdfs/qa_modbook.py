from pathlib import Path
import pypdfium2 as pdfium
from PIL import Image,ImageOps,ImageDraw
import json
ROOT=Path(r'C:/Users/User/Documents/ChatGPT/Bloxorz New Mechanics')
TMP=ROOT/'tmp/pdfs'; REND=TMP/'modbook_pages';REND.mkdir(exist_ok=True)
doc=pdfium.PdfDocument(str(ROOT/'output/pdf/Dual Grid mod kitabxanası.pdf'))
thumbs=[]
for i in range(len(doc)):
    im=doc[i].render(scale=1.2).to_pil().convert('RGB');im.save(REND/f'page-{i+1:02}.png')
    thumb=im.copy();thumb.thumbnail((178,252));tile=Image.new('RGB',(198,280),'#e1e5e3');tile.paste(thumb,((198-thumb.width)//2,6));ImageDraw.Draw(tile).text((9,261),str(i+1),fill='black');thumbs.append(tile)
for start in range(0,len(thumbs),20):
    group=thumbs[start:start+20];sheet=Image.new('RGB',(198*5,280*4),'white')
    for j,t in enumerate(group):sheet.paste(t,((j%5)*198,(j//5)*280))
    sheet.save(TMP/f'modbook-contact-{start//20+1}.png')
print(json.dumps({'rendered':len(doc),'contacts':2}))
