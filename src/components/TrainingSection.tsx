import Link from 'next/link';
import { ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { thetaTrainingCourses, reikiCourses, certificationCourses, healerCertificationAddOn } from '../data';

// PRD-002 §3.3 v1.1（2026-08-21，Batch E）：`/training` 培訓總覽頁，收錄
// `thetaTrainingCourses`＋`reikiCourses`＋`certificationCourses`（希塔培訓／
// 希塔認證班／療癒師認證，含併入的直覺力培訓加值模組說明），版面比照
// `/services` 總覽頁（大標題、分類說明、卡片清單），不再依賴 `activeTab`
// 切換。卡片點擊導向各自的詳細頁 `/training/[id]`
// （TrainingDetailClientPage.tsx），圖片一律用品牌漸層背景＋文字呈現，
// 不使用照片。

interface TrainingCardData {
  id: string;
  badgeText: string;
  title: string;
  objective: string;
  duration: string;
  tags: string[];
  ctaLink?: string;
  comingSoon?: boolean;
}

function TrainingCourseCard({ course }: { course: TrainingCardData }) {
  return (
    <Link
      href={`/training/${course.id}`}
      className={`group rounded-2xl border shadow-xs p-6 flex flex-col justify-between transition-all duration-300 relative ${
        course.comingSoon
          ? 'bg-brand-stone-50/60 border-dashed border-stone-200'
          : 'bg-white border-stone-100 hover:shadow-md hover:border-brand-gold-200'
      }`}
    >
      <div className={`absolute top-4 right-4 text-sm font-bold px-2.5 py-1 rounded-full border ${
        course.comingSoon
          ? 'bg-stone-100 border-stone-200 text-stone-500'
          : 'bg-brand-gold-100 border-brand-gold-200 text-brand-gold-600'
      }`}>
        {course.badgeText}
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-bold text-brand-stone-900 font-serif mb-4 leading-relaxed pr-20">
          {course.title}
        </h3>

        <div className="bg-brand-gold-50/50 rounded-xl p-4 border border-brand-gold-150 mb-6 text-base text-stone-700 leading-relaxed font-medium">
          <span className="text-brand-stone-900 font-bold">培訓目標：</span>{course.objective}
        </div>

        {course.tags.length > 0 && (
          <ul className="space-y-1.5 mb-6">
            {course.tags.slice(0, 3).map((tag, tIdx) => (
              <li key={tIdx} className="text-base text-stone-600 leading-relaxed">・{tag}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-4 border-t border-stone-50 flex items-center justify-between">
        <span className="text-sm text-stone-500">{course.duration}</span>
        <span className="inline-flex items-center gap-1 text-base font-semibold text-brand-pink-600 group-hover:text-brand-pink-700">
          <span>查看完整介紹</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

export default function TrainingSection() {
  const thetaCards: TrainingCardData[] = thetaTrainingCourses.map((c) => ({
    id: c.id,
    badgeText: c.level,
    title: c.name,
    objective: c.objective,
    duration: c.duration,
    tags: c.highlights,
    ctaLink: c.ctaLink,
  }));

  const certBadgeCards: TrainingCardData[] = reikiCourses.map((c) => ({
    id: c.id,
    badgeText: c.badge,
    title: c.name,
    objective: c.objective,
    duration: c.duration,
    tags: c.curriculum,
    ctaLink: c.ctaLink,
  }));

  const healerCertCards: TrainingCardData[] = certificationCourses.map((c) => ({
    id: c.id,
    badgeText: c.badge,
    title: c.name,
    objective: c.objective,
    duration: c.duration,
    tags: c.curriculum,
    ctaLink: c.ctaLink,
    comingSoon: c.status === 'coming-soon',
  }));

  return (
    <section id="training-section" className="py-20 bg-linear-to-b from-brand-stone-50 via-brand-pink-50/10 to-brand-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm uppercase tracking-widest text-brand-pink-600 font-bold">Training</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif">
            國際希塔療癒認證培訓與專業證照課程
          </h2>
          <div className="w-12 h-1 bg-linear-to-r from-brand-pink-300 to-brand-gold-300 mx-auto rounded-full"></div>
          <p className="text-base text-stone-600">
            從國際希塔療癒證照培訓，到金錢／愛情／人魚靈氣療癒師暨導師認證課程。若想了解一對一能量療癒與工作坊等服務，請前往
            {' '}
            <Link href="/services" className="text-brand-pink-600 font-semibold hover:text-brand-pink-700 underline underline-offset-2">
              服務總覽頁
            </Link>
            。
          </p>
        </div>

        {/* Category 1: 希塔療癒認證培訓（thetaTrainingCourses） */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-serif text-brand-stone-900">希塔療癒認證培訓</h3>
            <span className="text-sm text-stone-500">美國 ThetaHealing® 官方國際認證</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {thetaCards.map((course) => (
              <TrainingCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Category 2: 希塔療癒認證班（reikiCourses） */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-serif text-brand-stone-900">希塔療癒認證班</h3>
            <span className="text-sm text-stone-500">線上／實體同步開班</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {certBadgeCards.map((course) => (
              <TrainingCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Category 3: 專業證照與直覺力培訓（certificationCourses，含併入的直覺力培訓說明） */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-serif text-brand-stone-900">專業證照與直覺力培訓</h3>
            <span className="text-sm text-stone-500">療癒師暨導師認證</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {healerCertCards.map((course) => (
              <TrainingCourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* 直覺力培訓加值模組說明 — PRD-002 §3.3 v1.1：原獨立卡片/詳細頁已移除，
              併入療癒師認證分類敘述，不再獨立呈現，文字沿用原始措辭。 */}
          <div className="bg-white rounded-2xl border border-dashed border-stone-200 p-6 sm:p-8 max-w-4xl mx-auto">
            <span className="text-sm font-bold text-brand-gold-600 uppercase tracking-wider block mb-2">療癒師認證加值模組・即將推出</span>
            <h4 className="text-lg font-bold font-serif text-brand-stone-900 mb-2">{healerCertificationAddOn.name}</h4>
            <p className="text-base text-stone-600 leading-relaxed mb-2">
              <span className="font-bold text-brand-stone-900">培訓目標：</span>{healerCertificationAddOn.objective}
            </p>
            <p className="text-base text-stone-500 leading-relaxed mb-4">
              <span className="font-bold text-brand-stone-900">適合對象：</span>{healerCertificationAddOn.targetAudience}
            </p>
            <p className="text-sm text-stone-400 mb-4">{healerCertificationAddOn.note}</p>
            <a
              href={healerCertificationAddOn.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-base font-semibold text-brand-pink-600 hover:text-brand-pink-700"
            >
              <MessageCircle className="w-4 h-4" />
              <span>搶先登記，開課通知我</span>
            </a>
          </div>
        </div>

        {/* Certification footer banner */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-xs">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-gold-100 text-brand-gold-600 rounded-full shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-brand-stone-900">美國 ThetaHealing® 希塔療癒官方國際認證</h4>
              {/* copy-qa-reviewer 覆核（2026-08-21）：原「登錄為合格執業療癒師」查無文案集出處，
                  已改為文案集第 447-448 行「官方認證療癒師／官方認證導師…美國 THInK 總部發證」
                  的措辭，僅保留有出處的部分。 */}
              <p className="text-base text-stone-500 mt-1 leading-relaxed">文齡老師為官方認可之國際導師，學員修畢課程並通過評核，即可獲頒美國 THInK 總部發證之官方結業證照。</p>
            </div>
          </div>
          <a
            href="https://lin.ee/yo6a6FW"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-brand-pink-200 text-brand-pink-600 font-semibold text-base hover:bg-brand-pink-50 transition-colors shrink-0"
          >
            加 LINE 洽詢開班日程 ➔
          </a>
        </div>

      </div>
    </section>
  );
}
