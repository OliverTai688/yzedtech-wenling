import { Star, Sparkles, Quote, ArrowRight } from 'lucide-react';
import { testimonials } from '../data';

interface HomeTestimonialsSectionProps {
  onNavigateToTab: (tabId: string) => void;
}

export default function HomeTestimonialsSection({ onNavigateToTab }: HomeTestimonialsSectionProps) {
  return (
    <section id="testimonials-section" className="py-20 md:py-28 bg-[#FBF1DD] border-b border-[#F0DFA0]/70">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF6E6] border border-[#F0DFA0] text-[#B5762A] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>真實個案蛻變見證</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#3A2A18] font-serif leading-snug">
            聽聽他們在潛意識除錯後的生命奇蹟
          </h2>
          <p className="text-sm sm:text-base text-[#6A5642] leading-relaxed max-w-2xl mx-auto">
            每一次調頻都是一場與內在自我的深情對話。去識別化的真實分享，記錄著從焦慮緊繃、情感卡關，走向平靜與豐盛的每一步。
          </p>
        </div>

        {/* 4 Columns Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 mb-10">
          {testimonials.map((test) => {
            return (
              <div
                key={test.id}
                className="brand-card p-6 sm:p-7 flex flex-col justify-between hover:border-[#D89A3E] transition-all duration-300"
              >
                <div>
                  {/* Category Badge & 5 Stars */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFFDF0] border border-[#F0DFA0] text-[#8A5415]">
                      {test.category}
                    </span>
                    <div className="flex text-[#D89A3E]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D89A3E]" />
                      ))}
                    </div>
                  </div>

                  {/* Client Name / Persona */}
                  <h3 className="text-sm sm:text-base font-bold text-[#3A2A18] font-serif mb-3">
                    {test.clientName}
                  </h3>

                  {/* Quote text */}
                  <div className="relative mb-5">
                    <Quote className="w-5 h-5 text-[#F0DFA0] absolute -top-2.5 -left-1 opacity-70" />
                    <p className="text-xs text-[#5A4A38] leading-relaxed relative z-10 pl-4 italic line-clamp-6">
                      「{test.testimonialText}」
                    </p>
                  </div>

                  {/* Before / After Tagging */}
                  <div className="space-y-2 bg-[#FFFDF0]/90 p-3.5 rounded-xl border border-[#F0DFA0]/60 mb-4 text-[11px]">
                    <div className="text-[#8A5415]">
                      <span className="font-bold">調頻前：</span>
                      <span className="text-[#6A5642]">{test.beforeState.slice(0, 38)}...</span>
                    </div>
                    <div className="text-[#207038] pt-1.5 border-t border-[#F0DFA0]/40">
                      <span className="font-bold">調頻後：</span>
                      <span className="text-[#3A5038]">{test.afterState.slice(0, 38)}...</span>
                    </div>
                  </div>
                </div>

                {/* Footer of Card: Related Service */}
                <div className="pt-3 border-t border-[#F0DFA0]/60 text-[11px] text-[#9A8060] flex items-center justify-between">
                  <span className="truncate">參與：{test.relatedService}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Disclaimer & Navigation CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F0DFA0]/50 text-xs text-[#9A8060]">
          <p className="italic">
            *註：所有個案分享均獲得本人授權並經去識別化處理。能量療癒與調頻效果因個人覺察與生活實踐而異，非醫療行為。
          </p>
          <button
            onClick={() => onNavigateToTab('testimonials')}
            className="text-xs font-semibold text-[#8A5415] hover:text-[#3A2409] inline-flex items-center gap-1 shrink-0"
          >
            <span>閱讀更多個案對比心得</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
