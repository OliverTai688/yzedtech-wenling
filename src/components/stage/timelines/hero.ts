import { HERO_OPEN } from '../emblemGeo';
import { anticipate, capIn, capOut, fade, flight, newTimeline, sweep, wings, type StageCtx, type Timeline } from './shared';

// Slide 01 Hero（RES-005 §3）。拍點：
// 建立　半收攏的金翼羅盤停在地平線上方，主標與主按鈕載入就在
// 發展　雙翼先微微下壓（預備），再由內而外一層層展開；主標換成眉標那一句
// 停留　展開的金翼停住，光最亮
// 交棒　字幕清場，一道金光掃過，金翼沿弧線飛到書的背後（這一段沒有字）
export function buildHero(ctx: StageCtx): Timeline {
  const tl = newTimeline();
  const pin = ctx.pin.hero;
  const P = (p: number) => p * pin;
  const { hero, bookClosed } = ctx.docks;
  const [title] = ctx.q('[data-slide="hero"] [data-cap="title"]');
  const [line] = ctx.q('[data-slide="hero"] [data-cap="line"]');
  const rest = ctx.q('[data-slide="hero"] .st-num, [data-slide="hero"] [data-cap="act"]');

  ctx.init(ctx.fly, {
    x: hero.x, y: hero.y, scale: hero.w / ctx.flyW, rotation: 0,
    '--o1': HERO_OPEN, '--o2': HERO_OPEN, '--o3': HERO_OPEN, '--l1': 1, '--l2': 1, '--l3': 1,
  });
  ctx.init(ctx.emblem, { '--open': HERO_OPEN, '--needle': -24 });

  // 指針在整段裡慢慢轉一圈
  tl.to(ctx.emblem, { '--needle': 336, duration: pin, ease: 'sine.inOut' }, 0);

  // 發展：預備 → 由內而外展開（略為過頭再回來，當作跟隨）
  anticipate(tl, ctx, P(0.05), P(0.08), hero, HERO_OPEN);
  wings(tl, ctx, 1, P(0.13), P(0.26), 'back.out(1.5)');
  tl.to(ctx.fly, { y: hero.y, duration: P(0.2), ease: 'sine.out' }, P(0.13));
  tl.to(ctx.emblem, { '--open': 1, duration: P(0.3), ease: 'sine.out' }, P(0.13));
  capOut(tl, title, P(0.36), P(0.05));
  capIn(tl, line, P(0.42), P(0.06));

  // 停留（0.5～0.82）之後清場
  capOut(tl, line, P(0.84), P(0.05));
  fade(tl, rest, 1, 0, P(0.86), P(0.06));

  // 交棒：起飛前再壓一下，然後飛向書
  anticipate(tl, ctx, P(0.9), P(0.1), hero, 1, 0.14);
  flight(tl, ctx, hero, bookClosed, pin, 1, ctx.desktop ? { bx: -180, by: 110, rot: -8 } : { bx: 56, by: 70, rot: 7 });
  sweep(tl, ctx, pin, 1);
  tl.set({}, {}, pin + 1);
  return tl;
}
