'use client';

import { useEffect } from 'react';

// 詳細頁各段落的三個小行為（沒有這支程式時，段落仍是原生 <details>，錨點仍會捲到那一段）：
// 1. 點頁內小導覽（a[data-open-section]）或網址帶著某一段的錨點時，展開那一段並捲到它。
// 2. 展開一段時，同組的另一段會收起，版面往上縮；如果剛展開的那一段因此跑到頁首底下，把它捲回來。
const HEADER = 72;

export default function SectionBehavior({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: number[] = [];
    const settle = (el: HTMLElement, always: boolean) => {
      // 等收合的高度過渡（250ms）結束再量位置
      timers.push(
        window.setTimeout(() => {
          const top = el.getBoundingClientRect().top;
          if (always || top < HEADER) el.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
        }, 280)
      );
    };
    const openById = (id: string) => {
      const target = id ? document.getElementById(id) : null;
      const section = target?.closest<HTMLDetailsElement>('details[data-section]');
      if (!section || !root.contains(section)) return false;
      section.open = true;
      settle(section, true);
      return true;
    };

    const onClick = (event: MouseEvent) => {
      // 3. 翻頁後這一頁變短，箭頭可能被推到頁首底下：把翻頁區塊捲回畫面
      const arrow = (event.target as HTMLElement).closest<HTMLElement>('.pager__nav button');
      if (arrow) {
        window.requestAnimationFrame(() => {
          if (arrow.getBoundingClientRect().top < HEADER) arrow.closest<HTMLElement>('.pager')?.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
        });
        return;
      }
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[data-open-section]');
      const id = link?.getAttribute('href')?.slice(1);
      if (!link || !id || !openById(id)) return;
      event.preventDefault();
      window.history.replaceState(null, '', `#${id}`);
    };
    const onToggle = (event: Event) => {
      const el = event.target as HTMLDetailsElement;
      if (el.matches?.('details[data-section]') && el.open) settle(el, false);
    };
    const onHash = () => openById(decodeURIComponent(window.location.hash.slice(1)));

    onHash();
    root.addEventListener('click', onClick);
    root.addEventListener('toggle', onToggle, true);
    window.addEventListener('hashchange', onHash);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      root.removeEventListener('click', onClick);
      root.removeEventListener('toggle', onToggle, true);
      window.removeEventListener('hashchange', onHash);
    };
  }, [rootId]);

  return null;
}
