'use client';

import React, { useState } from 'react';
import { Menu, X, Search, Sparkles, MessageCircle, Home, UserCircle, Layers, GraduationCap, Quote, BookOpen, Gift, CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  currentTab?: string;
  setCurrentTab?: (tab: string) => void;
  onSearch?: (query: string) => void;
}

export default function Header({ currentTab: propCurrentTab, setCurrentTab, onSearch }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const currentTab = propCurrentTab || (pathname === '/' ? 'home' : pathname.slice(1));

  // 2026-08-18：導覽列文字太長會在桌機版折成兩行，依使用者指示改為「icon + 縮短文字」，
  // 兼顧可讀性與精簡（純 icon 對初次到訪者不夠直覺，故保留簡短文字）。
  // 2026-08-21（copy-qa-reviewer 覆核＋客戶確認）：這份寫死的扁平選單才是實際掛在
  // app/layout.tsx 的主導覽（DesktopNav.tsx／MobileNav.tsx 雖然有讀 primaryNavigation
  // 且已指向 /training，但目前沒有任何頁面匯入使用，屬死碼）。新增「培訓」項目、
  // 與「服務」並列，指向 /training，讓使用者能從主導覽找到培訓總覽頁。桌機／手機
  // 版共用同一份 menuItems（見下方 desktop-nav／mobile-drawer 兩處渲染），新增這項
  // 已一併涵蓋兩種版面，不需另外處理手機選單。新增後為 8 項，桌機版是否會因此折成
  // 兩行需另外於瀏覽器實測確認（PRD-002 §2 item 5 提過的既有風險），已回報給協調者。
  const menuItems = [
    { id: 'home', name: '首頁', icon: Home },
    { id: 'about', name: '關於', icon: UserCircle },
    { id: 'services', name: '服務', icon: Layers },
    { id: 'training', name: '培訓', icon: GraduationCap },
    { id: 'testimonials', name: '見證', icon: Quote },
    { id: 'blog', name: '部落格', icon: BookOpen },
    { id: 'resources', name: '資源', icon: Gift },
    { id: 'contact', name: '預約', icon: CalendarCheck },
  ];

  const handleNavClick = (tabId: string) => {
    if (setCurrentTab) {
      setCurrentTab(tabId);
    } else {
      const route = tabId === 'home' ? '/' : `/${tabId}`;
      router.push(route);
    }
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        router.push(`/blog?q=${encodeURIComponent(searchQuery)}`);
      }
      if (setCurrentTab) {
        setCurrentTab('blog');
      }
      setShowSearch(false);
    }
  };

  return (
    <header 
      id="site-header" 
      className="sticky top-0 z-50 bg-[#FBF1DD]/95 backdrop-blur-md border-b border-[#F0DFA0]/70 transition-all duration-300 shadow-[0_2px_12px_rgba(58,42,24,0.04)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
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

          {/* Desktop Navigation 8 Items */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.id === 'home' ? '/' : `/${item.id}`}
                  onClick={(e) => {
                    if (setCurrentTab) {
                      e.preventDefault();
                      handleNavClick(item.id);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 inline-flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FDF6E6] text-[#B5762A] font-semibold border border-[#F0DFA0] shadow-xs'
                      : 'text-[#5A4A38] hover:text-[#B5762A] hover:bg-[#FDF6E6]/60'
                  }`}
                >
                  <ItemIcon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA Area */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search Bar Toggle */}
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    placeholder="搜尋療癒文章或服務..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-44 px-3 py-1.5 text-base bg-white rounded-full border border-[#F0DFA0] text-[#2E2318] focus:outline-none focus:ring-1 focus:ring-[#B5762A] pr-8 shadow-xs"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-2.5 text-[#9A8060] hover:text-[#B5762A]">
                    <Search className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSearch(false)}
                    className="ml-1.5 text-base text-[#9A8060] hover:text-[#2E2318]"
                    aria-label="關閉搜尋"
                  >
                    <X className="w-3.5 h-3.5" />
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
            <Link
              href="/services"
              onClick={(e) => { if (setCurrentTab) { e.preventDefault(); handleNavClick('services'); } }}
              className="gold-btn-header px-4 py-2 text-base font-semibold tracking-wide inline-flex items-center gap-1.5 cursor-pointer"
              id="header-shop-cta"
            >
              <span>線上預約服務</span>
              <span className="text-base">➔</span>
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center lg:hidden gap-2">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-[#6A5642] hover:text-[#B5762A]"
              aria-label="搜尋"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#3A2A18] hover:text-[#B5762A] transition-colors"
              aria-expanded={isOpen}
              aria-label="選單"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#3A2A18]" />}
            </button>
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
              className="w-full px-4 py-2 text-base bg-white rounded-full border border-[#F0DFA0] text-[#2E2318] focus:outline-none pr-9"
            />
            <button type="submit" className="absolute right-3.5 top-2.5 text-[#9A8060]">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#FDF6E6] border-b border-[#F0DFA0] py-4 px-6 shadow-xl transition-all z-40" id="mobile-drawer">
          <div className="flex flex-col space-y-2">
            {menuItems.map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.id === 'home' ? '/' : `/${item.id}`}
                  onClick={(e) => {
                    if (setCurrentTab) {
                      e.preventDefault();
                      handleNavClick(item.id);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className={`py-2.5 px-4 rounded-xl text-left text-sm font-medium transition-all flex items-center gap-2.5 ${
                    currentTab === item.id
                      ? 'bg-[#FBF1DD] text-[#B5762A] font-semibold border border-[#F0DFA0]'
                      : 'text-[#5A4A38] hover:bg-[#FBF1DD]'
                  }`}
                >
                  <ItemIcon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-[#F0DFA0] flex flex-col space-y-2.5">
              <Link
                href="/services"
                onClick={(e) => { if (setCurrentTab) { e.preventDefault(); handleNavClick('services'); setIsOpen(false); } }}
                className="gold-btn py-3 px-4 text-base font-semibold text-center block"
              >
                前往服務頁選購服務 ➔
              </Link>
              <a
                href="https://lin.ee/yo6a6FW"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#06C755] text-white text-base font-semibold text-center hover:opacity-95 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>加入 LINE 官方帳號</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
