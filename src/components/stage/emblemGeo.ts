import type { CSSProperties } from 'react';
import { EMBLEM_CENTER, EMBLEM_SIZE } from '../brand/emblemData';

// 金翼羅盤的比例，全部由 emblemData.ts 推得（圖形重繪後自動跟著變）。
// 舞台上所有金翼的大小與位置都以「寬度」與「羅盤中心」表示，不寫死像素。
export const EM_AR = EMBLEM_SIZE.width / EMBLEM_SIZE.height;
export const EM_CX = EMBLEM_CENTER.x / EMBLEM_SIZE.width;
export const EM_CY = EMBLEM_CENTER.y / EMBLEM_SIZE.height;

/** 放在舞台根元素上，供 stage.css 取用 */
export const emblemVars = {
  '--em-ar': EM_AR,
  '--em-cx': EM_CX,
  '--em-cy': EM_CY,
} as CSSProperties;

/** Hero 載入時雙翼的展開程度（半收攏）；伺服器輸出與飛行中的金翼共用，接手時才不會跳動 */
export const HERO_OPEN = 0.46;
/** 三階段開場時尚未點亮的羽毛層不透明度 */
export const TIER_DIM = 0.26;

/** 每張 slide 釘住的長度（以舞台高度為單位）；必須與 stage-layout.css、stage-book.css 的 --pin 一致。
 *  書這一張的節拍在 timelines/bookPlan.ts（捲動只翻到每個對象的第一頁，其餘由訪客按箭頭翻）。 */
export const PIN = {
  mobile: { hero: 0.8, book: 1.5, routes: 1.2 },
  desktop: { hero: 1, book: 2, routes: 1.5 },
};
export type StageMode = keyof typeof PIN;

/** 舞台版面的啟用條件；必須與 stage.css 的 @media 一致 */
export const STAGE_MQ = '(prefers-reduced-motion: no-preference) and (min-height: 600px)';
