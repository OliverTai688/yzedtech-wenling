// 金翼羅盤（第二版）：輸出前的自我檢查（BRIEF §5、§7 之中可以用程式判斷的項目）。
// 其他幾張圖的 build 檔也可以匯入 checkEmblem / checkCommon 使用。

import { fileURLToPath, pathToFileURL } from 'node:url';
import { CENTER, D, H, PALETTE, TIERS, VIEWBOX, featherPoints } from './geometry.mjs';
import { POSE } from './pose.mjs';

/** 主圖、收攏圖、分解圖的大小上限（BRIEF §7）。 */
export const MAX_BYTES = 45 * 1024;
/** 每層帶幾條路徑：輪廓、（飛羽與中羽的）暗面、亮線。 */
const PATHS_PER_FEATHER = [3, 3, 2];

function fail(message) {
  throw new Error(`emblem check: ${message}`);
}

/** 取出某個 id 的 <g> 的內容（開頭標籤之後、對應的結尾標籤之前）。 */
function groupInner(svg, id) {
  const open = new RegExp(`<g id="${id}"[^>]*>`).exec(svg);
  if (!open) fail(`找不到 #${id}`);
  let depth = 1;
  const tag = /<g\b|<\/g>/g;
  tag.lastIndex = open.index + open[0].length;
  for (let m = tag.exec(svg); m; m = tag.exec(svg)) {
    depth += m[0] === '</g>' ? -1 : 1;
    if (depth === 0) return svg.slice(open.index + open[0].length, m.index);
  }
  return fail(`#${id} 沒有結尾`);
}

