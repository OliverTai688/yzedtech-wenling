import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { courseBlurbs, offeringsContent, uiLabels } from '../../data';
import ChosenMark from '../services/ChosenMark';

// /training 的一門課：名稱＋文案集 Home Block 4 的一句話＋兩個文字連結（進詳細頁、報名）。
// 課程資訊與費用在詳細頁，這裡不重複。連結文字都是既有字串（uiLabels.offeringInfo 第 337 行、
// enrollLabel 第 194～206 行）；同一頁有好幾個相同文字的連結，以 aria-describedby 指向課名來區分。
// 手機直向排列；桌機名稱在左、連結在右，成為一列。
const linkClass = 'btn-text rounded-sm text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

export interface CourseCardProps {
  id: string;
  name: string;
  ctaLink?: string;
}

export default function CourseCard({ id, name, ctaLink }: CourseCardProps) {
  const href = `/training/${id}`;
  const titleId = `course-${id}-name`;
  return (
    <article className="flex flex-col rounded-[18px] border border-border bg-card px-5 pb-3 pt-5 shadow-[0_4px_20px_color-mix(in_srgb,var(--color-card-foreground)_5%,transparent)] has-[[data-chosen-mark]]:border-ring md:flex-row md:items-center md:justify-between md:gap-6 md:px-6 md:py-5">
      <div className="min-w-0">
        <ChosenMark href={href} className="mb-2" />
        <h2 id={titleId} className="font-serif text-lg font-bold leading-normal text-card-foreground md:text-xl">
          {name}
        </h2>
        {courseBlurbs[id] && <p className="mt-2 text-base leading-relaxed text-muted-foreground">{courseBlurbs[id]}</p>}
      </div>
      <div className="mt-1 flex flex-wrap gap-x-6 md:mt-0 md:shrink-0">
        <Link href={href} aria-describedby={titleId} className={linkClass}>
          {uiLabels.offeringInfo}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        {ctaLink && (
          <a href={ctaLink} target="_blank" rel="noopener noreferrer" aria-describedby={titleId} className={linkClass}>
            {offeringsContent.training.enrollLabel}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
