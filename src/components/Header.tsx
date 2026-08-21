'use client';

import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

interface HeaderProps {
  currentTab?: string;
  setCurrentTab?: (tab: string) => void;
}

// 2026-08-22（客戶要求：主導覽改用 shadcn UI、二階層下拉選單，桌機版按鈕不要那麼多）：
// 桌機導覽與手機導覽本體，改用專案裡已經做好、但先前完全沒有頁面匯入使用的
// `DesktopNav.tsx`（shadcn NavigationMenu，讀取 src/data.ts 的 primaryNavigation，
// 分組成頂層節點，有子項目的節點 hover/點擊會展開二階層下拉選單）與
// `MobileNav.tsx`（shadcn Sheet 抽屜，含底部服務／LINE CTA），取代這裡原本
// 自己手刻的扁平選單。
//
// 2026-08-22（同日第二輪，客戶確認）：頂部常駐的搜尋圖示／搜尋框，以及桌機版
// 右側「線上預約服務」CTA 金色按鈕，兩者皆從 Header 完全移除（桌機／手機都
// 拿掉）；`MobileNav.tsx` 抽屜底部自己的服務／LINE CTA 不受影響，維持原樣。
// 移除後 `onSearch` prop 已無任何呼叫端使用（全倉庫僅 app/layout.tsx 呼叫
// `<Header />` 且從未傳入任何 props），一併從 HeaderProps 移除；`currentTab`／
// `setCurrentTab` 維持保留（前一輪已盤點為全站未使用但暫不砍的公開介面）。
export default function Header({ setCurrentTab }: HeaderProps) {
  const router = useRouter();

  const handleNavClick = (tabId: string) => {
    if (setCurrentTab) {
      setCurrentTab(tabId);
    } else {
      const route = tabId === 'home' ? '/' : `/${tabId}`;
      router.push(route);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 bg-[#FBF1DD]/95 backdrop-blur-md border-b border-[#F0DFA0]/70 transition-all duration-300 shadow-[0_2px_12px_rgba(58,42,24,0.04)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        {/* 移除搜尋／CTA 後右側只剩導覽本體，改為單純的兩欄版面
            （Logo 左／導覽右），避免 justify-between 在少了右側叢集後
            把兩者拉開過遠。 */}
        <div className="flex justify-between items-center py-3.5">

          {/* Logo & Brand Name */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FCE7A8] via-[#E8B15A] to-[#C9862E] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 border border-[#FFFDF0]">
              <Sparkles className="w-5 h-5 text-[#3A2409]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-serif text-[#3A2A18] tracking-wider leading-none">
                  豐盛之翼學苑
                </span>
                <span className="text-sm font-medium bg-[#FDF6E6] text-[#B5762A] border border-[#F0DFA0] px-2 py-0.5 rounded-full">
                  幸運教主 文齡
                </span>
              </div>
            </div>
          </div>

          {/* Navigation — 桌機顯示 DesktopNav（shadcn NavigationMenu），
              手機顯示 MobileNav（shadcn Sheet 抽屜觸發按鈕），兩者互斥顯示
              但同屬右側這一組，讓版面維持乾淨的兩欄配置。 */}
          <div className="flex items-center">
            <DesktopNav />
            <div className="flex items-center lg:hidden">
              <MobileNav />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
