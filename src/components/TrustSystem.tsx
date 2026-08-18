'use client';

import { useState } from 'react';
import { Users, Coins, Sparkles, Quote, ShieldAlert } from 'lucide-react';
import { testimonials } from '../data';

export default function TrustSystem() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'mom' | 'single' | 'business'>('all');

  // 依文案集 Story 區「現在，我每年累積破百次的個案療癒經驗，影響了至少30人踏上
  // 學習希塔療癒的道路」（第 436 行）與 Hero「整合希塔療癒、14 種以上靈氣與顯化技術」
  // （第 113 行）改寫，移除原本查無出處的「5億級企業業績」「100+ 位個案」等數字。
  const stats = [
    {
      id: 1,
      icon: Users,
      value: '破百次／年',
      label: '個案療癒陪伴經驗',
      description: '每年累積破百次的個案療癒經驗，陪伴媽媽、單身人士及企業主找回穩定與安全感。'
    },
    {
      id: 2,
      icon: Coins,
      value: '30+ 位',
      label: '學生踏上希塔療癒學習之路',
      description: '影響至少 30 人正式踏上學習希塔療癒的道路。'
    },
    {
      id: 3,
      icon: Sparkles,
      value: '14 種以上',
      label: '靈氣與顯化技術整合體系',
      description: '結合希塔療癒、金錢／豐盛／愛情／人魚靈氣、人生推進器、煙供、香水供等技術。'
    }
    // 原第 4 項統計卡（'7週陪伴' / 《七週遇見對的人》課程）已依 PRD-001 決策 #5
    // （2026-08-18 使用者確認）移除，因其內容完全建立在已下架的課程產品上。
    // 若之後想以「暢銷著作《七週遇見對的人》」重新呈現一張書籍主題卡，需先從
    // 文案集取得可用文案，不得杜撰代寫（見 PLN-002 §5.1）。
  ];

  const categories = [
    { id: 'all', name: '全部成功個案' },
    { id: 'mom', name: '媽媽守護案例' },
    { id: 'single', name: '單身愛情轉化' },
    { id: 'business', name: '企業主與經理人成長' }
  ];

  const filteredTestimonials = testimonials.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.persona === selectedCategory;
  });

  return (
    <section id="testimonials-section" className="py-20 bg-[#FBF1DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Achievements stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => {
            const IconComp = stat.icon;
            return (
              <div key={stat.id} className="bg-brand-gold-50/50 rounded-2xl border border-brand-pink-100 p-6 flex flex-col justify-between hover:shadow-xs hover:border-brand-pink-200 transition-all duration-300">
                <div className="space-y-4">
                  <div className="p-3 bg-[#FFFDF0] shadow-xs rounded-xl inline-block text-brand-pink-500">
                    <IconComp className="w-5 h-5 text-brand-pink-600" />
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold font-serif text-brand-stone-900 block tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold text-brand-gold-600 block mt-1">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[10px] text-stone-400">
                  * 數據與經驗源自個案累積與受眾回饋示意
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-pink-600 font-bold">Case Studies</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif">
            聽聽他們的真實轉化：從卡關到看見光
          </h2>
          <div className="w-12 h-1 bg-linear-to-r from-brand-pink-300 to-brand-gold-300 mx-auto rounded-full"></div>
          <p className="text-sm text-stone-600 leading-relaxed">
            每一個案例都是真實生命的舒展與蛻變。以下呈現個案接受療癒、祈福或加入課程後的原原本本心路歷程。
          </p>
        </div>

        {/* Testimonials Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-stone-150 pb-6 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as 'all' | 'mom' | 'single' | 'business')}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? 'bg-brand-pink-100 border-brand-pink-300 text-brand-pink-600'
                  : 'bg-[#FDF6E6] border-[#F0DFA0] text-stone-700 hover:bg-brand-pink-50 hover:border-brand-pink-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Testimonial Cards Layout (Before / After Contrast) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredTestimonials.map((item) => (
            <div key={item.id} className="bg-brand-gold-50/20 border border-stone-150 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              
              <div className="space-y-6">
                {/* Header info */}
                <div className="flex justify-between items-start border-b border-brand-pink-100/50 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-pink-600 tracking-wider bg-brand-pink-100 px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                    <h4 className="font-bold font-serif text-sm text-brand-stone-900 mt-2">
                      {item.clientName}
                    </h4>
                  </div>
                  <Quote className="w-8 h-8 text-brand-pink-200 shrink-0" />
                </div>

                {/* Before vs After Contrast Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Before card */}
                  <div className="bg-stone-100 rounded-xl p-4 border border-stone-200/80">
                    <span className="text-[10px] uppercase font-extrabold text-stone-500 tracking-wider block mb-1.5">
                      ✕ 療癒前卡關狀態
                    </span>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.beforeState}
                    </p>
                  </div>
                  
                  {/* After card */}
                  <div className="bg-brand-pink-100/40 rounded-xl p-4 border border-brand-pink-200">
                    <span className="text-[10px] uppercase font-extrabold text-brand-pink-600 tracking-wider block mb-1.5 flex items-center gap-1">
                      <span>✓ 能量對齊後轉化</span>
                      <Sparkles className="w-3 h-3 text-brand-pink-500 animate-pulse" />
                    </span>
                    <p className="text-xs text-brand-stone-900 font-medium leading-relaxed">
                      {item.afterState}
                    </p>
                  </div>
                </div>

                {/* Personal Testimonial Quote */}
                <div className="bg-[#FDF6E6] rounded-xl p-5 border border-[#F0DFA0] relative shadow-2xs">
                  <p className="text-xs text-stone-700 leading-relaxed italic relative z-10">
                    「 {item.testimonialText} 」
                  </p>
                  <div className="text-[10px] text-brand-gold-600 font-bold tracking-wider mt-3 text-right">
                    ➔ 對應服務：{item.relatedService}
                  </div>
                </div>

              </div>

              {/* Disclaimer inside card */}
              <div className="text-[9px] text-stone-400 italic text-center mt-6">
                * 免責提示：個案經驗因其潛意識投入與功課對齊程度而異，不代表保證效果，亦非醫療宣稱。
              </div>

            </div>
          ))}
        </div>

        {/* Global Testimonials Note / Disclaimer Banner */}
        <div className="bg-[#FDF6E6] rounded-2xl border border-[#F0DFA0] p-5 flex items-start gap-4 max-w-4xl mx-auto shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-brand-gold-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-brand-stone-900">身心靈能量陪伴之誠實守則</h5>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              幸運療癒師 Keila Wenling 文齡的所有個案見證，均獲得當事人去識別化同意後公開刊登。能量療癒與諮詢服務均為心靈保養與宇宙共振之日常輔助，旨在引導自我覺察與放鬆調和。<strong>本站服務絕不提供任何醫療診斷、藥物處方、心理諮商治療、法律訴訟、或投資與財務獲利建議。</strong> 如有身體或心理重大疾病，請優先就醫，為自身的身心決策承擔健康主權。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
