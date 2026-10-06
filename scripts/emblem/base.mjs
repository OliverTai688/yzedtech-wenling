// 金翼羅盤（第二版）：基本常數、色盤與小工具。geometry.mjs 會把公開的項目重新匯出。
// 依據 docs/06_research-and-design/proposals/emblem/BRIEF.md §7。

// ---------------------------------------------------------------- 色盤（金、青銅、銀、珍珠白）

export const PALETTE = {
  outline: '#8A5415', // 青銅輪廓線
  deep: '#6B3F0E', // 羽毛重疊處最深的青銅
  gold1: ['#7A4A12', '#B5762A', '#EDBB55'], // 飛羽：基部（被蓋住）→ 中段 → 羽尖
  gold2: ['#9A621C', '#D89A3E', '#F3CB6C'], // 中羽
  gold3: ['#BE8830', '#F0C96E', '#FFF0BD'], // 覆羽
  rim: '#FFF3C4', // 羽毛邊緣的亮邊、羽軸
  glint: '#FFFBE6', // 亮片
  silver: '#E3E1DC',
  silverLight: '#FAFAF8',
  silverShade: '#C4C1BA',
  pearl: '#FFFDF0', // 盤面（極淡）
  needleGold: '#C9862E',
  ink: '#3A2A18', // 只用在軸心的小點
};

// ---------------------------------------------------------------- 尺寸（以單翼高度 H 為準）

/** 單翼高度。其他尺寸都是它的比例（BRIEF §7 的比例）。 */
export const H = 400;
/** 羅盤外徑：0.22 × H。 */
export const D = 0.22 * H;
/** 輪廓線寬：羽毛與羅盤外環共用。 */
export const STROKE = 1;
/** 圖形外的留白。 */
export const MARGIN = 16;
/** 左翼最外側離中軸的距離（兩翼頂端相距 1.25 H，約為整體寬度的九成）。 */
export const HALF_SPAN = 0.6975 * H;

const HALF_W = Math.ceil(HALF_SPAN + MARGIN);
/** 展開圖的 viewBox：[x, y, 寬, 高]。 */
export const VIEWBOX = [0, 0, HALF_W * 2, H + MARGIN * 2];
/** 羅盤圓心：離底部 0.24 H。 */
export const CENTER = { x: HALF_W, y: MARGIN + 0.76 * H };

/** 設計座標（中軸 x = 0、翼尖頂端 y = 0、左翼 x 為負）→ viewBox 座標。 */
export const toView = ([x, y]) => [HALF_W + x, MARGIN + y];

// ---------------------------------------------------------------- 小工具

export const DEG = Math.PI / 180;

/** 輸出用的數字：一位小數，去掉多餘的 0。 */
export function num(v) {
  const s = (Math.round(v * 10) / 10).toString();
  return s === '-0' ? '0' : s.replace(/^(-?)0\./, '$1.');
}

export const pt = ([x, y]) => `${num(x)} ${num(y)}`;

/** 三次貝茲曲線上的點。 */
export function cubic([a, b, c, d], t) {
  const u = 1 - t;
  return [0, 1].map((k) => u ** 3 * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t ** 3 * d[k]);
}

/** 固定種子的亂數（mulberry32）：每次建置結果相同。 */
export function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
