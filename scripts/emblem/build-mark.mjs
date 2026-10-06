// 金翼羅盤：產生小標誌 public/brand/emblem-mark.svg（頁首、頁尾、網站圖示，24–40px）。
// 用法：node scripts/emblem/build-mark.mjs
// 依據 docs/06_research-and-design/proposals/emblem/BRIEF.md §4、§7。
//
// 與主圖同一條翼臂、同一條外輪廓、同一種刀葉（wingdata.mjs 的 featherAt），只是簡化：
//   每側六根較寬的飛羽（上面三根深金、下面三根中金）加兩根淺金的覆羽，沒有羽軸、亮邊與亮片。
//   羅盤放大一些，只留一個環、珍珠白盤面、四芒星（縱軸較長）與中心點。
// 圖形先用主圖的座標算出，再等比縮放、置中放進 viewBox。漸層 id 一律以 emk- 開頭，可以與大圖內嵌在同一頁。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CENTER, D, PALETTE, featherAt, featherControl } from './geometry.mjs';
import { cubic } from './base.mjs';

const env = (key, fallback) => (process.env[key] === undefined ? fallback : Number(process.env[key]));

// ---------------------------------------------------------------- 參數

const VIEW = [64, 46]; // 與主圖相近的比例
const PAD = env('MK_PAD', 1); // viewBox 內的留白（viewBox 單位）
const STROKE = env('MK_STROKE', 0.8); // 輪廓線寬（viewBox 單位）

const wide = (k) => (L) => k * (12 + 0.09 * L);
const FLIGHT_W = env('MK_W', 1.5);
/** 由後往前畫：飛羽由下到上，再疊上覆羽。 */
const FEATHERS = [
  ...[0.94, 0.75, 0.56, 0.37, 0.18, 0].map((p) => ({ tier: p > 0.4 ? 2 : 1, p, width: wide(FLIGHT_W + env('MK_WP', 1.1) * p) })),
  ...[0.72, 0.3].map((p) => ({ tier: 3, p, reach: env('MK_REACH', 0.5), width: wide(2), round: 0.8 })),
];

const R = (D / 2) * env('MK_COMPASS', 1.28); // 羅盤放大（主圖的單位）
const RING_W = R * 0.2;
const STAR_V = R * 0.78; // 四芒星縱軸（較長）
const STAR_H = R * 0.56;
const STAR_WAIST = R * 0.2;
const DOT_R = R * 0.11;

// ---------------------------------------------------------------- 路徑

const shapes = FEATHERS.map((spec) => ({ tier: spec.tier, ...featherControl(featherAt(spec)) }));

/** 曲線實際經過的範圍（取樣）。 */
let [minX, minY, maxY] = [Infinity, CENTER.y - R, CENTER.y + R];
for (const { start, curves } of shapes) {
  let from = start;
  for (const [a, b, c] of curves) {
    for (let t = 0; t <= 1.0001; t += 0.04) {
      const [x, y] = cubic([from, a, b, c], t);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
    from = c;
  }
}

// 等比縮放、置中
const inset = PAD + STROKE / 2;
const halfW = CENTER.x - minX;
const K = Math.min((VIEW[0] - 2 * inset) / (2 * halfW), (VIEW[1] - 2 * inset) / (maxY - minY));
const CX = VIEW[0] / 2;
const TOP = (VIEW[1] - K * (maxY - minY)) / 2;

const num = (v) => {
  const s = (Math.round(v * 100) / 100).toString();
  return s === '-0' ? '0' : s.replace(/^(-?)0\./, '$1.');
};
// 羽毛的座標取一位小數就夠（省位元組）；羅盤維持兩位
const one = (v) => num(Math.round(v * 10) / 10);
const at = ([x, y]) => `${one(CX + K * (x - CENTER.x))} ${one(TOP + K * (y - minY))}`;
const leaf = ({ start, curves }) => `M${at(start)}C${curves.flat().map(at).join(' ')}Z`;

// ---------------------------------------------------------------- SVG

const gradient = (id, [from, to]) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>`;
const defs = `<defs>${[
  gradient('emk-gold-1', [PALETTE.gold1[2], PALETTE.gold1[1]]),
  gradient('emk-gold-2', [PALETTE.gold2[2], PALETTE.gold2[1]]),
  gradient('emk-gold-3', [PALETTE.gold3[2], PALETTE.gold3[1]]),
].join('')}</defs>`;

const wingBody = shapes.map((shape) => `<path fill="url(#emk-gold-${shape.tier})" d="${leaf(shape)}"/>`).join('');
const wings = `<g id="emk-wing-l">${wingBody}</g><g id="emk-wing-r" transform="translate(${VIEW[0]} 0) scale(-1 1)">${wingBody}</g>`;

const cy = TOP + K * (CENTER.y - minY);
const r = K * R;
const ringW = K * RING_W;
const w = STAR_WAIST * Math.SQRT1_2;
const star = [[0, -STAR_V], [w, -w], [STAR_H, 0], [w, w], [0, STAR_V], [-w, w], [-STAR_H, 0], [-w, -w]]
  .map(([x, y]) => `${num(CX + K * x)} ${num(cy + K * y)}`)
  .join('L');
// 環：珍珠白的盤面加一圈金色的粗線，外側再描一圈輪廓
const compass =
  `<g id="emk-compass"><circle cx="${num(CX)}" cy="${num(cy)}" r="${num(r)}" fill="${PALETTE.pearl}"/>` +
  `<circle cx="${num(CX)}" cy="${num(cy)}" r="${num(r - STROKE / 2 - ringW / 2)}" stroke="url(#emk-gold-2)" stroke-width="${num(ringW)}"/>` +
  `<path fill="url(#emk-gold-1)" stroke-width="${num(STROKE * 0.6)}" d="M${star}Z"/><circle cx="${num(CX)}" cy="${num(cy)}" r="${num(K * DOT_R)}" fill="${PALETTE.pearl}" stroke="none"/></g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW[0]} ${VIEW[1]}" fill="none"><g stroke="${PALETTE.outline}" stroke-width="${num(STROKE)}" stroke-linejoin="round">${defs}${wings}${compass}</g></svg>\n`;

// ---------------------------------------------------------------- 檢查與寫檔

const bytes = Buffer.byteLength(svg);
if (bytes >= 4096) throw new Error(`emblem-mark.svg 太大：${bytes} bytes`);
if (/id="(?!emk-)/.test(svg)) throw new Error('id 必須以 emk- 開頭');
if ((svg.match(/<path fill="url\(#emk-gold-[123]\)" d="M[^"]+C/g) ?? []).length !== FEATHERS.length * 2) throw new Error(`每側應該恰好 ${FEATHERS.length} 根羽毛`);

const out = process.env.MK_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public/brand/emblem-mark.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log(JSON.stringify({ out, bytes, viewBox: VIEW, scale: +K.toFixed(4), compassR: +r.toFixed(2), centre: [CX, +cy.toFixed(2)] }));
