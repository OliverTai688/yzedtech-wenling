import { EM_AR, EM_CX, EM_CY } from '../emblemGeo';
import { newTimeline, offsetIn, type StageCtx, type Timeline } from './shared';

// Slide 03 → 04 的交棒（RES-005 §3）：金翼羅盤成為創辦人身後的光。
// 創辦人那一張不釘住，隨頁面捲動；飛行的金翼是固定圖層，所以分兩段：
// 一、相遇之前　金翼由放射圖的原點縮小、微微上升，等拱形由下方升上來（timelines/routes.ts 的交棒）。
// 二、相遇之後　金翼跟著拱形一起往上（位置對捲動是線性的），同時淡出；拱形身後的那一個金翼淡入、
// 　　　　　　　由小放大到位，羽毛由內而外依序張開（跟隨）。兩個金翼的大小、姿態、位置在這一段完全相同，
// 　　　　　　　所以看起來是同一個。到位之後它跟著頁面走，固定圖層上不再有金翼。

/** 到位時，拱形身後的羅盤中心在舞台高度的這個比例 */
const SETTLE_AT = 0.45;
/** 相遇到到位之間的捲動距離（舞台高） */
const TOGETHER = 0.34;
/** 相遇時金翼的大小（相對於到位後） */
export const MEET_SCALE = 0.62;
/** 相遇時雙翼的展開程度 */
export const MEET_OPEN = 0.66;

export interface Handoff {
  /** 一個時間單位的捲動距離（舞台高，px） */
  unit: number;
  /** 拱形身後的羅盤中心：x 是舞台座標，cy 是離創辦人區塊頂端的距離 */
  x: number;
  cy: number;
  /** 到位後金翼的寬度 */
  w: number;
  /** 交棒的總長與相遇的時間（舞台高；由 slide 03 釘住結束起算） */
  len: number;
  meet: number;
}

export function measureFounder(root: HTMLElement, pinRoutes: number): Handoff | null {
  const section = root.querySelector<HTMLElement>('[data-sec="founder"]');
  const em = section?.querySelector<HTMLElement>('[data-st="founder-em"]');
  const routes = root.querySelector<HTMLElement>('[data-slide="routes"]');
  if (!section || !em || !routes) return null;
  const unit = routes.offsetHeight / (1 + pinRoutes);
  const at = offsetIn(em, section);
  const w = em.offsetWidth;
  const cy = at.y + (w / EM_AR) * EM_CY;
  const len = Math.min(1.6, Math.max(0.8, 1 + cy / unit - SETTLE_AT));
  return { unit, x: section.offsetLeft + at.x + w * EM_CX, cy, w, len, meet: len - TOGETHER };
}

/** 交棒的第二段。時間軸的 0 是 slide 03 釘住結束的那一刻。 */
export function buildFounder(ctx: StageCtx, h: Handoff): Timeline {
  const tl = newTimeline();
  const [em] = ctx.q('[data-st="founder-em"]');
  const span = h.len - h.meet;
  const both = [ctx.fly, em];
  // 拱形身後的金翼：相遇之前不顯示
  ctx.init(em, { autoAlpha: 0, scale: MEET_SCALE, '--o1': MEET_OPEN, '--o2': MEET_OPEN, '--o3': MEET_OPEN });

  // 跟著拱形走：創辦人區塊的頂端在時間 s 時位於 unit × (1 − s)
  tl.fromTo(ctx.fly, { y: h.unit * (1 - h.meet) + h.cy }, { y: h.unit * (1 - h.len) + h.cy, duration: span, immediateRender: false }, h.meet);
  // 兩個金翼同步放大、張開（由內而外，略為過頭再回來）
  tl.to(ctx.fly, { scale: h.w / ctx.flyW, duration: span, ease: 'back.out(1.5)' }, h.meet);
  tl.to(em, { scale: 1, duration: span, ease: 'back.out(1.5)' }, h.meet);
  const lag = span * 0.14;
  ['--o3', '--o2', '--o1'].forEach((key, i) => tl.to(both, { [key]: 1, duration: span - lag * 2, ease: 'back.out(1.6)' }, h.meet + lag * i));
  // 交棒：固定圖層的金翼淡出，拱形身後的淡入
  tl.fromTo(em, { autoAlpha: 0 }, { autoAlpha: 1, duration: span * 0.4, immediateRender: false }, h.meet + span * 0.04);
  tl.fromTo(ctx.fly, { autoAlpha: 1 }, { autoAlpha: 0, duration: span * 0.4, immediateRender: false }, h.meet + span * 0.14);
  tl.set({}, {}, h.len);
  return tl;
}
