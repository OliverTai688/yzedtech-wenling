import { Plus } from 'lucide-react';
import ExpandAllToggle from './ExpandAllToggle';
import PageHeader, { pageShell, summaryClass } from './PageHeader';
import { legalDocuments, pagesContent } from '../data';

// 法律頁（PLN-004 D13；定案見 RES-002 §13）：提案 A「逐節收合」加提案 C 的桌機側邊目錄。
// - 條文逐字來自 legalDocuments（文案集），不改寫、不另寫摘要。
// - 每節預設收起，只露出標題；各文件有「全部展開」。收起的條文仍在 HTML 裡。
// - 三份文件的 id（disclaimer／privacy／terms）是頁尾法律連結的錨點，不可更動。
export default function LegalSection() {
  const labels = pagesContent.legal;
  return (
    <div className={pageShell} id="legal-section">
      <PageHeader title={labels.title} description={labels.lead} />

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <nav aria-label={labels.title} className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-24 lg:flex-col lg:gap-1">
            {legalDocuments.map((doc) => (
              <li key={doc.id}>
                <a href={`#${doc.id}`} className="inline-flex min-h-11 items-center rounded-full border border-border bg-popover px-4 text-sm font-bold text-secondary-foreground hover:border-ring lg:rounded-xl">
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-12 lg:col-span-9">
          {legalDocuments.map((doc) => (
            <article key={doc.id} id={doc.id} className="scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-serif text-xl font-bold text-card-foreground md:text-2xl">{doc.title}</h2>
                <ExpandAllToggle targetId={doc.id} expandLabel={labels.expandAll} collapseLabel={labels.collapseAll} />
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{doc.intro}</p>
              <div className="mt-4 divide-y divide-border/70 border-y border-border/70">
                {doc.sections.map((section) => (
                  <details key={section.heading} className="disclosure">
                    <summary className={summaryClass}>
                      <span>{section.heading}</span>
                      <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
                    </summary>
                    <div className="space-y-3 pb-5 text-base leading-relaxed text-muted-foreground">
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
          ))}
        </div>
      </div>
    </div>
  );
}
