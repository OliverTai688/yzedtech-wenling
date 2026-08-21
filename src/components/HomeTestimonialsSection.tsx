import { Sparkles, ArrowRight, Clock } from 'lucide-react';

// 2026-08-18 本輪瀏覽器視覺 QA 發現：原本這裡渲染 `testimonials`（見 ../data.ts）的 4 位
// 具名客戶完整故事（姓名／居住地／職業／前後對照／5 星評分），在 docs/網站文案集.md 裡
// 完全查無出處，且底部原本聲稱「均獲得本人授權並經去識別化處理」，屬不實聲明。
// 依使用者指示（2026-08-18）：先隱藏整段具名見證卡片，改為誠實的「籌備中」提示。
// 若要復原，將下方註解掉的 import 與卡片渲染區塊還原即可：
// import { Star, Quote } from 'lucide-react';
// import { testimonials } from '../data';

interface HomeTestimonialsSectionProps {
  onNavigateToTab: (tabId: string) => void;
}

export default function HomeTestimonialsSection({ onNavigateToTab }: HomeTestimonialsSectionProps) {
  return (
    <section id="testimonials-section" className="py-20 md:py-28 bg-[#FBF1DD] border-b border-[#F0DFA0]/70">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF6E6] border border-[#F0DFA0] text-[#B5762A] text-sm font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>真實個案蛻變見證</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#3A2A18] font-serif leading-snug">
            聽聽他們在潛意識除錯後的生命奇蹟
          </h2>
          <p className="text-base text-[#6A5642] leading-relaxed max-w-2xl mx-auto">
            我們正在向個案取得正式授權與去識別化整理，確保每一則分享都真實可查證，敬請期待。
          </p>
        </div>

        {/* 見證籌備中提示（取代原本查無出處的具名見證卡片） */}
        <div className="max-w-2xl mx-auto bg-[#FDF6E6] border border-[#F0DFA0] rounded-2xl p-8 sm:p-10 text-center space-y-3 mb-10">
          <Clock className="w-6 h-6 text-[#B5762A] mx-auto" />
          <p className="text-base text-[#6A5642] leading-relaxed">
            完整的個案故事上線前，歡迎透過 LINE 官方帳號或 Instagram 私訊直接詢問文齡老師過往的服務經驗。
          </p>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[#F0DFA0]/50 text-sm text-[#9A8060]">
          <button
            onClick={() => onNavigateToTab('testimonials')}
            className="text-base font-semibold text-[#8A5415] hover:text-[#3A2409] inline-flex items-center gap-1 shrink-0"
          >
            <span>前往真實見證頁</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
