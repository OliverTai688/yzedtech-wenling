import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { narrowWidth, sectionHeading, wideWidth } from '../PageHeader';

// 內頁的一個區塊：固定的上下節奏、明體的 H2、可選的眉批。區塊是滿版的，寬度由裡面的容器決定。
// tone：stage＝暖白（預設，和第一個畫面同一個底）；tint＝頁面底色（稍深一點的米色，用來分段）。
interface PageSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  /** 標題下的一句話 */
  lead?: string;
  width?: 'wide' | 'narrow';
  tone?: 'stage' | 'tint';
  className?: string;
  children?: ReactNode;
}

export default function PageSection({ id, eyebrow, title, lead, width = 'wide', tone = 'stage', className, children }: PageSectionProps) {
  const headingId = id && title ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn('scroll-mt-20', tone === 'tint' ? 'bg-background' : 'bg-stage')}>
      <div className={cn(width === 'narrow' ? narrowWidth : wideWidth, 'py-12 lg:py-16', className)}>
        {(eyebrow || title || lead) && (
          <header className="mb-6 lg:mb-8">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className={cn(sectionHeading, eyebrow && 'mt-3')}>
                {title}
              </h2>
            )}
            {lead && <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
