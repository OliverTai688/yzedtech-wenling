'use client';

import React, { useState } from 'react';
import { Download, Play, MessageCircle, FileText, Sparkles } from 'lucide-react';
import { resources } from '../data';
import { ResourceItem } from '../types';

export default function ResourcesSection() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleResourceClick = (e: React.MouseEvent, item: ResourceItem) => {
    e.preventDefault();
    setDownloadSuccess(item.id);
    setTimeout(() => {
      setDownloadSuccess(null);
      window.open(item.ctaLink, '_blank');
    }, 1500);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'audio': return Play;
      case 'pdf': return Download;
      case 'article': return MessageCircle;
      case 'video': return Play;
      default: return FileText;
    }
  };

  return (
    <section id="resources-section" className="py-20 bg-[#FBF1DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-pink-600 font-bold">Free Resources</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif">
            免費能量自養資源與修持工具
          </h2>
          <div className="w-12 h-1 bg-linear-to-r from-brand-pink-300 to-brand-gold-300 mx-auto rounded-full"></div>
          <p className="text-sm text-stone-600">
            療癒不應設限。文齡老師親自製作多款免費自診手冊與高頻引導冥想，陪伴您在生活中練習敞開、找回寧靜。
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-14">
          {resources.map((item) => {
            const IconComponent = getIcon(item.type);
            const isDownloading = downloadSuccess === item.id;

            return (
              <div key={item.id} className="bg-[#FDF6E6] rounded-2xl border border-[#F0DFA0] p-6 flex flex-col justify-between hover:shadow-xs hover:border-[#D89A3E] transition-all duration-300 relative overflow-hidden">
                
                {/* Accent glow on corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-pink-50/50 rounded-bl-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-brand-pink-600 uppercase pr-2 pt-2">{item.type}</span>
                </div>

                <div className="space-y-4">
                  {/* Category Type */}
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gold-600 block">
                    {item.typeName}
                  </span>

                  {/* Title */}
                  <h3 className="font-bold font-serif text-sm sm:text-base text-brand-stone-900 pr-12">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Target Audience tag */}
                  <div className="bg-[#FBF1DD] rounded-lg p-3 text-xs text-stone-500 border border-[#F0DFA0]/60">
                    🎯 <b>適合對象：</b>{item.targetAudience}
                  </div>
                </div>

                {/* CTA Action Button */}
                <div className="pt-6 mt-6 border-t border-stone-50">
                  <button
                    onClick={(e) => handleResourceClick(e, item)}
                    disabled={isDownloading}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs tracking-wider transition-all shadow-2xs ${
                      isDownloading
                        ? 'bg-brand-gold-500 text-white'
                        : item.type === 'article'
                        ? 'bg-[#06C755] text-white hover:bg-[#05b04b]'
                        : 'bg-linear-to-r from-brand-pink-500 to-brand-gold-500 hover:from-brand-pink-600 hover:to-brand-gold-600 text-white hover:shadow-sm'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                    <span>
                      {isDownloading 
                        ? '🚀 模擬資源加載與連結中...' 
                        : item.ctaText}
                    </span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Free Community & Live Stream CTA — 引用文案集 382-384、1808-1817 行之真實免費公益直播與社群 */}
        <div className="bg-brand-gold-50/40 rounded-3xl border border-brand-gold-200 p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left 4 Cols: Illustration */}
            <div className="lg:col-span-4 bg-[#FDF6E6] rounded-2xl border border-[#F0DFA0] p-6 shadow-xs text-center space-y-4">
              <span className="text-[9px] text-stone-400 block uppercase">Weekly Free Live</span>
              <div className="w-20 h-20 rounded-full bg-linear-to-tr from-brand-pink-100 via-white to-brand-gold-200 mx-auto flex items-center justify-center shadow-xs">
                <Play className="w-8 h-8 text-brand-pink-500 fill-brand-pink-500" />
              </div>
              <h4 className="font-bold font-serif text-xs text-brand-stone-900 mt-2">豐盛之翼學苑・免費公益直播</h4>
              <p className="text-[10px] text-stone-500">每週一 21:30–22:30</p>
            </div>

            {/* Right 8 Cols: Community instructions */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase font-bold text-brand-pink-600 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                還在猶豫哪一項服務適合你？先來免費社群感受看看
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-brand-stone-900">
                加入免費社群【豐盛之翼學苑】，帶著願望進來，也帶著好消息出去
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                這裡每天都有滿滿的正能量，社群內每週都會舉辦免費的公益直播，參與直播還有機會得到專屬小禮物。進入社群需輸入密碼 168168。
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://reurl.cc/8DDd1M"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-brand-pink-600 hover:bg-brand-pink-700 text-white text-xs font-semibold"
                >
                  加入免費社群體驗
                </a>
                <a
                  href="https://lin.ee/yo6a6FW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-[#FFFDF0]/90 border border-[#F0DFA0] text-stone-800 text-xs font-semibold hover:bg-[#FFFDF0]"
                >
                  在 LINE 上獲取開班與直播通知 ➔
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
