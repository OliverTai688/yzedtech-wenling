import { ArrowUpRight, Plus } from 'lucide-react';
import { pagesContent } from '../../data';
import type { MediaEpisode, MediaShow } from '../../types';

// 媒體專訪的單集清單（PLN-006 P4）。每一集是一個往外的文字連結（.btn-text），沒有連結的只列標題與「連結待更新」。
export const rowsClass = 'divide-y divide-border/70 border-y border-border/70';

// top：標題上面的小字（精選清單放節目名稱，節目內放單集的附註）
export function EpisodeRow({ episode, top }: { episode: MediaEpisode; top?: string }) {
  const main = (
    <span className="grid min-w-0 gap-0.5">
      {top && <span className="text-sm">{top}</span>}
      <span className="font-medium leading-normal text-card-foreground">{episode.title}</span>
    </span>
  );
  // .btn-text 不在 Tailwind 的 layer 裡，要改它的排列得加上 !
  return episode.href ? (
    <a
      href={episode.href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-text flex! w-full items-start! justify-between! gap-3! py-3! text-left text-base"
    >
      {main}
      <ArrowUpRight className="mt-1 size-4 shrink-0" aria-hidden="true" />
    </a>
  ) : (
    <div className="flex min-h-11 items-start justify-between gap-3 py-3 text-base">
      {main}
      <span className="shrink-0 text-sm text-muted-foreground">{pagesContent.media.pendingLink}</span>
    </div>
  );
}

function Episodes({ episodes }: { episodes: MediaEpisode[] }) {
  return (
    <ul className={rowsClass}>
      {episodes.map((episode) => (
        <li key={episode.title}>
          <EpisodeRow episode={episode} top={episode.note} />
        </li>
      ))}
    </ul>
  );
}

// 一個節目的全部單集。有季別（group）的節目依季別收合，一次開一季；其餘直接列出。
export function ShowEpisodes({ show }: { show: MediaShow }) {
  const groups = [...new Set(show.episodes.flatMap((episode) => episode.group ?? []))];
  return (
    <>
      {show.summary && <p className="mb-2 text-base leading-relaxed text-muted-foreground">{show.summary}</p>}
      {groups.length > 0 ? (
        <div className={rowsClass}>
          {groups.map((group, index) => (
            <details key={group} name={`season-${show.id}`} open={index === 0} className="disclosure">
              <summary className="flex min-h-12 items-center justify-between gap-4 py-2 text-base font-bold text-card-foreground">
                <span>{group}</span>
                <Plus className="disclosure-icon size-4 shrink-0 text-ring" aria-hidden="true" />
              </summary>
              <Episodes episodes={show.episodes.filter((episode) => episode.group === group)} />
            </details>
          ))}
        </div>
      ) : (
        <Episodes episodes={show.episodes} />
      )}
    </>
  );
}
