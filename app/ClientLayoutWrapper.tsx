'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, Sparkles } from 'lucide-react';

export default function ClientLayoutWrapper() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 items-end">
      {/* Floating LINE Community Shortcut */}
      <a
        href="https://lin.ee/yo6a6FW"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#06C755] hover:bg-[#05b04b] text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
        id="floating-line-widget"
        aria-label="加入 LINE 官方社群"
      >
        {/* Tooltip hint on hover */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 transition-transform duration-200 origin-right whitespace-nowrap bg-[#20140A] text-[#F5E4C8] text-sm font-semibold py-1.5 px-3 rounded-lg shadow-md border border-[#3A2409] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#F0C875] animate-pulse" />
          免費加 LINE 領靜心好禮!
        </span>
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* Back-To-Top button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center justify-center w-11 h-11 bg-[#FDF6E6] hover:bg-[#FFFDF0] text-[#3A2A18] rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border border-[#F0DFA0] transition-all duration-300 animate-fadeIn"
          id="back-to-top-widget"
          aria-label="回網頁頂部"
        >
          <ArrowUp className="w-5 h-5 text-[#B5762A]" />
        </button>
      )}
    </div>
  );
}
