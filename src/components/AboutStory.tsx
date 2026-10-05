'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, GraduationCap, Layers, ArrowRight, Users } from 'lucide-react';
import { methodologySystems, teamPartners } from '../data';

// About 頁：品牌理念與 14 項方法體系總覽（文案集「02 | About」區塊）。
// 完整的「我的故事」與學經歷／證照已依 PLN-002 Phase 4 拆分至獨立的 /story 頁
// （見 src/components/StorySection.tsx），此處僅保留精簡版簡介 + 導向連結。
export default function AboutStory() {
  const [selectedModality, setSelectedModality] = useState<number>(1);

  return (
    <section id="about-section" className="py-20 bg-[#FBF1DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Split Layout: Bio & Brand Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left Side: Avatar/Illustration placeholder */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-3/4 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-linear-to-tr from-brand-pink-100 to-brand-gold-150 p-8 flex flex-col justify-between">

              <div className="flex justify-between items-start">
                <span className="text-sm uppercase tracking-widest text-brand-pink-600 font-bold bg-[#FFFDF0] px-2.5 py-1 rounded-full shadow-2xs">Founder Bio</span>
                <Sparkles className="w-5 h-5 text-brand-gold-600" />
              </div>

              {/* Bio content avatar text */}
              <div className="my-auto text-center space-y-4">
                <div className="w-32 h-32 rounded-full bg-[#FFFDF0] mx-auto flex items-center justify-center shadow-md relative overflow-hidden">
                  {/* Subtle portrait gradient representation */}
                  <div className="absolute inset-1 rounded-full bg-linear-to-tr from-brand-pink-300 via-white to-brand-gold-300 flex items-center justify-center">
                    <GraduationCap className="w-12 h-12 text-brand-pink-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-stone-900 font-serif">Keila Wenling 文齡</h3>
                  <p className="text-base text-brand-gold-600 font-semibold mt-1">幸運教主 / 雙證照國際培訓導師</p>
                  <p className="text-sm text-stone-500 mt-2">理性專案管理背景 × 溫柔直覺感應器</p>
                </div>
              </div>

              {/* Tag credentials */}
              <div className="text-center pt-4 border-t border-brand-pink-200/50 space-y-1.5">
                <span className="inline-block text-sm text-stone-500 font-medium">美國 THInK 官方認證國際希塔療癒導師</span>
              </div>

            </div>
          </div>

          {/* Right Side: Brand Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-sm uppercase tracking-widest text-brand-pink-600 font-bold">Brand Philosophy</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif leading-tight">
              在愛與豐盛中綻放靈魂的光芒
            </h2>
            <div className="w-12 h-1 bg-linear-to-r from-brand-pink-300 to-brand-gold-300 rounded-full"></div>

            {/* Philosophy quote — 文案集「▍ 品牌理念」原文 */}
            <div className="bg-brand-pink-50 border-l-4 border-brand-pink-500 p-4.5 rounded-r-2xl italic text-base text-brand-stone-800 leading-relaxed font-serif">
              「引導每一位來到這裡的靈魂家人，褪去潛意識的限制與傷痛，喚醒內在的豐盛與平靜，活出最真實、閃耀且充滿力量的人生。」
            </div>

            <div className="text-base text-stone-600 space-y-4 leading-relaxed">
              <p>
                我相信，每個人本身就具備自我療癒與創造奇蹟的力量。療癒，從來不是向外索求救贖，而是一場「向內找回力量」的旅程。當我們清理了能量場上的淤堵與限制性信念，宇宙的豐盛與愛，自然會順流來到你的生命中。
              </p>
              <p>
                我不僅僅提供單一的能量舒緩，而是整合了多元專業技術體系，針對你的「身體、情緒、心智、靈魂與物質層面」提供全方位的客製化解方。比起短暫的平靜，我更重視陪伴你找到問題的「根源」，並透過系統化的工具，賦予你自我蛻變的能力。在這裡，我們不僅療癒過去，更要創造未來。
              </p>
            </div>

            <Link
              href="/story"
              className="inline-flex items-center gap-1.5 text-base font-semibold text-brand-pink-600 hover:text-brand-pink-700"
            >
              <span>閱讀我從全面崩塌到重生的完整故事</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Modalities Section (14 Core Healing Modalities - Interactive Accordion Grid) */}
        <div className="bg-brand-gold-50/50 rounded-3xl border border-brand-gold-150 p-6 sm:p-10 mb-10 shadow-2xs">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-sm uppercase tracking-widest text-brand-gold-600 font-bold">14 Methodologies</span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-brand-stone-900">
              14 項專業療癒與顯化技術總覽
            </h3>
            <p className="text-base text-stone-500">
              文齡老師不拘泥於單一療法，而是根據您的核心卡點，靈活調配並整合以下 14 種成熟的身心靈保養與顯化工具。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 5 Cols: Grid selector of the 14 Modalities */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-2.5">
              {methodologySystems.map((sys) => (
                <button
                  key={sys.id}
                  onClick={() => setSelectedModality(sys.id)}
                  className={`px-4 py-3 rounded-xl text-left text-base font-semibold tracking-wider transition-all duration-300 border ${
                    selectedModality === sys.id
                      ? 'bg-brand-pink-600 border-brand-pink-600 text-white shadow-xs'
                      : 'bg-[#FDF6E6] border-[#F0DFA0] text-stone-700 hover:bg-brand-gold-100 hover:border-brand-gold-400 hover:text-brand-stone-900'
                  }`}
                >
                  <span className="font-display mr-1">{sys.id < 10 ? `0${sys.id}` : sys.id}.</span> {sys.name}
                </button>
              ))}
            </div>

            {/* Right 7 Cols: Display detail box of the active Modality */}
            <div className="lg:col-span-7 bg-[#FDF6E6] rounded-2xl border border-[#F0DFA0] p-6 sm:p-8 flex flex-col justify-between shadow-2xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-pink-50 rounded-bl-full opacity-50 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-brand-pink-300 translate-x-4 -translate-y-4" />
              </div>

              {methodologySystems
                .filter((sys) => sys.id === selectedModality)
                .map((sys) => (
                  <div key={sys.id} className="space-y-5 animate-fadeIn">
                    <span className="text-sm font-bold text-brand-pink-600 tracking-widest uppercase block">
                      SYSTEM INTEGRATION {sys.id} / 14
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold font-serif text-brand-stone-900">
                      {sys.name}
                    </h4>
                    <p className="text-base text-stone-600 leading-relaxed bg-brand-gold-50/40 p-4.5 rounded-xl border border-brand-gold-100 italic">
                      {sys.definition}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <span className="text-sm font-bold text-stone-500 uppercase tracking-wider block">能解決什麼問題？</span>
                        <p className="text-base text-stone-500 leading-relaxed">{sys.solves}</p>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-sm font-bold text-stone-500 uppercase tracking-wider block">適合什麼樣的人？</span>
                        <p className="text-base text-stone-500 leading-relaxed">{sys.suitedFor}</p>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="pt-6 mt-8 border-t border-stone-100 flex justify-between items-center text-sm text-stone-400">
                <span>* 14 項技術皆可作為日常自我保養與能量提升之安全輔助</span>
                <span className="font-semibold text-brand-pink-600">理性調和 • 愛與豐盛</span>
              </div>
            </div>
          </div>
        </div>

        {/* Synergy note — 文案集「這些技術之間的關係是什麼？」三階段摘要 */}
        <div className="bg-[#FDF6E6] rounded-2xl border border-[#F0DFA0] p-6 sm:p-8 mb-20 max-w-5xl mx-auto">
          <div className="flex items-center gap-2.5 mb-4">
            <Layers className="w-4 h-4 text-brand-pink-500" />
            <h4 className="font-bold font-serif text-base text-brand-stone-900">這 14 項技術可以搭配使用嗎？</h4>
          </div>
          <p className="text-base text-stone-500 leading-relaxed mb-4">
            這 14 項技術就像是一個完整的個人蛻變工具箱，彼此不僅不衝突，還能產生加乘效果，依您當下的狀態提供三階段支援：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-base text-stone-600 leading-relaxed">
            <div className="bg-brand-gold-50/40 rounded-xl p-4 border border-brand-gold-100">
              <span className="font-bold text-brand-stone-900 block mb-1">① 淨化與釋放</span>
              煦陽靈氣疏通經絡、獨角獸靈氣深度淨化，搭配希塔療癒拔除根源信念。
            </div>
            <div className="bg-brand-gold-50/40 rounded-xl p-4 border border-brand-gold-100">
              <span className="font-bold text-brand-stone-900 block mb-1">② 滋養與修復</span>
              彩虹靈氣修補靈魂能量，百花靈氣與臼井靈氣帶來深層放鬆，搭配香水供調整五行頻率。
            </div>
            <div className="bg-brand-gold-50/40 rounded-xl p-4 border border-brand-gold-100">
              <span className="font-bold text-brand-stone-900 block mb-1">③ 顯化與推進</span>
              疊加金錢靈氣、鬱金香熱情靈氣或人魚靈氣，啟動人生推進器斷捨離舊模式。
            </div>
          </div>
        </div>

        {/* Team Partners Section — PRD-002 §3.5：合作夥伴（療癒師／協作老師）介紹卡片。
            素材（真實姓名、照片、簡介）尚未提供，先用佔位資料卡版位，之後只需
            替換 src/data.ts 的 teamPartners 內容即可上線，元件不需再改。
            id="partners"：頁尾「合作夥伴」連結的錨點（PRD-003 §4.13）。 */}
        <div id="partners" className="mb-20 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-sm uppercase tracking-widest text-brand-pink-600 font-bold">Our Partners</span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-brand-stone-900">
              攜手同行的合作夥伴
            </h3>
            <p className="text-base text-stone-500">
              豐盛之翼學苑攜手多位專業療癒師與協作老師，一同陪伴你在不同面向找回豐盛與力量。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-[#FDF6E6] rounded-2xl border border-[#F0DFA0] p-6 flex flex-col items-center text-center gap-3 shadow-2xs"
              >
                <div className="w-20 h-20 rounded-full bg-[#FFFDF0] flex items-center justify-center shadow-md relative overflow-hidden shrink-0">
                  {partner.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={partner.photoUrl} alt={partner.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-1 rounded-full bg-linear-to-tr from-brand-pink-300 via-white to-brand-gold-300 flex items-center justify-center">
                      <Users className="w-8 h-8 text-brand-pink-500" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold font-serif text-base text-brand-stone-900">{partner.name}</h4>
                  <p className="text-sm text-brand-gold-600 font-semibold mt-0.5">{partner.title}</p>
                </div>
                <span className="text-sm text-stone-500 bg-brand-gold-50/60 border border-brand-gold-100 px-3 py-1 rounded-full">
                  {partner.specialty}
                </span>
                <p className="text-sm text-stone-500 leading-relaxed">{partner.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to full Story page — 學經歷／證照與完整故事已拆分至 /story */}
        <div className="max-w-5xl mx-auto bg-linear-to-br from-brand-pink-50 to-brand-gold-50 rounded-3xl border border-brand-gold-150 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFFDF0] flex items-center justify-center shadow-xs shrink-0">
              <GraduationCap className="w-6 h-6 text-brand-pink-500" />
            </div>
            <div>
              <h4 className="font-bold font-serif text-base sm:text-lg text-brand-stone-900">想更了解文齡老師的故事與專業資歷？</h4>
              <p className="text-base text-stone-600 mt-1">從全面崩塌到重生的完整故事，以及學經歷、國際授權證照總覽。</p>
            </div>
          </div>
          <Link
            href="/story"
            className="gold-btn px-6 py-3 text-base font-semibold flex items-center gap-1.5 shrink-0"
          >
            <span>閱讀我的故事與學經歷</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
