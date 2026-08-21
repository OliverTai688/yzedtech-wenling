'use client';

import Link from 'next/link';
import {
  Sparkles, Heart, Coins, Flame, Users, Compass, Wind, Flower2,
  Check, MessageCircle, Clock, ChevronRight, ShieldAlert
} from 'lucide-react';
import type { Service } from '../../../src/types';
import { testimonials } from '../../../src/data';

// PRD-002 §3.3 v1.1（Batch E）：服務詳細頁，延續原本卡片欄位（適合對象、效益列點、
// 方案/價格、CTA），版面比照商城商品銷售頁的完整介紹形式加長鋪陳，並加入該項
// 專屬客戶見證區塊。圖片一律用品牌漸層背景＋文字呈現，不使用照片。
// 見證資料：目前 `testimonials`（src/data.ts）內容經 2026-08-18 QA 認定查無文案集
// 出處、全站已停用渲染，本輪各服務的 testimonialIds 一律為空陣列，因此以下會
// 顯示與 TrustSystem.tsx／HomeTestimonialsSection.tsx 一致的「整理中」誠實提示，
// 而非虛構或誤配見證內容。

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

interface ServiceDetailClientPageProps {
  service: Service;
}

export default function ServiceDetailClientPage({ service }: ServiceDetailClientPageProps) {
  const IconComponent = getIcon(service.iconName);
  const relatedTestimonials = testimonials.filter((t) => service.testimonialIds?.includes(t.id));

  return (
    <div className="animate-fadeIn py-16 bg-linear-to-b from-brand-stone-50 via-brand-pink-50/10 to-brand-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-stone-500 mb-8">
          <Link href="/services" className="hover:text-brand-pink-600 font-medium">核心能量調頻服務</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-stone-800 font-semibold">{service.name}</span>
        </nav>

        {/* Hero: brand gradient + text, no photography */}
        <div className="rounded-3xl overflow-hidden border border-stone-100 shadow-sm mb-10">
          <div className="h-56 sm:h-64 relative bg-linear-to-br from-brand-pink-100 via-brand-pink-50 to-brand-gold-100 flex items-center justify-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center text-brand-pink-600">
              <IconComponent className="w-10 h-10 text-brand-pink-500" />
            </div>
          </div>
          <div className="bg-white p-6 sm:p-8">
            <span className="text-sm uppercase tracking-widest text-brand-pink-600 font-bold">Energy Healing</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif mt-2 mb-3">
              {service.name}
            </h1>
            <p className="text-base text-stone-600 leading-relaxed">{service.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-xs p-6 sm:p-8">
              <span className="text-sm uppercase font-bold text-brand-pink-600 tracking-wider">完整介紹</span>
              <p className="text-base text-brand-stone-800/90 leading-relaxed mt-3">
                {service.detailedDescription}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-100 shadow-xs p-6 sm:p-8">
              <span className="text-sm uppercase font-bold text-brand-pink-600 tracking-wider">適合族群</span>
              <p className="text-base text-stone-700 leading-relaxed font-medium mt-2">{service.targetAudience}</p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-100 shadow-xs p-6 sm:p-8">
              <span className="text-sm uppercase font-bold text-brand-pink-600 tracking-wider">核心收穫與協助層面</span>
              <ul className="mt-3 space-y-2.5">
                {service.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-base text-stone-600 leading-relaxed">
                    <Check className="w-4 h-4 text-brand-pink-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonials — 專屬客戶見證 */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-xs p-6 sm:p-8">
              <span className="text-sm uppercase font-bold text-brand-pink-600 tracking-wider">客戶見證</span>
              {relatedTestimonials.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {relatedTestimonials.map((t) => (
                    <div key={t.id} className="bg-brand-gold-50/40 border border-brand-gold-100 rounded-xl p-5">
                      <p className="text-base text-brand-stone-800 leading-relaxed italic">「{t.testimonialText}」</p>
                      <p className="text-sm text-stone-500 mt-3 font-semibold">— {t.clientName}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 bg-brand-gold-50/40 border border-brand-gold-150 rounded-2xl p-6 text-center space-y-2">
                  <Clock className="w-5 h-5 text-brand-gold-600 mx-auto" />
                  <p className="text-base text-stone-600 leading-relaxed">
                    此項服務的專屬個案見證整理中，我們正在向個案取得正式授權與去識別化整理，確保每一則見證都真實可查證。歡迎透過 LINE 官方帳號或 Instagram 私訊直接詢問文齡老師過往的服務經驗。
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: pricing / CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-brand-pink-200 shadow-md p-6 space-y-5">
              <div>
                <span className="text-sm text-stone-500 block">方案時長</span>
                <span className="text-base font-semibold text-brand-stone-900">{service.duration}</span>
              </div>
              {service.price && (
                <div>
                  <span className="text-sm text-stone-500 block">參考方案</span>
                  <span className="text-xl font-bold text-brand-pink-600 font-serif">{service.price}</span>
                </div>
              )}
              <a
                href={service.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-1.5 py-3 px-4 bg-linear-to-r from-brand-pink-500 to-brand-gold-500 text-white hover:opacity-95 font-semibold text-base rounded-xl shadow-xs hover:shadow-md transition-all text-center"
              >
                {service.ctaText.includes('LINE') && <MessageCircle className="w-4 h-4 text-white" />}
                <span>{service.ctaText}</span>
              </a>
              <p className="text-sm text-stone-400 leading-relaxed">
                預約與付款均透過官方預約平台 booking.wenling.tw 或 LINE 官方帳號進行，本頁不提供線上金流／購物車功能。
              </p>
              <Link
                href="/services"
                className="block text-sm text-brand-pink-600 hover:text-brand-pink-700 font-semibold text-center"
              >
                ← 返回服務總覽
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 bg-stone-50 rounded-2xl border border-stone-200 p-5 flex items-start gap-4 shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-brand-gold-600 shrink-0 mt-0.5" />
          <p className="text-base text-stone-500 leading-relaxed">
            能量療癒與諮詢服務均為心靈保養與宇宙共振之日常輔助，非醫療行為，不能取代專業醫療診斷、精神醫學治療或專業諮商。如有生理或心理疾患，請務必優先諮詢專業醫師。
          </p>
        </div>

      </div>
    </div>
  );
}
