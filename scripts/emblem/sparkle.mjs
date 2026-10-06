// 金翼羅盤（第二版）：亮片——每翼一組小亮點與幾顆四芒星，位置由固定的亂數種子產生。
// 亮片是裝飾：整個 <g class="sparkles"> 拿掉後圖形仍然完整。
// 亮片的位置算在羽毛上（跟著該羽毛目前的角度），所以靜態圖在任何開合程度都對得上；
// 網頁做收攏動畫時亮片不會跟著羽毛轉，應該讓 .sparkles 隨 --open 淡出。

import { PALETTE, num, pt, seeded } from './base.mjs';
import { bender } from './blade.mjs';
import { TIERS } from './wingdata.mjs';

const SEED = 20261006;
const DOTS = 38;
const STARS = 8;
const DOT_SIZES = [1.4, 2.2, 3.2]; // 亮點的直徑（三種）

/** 在某一層挑一根羽毛，回傳它身上的一個點（羽毛自己的座標，已套用彎度）。 */
function pick(rand, t, lo, hi) {
  const tier = TIERS[t];
  const f = tier.feathers[Math.floor(rand() * tier.count)];
  const s = (lo + (hi - lo) * rand()) * f.length;
  // 越靠近羽尖，羽毛越窄，亮片要收在裡面
  const n = (rand() - 0.55) * 0.45 * f.width * Math.min(1, (1 - s / f.length) * 3.5);
  return { f, p: bender(f.length, f.bend)([s, n]).at };
}

/** 四芒星：縱橫四個尖，中間內凹。 */
function star([x, y], r) {
  const w = r * 0.16;
  return `M${pt([x, y - r])}L${pt([x + w, y - w])}L${pt([x + r, y])}L${pt([x + w, y + w])}L${pt([x, y + r])}L${pt([x - w, y + w])}L${pt([x - r, y])}L${pt([x - w, y - w])}Z`;
}

/**
 * 一側翅膀的亮片。place(t, feather, [s, n]) 把羽毛上的點轉成 viewBox 座標。
 * amount（0 … 1）：只放前面這個比例的亮片；收攏時羽毛疊在一起，亮片要少一些。
 */
export function sparkles({ place, amount = 1 }) {
  const rand = seeded(SEED);
  const dots = DOT_SIZES.map(() => '');
  for (let i = 0; i < Math.round(DOTS * amount); i += 1) {
    const t = i % 5 < 3 ? 0 : i % 5 === 3 ? 1 : 2;
    const { f, p } = pick(rand, t, 0.3, 0.95);
    const size = i % 6 === 0 ? 2 : i % 3 === 0 ? 1 : 0;
    dots[size] += `M${pt(place(t, f, p))}h0`;
  }
  let stars = '';
  for (let i = 0; i < Math.round(STARS * amount); i += 1) {
    const t = i % 4 === 3 ? 1 : 0;
    const { f, p } = pick(rand, t, 0.45, 0.9);
    stars += star(place(t, f, p), 3.5 + 6 * rand() ** 2);
  }
  const dotPaths = dots.map((d, i) => (d ? `<path d="${d}" stroke="${PALETTE.glint}" stroke-width="${num(DOT_SIZES[i])}" fill="none"/>` : '')).join('');
  return `<g class="sparkles" stroke="none" stroke-linecap="round">${dotPaths}<path d="${stars}" fill="${PALETTE.glint}"/></g>`;
}
