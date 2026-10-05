import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import { siteLinks } from '../data';

// 對應文案集 Block 5｜Section 3：直覺力培訓（Training CTA），文案集本身標註
// 「⚠️ 待客戶補充」，因此本區塊呈現為 coming-soon 預告，CTA 導向真實 LINE
// 官方帳號做搶先登記，不杜撰課程大綱或開課日期。
export default function HomeIntuitionBanner() {
  return (
    <section id="intuition-banner-section" className="py-14 md:py-20 bg-[#FBF1DD] border-b border-[#F0DFA0]/70">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">

        {/* Bokeh background rounded container */}
        <div className="bokeh-bg rounded-[24px] border border-[#F0DFA0] p-8 sm:p-12 md:p-14 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">

          {/* Subtle sparkling floating decorative element */}
          <div className="absolute top-4 right-8 pointer-events-none opacity-30 text-[#D89A3E] animate-pulse">
            <Sparkles className="w-12 h-12" />
          </div>

          {/* Left Text */}
          <div className="space-y-3.5 max-w-2xl text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF0]/90 border border-[#F0DFA0] text-[#B5762A] text-sm font-semibold">
              <Eye className="w-3.5 h-3.5" />
              <span>即將推出・搶先登記</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-[30px] font-bold text-[#3A2A18] font-serif leading-snug">
              直覺力培訓｜喚醒你與生俱來的靈通天賦
            </h3>

            <p className="text-base text-[#5A4A38] leading-relaxed">
              你是否也曾在某個瞬間，準確預感到即將發生的事？其實每個人都擁有與生俱來的直覺力，只是被日常的忙碌與雜訊掩蓋了。透過系統化的直覺力訓練，你將學會清晰接收、辨識並運用自己的靈通感知，讓直覺成為你人生中最可靠的指引。課程大綱籌備中，敬請期待。
            </p>
          </div>

          {/* Right Action Button */}
          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3.5 z-10">
            <a
              href={siteLinks.line}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn px-8 py-4 text-base font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>搶先登記，開課通知我</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
