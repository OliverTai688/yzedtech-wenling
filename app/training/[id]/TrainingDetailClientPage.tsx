'use client';

import Link from 'next/link';
import { Sparkles, MessageCircle, Clock, ChevronRight, ShieldAlert, Target } from 'lucide-react';
import type { ReikiCourse, ThetaTrainingCourse } from '../../../src/types';
import { testimonials, siteLinks } from '../../../src/data';

// PRD-002 §3.3 v1.1（Batch E）：培訓／認證詳細頁，統一呈現來自
// `thetaTrainingCourses`／`certificationCourses` 兩個陣列的
// 課程資料（欄位形狀略有差異，見 src/types.ts 的 ThetaTrainingCourse／
// ReikiCourse）。圖片一律用品牌漸層背景＋文字呈現，不使用照片；CTA 一律導向
// 既有 booking.wenling.tw／LINE 官方帳號，不涉及金流／購物車。
// 見證資料：`testimonials`（src/data.ts）目前查無文案集出處、全站已停用渲染，
// 本輪各課程的 testimonialIds 一律為空陣列，因此顯示與其餘見證區塊一致的
// 「整理中」誠實提示。

export type TrainingCourseUnion = ThetaTrainingCourse | ReikiCourse;

function isReikiCourse(course: TrainingCourseUnion): course is ReikiCourse {
  return 'curriculum' in course;
}

interface TrainingDetailClientPageProps {
  course: TrainingCourseUnion;
}