/** 每張圖都適用的檢查：大小、禁用的元素、色盤以外的顏色、漸層 id 與色階數。 */
export function checkCommon(svg, maxBytes = MAX_BYTES) {
  const bytes = Buffer.byteLength(svg);
  if (bytes > maxBytes) fail(`檔案 ${bytes} bytes，超過 ${maxBytes}`);
  if (!/<svg[^>]*viewBox="/.test(svg)) fail('缺少 viewBox');
  if (/<svg[^>]*\s(width|height)=/.test(svg)) fail('<svg> 不可有固定的寬高');
  for (const banned of ['<filter', '<mask', '<text', '<script', '<image', '<style', 'href=', '<rect']) {
    if (svg.includes(banned)) fail(`不可使用 ${banned}`);
  }
  const allowed = new Set(Object.values(PALETTE).flat().map((c) => c.toUpperCase()));
  for (const [color] of svg.matchAll(/#[0-9A-Fa-f]{6}\b/g)) {
    if (!allowed.has(color.toUpperCase())) fail(`色盤以外的顏色 ${color}`);
  }
  for (const [, id, body] of svg.matchAll(/<(?:linear|radial)Gradient id="([^"]+)"[^>]*>(.*?)<\/(?:linear|radial)Gradient>/g)) {
    if (!/^emk?-/.test(id)) fail(`漸層 id 要以 em- 開頭：${id}`);
    if ((body.match(/<stop/g) || []).length > 3) fail(`漸層 ${id} 超過三個色階`);
  }
  return { bytes };
}

/** 幾何的檢查：三層、數量與收攏姿態一致、角度單調、比例符合 BRIEF §7。 */
export function checkGeometry() {
  if (TIERS.length !== 3) fail('應該恰好三層');
  TIERS.forEach((tier, t) => {
    const fs = tier.feathers;
    if (fs.length !== tier.count) fail(`TIERS[${t}] 的數量與 count 不符`);
    if (POSE.tiers[t].length !== fs.length) fail(`pose.mjs 第 ${t} 層有 ${POSE.tiers[t].length} 個角度，應為 ${fs.length}`);
    fs.forEach((f, i) => {
      if (!i) return;
      if (f.angle >= fs[i - 1].angle) fail(`TIERS[${t}] 的展開角度不是由上往下遞減`);
      if (POSE.tiers[t][i] < POSE.tiers[t][i - 1]) fail(`pose.mjs 第 ${t} 層的收攏角度不單調`);
    });
    if (t && Math.max(...fs.map((f) => f.length)) >= Math.max(...TIERS[t - 1].feathers.map((f) => f.length))) fail(`TIERS[${t}] 應該比上一層短`);
  });
  if (TIERS[0].count < 12 || TIERS[0].count > 14) fail('飛羽應為 12–14 根');
  // 方向：最上面的朝上偏外，中段朝外，最下面的朝下
  const [top, bottom] = [TIERS[0].feathers[0], TIERS[0].feathers.at(-1)];
  if (top.angle < 45 || top.angle > 80) fail(`最上面的飛羽角度 ${top.angle.toFixed(1)} 不在 45–80`);
  if (bottom.angle > -60) fail(`最下面的飛羽角度 ${bottom.angle.toFixed(1)} 應該朝下`);
  if (bottom.length > top.length * 0.5) fail('最下面的飛羽應該明顯較短');
  // 比例（以單翼高度 H 為 1）
  const pts = TIERS.flatMap((tier, t) => tier.feathers.flatMap((f) => featherPoints(t, f)));
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const height = Math.max(...ys) - Math.min(...ys);
  const width = Math.max(...xs) - Math.min(...xs);
  const tip = pts.reduce((a, b) => (b[1] < a[1] ? b : a));
  const ratios = {
    wingHeight: height / H,
    wingWidth: width / height,
    tipSpan: (2 * (CENTER.x - tip[0])) / height,
    compass: D / height,
    compassAbove: (Math.max(...ys) - CENTER.y) / height,
    gap: (2 * (CENTER.x - Math.max(...xs))) / D,
  };
  const within = (key, lo, hi) => {
    if (ratios[key] < lo || ratios[key] > hi) fail(`比例 ${key} = ${ratios[key].toFixed(3)}，應在 ${lo}–${hi}`);
  };
  within('wingHeight', 0.97, 1.04);
  within('wingWidth', 0.52, 0.66);
  within('tipSpan', 1.15, 1.32);
  within('compass', 0.2, 0.24);
  within('compassAbove', 0.2, 0.28);
  within('gap', 1.02, 1.5);
  if (Math.min(...xs) < 0 || Math.min(...ys) < 0 || Math.max(...ys) > VIEWBOX[3]) fail('展開的羽毛超出 viewBox');
  return Object.fromEntries(Object.entries(ratios).map(([k, v]) => [k, Math.round(v * 1000) / 1000]));
}

/** 完整圖（展開、收攏）的檢查：羽毛數量、右翼是左翼的鏡射、羅盤的零件齊全。 */
export function checkEmblem(svg) {
  const { bytes } = checkCommon(svg);
  checkGeometry();

  const left = groupInner(svg, 'wing-l');
  const right = groupInner(svg, 'wing-r');
  if (left !== right) fail('右翼的內容與左翼不同，不是鏡射');
  if (!/<g id="wing-r" transform="translate\([\d.]+ 0\) scale\(-1 1\)"/.test(svg)) fail('右翼缺少鏡射的 transform');

  const counts = TIERS.map((tier, t) => {
    const start = left.indexOf(`<g class="tier tier-${tier.id}"`);
    if (start < 0) fail(`左翼缺少 tier-${tier.id}`);
    const next = left.indexOf('<g class="tier', start + 1);
    const end = next < 0 ? left.indexOf('<g class="sparkles"') : next;
    const body = left.slice(start, end < 0 ? undefined : end);
    const count = (body.match(/<g class="f" style="--fold:-?[\d.]+deg;--pivot:[\d.]+px [\d.]+px"/g) || []).length;
    if (count !== tier.count) fail(`tier-${tier.id} 有 ${count} 根帶 --fold／--pivot 的羽毛，應為 ${tier.count}`);
    if ((body.match(/<path/g) || []).length !== count * PATHS_PER_FEATHER[t]) fail(`tier-${tier.id} 每根羽毛的路徑數不對`);
    return count;
  });
  if ((svg.match(/<g class="sparkles"/g) || []).length > 2) fail('亮片群組每翼最多一個');

  for (const id of ['compass', 'compass-ring', 'compass-inner', 'compass-ticks', 'dial', 'rose', 'needle', 'pin']) {
    if ((svg.match(new RegExp(`id="${id}"`, 'g')) || []).length !== 1) fail(`#${id} 應該恰好一個`);
  }
  for (const dir of ['n', 'e', 's', 'w']) {
    if (!svg.includes(`<g class="mark" data-dir="${dir}">`)) fail(`缺少方位點 ${dir}`);
  }
  const ticks = (svg.match(/class="tick"/g) || []).length;
  if (ticks !== 4) fail(`斜向刻度有 ${ticks} 個，應為 4`);

  const elements = (svg.match(/<(path|circle|ellipse|line|polygon)\b/g) || []).length;
  return { bytes, feathers: counts, elements };
}

// 直接執行：檢查幾何，並重新檢查已經產生的四張圖。
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public/brand');
  console.log('geometry', JSON.stringify(checkGeometry()));
  for (const [name, check] of [
    ['emblem-open.svg', checkEmblem],
    ['emblem-folded.svg', checkEmblem],
    ['emblem-exploded.svg', checkCommon],
    ['emblem-mark.svg', (svg) => checkCommon(svg, 4096)],
  ]) {
    const svg = fs.readFileSync(path.join(dir, name), 'utf8');
    console.log(name, /viewBox="([^"]+)"/.exec(svg)[1], JSON.stringify(check(svg)));
  }
}
