import type { ContentBlock } from '../../types';

// 把一個段落（docx 的一個小節）切成幾「頁」，每頁看得到的內文不超過 PAGE_BUDGET 個字
// （pages-v2/BRIEF §3：手機一個畫面上限 140 字）。這裡只決定怎麼分，不新增、不刪、不改任何字：
// - 小標（h）一定是新的一頁的開頭；
// - 條列可以在項目之間分頁；超過上限的單一段落在句號處分頁；引出下文的短句跟著下文走；
// - 表格與問答是收合的列，只計算預設看得到的字。
export const PAGE_BUDGET = 140;

type TableBlock = Extract<ContentBlock, { type: 'table' }>;
type QaBlock = Extract<ContentBlock, { type: 'qa' }>;

export type DeckItem =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; block: TableBlock; mode: TableMode }
  | { type: 'qa'; block: QaBlock };

export interface DeckPage {
  /** 這一頁開頭的小標（docx 原文）；沒有就是 undefined */
  heading?: string;
  items: DeckItem[];
  chars: number;
}

/** plain：兩欄的短表格，整張直接列出；rows：一列一個收合，一次開一列 */
export type TableMode = 'plain' | 'rows';

const cellChars = (rows: string[][]) => rows.flat().join('').length;

export function tableMode(block: TableBlock): TableMode {
  return block.header.length === 2 && cellChars(block.rows) + block.header.join('').length <= PAGE_BUDGET ? 'plain' : 'rows';
}

/** 表格裡金額那一欄的位置（欄名含「費用」或「價格」，而且每一格都很短）；沒有就是 -1 */
export function priceColumn(block: TableBlock): number {
  const index = block.header.findIndex((h, i) => i > 0 && /費用|價格/.test(h));
  return index > 0 && block.rows.every((row) => (row[index] ?? '').length <= 12) ? index : -1;
}

/** 表格預設看得到的字數：plain 是全部；rows 是欄名加上預設展開的第一列 */
function tableChars(block: TableBlock, mode: TableMode): number {
  if (mode === 'plain') return cellChars(block.rows) + block.header.join('').length;
  const price = priceColumn(block);
  const body = block.header.map((h, i) => (i === 0 || i === price ? '' : h + (block.rows[0]?.[i] ?? ''))).join('');
  return body.length;
}

/** 超過上限的段落在句末分開（。！？），每一塊都是原文的連續片段 */
function splitParagraph(text: string): string[] {
  if (text.length <= PAGE_BUDGET) return [text];
  const sentences = text.match(/[^。！？!?]+[。！？!?]*[」』）)]?/g) ?? [text];
  const out: string[] = [];
  for (const sentence of sentences) {
    const last = out[out.length - 1];
    if (last !== undefined && last.length + sentence.length <= PAGE_BUDGET) out[out.length - 1] = last + sentence;
    else out.push(sentence);
  }
  return out;
}

interface Unit {
  heading?: string;
  /** 沒有 item：只有小標、後面沒有內文的單位 */
  item?: DeckItem | { type: 'li'; text: string };
  chars: number;
}

export function buildDeck(blocks: ContentBlock[]): DeckPage[] {
  const units: Unit[] = [];
  let heading: string | undefined;
  const push = (item: Unit['item'], chars: number) => {
    units.push({ heading, item, chars });
    heading = undefined;
  };
  for (const block of blocks) {
    if (block.type === 'h') {
      // 連續兩個小標：前一個自己成為一頁，不可遺漏
      if (heading !== undefined) push(undefined, 0);
      heading = block.text;
    } else if (block.type === 'p') {
      for (const text of splitParagraph(block.text)) push({ type: 'p', text }, text.length);
    } else if (block.type === 'list') {
      for (const text of block.items) push({ type: 'li', text }, text.length);
    } else if (block.type === 'table') {
      const mode = tableMode(block);
      push({ type: 'table', block, mode }, tableChars(block, mode));
    } else {
      push({ type: 'qa', block }, 0);
    }
  }
  if (heading !== undefined) push(undefined, 0);

  const pages: DeckPage[] = [];
  let page: DeckPage | undefined;
  for (const unit of units) {
    if (!page || unit.heading !== undefined || page.chars + unit.chars > PAGE_BUDGET) {
      // 引出下文的短句（以冒號或問號結尾）不留在上一頁的最後，跟著它引出的內容到下一頁
      const tail = page && unit.heading === undefined && page.items.length > 1 ? page.items[page.items.length - 1] : undefined;
      const carry = tail?.type === 'p' && tail.text.length <= 40 && /[：:？?]$/.test(tail.text) && tail.text.length + unit.chars <= PAGE_BUDGET ? tail : undefined;
      if (page && carry) {
        page.items.pop();
        page.chars -= carry.text.length;
      }
      page = { heading: unit.heading, items: carry ? [carry] : [], chars: carry ? carry.text.length : 0 };
      pages.push(page);
    }
    if (!unit.item) continue;
    const last = page.items[page.items.length - 1];
    if (unit.item.type === 'li') {
      if (last?.type === 'list') last.items.push(unit.item.text);
      else page.items.push({ type: 'list', items: [unit.item.text] });
    } else {
      page.items.push(unit.item);
    }
    page.chars += unit.chars;
  }
  return pages;
}

/** 「標題：說明」形式的條列項目：把冒號之前的詞標成粗體用。兩段接起來就是原文。 */
export function splitLabel(text: string): [string, string] | null {
  const match = /^([^：:，。、？！]{2,16}[：:])\s*(.+)$/s.exec(text);
  return match ? [match[1], text.slice(match[1].length)] : null;
}
