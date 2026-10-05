import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MessageCircle, Plus } from 'lucide-react';
import PageHeader, { cardClass, narrowShell, sectionTitle, summaryClass } from './PageHeader';
import ContentBlocks from './offering/ContentBlocks';
import { FounderIntro } from './home/HomeSections';
import { Reveal } from './motion/Reveal';
import { pageContent } from '../content/pages';
import { methodologySystems, offeringsContent, pagesContent, siteLinks } from '../data';

// 關於我們（PLN-004 D6；定案見 RES-002 §6）：提案 C「從想解決的問題找技術」加提案 B 的精簡開場。
// - 開場只露出使命宣言；核心信念與「為什麼是我」收成兩個可展開的項目。
// - 14 項技術以「能解決什麼問題」為主、技術名稱為輔，點開才看定義與適合對象（BRIEF §4A）。
// - 文案來自 src/content/pages.ts（文案集逐字轉出）與 methodologySystems。
// - 合作療癒師與夥伴招募的素材未到，暫不顯示（RPT-001 G7／T7／T8）。
export default function AboutStory() {
  const labels = pagesContent.about;
  const [philosophy, methodology, relations, unsure] = pageContent.about.sections;
  const [missionTitle, missionQuote, ...philosophyRest] = philosophy.blocks;
  // 「核心信念」「為什麼是我」：小標後面接一段內文
  const beliefs: { title: string; text: string }[] = [];
  philosophyRest.forEach((block, index) => {
    const next = philosophyRest[index + 1];
    if (block.type === 'h' && next?.type === 'p') beliefs.push({ title: block.text, text: next.text });
  });
  // 三階段：條列是「階段名稱、說明」交錯
  const stageItems = relations.blocks.find((b) => b.type === 'list');
  const stages: { title: string; text: string }[] = [];
  if (stageItems?.type === 'list') {
    for (let i = 0; i + 1 < stageItems.items.length; i += 2) stages.push({ title: stageItems.items[i], text: stageItems.items[i + 1] });
  }
  const relationsIntro = relations.blocks.find((b) => b.type === 'p');
  const methodologyIntro = methodology.blocks.find((b) => b.type === 'p');
  const unsureBlocks = unsure.blocks.filter((b) => !(b.type === 'p' && b.text.includes('http')));
  const unsureDetailTitle = unsureBlocks[1];

  return (
    <div className={narrowShell} id="about-section">
      <PageHeader eyebrow={missionTitle.type === 'p' ? missionTitle.text.replace(/^【[^】]*】/, '') : undefined} title={labels.title}>
        {missionQuote.type === 'p' && (
          <p className="mt-5 border-l-[3px] border-[#D89A3E] pl-4 font-serif text-lg leading-relaxed text-card-foreground">{missionQuote.text}</p>
        )}
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
        <div className="mt-8 divide-y divide-border/70 border-y border-border/70">
          {beliefs.map((belief) => (
            <details key={belief.title} name="about-belief" className="disclosure">
              <summary className={summaryClass}>
                <span>{belief.title}</span>
                <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
              </summary>
              <p className="pb-5 text-base leading-relaxed text-muted-foreground">{belief.text}</p>
            </details>
          ))}
        </div>
      </PageHeader>

      <Reveal className="mt-14">
        <p className="eyebrow">{labels.techniquesLead}</p>
        <h2 className={`${sectionTitle} mt-3`}>{methodology.title}</h2>
        {methodologyIntro?.type === 'p' && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{methodologyIntro.text}</p>}
        <div className="mt-5 divide-y divide-border/70 border-y border-border/70" id="techniques">
          {methodologySystems.map((item) => (
            <details key={item.id} name="technique" className="disclosure">
              <summary className="flex min-h-16 items-center justify-between gap-4 py-3">
                <span>
                  <span className="block text-base font-bold leading-snug text-card-foreground">{item.solves}</span>
                  <span className="mt-1 block text-sm font-semibold text-accent-foreground">{item.name}</span>
                </span>
                <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
              </summary>
              <dl className="space-y-3 pb-5 text-base leading-relaxed text-muted-foreground">
                <div>
                  <dt className="text-sm font-bold text-accent-foreground">{labels.definitionLabel}</dt>
                  <dd>{item.definition}</dd>
                </div>
                <div>
                  <dt className="text-sm font-bold text-accent-foreground">{labels.suitedLabel}</dt>
                  <dd>{item.suitedFor}</dd>
                </div>
              </dl>
            </details>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className={sectionTitle}>{relations.title}</h2>
        {relationsIntro?.type === 'p' && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{relationsIntro.text}</p>}
        <div className="mt-5 divide-y divide-border/70 border-y border-border/70">
          {stages.map((stage) => (
            <details key={stage.title} name="about-stage" className="disclosure">
              <summary className={summaryClass}>
                <span>{stage.title}</span>
                <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
              </summary>
              <p className="pb-5 text-base leading-relaxed text-muted-foreground">{stage.text}</p>
            </details>
          ))}
        </div>
      </Reveal>

      <div className="mt-14">
        <FounderIntro />
      </div>

      <Reveal className={`${cardClass} mt-14 p-6 sm:p-8`}>
        <h2 className={sectionTitle}>{unsure.title}</h2>
        {/* 第一段直接顯示，社群與私訊的細節收起（BRIEF §4A） */}
        <div className="mt-4">
          <ContentBlocks blocks={unsureBlocks.slice(0, 1)} idPrefix="about-unsure-lead" />
        </div>
        {unsureDetailTitle?.type === 'h' && (
          <details className="disclosure mt-3 border-y border-border/70">
            <summary className={summaryClass}>
              <span>{unsureDetailTitle.text}</span>
              <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
            </summary>
            <div className="pb-5">
              <ContentBlocks blocks={unsureBlocks.slice(2)} idPrefix="about-unsure" />
            </div>
          </details>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={siteLinks.community} target="_blank" rel="noopener noreferrer" className="gold-btn px-6 text-base font-bold">
            {labels.communityCta}
            <ArrowUpRight className="size-4" />
          </a>
          <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="btn-line px-6 text-base">
            <MessageCircle className="size-4" />
            {offeringsContent.helper.line}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
