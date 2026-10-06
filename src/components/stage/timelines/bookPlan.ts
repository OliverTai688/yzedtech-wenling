import { PIN, type StageMode } from '../emblemGeo';
import { needEntries } from '../../../data';

// Slide 02 書的節拍表（單位：舞台高度；時間 0 是書這一張開始釘住的那一刻）。
// 捲動只是「翻閱」：書打開（序）→ 依序翻到四個對象的第一頁 → 書與書籤一起離場。
// 每個對象後面的幾頁（故事、專屬起點）由訪客自己按箭頭翻，不佔捲動長度（StageBook.tsx）。
// 各段加起來必須不超過 emblemGeo.ts 的 PIN[mode].book；剩下的時間留給最後一個對象。
// 翻頁短、停留長：捲動停在任何位置，多半都看得到一頁完整的字。
const BEATS = {
  mobile: { closed: 0.1, open: 0.16, preface: 0.18, flip: 0.08, hold: 0.17 },
  desktop: { closed: 0.14, open: 0.22, preface: 0.22, flip: 0.11, hold: 0.23 },
};

export type Span = [number, number];
export interface BookPlan {
  pin: number;
  /** 封面打開、書走到讀者面前 */
  open: Span;
  /** 序（區塊說明）停留的時間 */
  preface: Span;
  /** 翻到第 i 個對象的那一次翻頁 */
  flips: Span[];
  /** 第 i 個對象的第一頁停留的時間 */
  holds: Span[];
}

export function bookPlan(mode: StageMode): BookPlan {
  const b = BEATS[mode];
  const pin = PIN[mode].book;
  const open: Span = [b.closed, b.closed + b.open];
  const preface: Span = [open[1], open[1] + b.preface];
  const flips: Span[] = [];
  const holds: Span[] = [];
  let t = preface[1];
  needEntries.forEach((_, i) => {
    flips.push([t, t + b.flip]);
    t += b.flip;
    holds.push([t, i === needEntries.length - 1 ? pin : t + b.hold]);
    t += b.hold;
  });
  return { pin, open, preface, flips, holds };
}

/** 捲到這個時間時，書翻到第幾個對象（-1：還闔著，或停在序） */
export function needAt(plan: BookPlan, time: number) {
  return plan.flips.filter(([a, b]) => time >= (a + b) / 2).length - 1;
}

/** 點書籤或箭頭時捲到這裡：該對象第一頁停留的中點；index 為 -1 時是序 */
export function restAt(plan: BookPlan, index: number) {
  const [a, b] = index < 0 ? plan.preface : plan.holds[index];
  return (a + Math.min(b, a + 0.2)) / 2;
}
