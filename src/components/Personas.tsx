'use client';

import { useState } from 'react';
import { Heart, Sparkles, Coins, ArrowRight, Calendar, MessageCircle, ChevronDown, ChevronUp, Lightbulb, X } from 'lucide-react';

interface PersonasProps {
  onNavigateToService: (serviceId: string) => void;
  onNavigateToTab: (tabId: string) => void;
}

export default function Personas({ onNavigateToService, onNavigateToTab }: PersonasProps) {
  const [activePersona, setActivePersona] = useState<string | null>(null);

  const personas = [
    {
      id: 'mom',
      title: '家庭與孩子守護：溫柔媽媽',
      subtitle: '守護家宅和諧 • 舒緩育兒焦慮',
      icon: Heart,
      painPoint: '「每天為孩子的課業、健康與方向操碎了心，家庭氣氛緊繃焦慮。多渴望家裡和睦順利、孩子平安長大、自己也能擁有一夜好眠。」',
      description: '為辛勞的母親提供最深度的安定與守護。家庭是一個共振的磁場，當媽媽的內在重歸穩定放鬆，整個家庭也將迎來最溫柔的福德與和諧。',
      recommendedServices: [
        { name: '心靈引渡人｜一對一個人能量療癒', id: 'personal-1on1', desc: '疏通母親長期的疲勞與隱性壓力' },
        { name: '遠距煙供祈福儀式', id: 'smoke-prayer', desc: '古法慈悲祈福，淨化家宅磁場' },
        { name: '豐盛靈氣｜全方位能量調頻與願望顯化', id: 'abundance-reiki', desc: '為家庭注入順遂與豐盛福氣' }
      ],
      tip: '建議起點：先進行 1 次一對一深度調頻，釋放體內緊繃情緒，再透過遠距煙供祈福守護家宅與孩子。'
    },
    {
      id: 'single',
      title: '追尋真愛與價值：單身人士',
      subtitle: '遇見對的人 • 打破情感卡關',
      icon: Sparkles,
      painPoint: '「渴望遇到合適伴侶，卻在過往的情感背叛或不自信中卡關。總是遇到錯的人、下意識推開幸福，害怕自己不夠好、不配被捧在手心疼愛。」',
      description: '幫助您重塑自愛力，拔除感情裡的「限制性信念毒素」。這是一段陪伴式的轉化旅程，幫助您敞開心輪，與對的人在同頻的高度相遇。',
      recommendedServices: [
        { name: '靈性解讀與能量療癒', id: 'spiritual-reading', desc: '靈魂伴侶解讀，精準過濾毒性關係、顯化契合的靈魂伴侶' },
        { name: '五行香水供奉｜佛前加持版', id: 'five-elements-perfume', desc: '依你的八字調配桃花與貴人香氛，7 天 24 小時佛前供奉' },
        { name: '心靈引渡人｜一對一個人能量療癒', id: 'personal-1on1', desc: '探掘並解開童年或過往關係的深層卡點' }
      ],
      tip: '建議起點：先預約靈魂伴侶解讀看清目前吸引的能量狀態，再搭配一對一能量療癒深入探掘感情卡關的根源信念。'
    },
    {
      id: 'business',
      title: '事業豐盛與決策：企業/業務/投資人',
      subtitle: '突破業績瓶頸 • 豐盛金錢容器',
      icon: Coins,
      painPoint: '「身處商場高壓，大腦塞滿數據與焦慮。正面臨融資、拓展或投資瓶頸，常常失眠易怒，渴望看清市場機會、提升業績與大氣豐盛磁場。」',
      description: '為經營者、創業者、主管、業務與投資者提供專屬的「心靈護航與大腦除錯」。透過清理物質匱乏感與得失心雜音，喚醒清澈的商業直覺與領導力。',
      recommendedServices: [
        { name: '豐盛靈氣｜全方位能量調頻與願望顯化', id: 'abundance-reiki', desc: '清理底層破產/匱乏恐懼，拓寬財富容器' },
        { name: '靈性按摩｜全域氣場修護與脈輪清理', id: 'spiritual-massage', desc: '財務阻礙清理主題，聚焦處理拖延與自我價值卡點' },
        { name: '心靈引渡人｜一對一個人能量療癒', id: 'personal-1on1', desc: '釋放決策焦慮，調整事業整體能量場' }
      ],
      tip: '建議起點：先加入豐盛靈氣梯次調頻財富磁場，並可搭配靈性按摩的財務阻礙清理主題，進行更深度的信念重塑。'
    }
  ];

  const togglePersona = (personaId: string) => {
    if (activePersona === personaId) {
      setActivePersona(null);
    } else {
      setActivePersona(personaId);
    }
  };

  return (
    <section id="personas-section" className="py-20 md:py-28 bg-[#FBF1DD] border-b border-[#F0DFA0]/70">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF6E6] border border-[#F0DFA0] text-[#B5762A] text-sm font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>三大受眾專屬導覽</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#3A2A18] font-serif leading-snug">
            為不同階段的你，量身規劃專屬療癒起點
          </h2>
          <p className="text-base text-[#6A5642] leading-relaxed max-w-2xl mx-auto">
            身心靈療癒不是迷信，而是精準的「大腦程式除錯與能量對齊」。不論您處在何種生命階段，文齡老師都為您整理了最理性、安心且溫和的轉化地圖。
          </p>
        </div>

        {/* 3 Columns Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 mb-8">
          {personas.map((persona) => {
            const IconComponent = persona.icon;
            const isExpanded = activePersona === persona.id;

            return (
              <div
                key={persona.id}
                className={`brand-card p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isExpanded ? 'ring-2 ring-[#D89A3E] shadow-lg' : ''
                }`}
              >
                <div>
                  {/* Top Icon & Tag */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFFDF0] border border-[#F0DFA0] flex items-center justify-center shadow-xs">
                      <IconComponent className="w-6 h-6 text-[#B5762A]" />
                    </div>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full bg-[#FFFDF0] border border-[#F0DFA0] text-[#8A5415]">
                      專屬起點
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#3A2A18] font-serif mb-1">
                    {persona.title}
                  </h3>
                  <p className="text-base text-[#B5762A] font-medium mb-5">
                    {persona.subtitle}
                  </p>

                  {/* Pain Point Quote */}
                  <div className="bg-[#FFFDF0]/90 border-l-3 border-[#D89A3E] p-4 rounded-r-xl mb-5 text-base text-[#5A4A38] leading-relaxed italic">
                    {persona.painPoint}
                  </div>

                  {/* Description */}
                  <p className="text-base text-[#6A5642] leading-relaxed mb-6">
                    {persona.description}
                  </p>
                </div>

                {/* Bottom Toggle Button */}
                <div className="pt-4 border-t border-[#F0DFA0]/80">
                  <button
                    onClick={() => togglePersona(persona.id)}
                    className="w-full py-3 px-4 rounded-full bg-[#FFFDF0] hover:bg-[#FFF] border border-[#F0DFA0] text-[#8A5415] hover:text-[#3A2409] text-base font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <span>{isExpanded ? '收合專屬推薦' : '查看適合我的療癒路徑'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Expanded Drawer */}
        {activePersona && (
          <div className="bg-[#FDF6E6] border border-[#F0DFA0] rounded-[20px] p-6 sm:p-9 shadow-md mt-4 transition-all">
            {personas
              .filter((p) => p.id === activePersona)
              .map((p) => (
                <div key={p.id} className="space-y-6">
                  
                  {/* Drawer Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#F0DFA0] pb-4 gap-4">
                    <div>
                      <span className="text-sm text-[#B5762A] font-bold uppercase tracking-wider">
                        Personalized Path Guide
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#3A2A18] mt-1">
                        幸運教主文齡為【{p.title.split('：')[1] || p.title}】量身規劃的轉化路徑
                      </h4>
                    </div>
                    <button
                      onClick={() => setActivePersona(null)}
                      className="self-start text-base font-semibold text-[#7A6650] hover:text-[#3A2A18] border border-[#F0DFA0] bg-[#FFFDF0] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>收合此視窗</span>
                    </button>
                  </div>

                  {/* 3 Step Recommendation Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {p.recommendedServices.map((service, idx) => (
                      <div key={idx} className="bg-[#FFFDF0] rounded-2xl p-5 border border-[#F0DFA0] flex flex-col justify-between shadow-xs">
                        <div>
                          <div className="flex items-center gap-2 mb-2.5">
                            <span className="w-6 h-6 rounded-full bg-[#FDF6E6] border border-[#F0DFA0] text-[#B5762A] flex items-center justify-center text-sm font-bold font-serif">
                              {idx + 1}
                            </span>
                            <h5 className="font-bold text-base text-[#3A2A18]">{service.name}</h5>
                          </div>
                          <p className="text-base text-[#6A5642] leading-relaxed mb-4">
                            {service.desc}
                          </p>
                        </div>
                        <button
                          onClick={() => onNavigateToService(service.id)}
                          className="w-full py-2 bg-[#FDF6E6] hover:bg-[#FBF1DD] text-[#8A5415] hover:text-[#3A2409] font-semibold text-base rounded-full transition-colors border border-[#F0DFA0] text-center flex items-center justify-center gap-1.5"
                        >
                          <span>查看服務詳情</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Mentor Tip Box */}
                  <div className="bg-[#FFFDF0] border-l-4 border-[#B5762A] p-5 rounded-r-2xl space-y-3">
                    <p className="text-base font-medium text-[#3A2A18] leading-relaxed flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-[#B5762A] shrink-0 mt-0.5" />
                      <span>{p.tip}</span>
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <button
                        onClick={() => onNavigateToTab('contact')}
                        className="gold-btn px-5 py-2 text-base font-semibold flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>填寫諮詢表單預約</span>
                      </button>
                      <a
                        href="https://lin.ee/yo6a6FW"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-full bg-[#06C755] hover:bg-[#05b04b] text-white font-semibold text-base flex items-center gap-1.5 shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>加入 LINE 社群領取日常指南</span>
                      </a>
                    </div>
                  </div>

                </div>
              ))}
          </div>
        )}

      </div>
    </section>
  );
}
