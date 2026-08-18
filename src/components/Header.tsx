'use client';

import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

// Header 只負責品牌識別（logo）、搜尋與 CTA 這三個橫向區塊；
// 導覽項目本身交給 DesktopNav / MobileNav，兩者共用 src/data.ts 的
// primaryNavigation，確保導覽列與網站架構（app/ 路由 + Footer 網站地圖）一致。
export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 bg-[#FBF1DD]/95 backdrop-blur-md border-b border-[#F0DFA0]/70 transition-all duration-300 shadow-[0_2px_12px_rgba(58,42,24,0.04)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        <div className="flex justify-between items-center py-3.5 gap-4">

          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group select-none shrink-0" id="brand-logo">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FCE7A8] via-[#E8B15A] to-[#C9862E] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 border border-[#FFFDF0]">
              <Sparkles className="w-5 h-5 text-[#3A2409]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-serif text-[#3A2A18] tracking-wider leading-none">
                  Keila Healing
                </span>
                <span className="text-[11px] font-medium bg-[#FDF6E6] text-[#B5762A] border border-[#F0DFA0] px-2 py-0.5 rounded-full">
                  幸運療癒師 文齡
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation — 對應網站架構的分組 mega menu */}
          <DesktopNav />

          {/* Desktop Right CTA Area */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            {/* Search Bar Toggle */}
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    placeholder="搜尋療癒文章或服務..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-44 px-3 py-1.5 text-xs bg-white rounded-full border border-[#F0DFA0] text-[#2E2318] focus:outline-none focus:ring-1 focus:ring-[#B5762A] pr-8 shadow-xs"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-2.5 text-[#9A8060] hover:text-[#B5762A]">
                    <Search className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSearch(false)}
                    className="ml-1.5 text-xs text-[#9A8060] hover:text-[#2E2318]"
                  >
                    ✕
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-[#6A5642] hover:text-[#B5762A] transition-colors rounded-full hover:bg-[#FDF6E6]"
                  aria-label="開啟搜尋"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Online Booking CTA — 導向站內 /services，各服務卡片的預約連結為
                真實 booking.wenling.tw 網址（見 src/data.ts），這裡不寫死單一外部商城網址 */}
            <ShimmerButton
              background="linear-gradient(135deg,#F5D98A 0%,#C9862E 100%)"
              shimmerColor="#FFFDF0"
              borderRadius="999px"
              className="px-4 py-2 text-xs font-semibold tracking-wide text-[#3A2409]"
              id="header-shop-cta"
              onClick={() => router.push('/services')}
            >
              <span className="inline-flex items-center gap-1.5">
                線上預約服務 <span className="text-[10px]">➔</span>
              </span>
            </ShimmerButton>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center lg:hidden gap-1">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-[#6A5642] hover:text-[#B5762A]"
              aria-label="搜尋"
            >
              <Search className="w-5 h-5" />
            </button>
            <MobileNav />
          </div>

        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="lg:hidden bg-[#FDF6E6] border-b border-[#F0DFA0] p-3.5">
          <form onSubmit={handleSearchSubmit} className="relative flex max-w-[1280px] mx-auto">
            <input
              type="text"
              placeholder="輸入關鍵字，如「愛情」、「靈氣」、「豐盛」..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-xs bg-white rounded-full border border-[#F0DFA0] text-[#2E2318] focus:outline-none pr-9"
            />
            <button type="submit" className="absolute right-3.5 top-2.5 text-[#9A8060]">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
