import { EM_AR, EM_CY } from '../emblemGeo';
import { MEET_OPEN, MEET_SCALE } from './founder';
import { anticipate, capIn, capOut, fade, flight, newTimeline, wings, type StageCtx, type Timeline } from './shared';

// Slide 03 三階段（RES-005 §3）。拍點：
// 建立　金翼由下方升起，在畫面底部張開（羽毛還是暗的）
// 發展　內圈弧畫出，三條金線依序長到圓點，各帶出一個階段名稱並由內而外點亮一層羽毛
// 停留　沒有字幕的一拍
// 發展二 外圈弧畫出，三個圓點帶出三項服務；字幕換成服務區的標題
// 交棒　圖退場；金翼羅盤整體上升、縮小（羅盤與雙翼不分開），在拱形升上來時與它相遇，
// 　　　成為下一張創辦人身後的光（相遇之後的那一段在 timelines/founder.ts）

/** 三條金線到達圓點的時間（釘住期間的比例） */
const RAYS = [0.26, 0.36, 0.46];
const SERVICES_AT = 0.62;

/** 依畫面大小排放射圖，並算出金翼的三個停靠點（fanStart、fan、halo）。回傳還原用的函式。 */
export function layoutRoutes(ctx: StageCtx) {
  const D = ctx.desktop;
  const { W, H } = ctx;
  const [svg] = ctx.q<SVGSVGElement>('[data-st="fan"]');
  const arcs = ctx.q<SVGPathElement>('.st-arc');
  const rays = ctx.q<SVGLineElement>('.st-ray');
  const [capzone] = ctx.q('[data-slide="routes"] .st-capzone');
  const A = ctx.q('[data-node="stage"]');
  const B = ctx.q('[data-node="service"]');

  // 金翼：寬度不超過畫面高的一半所能容納的大小；底邊貼著底部固定列上緣（桌機可略被底邊裁切）
  const fw = Math.min(D ? Math.min(820, W * 0.62) : W * 1.4, H * 0.5 * EM_AR);
  const below = (fw / EM_AR) * (1 - EM_CY);
  const ox = W / 2;
  const oy = D ? H + Math.min(60, below * 0.4) - below : H - ctx.bar - 8 - below;
  const capBottom = capzone.offsetTop + capzone.offsetHeight;
  const room = oy - capBottom - (D ? 70 : 120);
  const R2 = D ? Math.min(Math.min(H * 0.5, W * 0.32) + Math.min(130, H * 0.16), room) : Math.min(W * 0.85, room) + 80;
  const R1 = D ? Math.min(H * 0.5, W * 0.32, R2 - 90) : R2 - 80;
  // 手機：畫面矮的時候半徑變小，就把左右兩個圓點往外張開（最多 60°），標籤才不會擠在一起
  const spread = D ? Math.PI / 4 : Math.asin(Math.min(Math.sin(Math.PI / 3), (W / 2 - 26) / R1));
  // 手機：中間的標籤往上抬，讓出左右標籤的位置
  const lift = D ? 0 : Math.max(0, Math.min(44, 70 - R1 * (1 - Math.cos(spread))));
  const point = (R: number, a: number) => ({ x: ox + R * Math.sin(a), y: oy - R * Math.cos(a) });

  // 放射圖的畫布只有上半圓那麼大（座標仍是舞台座標），下半部自然被裁掉
  const box = { x: ox - R2 - 4, y: oy - R2 - 4, w: 2 * R2 + 8, h: R2 + 4 };
  Object.assign(svg.style, { left: `${box.x}px`, top: `${box.y}px`, width: `${box.w}px`, height: `${box.h}px` });
  svg.setAttribute('viewBox', `${box.x} ${box.y} ${box.w} ${box.h}`);
  [R1, R2].forEach((R, i) => arcs[i].setAttribute('d', `M${ox - R} ${oy}A${R} ${R} 0 0 1 ${ox + R} ${oy}`));
  arcs[1].classList.toggle('st-arc--ghost', !D);
  const align = D ? ['l', 'ac', 'r'] : ['al', 'ac', 'ar'];
  [-spread, 0, spread].forEach((angle, i) => {
    const inner = point(R1, angle);
    const outer = D ? point(R2, angle) : inner;
    const end = point(R1 - 9, angle);
    Object.entries({ x1: ox, y1: oy, x2: end.x, y2: end.y }).forEach(([k, v]) => rays[i].setAttribute(k, String(v)));
    ([[A[i], inner], [B[i], outer]] as const).forEach(([el, at]) => {
      el.style.left = `${at.x}px`;
      el.style.top = `${at.y}px`;
      el.dataset.al = align[i];
      // 標籤的寬度：桌機左右兩側不能超出畫面；手機固定較窄
      const side = Math.min(at.x, W - at.x) - 34;
      el.style.setProperty('--lw', `${D ? (i === 1 ? 250 : Math.max(120, Math.min(250, side))) : Math.min(150, W * 0.385)}px`);
      if (!D && i === 1) el.style.setProperty('--lift', `${lift}px`);
    });
  });

  ctx.docks.fan = { x: ox, y: oy, w: fw };
  // 由書飛下來的落點：比原點略低、略小，羅盤仍在畫面內（主角不離場）
  ctx.docks.fanStart = { x: ox, y: oy + (fw / EM_AR) * 0.1, w: fw * 0.86 };
  // 交棒的落點：與創辦人那一張的拱形相遇的位置（拱形隨頁面往上捲，相遇的那一刻它在這裡）
  const h = ctx.handoff;
  ctx.docks.halo = h ? { x: h.x, y: h.unit * (1 - h.meet) + h.cy, w: h.w * MEET_SCALE } : { x: ox, y: H * 0.14, w: fw * 0.45 };
  const reset = () => {
    svg.removeAttribute('style');
    svg.removeAttribute('viewBox');
    [...A, ...B].forEach((el) => {
      el.removeAttribute('style');
      delete el.dataset.al;
    });
  };
  return { origin: `${ox} ${oy}`, reset };
}

