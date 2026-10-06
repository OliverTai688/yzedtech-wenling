// 金翼羅盤（第二版）：共用的幾何模組（四張圖風格一致的來源）。
// 依據 docs/06_research-and-design/proposals/emblem/BRIEF.md §3、§7。純 ES module，無相依，Node 20+。
//
// 檔案分工：base.mjs 常數與色盤、blade.mjs 羽毛的刀葉形、wingdata.mjs 三層羽毛的配置、
//          compass.mjs 羅盤、sparkle.mjs 亮片。這個檔案把它們組起來，並維持 BRIEF §3 的匯出名稱。
//
// 構成：
//   翅膀  高而上揚。每根羽毛的基部在「翼臂」上（貼著羅盤一側的曲線），羽尖朝向外輪廓上對應的點；
//         由上到下，方向由向上偏外、轉到正外側、再到向下並變短。三層：飛羽 13、中羽 11、覆羽 10。
//   羅盤  小、線稿：雙層外環、一圈細刻度、十六芒玫瑰、中心小圓、四個獨立的方位點、細指針。
//   右翼  左翼的鏡射，不另畫。
//
// 角度的定義（左翼）：0 = 由基部水平指向左，正值向上抬，-90 垂直朝下。與 SVG 的 rotate() 一致。
//
// ★ 與第一版不同：收攏時每根羽毛繞「自己的基部」旋轉，不再共用一個肩點。
//   每根羽毛是 <g class="f" style="--fold:…deg;--pivot:Xpx Ypx">，
//     --fold   由展開轉到收攏的角度差；旋轉角度 = --fold × (1 − open)。
//     --pivot  旋轉中心（viewBox 單位；右翼在鏡射的群組內，數值與左翼相同）。
//   網頁只要維持 `.f { transform-origin: var(--pivot); transform: rotate(calc(var(--fold) * (1 - var(--open)))); }`，
//   每根羽毛自己的 --pivot 會蓋過外層設定的值。匯出的 PIVOT 是翼根（翼臂的下端），只作參考點用。
//   同樣的資料也在 TIERS[t].feathers[i].pivot。

import { POSE } from './pose.mjs';
import { CENTER, DEG, H, PALETTE, STROKE, VIEWBOX, cubic, num, pt, toView } from './base.mjs';
import { bladeSegments, rimSegment, shadeSegments, veinSegment } from './blade.mjs';
import { ARM, TIERS } from './wingdata.mjs';
import { compass } from './compass.mjs';
import { sparkles } from './sparkle.mjs';

export { PALETTE, D, H, STROKE, VIEWBOX, CENTER } from './base.mjs';
export { TIERS, featherAt } from './wingdata.mjs';
export { compass } from './compass.mjs';

/** 左翼的翼根（翼臂的下端）。第二版只作參考點；每根羽毛的旋轉中心見檔頭。 */
export const PIVOT = (([x, y]) => ({ x, y }))(toView(ARM[3]));

// ---------------------------------------------------------------- 羽毛

/** 羽毛自己的座標 → 畫面座標。angle 未給時留在羽毛自己的框（指向左，基部在原點）。 */
function placer(angle, origin) {
  if (angle === undefined) return ([s, n]) => [-s, -n];
  const c = Math.cos(angle * DEG);
  const sn = Math.sin(angle * DEG);
  return ([s, n]) => [origin.x - s * c + n * sn, origin.y - s * sn - n * c];
}

function bladeD(f, place) {
  const { start, curves } = bladeSegments(f.length, f.width, f);
  return `M${pt(place(start))}${curves.map((c) => `C${c.map((p) => pt(place(p))).join(' ')}`).join('')}Z`;
}

/** 暗面：後緣那一半的月牙。 */
function shadeD(f, place) {
  const { tip, lower, ctrl } = shadeSegments(f.length, f.width, f);
  return `M${pt(place(tip))}${lower.map((c) => `C${c.map((p) => pt(place(p))).join(' ')}`).join('')}Q${pt(place(ctrl))} ${pt(place(tip))}Z`;
}

