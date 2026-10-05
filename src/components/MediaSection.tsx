import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Mic, Video, Plus } from 'lucide-react';
import PageHeader, { cardClass, pageShell, sectionTitle } from './PageHeader';
import { Reveal } from './motion/Reveal';
import { homeContent, mediaIntro, mediaPartners, mediaPublications, mediaShows, offeringsContent, pagesContent } from '../data';
import type { MediaEpisode, MediaShow } from '../types';

// 媒體專訪（PLN-004 D9；定案見 RES-002 §9）：提案 A 的結構，節目改為單一清單逐一展開。
// - 三本書只露出書名與角色，說明收起；書封到位前顯示書名（RPT-001 G3）。
// - 出版品與訪談之間有一條導向服務的區塊（原本這頁有 34 個出站連結、0 個導回服務）。
// - 精選 6 集固定可見；11 個節目各一列，點開才列出集數，一次開一個（BRIEF §4A）。
function EpisodeRow({ show, episode }: { show: MediaShow; episode: MediaEpisode }) {
  const Icon = show.kind === 'podcast' ? Mic : Video;
  const body = (
    <>
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-popover">
        <Icon className="size-4 text-ring" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-accent-foreground">
          {show.show}
          {episode.note ? `・${episode.note}` : ''}
        </span>
        <span className="mt-0.5 block text-base font-medium leading-snug text-card-foreground group-hover:underline">{episode.title}</span>
      </span>
    </>
  );
  return episode.href ? (
    <a href={episode.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-11 items-start gap-3 py-3.5">
      {body}
      <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
    </a>
  ) : (
    <div className="flex min-h-11 items-start gap-3 py-3.5">
      {body}
      <span className="mt-1 shrink-0 text-sm text-muted-foreground">{pagesContent.media.pendingLink}</span>
    </div>
  );
}

export default function MediaSection() {
  const labels = pagesContent.media;
  const featured = mediaShows.flatMap((show) => show.episodes.filter((e) => e.featured).map((episode) => ({ show, episode })));

  return (
    <div className={pageShell} id="media-section">
      <PageHeader eyebrow={mediaIntro.label} title={mediaIntro.heading} description={mediaIntro.description} />

      <section className="mt-12">
        <h2 className={sectionTitle}>{labels.booksLabel}</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          {mediaPublications.map((pub) => {
            const external = pub.link?.href.startsWith('http');
            return (
              <div key={pub.id} className={`${cardClass} flex flex-col p-5`}>
                <div className="flex gap-4">
                  <div
                    data-placeholder="book-cover"
                    aria-hidden="true"
                    className="flex aspect-[2/3] w-20 shrink-0 items-center justify-center rounded-lg border border-border bg-[linear-gradient(160deg,#FFFDF0,#FCE7A8)]"
                  />
                  <div>
                    <p className="text-sm font-bold text-accent-foreground">{pub.role}</p>
                    <h3 className="mt-1 font-serif text-lg font-bold leading-snug text-card-foreground">《{pub.title}》</h3>
                    {pub.note && <p className="mt-1 text-sm text-muted-foreground">{pub.note}</p>}
                  </div>
                </div>
                <details className="disclosure mt-4 border-t border-border/70">
                  <summary className="flex min-h-11 items-center justify-between gap-3 text-sm font-bold text-card-foreground">
                    <span>{labels.descriptionLabel}</span>
                    <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
                  </summary>
                  <p className="pb-3 text-base leading-relaxed text-muted-foreground">{pub.description}</p>
                </details>
                {pub.link && (
                  <a
                    href={pub.link.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 text-base font-bold text-accent-foreground hover:underline"
                  >
                    {pub.link.label}
                    {external ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Reveal className={`${cardClass} mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between`}>
        <p className="font-serif text-lg font-bold text-card-foreground">{homeContent.services.heading}</p>
        <Link href="/#personas-section" className="gold-btn shrink-0 px-6 text-base font-bold">
          {offeringsContent.helper.needs}
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>

      <section id="media-podcasts" className="mt-12 scroll-mt-24">
        <h2 className={sectionTitle}>{labels.featuredLabel}</h2>
        <div className="mt-3 divide-y divide-border/70 border-y border-border/70">
          {featured.map(({ show, episode }) => (
            <EpisodeRow key={episode.title} show={show} episode={episode} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className={sectionTitle}>{labels.allShowsLabel}</h2>
        <div className="mt-3 divide-y divide-border/70 border-y border-border/70">
          {mediaShows.map((show) => (
            <details key={show.id} name="media-show" className="disclosure">
              <summary className="flex min-h-14 items-center justify-between gap-4 py-3">
                <span>
                  <span className="block text-base font-bold text-card-foreground">{show.show}</span>
                  {show.summary && <span className="mt-0.5 block text-sm text-muted-foreground">{show.summary}</span>}
                </span>
                <span className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground">
                  {show.episodes.length} {labels.episodesUnit}
                  <Plus className="disclosure-icon size-4 text-ring" />
                </span>
              </summary>
              <div className="divide-y divide-border/50 pb-3 pl-2">
                {show.episodes.map((episode) => (
                  <EpisodeRow
                    key={episode.title}
                    show={show}
                    episode={episode.group ? { ...episode, note: [episode.group, episode.note].filter(Boolean).join('・') } : episode}
                  />
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className={sectionTitle}>{labels.partnersLabel}</h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-muted-foreground">
          {mediaPartners.map((partner) => (
            <li key={partner} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-[#D89A3E]" />
              <span>{partner}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
