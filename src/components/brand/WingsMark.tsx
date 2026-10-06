import { useId } from 'react';
import { EMBLEM_MARK } from './emblemData';

// 小尺寸的金翼標誌（頁首、頁尾、行動區塊）。圖形來自 public/brand/emblem-mark.svg，
// 經 scripts/emblem/build-react.mjs 轉成 emblemData.ts。暫代圖，正式 Logo 到位後替換（RPT-001 G1）。
const FALLBACK_WING = ['M28 22C21 13 12 8 2 7c6 6 14 12 25 18Z', 'M27 26C20 20 12 17 5 17c5 5 12 9 21 12Z', 'M26 30c-5-3-11-5-16-4 4 3 10 6 16 6Z'];

export default function WingsMark({ className }: { className?: string }) {
  // 同一頁會出現多個小標誌（頁首、頁尾、行動區塊），漸層 id 各用一組，理由同 WingsCompass
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  if (EMBLEM_MARK) {
    const inner = EMBLEM_MARK.inner.replaceAll('id="emk-', `id="emk${uid}-`).replaceAll('url(#emk-', `url(#emk${uid}-`);
    return (
      <svg
        viewBox={EMBLEM_MARK.viewBox}
        className={className}
        fill="none"
        aria-hidden="true"
        focusable="false"
        // 內容是建置時由自家腳本產生的固定字串
        dangerouslySetInnerHTML={{ __html: inner }}
      />
    );
  }
  // 小標誌尚未產生時的舊圖形
  return (
    <svg viewBox="0 0 72 44" className={className} aria-hidden="true" focusable="false">
      <g fill="#C9862E">
        {FALLBACK_WING.map((d) => (
          <path key={d} d={d} />
        ))}
        <g transform="translate(72 0) scale(-1 1)">
          {FALLBACK_WING.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>
      <circle cx="36" cy="26" r="10" fill="#FFFDF0" stroke="#C9862E" strokeWidth="2" />
      <path d="M36 18l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#B5762A" />
    </svg>
  );
}
