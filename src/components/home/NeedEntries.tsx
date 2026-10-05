'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Tabs } from 'radix-ui';
import { useReducedMotion, useScroll } from 'motion/react';
import { Heart, Sparkles, Coins, Sprout, ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import WingsCompass from '../brand/WingsCompass';
import { homeContent, needEntries, needEntriesIntro } from '../../data';
import type { NeedEntry } from '../../types';
import { cn } from '@/lib/utils';

// 首頁需求入口（RES-002 §1：以提案 C 的「金翼羅盤＋一次一類」為骨幹）。
// - 四個方向按鈕切換需求，羅盤指針轉向所選的方向；一次只顯示一張卡（BRIEF §4A）。
// - 卡片預設只露出痛點、專屬起點與 CTA；兩則故事收成標題，點開才顯示內文。
// - 雙翼隨區塊捲入視窗而展開（捲動推進），不固定舞台、不鎖捲動。
// - 四張卡的內容都在 HTML 裡，未選中的以 hidden 隱藏。
const icons: Record<NeedEntry['iconName'], typeof Heart> = {
  heart: Heart,
  sparkles: Sparkles,
  coins: Coins,
  sprout: Sprout,
};

export default function NeedEntries() {
  const [active, setActive] = useState(needEntries[0].id);
  const activeIndex = needEntries.findIndex((entry) => entry.id === active);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 30%'] });
  const { needs } = homeContent;

  return (
    <Tabs.Root value={active} onValueChange={setActive} asChild>
      <div ref={ref} className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">

        <div className="lg:col-span-5">
          <p className="eyebrow">{needs.eyebrow}</p>
          <h2 className="mt-3 font-serif text-[26px] font-bold leading-snug text-card-foreground md:text-[32px]">
            {needEntriesIntro.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{needEntriesIntro.description}</p>

          <WingsCompass
            open={reduce ? 1 : scrollYProgress}
            needle={activeIndex * 90}
            activeMark={activeIndex}
            className="mt-10 w-[min(84%,300px)] lg:mt-14 lg:w-[min(100%,400px)]"
          />

          <Tabs.List aria-label={needs.tabsLabel} className="mt-8 grid grid-cols-4 gap-2 lg:mt-12">
            {needEntries.map((entry) => (
              <Tabs.Trigger
                key={entry.id}
                value={entry.id}
                id={`need-tab-${entry.id}`}
                className="min-h-11 rounded-full border border-border bg-popover px-2 text-sm font-bold text-secondary-foreground transition-colors hover:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[state=active]:border-ring data-[state=active]:bg-accent data-[state=active]:text-primary-foreground"
              >
                {entry.shortLabel}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <p className="mt-3 text-center text-sm text-muted-foreground">{needs.tabsLabel}</p>
        </div>

        <div className="lg:col-span-7">
          {needEntries.map((entry) => {
            const Icon = icons[entry.iconName];
            return (
              <Tabs.Content
                key={entry.id}
                value={entry.id}
                forceMount
                id={`need-${entry.id}`}
                className={cn(
                  'rounded-[18px] border border-border bg-card p-6 shadow-[0_4px_20px_rgba(58,42,24,0.05)] sm:p-8',
                  'data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 data-[state=active]:duration-300'
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-popover">
                    <Icon className="size-6 text-ring" />
                  </span>
                  <h3 className="font-serif text-xl font-bold text-card-foreground">{entry.title}</h3>
                </div>

                <blockquote className="mt-5 border-l-[3px] border-[#D89A3E] pl-4 text-base italic leading-relaxed text-foreground">
                  {entry.painPoint}
                </blockquote>

                <div className="mt-6">
                  <p className="text-sm font-bold text-accent-foreground">{needs.storiesLabel}</p>
                  <div className="mt-2 divide-y divide-border/70 border-y border-border/70">
                    {entry.stories.map((story) => (
                      <details key={story.title} name={`stories-${entry.id}`} className="disclosure group">
                        <summary className="flex min-h-11 items-center justify-between gap-3 py-2 text-base font-bold text-card-foreground">
                          <span>{story.title}</span>
                          <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
                        </summary>
                        <p className="pb-4 text-base leading-relaxed text-muted-foreground">{story.text}</p>
                      </details>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-bold text-accent-foreground">{needs.startLabel}</p>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{entry.startingPoint}</p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {entry.ctas.map((cta, idx) => {
                    const className = idx === 0 ? 'gold-btn px-6 text-base font-bold' : 'btn-outline text-base';
                    return cta.external ? (
                      <a key={cta.label} href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
                        <span>{cta.label}</span>
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : (
                      <Link key={cta.label} href={cta.href} className={className}>
                        <span>{cta.label}</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    );
                  })}
                </div>
              </Tabs.Content>
            );
          })}
        </div>

      </div>
    </Tabs.Root>
  );
}
