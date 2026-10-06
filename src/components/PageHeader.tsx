import type { ReactNode } from 'react';

// 內頁共用的頁首：眉批、H1、一段說明。主標題不做進場動效（BRIEF §3）。
export default function PageHeader({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: ReactNode }) {
  return (
    <header>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-3 font-serif text-[32px] font-bold leading-snug text-card-foreground md:text-[40px]">{title}</h1>
      {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>}
      {children}
    </header>
  );
}

// 內頁的兩種內容寬度（只有寬度與左右留白）。src/components/page/** 的 PageHero、PageSection、JourneyNext 共用。
export const wideWidth = 'mx-auto w-full max-w-[1180px] px-6 lg:px-10';
export const narrowWidth = 'mx-auto w-full max-w-[860px] px-6 lg:px-10';
// 舊的整頁外殼（寬度加上下留白）。改用 PageHero／PageSection 的頁面不再需要。
export const pageShell = 'mx-auto max-w-[1180px] px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-14';
export const narrowShell = 'mx-auto max-w-[860px] px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-14';
export const sectionTitle = 'font-serif text-xl font-bold text-card-foreground md:text-2xl';
// PageSection 的 H2
export const sectionHeading = 'font-serif text-2xl font-bold leading-snug text-card-foreground md:text-[28px]';
export const cardClass = 'rounded-[18px] border border-border bg-card shadow-[0_4px_20px_color-mix(in_srgb,var(--color-card-foreground)_5%,transparent)]';
export const summaryClass = 'flex min-h-14 items-center justify-between gap-4 py-3 text-base font-bold text-card-foreground';
