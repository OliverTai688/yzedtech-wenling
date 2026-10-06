import Link from 'next/link';
import { ArrowDown, ArrowRight, Plus } from 'lucide-react';
import { summaryClass } from './PageHeader';
import PageHero from './page/PageHero';
import PageSection from './page/PageSection';
import TechniqueGroups from './about/TechniqueGroups';
import UnsureOptions from './about/UnsureOptions';
import { pageContent } from '../content/pages';
import { stageContent } from '../content/stages';
import { homeContent, pagesContent, uiLabels } from '../data';

// 品牌理念（PLN-006 批次 P1；提案與量測見 docs/06_research-and-design/proposals/pages-v2/about/PAGE.md）。
// - 第一個畫面：頁名、一句使命、唯一的按鈕、頁內小導覽（四個區塊既有的標題）。
// - 四個區塊各自可達：品牌理念（收合）、14 項技術（一次一組，以「能解決什麼問題」為主）、
//   三階段（收合）、不確定自己需要哪一種（收合）。
// - 文案來自 src/content/pages.ts（文案集逐字轉出）、methodologySystems 與 homeContent.founder，不自行撰寫。
// - 合作療癒師與夥伴招募的素材未到，暫不顯示（RPT-001 G7／T7／T8）。
const disclosureGroup = 'divide-y divide-border/70 border-y border-border/70';
const bodyText = 'text-base leading-relaxed text-muted-foreground';

export default function AboutStory() {
  const labels = pagesContent.about;
  const { missionLabel, missionTitle, mission } = homeContent.founder;
  const [philosophy, methodology, relations, unsure] = pageContent.about.sections;
  // 「核心信念」「為什麼是我」：小標後面接一段內文
  const beliefs: { title: string; text: string }[] = [];
  philosophy.blocks.forEach((block, index) => {
    const next = philosophy.blocks[index + 1];
    if (block.type === 'h' && next?.type === 'p') beliefs.push({ title: block.text, text: next.text });
  });
  const methodologyIntro = methodology.blocks.find((b) => b.type === 'p');
  // 網址那一行不顯示（連結用 siteLinks）
  const [unsureLead, ...unsureRest] = unsure.blocks.filter((b) => !(b.type === 'p' && b.text.includes('http')));
  const sections = [
    { id: 'philosophy', title: philosophy.title },
    { id: 'techniques', title: methodology.title },
    { id: 'stages', title: relations.title },
    { id: 'unsure', title: unsure.title },
  ];

  return (
    <div id="about-section">
      <PageHero eyebrow={missionLabel} title={labels.title} lead={missionTitle} action={{ label: uiLabels.needs, href: '/#personas-section' }}>
        {/* 頁內小導覽：標題較長，所以一項一列；桌機排成兩欄 */}
        <nav aria-label={labels.title}>
          <ul className="grid border-b border-border/70 md:grid-cols-2 md:gap-x-8">
            {sections.map((section) => (
              <li key={section.id} className="border-t border-border/70">
                <a
                  href={`#${section.id}`}
                  className="flex min-h-14 items-center justify-between gap-4 rounded-sm py-3 text-base font-bold text-card-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span>{section.title}</span>
                  <ArrowDown className="size-4 shrink-0 text-ring" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <PageSection id={sections[0].id} title={philosophy.title} width="narrow">
        <p className="border-l-[3px] border-ring pl-4 font-serif text-lg leading-relaxed text-card-foreground">{mission}</p>
        <div className={`${disclosureGroup} mt-6`}>
          {beliefs.map((belief) => (
            <details key={belief.title} name="about-belief" className="disclosure">
              <summary className={summaryClass}>
                <span>{belief.title}</span>
                <Plus className="disclosure-icon size-4 shrink-0 text-ring" aria-hidden="true" />
              </summary>
              <p className={`${bodyText} pb-5`}>{belief.text}</p>
            </details>
          ))}
        </div>
      </PageSection>

      <PageSection
        id={sections[1].id}
        title={methodology.title}
        lead={methodologyIntro?.type === 'p' ? methodologyIntro.text : undefined}
        width="narrow"
        tone="tint"
      >
        <TechniqueGroups ariaLabel={methodology.title} />
      </PageSection>

      <PageSection id={sections[2].id} title={stageContent.heading} lead={stageContent.intro} width="narrow">
        <div className={disclosureGroup}>
          {stageContent.stages.map((stage) => (
            <details key={stage.title} name="about-stage" className="disclosure">
              <summary className={summaryClass}>
                <span>{stage.title}</span>
                <Plus className="disclosure-icon size-4 shrink-0 text-ring" aria-hidden="true" />
              </summary>
              <div className="pb-4">
                <p className={bodyText}>{stage.text}</p>
                {/* 原文在這個階段點名的服務（src/content/stages.ts） */}
                {stage.service && (
                  <Link href={`/services/${stage.service.id}`} className="btn-text mt-1 text-base">
                    {stage.service.name}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </PageSection>

      <PageSection id={sections[3].id} title={unsure.title} lead={unsureLead?.type === 'p' ? unsureLead.text : undefined} width="narrow" tone="tint">
        <UnsureOptions blocks={unsureRest} />
      </PageSection>
    </div>
  );
}
