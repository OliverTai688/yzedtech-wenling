'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Coins, Flame, Users, Compass, Wind, Flower2, ShieldCheck, Check, MessageCircle, Clock, X } from 'lucide-react';
import { services, reikiCourses, certificationCourses } from '../data';

interface ServicesSectionProps {
  initialSubTab?: string;
}

export default function ServicesSection({ initialSubTab }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<'healing' | 'theta-training' | 'certifications'>('healing');

  // Sub-filtering for Training
  const [trainingFilter, setTrainingFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced' | 'online'>('all');

  // Selected Service ID for the "完整介紹" popup (Energy Healing)
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  // Lock background scroll while the popup is open
  useEffect(() => {
    if (expandedServiceId) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [expandedServiceId]);

  // Synchronize when redirected from other sections
  // 注意：舊的《七週遇見對的人》／臼井靈氣課程 tab 已依 PRD-001 決策
  // #5、#6 移除，不再處理——任何指向這兩者的舊連結會安全落回預設的 healing tab。
  useEffect(() => {
    if (initialSubTab === 'theta-training') {
      setActiveTab('theta-training');
    } else if (initialSubTab === 'certifications') {
      setActiveTab('certifications');
    } else if (services.some(s => s.id === initialSubTab)) {
      setActiveTab('healing');
      setExpandedServiceId(initialSubTab || null);
      // Scroll to service block
      setTimeout(() => {
        const element = document.getElementById(`service-card-${initialSubTab}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
    }
  }, [initialSubTab]);

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'Users': return Users;
      case 'Compass': return Compass;
      case 'Flame': return Flame;
      case 'Coins': return Coins;
      case 'Heart': return Heart;
      case 'Wind': return Wind;
      case 'Flower2': return Flower2;
      default: return Sparkles;
    }
  };

  const filteredCourses = reikiCourses.filter(course => {
    if (trainingFilter === 'all') return true;
    if (trainingFilter === 'online') return course.type === 'online' || course.type === 'both';
    return course.level === trainingFilter;
  });

  return (
    <section id="services-section" className="py-20 bg-linear-to-b from-brand-stone-50 via-brand-pink-50/10 to-brand-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-pink-600 font-bold">Offerings</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif">
            三大核心服務體系：打造您的豐盛生活軌道
          </h2>
          <div className="w-12 h-1 bg-linear-to-r from-brand-pink-300 to-brand-gold-300 mx-auto rounded-full"></div>
          <p className="text-sm text-stone-600">
            從客製化能量調頻，到國際希塔療癒證照培訓，以及專業證照與直覺力培訓。陪伴你在生活的各個維度中除錯，回歸穩定。
          </p>
        </div>

        {/* Master Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-14 bg-brand-pink-100/40 p-2 rounded-2xl max-w-2xl mx-auto border border-brand-pink-100">
          <button
            onClick={() => setActiveTab('healing')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'healing'
                ? 'bg-linear-to-r from-brand-pink-500 to-brand-gold-500 text-white shadow-md'
                : 'text-brand-stone-800 hover:bg-[#FFFDF0]/70'
            }`}
          >
            能量療癒項目
          </button>
          <button
            onClick={() => setActiveTab('theta-training')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'theta-training'
                ? 'bg-linear-to-r from-brand-pink-500 to-brand-gold-500 text-white shadow-md'
                : 'text-brand-stone-800 hover:bg-[#FFFDF0]/70'
            }`}
          >
            希塔療癒認證培訓
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'certifications'
                ? 'bg-linear-to-r from-brand-pink-500 to-brand-gold-500 text-white shadow-md'
                : 'text-brand-stone-800 hover:bg-[#FFFDF0]/70'
            }`}
          >
            專業證照與直覺力培訓
          </button>
        </div>

        {/* TAB CONTENT 1: Energy Healing */}
        {activeTab === 'healing' && (
          <div className="space-y-8 animate-fadeIn" id="energy-healing-tab">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = getIcon(service.iconName);

                return (
                  <div
                    key={service.id}
                    id={`service-card-${service.id}`}
                    className="flex flex-col h-full bg-[#FDF6E6] rounded-2xl border border-[#F0DFA0] shadow-xs hover:shadow-md hover:border-brand-pink-200 transition-all duration-300"
                  >
                    {/* Thumbnail placeholder with matching colors */}
                    <div className="h-44 rounded-t-2xl relative overflow-hidden bg-linear-to-br from-brand-pink-50 to-brand-gold-50 flex items-center justify-center border-b border-stone-50">
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      <div className="w-16 h-16 rounded-full bg-[#FFFDF0] shadow-sm flex items-center justify-center text-brand-pink-600">
                        <IconComponent className="w-7 h-7 text-brand-pink-500" />
                      </div>
                      <span className="absolute bottom-3 left-3 text-[10px] text-stone-500 font-semibold bg-[#FFFDF0]/80 px-2.5 py-1 rounded-full border border-[#F0DFA0]/50">
                        {service.duration}
                      </span>
                    </div>

                    {/* Info Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-brand-stone-900 font-serif mb-2.5 flex items-center gap-1.5">
                        {service.name}
                      </h3>
                      <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Footer Actions */}
                      <div className="mt-auto pt-6 border-t border-stone-50 flex items-center gap-3">
                        <button
                          onClick={() => setExpandedServiceId(service.id)}
                          aria-haspopup="dialog"
                          className="flex-1 py-2 px-3 border border-stone-200 hover:border-brand-pink-200 hover:bg-brand-pink-50 text-stone-700 hover:text-brand-pink-600 text-xs font-semibold rounded-lg transition-all"
                        >
                          查看完整介紹
                        </button>
                        <a
                          href={service.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex justify-center items-center gap-1.5 py-2 px-3 bg-linear-to-r from-brand-pink-500 to-brand-gold-500 text-white hover:opacity-95 text-xs font-semibold rounded-lg shadow-xs hover:shadow-md transition-all text-center"
                        >
                          {service.ctaText.includes('LINE') && <MessageCircle className="w-3.5 h-3.5 text-white" />}
                          <span>{service.ctaText}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* "查看完整介紹" Popup */}
            <AnimatePresence>
              {expandedServiceId && (() => {
                const service = services.find(s => s.id === expandedServiceId);
                if (!service) return null;

                return (
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label={service.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-stone-900/50 backdrop-blur-xs"
                    onClick={() => setExpandedServiceId(null)}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 12 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative bg-[#FDF6E6] rounded-2xl shadow-xl border border-[#F0DFA0] w-full max-w-lg max-h-[85vh] overflow-y-auto"
                    >
                      <button
                        onClick={() => setExpandedServiceId(null)}
                        aria-label="關閉"
                        className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-brand-pink-600 hover:bg-brand-pink-50 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="p-6 sm:p-8 space-y-5">
                        <h3 className="text-xl font-bold text-brand-stone-900 font-serif pr-8">
                          {service.name}
                        </h3>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {service.description}
                        </p>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-brand-pink-600 tracking-wider">適合族群</span>
                          <p className="text-xs text-stone-700 leading-relaxed font-medium mt-0.5">{service.targetAudience}</p>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-brand-pink-600 tracking-wider">核心收穫與協助層面</span>
                          <ul className="mt-1.5 space-y-1.5">
                            {service.benefits.map((benefit, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-brand-pink-500 shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className="text-[11px] text-brand-stone-800/80 leading-relaxed bg-brand-gold-50 p-3 rounded-lg border border-brand-gold-100 italic">
                          {service.detailedDescription}
                        </p>

                        <a
                          href={service.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex justify-center items-center gap-1.5 py-2.5 px-3 bg-linear-to-r from-brand-pink-500 to-brand-gold-500 text-white hover:opacity-95 text-xs font-semibold rounded-lg shadow-xs hover:shadow-md transition-all text-center"
                        >
                          {service.ctaText.includes('LINE') && <MessageCircle className="w-3.5 h-3.5 text-white" />}
                          <span>{service.ctaText}</span>
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        )}

        {/* TAB CONTENT 2: Theta Training */}
        {activeTab === 'theta-training' && (
          <div className="space-y-8 animate-fadeIn" id="theta-training-tab">
            {/* Class Filtering Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { id: 'all', label: '顯示全部課程' },
                { id: 'beginner', label: '初階班 (入門)' },
                { id: 'intermediate', label: '中階班 (探掘)' },
                { id: 'advanced', label: '深度挖掘班 (先修)' },
                { id: 'online', label: '線上直播' }
              ].map(pill => (
                <button
                  key={pill.id}
                  onClick={() => setTrainingFilter(pill.id as 'all' | 'beginner' | 'intermediate' | 'advanced' | 'online')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider border transition-all duration-300 ${
                    trainingFilter === pill.id
                      ? 'bg-brand-pink-600 border-brand-pink-600 text-white'
                      : 'bg-[#FDF6E6] border-[#F0DFA0] text-stone-700 hover:bg-brand-pink-50 hover:border-brand-pink-200'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Courses Catalog Display */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-[#FDF6E6] rounded-2xl border border-[#F0DFA0] shadow-xs p-6 flex flex-col justify-between hover:shadow-md hover:border-brand-gold-200 transition-all duration-300 relative">
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-brand-gold-100 border border-brand-gold-200 text-brand-gold-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {course.badge}
                  </div>

                  <div>
                    {/* Course Level Indicator */}
                    <span className="text-[10px] font-bold text-brand-pink-500 uppercase tracking-widest block mb-1">
                      {course.level === 'beginner' && 'LEVEL 1・入門核心'}
                      {course.level === 'intermediate' && 'LEVEL 2・信念重組'}
                      {course.level === 'advanced' && 'LEVEL 3・深度挖掘'}
                    </span>

                    {/* Course Title */}
                    <h3 className="text-base sm:text-lg font-bold text-brand-stone-900 font-serif mb-4 leading-relaxed pr-16">
                      {course.name}
                    </h3>

                    {/* Core Objective Card */}
                    <div className="bg-brand-gold-50/50 rounded-xl p-4 border border-brand-gold-150 mb-6 text-xs text-stone-700 leading-relaxed font-medium">
                      🎯 <span className="text-brand-stone-900 font-bold">培訓目標：</span>{course.objective}
                    </div>

                    {/* Curriculum Syllabus */}
                    <div className="space-y-3 mb-8">
                      <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">課程核心大綱（國際證照授權）</span>
                      <ul className="space-y-2">
                        {course.curriculum.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
                            <span className="text-brand-gold-500 font-bold shrink-0 mt-0.5">✦</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing / CTA */}
                  <div className="pt-6 border-t border-stone-50">
                    <div className="flex justify-between items-center mb-4 text-xs text-stone-500">
                      <span>學習時數：{course.duration}</span>
                      <span className="bg-stone-100 px-2 py-0.5 rounded-sm">
                        {course.type === 'both' && '線上 / 實體皆有'}
                        {course.type === 'online' && '線上遠距直播'}
                        {course.type === 'physical' && '實體高階密集'}
                      </span>
                    </div>
                    <a
                      href={course.ctaLink || 'https://lin.ee/yo6a6FW'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex justify-center items-center gap-1.5 py-3 bg-linear-to-r from-brand-pink-500 to-brand-gold-500 text-white hover:opacity-95 font-semibold text-xs rounded-xl shadow-xs hover:shadow-md text-center transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>報名此課程</span>
                    </a>
                  </div>

                </div>
              ))}
            </div>

            {/* Certifications footer */}
            <div className="bg-[#FDF6E6] rounded-2xl border border-[#F0DFA0] p-6 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-xs">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-gold-100 text-brand-gold-600 rounded-full shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-stone-900">美國 ThetaHealing® 希塔療癒官方國際認證</h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">文齡老師為官方認可之國際導師，學員修畢課程並通過評核，即可獲頒官方結業證照，登錄為合格執業療癒師。</p>
                </div>
              </div>
              <a
                href="https://lin.ee/yo6a6FW"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-brand-pink-200 text-brand-pink-600 font-semibold text-xs hover:bg-brand-pink-50 transition-colors shrink-0"
              >
                加 LINE 洽詢開班日程 ➔
              </a>
            </div>

          </div>
        )}

        {/* TAB CONTENT 3: Certifications — Phase 2 內容依 PRD-001 §5 item 3 與
            docs/網站文案集.md 1824-2196 行（金錢靈氣／愛情靈氣證照／人魚靈氣證照）
            撰寫；直覺力訓練依文案集 241-249 行標註「⚠️ 待客戶補充」列為 coming-soon。
            舊的《七週遇見對的人》課程 tab 已依 PRD-001 決策 #5 移除。 */}
        {activeTab === 'certifications' && (
          <div className="space-y-8 animate-fadeIn" id="certifications-tab">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {certificationCourses.map((course) => {
                const isComingSoon = course.status === 'coming-soon';
                return (
                  <div
                    key={course.id}
                    className={`rounded-2xl border shadow-xs p-6 flex flex-col justify-between transition-all duration-300 relative ${
                      isComingSoon
                        ? 'bg-brand-stone-50/60 border-dashed border-stone-200'
                        : 'bg-[#FDF6E6] border-[#F0DFA0] hover:shadow-md hover:border-brand-gold-200'
                    }`}
                  >
                    <div className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      isComingSoon
                        ? 'bg-stone-100 border-stone-200 text-stone-500'
                        : 'bg-brand-gold-100 border-brand-gold-200 text-brand-gold-600'
                    }`}>
                      {course.badge}
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-brand-stone-900 font-serif mb-4 leading-relaxed pr-20">
                        {course.name}
                      </h3>

                      <div className="bg-brand-gold-50/50 rounded-xl p-4 border border-brand-gold-150 mb-6 text-xs text-stone-700 leading-relaxed font-medium">
                        🎯 <span className="text-brand-stone-900 font-bold">課程目標：</span>{course.objective}
                      </div>

                      <div className="space-y-3 mb-8">
                        <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">
                          {isComingSoon ? '規劃中大綱' : '課程核心大綱'}
                        </span>
                        <ul className="space-y-2">
                          {course.curriculum.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
                              <span className="text-brand-gold-500 font-bold shrink-0 mt-0.5">✦</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-stone-50">
                      <div className="flex items-center gap-1.5 mb-4 text-xs text-stone-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <a
                        href={course.ctaLink || 'https://lin.ee/yo6a6FW'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex justify-center items-center gap-1.5 py-3 font-semibold text-xs rounded-xl shadow-xs text-center transition-all ${
                          isComingSoon
                            ? 'bg-[#FDF6E6] border border-brand-pink-200 text-brand-pink-600 hover:bg-brand-pink-50'
                            : 'bg-linear-to-r from-brand-pink-500 to-brand-gold-500 text-white hover:opacity-95 hover:shadow-md'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{isComingSoon ? '搶先登記，開課通知我' : '報名此課程'}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
