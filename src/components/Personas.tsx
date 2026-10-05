import Link from 'next/link';
import { Heart, Sparkles, Coins, Sprout, ArrowRight, ArrowUpRight } from 'lucide-react';
import { needEntries, needEntriesIntro } from '../data';
import type { NeedEntry } from '../types';

// PRD-003 §4.4（2026-10-04）：首頁需求入口。文案與連結改由 src/data.ts 的
// needEntries 提供（文案集 v2 Home Block 2）：4 張卡，每張含痛點、2 則改變故事、
// 專屬起點與 2 個 CTA。原本的 3 卡＋展開抽屜（推薦服務、建議起點）已移除。
// 階段 A 沿用原卡片樣式，只把欄數改為 2×2；正式版型於階段 D 依 UIUX 研究調整。
const icons: Record<NeedEntry['iconName'], typeof Heart> = {
  heart: Heart,
  sparkles: Sparkles,
  coins: Coins,
  sprout: Sprout,
};

const ctaClass = (primary: boolean) =>
  primary
    ? 'gold-btn px-5 py-2.5 text-base font-semibold inline-flex items-center justify-center gap-1.5'
    : 'px-5 py-2.5 rounded-full bg-[#FFFDF0] hover:bg-white border border-[#F0DFA0] text-[#8A5415] hover:text-[#3A2409] text-base font-semibold inline-flex items-center justify-center gap-1.5 transition-colors';

export default function Personas() {
  return (
    <section id="personas-section" className="scroll-mt-20 py-20 md:py-28 bg-[#FBF1DD] border-b border-[#F0DFA0]/70">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#3A2A18] font-serif leading-snug">
            {needEntriesIntro.heading}
          </h2>
          <p className="text-base text-[#6A5642] leading-relaxed max-w-2xl mx-auto">
            {needEntriesIntro.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {needEntries.map((entry) => {
            const Icon = icons[entry.iconName];
            return (
              <article key={entry.id} className="brand-card p-7 sm:p-8 flex flex-col" id={`need-${entry.id}`}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#FFFDF0] border border-[#F0DFA0] flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 text-[#B5762A]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#3A2A18] font-serif">{entry.title}</h3>
                </div>

                <p className="bg-[#FFFDF0]/90 border-l-3 border-[#D89A3E] p-4 rounded-r-xl mb-5 text-base text-[#5A4A38] leading-relaxed italic">
                  {entry.painPoint}
                </p>

                <div className="mb-5">
                  <p className="text-sm font-bold text-[#B5762A] mb-2">真實改變故事</p>
                  <ul className="space-y-3">
                    {entry.stories.map((story) => (
                      <li key={story.title} className="text-base text-[#5A4A38] leading-relaxed">
                        <span className="font-bold text-[#3A2A18]">{story.title}：</span>
                        {story.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-bold text-[#B5762A] mb-2">專屬起點</p>
                  <p className="text-base text-[#6A5642] leading-relaxed">{entry.startingPoint}</p>
                </div>

                <div className="mt-auto pt-5 border-t border-[#F0DFA0]/80 flex flex-col sm:flex-row gap-3">
                  {entry.ctas.map((cta, idx) =>
                    cta.external ? (
                      <a
                        key={cta.label}
                        href={cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={ctaClass(idx === 0)}
                      >
                        <span>{cta.label}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link key={cta.label} href={cta.href} className={ctaClass(idx === 0)}>
                        <span>{cta.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
