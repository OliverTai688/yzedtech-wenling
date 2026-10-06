'use client';

import { useEffect } from 'react';

// 已經在 /legal 時再點頁尾的法律連結（next/link）：路由只用 pushState 換網址，瀏覽器不會發出 hashchange，
// ChipTabs 因此不知道要換到哪一份文件。這裡在點了「同一頁、帶錨點」的連結之後，等網址換好就補發一次 hashchange。
// 從別頁進來、重新整理、上一頁／下一頁本來就會選對，不經過這裡。不輸出任何畫面。
export default function LegalHashSync() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      // 最多等一秒（60 個影格）讓路由把網址換好
      let frames = 0;
      const wait = () => {
        if (window.location.hash === url.hash) window.dispatchEvent(new HashChangeEvent('hashchange'));
        else if (frames++ < 60) requestAnimationFrame(wait);
      };
      requestAnimationFrame(wait);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
