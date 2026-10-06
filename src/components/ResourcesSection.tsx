import { ArrowUpRight, MessageCircle, Plus } from 'lucide-react';
import PageHero from './page/PageHero';
import PageSection from './page/PageSection';
import ResourceTicket from './resources/ResourceTicket';
import { heroContent, pagesContent, resources, siteLinks } from '../data';

// 免費資源（PLN-006 P5；提案見 proposals/pages-v2/resources）。這一頁只要訪客做一件事：加入免費社群。
// - 第一個畫面：頁名、說明的第一句、唯一的金色按鈕（Hero 的次按鈕，文案集第 115 行），下方是票卡（密碼與每週時段）。
// - 三個步驟：原生 <details name>，一次開一個，第一步預設展開；每一步自己的行動是文字連結。
// - 文案集沒有這一頁的專屬文案，文字都是 src/data.ts 的 resources（docx 其他段落的原文）。
//   這裡只把原文拆開擺放，不新增、不刪減：說明拆成兩句；「加入密碼：168168」與有時段的條列移到票卡。
const TIME_ENTRY = /^(.+)：(\S+)\s+(\d{1,2}:\d{2})$/;

export default function ResourcesSection() {
  // 說明的第一句（到第一個驚嘆號）當導言，其餘放進有條列的那一步（直播）
  const cut = resources.intro.indexOf('！') + 1;
  const lead = cut > 0 ? resources.intro.slice(0, cut) : resources.intro;
  const introRest = cut > 0 ? resources.intro.slice(cut).trim() : '';

  const highlight = resources.steps.find((step) => step.highlight)?.highlight;
  const [passLabel, pass] = highlight?.split('：') ?? [];
  const entries = resources.steps.flatMap((step) => step.list ?? []);
  const times = entries.flatMap((entry) => {
    const match = TIME_ENTRY.exec(entry);
    return match ? [{ name: match[1], day: match[2], time: match[3] }] : [];
  });

  return (
    <>
      <PageHero
        title={pagesContent.resources.title}
        lead={lead}
        action={{ label: heroContent.secondaryCta.label, href: heroContent.secondaryCta.href, external: true }}
      >
        {passLabel && pass && <ResourceTicket passLabel={passLabel} pass={pass} times={times} />}
      </PageHero>

      <PageSection id="resources-steps" width="narrow">
        <div className="divide-y divide-border/70 border-y border-border/70">
          {resources.steps.map((step, index) => {
            const rest = (step.list ?? []).filter((entry) => !TIME_ENTRY.test(entry));
            return (
              <details key={step.id} name="resources-steps" open={index === 0} className="disclosure">
                <summary className="flex min-h-14 items-center gap-4 py-3">
                  <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full border border-ring bg-popover font-serif text-sm font-bold text-accent-foreground">
                    {index + 1}
                  </span>
                  <h2 className="flex-1 font-serif text-lg font-bold leading-normal text-card-foreground md:text-xl">{step.title}</h2>
                  <Plus className="disclosure-icon size-4 shrink-0 text-ring" aria-hidden="true" />
                </summary>
                <div className="space-y-3 pb-4 pl-11 text-base leading-relaxed text-muted-foreground">
                  <p>{step.description}</p>
                  {step.list && introRest && <p>{introRest}</p>}
                  {rest.length > 0 && (
                    <ul className="space-y-2 text-foreground">
                      {rest.map((entry) => (
                        <li key={entry} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-ring" />
                          <span>{entry}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a href={step.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-text justify-start! text-left text-base">
                    {step.ctaLink === siteLinks.line && <MessageCircle className="size-4" aria-hidden="true" />}
                    {step.ctaText}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </details>
            );
          })}
        </div>
      </PageSection>
    </>
  );
}
