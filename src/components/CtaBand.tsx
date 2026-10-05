import { ArrowRight, ArrowUpRight, MessageCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import WingsMark from './brand/WingsMark';
import { Reveal } from './motion/Reveal';
import { heroContent, homeContent, siteLinks } from '../data';

// 每個內容頁結尾的 CTA 區塊（RES-001 §4.2「不留死路」）。深金光感取自首頁提案 B，
// 用 CSS 光暈，不用 three.js。收束標語未到（RPT-001 T3），先用 Hero 眉批的原文。
// onHome：首頁的「了解適合我的服務」是頁內錨點，其他頁面則連回首頁的需求入口。
export default function CtaBand({ onHome = false }: { onHome?: boolean }) {
  const { primary, secondary, shop } = homeContent.finalCta;
  const needsClass =
    'inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-inverse-accent/60 px-6 text-base font-semibold text-inverse-accent transition-colors hover:bg-inverse-accent hover:text-inverse';
  return (
    <section id="final-cta" className="dark relative overflow-hidden bg-inverse text-inverse-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(240,200,117,0.38),rgba(201,134,46,0.14)_55%,transparent)]"
      />
      <Reveal className="relative mx-auto flex max-w-[820px] flex-col items-center px-6 py-16 text-center md:py-24">
        <WingsMark className="w-20" />
        <h2 className="mt-6 font-serif text-[26px] font-bold leading-snug text-[#FFFDF0] md:text-[32px]">{heroContent.eyebrow}</h2>
        <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="btn-line px-7 text-base" id="final-cta-line">
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
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-inverse-accent underline-offset-4 hover:underline"
          id="final-cta-shop"
        >
          <ShoppingBag className="size-4" />
          {shop}
          <ArrowUpRight className="size-4" />
        </a>
      </Reveal>
    </section>
  );
}
