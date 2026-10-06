'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { siteLinks, uiLabels } from '../src/data';

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
    <div id="floating-widgets" className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 items-end">
      {/* Floating LINE Community Shortcut */}
      <a
        href={siteLinks.line}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 border border-silver-edge bg-[linear-gradient(135deg,var(--color-silver-light),var(--color-silver)_45%,var(--color-silver-deep))] text-silver-foreground rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
        id="floating-line-widget"
        aria-label={uiLabels.line}
      >
        {/* Tooltip hint on hover */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 transition-transform duration-200 origin-right whitespace-nowrap bg-inverse text-inverse-foreground text-sm font-semibold py-1.5 px-3 rounded-lg shadow-md border border-primary-foreground flex items-center gap-1">
          {uiLabels.line}
        </span>
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Back-To-Top button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center justify-center w-11 h-11 bg-card hover:bg-popover text-card-foreground rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border border-border transition-all duration-300 animate-fadeIn"
          id="back-to-top-widget"
          aria-label="回網頁頂部"
        >
          <ArrowUp className="w-5 h-5 text-ring" />
        </button>
      )}
    </div>
  );
}
