// 金翼羅盤：產生主圖 public/brand/emblem-open.svg。
// 用法：node scripts/emblem/build.mjs
//
// 其餘幾張圖各自寫一個小的 build 檔，匯入 geometry.mjs 組出 SVG 字串後，
// 用這裡匯出的 writeSvg(檔名, svg, 檢查函式) 寫檔。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { emblem } from './geometry.mjs';
import { checkEmblem } from './check.mjs';

export const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public/brand');

/** 先檢查、再寫入 public/brand/<name>。檢查不過就丟出錯誤，不寫檔。 */
export function writeSvg(name, svg, check) {
  const report = check ? check(svg) : {};
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const file = path.join(OUT_DIR, name);
  fs.writeFileSync(file, svg);
  console.log(`${path.relative(process.cwd(), file)}  ${JSON.stringify(report)}`);
  return file;
}

// 只有直接執行這個檔案時才產生主圖；被其他 build 檔匯入時不執行。
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  writeSvg('emblem-open.svg', emblem({ open: 1 }), checkEmblem);
}
