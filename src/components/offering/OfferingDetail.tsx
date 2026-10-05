import Link from 'next/link';
import { ArrowUpRight, ChevronRight, MessageCircle, Plus } from 'lucide-react';
import ContentBlocks, { QaList } from './ContentBlocks';
import CtaBand from '../CtaBand';
import StickyCtaBar from '../StickyCtaBar';
import { Reveal } from '../motion/Reveal';
import { homeContent, offeringsContent, siteLinks } from '../../data';
import type { ContentGroup, OfferingContent } from '../../types';
import { cn } from '@/lib/utils';

// 服務與課程共用的詳細頁（PLN-004 D2／D3；定案見 RES-002 §2、§3）。
// - 骨幹取自提案 A「長頁收合」：第一個畫面只回答「這是什麼、適不適合我、下一步」，
//   其餘文案依決策順序分組，每段預設收起、一次開一段（BRIEF §4A）。
// - 桌機右側固定卡片帶著費用與預約；手機用底部固定列。
// - 課程頁另有取自提案 C 的「學習路徑」，標出這門課在三階中的位置。
// - 見證（proof）在客戶確認授權前不顯示（RPT-001 C1）。
const GROUP_ORDER: ContentGroup[] = ['intro', 'plans', 'process', 'faq', 'notes', 'proof'];

export interface OfferingDetailProps {
  back: { label: string; href: string };
  eyebrow?: string;
  title: string;
  facts: string[];
  price?: string;
  cta: { label: string; href: string };
  content?: OfferingContent;
  /** 文案集沒有完整內容時的後備說明 */
  fallbackDescription?: string;
  /** 摘要資料的適合對象；文案集沒有明確的對象段落時顯示 */
  audience?: string;
  path?: { steps: { id: string; name: string; href: string; current: boolean }[] };
}

