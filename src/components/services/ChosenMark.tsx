'use client';

import { needEntries } from '../../data';
import { useChosenNeed } from '@/lib/need';
import { cn } from '@/lib/utils';

// 訪客在首頁選過的對象（lib/need.ts，只存在瀏覽器）→ 那個對象的第一個 CTA 所指的站內頁面。
// /services 與 /training 用它把對應的那一張卡標出來。標記的文字是對象既有的短名（needEntries.shortLabel），
// 不新增任何字。伺服器與沒選過的訪客得到 null，畫面就是原本的順序、沒有標記。
export function useChosenTarget(): { href: string; label: string } | null {
  const chosen = useChosenNeed();
  const entry = needEntries.find((need) => need.id === chosen);
  return entry ? { href: entry.ctas[0].href, label: entry.shortLabel } : null;
}

/** 這張卡若是訪客選過的對象的起點，顯示對象的短名（眉批樣式）；否則不輸出任何東西。 */
export default function ChosenMark({ href, className }: { href: string; className?: string }) {
  const target = useChosenTarget();
  if (target?.href !== href) return null;
  return (
    <p data-chosen-mark className={cn('eyebrow self-start', className)}>
      {target.label}
    </p>
  );
}
