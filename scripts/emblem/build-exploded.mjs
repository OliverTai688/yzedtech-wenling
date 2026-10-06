// 金翼羅盤：產生分解圖 public/brand/emblem-exploded.svg。
// 用法：node scripts/emblem/build-exploded.mjs
// 依據 docs/06_research-and-design/proposals/emblem/BRIEF.md §4、§7。
//
// 版面：上面一列是左翼的三層（飛羽、中羽、覆羽），由左到右排開，只做水平平移，
// 所以三層的翼臂在同一個高度，看得出是怎麼一層一層疊上去的。
// 下面一列是羅盤沿一條水平軸拆開：盤面、雙層外環、刻度與方位點、內環、玫瑰、指針、軸心。
// 零件全部由 geometry.mjs 的 wing() 與 compass() 產生，只用 shift 選項平移，形狀、漸層與線寬和主圖相同。
// 沒有任何標籤，也不放亮片。

import { CENTER, DEFS, PALETTE, STROKE, TIERS, compass, featherPoints, wing } from './geometry.mjs';
import { MARGIN, num } from './base.mjs';
import { COMPASS } from './compass.mjs';
import { writeSvg } from './build.mjs';
import { checkCommon } from './check.mjs';

const PAD = MARGIN * 1.5; // 四周的留白
const TIER_GAP = 34; // 三層之間的間距（外框到外框）
const PART_GAP = 26; // 羅盤零件之間的間距（邊到邊）
const ROW_GAP = 40; // 兩列之間
const AXIS_DOT = 4.5; // 軸線上點與點的距離
const AXIS_INSET = 6; // 軸線與零件邊緣之間留的空隙

// 羅盤各零件在水平軸上的半寬
const HALF = {
  dial: COMPASS.ringOut,
  ring: COMPASS.ringOut,
  marks: COMPASS.tickOut,
  inner: COMPASS.inner,
  rose: COMPASS.roseLong,
  needle: COMPASS.needleW * 3,
  pin: COMPASS.pin,
};
const ORDER = ['dial', 'ring', 'marks', 'inner', 'rose', 'needle', 'pin'];

// ---------------------------------------------------------------- 每一層的外框（主圖的座標）

const BOXES = TIERS.map((tier, t) => {
  const pts = tier.feathers.flatMap((f) => featherPoints(t, f, 1, undefined, 16));
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
});

// ---------------------------------------------------------------- 排版

const top = Math.min(...BOXES.map((b) => b.minY));
const bottom = Math.max(...BOXES.map((b) => b.maxY));
const dy = PAD - top;

const tierShift = {};
let cursor = PAD;
BOXES.forEach((box, t) => {
  tierShift[TIERS[t].id] = [cursor - box.minX, dy];
  cursor += box.maxX - box.minX + TIER_GAP;
});
const wingsWidth = cursor - TIER_GAP - PAD;

const partsWidth = ORDER.reduce((sum, key) => sum + HALF[key] * 2, 0) + PART_GAP * (ORDER.length - 1);
const innerWidth = Math.max(wingsWidth, partsWidth);
const width = Math.ceil(innerWidth + PAD * 2);
const axisY = bottom + dy + ROW_GAP + COMPASS.ringOut;
const height = Math.ceil(axisY + COMPASS.ringOut + PAD);

// 兩列各自置中
const wingsOffset = (innerWidth - wingsWidth) / 2;
for (const shift of Object.values(tierShift)) shift[0] += wingsOffset;
const partX = {};
let run = PAD + (innerWidth - partsWidth) / 2;
for (const key of ORDER) {
  partX[key] = run + HALF[key];
  run += HALF[key] * 2 + PART_GAP;
}
const partShift = Object.fromEntries(ORDER.map((key) => [key, [partX[key] - CENTER.x, axisY - CENTER.y]]));

// ---------------------------------------------------------------- 軸線

/** 一段點狀的軸線，點距固定為 AXIS_DOT，整排點置中在這一段裡。 */
function dots(x1, x2, y) {
  const length = x2 - x1;
  const used = Math.floor(length / AXIS_DOT + 1e-6) * AXIS_DOT;
  const lead = (length - used) / 2;
  // 多畫一點點，最後一個點才會被畫出來
  return `M${num(x1 + lead)} ${num(y)}h${num(used + 0.1)}`;
}

const segments = [];
for (let i = 0; i < ORDER.length - 1; i += 1) {
  const [a, b] = [ORDER[i], ORDER[i + 1]];
  segments.push(dots(partX[a] + HALF[a] + AXIS_INSET, partX[b] - HALF[b] - AXIS_INSET, axisY));
}
// 三層之間：在翼臂中段的高度各連一小段
const armY = (BOXES[2].minY + BOXES[2].maxY) / 2 + dy;
for (let t = 0; t < 2; t += 1) {
  segments.push(dots(BOXES[t].maxX + tierShift[t + 1][0] + AXIS_INSET, BOXES[t + 1].minX + tierShift[t + 2][0] + TIER_GAP * 0.45, armY));
}
const axes = `<path id="axes" d="${segments.join('')}" stroke="${PALETTE.outline}" stroke-width="${num(STROKE * 1.2)}" stroke-linecap="round" stroke-dasharray="0 ${num(AXIS_DOT)}" opacity=".75"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none">${DEFS}${axes}${wing({ side: 'l', open: 1, shift: tierShift })}${compass({ needle: 0, shift: partShift })}</svg>\n`;

/** 分解圖的檢查：共用的檢查，加上羽毛數量與零件齊全。 */
function checkExploded(out) {
  const report = checkCommon(out);
  TIERS.forEach((tier) => {
    const start = out.indexOf(`<g class="tier tier-${tier.id}"`);
    const next = out.indexOf('<g class="tier', start + 1);
    const body = out.slice(start, next < 0 ? out.indexOf('<g id="compass"') : next);
    const got = (body.match(/class="f"/g) || []).length;
    if (start < 0 || got !== tier.count) throw new Error(`emblem check: tier-${tier.id} 有 ${got} 根，應為 ${tier.count}`);
  });
  for (const id of ['compass-ring', 'compass-inner', 'compass-ticks', 'dial', 'rose', 'needle', 'pin']) {
    if ((out.match(new RegExp(`id="${id}"`, 'g')) || []).length !== 1) throw new Error(`emblem check: #${id} 應該恰好一個`);
  }
  if ((out.match(/class="mark"/g) || []).length !== 4) throw new Error('emblem check: 方位點應為 4 個');
  if (out.includes('class="sparkles"')) throw new Error('emblem check: 分解圖不放亮片');
  return { ...report, viewBox: [width, height] };
}

writeSvg('emblem-exploded.svg', svg, checkExploded);