export default function TrainingDetailClientPage({ course }: TrainingDetailClientPageProps) {
  const reiki = isReikiCourse(course) ? course : null;
  const theta = !reiki ? (course as ThetaTrainingCourse) : null;

  const curriculum = reiki ? reiki.curriculum : theta!.highlights;
  const badgeText = reiki ? reiki.badge : theta!.level;
  const isComingSoon = reiki?.status === 'coming-soon';
  const ctaLink = course.ctaLink || siteLinks.line;
  const relatedTestimonials = testimonials.filter((t) => course.testimonialIds?.includes(t.id));

  return (
    <div className="animate-fadeIn py-16 bg-linear-to-b from-brand-stone-50 via-brand-pink-50/10 to-brand-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-stone-500 mb-8">
          <Link href="/training" className="hover:text-brand-pink-600 font-medium">希塔療癒認證培訓與專業證照課程</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-stone-800 font-semibold">{course.name}</span>
        </nav>

        {/* Hero: brand gradient + text, no photography */}
        <div className="rounded-3xl overflow-hidden border border-stone-100 shadow-sm mb-10">
          <div className="h-56 sm:h-64 relative bg-linear-to-br from-brand-gold-100 via-brand-gold-50 to-brand-pink-100 flex items-center justify-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9862E_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center text-brand-gold-600">
              <Sparkles className="w-10 h-10 text-brand-gold-500" />
            </div>
          </div>
          <div className="bg-white p-6 sm:p-8">
            <span className="text-sm uppercase tracking-widest text-brand-gold-600 font-bold">{badgeText}</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif mt-2 mb-3">
              {course.name}
            </h1>
            <div className="bg-brand-gold-50/50 rounded-xl p-4 border border-brand-gold-150 text-base text-stone-700 leading-relaxed font-medium">
              <span className="inline-flex items-start gap-1.5">
                <Target className="w-3.5 h-3.5 text-brand-gold-600 shrink-0 mt-0.5" />
                <span><span className="text-brand-stone-900 font-bold">培訓目標：</span>{course.objective}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-xs p-6 sm:p-8">
              <span className="text-sm uppercase font-bold text-brand-gold-600 tracking-wider">適合對象</span>
              <p className="text-base text-stone-700 leading-relaxed font-medium mt-2">{course.targetAudience}</p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-100 shadow-xs p-6 sm:p-8">
              <span className="text-sm uppercase font-bold text-brand-gold-600 tracking-wider block mb-3">
                {isComingSoon ? '規劃中大綱' : '課程核心大綱（國際證照授權）'}
              </span>
              <ul className="space-y-2">
                {curriculum.map((topic, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2 text-base text-stone-600 leading-relaxed">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold-500 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {reiki?.refundPolicy && (
              <div className="bg-white rounded-2xl border border-stone-100 shadow-xs p-6 sm:p-8">
                <span className="text-sm uppercase font-bold text-brand-gold-600 tracking-wider">報名注意事項與退費規範</span>
                <p className="text-base text-stone-600 leading-relaxed mt-2">{reiki.refundPolicy}</p>
              </div>
            )}

            {course.prerequisite && (
              <div className="bg-white rounded-2xl border border-stone-100 shadow-xs p-6 sm:p-8">
                <span className="text-sm uppercase font-bold text-brand-gold-600 tracking-wider">先修條件</span>
                <p className="text-base text-stone-600 leading-relaxed mt-2">{course.prerequisite}</p>
              </div>
            )}

            {/* Testimonials — 專屬客戶見證 */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-xs p-6 sm:p-8">
              <span className="text-sm uppercase font-bold text-brand-gold-600 tracking-wider">學員見證</span>
              {relatedTestimonials.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {relatedTestimonials.map((t) => (
                    <div key={t.id} className="bg-brand-pink-50/40 border border-brand-pink-100 rounded-xl p-5">
                      <p className="text-base text-brand-stone-800 leading-relaxed italic">「{t.testimonialText}」</p>
                      <p className="text-sm text-stone-500 mt-3 font-semibold">— {t.clientName}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 bg-brand-pink-50/40 border border-brand-pink-100 rounded-2xl p-6 text-center space-y-2">
                  <Clock className="w-5 h-5 text-brand-pink-500 mx-auto" />
                  <p className="text-base text-stone-600 leading-relaxed">
                    此課程的專屬學員見證整理中，我們正在向學員取得正式授權與去識別化整理，確保每一則見證都真實可查證。歡迎透過 LINE 官方帳號直接詢問過往開班經驗。
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: schedule / CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-brand-gold-200 shadow-md p-6 space-y-5">
              <div>
                <span className="text-sm text-stone-500 block">學習時數</span>
                <span className="text-base font-semibold text-brand-stone-900">{course.duration}</span>
              </div>
              {course.price && (
                <div>
                  <span className="text-sm text-stone-500 block">參考方案</span>
                  <span className="text-base font-semibold text-brand-pink-600 font-serif leading-relaxed">{course.price}</span>
                </div>
              )}
              {theta?.certification && (
                <div>
                  <span className="text-sm text-stone-500 block">結業證書</span>
                  <span className="text-base font-semibold text-brand-stone-900">{theta.certification}</span>
                </div>
              )}
              {reiki && (
                <div>
                  <span className="text-sm text-stone-500 block">開班形式</span>
                  <span className="text-base font-semibold text-brand-stone-900">
                    {reiki.type === 'both' && '線上 / 實體皆有'}
                    {reiki.type === 'online' && '線上遠距直播'}
                    {reiki.type === 'physical' && '實體高階密集'}
                  </span>
                </div>
              )}
              <a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex justify-center items-center gap-1.5 py-3 px-4 font-semibold text-base rounded-xl shadow-xs text-center transition-all ${
                  isComingSoon
                    ? 'bg-white border border-brand-pink-200 text-brand-pink-600 hover:bg-brand-pink-50'
                    : 'bg-linear-to-r from-brand-pink-500 to-brand-gold-500 text-white hover:opacity-95 hover:shadow-md'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isComingSoon ? '搶先登記，開課通知我' : '報名此課程'}</span>
              </a>
              <p className="text-sm text-stone-400 leading-relaxed">
                報名與付款均透過官方預約平台 booking.wenling.tw 或 LINE 官方帳號進行，本頁不提供線上金流／購物車功能。
              </p>
              <Link
                href="/training"
                className="block text-sm text-brand-pink-600 hover:text-brand-pink-700 font-semibold text-center"
              >
                ← 返回培訓總覽
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 bg-stone-50 rounded-2xl border border-stone-200 p-5 flex items-start gap-4 shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-brand-gold-600 shrink-0 mt-0.5" />
          <p className="text-base text-stone-500 leading-relaxed">
            能量療癒與相關課程均為心靈保養與宇宙共振之日常輔助，非醫療行為，不能取代專業醫療診斷、精神醫學治療或專業諮商。如有生理或心理疾患，請務必優先諮詢專業醫師。
          </p>
        </div>

      </div>
    </div>
  );
}
