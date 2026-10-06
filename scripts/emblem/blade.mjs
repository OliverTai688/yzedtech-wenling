// 金翼羅盤（第二版）：一根羽毛的形狀——尖頭、略帶上鉤的刀葉。
// 羽毛自己的座標：s 沿軸向（基部 0 → 羽尖 length），n 垂直軸向（正值是上側，也就是前緣）。

import { DEG } from './base.mjs';

/**
 * 把中線彎成圓弧。基部 (0,0) 與 (length,0) 的位置不變。
 * bend = 弧高 ÷ 長度；正值中段往上側拱（羽尖往下垂），負值中段往下側（羽尖上揚）。
 * 回傳彎曲後的點，以及把該點上的方向向量一併轉過去的函式（貝茲把手用，接點才平順）。
 */
export function bender(length, bend) {
  if (!bend) return ([s, n]) => ({ at: [s, n], turn: (v) => v });
  const sag = Math.abs(bend) * length;
  const sign = Math.sign(bend);
  const radius = (length * length) / (8 * sag) + sag / 2;
  const alpha = Math.asin(length / (2 * radius));
  const rate = (2 * alpha) / length;
  return ([s, n]) => {
    const a = ((2 * s) / length - 1) * alpha;
    const r = radius + sign * n;
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    return {
      at: [length / 2 + r * sin, sign * (r * cos - (radius - sag))],
      turn: ([ds, dn]) => [r * cos * rate * ds + sign * sin * dn, -sign * r * sin * rate * ds + cos * dn],
    };
  };
}

// 刀葉的比例
const UPPER = 0.42; // 前緣（上側）佔寬度的比例；後緣較寬
const WIDEST_U = 0.4; // 前緣最寬處在長度的位置
const WIDEST_L = 0.5; // 後緣最寬處
const HOOK_ANGLE = 24; // skew = 1 時羽尖上鉤的角度（度）
const TIP_HALF = 12; // 羽尖夾角的一半（度）
const TIP_REACH = 0.2; // 羽尖把手的長度 ÷ 長度

/**
 * 刀葉的控制點：起點加四段三次貝茲曲線（基部 → 前緣最寬 → 羽尖 → 後緣最寬 → 基部）。
 * skew：羽尖偏向前緣並上鉤的程度（-1 … 1，負值鉤向後緣）。round：基部的圓鈍程度（0 尖 … 1 圓）。
 */
export function bladeSegments(length, width, { bend = 0, skew = 0.6, round = 0 } = {}) {
  const hu = width * UPPER;
  const hl = width * (1 - UPPER);
  const tau = skew * 0.26 * width;
  const phi = skew * HOOK_ANGLE * DEG;
  const eps = TIP_HALF * DEG;
  const m = TIP_REACH * length;
  const baseOut = 0.12 * (1 - round) * length + 0.01 * length;
  const map = bender(length, bend);
  const nodes = [
    { p: [0, 0], out: [baseOut, hu * (0.7 + 0.5 * round)] },
    { p: [WIDEST_U * length, hu], in: [-0.2 * length, 0], out: [0.26 * length, 0] },
    { p: [length, tau], in: [-m * Math.cos(phi - eps), -m * Math.sin(phi - eps)], out: [-m * Math.cos(phi + eps), -m * Math.sin(phi + eps)] },
    { p: [WIDEST_L * length, -hl], in: [0.26 * length, 0], out: [-0.24 * length, 0] },
    { p: [0, 0], in: [baseOut, -hl * (0.7 + 0.5 * round)] },
  ].map((node) => {
    const { at, turn } = map(node.p);
    const add = (v) => (v ? [at[0] + turn(v)[0], at[1] + turn(v)[1]] : undefined);
    return { at, in: add(node.in), out: add(node.out) };
  });
  return { start: nodes[0].at, curves: nodes.slice(1).map((node, i) => [nodes[i].out, node.in, node.at]) };
}

/** 羽軸：由基部到羽尖前一點的二次曲線，三個點 [起點, 控制點, 終點]。 */
export function veinSegment(length, width, { bend = 0, skew = 0.6 } = {}) {
  const tau = skew * 0.26 * width;
  const map = (p) => bender(length, bend)(p).at;
  const from = map([0.04 * length, 0]);
  const to = map([0.93 * length, tau * 0.72]);
  const mid = map([0.5 * length, -0.04 * width]);
  return [from, [2 * mid[0] - (from[0] + to[0]) / 2, 2 * mid[1] - (from[1] + to[1]) / 2], to];
}

/** 把三次曲線切出 t0 … t1 的一段（de Casteljau）。 */
function slice([a, b, c, d], t0, t1) {
  const mix = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const head = (pts, t) => {
    const ab = mix(pts[0], pts[1], t);
    const bc = mix(pts[1], pts[2], t);
    const cd = mix(pts[2], pts[3], t);
    const abc = mix(ab, bc, t);
    const bcd = mix(bc, cd, t);
    return [[pts[0], ab, abc, mix(abc, bcd, t)], [mix(abc, bcd, t), bcd, cd, pts[3]]];
  };
  const [, tail] = head([a, b, c, d], t0);
  return head(tail, (t1 - t0) / (1 - t0))[0];
}

/**
 * 亮邊：貼著前緣內側的一條細線。前緣的兩段曲線各取中間一段、往內平移，
 * 回傳七個點：起點、第一段的三個控制點、第二段的三個控制點。
 */
export function rimSegment(length, width, opts = {}) {
  const { start, curves } = bladeSegments(length, width, { ...opts, bend: 0 });
  const inset = Math.min(1.7, width * 0.09);
  const map = bender(length, opts.bend ?? 0);
  const first = slice([start, ...curves[0]], 0.45, 1);
  const second = slice([curves[0][2], ...curves[1]], 0, 0.7);
  return [...first, ...second.slice(1)].map(([s, n]) => map([s, n - inset]).at);
}

/**
 * 暗面：後緣（下側）那一半的月牙形，疊一層半透明的深青銅，讓羽毛有浮雕的厚度。
 * 回傳起點（羽尖）、沿後緣回到基部的兩段三次曲線，以及由基部回到羽尖的二次曲線控制點。
 */
export function shadeSegments(length, width, opts = {}) {
  const { curves } = bladeSegments(length, width, opts);
  const tau = (opts.skew ?? 0.6) * 0.26 * width;
  const back = bender(length, opts.bend ?? 0)([0.5 * length, -0.2 * width - 0.4 * tau]).at;
  const tip = curves[1][2];
  // 二次曲線經過 back 所需的控制點
  const ctrl = [2 * back[0] - (tip[0] + curves[3][2][0]) / 2, 2 * back[1] - (tip[1] + curves[3][2][1]) / 2];
  return { tip, lower: [curves[2], curves[3]], ctrl };
}
