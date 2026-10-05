'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, X } from 'lucide-react';
import PageHeader, { cardClass, pageShell } from './PageHeader';
import { blogPosts, offeringsContent, pagesContent, siteLinks } from '../data';
import type { BlogPost } from '../types';
import { cn } from '@/lib/utils';

// 部落格列表（PLN-004 D12；定案見 RES-002 §12）：提案 B「一篇主打＋清單」，加提案 A 的分類切換。
// - 只有最新一篇露出完整摘要；其餘只列分類、標題與日期，不並排六段摘要（BRIEF §4A）。
// - 文章內文沿用彈出閱讀的方式；每篇最後導向需求入口與 LINE。
// - 現有 6 篇文章不在文案集裡，去留待客戶確認（RPT-001 C10）。
const categories = ['愛情', '財運', '豐盛靈氣', '事業', '心路歷程', '個案成長'] as const;

function Meta({ post }: { post: BlogPost }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
      <span className="rounded-full bg-accent px-3 py-0.5 font-bold text-accent-foreground">{post.category}</span>
      <span>{post.date}</span>
      <span>{post.readTime}</span>
    </p>
  );
}

export default function BlogSection() {
  const labels = pagesContent.blog;
  const [category, setCategory] = useState<string>('all');
  const [reading, setReading] = useState<BlogPost | null>(null);
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const visible = posts.filter((post) => category === 'all' || post.category === category);
  const [featured, ...rest] = visible;
  const available = categories.filter((c) => posts.some((p) => p.category === c));

  useEffect(() => {
    if (!reading) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setReading(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [reading]);

  const chip = (id: string, label: string) => (
    <button
      key={id}
      type="button"
      aria-pressed={category === id}
      onClick={() => setCategory(id)}
      className={cn(
        'min-h-11 rounded-full border px-5 text-sm font-bold transition-colors',
        category === id ? 'border-ring bg-accent text-primary-foreground' : 'border-border bg-popover text-secondary-foreground hover:border-ring'
      )}
    >
      {label}
    </button>
  );

  return (
    <div className={pageShell} id="blog-section">
      <PageHeader title={labels.title} />

      <div role="group" aria-label={labels.title} className="mt-6 flex flex-wrap gap-2">
        {chip('all', labels.allLabel)}
        {available.map((c) => chip(c, c))}
      </div>

      {featured && (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <article className={`${cardClass} flex flex-col p-6 sm:p-8 lg:col-span-7`}>
            <Meta post={featured} />
            <h2 className="mt-4 font-serif text-xl font-bold leading-snug text-card-foreground md:text-2xl">{featured.title}</h2>
            <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">{featured.summary}</p>
            <button type="button" onClick={() => setReading(featured)} className="gold-btn mt-6 self-start px-6 text-base font-bold">
              {labels.readLabel}
              <ArrowRight className="size-4" />
            </button>
          </article>

          <ul className="divide-y divide-border/70 border-y border-border/70 lg:col-span-5">
            {rest.map((post) => (
              <li key={post.id}>
                <button type="button" onClick={() => setReading(post)} className="group block w-full py-4 text-left">
                  <Meta post={post} />
                  <span className="mt-2 block font-serif text-base font-bold leading-snug text-card-foreground group-hover:underline md:text-lg">{post.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {reading && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-inverse/50 p-0 backdrop-blur-xs sm:items-center sm:p-6" onClick={() => setReading(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-reader-title"
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-[760px] flex-col overflow-hidden rounded-t-[18px] border border-border bg-background shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-300 sm:rounded-[18px]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border/70 px-6 py-4">
              <div>
                <Meta post={reading} />
                <h2 id="blog-reader-title" className="mt-2 font-serif text-xl font-bold leading-snug text-card-foreground md:text-2xl">
                  {reading.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setReading(null)}
                aria-label={labels.closeLabel}
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-popover text-secondary-foreground hover:border-ring"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-6">
              <div className="whitespace-pre-line text-base leading-relaxed text-foreground">{reading.content}</div>
              <div className="mt-8 flex flex-col gap-3 border-t border-border/70 pt-6 sm:flex-row">
                <Link href="/#personas-section" className="gold-btn px-6 text-base font-bold">
                  {offeringsContent.helper.needs}
                  <ArrowRight className="size-4" />
                </Link>
                <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="btn-line px-6 text-base">
                  <MessageCircle className="size-4" />
                  {offeringsContent.helper.line}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
