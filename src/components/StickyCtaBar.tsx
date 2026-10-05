'use client';

import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { siteLinks } from '../data';
import { useScrolled } from './motion/useScrolled';
import { cn } from '@/lib/utils';

// 手機底部固定 CTA 列（RES-001 §4.2、RES-003 §3.2）。捲過 threshold 後由下滑入，
// 最多兩顆按鈕：該頁的主要行動，加上 LINE 諮詢。顯示期間隱藏右下角的浮動按鈕
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
          className="gold-btn flex-1 px-4 text-base font-bold"
        >
          {primary.label}
        </a>
        <a
          href={siteLinks.line}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="btn-line shrink-0 px-5 text-base"
        >
          <MessageCircle className="size-4" />
          {lineLabel}
        </a>
      </div>
    </div>
  );
}
