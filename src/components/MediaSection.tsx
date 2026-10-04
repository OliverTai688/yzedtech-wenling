import Link from 'next/link';
import { BookOpen, Mic, Video, ExternalLink, Headphones, ArrowRight } from 'lucide-react';
import { mediaIntro, mediaPublications, mediaShows, mediaPartners } from '../data';
import type { MediaEpisode, MediaShow } from '../types';

// PRD-003 §4.7（2026-10-04）：媒體資料改由 src/data.ts 提供（文案集 v2 Home Block 7
// 與 Media 頁）。variant="home" 只列首頁精選單集並導向 /media；variant="full" 是
// /media 獨立頁，依節目列出全部集數。階段 A 沿用原卡片版型；精選＋Tabs 的正式版型
// 於階段 D 依 UIUX 研究調整。
interface MediaSectionProps {
  variant?: 'home' | 'full';
}

const kindLabel: Record<MediaShow['kind'], string> = {
  podcast: '前往收聽',
  youtube: '前往觀看',
  facebook: '前往觀看',
};

function EpisodeCard({ show, episode }: { show: MediaShow; episode: MediaEpisode }) {
  const KindIcon = show.kind === 'podcast' ? Mic : Video;
  return (
    <div className="brand-card p-6 flex flex-col justify-between hover:border-[#D89A3E] transition-all">
      <div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold px-2.5 py-0.5 rounded-full bg-[#FFFDF0] border border-[#F0DFA0] text-[#8A5415] mb-3">
          <KindIcon className="w-3 h-3" />
          {show.show}
        </span>
        <h4 className="text-base font-bold text-[#3A2A18] font-serif mb-2 leading-snug">{episode.title}</h4>
        {episode.note && <p className="text-sm text-[#B5762A] font-semibold mb-2">{episode.note}</p>}
      </div>
      {episode.href ? (
        <a
          href={episode.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 pt-3 border-t border-[#F0DFA0]/70 flex items-center gap-1 text-base text-[#8A5415] hover:text-[#3A2409] font-semibold"
        >
          <span>{kindLabel[show.kind]}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <p className="mt-2 pt-3 border-t border-[#F0DFA0]/70 text-sm text-[#9A8060]">連結整理中</p>
      )}
    </div>
  );
}

export default function MediaSection({ variant = 'home' }: MediaSectionProps) {
  const isFull = variant === 'full';
  const featured = mediaShows.flatMap((show) =>
    show.episodes.filter((episode) => episode.featured).map((episode) => ({ show, episode }))
  );

  return (
    <section id="media-section" className="py-20 md:py-28 bg-[#FDF6E6] border-b border-[#F0DFA0]/70">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF0] border border-[#F0DFA0] text-[#B5762A] text-sm font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{mediaIntro.label}</span>
          </div>
          {isFull ? (
            <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#3A2A18] font-serif leading-snug">
              {mediaIntro.heading}
            </h1>
          ) : (
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#3A2A18] font-serif leading-snug">
              {mediaIntro.heading}
            </h2>
          )}
          <p className="text-base text-[#6A5642] leading-relaxed max-w-2xl mx-auto">{mediaIntro.description}</p>
        </div>

        {/* Publications */}
        <div className="mb-16">
          <div className="mb-8 pb-3 border-b border-[#F0DFA0]">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#3A2A18] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#B5762A]" />
              <span>出版品</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {mediaPublications.map((pub) => {
              const external = pub.link?.href.startsWith('http');
              return (
                <div
                  key={pub.id}
                  className="brand-card p-6 sm:p-7 flex flex-col justify-between hover:border-[#D89A3E] transition-all"
                >
                  <div>
                    {/* 書封佔位：待客戶提供封面圖後替換（AUD-002 §9） */}
                    <div className="w-full h-40 bg-gradient-to-br from-[#FFFDF0] to-[#FBF1DD] rounded-[18px] border border-[#F0DFA0] shadow-sm mb-6 p-5 flex flex-col justify-between">
                      <span className="self-start text-sm font-bold text-[#8A5415] bg-[#FFFDF0] px-2.5 py-0.5 rounded-full border border-[#F0DFA0]">
                        {pub.role}
                      </span>
                      <h4 className="my-auto text-center font-serif font-bold text-base sm:text-lg text-[#3A2A18]">
                        《{pub.title}》
                      </h4>
                    </div>
                    <p className="text-base text-[#6A5642] leading-relaxed mb-3">{pub.description}</p>
                    {pub.note && <p className="text-sm text-[#B5762A] font-semibold mb-3">{pub.note}</p>}
                  </div>

                  {pub.link && (
                    <a
                      href={pub.link.href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="border-t border-[#F0DFA0]/60 pt-3 flex items-center gap-1 text-base text-[#8A5415] hover:text-[#3A2409] font-semibold"
                    >
                      <span>{pub.link.label}</span>
                      {external && <ExternalLink className="w-3 h-3" />}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Podcasts & interviews */}
        <div id="media-podcasts" className="mb-14 scroll-mt-24">
          <div className="mb-8 pb-3 border-b border-[#F0DFA0]">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#3A2A18] flex items-center gap-2">
              <Headphones className="w-5 h-5 text-[#B5762A]" />
              <span>{isFull ? 'Podcast 與直播訪談' : 'Podcast 精選訪談'}</span>
            </h3>
          </div>

          {isFull ? (
            <div className="space-y-12">
              {mediaShows.map((show) => (
                <div key={show.id}>
                  <h4 className="text-lg font-bold font-serif text-[#3A2A18]">{show.show}</h4>
                  {show.summary && <p className="text-base text-[#6A5642] mt-1">{show.summary}</p>}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
                    {show.episodes.map((episode) => (
                      <EpisodeCard
                        key={episode.title}
                        show={show}
                        episode={episode.group ? { ...episode, note: [episode.group, episode.note].filter(Boolean).join('・') } : episode}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featured.map(({ show, episode }) => (
                  <EpisodeCard key={episode.title} show={show} episode={episode} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href="/media"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFFDF0] hover:bg-white border border-[#F0DFA0] text-[#8A5415] hover:text-[#3A2409] text-base font-semibold transition-colors"
                >
                  <span>閱讀媒體專訪</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Partners */}
        <div className="bg-[#FFFDF0] rounded-2xl p-6 sm:p-8 text-center border border-[#F0DFA0]/80">
          <span className="text-sm font-bold tracking-widest text-[#8A5415] block mb-5">
            官方授權認證資歷與合作機構
          </span>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {mediaPartners.map((partner) => (
              <div key={partner} className="bg-[#FDF6E6] rounded-xl border border-[#F0DFA0] px-4 py-2 text-sm font-semibold text-[#3A2A18] shadow-xs">
                {partner}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
