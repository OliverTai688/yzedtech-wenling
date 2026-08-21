'use client';

import { useState } from 'react';
import { HelpCircle, Plus, Minus, ShieldAlert } from 'lucide-react';
import { faqs } from '../data';

export default function FAQSection() {
  const [selectedPersona, setSelectedPersona] = useState<'all' | 'mom' | 'single' | 'business'>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(faqs[0]?.id || null);

  const personaTabs = [
    { id: 'all', name: '全部常見問題' },
    { id: 'mom', name: '家庭與媽媽專區' },
    { id: 'single', name: '單身愛情轉化' },
    { id: 'business', name: '企業與業務豐盛' }
  ];

  const displayedFaqs = selectedPersona === 'all' 
    ? faqs 
    : faqs.filter((faq) => faq.persona === selectedPersona);

  const handleToggle = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-20 md:py-28 bg-[#FBF1DD] border-b border-[#F0DFA0]/70">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF6E6] border border-[#F0DFA0] text-[#B5762A] text-sm font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>常見疑惑與理性認知</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#3A2A18] font-serif leading-snug">
            常見問題 FAQ 與正確心態對齊
          </h2>
          <p className="text-base text-[#6A5642] leading-relaxed max-w-2xl mx-auto">
            我們相信「理性的溝通，才能產生深度的信任」。文齡老師針對大眾最常關心的療癒過程、準備工作與科學原理給予透明答覆。
          </p>
        </div>

        {/* Persona Group Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-xl mx-auto p-1.5 bg-[#FDF6E6] rounded-full border border-[#F0DFA0]">
          {personaTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedPersona(tab.id as 'all' | 'mom' | 'single' | 'business');
              }}
              className={`flex-1 py-2 px-3 rounded-full text-base font-bold transition-all ${
                selectedPersona === tab.id
                  ? 'bg-[#FFFDF0] text-[#3A2409] border border-[#D89A3E] shadow-xs'
                  : 'text-[#6A5642] hover:text-[#3A2A18]'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List with + / - icons */}
        <div className="max-w-3xl mx-auto space-y-4 mb-14">
          {displayedFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;

            return (
              <div
                key={faq.id}
                onClick={() => handleToggle(faq.id)}
                className={`cursor-pointer rounded-[18px] border p-5 sm:p-6 transition-all duration-200 bg-[#FDF6E6] ${
                  isExpanded
                    ? 'border-[#D89A3E] shadow-md ring-1 ring-[#D89A3E]/50'
                    : 'border-[#F0DFA0] hover:border-[#D89A3E]/70 shadow-xs'
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-center gap-4">
                  <h4 className="font-bold text-base sm:text-lg text-[#3A2A18] font-serif leading-snug">
                    {faq.question}
                  </h4>
                  <div className="w-7 h-7 rounded-full bg-[#FFFDF0] border border-[#F0DFA0] flex items-center justify-center text-[#B5762A] shrink-0">
                    {isExpanded ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {/* Answer */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#F0DFA0]/80">
                    <p className="text-base text-[#5A4A38] leading-relaxed whitespace-pre-line bg-[#FFFDF0]/90 p-4 rounded-xl border border-[#F0DFA0]/60">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ethics Disclaimer Alert Box */}
        <div className="bg-[#FFFDF0] rounded-2xl border border-[#F0DFA0] p-6 flex items-start gap-4 max-w-3xl mx-auto shadow-xs">
          <ShieldAlert className="w-6 h-6 text-[#B5762A] shrink-0 mt-0.5" />
          <div className="space-y-1 text-left">
            <h5 className="text-base font-bold text-[#3A2A18]">
              理性守護原則：療癒旨在自我覺察與放鬆支持
            </h5>
            <p className="text-base text-[#6A5642] leading-relaxed">
              本網站所提供之能量療癒、靈氣與相關課程，皆屬身心靈輔助與自我覺察支持，非醫療行為，不能取代專業醫療診斷、精神醫學治療或專業諮商。如有生理或心理疾患，請務必優先諮詢專業醫師。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
