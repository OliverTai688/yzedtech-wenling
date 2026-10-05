import Link from 'next/link';
import { ArrowRight, Check, MessageCircle, Plus } from 'lucide-react';
import PageHeader, { narrowShell, sectionTitle, summaryClass } from './PageHeader';
import ContentBlocks from './offering/ContentBlocks';
import WingsMark from './brand/WingsMark';
import { Reveal } from './motion/Reveal';
import { pageContent } from '../content/pages';
import { heroContent, offeringsContent, pagesContent, siteLinks } from '../data';
import type { ContentBlock } from '../types';

// 創辦人介紹（PLN-004 D7；定案見 RES-002 §7）：提案 A「五章時間軸」加提案 B 的人物卡。
// - 人物卡先給身分與四項資歷重點，再進故事。
// - 五章故事沿金線排列，一次展開一章，第一章預設打開（BRIEF §4A）。
// - 學經歷與認證依文案集的小標分組收合；研習紀錄表在「核心專業認證」裡。
// - 文案來自 src/content/pages.ts（文案集逐字轉出）。形象照未到，顯示光感底（RPT-001 G2）。
export default function StorySection() {
  const labels = pagesContent.story;
  const sections = pageContent.story.sections;
  const chapters = sections.slice(0, 5);
  const credentials = sections[5];
  const credentialIntro = credentials.blocks[0];
  // 依小標把認證內容切成幾組
  const groups: { title: string; blocks: ContentBlock[] }[] = [];
  credentials.blocks.slice(1).forEach((block) => {
    if (block.type === 'h') groups.push({ title: block.text, blocks: [] });
    else if (groups.length) groups[groups.length - 1].blocks.push(block);
  });

  return (
    <div className={narrowShell} id="story-section">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <div
            data-placeholder="founder-portrait"
            aria-hidden="true"
            className="mx-auto flex aspect-[4/5] w-full max-w-[240px] items-center justify-center rounded-t-full rounded-b-[18px] border border-border bg-[linear-gradient(180deg,#FFFDF0,#FCE7A8)]"
          >
            <WingsMark className="w-20 opacity-70" />
          </div>
        </div>
        <div className="md:col-span-8">
          <PageHeader eyebrow={heroContent.portraitCaption} title={labels.title}>
            <ul className="mt-5 space-y-2 text-base leading-relaxed text-foreground">
              {labels.highlights.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-1 size-4 shrink-0 text-ring" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/#personas-section" className="gold-btn px-6 text-base font-bold">
                {offeringsContent.helper.needs}
                <ArrowRight className="size-4" />
              </Link>
              <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="btn-outline text-base">
                <MessageCircle className="size-4 text-line" />
                {offeringsContent.helper.line}
              </a>
            </div>
          </PageHeader>
        </div>
      </div>

      <Reveal className="mt-14">
        <h2 className={sectionTitle}>{labels.chaptersLabel}</h2>
        <ol className="relative mt-6 space-y-4 before:absolute before:bottom-6 before:left-[13px] before:top-6 before:w-[2px] before:bg-gradient-to-b before:from-[#F5D98A] before:to-[#B5762A]">
          {chapters.map((chapter, index) => (
            <li key={chapter.id} className="relative pl-10">
              <span aria-hidden="true" className="absolute left-0 top-3 flex size-7 items-center justify-center rounded-full border-2 border-[#D89A3E] bg-popover text-sm font-bold text-accent-foreground">
                {index + 1}
              </span>
              <details name="story-chapter" open={index === 0} className="disclosure rounded-[18px] border border-border bg-card px-5 shadow-[0_4px_20px_rgba(58,42,24,0.05)] sm:px-6">
                <summary className="flex min-h-14 items-center justify-between gap-4 py-3 font-serif text-lg font-bold leading-snug text-card-foreground">
                  <span>{chapter.title}</span>
                  <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
                </summary>
                <div className="pb-6">
                  <ContentBlocks blocks={chapter.blocks} idPrefix={chapter.id} />
                </div>
              </details>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className={sectionTitle}>{labels.credentialsTitle}</h2>
        {credentialIntro?.type === 'p' && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{credentialIntro.text}</p>}
        <div className="mt-5 divide-y divide-border/70 border-y border-border/70">
          {groups.map((group) => (
            <details key={group.title} name="story-credentials" className="disclosure">
              <summary className={summaryClass}>
                <span>{group.title}</span>
                <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
              </summary>
              <div className="pb-6">
                <ContentBlocks blocks={group.blocks} idPrefix={`cred-${group.title}`} />
              </div>
            </details>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
