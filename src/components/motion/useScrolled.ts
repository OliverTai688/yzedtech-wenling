'use client';

import { useEffect, useState } from 'react';

// 捲動是否超過門檻（px）。頁首陰影、手機底部固定列等共用（RPT-001 §5.4 D4）。
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [threshold]);

  return scrolled;
}
