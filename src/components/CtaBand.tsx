import { ArrowRight, ArrowUpRight, MessageCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import WingsMark from './brand/WingsMark';
import { heroContent, homeContent, siteLinks } from '../data';

// 每個內容頁結尾的 CTA 區塊（RES-001 §4.2「不留死路」）。深金光感取自首頁提案 B，
// 用 CSS 光暈，不用 three.js。收束標語未到（RPT-001 T3），先用 Hero 眉批的原文。
// 按鈕文字來自 uiLabels（文案集原文）。
// onHome：首頁的第二顆按鈕是頁內錨點，其他頁面則連回首頁的需求入口。
export default function CtaBand({ onHome = false }: { onHome?: boolean }) {
  const { primary, secondary, shop } = homeContent.finalCta;
  // 一個畫面一顆按鈕：官方 LINE 是金色主按鈕，其餘兩個是文字連結（.dark 之下 .btn-text 自動用淺金色）。
  const needsClass = 'btn-text text-base';
  return (
    <section id="final-cta" className="dark relative overflow-hidden bg-inverse text-inverse-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-inverse-accent)_38%,transparent),color-mix(in_srgb,var(--color-primary)_14%,transparent)_55%,transparent)]"
      />
      <div className="relative mx-auto flex max-w-[820px] flex-col items-center px-6 py-16 text-center md:py-24">
        <WingsMark className="w-20" />
        <h2 className="mt-6 font-serif text-[26px] font-bold leading-snug text-popover md:text-[32px]">{heroContent.eyebrow}</h2>
        <div className="mt-8 flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-center">
          <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="gold-btn px-7 text-base font-bold" id="final-cta-line">
            <MessageCircle className="size-4" />
            {primary}
          </a>
          {onHome ? (
            <a href="#personas-section" className={needsClass}>
              {secondary}
              <ArrowRight className="size-4" />
            </a>
          ) : (
            <Link href="/#personas-section" className={needsClass}>
              {secondary}
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
        <a
          href={siteLinks.shop}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-text text-base"
          id="final-cta-shop"
        >
          <ShoppingBag className="size-4" />
          {shop}
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
