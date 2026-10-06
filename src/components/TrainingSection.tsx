import { ArrowUpRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { certificationCourses, healerCertificationAddOn, offeringsContent, thetaTrainingCourses } from '../data';
import ChipTabs from './page/ChipTabs';
import PageHero from './page/PageHero';
import PageSection from './page/PageSection';
import CourseCard from './training/CourseCard';

// 培訓課程（PLN-006 P2；提案見 docs/06_research-and-design/proposals/pages-v2/training/）。
// - 第一個畫面：眉批（Home Block 4 的標題）、H1、一句導言。清單頁沒有金色按鈕，緊接著是分頁列。
// - 分頁（ChipTabs）一次只看一組：希塔療癒三門是有先後順序的路徑（1→2→3，金色路徑線相連）；
//   靈氣認證三門是並列的一組。沒有 JavaScript 時兩組依序列出。
// - 直覺力培訓還沒開課：獨立的一段、虛線框、既有的「即將推出」，不放進分頁，任何時候都看得到。
// - 所有文字逐字取自文案集（src/data.ts）。課程資訊與費用在各課的詳細頁。
export default function TrainingSection() {
  const t = offeringsContent.training;

  const thetaPath = (
    <>
      <ol className="grid gap-4">
        {thetaTrainingCourses.map((course, index) => (
          <li key={course.id} className="relative pl-11">
            {/* 路徑線：從這一站的圓點接到下一站的圓點，最後一站之後沒有線 */}
            {index < thetaTrainingCourses.length - 1 && (
              <span aria-hidden="true" className="absolute -bottom-[52px] left-[15px] top-9 w-0.5 bg-gradient-to-b from-gold-from to-gold-to" />
            )}
            <span
              aria-hidden="true"
              className="absolute left-0 top-5 z-[1] flex size-8 items-center justify-center rounded-full border-2 border-gold-to bg-popover text-sm font-bold text-accent-foreground"
            >
              {index + 1}
            </span>
            <CourseCard id={course.id} name={course.name} ctaLink={course.ctaLink} />
          </li>
        ))}
      </ol>
      <p className="mt-5 flex items-center gap-2.5 text-base text-muted-foreground">
        <ShieldCheck className="size-5 shrink-0 text-ring" aria-hidden="true" />
        <span>{t.credential}</span>
      </p>
    </>
  );

  const reikiGroup = (
    <ul className="grid gap-4">
      {certificationCourses.map((course) => (
        <li key={course.id}>
          <CourseCard id={course.id} name={course.name} ctaLink={course.ctaLink} />
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <PageHero eyebrow={t.heading} title={t.title} lead={t.description} />

      <PageSection id="training-section" width="narrow" className="pb-10 pt-8 lg:pb-14 lg:pt-12">
        <ChipTabs
          idPrefix="track"
          ariaLabel={t.title}
          items={[
            // 分頁名稱取系列名稱全形括號之前的部分（「希塔療癒系列」），手機一列才放得下兩個
            { id: 'theta', label: t.thetaTrack.split('（')[0], content: thetaPath },
            { id: 'reiki', label: t.reikiTrack, content: reikiGroup },
          ]}
        />
      </PageSection>

      {/* 直覺力培訓：課程資訊待補（RPT-001 T5） */}
      <PageSection tone="tint" width="narrow" className="pb-10 pt-8 lg:pb-14 lg:pt-12">
        <div className="rounded-[18px] border border-dashed border-ring/50 bg-popover px-6 pb-4 pt-6">
          <p className="inline-flex rounded-full bg-accent px-3 py-0.5 text-sm font-bold text-accent-foreground">{t.comingSoon}</p>
          <h2 className="mt-3 font-serif text-xl font-bold leading-snug text-card-foreground md:text-2xl">{healerCertificationAddOn.name}</h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">{healerCertificationAddOn.objective}</p>
          <a href={healerCertificationAddOn.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-text mt-1 text-base">
            <MessageCircle className="size-4" aria-hidden="true" />
            {t.notifyLabel}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </PageSection>
    </>
  );
}
