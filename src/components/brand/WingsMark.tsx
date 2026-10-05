// 小尺寸的金翼標誌（頁首、頁尾用）。暫代圖，正式 Logo 到位後替換（RPT-001 G1）。
const WING = ['M28 22C21 13 12 8 2 7c6 6 14 12 25 18Z', 'M27 26C20 20 12 17 5 17c5 5 12 9 21 12Z', 'M26 30c-5-3-11-5-16-4 4 3 10 6 16 6Z'];

export default function WingsMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 44" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wm-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8B15A" />
          <stop offset="1" stopColor="#B5762A" />
        </linearGradient>
      </defs>
      <g fill="url(#wm-g)">
        {WING.map((d) => (
          <path key={d} d={d} />
        ))}
        <g transform="translate(72 0) scale(-1 1)">
          {WING.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>
      <circle cx="36" cy="26" r="10" fill="#FFFDF0" stroke="url(#wm-g)" strokeWidth="2" />
      <path d="M36 18l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#B5762A" />
    </svg>
  );
}
