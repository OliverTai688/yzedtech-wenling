import { Sparkles, MessageCircle, BookOpen, Heart, Award } from 'lucide-react';
import { heroContent } from '../data';

// PRD-003 §4.4（2026-10-04）：文案改由 src/data.ts 的 heroContent 提供
// （文案集 v2 Home Block 1）。主 CTA 是錨點，滑到需求入口區塊。
// 圓框內目前是形象照佔位，待客戶提供創辦人形象照後替換（AUD-002 §9）。
const badgeIcons = [BookOpen, Heart, Award];

export default function Hero() {
  const { eyebrow, headlineLines, description, primaryCta, secondaryCta, trustBadges, portraitCaption } = heroContent;

  return (
    <section
      id="hero"
      className="relative overflow-hidden bokeh-bg py-16 md:py-24 border-b border-[#F0DFA0]/80 shadow-[inset_0_-8px_20px_rgba(201,134,46,0.1)]"
    >
      {/* Decorative Shimmering Sparkles */}
      <div className="sparkle w-3 h-3 top-10 left-[15%]" style={{ animationDelay: '0s' }}></div>
      <div className="sparkle w-4 h-4 top-24 right-[20%]" style={{ animationDelay: '1.2s' }}></div>
      <div className="sparkle w-2.5 h-2.5 bottom-16 left-[28%]" style={{ animationDelay: '0.6s' }}></div>
      <div className="sparkle w-3.5 h-3.5 bottom-28 right-[12%]" style={{ animationDelay: '1.8s' }}></div>
      <div className="sparkle w-2 h-2 top-1/2 left-[8%]" style={{ animationDelay: '2.4s' }}></div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-7 text-left">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF0]/85 backdrop-blur-xs border border-[#F0DFA0] text-[#8A5415] text-sm font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C9862E]" />
              <span>{eyebrow}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-serif font-bold text-[#3A2A18] leading-[1.25] tracking-tight">
              {headlineLines[0]}
              <br />
              <span className="gold-text-gradient font-black">{headlineLines[1]}</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5A4A38] leading-relaxed max-w-2xl font-normal">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={primaryCta.href}
                className="gold-btn px-8 py-3.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2 cursor-pointer"
                id="hero-primary-cta"
              >
                <span>{primaryCta.label}</span>
                <span>➔</span>
              </a>

              <a
                href={secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#FFFDF0]/90 hover:bg-[#FFFDF0] border border-[#F0DFA0] text-[#5A4A38] hover:text-[#B5762A] text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                id="hero-community-cta"
              >
                <MessageCircle className="w-4 h-4 text-[#06C755]" />
                <span>{secondaryCta.label}</span>
              </a>
            </div>

            {/* Trust Micro-Badges */}
            <div className="pt-4 border-t border-[#F0DFA0]/70 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-[#7A6650]">
              {trustBadges.map((badge, idx) => {
                const Icon = badgeIcons[idx % badgeIcons.length];
                return (
                  <div key={badge} className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 shrink-0 text-[#B5762A]" />
                    <span>{badge}</span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: portrait placeholder + caption */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">

              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#F0DFA0]/60 animate-[spin_60s_linear_infinite] pointer-events-none"></div>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FCE7A8] via-[#E8B15A] to-[#C9862E] opacity-50 blur-sm"></div>

              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-[#FFFDF0] shadow-2xl bg-gradient-to-b from-[#FFF9ED] to-[#F7E3A8] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FCE7A8] to-[#D89A3E] flex items-center justify-center shadow-inner border-2 border-white z-10">
                  <Sparkles className="w-12 h-12 text-[#3A2409]" />
                </div>
                <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-[#D89A3E]/20 pointer-events-none"></div>
              </div>

              <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#FFFDF0] border border-[#F0DFA0] rounded-full py-2 px-5 shadow-lg text-sm font-bold text-[#3A2A18]">
                {portraitCaption}
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
