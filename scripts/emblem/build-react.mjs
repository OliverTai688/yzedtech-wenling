// 把金翼羅盤的幾何轉成網站元件用的資料：node scripts/emblem/build-react.mjs
// 產出 src/components/brand/emblemData.ts（自動產生，不要手改）。
// 幾何或收攏姿態（geometry.mjs／pose.mjs）或小標誌（public/brand/emblem-mark.svg）有變動時重新執行。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CENTER, DEFS, PIVOT, VIEWBOX, compass, wing } from './geometry.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const round = (n) => Math.round(n * 100) / 100;

// 展開姿態的內容；收攏靠 CSS 依每根羽毛的 --fold 與外層的 --open 旋轉（app/globals.css 的 .emblem）。
const body = DEFS + wing({ side: 'l', open: 1 }) + wing({ side: 'r', open: 1 }) + compass({ needle: 0 });

const markFile = path.join(root, 'public/brand/emblem-mark.svg');
let mark = null;
if (fs.existsSync(markFile)) {
  const svg = fs.readFileSync(markFile, 'utf8');
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1];
  const inner = /<svg[^>]*>([\s\S]*)<\/svg>/.exec(svg)?.[1]?.trim();
  if (viewBox && inner) mark = { viewBox, inner };
}

const out = `// 自動產生：node scripts/emblem/build-react.mjs。不要手動修改。
// 來源：scripts/emblem/geometry.mjs、pose.mjs、public/brand/emblem-mark.svg（規範見 proposals/emblem/BRIEF.md）。

/** 展開圖的 viewBox（寬、高） */
export const EMBLEM_SIZE = { width: ${round(VIEWBOX[2])}, height: ${round(VIEWBOX[3])} };
/** 羅盤中心與左翼肩點（viewBox 座標）；右翼是鏡射 */
export const EMBLEM_CENTER = { x: ${round(CENTER.x)}, y: ${round(CENTER.y)} };
export const EMBLEM_PIVOT = { x: ${round(PIVOT.x)}, y: ${round(PIVOT.y)} };
/** <svg> 的內容：defs、左翼、右翼、羅盤 */
export const EMBLEM_BODY = ${JSON.stringify(body)};
/** 小標誌（頁首、頁尾）；尚未產生時為 null */
export const EMBLEM_MARK: { viewBox: string; inner: string } | null = ${JSON.stringify(mark)};
`;
fs.writeFileSync(path.join(root, 'src/components/brand/emblemData.ts'), out);
console.log(JSON.stringify({ bytes: out.length, mark: !!mark }));
