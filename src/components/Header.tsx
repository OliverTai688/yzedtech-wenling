'use client';

import Link from 'next/link';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import WingsMark from './brand/WingsMark';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { siteLinks } from '../data';
import { useScrolled } from './motion/useScrolled';
import { cn } from '@/lib/utils';

// PRD-003 §4.3 v1.1（RES-001 方案 C）：Logo｜導覽 5 項｜LINE 諮詢｜商城。
// - 品牌區只顯示「豐盛之翼學苑」，Logo 同時是回首頁的連結。
// - 「商城」在所有寬度固定可見；「LINE 諮詢」在 lg 以上顯示，手機由抽屜底部與
//   浮動按鈕承擔。
// - 捲動後加陰影（RPT-001 §5.3）。
// 導覽本體在 DesktopNav.tsx（lg 以上）與 MobileNav.tsx（lg 以下的抽屜）。
export default function Header() {
  const scrolled = useScrolled(8);

  return (
    <header
      id="site-header"
      className={cn(
        'sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/70 transition-shadow duration-300',
        scrolled ? 'shadow-[0_6px_24px_rgba(58,42,24,0.10)]' : 'shadow-none'
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-14">
        <div className="flex justify-between items-center gap-3 py-3">

          <Link href="/" className="flex items-center gap-3 group select-none shrink-0 min-h-11" id="brand-logo">
            <WingsMark className="h-8 w-auto transition-transform duration-300 group-hover:scale-105" />
            <span className="text-lg font-bold font-serif text-card-foreground tracking-wider leading-none">
              豐盛之翼學苑
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <DesktopNav />
            <a
              href={siteLinks.line}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex shrink-0 items-center gap-1.5 min-h-11 px-4 rounded-full border border-border bg-popover text-sm font-bold text-secondary-foreground hover:border-ring transition-colors"
              id="header-line-btn"
            >
              <MessageCircle className="w-4 h-4 text-line" />
              <span>LINE 諮詢</span>
            </a>
            <a
              href={siteLinks.shop}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn shrink-0 min-h-11 px-4 text-sm font-bold inline-flex items-center gap-1.5"
              id="header-shop-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>商城</span>
            </a>
            <div className="flex items-center lg:hidden">
              <MobileNav />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
