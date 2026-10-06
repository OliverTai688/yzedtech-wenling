import { Check } from 'lucide-react';
import PageHero from './page/PageHero';
import PageSection from './page/PageSection';
import WingsMark from './brand/WingsMark';
import ChapterPager from './story/ChapterPager';
import CredentialGroups from './story/CredentialGroups';
import { pageContent } from '../content/pages';
import { heroContent, pagesContent, uiLabels } from '../data';

// 創辦人經歷與故事（PLN-006 批次 P1；提案與量測見 docs/06_research-and-design/proposals/pages-v2/story/PAGE.md）。
// - 第一個畫面先給人物：拱形佔位（形象照未到，RPT-001 G2）、稱謂、四項資歷重點、唯一的按鈕。
// - 五章故事一次一章（翻頁），每章其餘的內容在面板裡。
// - 學經歷與認證依文案集的分類，一類一列，點了開面板。
// - 文案來自 src/content/pages.ts（文案集逐字轉出）與 pagesContent.story，不自行撰寫。
export default function StorySection() {
  const labels = pagesContent.story;
  const sections = pageContent.story.sections;
  const chapters = sections.slice(0, 5);
  const [credentialIntro, ...credentialBlocks] = sections[5].blocks;

  return (
    <div id="story-section">
      <PageHero
        title={labels.title}
        lead={heroContent.portraitCaption}
        action={{ label: uiLabels.needs, href: '/#personas-section' }}
        visual={
          <div
            data-placeholder="founder-portrait"
            className="flex h-20 w-[4.5rem] items-center justify-center rounded-t-full rounded-b-xl border border-border bg-linear-to-b from-popover to-accent lg:h-24 lg:w-[5.5rem]"
          >
            <WingsMark className="w-9 opacity-75 lg:w-11" />
          </div>
        }
      >
        <ul className="mx-auto grid max-w-[30rem] gap-2.5 text-base leading-relaxed text-foreground">
          {labels.highlights.map((item) => (
            <li key={item} className="flex gap-2.5">
              <Check className="mt-1 size-4 shrink-0 text-ring" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      <PageSection id="chapters" title={labels.chaptersLabel} width="narrow" tone="tint">
        <ChapterPager chapters={chapters} ariaLabel={labels.chaptersLabel} />
      </PageSection>

      <PageSection id="credentials" title={labels.credentialsTitle} lead={credentialIntro?.type === 'p' ? credentialIntro.text : undefined} width="narrow">
        <CredentialGroups blocks={credentialBlocks} />
      </PageSection>
    </div>
  );
}
