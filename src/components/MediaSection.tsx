import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import PageHero from './page/PageHero';
import PageSection from './page/PageSection';
import ChipTabs from './page/ChipTabs';
import { EpisodeRow, ShowEpisodes, rowsClass } from './media/EpisodeList';
import { mediaIntro, mediaPartners, mediaPublications, mediaShows, pagesContent } from '../data';

// 媒體專訪（PLN-006 P4；提案見 docs/06_research-and-design/proposals/pages-v2/media）。
// - 第一個畫面：文案集的標題與一句導言，下面是頁內小導覽（四個區塊既有的標題）。這一頁沒有金色按鈕：
//   訪客要的是外界的佐證，每一列都是往外的連結；回首頁選對象的行動在結尾的 CtaBand。
// - 出版品：三本書各一列，文字封面加文案集的整行標題；長說明一次開一本（原生 <details name>）。
//   書封到位前是直排書名的文字封面（RPT-001 G3），保留 data-placeholder。
// - 精選 6 集固定可見；11 個節目是分頁，一次看一個節目的單集。#media-podcasts 是第三本書連過來的錨點，不可改。
const labels = pagesContent.media;
const sections = [
  { id: 'media-books', title: labels.booksLabel },
  { id: 'media-podcasts', title: labels.featuredLabel },
  { id: 'media-shows', title: labels.allShowsLabel },
  { id: 'media-partners', title: labels.partnersLabel },
];

function BookCover({ title }: { title: string }) {
  return (
    <span
      data-placeholder="book-cover"
      aria-hidden="true"
      className="flex h-[108px] w-[72px] shrink-0 items-center justify-center text-balance rounded-[3px_8px_8px_3px] border border-border bg-[linear-gradient(160deg,var(--color-popover),var(--color-accent))] px-1.5 py-2 font-serif text-sm font-bold leading-normal tracking-[0.08em] text-secondary-foreground shadow-[inset_4px_0_0_color-mix(in_srgb,var(--color-ring)_30%,transparent),0_4px_12px_color-mix(in_srgb,var(--color-card-foreground)_8%,transparent)] [writing-mode:vertical-rl]"
    >
      {title}
    </span>
  );
}

function Books() {
  return (
    <div className={rowsClass}>
      {mediaPublications.map((pub, index) => {
        const external = pub.link?.href.startsWith('http');
        return (
          <details key={pub.id} name="media-book" open={index === 0} className="disclosure">
            <summary className="flex items-center gap-4 py-4">
              <BookCover title={pub.title} />
              <span className="grid min-w-0 flex-1 gap-1">
                <span className="font-serif text-lg font-bold leading-normal text-card-foreground">{pub.heading}</span>
                {pub.note && <span className="text-sm font-semibold text-accent-foreground">{pub.note}</span>}
              </span>
              <Plus className="disclosure-icon size-4 shrink-0 text-ring" aria-hidden="true" />
            </summary>
            <div className="pb-4">
              <p className="text-base leading-relaxed text-muted-foreground">{pub.description}</p>
              {pub.link && (
                <a href={pub.link.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="btn-text mt-1 text-base">
                  {pub.link.label}
                  {external ? <ArrowUpRight className="size-4" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
                </a>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}

export default function MediaSection() {
  const featured = mediaShows.flatMap((show) => show.episodes.filter((episode) => episode.featured).map((episode) => ({ show, episode })));
  const shows = mediaShows.map((show) => ({ id: show.id, label: show.show, content: <ShowEpisodes show={show} /> }));

  return (
    <>
      <PageHero eyebrow={mediaIntro.label} title={mediaIntro.heading} lead={mediaIntro.description}>
        <nav
          aria-label={mediaIntro.label}
          className="flex gap-2 overflow-x-auto py-1 [scrollbar-width:none] md:flex-wrap md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="chip shrink-0 text-base">
              {section.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <PageSection id={sections[0].id} title={sections[0].title} width="narrow">
        <Books />
      </PageSection>

      <PageSection id={sections[1].id} title={sections[1].title} width="narrow" tone="tint">
        <ul className={rowsClass}>
          {featured.map(({ show, episode }) => (
            <li key={episode.title}>
              <EpisodeRow episode={episode} top={[show.show, episode.note].filter(Boolean).join('・')} />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id={sections[2].id} title={sections[2].title} width="narrow">
        <ChipTabs items={shows} idPrefix="shows" ariaLabel={sections[2].title} />
      </PageSection>

      <PageSection id={sections[3].id} title={sections[3].title} width="narrow" tone="tint">
        <ul className="grid gap-2 text-base leading-relaxed text-muted-foreground">
          {mediaPartners.map((partner) => (
            <li key={partner} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-ring" />
              <span>{partner}</span>
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  );
}
