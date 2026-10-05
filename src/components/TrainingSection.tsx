import Link from 'next/link';
import { ArrowRight, MessageCircle, Plus, ShieldCheck } from 'lucide-react';
import {
  certificationCourses,
  courseBlurbs,
  healerCertificationAddOn,
  offeringsContent,
  siteLinks,
  thetaTrainingCourses,
} from '../data';

// 認證班（PLN-004 D5；定案見 RES-002 §5）。採提案 B「學習路徑圖」：
// - 希塔療癒三門課是一條有先後順序的路徑；靈氣認證三門是並列的入口；直覺力訓練即將推出。
// - 每個節點預設只露出課名與一句話，點開才顯示目標、對象、時數與費用；一次只開一門（BRIEF §4A）。
// - 用原生 <details>，內容都在 HTML 裡，不需要 JavaScript。
interface Stop {
  id: string;
  name: string;
  objective: string;
  targetAudience: string;
  duration: string;
  price?: string;
  prerequisite?: string;
  certification?: string;
}

function CourseStop({ stop, index }: { stop: Stop; index?: number }) {
  const { itemLabel } = offeringsContent.training;
  return (
    <li className="relative pl-10">
      <span
        aria-hidden="true"
        className="absolute left-0 top-3 flex size-7 items-center justify-center rounded-full border-2 border-[#D89A3E] bg-popover text-sm font-bold text-accent-foreground"
      >
        {index ?? ''}
      </span>
      <details name="course" className="disclosure rounded-[18px] border border-border bg-card px-5 shadow-[0_4px_20px_rgba(58,42,24,0.05)] sm:px-6">
        <summary className="flex min-h-16 items-center justify-between gap-4 py-3">
          <span>
            <span className="block font-serif text-lg font-bold leading-snug text-card-foreground">{stop.name}</span>
            {courseBlurbs[stop.id] && <span className="mt-1 block text-base font-normal text-muted-foreground">{courseBlurbs[stop.id]}</span>}
          </span>
          <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
        </summary>
        <div className="space-y-3 pb-6 text-base leading-relaxed text-muted-foreground">
          <p>{stop.objective}</p>
          <p>
            <span className="font-bold text-card-foreground">適合對象：</span>
            {stop.targetAudience}
          </p>
          <ul className="flex flex-wrap gap-2 pt-1">
            {[stop.duration, stop.certification, stop.prerequisite].filter(Boolean).map((fact) => (
              <li key={fact} className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                {fact}
              </li>
            ))}
          </ul>
          {stop.price && <p className="text-foreground">{stop.price}</p>}
          <Link href={`/training/${stop.id}`} className="gold-btn mt-2 px-6 text-base font-bold">
            {itemLabel}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </details>
    </li>
  );
}

export default function TrainingSection() {
  const t = offeringsContent.training;
  const { helper } = offeringsContent;

  return (
    <section id="training-section" className="mx-auto max-w-[920px] px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-14">
      <p className="eyebrow">{t.heading}</p>
      <h1 className="mt-3 font-serif text-[32px] font-bold leading-snug text-card-foreground md:text-[40px]">{t.title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t.description}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/#personas-section" className="btn-outline text-base">
          {helper.needs}
          <ArrowRight className="size-4" />
        </Link>
        <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="btn-outline text-base">
          <MessageCircle className="size-4 text-line" />
          {t.lineLabel}
        </a>
      </div>

      {/* 軌道一：希塔療癒，有先後順序 */}
      <h2 className="mt-12 font-serif text-xl font-bold text-card-foreground md:text-2xl">{t.thetaTrack}</h2>
      <ol className="relative mt-5 space-y-4 before:absolute before:bottom-6 before:left-[13px] before:top-6 before:w-[2px] before:bg-gradient-to-b before:from-[#F5D98A] before:to-[#B5762A]">
        {thetaTrainingCourses.map((course, index) => (
          <CourseStop key={course.id} stop={course} index={index + 1} />
        ))}
      </ol>
      <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-border bg-popover p-4 text-base leading-relaxed text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-ring" />
        <span>{t.credential}</span>
      </p>

      {/* 軌道二：靈氣認證，三門並列 */}
      <h2 className="mt-14 font-serif text-xl font-bold text-card-foreground md:text-2xl">{t.reikiTrack}</h2>
      <ul className="mt-5 space-y-4">
        {certificationCourses.map((course) => (
          <CourseStop key={course.id} stop={course} />
        ))}
      </ul>

      {/* 直覺力訓練：課程資訊待補（RPT-001 T5） */}
      <h2 className="mt-14 font-serif text-xl font-bold text-card-foreground md:text-2xl">{t.intuitionTrack}</h2>
      <div className="mt-5 rounded-[18px] border border-dashed border-ring/50 bg-popover p-6">
        <span className="rounded-full bg-accent px-3 py-0.5 text-sm font-bold text-accent-foreground">{t.comingSoon}</span>
        <h3 className="mt-3 font-serif text-lg font-bold text-card-foreground">{healerCertificationAddOn.name}</h3>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">{healerCertificationAddOn.objective}</p>
        <a href={healerCertificationAddOn.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-outline mt-4 text-base">
          <MessageCircle className="size-4 text-line" />
          {t.notifyLabel}
        </a>
      </div>
    </section>
  );
}