/** 寬度不到這個值的羽毛不畫亮邊。 */
const RIM_MIN_WIDTH = 22.5;

/** 羽軸與亮邊：兩條亮線放在同一個 path 裡。 */
function linesD(f, place) {
  const [a, b, c] = veinSegment(f.length, f.width, f).map(place);
  const vein = `M${pt(a)}Q${pt(b)} ${pt(c)}`;
  // 太窄的羽毛只留羽軸，兩條亮線擠在一起會像葉脈
  if (f.width < RIM_MIN_WIDTH) return vein;
  const r = rimSegment(f.length, f.width, f).map((p) => pt(place(p)));
  return `${vein}M${r[0]}C${r.slice(1, 4).join(' ')}C${r.slice(4).join(' ')}`;
}

/**
 * 一根羽毛的輪廓（尖頭、略帶上鉤的刀葉）。基部在原點，指向左。
 * opts：{ bend, skew, round }，見 blade.mjs。放到畫面上：`<g transform="translate(x y) rotate(角度)">`。
 */
export function featherPath(length, width, opts = {}) {
  return bladeD({ length, width, ...opts }, placer());
}

/** 羽軸與亮邊的路徑，座標框與 featherPath 相同。 */
export function veinPath(length, width = length * 0.14, opts = {}) {
  return linesD({ length, width, ...opts }, placer());
}

/** 某根羽毛在某個開合程度下的角度。 */
export function featherAngle(t, f, open = 1, pose = POSE) {
  const closed = 1 - Math.min(1, Math.max(0, open));
  return f.angle + (pose.tiers[t][f.index] - f.angle) * closed;
}

/** 一根羽毛（展開姿態）輪廓的控制點，viewBox 座標：{ start, curves: [[c1, c2, p] × 4] }。小標誌用。 */
export function featherControl(f) {
  const place = placer(f.angle, f.pivot);
  const { start, curves } = bladeSegments(f.length, f.width, f);
  return { start: place(start), curves: curves.map((c) => c.map(place)) };
}

/** 某根羽毛輪廓上的取樣點（viewBox 座標），量外框與放亮片用。 */
export function featherPoints(t, f, open = 1, pose = POSE, steps = 8) {
  const place = placer(featherAngle(t, f, open, pose), f.pivot);
  const { start, curves } = bladeSegments(f.length, f.width, f);
  const pts = [];
  let from = start;
  for (const [a, b, c] of curves) {
    for (let s = 0; s <= steps; s += 1) pts.push(place(cubic([from, a, b, c], s / steps)));
    from = c;
  }
  return pts;
}

// ---------------------------------------------------------------- 共用的 <defs>

const GLOW = toView([-0.125 * H, 0.54 * H]); // 兩翼之間偏內的一點：上面的羽尖離它最遠、最亮

function radial(id, stops, r) {
  const body = stops.map(([offset, color]) => `<stop offset="${offset}" stop-color="${color}"/>`).join('');
  return `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${num(GLOW[0])}" cy="${num(GLOW[1])}" r="${num(r)}">${body}</radialGradient>`;
}

