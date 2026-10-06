'use client';

import * as m from 'motion/react-m';
import type { MotionValue } from 'motion/react';
import { useId, useMemo, type CSSProperties } from 'react';
import { EMBLEM_BODY, EMBLEM_CENTER, EMBLEM_PIVOT, EMBLEM_SIZE } from './emblemData';

// 金翼羅盤（2026-10-06 重繪；規範見 docs/06_research-and-design/proposals/emblem/BRIEF.md）。
// 圖形由 scripts/emblem/geometry.mjs 以數學建構，經 build-react.mjs 轉成 emblemData.ts。
// 這是替代用的主視覺圖形，客戶的正式 Logo 到位後替換（RPT-001 G1）。樣式在 app/globals.css 的 .emblem。
//
// - open：雙翼展開程度 0～1，可傳入隨捲動變化的 MotionValue。每根羽毛繞肩點旋轉 --fold × (1 − open)。
// - needle：指針角度（度），0 朝上，順時針。
// - activeMark：亮起的方位點（0 上、1 右、2 下、3 左）。
const DIRS = ['n', 'e', 's', 'w'];

interface WingsCompassProps {
  open?: MotionValue<number> | number;
  needle?: number;
  activeMark?: number | null;
  className?: string;
}

export default function WingsCompass({ open = 1, needle = 0, activeMark = null, className }: WingsCompassProps) {
  // 一頁可能有不只一個金翼羅盤，其中有的在隱藏的容器裡。漸層的 id 若重複，瀏覽器會去找第一個
  // （可能正好是隱藏的那個）而畫不出填色，所以每個實例各用一組自己的 id。
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const body = useMemo(() => EMBLEM_BODY.replaceAll('id="em-', `id="em${uid}-`).replaceAll('url(#em-', `url(#em${uid}-`), [uid]);
  return (
    <m.div
      className={`emblem ${className ?? ''}`}
      role="img"
      aria-label="金色雙翼與羅盤"
      data-active={activeMark === null ? undefined : DIRS[activeMark]}
      style={
        {
          '--open': open,
          '--needle': needle,
          '--pivot': `${EMBLEM_PIVOT.x}px ${EMBLEM_PIVOT.y}px`,
          '--center': `${EMBLEM_CENTER.x}px ${EMBLEM_CENTER.y}px`,
          '--cx': `${(EMBLEM_CENTER.x / EMBLEM_SIZE.width) * 100}%`,
          '--cy': `${(EMBLEM_CENTER.y / EMBLEM_SIZE.height) * 100}%`,
          aspectRatio: `${EMBLEM_SIZE.width} / ${EMBLEM_SIZE.height}`,
        } as unknown as CSSProperties
      }
    >
      <div className="emblem__rays" />
      <div className="emblem__glow" />
      <svg
        className="emblem__svg"
        viewBox={`0 0 ${EMBLEM_SIZE.width} ${EMBLEM_SIZE.height}`}
        fill="none"
        aria-hidden="true"
        focusable="false"
        // 內容是建置時由自家腳本產生的固定字串
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </m.div>
  );
}
