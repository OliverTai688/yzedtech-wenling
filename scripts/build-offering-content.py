#!/usr/bin/env python3
"""把 docs/網站文案集.md 裡 8 項服務與 6 門課程的完整文案，逐字轉成結構化資料。

用法：python3 scripts/build-offering-content.py
輸出：src/content/offerings.ts（不要手動修改；文案集更新後重新執行本腳本）

規則：
- 文字逐字保留，只移除表情符號與文案集裡 AI 產生的說明句（「這就為你將…」等）。
- 以表情符號開頭的短行視為標題；有編號的段落（「1.」「一、」）以編號標題分段，其餘為小標。
- 連續的條列、表格、Q&A 各自成為一個區塊。
- 每個段落依標題關鍵字歸到一個群組（intro／plans／process／proof／faq／notes），供頁面分層顯示。
- proof（見證）在客戶確認授權前不顯示（RPT-001 C1）。
- 舊的官方 LINE 連結一律換成現行連結（PRD-003 決策 D4）。
行號對應 2026-10-04 的文案集 v2；文案集改版後需更新 RANGES。
"""
import json, re, sys, unicodedata, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
DECK = ROOT / 'docs' / '網站文案集.md'
OUT = ROOT / 'src' / 'content' / 'offerings.ts'

RANGES = {
    'personal-1on1': (469, 557), 'spiritual-reading': (557, 639), 'spiritual-massage': (639, 716),
    'group-healing': (716, 800), 'workshop': (800, 845), 'smoke-prayer': (845, 939),
    'five-elements-perfume': (939, 994), 'abundance-reiki': (994, 1071),
    'theta-basic': (1071, 1137), 'theta-advanced-dna': (1137, 1189), 'theta-dig-deeper': (1189, 1255),
    'money-reiki-cert': (1255, 1353), 'love-reiki-cert': (1353, 1434), 'mermaid-reiki-cert': (1434, 1486),
}
AI_NOTES = ('這就為你將', '這份文案', '你可以直接')
OLD_LINE = 'https://lin.ee/yo6a6FW'
NEW_LINE = 'https://lin.ee/N7QHCND'

GROUPS = [  # 順序即判斷優先序
    ('proof', r'見證|回饋|Social Proof|心得|轉化案例|真實案例'),
    ('faq', r'常見問題|常見 Q|FAQ'),
    ('notes', r'免責|注意事項|退費|照護|約定'),
    ('plans', r'方案|費用|價格|Pricing|優惠|加購|贈禮|福利|禮遇|大禮|課程包含|天時'),
    ('process', r'流程|步驟|SOP|預約|報名|開課資訊|課程資訊|上課時間|進行方式|擇日|通道|體驗課程'),
]

def is_symbol(ch):
    return unicodedata.category(ch) in ('So', 'Sk') or ord(ch) >= 0x1F000 or ch in '❓⚠✨✅❤✔▍'

def strip_emoji(s):
    out = []
    for ch in s:
        o = ord(ch)
        if o >= 0x1F000 or o in (0xFE0F, 0x20E3, 0x200D) or 0x2600 <= o <= 0x27BF or 0x2B00 <= o <= 0x2BFF or ch in '▍':
            continue
        out.append(ch)
    return re.sub(r'[ 　]{2,}', ' ', ''.join(out)).strip()

def clean(s):
    s = s.replace(OLD_LINE, NEW_LINE)
    s = re.sub(r'〔[^〕]*〕', '', s)  # 內嵌連結的網址標註不放進顯示文字
    return strip_emoji(s)

NUMBERED = re.compile(r'^\s*(\d+\.|[一二三四五六七八九十]+、)')

def heading_kind(raw):
    """回傳 'top'／'sub'／None。raw 為未去表情符號的原文（不以 tab 開頭）。"""
    t = raw.strip()
    if not t or '\t' in t or not is_symbol(t[0]) or t[0] in '─👉✅✔📍':
        return None
    body = strip_emoji(t)
    if len(body) > 40 or not body:
        return None
    if body[0] in '「(（' or body[-1] in '。！」]' or 'IG 精選' in body:
        return None
    return 'top' if NUMBERED.match(body) else 'sub'

def group_of(title):
    for gid, pat in GROUPS:
        if re.search(pat, title):
            return gid
    return 'intro'

