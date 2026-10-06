import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import WingsMark from '../brand/WingsMark';
import { narrowWidth } from '../PageHeader';

// 內頁的第一個畫面（pages-v2/BRIEF §4）：暖白的底、一圈很淡的金色光暈、一個安靜的視覺焦點、
// 一個 H1、最多一句導言、一顆按鈕。主標題與按鈕不做進場動效；沒有捲動動畫。
// 文字全部由呼叫的頁面傳入（文案集原文），這裡不寫任何字。
export interface PageHeroAction {
  label: string;
  href: string;
  external?: boolean;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** 這個畫面唯一的按鈕（.gold-btn） */
  action?: PageHeroAction;
  /** 門檻更低的第二個行動，一律是文字連結（.btn-text） */
  secondary?: PageHeroAction & { icon?: ReactNode };
  /** 視覺焦點；不給就是金翼小標誌 */
  visual?: ReactNode;
  /** H1 之上的插槽（例如麵包屑） */
  before?: ReactNode;
  /** 行動之下的插槽（例如分頁列、頁內小導覽） */
  children?: ReactNode;
}

const externalProps = { target: '_blank', rel: 'noopener noreferrer' } as const;

function HeroLink({ item, className, children }: { item: PageHeroAction; className: string; children: ReactNode }) {
  if (item.external) {
    return (
      <a href={item.href} {...externalProps} className={className}>
        {children}
      </a>
    );
  }
  // 頁內錨點用原生連結，其餘用 next/link
  return item.href.startsWith('#') ? (
    <a href={item.href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {children}
    </Link>
  );
}

export default function PageHero({ eyebrow, title, lead, action, secondary, visual, before, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60 bg-stage">
      <div aria-hidden="true" className="page-halo -z-10" />
      <div className={`${narrowWidth} flex flex-col items-center pb-10 pt-8 text-center lg:pb-14 lg:pt-12`}>
        {before && <div className="mb-4 w-full text-left">{before}</div>}
        <div aria-hidden="true" className="flex h-20 items-center justify-center lg:h-24">
          {visual ?? <WingsMark className="h-14 w-auto lg:h-16" />}
        </div>
        {eyebrow && <p className="eyebrow eyebrow--center mt-4">{eyebrow}</p>}
        <h1 className="mt-3 text-balance font-serif text-[30px] font-bold leading-snug text-card-foreground md:text-[40px]">{title}</h1>
        {lead && <p className="mt-4 max-w-[34rem] text-pretty text-base leading-relaxed text-muted-foreground">{lead}</p>}
        {(action || secondary) && (
          <div className="mt-7 flex w-full flex-col items-stretch gap-1 sm:w-auto sm:items-center">
            {action && (
              <HeroLink item={action} className="gold-btn px-7 text-base font-bold">
                {action.label}
                {action.external ? <ArrowUpRight className="size-4" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
              </HeroLink>
            )}
            {secondary && (
              <HeroLink item={secondary} className="btn-text text-base">
                {secondary.icon}
                {secondary.label}
                {secondary.external && <ArrowUpRight className="size-4" aria-hidden="true" />}
              </HeroLink>
            )}
          </div>
        )}
        {children && <div className="mt-8 w-full text-left">{children}</div>}
      </div>
    </section>
  );
}
