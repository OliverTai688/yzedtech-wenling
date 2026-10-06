import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, MessageCircle, Plus } from 'lucide-react';
import SectionBehavior from './SectionBehavior';
import SectionDeck from './SectionDeck';
import CtaBand from '../CtaBand';
import StickyCtaBar from '../StickyCtaBar';
import JourneyNext from '../page/JourneyNext';
import PageHero from '../page/PageHero';
import { narrowWidth } from '../PageHeader';
import { homeContent, offeringsContent, siteLinks } from '../../data';
import type { ContentGroup, OfferingContent } from '../../types';

// 服務與課程共用的詳細頁（PLN-006 P3；提案見 proposals/pages-v2/service-detail、course-detail 的 PAGE.md）。
// 訪客要知道四件事：這是什麼、適不適合我、多少錢、怎麼約。分三層：
// 1. 第一個畫面（PageHero）：H1、文案集的第一句、該項目自己的金色按鈕、一個私訊的文字連結。
// 2. 頁內小導覽＋段落清單：每一列是文案集的段落標題，點了在原地展開，全頁一次只開一段
//    （原生 <details name>，沒有 JavaScript 也能用）。docx 有名稱的三組（方案與費用、常見問題、注意事項）
//    另外做成 chip，一點就跳到並展開那一段。
// 3. 展開的段落裡再分頁（SectionDeck）：每頁不超過 140 字；表格是堆疊的列，問答一次一題。
// 所有可見文字都是文案集原文；見證（proof）在客戶確認授權前不顯示（RPT-001 C1）。
const GROUP_ORDER: ContentGroup[] = ['intro', 'plans', 'process', 'faq', 'notes', 'proof'];
const BODY_ID = 'offering-body';
const SECTIONS_ID = 'offering-sections';
const rule = 'divide-y divide-border/70 border-y border-border/70';

export interface OfferingDetailProps {
  /** 旅程表的哪一列（上一站、下一站） */
  route: 'service-detail' | 'course-detail';
  back: { label: string; href: string };
  eyebrow?: string;
  title: string;
  /** 費用的原文（文案集逐字，自帶「課程費用」等字樣）；沒有就不顯示 */
  price?: string;
  cta: { label: string; href: string };
  content?: OfferingContent;
  /** 文案集沒有開場段落時的後備說明（Home Block 3／4 的一句話） */
  fallbackDescription?: string;
  /** label：路徑的名稱，只給螢幕閱讀器（文案集的系列名稱） */
  path?: { label: string; steps: { id: string; name: string; href: string; current: boolean }[] };
}

