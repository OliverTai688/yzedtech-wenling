import { TIER_DIM } from '../emblemGeo';
import { bookPlan } from './bookPlan';
import { anticipate, capIn, capOut, fade, flight, measureDock, newTimeline, offsetIn, sweep, wings, type Dock, type StageCtx, type Timeline } from './shared';

// Slide 02 書（RES-005 §3）。拍點：
// 建立　書闔著立在舞台上，金翼落在書後成為書的翅膀
// 發展　封面打開、書走到讀者面前（放大到閱讀的大小），先是序，再依序翻到四個對象的第一頁
// 停留　每翻一頁停一下；後面的幾頁由訪客按箭頭自己翻（不隨捲動）
// 交棒　書與書籤一起縮小淡出，金翼收攏、沿弧線降到畫面底部

/** 書的版面：CSS 排的是打開後的閱讀大小；闔著時縮小、立在地平線上（[data-st="book-stand"] 標出那個位置） */
export function measureBook(q: StageCtx['q'], desktop: boolean) {
  const [book] = q('[data-st="book"]');
  const [stand] = q('[data-st="book-stand"]');
  const stage = book.closest<HTMLElement>('.st-stage')!;
  const b = offsetIn(book, stage);
  const s = offsetIn(stand, stage);
  const scale = Math.min(1, stand.offsetHeight / book.offsetHeight);
  const y = s.y + stand.offsetHeight - (b.y + book.offsetHeight);
  const closedW = q('[data-dock="book-closed"]')[0].offsetWidth * (desktop ? scale : 1);
  const closed: Dock = { x: b.x + book.offsetWidth / 2, y: s.y + stand.offsetHeight - (book.offsetHeight * scale) / 2, w: closedW };
  return { scale, y, closed, open: measureDock(q('[data-dock="book-open"]')[0]) };
}

