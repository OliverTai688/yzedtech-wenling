import { Plus } from 'lucide-react';
import PageHero from './page/PageHero';
import PageSection from './page/PageSection';
import ChipTabs from './page/ChipTabs';
import LegalHashSync from './legal/LegalHashSync';
import { sectionHeading, summaryClass } from './PageHeader';
import { footerContent, legalDocuments, pagesContent } from '../data';
import type { LegalDocument } from '../types';

// 法律頁（PLN-006 P5；提案見 proposals/pages-v2/legal）：查條款用的閱讀頁，沒有按鈕。
// - 三份文件用分頁一次看一份；各節是原生收合，同一份文件內一次開一個。收起的條文仍在 HTML 裡。
// - 條文逐字來自 legalDocuments（文案集），不改寫、不另寫摘要。頁名是文案集頁尾的「免責聲明與條款」。
// - 三份文件的 id（disclaimer／privacy／terms）是頁尾法律連結的錨點，不可更動：每個 id 都在 DOM 裡（<article>），
//   網址的錨點等於某個 id 時，ChipTabs 會切到那一份並捲到分頁列。
// - 分頁的文字：第一顆用頁尾既有的「免責聲明」，三顆在手機才排得成一列；文件全名是面板裡的 H2。
// - 沒有 JavaScript 時三份文件依序攤開，各有自己的 H2，所以 ChipTabs 補上的分頁名稱在這一頁不顯示。
const chipLabels: Record<string, string> = { disclaimer: footerContent.disclaimerHeading };

function LegalArticle({ doc }: { doc: LegalDocument }) {
  // scroll-mt-44：捲到這個錨點時，上方的分頁列要留在頁首之下看得到
  return (
    <article id={doc.id} className="scroll-mt-44">
      <h2 className={sectionHeading}>{doc.title}</h2>
      <p className="mt-3 text-base leading-[1.85] text-muted-foreground">{doc.intro}</p>
      <div className="mt-6 divide-y divide-border/70 border-y border-border/70">
        {doc.sections.map((section) => (
          <details key={section.heading} name={`legal-${doc.id}`} className="disclosure">
            <summary className={summaryClass}>
              <h3 className="font-sans! text-base font-bold leading-relaxed">{section.heading}</h3>
              <Plus className="disclosure-icon size-4 shrink-0 text-ring" aria-hidden="true" />
            </summary>
            <div className="space-y-3 pb-5 text-base leading-[1.85] text-foreground">
              {section.blocks.map((block, index) =>
                Array.isArray(block) ? (
                  <ul key={index} className="list-disc space-y-2 pl-5">
                    {block.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={index}>{block}</p>
                )
              )}
            </div>
          </details>
        ))}
      </div>
    </article>
  );
}

export default function LegalSection() {
  const labels = pagesContent.legal;
  return (
    <>
      <PageHero title={labels.title} />

      <PageSection id="legal-documents" width="narrow">
        {/* 閱讀寬度：一行約 40 個字 */}
        <div className="mx-auto max-w-[42rem]">
          <LegalHashSync />
          <ChipTabs
            idPrefix="legal"
            ariaLabel={labels.title}
            // 面板的第一個子元素是 ChipTabs 補的分頁名稱（<p>）；這一頁每份文件有自己的 H2，所以不顯示
            panelClassName="[&>p:first-child]:hidden"
            items={legalDocuments.map((doc) => ({
              id: doc.id,
              label: chipLabels[doc.id] ?? doc.title,
              content: <LegalArticle doc={doc} />,
            }))}
          />
        </div>
      </PageSection>
    </>
  );
}
