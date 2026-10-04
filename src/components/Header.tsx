'use client';

import Link from 'next/link';
import { Sparkles, ShoppingBag } from 'lucide-react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { siteLinks } from '../data';

// PRD-003 §4.1／§4.3（2026-10-04）：品牌區只顯示「豐盛之翼學苑」，不再並列
// 「幸運教主 文齡」；右側加上「商城」按鈕（外部連結，手機與桌機都固定可見）。
// 導覽本體在 DesktopNav.tsx（xl 以上）與 MobileNav.tsx（xl 以下的抽屜），
// 兩者共用 src/data.ts 的 primaryNavigation。
export default function Header() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 bg-[#FBF1DD]/95 backdrop-blur-md border-b border-[#F0DFA0]/70 transition-all duration-300 shadow-[0_2px_12px_rgba(58,42,24,0.04)]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-14">
        <div className="flex justify-between items-center gap-3 py-3.5">

          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group select-none shrink-0" id="brand-logo">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FCE7A8] via-[#E8B15A] to-[#C9862E] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 border border-[#FFFDF0]">
              <Sparkles className="w-5 h-5 text-[#3A2409]" />
            </div>
            <span className="text-lg font-bold font-serif text-[#3A2A18] tracking-wider leading-none">
              豐盛之翼學苑
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <DesktopNav />
            <a
              href={siteLinks.shop}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn shrink-0 px-4 py-2 text-sm font-bold inline-flex items-center gap-1.5"
              id="header-shop-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>商城</span>
            </a>
            <div className="flex items-center xl:hidden">
              <MobileNav />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