def parse_blocks(lines):
    blocks, i = [], 0
    while i < len(lines):
        raw = lines[i]
        if raw.startswith('\t•\t'):
            items = []
            while i < len(lines) and lines[i].startswith('\t•\t'):
                item = clean(lines[i][3:])
                if item: items.append(item)
                i += 1
            if items: blocks.append({'type': 'list', 'items': items})
            continue
        if '\t' in raw.strip('\t') and not raw.startswith('\t'):
            rows = []
            while i < len(lines) and '\t' in lines[i].strip('\t') and not lines[i].startswith('\t'):
                rows.append([clean(c) for c in lines[i].split('\t')])
                i += 1
            width = max(len(r) for r in rows)
            rows = [r + [''] * (width - len(r)) for r in rows]
            blocks.append({'type': 'table', 'header': rows[0], 'rows': rows[1:]})
            continue
        if re.match(r'^\s*Q\d+\s*[：:｜|]', raw):
            qa = []
            while i < len(lines) and re.match(r'^\s*Q\d+\s*[：:｜|]', lines[i]):
                q = clean(re.sub(r'^\s*Q\d+\s*[：:｜|]\s*', '', lines[i])); i += 1
                answer = []
                while i < len(lines) and not re.match(r'^\s*Q\d+\s*[：:｜|]', lines[i]) and heading_kind(lines[i]) is None and not lines[i].startswith('\t•\t') and not re.match(r'^【', lines[i].strip()):
                    a = clean(re.sub(r'^\s*A\s*[：:]\s*', '', lines[i]))
                    if a: answer.append(a)
                    i += 1
                qa.append({'q': q, 'a': answer})
            blocks.append({'type': 'qa', 'items': qa})
            continue
        kind = heading_kind(raw)
        text = clean(raw)
        i += 1
        if not text:
            continue
        nxt = lines[i] if i < len(lines) else ''
        short_label = len(text) <= 18 and text[-1] not in '。！？」)）' and (nxt.startswith('\t•\t') or ('\t' in nxt and not nxt.startswith('\t')))
        if kind == 'sub' or short_label or re.fullmatch(r'【[^】]{2,24}】', text):
            blocks.append({'type': 'h', 'text': text.strip('【】') if re.fullmatch(r'【[^】]*】', text) else text})
        else:
            blocks.append({'type': 'p', 'text': text})
    return blocks

def parse(oid, lines):
    lines = [l for l in lines if l.strip() and not l.strip().startswith(AI_NOTES)]
    title = clean(lines[0])
    body = lines[1:]
    kinds = [heading_kind(l) if not l.startswith('\t') else None for l in body]
    numbered = any(k == 'top' for k in kinds)
    def is_section_start(idx):
        k = kinds[idx]
        if k is None: return False
        if not numbered: return True
        if k == 'top': return True
        # 有編號的段落裡，最後一個編號標題之後的無編號標題（例如「登岸預約通道」）也視為新段落
        return not any(kk == 'top' for kk in kinds[idx + 1:]) and re.search(r'通道|體驗課程|免責', strip_emoji(body[idx]))
    starts = [i for i in range(len(body)) if is_section_start(i)]
    lead = parse_blocks(body[:starts[0]] if starts else body)
    sections = []
    for n, s in enumerate(starts):
        e = starts[n + 1] if n + 1 < len(starts) else len(body)
        heading = NUMBERED.sub('', clean(body[s])).strip()
        blocks = parse_blocks(body[s + 1:e])
        if not blocks and not heading: continue
        sections.append({'id': f'{oid}-{n + 1}', 'group': group_of(heading), 'title': heading, 'blocks': blocks})
    # 沒有內容的標題併成前一段的小標
    merged = []
    for sec in sections:
        if not sec['blocks'] and merged:
            merged[-1]['blocks'].append({'type': 'h', 'text': sec['title']})
        else:
            merged.append(sec)
    return {'title': title, 'lead': lead, 'sections': merged}

def texts(o):
    if isinstance(o, str): yield o
    elif isinstance(o, list):
        for x in o: yield from texts(x)
    elif isinstance(o, dict):
        for k, v in o.items():
            if k not in ('type', 'id', 'group'): yield from texts(v)

def main():
    deck_lines = DECK.read_text(encoding='utf-8').split('\n')
    norm = lambda s: re.sub(r'\s+', '', s)
    deck_norm = norm(strip_emoji(re.sub(r'〔[^〕]*〕', '', '\n'.join(deck_lines)).replace(OLD_LINE, NEW_LINE)))
    data, problems = {}, []
    for oid, (a, b) in RANGES.items():
        data[oid] = parse(oid, deck_lines[a - 1:b - 1])
        for t in texts(data[oid]):
            if len(t) > 6 and norm(t) not in deck_norm:
                problems.append((oid, t[:50]))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps(data, ensure_ascii=False, indent=2)
    OUT.write_text(
        "// 由 scripts/build-offering-content.py 從 docs/網站文案集.md 產生，請勿手動修改。\n"
        "// 內容為 8 項服務與 6 門課程的完整官方文案（逐字，僅移除表情符號）。\n"
        "import type { OfferingContent } from '../types';\n\n"
        f"export const offeringContent = ({body}) as Record<string, OfferingContent>;\n", encoding='utf-8')
    for oid, o in data.items():
        groups = {}
        for s in o['sections']: groups[s['group']] = groups.get(s['group'], 0) + 1
        print(f"{oid:24s} sections={len(o['sections']):2d} {groups}  lead={len(o['lead'])}")
    print('not verbatim:', len(problems), problems[:8])
    return 1 if problems else 0

if __name__ == '__main__':
    sys.exit(main())