export default function OfferingDetail({ route, back, eyebrow, title, price, cta, content, fallbackDescription, path }: OfferingDetailProps) {
  const labels = offeringsContent.detail;
  // 第一個畫面只放文案集的第一句；開場其餘的段落接在第一個畫面之後（一樣分頁）
  const lead = content?.lead ?? [];
  const first = lead[0]?.type === 'p' ? lead[0].text : undefined;
  const leadRest = first ? lead.slice(1) : lead;
  const showProof = homeContent.testimonials.authorized;
  // 第一組（intro）內，先放對象與課程內容，再放背景故事（決策順序，RES-002 §3）
  const introRank = (heading: string) =>
    /適合|你是否|卡關|困境|呼喚|聲音|曾感覺/.test(heading) ? 0 : /大綱|學到|學什麼|內容|轉變|效益|功效|收穫/.test(heading) ? 1 : /故事|導師|為什麼選擇/.test(heading) ? 3 : 2;
  const groups = GROUP_ORDER.filter((g) => g !== 'proof' || showProof)
    .map((group) => {
      const sections = (content?.sections ?? []).filter((s) => s.group === group);
      return { group, sections: group === 'intro' ? [...sections].sort((a, b) => introRank(a.title) - introRank(b.title)) : sections };
    })
    .filter((g) => g.sections.length > 0);
  // 頁內小導覽：只有 docx 有名稱的分組；只有一組時不值得多一列
  const named = groups.flatMap(({ group, sections }) => (labels.groups[group] ? [{ label: labels.groups[group] as string, id: sections[0].id }] : []));
  const jumps = named.length > 1 ? named : [];
  const external = cta.href.startsWith('http');
  const externalProps = external ? ({ target: '_blank', rel: 'noopener noreferrer' } as const) : {};

  return (
    <>
      {/* data-line-text：手機上點官方 LINE 時帶入的文字，只用本頁的正式名稱（見 SiteInteractions） */}
      <div data-line-text={title}>
        <PageHero
          eyebrow={eyebrow}
          title={title}
          lead={first ?? fallbackDescription}
          before={
            <nav aria-label="麵包屑" className="flex items-center gap-1.5 text-sm text-muted-foreground">
              {/* 手機：H1 就在下面，不重複本頁名稱，改用向左的箭頭表示「回上一層」 */}
              <ChevronLeft className="size-3.5 shrink-0 text-accent-foreground sm:hidden" aria-hidden="true" />
              <Link href={back.href} className="inline-flex min-h-11 shrink-0 items-center font-semibold text-accent-foreground hover:underline">
                {back.label}
              </Link>
              <ChevronRight className="hidden size-3.5 shrink-0 sm:block" aria-hidden="true" />
              <span className="hidden min-w-0 sm:inline">{title}</span>
            </nav>
          }
        >
          {/* 按鈕自己寫而不走 PageHero 的 action：需要 data-cta（轉化路徑的檢查與量測都靠它） */}
          <div className="-mt-1 flex flex-col items-stretch gap-1 sm:items-center">
            <a href={cta.href} {...externalProps} className="gold-btn px-7 text-base font-bold" data-cta="offering-primary">
              {cta.label}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            {cta.href !== siteLinks.line && (
              <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="btn-text text-base" data-cta="offering-line">
                <MessageCircle className="size-4" aria-hidden="true" />
                {labels.lineLabel}
              </a>
            )}
          </div>
        </PageHero>

        <section className="bg-stage">
          <div id={BODY_ID} className={`${narrowWidth} space-y-6 py-8 lg:space-y-8 lg:py-14`}>
            {path && (
              <ol aria-label={path.label} className="grid grid-cols-3 gap-2">
                {path.steps.map((step, index) => {
                  const inner = (
                    <>
                      <span
                        className={
                          step.current
                            ? 'flex size-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground'
                            : 'flex size-7 items-center justify-center rounded-full border border-border text-sm font-bold text-accent-foreground'
                        }
                      >
                        {index + 1}
                      </span>
                      <span className="text-balance text-sm font-bold leading-snug">{step.name}</span>
                    </>
                  );
                  const box = 'flex h-full min-h-20 flex-col items-center gap-2 rounded-xl border px-2 py-3 text-center';
                  return (
                    <li key={step.id}>
                      {step.current ? (
                        <div aria-current="step" className={`${box} border-ring bg-accent text-primary-foreground`}>
                          {inner}
                        </div>
                      ) : (
                        <Link href={step.href} className={`${box} border-border bg-popover text-card-foreground transition-colors hover:border-ring`}>
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}

            {price && <p className="rounded-2xl border border-border bg-card px-5 py-4 text-base font-bold leading-relaxed text-card-foreground">{price}</p>}

            {leadRest.length > 0 && <SectionDeck blocks={leadRest} id="offering-lead" title={title} headingLevel="h2" />}

            <div className="space-y-5">
              {jumps.length > 0 && (
                <nav aria-label={title} className="flex flex-wrap gap-2">
                  {jumps.map((jump) => (
                    <a key={jump.id} href={`#${jump.id}`} data-open-section className="chip text-base">
                      {jump.label}
                    </a>
                  ))}
                </nav>
              )}
              {groups.map(({ group, sections }) => (
                <div key={group} className={rule}>
                  {sections.map((section) => (
                    <details key={section.id} id={section.id} name={SECTIONS_ID} data-section className="disclosure scroll-mt-20">
                      <summary className="flex min-h-14 items-center justify-between gap-4 py-3">
                        <h2 className="font-sans text-base font-bold leading-snug text-card-foreground md:text-lg">{section.title}</h2>
                        <Plus className="disclosure-icon size-4 shrink-0 text-ring" aria-hidden="true" />
                      </summary>
                      <div className="pb-7 pt-1">
                        <SectionDeck blocks={section.blocks} id={section.id} title={section.title} />
                      </div>
                    </details>
                  ))}
                </div>
              ))}
              <SectionBehavior rootId={BODY_ID} />
            </div>

            {/* 桌機沒有底部固定列：看完段落後，在這裡留一個回到主要行動的文字連結 */}
            <p className="hidden justify-center lg:flex">
              <a href={cta.href} {...externalProps} className="btn-text text-base" data-cta="offering-secondary">
                {cta.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </p>
          </div>
        </section>
      </div>

      <JourneyNext route={route} />
      <CtaBand />
      <StickyCtaBar primary={{ label: cta.label, href: cta.href, external }} lineLabel={labels.lineLabel} threshold={360} />
    </>
  );
}