export default function OfferingDetail({ back, eyebrow, title, facts, price, cta, content, fallbackDescription, audience, path }: OfferingDetailProps) {
  const labels = offeringsContent.detail;
  const leadParagraphs = (content?.lead ?? []).filter((b) => b.type === 'p').slice(0, 1);
  // 第一個畫面的「適不適合我」：只取標題明確在講對象或處境的段落；找不到就用摘要資料的適合對象。
  const fitSection = content?.sections.find(
    (s) => s.group === 'intro' && /適合|你是否|卡關|困境|呼喚|聲音|曾感覺/.test(s.title) && s.blocks.some((b) => b.type === 'list')
  );
  const fitList = fitSection?.blocks.find((b) => b.type === 'list');
  const fitItems = fitList && fitList.type === 'list' ? fitList.items.slice(0, 3) : [];
  const showProof = homeContent.testimonials.authorized;
  // 「這適合我嗎」群組內，先放對象與課程內容，再放背景故事（決策順序，RES-002 §3）
  const introRank = (title: string) => (/適合|你是否|卡關|困境|呼喚|聲音|曾感覺/.test(title) ? 0 : /大綱|學到|學什麼|內容|轉變|效益|功效|收穫/.test(title) ? 1 : /故事|導師|為什麼選擇/.test(title) ? 3 : 2);
  const groups = GROUP_ORDER.filter((g) => g !== 'proof' || showProof)
    .map((group) => {
      const sections = (content?.sections ?? []).filter((s) => s.group === group);
      return { group, sections: group === 'intro' ? [...sections].sort((a, b) => introRank(a.title) - introRank(b.title)) : sections };
    })
    .filter((g) => g.sections.length > 0);
  const external = cta.href.startsWith('http');

  const ctaButtons = (
    <>
      <a
        href={cta.href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="gold-btn gold-sheen px-6 text-base font-bold"
        data-cta="offering-primary"
      >
        {cta.label}
        <ArrowUpRight className="size-4" />
      </a>
      <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="btn-outline text-base" data-cta="offering-line">
        <MessageCircle className="size-4 text-line" />
        {labels.lineLabel}
      </a>
    </>
  );

  return (
    <>
      <div className="mx-auto max-w-[1180px] px-6 pb-16 pt-8 lg:px-10 lg:pb-24">
        <nav aria-label="麵包屑" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href={back.href} className="inline-flex min-h-11 items-center font-semibold text-accent-foreground hover:underline">
            {back.label}
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="line-clamp-1">{title}</span>
        </nav>

        <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-3 font-serif text-[28px] font-bold leading-snug text-card-foreground md:text-[36px]">{title}</h1>

            {leadParagraphs.length > 0 ? (
              <div className="mt-4 space-y-2 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {leadParagraphs.map((b) => (b.type === 'p' ? <p key={b.text}>{b.text}</p> : null))}
              </div>
            ) : (
              fallbackDescription && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{fallbackDescription}</p>
            )}

            {facts.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {facts.map((fact) => (
                  <li key={fact} className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                    {fact}
                  </li>
                ))}
              </ul>
            )}

            {fitItems.length === 0 && audience && (
              <div className="mt-7">
                <p className="text-sm font-bold text-accent-foreground">{labels.fitLabel}</p>
                <p className="mt-2 text-base leading-relaxed text-foreground">{audience}</p>
              </div>
            )}

            {fitItems.length > 0 && (
              <div className="mt-7">
                <p className="text-sm font-bold text-accent-foreground">{fitSection?.title ?? labels.fitLabel}</p>
                <ul className="mt-2 space-y-2 text-base leading-relaxed text-foreground">
                  {fitItems.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-[#D89A3E]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 手機與平板：第一個畫面就要有費用與主要行動；桌機由右側固定卡片承擔 */}
            {price && (
              <p className="mt-6 text-base leading-relaxed text-foreground lg:hidden">
                <span className="font-bold text-accent-foreground">{labels.priceLabel}　</span>
                {/* 手機第一屏只放費用的第一句；完整方案在下方「方案與費用」 */}
                {price.split('；')[0]}
              </p>
            )}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:hidden">{ctaButtons}</div>

            {path && (
              <Reveal className="mt-10">
                <p className="text-sm font-bold text-accent-foreground">{labels.pathLabel}</p>
                <ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {path.steps.map((step, index) => (
                    <li key={step.id}>
                      {step.current ? (
                        <div aria-current="step" className="flex h-full min-h-14 items-center gap-3 rounded-xl border border-ring bg-accent px-4 py-2">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</span>
                          <span className="text-sm font-bold leading-snug text-primary-foreground">
                            {step.name}
                            <span className="block text-xs font-semibold text-accent-foreground">{labels.pathHere}</span>
                          </span>
                        </div>
                      ) : (
                        <Link href={step.href} className="flex h-full min-h-14 items-center gap-3 rounded-xl border border-border bg-popover px-4 py-2 transition-colors hover:border-ring">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-sm font-bold text-accent-foreground">{index + 1}</span>
                          <span className="text-sm font-bold leading-snug text-card-foreground">{step.name}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            <div className="mt-12 space-y-10">
              {groups.map(({ group, sections }) => (
                <Reveal key={group}>
                  <h2 className="font-serif text-xl font-bold text-card-foreground md:text-2xl">{labels.groups[group]}</h2>
                  <div className="mt-3 divide-y divide-border/70 border-y border-border/70">
                    {sections.map((section) => {
                      const onlyQa = section.blocks.length === 1 && section.blocks[0].type === 'qa';
                      if (group === 'faq' && onlyQa && section.blocks[0].type === 'qa') {
                        return (
                          <div key={section.id} className="[&>div]:border-y-0">
                            <QaList items={section.blocks[0].items} name={`faq-${section.id}`} />
                          </div>
                        );
                      }
                      return (
                        <details
                          key={section.id}
                          name={`group-${group}`}
                          className="disclosure"
                        >
                          <summary className={cn('flex min-h-14 items-center justify-between gap-4 py-3 text-base font-bold text-card-foreground')}>
                            <span>{section.title}</span>
                            <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
                          </summary>
                          <div className="pb-6">
                            <ContentBlocks blocks={section.blocks} idPrefix={section.id} />
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 rounded-[18px] border border-border bg-card p-6 shadow-[0_4px_20px_rgba(58,42,24,0.05)]">
              <p className="font-serif text-lg font-bold text-card-foreground">{title}</p>
              {price && (
                <div className="mt-4">
                  <p className="text-sm font-bold text-accent-foreground">{labels.priceLabel}</p>
                  <p className="mt-1 text-base leading-relaxed text-foreground">{price}</p>
                </div>
              )}
              {facts[0] && (
                <div className="mt-4">
                  <p className="text-sm font-bold text-accent-foreground">{labels.durationLabel}</p>
                  <p className="mt-1 text-base leading-relaxed text-foreground">{facts[0]}</p>
                </div>
              )}
              <div className="mt-6 flex flex-col gap-3">{ctaButtons}</div>
            </div>
          </aside>
        </div>
      </div>

      <CtaBand />
      <StickyCtaBar primary={{ label: cta.label, href: cta.href, external }} lineLabel={labels.lineLabel} threshold={360} />
    </>
  );
}
