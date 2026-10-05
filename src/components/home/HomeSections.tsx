import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Mic, Video, Plus } from 'lucide-react';
import WingsMark from '../brand/WingsMark';
import { Reveal, RevealGroup, RevealItem } from '../motion/Reveal';
import {
  heroContent,
  homeContent,
  mediaIntro,
  mediaPublications,
  mediaShows,
  resources,
  serviceBlurbs,
  services,
} from '../../data';

// 首頁需求入口以下的各區塊（RES-002 §1）。都是伺服器元件；進場動效交給 Reveal。
// 文字密度（BRIEF §4A）：每個區塊預設只露出標題與一句話，其餘收起或留在內頁。

const h2 = 'mt-3 font-serif text-[26px] font-bold leading-snug text-card-foreground md:text-[32px]';
const card = 'rounded-[18px] border border-border bg-card shadow-[0_4px_20px_rgba(58,42,24,0.05)]';

export function FeaturedServices() {
  const { eyebrow, heading, description, ids, moreLabel, itemLabel } = homeContent.services;
  return (
    <>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={h2}>{heading}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
      </Reveal>
      <RevealGroup className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {ids.map((id) => {
          const service = services.find((s) => s.id === id);
          if (!service) return null;
          return (
            <RevealItem key={id}>
              <Link
                href={`/services/${id}`}
                className={`${card} group flex h-full flex-col p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-ring`}
              >
                <h3 className="font-serif text-lg font-bold text-card-foreground">{service.name}</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">{serviceBlurbs[id]}</p>
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
