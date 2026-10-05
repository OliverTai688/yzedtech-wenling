import { ArrowUpRight, MessageCircle, Plus } from 'lucide-react';
import PageHeader, { narrowShell } from './PageHeader';
import { Reveal } from './motion/Reveal';
import { pagesContent, resources } from '../data';

// 免費資源（PLN-004 D10；定案見 RES-002 §10）：提案 B「三步開始」加提案 C 的時段大字卡。
// - 三個資源排成有先後的路徑：加入社群 → 看每週直播 → 加官方 LINE。
// - 全頁只有第一步是主按鈕；每步只露出標題與一句話，「適合對象」收起（BRIEF §4A）。
// - 直播的固定時段與社群密碼用大字，不必讀完整段才找得到。
export default function ResourcesSection() {
  const labels = pagesContent.resources;
  const live = resources.find((r) => r.schedule);
  const community = resources.find((r) => r.id === 'res-2');
  const line = resources.find((r) => r.id === 'res-3');
  const steps = [community, live, line].filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <div className={narrowShell} id="resources-section">
      <PageHeader eyebrow={live?.typeName} title={labels.title} description={community?.description} />

      <ol className="relative mt-10 space-y-5 before:absolute before:bottom-8 before:left-[13px] before:top-8 before:w-[2px] before:bg-gradient-to-b before:from-[#F5D98A] before:to-[#B5762A]">
        {steps.map((item, index) => {
          const isLine = item.id === 'res-3';
          return (
            <li key={item.id} className="relative pl-10">
              <span aria-hidden="true" className="absolute left-0 top-6 flex size-7 items-center justify-center rounded-full border-2 border-[#D89A3E] bg-popover text-sm font-bold text-accent-foreground">
                {index + 1}
              </span>
              <Reveal className="rounded-[18px] border border-border bg-card p-6 shadow-[0_4px_20px_rgba(58,42,24,0.05)]">
                <span className="rounded-full bg-accent px-3 py-0.5 text-sm font-bold text-accent-foreground">{item.typeName}</span>
                <h2 className="mt-3 font-serif text-lg font-bold leading-snug text-card-foreground md:text-xl">{item.title}</h2>
                {item.schedule && <p className="mt-3 font-serif text-2xl font-bold text-secondary-foreground md:text-3xl">{item.schedule}</p>}
                {index === 0 && (
                  <p className="mt-3 text-base text-muted-foreground">
                    {labels.passwordLabel}
                    <span className="ml-2 font-serif text-2xl font-bold tracking-widest text-secondary-foreground">{labels.password}</span>
                  </p>
                )}
                {index > 0 && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.description}</p>}
                <details className="disclosure mt-3 border-t border-border/70">
                  <summary className="flex min-h-11 items-center justify-between gap-3 text-sm font-bold text-card-foreground">
                    <span>{labels.audienceLabel}</span>
                    <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
                  </summary>
                  <p className="pb-3 text-base leading-relaxed text-muted-foreground">{item.targetAudience}</p>
                </details>
                <a
                  href={item.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 text-base ${index === 0 ? 'gold-btn px-6 font-bold' : isLine ? 'btn-line px-6' : 'btn-outline'}`}
                >
                  {isLine && <MessageCircle className="size-4" />}
                  {item.ctaText}
                  <ArrowUpRight className="size-4" />
                </a>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
