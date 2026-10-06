'use client';

import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { siteLinks } from '../data';
import { useScrolled } from './motion/useScrolled';
import { cn } from '@/lib/utils';

// 手機底部固定 CTA 列（RES-001 §4.2、RES-003 §3.2）。捲過 threshold 後由下滑入，
// 只有一顆有文字的按鈕：該頁的主要行動；私訊官方 LINE 是旁邊的圓形圖示鈕（文字放 aria-label）。顯示期間隱藏右下角的浮動按鈕
// （樣式在 app/globals.css 的 body[data-sticky-cta]）。
interface StickyCtaBarProps {
  primary: { label: string; href: string; external?: boolean };
  lineLabel: string;
  /** 捲動超過多少 px 後出現 */
  threshold?: number;
}

export default function StickyCtaBar({ primary, lineLabel, threshold = 520 }: StickyCtaBarProps) {
  const visible = useScrolled(threshold);

  useEffect(() => {
    document.body.dataset.stickyCta = 'true';
    return () => {
      delete document.body.dataset.stickyCta;
    };
  }, []);

  return (
    <div
      id="sticky-cta-bar"
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-border bg-popover/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={primary.href}
          {...(primary.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          tabIndex={visible ? 0 : -1}
          // 較長的按鈕文字（例如社群密碼那一句）縮小一級並允許折成兩行
          className={cn('gold-btn flex-1 px-4 text-center font-bold leading-snug', primary.label.length > 10 ? 'text-sm' : 'text-base')}
        >
          {primary.label}
        </a>
        <a
          href={siteLinks.line}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          aria-label={lineLabel}
          className="btn-silver size-12 shrink-0 p-0!"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
