// 金翼羅盤（第二版）：左翼三層羽毛的配置。
//
// 做法（設計座標：中軸 x = 0、翼尖頂端 y = 0、單翼高 H）：
//   ARM      翼臂：羽毛基部所在的曲線，由腕點（上、外）到翼根（下、內），貼著羅盤的一側。
//   CONTOUR  外輪廓：飛羽羽尖所在的曲線，由最高的翼尖繞過外側、回到底部中央。
//   每根羽毛：基部在 ARM 上、羽尖朝向 CONTOUR 上對應的點；中羽、覆羽只走到這段距離的一部分。
//   由上到下，羽毛的彎度由「上揚」變成「向內收」，羽尖的鉤也跟著轉向。

import { DEG, H, cubic, toView } from './base.mjs';
import { bender } from './blade.mjs';

const k = H / 400;
const scale = (pts) => pts.map(([x, y]) => [x * k, y * k]);

/** 翼臂：腕點 → 翼根。 */
export const ARM = scale([[-124, 188], [-96, 226], [-60, 266], [-56, 334]]);
/** 飛羽羽尖的外輪廓：翼尖 → 底部中央。 */
export const CONTOUR = scale([[-250, 0], [-318, 110], [-290, 340], [-64, 400]]);

/** 把曲線改成以弧長為參數（0 … 1），羽尖才會沿外輪廓平均分布。 */
function byLength(curve, steps = 200) {
  const table = [0];
  let prev = cubic(curve, 0);
  for (let i = 1; i <= steps; i += 1) {
    const q = cubic(curve, i / steps);
    table.push(table[i - 1] + Math.hypot(q[0] - prev[0], q[1] - prev[1]));
    prev = q;
  }
  return (u) => {
    const want = Math.min(1, Math.max(0, u)) * table[steps];
    let i = 1;
    while (i < steps && table[i] < want) i += 1;
    const span = table[i] - table[i - 1] || 1;
    return cubic(curve, (i - 1 + (want - table[i - 1]) / span) / steps);
  };
}
const contourAt = byLength(CONTOUR);
const armAt = byLength(ARM);

const lerp = (a, b, t) => a + (b - a) * t;

/** 一層的規格。 */
const SPECS = [
  { name: 'flight', count: 13, reach: () => 1, at: (i, n) => i / (n - 1), lead: 0, width: (L) => 12 + 0.09 * L, round: 0 },
  { name: 'mid', count: 11, reach: (p) => 0.7 - 0.12 * p, at: (i) => (i + 0.5) / 12, lead: 0.015, width: (L) => 11 + 0.1 * L, round: 0.3 },
  { name: 'covert', count: 10, reach: (p) => 0.42 - 0.1 * p, at: (i) => (i + 0.25) / 11.5, lead: 0.04, width: (L) => 9 + 0.11 * L, round: 0.8 },
];

const BEND_TOP = -0.09; // 最上面的羽毛：中段往下側，羽尖上揚
const BEND_BOTTOM = 0.12; // 最下面的羽毛：羽尖向內收
const SKEW_TOP = 1;
const SKEW_BOTTOM = -0.7;

/** 羽尖在外輪廓上的位置：越往下排得越密，底部的短羽才不會散開。 */
const spread = (p) => 1 - (1 - Math.min(1, Math.max(0, p))) ** 1.25;
/** 羽尖的鉤：上面的往上鉤，中段略往上，最下面幾根往內鉤。 */
const skewAt = (p) => SKEW_TOP + (SKEW_BOTTOM - SKEW_TOP) * p ** 1.6;

/** 由基部指向 target 的羽毛：反推軸線的終點，讓上鉤之後實際的羽尖落在 target 上。 */
function aim(base, target, skew, widthOf) {
  let end = target;
  let out = {};
  for (let pass = 0; pass < 4; pass += 1) {
    const dx = end[0] - base[0];
    const dy = end[1] - base[1];
    const length = Math.hypot(dx, dy);
    const angle = Math.atan2(-dy, -dx) / DEG;
    const width = widthOf(length);
    const tau = skew * 0.26 * width;
    const a = angle * DEG;
    // 上側（n 正值）在畫面上的方向：(sin a, -cos a)
    end = [target[0] - tau * Math.sin(a), target[1] + tau * Math.cos(a)];
    out = { length, angle, width };
  }
  return out;
}

/**
 * 在翼臂的 p（0 腕點 … 1 翼根）長出一根羽毛。
 * reach：長度佔「完整飛羽」的比例；lead：羽尖往上偏多少；width：長度 → 寬度；round：基部圓鈍的程度。
 * 小標誌也用這個函式，只是羽毛少而寬。
 */
export function featherAt({ p, reach = 1, lead = 0, width = SPECS[0].width, round = 0, index = 0 }) {
  const base = armAt(p);
  const skew = skewAt(p);
  // 先求同一個位置上「完整長度」的飛羽，中羽與覆羽的羽尖落在它彎曲的中線上，才會一層一層貼著疊好
  const outer = contourAt(spread(p - lead));
  const fullBend = lerp(BEND_TOP, BEND_BOTTOM, p);
  const full = aim(base, outer, skew, SPECS[0].width);
  const [s, n] = bender(full.length, fullBend)([reach * full.length, 0]).at;
  const a = full.angle * DEG;
  const target = reach === 1 ? outer : [base[0] - s * Math.cos(a) + n * Math.sin(a), base[1] - s * Math.sin(a) - n * Math.cos(a)];
  const shape = aim(base, target, skew, width);
  const bend = fullBend * reach * (reach === 1 ? 1 : 1.2);
  const [px, py] = toView(base);
  return { index, p, ...shape, bend, skew, round, pivot: { x: px, y: py } };
}

function feather(spec, i) {
  const p = spec.at(i, spec.count);
  return featherAt({ p, reach: spec.reach(p), lead: spec.lead, width: spec.width, round: spec.round, index: i });
}

/**
 * 三層的資料。TIERS[0] 飛羽、[1] 中羽、[2] 覆羽。
 * feathers[i]：{ index, angle（展開角度，度）, length, width, bend, skew, round, pivot（基部，viewBox 座標） }，
 * i = 0 是最上面的一根。
 */
export const TIERS = SPECS.map((spec, t) => ({
  id: t + 1,
  name: spec.name,
  count: spec.count,
  fill: `url(#em-gold-${t + 1})`,
  feathers: Array.from({ length: spec.count }, (_, i) => feather(spec, i)),
}));
