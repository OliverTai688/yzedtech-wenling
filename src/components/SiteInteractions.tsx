'use client';

import { useEffect } from 'react';
import { siteLinks } from '../data';
import { track } from '@/lib/track';

// 全站點擊的統一處理（PRD-004 §4.3、§4.5），掛在 app/layout.tsx。
// 1. 量測：依連結目的地分類送出事件，不必在每個按鈕上各寫一次。
// 2. LINE 帶話：在服務或課程詳細頁，手機上點任何官方 LINE 連結時，改開帶有該頁
//    名稱的對話（LINE 官方網址格式 oaMessage；只支援 iOS 與 Android）。
//    沒有 JavaScript 或在桌機時，連結維持原本的 lin.ee 網址。
const isLineApp = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function sectionOf(el: Element) {
  return el.closest('[data-chapter]')?.getAttribute('data-chapter') ?? el.closest('section[id], [id$="-cta-bar"], header, footer')?.id ?? '';
}

export default function SiteInteractions() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      const base = { page: window.location.pathname, from: a.dataset.trackFrom ?? sectionOf(a) };

      if (href === siteLinks.line) {
        const text = document.querySelector<HTMLElement>('[data-line-text]')?.dataset.lineText;
        const prefill = siteLinks.linePrefill && !!text && isLineApp();
        if (prefill) {
          a.href = `https://line.me/R/oaMessage/${encodeURIComponent(siteLinks.lineBasicId)}/?${encodeURIComponent(text)}`;
          // 還原，避免返回頁面後連結停在帶話網址
          window.setTimeout(() => a.setAttribute('href', siteLinks.line), 1000);
        }
        track('line_click', { ...base, prefill });
      } else if (href.startsWith(siteLinks.shop)) {
        track('booking_click', { ...base, target: href.replace(siteLinks.shop, '') || 'shop' });
      } else if (href === siteLinks.community || href === siteLinks.lineCommunity) {
        track('community_click', base);
      } else if (a.dataset.track === 'cta') {
        track('cta_click', { ...base, target: href });
      }
      if (a.closest('#sticky-cta-bar')) track('sticky_click', { ...base, target: href });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
