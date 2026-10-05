'use client';

import * as m from 'motion/react-m';
import type { MotionValue } from 'motion/react';
import type { CSSProperties } from 'react';

// 金翼羅盤圖形（RES-002 §1：取自首頁提案 C 自繪的 SVG）。
// 這是暫代圖：客戶的 Logo 向量檔到位後替換（RPT-001 G1）。樣式在 app/globals.css 的 .emblem。
//
// - open：雙翼展開程度 0～1，可傳入隨捲動變化的 MotionValue。
// - needle：指針角度（度），0 朝上，順時針。
// - activeMark：亮起的方位（0 上、1 右、2 下、3 左）。
const FEATHER = 'M0 0C-20-9-64-12-94-2Q-101 1-97 5C-66 10-22 7 0 0Z';
const VEIN = 'M-8 0Q-52-3-92 1';

const LAYERS = [
  {
    fill: 'url(#wc-gA)',
    strokeOpacity: 0.5,
    feathers: [
      [-22, 1.34, 1.2, -28], [-13.5, 1.62, 1.3, -35], [-5, 1.9, 1.4, -42], [3.5, 2.16, 1.45, -49], [12, 2.38, 1.5, -56],
      [20.5, 2.52, 1.55, -63], [29, 2.58, 1.55, -70], [37.5, 2.52, 1.5, -77], [46, 2.36, 1.45, -84],
    ],
  },
  {
    fill: 'url(#wc-gB)',
    strokeOpacity: 0.42,
    feathers: [
      [-20, 1.04, 1.3, -26], [-10, 1.24, 1.3, -35], [0, 1.42, 1.3, -44], [10, 1.55, 1.3, -53],
      [20, 1.62, 1.3, -62], [30, 1.6, 1.3, -71], [40, 1.5, 1.3, -80],
    ],
  },
  {
    fill: 'url(#wc-gC)',
    strokeOpacity: 0.36,
    feathers: [[-20, 0.66, 1.15, -28], [-8, 0.8, 1.15, -38], [6, 0.9, 1.15, -50], [20, 0.92, 1.15, -62], [34, 0.86, 1.15, -74]],
  },
] as const;

function Wing({ side }: { side: 'l' | 'r' }) {
  return (
    <div className={`wing wing--${side}`}>
      <svg className="wing__svg" viewBox="0 0 300 260" aria-hidden="true" focusable="false">
        {LAYERS.map((layer) => (
          <g key={layer.fill} fill={layer.fill} stroke="#8A5415" strokeOpacity={layer.strokeOpacity} strokeWidth={0.8}>
            {layer.feathers.map(([rotate, sx, sy, d]) => (
              <g key={rotate} className="f" style={{ '--d': `${d}deg` } as CSSProperties}>
                <g transform={`translate(286 190) rotate(${rotate}) scale(${sx} ${sy})`}>
                  <path d={FEATHER} vectorEffect="non-scaling-stroke" />
                  <path d={VEIN} fill="none" stroke="#FFF8E1" strokeOpacity={0.6} strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
                </g>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

const MARK_ANGLES = [0, 90, 180, 270];

interface WingsCompassProps {
  open?: MotionValue<number> | number;
  needle?: number;
  activeMark?: number | null;
  className?: string;
}

export default function WingsCompass({ open = 1, needle = 0, activeMark = null, className }: WingsCompassProps) {
  return (
    <m.div
      className={`emblem ${className ?? ''}`}
      role="img"
      aria-label="金色雙翼與羅盤"
      style={{ '--open': open, '--needle': needle } as unknown as CSSProperties}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="wc-gA" x1="0" x2="1"><stop offset="0" stopColor="#E8B15A" /><stop offset="1" stopColor="#B5762A" /></linearGradient>
          <linearGradient id="wc-gB" x1="0" x2="1"><stop offset="0" stopColor="#F6D88F" /><stop offset="1" stopColor="#D89A3E" /></linearGradient>
          <linearGradient id="wc-gC" x1="0" x2="1"><stop offset="0" stopColor="#FFF3CF" /><stop offset="1" stopColor="#E8B15A" /></linearGradient>
          <linearGradient id="wc-gRing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F6D88F" /><stop offset=".5" stopColor="#C9862E" /><stop offset="1" stopColor="#8A5415" /></linearGradient>
          <radialGradient id="wc-gDisc"><stop offset="0" stopColor="#FFFDF0" /><stop offset=".7" stopColor="#FFF6D8" /><stop offset="1" stopColor="#FCE7A8" /></radialGradient>
        </defs>
      </svg>

      <div className="emblem__rays" />
      <div className="emblem__glow" />
      <Wing side="l" />
      <Wing side="r" />

      <svg className="compass" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <circle cx="100" cy="100" r="94" fill="url(#wc-gDisc)" stroke="url(#wc-gRing)" strokeWidth="5" />
        <circle cx="100" cy="100" r="86" fill="none" stroke="#B5762A" strokeOpacity=".6" strokeWidth="6" strokeDasharray="1.4 21.115" strokeDashoffset=".7" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="#B5762A" strokeOpacity=".45" strokeWidth="1" />
        <g opacity=".9">
          {[45, 135, 225, 315].map((a) => (
            <g key={a} transform={`rotate(${a} 100 100)`}>
              <path d="M100 60L108 92 100 100Z" fill="#F0C875" />
              <path d="M100 60L92 92 100 100Z" fill="#FFF6D8" />
            </g>
          ))}
          {MARK_ANGLES.map((a) => (
            <g key={a} transform={`rotate(${a} 100 100)`}>
              <path d="M100 38L111 89 100 100Z" fill="#E8B15A" />
              <path d="M100 38L89 89 100 100Z" fill="#FCE7A8" />
            </g>
          ))}
        </g>
        {MARK_ANGLES.map((a, i) => (
          <g key={a} className={`mark ${activeMark === i ? 'is-on' : ''}`} transform={`rotate(${a} 100 100)`}>
            <path d="M100-2l7 8-7 8-7-8Z" fill="#FFF6D8" stroke="#B5762A" strokeWidth="1.2" />
            <g className="mark__on">
              <circle cx="100" cy="6" r="16" fill="#F0C875" opacity=".6" />
              <path d="M100-6l10 12-10 12-10-12Z" fill="#8A5415" stroke="#FFF6D8" strokeWidth="1.2" />
            </g>
          </g>
        ))}
        <g className="needle">
          <path d="M100 152L105.5 100H94.5Z" fill="#C9862E" stroke="#FFF6D8" strokeWidth="1" />
          <path d="M100 14L108 100 100 109 92 100Z" fill="#3A2409" stroke="#FFF6D8" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M100 14L108 100 100 109Z" fill="#6B4212" />
        </g>
        <circle cx="100" cy="100" r="8" fill="url(#wc-gRing)" stroke="#FFF6D8" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="2.5" fill="#3A2409" />
      </svg>
    </m.div>
  );
}
