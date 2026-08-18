import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { services } from '../data';

interface HomeServicesGridProps {
  onNavigateToService: (serviceId: string) => void;
  onNavigateToTab: (tabId: string) => void;
}

export default function HomeServicesGrid({ onNavigateToService, onNavigateToTab }: HomeServicesGridProps) {
  return (
    <section id="services-grid-section" className="py-20 md:py-28 bg-[#FDF6E6] border-b border-[#F0DFA0]/70">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF0] border border-[#F0DFA0] text-[#B5762A] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>核心服務與旗艦體系</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#3A2A18] font-serif leading-snug">
            整合身心靈的三大服務與培訓體系
          </h2>
          <p className="text-sm sm:text-base text-[#6A5642] leading-relaxed max-w-2xl mx-auto">
            由理性科技人背景的文齡老師親自設計。從深層一對一能量調頻、國際官方雙證照認證，到原創陪伴式親密關係課程，全方位陪伴靈魂對齊豐盛。
          </p>
        </div>

        {/* 4 Columns x 2 Rows = 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 mb-12">
          {services.slice(0, 8).map((service, index) => {
            const numberFormatted = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                className="brand-card p-6 sm:p-7 flex flex-col justify-between group hover:border-[#D89A3E] transition-all duration-300"
              >
                <div>
                  {/* Card Top: Numbering + Badge */}
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="gold-number-gradient text-3xl sm:text-4xl font-serif font-black tracking-tight">
                      {numberFormatted}
                    </span>
                    <span className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFFDF0] border border-[#F0DFA0] text-[#8A5415]">
                      {service.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#3A2A18] font-serif mb-2.5 group-hover:text-[#B5762A] transition-colors leading-snug">
                    {service.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-[#6A5642] leading-relaxed line-clamp-3 mb-4">
                    {service.description}
                  </p>

                  {/* Target audience tag */}
                  <div className="text-[11px] text-[#9A8060] bg-[#FFFDF0]/80 p-2.5 rounded-xl border border-[#F0DFA0]/60 mb-5">
                    <span className="font-semibold text-[#8A5415]">適用對象：</span>
                    {service.targetAudience.slice(0, 32)}...
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-[#F0DFA0]/70 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onNavigateToService(service.id)}
                    className="text-xs font-semibold text-[#8A5415] hover:text-[#3A2409] flex items-center gap-1 transition-colors"
                  >
                    <span>詳情與大綱</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={service.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-btn px-3 py-1.5 text-[11px] font-semibold flex items-center gap-1 shadow-xs"
                  >
                    <span>預約選購</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Explorer Action */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigateToTab('services')}
            className="gold-btn px-8 py-3.5 text-sm font-bold inline-flex items-center gap-2"
          >
            <span>深入瀏覽三大體系完整大綱與課表</span>
            <span>➔</span>
          </button>
        </div>

      </div>
    </section>
  );
}
