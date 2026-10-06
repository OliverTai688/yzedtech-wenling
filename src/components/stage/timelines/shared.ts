import gsap from 'gsap';
import { EM_AR, EM_CX, EM_CY, type StageMode } from '../emblemGeo';
import type { Handoff } from './founder';

// 三張 slide 的時間軸共用的型別與小工具。
// 時間單位是「舞台高度」：每張 slide 的時間軸長度是 pin + 1（釘住的一段，加上交棒給下一張的一個舞台高）。
// 只改 transform、opacity 與金翼羅盤上的自訂屬性（RES-005 §1.2）。

/** 金翼的停靠點：羅盤中心在舞台裡的位置，與金翼的寬度 */
export interface Dock {
  x: number;
  y: number;
  w: number;
}

export interface StageCtx {
  root: HTMLElement;
  mode: StageMode;
  desktop: boolean;
  pin: { hero: number; book: number; routes: number };
  /** 飛行金翼的外框（x／y／scale、各層羽毛的 --o1～3 與 --l1～3） */
  fly: HTMLElement;
  /** 外框裡的 .emblem（--open、--needle） */
  emblem: HTMLElement;
  /** 外框未縮放時的寬度 */
  flyW: number;
  docks: Record<string, Dock>;
  /** slide 03 → 04 的交棒（創辦人那一張不在時為 null） */
  handoff: Handoff | null;
  /** 舞台內容區的寬高（已扣掉頁首） */
  W: number;
  H: number;
  /** 手機底部固定列的高度（桌機為 0） */
  bar: number;
  q: <T extends Element = HTMLElement>(selector: string) => T[];
  /** 時間軸開始前的狀態（加在總時間軸的第 0 秒） */
  init: (targets: gsap.TweenTarget, vars: gsap.TweenVars) => void;
}

export type Timeline = gsap.core.Timeline;
export const newTimeline = () => gsap.timeline({ defaults: { ease: 'none', overwrite: false } });

/** 元素在舞台（.st-stage）裡的位置；只看版面，不受 transform 影響 */
export function offsetIn(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

/** 量一個停靠點。box：元素本身就是金翼的外框；否則元素是「寬度＝金翼寬、頂邊中點＝羅盤中心」的標記 */
export function measureDock(el: HTMLElement, box = false): Dock {
  const stage = el.closest<HTMLElement>('.st-stage');
  const { x, y } = stage ? offsetIn(el, stage) : { x: 0, y: 0 };
  const w = el.offsetWidth;
  return box ? { x: x + w * EM_CX, y: y + (w / EM_AR) * EM_CY, w } : { x: x + w / 2, y, w };
}

// 字幕：進場由下浮上、退場往上淡出
export function capIn(tl: Timeline, target: gsap.TweenTarget, at: number, duration: number) {
  tl.fromTo(target, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration, ease: 'power2.out', immediateRender: false }, at);
}
export function capOut(tl: Timeline, target: gsap.TweenTarget, at: number, duration: number) {
  tl.fromTo(target, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -14, duration, ease: 'power1.in', immediateRender: false }, at);
}
export function fade(tl: Timeline, target: gsap.TweenTarget, from: number, to: number, at: number, duration: number) {
  tl.fromTo(target, { autoAlpha: from }, { autoAlpha: to, duration, immediateRender: false }, at);
}

/** 三層羽毛依序到位（由內而外：tier-3 → tier-2 → tier-1），後面的層晚一點到（跟隨） */
export function wings(tl: Timeline, ctx: StageCtx, open: number, at: number, duration: number, ease = 'sine.inOut') {
  const lag = duration * 0.16;
  tl.to(ctx.fly, { '--o3': open, duration, ease }, at)
    .to(ctx.fly, { '--o2': open, duration, ease }, at + lag)
    .to(ctx.fly, { '--o1': open, duration, ease }, at + lag * 2);
}

/** 預備動作：起飛或展開前，雙翼先微微下壓、身體下沉 */
export function anticipate(tl: Timeline, ctx: StageCtx, at: number, duration: number, dock: Dock, open: number, press = 0.1) {
  const dip = dock.w * 0.02;
  tl.to(ctx.fly, { '--o1': open - press, '--o2': open - press * 0.8, '--o3': open - press * 0.6, y: dock.y + dip, duration, ease: 'sine.inOut' }, at);
}

/** 沿弧線由目前位置飛到 to；途中拍兩下翅膀 */
export function flight(
  tl: Timeline,
  ctx: StageCtx,
  from: Dock,
  to: Dock,
  at: number,
  duration: number,
  opt: { bx?: number; by?: number; rot?: number; beats?: number[]; ease?: string } = {}
) {
  const mid = { x: (from.x + to.x) / 2 + (opt.bx ?? 0), y: (from.y + to.y) / 2 + (opt.by ?? 0) };
  const ease = opt.ease ?? 'sine.inOut';
  tl.to(ctx.fly, { duration, ease, motionPath: { path: [mid, { x: to.x, y: to.y }], curviness: 1.3 } }, at);
  tl.to(ctx.fly, { scale: to.w / ctx.flyW, duration, ease }, at);
  if (opt.rot) {
    tl.to(ctx.fly, { rotation: opt.rot, duration: duration * 0.45, ease: 'sine.out' }, at);
    tl.to(ctx.fly, { rotation: 0, duration: duration * 0.45, ease: 'sine.inOut' }, at + duration * 0.55);
  }
  const beats = opt.beats ?? [0.5, 1, 0.56, 1];
  const step = (duration * 0.86) / beats.length;
  beats.forEach((open, i) => wings(tl, ctx, open, at + i * step, step));
}

/** 換場：一道金光由左掃到右，布景同時泛白（不用暗場） */
export function sweep(tl: Timeline, ctx: StageCtx, at: number, duration: number, white = 0.7) {
  const band = ctx.q('[data-st="sweep"]');
  const flare = ctx.q('[data-st="flare"]');
  const nr = { immediateRender: false };
  tl.fromTo(band, { xPercent: -130, skewX: -12 }, { xPercent: 230, skewX: -12, duration: duration * 0.8, ease: 'sine.inOut', ...nr }, at + duration * 0.1)
    .fromTo(band, { opacity: 0 }, { opacity: 1, duration: duration * 0.25, ...nr }, at + duration * 0.1)
    .fromTo(band, { opacity: 1 }, { opacity: 0, duration: duration * 0.3, ...nr }, at + duration * 0.6)
    .fromTo(flare, { opacity: 0 }, { opacity: white, duration: duration * 0.4, ...nr }, at + duration * 0.1)
    .fromTo(flare, { opacity: white }, { opacity: 0, duration: duration * 0.4, ...nr }, at + duration * 0.5);
}
