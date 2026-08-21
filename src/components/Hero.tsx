import { Sparkles, MessageCircle, Heart, Shield, Award, BookOpen } from 'lucide-react';

interface HeroProps {
  onLearnMore: (tabId: string) => void;
  onPersonaClick?: (personaId: string) => void;
}

export default function Hero({ onLearnMore }: HeroProps) {
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
          
          {/* Left Column: 1.1fr (~7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF0]/85 backdrop-blur-xs border border-[#F0DFA0] text-[#8A5415] text-sm font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C9862E]" />
              <span>理性解構潛意識 • 溫柔調頻心輪磁場</span>
            </div>

            {/* Main Headline ~52px — 文案集 Block 1｜Hero 原文 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-serif font-bold text-[#3A2A18] leading-[1.2] tracking-tight">
              陪你潛入內心，<br className="hidden sm:inline" />
              找回你本具的<span className="gold-text-gradient font-black">豐盛與力量</span>
            </h1>

            {/* Subheading text */}
            <p className="text-base sm:text-lg text-[#5A4A38] leading-relaxed max-w-2xl font-normal">
              幸運教主文齡 <strong className="text-[#3A2A18] font-semibold">Keila</strong>，整合希塔療癒、14 種以上靈氣與顯化技術，用理性的邏輯結構、最柔軟的愛，陪你清理潛意識裡的限制信念，讓愛情、財富與事業的順流，重新回到你的生命。
            </p>

            {/* Dual CTA Buttons — 對應文案集主／次按鈕與真實連結 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="https://booking.wenling.tw/activities/soul-healing"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn px-8 py-3.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2 cursor-pointer"
                id="hero-explore-services-btn"
              >
                <span>立即預約一對一療癒</span>
                <span>➔</span>
              </a>

              <a
                href="https://reurl.cc/8DDd1M"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#FFFDF0]/90 hover:bg-[#FFFDF0] border border-[#F0DFA0] text-[#5A4A38] hover:text-[#B5762A] text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                id="hero-line-btn"
              >
                <MessageCircle className="w-4 h-4 text-[#06C755]" />
                <span>加入免費體驗社群</span>
              </a>
            </div>

            {/* Secondary link to full services/training overview */}
            <button
              onClick={() => onLearnMore('services')}
              className="text-base font-semibold text-[#8A5415] hover:text-[#3A2409] underline underline-offset-4 decoration-[#F0DFA0]"
            >
              或先瀏覽三大服務與培訓體系總覽 ➔
            </button>

            {/* Trust Micro-Badges */}
            <div className="pt-4 border-t border-[#F0DFA0]/70 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-[#7A6650]">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#B5762A]" />
                <span>美國 Think 官方希塔認證導師</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#B5762A]" />
                <span>臼井靈氣三階療癒師認證</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#B5762A]" />
                <span>每年破百次個案療癒經驗</span>
              </div>
            </div>

          </div>

          {/* Right Column: 0.9fr (~5 cols on desktop) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              
              {/* Outer Decorative Rings */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#F0DFA0]/60 animate-[spin_60s_linear_infinite] pointer-events-none"></div>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FCE7A8] via-[#E8B15A] to-[#C9862E] opacity-50 blur-sm"></div>

              {/* Main Circular Portrait Container ~420px */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-[#FFFDF0] shadow-2xl bg-gradient-to-b from-[#FFF9ED] to-[#F7E3A8] flex items-center justify-center text-center p-6">
                
                {/* Visual Avatar Placeholder & Artistic Backdrop */}
                <div className="space-y-3 z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FCE7A8] to-[#D89A3E] flex items-center justify-center shadow-inner border-2 border-white">
                    <Sparkles className="w-10 h-10 text-[#3A2409]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm uppercase tracking-widest text-[#B5762A] font-bold block">
                      Keila Wenling 文齡
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#3A2A18]">
                      幸運教主 & 暢銷書推薦序作者
                    </h3>
                    <p className="text-sm text-[#6A5642] max-w-[220px] leading-relaxed">
                      「用專案管理人的理性邏輯，<br />為你解開靈性世界的溫柔力量。」
                    </p>
                  </div>
                </div>

                {/* Inner radial gradient backdrop */}
                <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-[#D89A3E]/20 pointer-events-none"></div>
              </div>

              {/* Floating Highlight Card */}
              <div className="absolute -bottom-4 -left-4 sm:left-0 bg-[#FFFDF0] border border-[#F0DFA0] rounded-2xl py-2.5 px-4 shadow-lg flex items-center gap-3 backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-[#FDF6E6] border border-[#F0DFA0] flex items-center justify-center text-[#B5762A]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-[#3A2A18] leading-tight">《七週遇見對的人》</p>
                  <p className="text-sm text-[#9A8060]">暢銷書改版唯一推薦序作者</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
