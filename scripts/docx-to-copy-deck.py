import sys,re,zipfile
import xml.etree.ElementTree as ET
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
RN='{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
z=zipfile.ZipFile(sys.argv[1])
rels={r.get('Id'):r.get('Target') for r in ET.fromstring(z.read('word/_rels/document.xml.rels'))}
body=ET.fromstring(z.read('word/document.xml')).find(W+'body')
def runs(el):
    out=[]
    for c in el:
        if c.tag==W+'r':
            for t in c:
                if t.tag==W+'t': out.append(t.text or '')
                elif t.tag==W+'tab': out.append('\t')
                elif t.tag==W+'br': out.append('\n')
        elif c.tag==W+'hyperlink':
            txt=runs(c); url=rels.get(c.get(RN+'id'),'')
            if url and txt.strip() and txt.strip()!=url: out.append(f'{txt}〔{url}〕')
            else: out.append(txt or url)
        elif c.tag in (W+'ins',W+'smartTag',W+'sdt',W+'sdtContent'): out.append(runs(c))
    return ''.join(out)
def para(p):
    t=runs(p)
    ppr=p.find(W+'pPr')
    if ppr is not None and ppr.find(W+'numPr') is not None and t.strip(): t='\t•\t'+t
    return t
lines=[]
def walk(el):
    for c in el:
        if c.tag==W+'p': lines.extend(para(c).split('\n'))
        elif c.tag==W+'tbl':
            for tr in c.findall(W+'tr'):
                cells=[' '.join(x for x in (para(p) for p in tc.iter(W+'p')) if x.strip()) for tc in tr.findall(W+'tc')]
                lines.append('\t'.join(cells))
        elif c.tag in (W+'sdt',W+'sdtContent'): walk(c)
walk(body)
open(sys.argv[2],'w',encoding='utf-8').write('\n'.join(l.rstrip() for l in lines)+'\n')
