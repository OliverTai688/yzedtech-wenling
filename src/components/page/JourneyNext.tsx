import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { footerNavigation, journey, primaryNavigation, type JourneyKey } from '../../data';
import { wideWidth } from '../PageHeader';

// 「下一站」（pages-v2/BRIEF §5）：每頁內容的最後、CtaBand 之前的一列，最多兩個連結（上一站、下一站）。
// 連結文字是導覽裡既有的頁名，只加箭頭，不加任何說明文字。沒有上一站也沒有下一站的頁面不輸出任何東西。
const labels = new Map<string, string>();
for (const group of [...primaryNavigation, ...footerNavigation]) {
  for (const item of group.items ?? []) labels.set(item.href, item.label);
}

const linkClass = 'btn-text min-w-0 text-base';

export default function JourneyNext({ route }: { route: JourneyKey }) {
  const { prev, next } = journey[route];
  const prevLabel = prev && labels.get(prev);
  const nextLabel = next && labels.get(next);
  if (!prevLabel && !nextLabel) return null;

  return (
    <nav className="journey-next border-t border-border/70 bg-stage">
      <div className={`${wideWidth} flex items-center justify-between gap-6 py-4`}>
        {prev && prevLabel ? (
          <Link href={prev} rel="prev" className={linkClass}>
            <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
            <span>{prevLabel}</span>
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
        {next && nextLabel && (
          <Link href={next} rel="next" className={`${linkClass} text-right`}>
            <span>{nextLabel}</span>
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>
        )}
      </div>
    </nav>
  );
}
