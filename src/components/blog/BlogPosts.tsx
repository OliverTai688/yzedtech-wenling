'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageSection from '../page/PageSection';
import PostMeta from './PostMeta';
import { cardClass } from '../PageHeader';
import { pagesContent } from '../../data';
import { imageUrl, type BlogPostSummary } from '../../../lib/blog/types';

// 好運blog 的文章區（PLN-006 P4；PRD-005 §3.5）。文章由伺服器從 MongoDB 讀出、依發布日期排好後傳進來。
// - 分類篩選（.chip）；最新一篇露出封面與摘要，其餘只列標題；點了前往 /blog/[slug] 閱讀全文。
// - allLabel、readLabel 不是文案集的字，上線前要和客戶確認（見 pagesContent.blog 的註解）。
const labels = pagesContent.blog;
const ALL = 'all';

const postHref = (post: BlogPostSummary) => `/blog/${encodeURIComponent(post.slug)}`;

export default function BlogPosts({ posts }: { posts: BlogPostSummary[] }) {
  const [category, setCategory] = useState(ALL);
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))];
  const [featured, ...rest] = posts.filter((post) => category === ALL || post.category === category);

  return (
    <PageSection id="blog-posts" width="narrow">
      {categories.length > 1 && (
        <div role="group" aria-label={labels.title} className="flex gap-2 overflow-x-auto py-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {[ALL, ...categories].map((id) => (
            <button key={id} type="button" aria-pressed={category === id} onClick={() => setCategory(id)} className="chip shrink-0 text-base">
              {id === ALL ? labels.allLabel : id}
            </button>
          ))}
        </div>
      )}

      {featured && (
        <article className={`${cardClass} mt-6 overflow-hidden`}>
          {featured.coverImageId && (
            <Link href={postHref(featured)} className="relative block aspect-[16/9] bg-muted" tabIndex={-1} aria-hidden="true">
              <Image src={imageUrl(featured.coverImageId)} alt="" fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
            </Link>
          )}
          <div className="flex flex-col items-start p-6">
            <PostMeta post={featured} />
            <h2 className="mt-3 font-serif text-xl font-bold leading-snug text-card-foreground">
              <Link href={postHref(featured)} className="hover:underline">
                {featured.title}
              </Link>
            </h2>
            {featured.summary && <p className="mt-2 text-base leading-relaxed text-muted-foreground">{featured.summary}</p>}
            <Link href={postHref(featured)} className="btn-text mt-2 text-base">
              {labels.readLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <ul className="mt-6 divide-y divide-border/70 border-y border-border/70">
          {rest.map((post) => (
            <li key={post.id}>
              <Link href={postHref(post)} className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left">
                <span className="grid gap-1">
                  <PostMeta post={post} />
                  <span className="font-serif text-lg font-bold leading-snug text-card-foreground">{post.title}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-ring" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
