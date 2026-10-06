// 金翼羅盤（第二版）：羅盤——小、線稿、像刻上去的。
// 雙層外環、一圈細刻度、十六芒玫瑰（四長、四中、八短）、中心小圓、四個獨立的方位點、細指針。

import { CENTER, D, DEG, PALETTE, STROKE, num, pt } from './base.mjs';

const R = D / 2;
/** 羅盤各部分的半徑（分解圖也會用到）。 */
export const COMPASS = {
  ringOut: R, // 外環的外圈
  ringIn: R * 0.925, // 外環的內圈
  tickOut: R * 0.885, // 刻度的外端
  tickIn: R * 0.815, // 細刻度的內端
  tickMid: R * 0.785, // 每 15° 的刻度
  tickLong: R * 0.75, // 四個斜向的刻度（.tick）
  mark: R * 0.84, // 方位點所在的半徑
  markR: R * 0.062, // 方位點的大小
  inner: R * 0.72, // 內環
  roseLong: R * 0.69,
  roseMid: R * 0.48,
  roseShort: R * 0.36,
  needle: R * 0.8, // 指針的長端
  needleTail: R * 0.34,
  needleW: R * 0.045,
  pin: R * 0.075,
};
const C = COMPASS;
const LINE = STROKE * 0.55; // 細線

const translate = (shift) => (shift ? ` transform="translate(${num(shift[0])} ${num(shift[1])})"` : '');

/**
 * 羅盤的 SVG 片段。
 * @param {object} o
 * @param {number} [o.needle] 指針角度（度）：0 朝上，順時針
 * @param {object} [o.shift]  選用：把某個零件平移，鍵是 ring／marks／inner／dial／rose／needle／pin，分解圖用
 */
export function compass({ needle = 0, shift = {} } = {}) {
  const { x: cx, y: cy } = CENTER;
  const polar = (r, deg) => [cx + r * Math.sin(deg * DEG), cy - r * Math.cos(deg * DEG)];
  const circle = (r, extra = '') => `<circle cx="${num(cx)}" cy="${num(cy)}" r="${num(r)}"${extra}/>`;

  const dial = `<circle id="dial" cx="${num(cx)}" cy="${num(cy)}" r="${num(C.ringOut)}" fill="${PALETTE.pearl}" fill-opacity=".9" stroke="none"${translate(shift.dial)}/>`;
  const ring = `<g id="compass-ring" stroke="url(#em-ring)"${translate(shift.ring)}>${circle(C.ringOut, ` stroke-width="${num(STROKE * 1.5)}"`)}${circle(C.ringIn, ` stroke-width="${num(LINE)}"`)}</g>`;

  // 一圈細刻度：每 5° 一條；15° 的倍數較長；四個正方位留給方位點，四個斜向另外畫成 .tick
  let fine = '';
  for (let deg = 5; deg < 360; deg += 5) {
    if (deg % 45 === 0 || deg % 90 === 5 || deg % 90 === 85) continue; // 方位點兩旁各讓出一格
    fine += `M${pt(polar(C.tickOut, deg))}L${pt(polar(deg % 15 === 0 ? C.tickMid : C.tickIn, deg))}`;
  }
  const ticks = [45, 135, 225, 315].map((deg) => `<path class="tick" d="M${pt(polar(C.tickOut, deg))}L${pt(polar(C.tickLong, deg))}" stroke-width="${num(STROKE * 0.9)}"/>`);
  const marks = [['n', 0], ['e', 90], ['s', 180], ['w', 270]].map(([dir, deg]) => {
    const [x, y] = polar(C.mark, deg);
    return `<g class="mark" data-dir="${dir}"><circle cx="${num(x)}" cy="${num(y)}" r="${num(C.markR)}" fill="${PALETTE.gold2[1]}"/></g>`;
  });
  const scale = `<g id="compass-marks" stroke-width="${num(LINE)}"${translate(shift.marks)}><path id="compass-ticks" d="${fine}"/>${ticks.join('')}${marks.join('')}</g>`;

  const inner = `<circle id="compass-inner" cx="${num(cx)}" cy="${num(cy)}" r="${num(C.inner)}" stroke-width="${num(LINE)}"${translate(shift.inner)}/>`;

  // 十六芒玫瑰：每個芒是一個箏形，對分成深、淺兩半
  const layer = (tips, tipR, waistR, half) => {
    let dark = '';
    let light = '';
    for (const deg of tips) {
      const tip = pt(polar(tipR, deg));
      dark += `M${num(cx)} ${num(cy)}L${pt(polar(waistR, deg - half))}L${tip}Z`;
      light += `M${num(cx)} ${num(cy)}L${tip}L${pt(polar(waistR, deg + half))}Z`;
    }
    return `<path d="${dark}" fill="${PALETTE.gold1[1]}"/><path d="${light}" fill="${PALETTE.gold3[2]}"/>`;
  };
  const range = (from, step, count) => Array.from({ length: count }, (_, i) => from + step * i);
  const rose = `<g id="rose" stroke-width="${num(LINE)}"${translate(shift.rose)}>${layer(range(22.5, 45, 8), C.roseShort, C.roseShort * 0.52, 11.25)}${layer(range(45, 90, 4), C.roseMid, C.roseMid * 0.3, 22.5)}${layer(range(0, 90, 4), C.roseLong, C.roseLong * 0.2, 45)}</g>`;

  const move = shift.needle ? `translate(${num(shift.needle[0])} ${num(shift.needle[1])}) ` : '';
  const turn = needle || shift.needle ? ` transform="${move}rotate(${num(needle)} ${num(cx)} ${num(cy)})"` : '';
  const tipN = pt([cx, cy - C.needle]);
  const tail = pt([cx, cy + C.needleTail]);
  const needleG = `<g id="needle" stroke-width="${num(LINE)}"${turn}><path d="M${tipN}L${pt([cx - C.needleW, cy])}L${tail}Z" fill="${PALETTE.gold1[0]}"/><path d="M${tipN}L${pt([cx + C.needleW, cy])}L${tail}Z" fill="${PALETTE.gold2[2]}"/></g>`;

  const pin = `<g id="pin" stroke-width="${num(LINE)}"${translate(shift.pin)}>${circle(C.pin, ` fill="${PALETTE.rim}"`)}${circle(C.pin * 0.3, ` fill="${PALETTE.ink}" stroke="none"`)}</g>`;

  return `<g id="compass" stroke="${PALETTE.outline}" stroke-width="${num(STROKE)}" stroke-linejoin="round" stroke-linecap="round">${dial}${ring}${scale}${inner}${rose}${needleG}${pin}</g>`;
}