export function buildBook(ctx: StageCtx): Timeline {
  const tl = newTimeline();
  const plan = bookPlan(ctx.mode);
  const pin = plan.pin;
  const { bookOpen, fanStart } = ctx.docks;
  const fit = measureBook(ctx.q, ctx.desktop);
  const [book] = ctx.q('[data-st="book"]');
  const [shift] = ctx.q('[data-st="book-shift"]');
  const leaves = ctx.q('.st-leaf');
  const [intro] = ctx.q('[data-slide="book"] [data-cap="intro"]');
  const [preface] = ctx.q('[data-slide="book"] [data-cap="preface"]');
  const panels = ctx.q('[data-slide="book"] [data-cap="need"]');
  const [tabs] = ctx.q('[data-slide="book"] .st-tabs');
  const nav = ctx.q('[data-st="book-nav"]');
  const [num] = ctx.q('[data-slide="book"] .st-num');
  const [mark] = ctx.q('[data-slide="book"] .st-floormark');
  const [floor] = ctx.q('[data-st="floor"]');
  const [crest] = ctx.q('[data-st="crest"]');
  const [halo] = ctx.q('[data-st="halo"]');
  const [open0, open1] = plan.open;
  const openLen = open1 - open0;

  // 建立：闔著的書縮小、立在地平線上（桌機把封面移到正中）
  ctx.init(book, { scale: fit.scale, y: fit.y, transformOrigin: '50% 100%' });
  if (ctx.desktop) ctx.init(shift, { x: -leaves[0].offsetWidth / 2 });
  // 書籤是可以點的：書縮小時書籤維持原本的大小（點擊範圍不能跟著變小）
  ctx.init(tabs, { scale: 1 / fit.scale, transformOrigin: ctx.desktop ? '0% 0%' : '50% 0%' });

  // 字幕（區塊標題）只陪著闔著的書；書一打開就讓位給書頁上的字
  capOut(tl, intro, open0 - 0.02, 0.05);
  fade(tl, [num, mark], 1, 0, open0 - 0.02, 0.06);

  // 發展：打開封面，書走到讀者面前
  tl.to(book, { scale: 1, y: 0, duration: openLen, ease: 'power2.inOut' }, open0);
  if (ctx.desktop) tl.to(shift, { x: 0, duration: openLen, ease: 'power2.inOut' }, open0);
  tl.to(tabs, { scale: 1, duration: openLen, ease: 'power2.inOut' }, open0);

  // 書頂的小羅盤與翻頁箭頭：封面打開時才出現
  ctx.init(crest, { autoAlpha: 0, scale: 0.6 });
  tl.to(crest, { autoAlpha: 1, scale: 1, duration: openLen * 0.6, ease: 'back.out(1.6)' }, open0 + openLen * 0.5);
  fade(tl, nav, 0, 1, open1 - 0.03, 0.06);

  // 書頁上的字：序 → 各對象的第一頁（翻頁前淡出、翻過去之後淡入）
  capIn(tl, preface, open1 - 0.04, 0.05);
  capOut(tl, preface, plan.flips[0][0] - 0.02, 0.03);
  panels.forEach((panel, i) => {
    capIn(tl, panel, plan.flips[i][1] - 0.03, 0.04);
    if (plan.flips[i + 1]) capOut(tl, panel, plan.flips[i + 1][0] - 0.02, 0.03);
  });

  // 翻頁：第 0 次是封面，之後每次翻到下一個對象
  const turns: [number, number][] = [plan.open, ...plan.flips];
  if (ctx.desktop) {
    turns.forEach(([a, b], i) => tl.fromTo(leaves[i], { rotationY: 0 }, { rotationY: -180, duration: b - a, ease: 'power1.inOut', immediateRender: false }, a));
  } else {
    const pages = [ctx.q('.st-leaf[data-leaf="0"] .st-face--front')[0], ...leaves.slice(0, turns.length - 1).map((leaf) => leaf.querySelector('.st-face--back'))];
    turns.forEach(([a, b], i) => {
      const d = b - a;
      tl.fromTo(pages[i], { rotationY: 0 }, { rotationY: -100, duration: d, ease: 'power1.in', immediateRender: false }, a);
      tl.fromTo(pages[i], { autoAlpha: 1 }, { autoAlpha: 0, duration: d * 0.35, immediateRender: false }, a + d * 0.65);
    });
  }

  // 金翼：封面打開時退到書後；每翻到一個對象拍一下，指針轉到該對象的方位（0 上、90 右、180 下、270 左）
  tl.to(ctx.fly, { x: bookOpen.x, y: bookOpen.y, scale: bookOpen.w / ctx.flyW, duration: openLen, ease: 'power2.inOut' }, open0);
  tl.to(ctx.emblem, { '--open': 0.6, duration: openLen, ease: 'sine.inOut' }, open0);
  plan.flips.forEach(([a, b], i) => {
    const d = b - a;
    tl.to(ctx.emblem, { '--needle': 360 + i * 90, duration: d * 1.2, ease: 'back.out(2)' }, a + d * 0.4);
    wings(tl, ctx, 0.72, a, d * 0.4);
    wings(tl, ctx, 1, a + d * 0.45, d * 0.5, 'back.out(1.4)');
  });

  // 交棒：書與書籤一起縮小淡出；金翼預備後收攏、降到畫面底部；地面淡出，光移到下一張的原點
  const exit = pin;
  // 縮小的幅度很小：書上的按鈕與書籤不會因此小於可點的大小
  tl.to(book, { scale: 0.92, y: fit.y * 0.3, autoAlpha: 0, duration: 0.36, ease: 'power1.in' }, exit + 0.04);
  anticipate(tl, ctx, pin - 0.07, 0.06, bookOpen, 1, 0.12);
  flight(tl, ctx, bookOpen, fanStart, exit, 1, { bx: ctx.desktop ? 110 : -60, by: 0, rot: ctx.desktop ? 5 : -6, beats: [0.62, 0.88, 0.58, 0.4] });
  tl.to(ctx.fly, { '--l1': TIER_DIM, '--l2': TIER_DIM, '--l3': TIER_DIM, duration: 0.3 }, exit + 0.7);
  tl.to(ctx.emblem, { '--open': 0.3, duration: 0.6, ease: 'sine.inOut' }, exit + 0.2);
  sweep(tl, ctx, exit, 1, 0.45);
  tl.to(floor, { opacity: 0, duration: 0.6 }, exit);
  tl.to(halo, { y: ctx.docks.fan.y - ctx.docks.fan.w * 0.1 - halo.offsetTop - halo.offsetHeight / 2, scale: 1.15, duration: 1, ease: 'sine.inOut' }, exit);
  tl.set({}, {}, pin + 1);
  return tl;
}
