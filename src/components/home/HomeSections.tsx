import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Mic, Video, Plus, MessageCircle, ShoppingBag } from 'lucide-react';
import WingsMark from '../brand/WingsMark';
import { Reveal, RevealGroup, RevealItem } from '../motion/Reveal';
import {
  heroContent,
  homeContent,
  mediaIntro,
  mediaPublications,
  mediaShows,
  resources,
  services,
  siteLinks,
} from '../../data';

// 首頁需求入口以下的各區塊（RES-002 §1）。都是伺服器元件；進場動效交給 Reveal。
// 文字密度（BRIEF §4A）：每個區塊預設只露出標題與一句話，其餘收起或留在內頁。

const h2 = 'mt-3 font-serif text-[26px] font-bold leading-snug text-card-foreground md:text-[32px]';
const card = 'rounded-[18px] border border-border bg-card shadow-[0_4px_20px_rgba(58,42,24,0.05)]';

export function FeaturedServices() {
  const { eyebrow, heading, description, items, moreLabel, itemLabel } = homeContent.services;
  return (
    <>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={h2}>{heading}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
      </Reveal>
      <RevealGroup className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((item) => {
          const service = services.find((s) => s.id === item.id);
          if (!service) return null;
          return (
            <RevealItem key={item.id}>
              <Link
                href={`/services/${item.id}`}
                className={`${card} group flex h-full flex-col p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-ring`}
              >
                <h3 className="font-serif text-lg font-bold text-card-foreground">{service.name}</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">{item.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-base font-bold text-accent-foreground">
                  {itemLabel}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <Reveal className="mt-8">
        <Link href="/services" className="btn-outline text-base">
          {moreLabel}
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </>
  );
}

export function HomeTestimonials() {
  const { eyebrow, heading, description, items, moreLabel } = homeContent.testimonials;
  return (
    <>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={h2}>{heading}</h2>
        <p className="mt-4 text-base text-muted-foreground">{description}</p>
      </Reveal>
      <RevealGroup className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((item) => (
          <RevealItem key={item.quote} className={`${card} flex flex-col p-6`}>
            <span className="self-start rounded-full bg-accent px-3 py-0.5 text-sm font-bold text-accent-foreground">
              {item.category}
            </span>
            <p className="mt-4 flex-1 font-serif text-base leading-relaxed text-card-foreground">「{item.quote}」</p>
            <p className="mt-4 text-sm text-muted-foreground">— {item.source}</p>
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className="mt-8">
        <Link href="/testimonials" className="btn-outline text-base">
          {moreLabel}
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </>
  );
}

export function FounderIntro() {
  const { eyebrow, missionLabel, missionTitle, mission, cta } = homeContent.founder;
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
      <Reveal className="md:col-span-4">
        {/* 創辦人形象照的位置，照片到位前顯示光感底（RPT-001 G2） */}
        <div
          data-placeholder="founder-portrait"
          aria-hidden="true"
          className="mx-auto flex aspect-[4/5] w-full max-w-[280px] items-center justify-center rounded-t-full rounded-b-[18px] border border-border bg-[linear-gradient(180deg,#FFFDF0,#FCE7A8)]"
        >
          <WingsMark className="w-24 opacity-70" />
        </div>
      </Reveal>
      <Reveal className="md:col-span-8" delay={0.07}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={h2}>{heroContent.portraitCaption}</h2>
        <p className="mt-6 text-sm font-bold text-accent-foreground">
          {missionLabel}｜{missionTitle}
        </p>
        <p className="mt-2 max-w-2xl font-serif text-lg leading-relaxed text-card-foreground">{mission}</p>
        <Link href="/story" className="btn-outline mt-7 text-base">
          {cta}
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </div>
  );
}

export function HomeMedia() {
  const featured = mediaShows
    .flatMap((show) => show.episodes.filter((e) => e.featured && e.href).map((episode) => ({ show, episode })))
    .slice(0, 3);
  return (
    <>
      <Reveal>
        <p className="eyebrow">{mediaIntro.label}</p>
        <h2 className={h2}>{mediaIntro.heading}</h2>
      </Reveal>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <RevealGroup className="grid grid-cols-3 gap-3 sm:gap-5 lg:col-span-6">
          {mediaPublications.map((pub) => (
            <RevealItem key={pub.id}>
              {/* 書封的位置，封面到位前顯示書名（RPT-001 G3） */}
              <div
                data-placeholder="book-cover"
                className="flex aspect-[2/3] items-center justify-center rounded-xl border border-border bg-[linear-gradient(160deg,#FFFDF0,#FBF1DD)] p-3 text-center"
              >
                <span className="font-serif text-sm font-bold leading-snug text-card-foreground sm:text-base">《{pub.title}》</span>
              </div>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">{pub.role}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <RevealGroup className="divide-y divide-border/70 border-y border-border/70 lg:col-span-6">
          {featured.map(({ show, episode }) => {
            const Icon = show.kind === 'podcast' ? Mic : Video;
            return (
              <RevealItem key={episode.title}>
                <a
                  href={episode.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-start gap-3 py-4"
                >
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-popover">
                    <Icon className="size-4 text-ring" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-accent-foreground">{show.show}</span>
                    <span className="mt-0.5 block text-base font-medium leading-snug text-card-foreground group-hover:underline">
                      {episode.title}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
                </a>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
      <Reveal className="mt-8">
        <Link href="/media" className="btn-outline text-base">
          {homeContent.media.moreLabel}
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </>
  );
}

export function ResourcesBand() {
  const [live, community] = resources;
  return (
    <Reveal className={`${card} flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between`}>
      <div className="max-w-xl">
        <p className="eyebrow">{homeContent.resources.eyebrow}</p>
        <h2 className="mt-3 font-serif text-xl font-bold leading-snug text-card-foreground md:text-2xl">{live.title}</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{live.description}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-3">
        <a href={community.ctaLink} target="_blank" rel="noopener noreferrer" className="gold-btn px-6 text-base font-bold">
          {community.ctaText}
          <ArrowUpRight className="size-4" />
        </a>
        <Link href="/resources" className="btn-outline text-base">
          {homeContent.resources.moreLabel}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </Reveal>
  );
}

export function HomeFaq() {
  const { heading, items } = homeContent.faq;
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-12">
      <Reveal className="md:col-span-4">
        <h2 className={`${h2} mt-0`}>{heading}</h2>
      </Reveal>
      <Reveal className="divide-y divide-border/70 border-y border-border/70 md:col-span-8" delay={0.07}>
        {items.map((item) => (
          <details key={item.question} name="home-faq" className="disclosure">
            <summary className="flex min-h-14 items-center justify-between gap-4 py-3 text-base font-bold text-card-foreground">
              <span>{item.question}</span>
              <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
            </summary>
            <p className="pb-5 text-base leading-relaxed text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </Reveal>
    </div>
  );
}

// 最終 CTA（RES-002 §1：採提案 B 的深金光感，用 CSS 光暈，不用 three.js）。
// 收束標語未到（RPT-001 T3），先用 Hero 眉批的原文。
export function FinalCta() {
  const { primary, secondary, shop } = homeContent.finalCta;
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
          <a
            href="#personas-section"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-inverse-accent/60 px-6 text-base font-semibold text-inverse-accent transition-colors hover:bg-inverse-accent hover:text-inverse"
          >
            {secondary}
            <ArrowRight className="size-4" />
          </a>
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
