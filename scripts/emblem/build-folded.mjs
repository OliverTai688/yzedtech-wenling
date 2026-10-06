// 金翼羅盤：產生收攏圖 public/brand/emblem-folded.svg。
// 用法：node scripts/emblem/build-folded.mjs
//
// 圖形完全來自 geometry.mjs（open = 0）與 pose.mjs 的收攏角度；這裡只負責算出剛好包住收攏姿態的 viewBox。
// 座標系與主圖相同（羅盤圓心仍是 CENTER），所以收攏圖與主圖可以直接疊在一起做動畫。

import { pathToFileURL } from 'node:url';
import { CENTER, D, TIERS, emblem, featherPoints } from './geometry.mjs';
import { MARGIN } from './base.mjs';
import { POSE } from './pose.mjs';
import { checkEmblem } from './check.mjs';
import { writeSvg } from './build.mjs';

/**
 * 某個開合程度下，剛好包住整張圖的 viewBox（左右對稱於 CENTER.x，四邊留白與主圖相同）。
 * 取每根羽毛輪廓的取樣點與羅盤外圓的範圍，再加留白並取整數。
 */
export function fitViewBox({ open = 0, pose = POSE } = {}) {
  let reach = D / 2; // 離中軸最遠的水平距離
  let minY = CENTER.y - D / 2;
  let maxY = CENTER.y + D / 2;
  TIERS.forEach((tier, t) => {
    for (const f of tier.feathers) {
      for (const [x, y] of featherPoints(t, f, open, pose)) {
        reach = Math.max(reach, Math.abs(x - CENTER.x));
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  });
  const halfW = Math.ceil(reach + MARGIN);
  const top = Math.floor(minY - MARGIN);
  const bottom = Math.ceil(maxY + MARGIN);
  return [CENTER.x - halfW, top, halfW * 2, bottom - top];
}

// 只有直接執行這個檔案時才寫檔；被其他檔案匯入時不執行。
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const viewBox = fitViewBox({ open: 0 });
  writeSvg('emblem-folded.svg', emblem({ open: 0, viewBox }), checkEmblem);
  console.log(`viewBox ${viewBox.join(' ')}`);
}
