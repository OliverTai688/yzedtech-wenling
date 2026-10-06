import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Mic, Video } from 'lucide-react';
import WingsMark from '../brand/WingsMark';
import { homeContent, mediaIntro, mediaPublications, mediaShows } from '../../data';

// Slide 05 媒體（RES-005 §3）。主角是三本立著的書（CSS 3D，書封是書名，沒有圖片；封面到位前的替代，RPT-001 G3）。
// 桌機釘住：三本書先以書背示人，隨捲動依序轉正（timelines/rest.ts）；手機不釘住：進入畫面時依序立起。
// 每本書都連到 /media；連結的文字是文案集該書的整行標題（手機上只給輔助科技，畫面上是書封的書名）。
// 書的下方是 Podcast 精選三集（挑法同 home/HomeSections.tsx 的 HomeMedia）與「媒體專訪」按鈕。
export default function StageMedia() {
  const featured = mediaShows
    .flatMap((show) => show.episodes.filter((e) => e.featured && e.href).map((episode) => ({ show, episode })))
    .slice(0, 3);
  return (
    <section id="media-section" data-sec="media" className="st-sec st-media">
      <div className="st-media__pin">
        <div className="st-media__stage" data-rvg>
          <h2 className="st-cap st-media__cap" data-rv>
            {mediaIntro.heading}
          </h2>
          <ul className="st-shelf">
            {mediaPublications.map((pub, index) => (
              <li key={pub.id}>
                <Link href="/media" className="st-vol" data-vol={index} aria-label={pub.title}>
                  {/* 書封的位置，封面到位前顯示書名 */}
                  <span className="st-vol__box" data-placeholder="book-cover" aria-hidden="true">
                    <span className="st-vol__in">
                      <span className="st-vol__face st-vol__back" />
                      <span className="st-vol__face st-vol__pages" />
                      <span className="st-vol__face st-vol__spine">
                        <span>{pub.title}</span>
                      </span>
                      <span className="st-vol__face st-vol__front">
                        <span className="st-vol__t">{pub.title}</span>
                        <span className="st-vol__seal">
                          <WingsMark className="st-vol__mark" />
                        </span>
                      </span>
                    </span>
                  </span>
                  <span className="st-vol__cap">{pub.heading}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="st-sec__text st-media__more" data-rvg>
        <ul className="st-eps" data-rv>
          {featured.map(({ show, episode }) => {
            const Icon = show.kind === 'podcast' ? Mic : Video;
            return (
              <li key={episode.title}>
                <a href={episode.href} target="_blank" rel="noopener noreferrer" className="st-ep">
                  <span className="st-ep__ic" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="st-ep__tx">
                    <span className="st-ep__show">{show.show}</span>
                    <span className="st-ep__t">{episode.title}</span>
                  </span>
                  <ArrowUpRight className="st-ep__go" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="st-sec__act" data-rv>
          <Link href="/media" className="btn-outline text-base">
            {homeContent.media.moreLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