function linear(id, colors) {
  const body = colors.map((color, i) => `<stop offset="${num(i / (colors.length - 1))}" stop-color="${color}"/>`).join('');
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${body}</linearGradient>`;
}

/**
 * 共用的 <defs>。羽毛的漸層以翼臂為圓心向外放射：基部（被上一層蓋住的地方）最深，羽尖最亮。
 * 漸層定義在使用者座標上，羽毛旋轉時會跟著轉，收攏後顏色不變。
 */
export const DEFS = `<defs>${[
  radial('em-gold-1', [[0.28, PALETTE.gold1[0]], [0.6, PALETTE.gold1[1]], [1, PALETTE.gold1[2]]], 0.72 * H),
  radial('em-gold-2', [[0.28, PALETTE.gold2[0]], [0.62, PALETTE.gold2[1]], [1, PALETTE.gold2[2]]], 0.5 * H),
  radial('em-gold-3', [[0.25, PALETTE.gold3[0]], [0.6, PALETTE.gold3[1]], [1, PALETTE.gold3[2]]], 0.34 * H),
  linear('em-ring', [PALETTE.gold2[2], PALETTE.gold1[1], PALETTE.gold1[0]]),
].join('')}</defs>`;

// ---------------------------------------------------------------- 翅膀

/** 前幾層的羽毛帶暗面。 */
const SHADED = 2;

const translate = (shift) => (shift ? ` transform="translate(${num(shift[0])} ${num(shift[1])})"` : '');

/**
 * 一側翅膀的 SVG 片段。
 * @param {object} o
 * @param {'l'|'r'} o.side   'l' 左翼；'r' 右翼（同一份內容加上鏡射）
 * @param {number} [o.open]  0 收攏 … 1 展開
 * @param {object} [o.pose]  收攏姿態，形狀見 pose.mjs
 * @param {object} [o.shift] 選用：把某一層整層平移，例如 { 2: [0, 40] }（鍵是 1／2／3），分解圖用
 * @param {boolean} [o.glitter] 是否加上亮片（預設加；分層平移時不加）
 */
export function wing({ side = 'l', open = 1, pose = POSE, shift = {}, glitter = !Object.keys(shift).length } = {}) {
  const closed = 1 - Math.min(1, Math.max(0, open));
  const tiers = TIERS.map((tier, t) => {
    // 飛羽與中羽加暗面；覆羽太小，不加
    const shade = (f, place) => (t < SHADED ? `<path d="${shadeD(f, place)}" fill="${PALETTE.deep}" fill-opacity=".22" stroke="none"/>` : '');
    // 由下往上畫：上面的羽毛蓋住下面的，像屋瓦
    const feathers = [...tier.feathers].reverse().map((f) => {
      const fold = pose.tiers[t][f.index] - f.angle;
      const place = placer(f.angle, f.pivot);
      const turn = closed ? ` transform="rotate(${num(fold * closed)} ${num(f.pivot.x)} ${num(f.pivot.y)})"` : '';
      return `<g class="f" style="--fold:${num(fold)}deg;--pivot:${num(f.pivot.x)}px ${num(f.pivot.y)}px"${turn}><path d="${bladeD(f, place)}"/>${shade(f, place)}<path d="${linesD(f, place)}" fill="none" stroke="${PALETTE.rim}" stroke-width="${num(STROKE * 0.7)}"/></g>`;
    });
    return `<g class="tier tier-${tier.id}" fill="${tier.fill}"${translate(shift[tier.id])}>${feathers.join('')}</g>`;
  });
  const glints = glitter ? sparkles({ amount: 0.3 + 0.7 * (1 - closed) ** 2, place: (t, f, p) => placer(featherAngle(t, f, open, pose), f.pivot)(p) }) : '';
  const mirror = side === 'r' ? ` transform="translate(${num(VIEWBOX[2])} 0) scale(-1 1)"` : '';
  return `<g id="wing-${side}"${mirror} stroke="${PALETTE.outline}" stroke-width="${num(STROKE)}" stroke-linejoin="round" stroke-linecap="round">${tiers.join('')}${glints}</g>`;
}

// ---------------------------------------------------------------- 整張圖

/**
 * 完整的 <svg> 字串：左翼、右翼、羅盤。透明背景，只有 viewBox。
 * @param {object} o
 * @param {number} [o.open]    0 收攏 … 1 展開
 * @param {number} [o.needle]  指針角度（度）
 * @param {object} [o.pose]    收攏姿態
 * @param {number[]} [o.viewBox] 選用：覆寫 viewBox
 */
export function emblem({ open = 1, needle = 0, pose = POSE, viewBox = VIEWBOX } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox.map(num).join(' ')}" fill="none">${DEFS}${wing({ side: 'l', open, pose })}${wing({ side: 'r', open, pose })}${compass({ needle })}</svg>\n`;
}
