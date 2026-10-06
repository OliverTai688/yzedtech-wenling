'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import './stage.css';
import './stage-layout.css';
import './stage-book.css';
import './stage-routes.css';
import './stage-sheet.css';
import './stage-rest.css';
import './stage-media.css';
import { emblemVars } from './emblemGeo';
import { StageBackdrop, StageDust, StageFly } from './StageScenery';
import StageHero from './StageHero';
import StageBook from './StageBook';
import StageRoutes from './StageRoutes';
import StageSheet, { type SheetState } from './StageSheet';
import { useStage } from './useStage';
import type { OpenSheet, StageBus } from './types';

// 首頁舞台：slide 01 Hero、02 書、03 三階段（RES-005 §3、§4）。
// 預設輸出是一般的直向頁面（伺服器輸出、沒有 JavaScript 也完整可讀）。
// <html> 有 js 類別、沒有開啟「減少動態效果」且視窗夠高時，stage-*.css 才把它排成舞台，
// useStage 再接上以捲動推進的時間軸。slide 04～07 由 app/page.tsx 以 children 傳進來，排在同一個舞台根元素裡，
// 飛行的金翼才能一路飛到創辦人身後（固定圖層只在根元素的範圍內看得到）。
/** 面板打開後，捲動超過這個距離就自動收起（內容已經換景） */
const SHEET_SCROLL_AWAY = 140;

export default function HomeStage({ children }: { children?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [bus] = useState<StageBus>(() => ({ live: false }));
  const [sheet, setSheet] = useState<SheetState | null>(null);
  const openSheet: OpenSheet = useCallback((next, trigger) => {
    setSheet((current) => (current?.key === next.key ? null : { ...next, trigger }));
  }, []);
  const closeSheet = useCallback(() => setSheet(null), []);

  useStage(root, bus);

  useEffect(() => {
    if (!sheet) return;
    const from = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - from) > SHEET_SCROLL_AWAY) setSheet(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sheet]);

  return (
    <div ref={root} className="st-root" style={emblemVars}>
      <StageBackdrop />
      <StageFly />
      <StageHero onMore={openSheet} />
      <StageBook bus={bus} />
      <StageRoutes onMore={openSheet} />
      {children}
      <StageDust />
      <StageSheet sheet={sheet} onClose={closeSheet} />
    </div>
  );
}