export function buildRoutes(ctx: StageCtx, origin: string): Timeline {
  const tl = newTimeline();
  const pin = ctx.pin.routes;
  const P = (p: number) => p * pin;
  const D = ctx.desktop;
  const { fan, halo } = ctx.docks;
  const arcs = ctx.q<SVGPathElement>('.st-arc');
  const rays = ctx.q<SVGLineElement>('.st-ray');
  const A = ctx.q('[data-node="stage"]');
  const B = ctx.q('[data-node="service"]');
  const [capA] = ctx.q('[data-slide="routes"] [data-cap="a"]');
  const [capB] = ctx.q('[data-slide="routes"] [data-cap="b"]');
  const [more] = ctx.q('[data-slide="routes"] [data-cap="more"]');
  const [num] = ctx.q('[data-slide="routes"] .st-num');
  const [glow] = ctx.q('[data-st="halo"]');
  const inner = (node: HTMLElement) => node.querySelector('.st-node__in');

  ctx.init(num, { autoAlpha: 0 });
  ctx.init(arcs, { rotation: -180, svgOrigin: origin });
  ctx.init(rays, { scale: 0, opacity: 1, svgOrigin: origin });

  // 建立：升起、由內而外張開
  tl.to(ctx.fly, { x: fan.x, y: fan.y, scale: fan.w / ctx.flyW, duration: P(0.13), ease: 'sine.out' }, 0);
  wings(tl, ctx, 1, P(0.02), P(0.12), 'back.out(1.4)');
  tl.to(ctx.emblem, { '--open': 0.5, '--needle': 720, duration: P(0.14), ease: 'sine.out' }, 0);
  fade(tl, num, 0, 1, P(0.02), P(0.04));
  capIn(tl, capA, P(0.03), P(0.06));

  // 發展：內圈弧、三條金線、三個階段；每到一個階段點亮一層羽毛（由內而外）
  tl.to(arcs[0], { rotation: 0, duration: P(0.09), ease: 'power1.inOut' }, P(0.11));
  A.forEach((node, i) => {
    tl.to(rays[i], { scale: 1, duration: P(0.07), ease: 'power1.out' }, P(RAYS[i] - 0.07));
    fade(tl, node, 0, 1, P(RAYS[i] - 0.015), P(0.04));
    tl.fromTo(inner(node), { y: 10 }, { y: 0, duration: P(0.05), ease: 'power2.out', immediateRender: false }, P(RAYS[i] - 0.015));
    tl.to(ctx.fly, { [`--l${3 - i}`]: 1, duration: P(0.06), ease: 'sine.out' }, P(RAYS[i] - 0.02));
  });
  capOut(tl, capA, P(RAYS[2] - 0.05), P(0.05));
  fade(tl, num, 1, 0, P(RAYS[2] - 0.05), P(0.04));
  tl.to(ctx.emblem, { '--open': 1, duration: P(0.1), ease: 'sine.inOut' }, P(0.5));

  // 發展二：外圈弧與三項服務（手機沿用同三個圓點，階段名稱換成服務名稱）
  tl.to(arcs[1], { rotation: 0, duration: P(0.1), ease: 'power1.inOut' }, P(SERVICES_AT));
  if (!D) fade(tl, A, 1, 0, P(SERVICES_AT + 0.02), P(0.04));
  B.forEach((node, i) => {
    fade(tl, node, 0, 1, P(0.71 + i * 0.045), P(0.04));
    tl.fromTo(inner(node), { y: 10 }, { y: 0, duration: P(0.05), ease: 'power2.out', immediateRender: false }, P(0.71 + i * 0.045));
  });
  capIn(tl, capB, P(0.76), P(0.06));
  fade(tl, num, 0, 1, P(0.76), P(0.04));
  fade(tl, more, 0, 1, P(0.8), P(0.05));

  // 交棒：圖與字退場；金翼預備後整體上升、縮小，光跟著回到上方
  const exit = pin;
  fade(tl, [...(D ? A : []), ...B, capB, more, num], 1, 0, exit, 0.12);
  tl.to([...arcs, ...rays], { opacity: 0, duration: 0.14 }, exit);
  anticipate(tl, ctx, P(0.95), P(0.05), fan, 1, 0.12);
  const h = ctx.handoff;
  flight(tl, ctx, fan, halo, exit, h ? h.meet : 1, {
    bx: D ? 70 : -28, by: 0, rot: D ? 4 : -4, beats: h ? [0.72, 1, MEET_OPEN] : [0.7, 1, 0.82, 1], ease: h ? 'sine.inOut' : 'power2.out',
  });
  tl.to(glow, { y: 0, scale: 0.9, duration: 1, ease: 'sine.inOut' }, exit);
  tl.set({}, {}, pin + 1);
  return tl;
}

/** 捲到這個比例之後，圓點上是服務（之前是階段）；換景時 HomeStage 用來收起面板 */
export const servicesAt = SERVICES_AT;
