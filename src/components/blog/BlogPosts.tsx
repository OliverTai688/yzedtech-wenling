'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import PageSection from '../page/PageSection';
import PageSheet from '../page/PageSheet';
import { cardClass } from '../PageHeader';
import { pagesContent, siteLinks, uiLabels } from '../../data';
import type { BlogPost } from '../../types';

// 好運blog 的文章區（PLN-006 P4）。只有 SHOW_BLOG_POSTS 為 true 時才由 BlogSection 載入；
// 文章由伺服器傳進來（posts，已依日期排好），開關關閉時這個檔案與文章的文字都不會送到瀏覽器。
// - 分類篩選（.chip）；最新一篇露出摘要，其餘只列標題；點了用共用的面板（PageSheet）閱讀。
// - allLabel、readLabel 不是文案集的字，上線前要和文章一起確認（見 pagesContent.blog 的註解）。
const labels = pagesContent.blog;
const ALL = 'all';

function Meta({ post }: { post: BlogPost }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
      <span className="font-semibold text-accent-foreground">{post.category}</span>
      <span>{post.date}</span>
      <span>{post.readTime}</span>
    </p>
  );
}

// 面板裡的全文，最後帶回首頁選對象或私訊
function Reader({ post }: { post: BlogPost }) {
  return (
    <>
      <Meta post={post} />
      <div className="whitespace-pre-line text-base leading-relaxed text-foreground">{post.content}</div>
      <div className="mt-2 flex flex-col items-start border-t border-border/70 pt-3">
        <Link href="/#personas-section" className="btn-text text-base">
          {uiLabels.needs}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="btn-text text-base">
          {uiLabels.line}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

export default function BlogPosts({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState(ALL);
  const categories = [...new Set(posts.map((post) => post.category))];
  const [featured, ...rest] = posts.filter((post) => category === ALL || post.category === category);

  return (
    <PageSection id="blog-posts" width="narrow">
      <div role="group" aria-label={labels.title} className="flex gap-2 overflow-x-auto py-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
        {[ALL, ...categories].map((id) => (
          <button key={id} type="button" aria-pressed={category === id} onClick={() => setCategory(id)} className="chip shrink-0 text-base">
            {id === ALL ? labels.allLabel : id}
          </button>
        ))}
      </div>

      {featured && (
        <article className={`${cardClass} mt-6 flex flex-col items-start p-6`}>
          <Meta post={featured} />
          <h2 className="mt-3 font-serif text-xl font-bold leading-snug text-card-foreground">{featured.title}</h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">{featured.summary}</p>
          <PageSheet
            key={featured.id}
            title={featured.title}
            trigger={
              <button type="button" className="btn-text mt-2 text-base">
                {labels.readLabel}
                <Plus className="size-4" aria-hidden="true" />
              </button>
            }
          >
            <Reader post={featured} />
          </PageSheet>
        </article>
      )}

      {rest.length > 0 && (
        <ul className="mt-6 divide-y divide-border/70 border-y border-border/70">
          {rest.map((post) => (
            <li key={post.id}>
              <PageSheet
                title={post.title}
                trigger={
                  <button type="button" className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left">
                    <span className="grid gap-1">
                      <Meta post={post} />
                      <span className="font-serif text-lg font-bold leading-snug text-card-foreground">{post.title}</span>
                    </span>
                    <Plus className="size-4 shrink-0 text-ring" aria-hidden="true" />
                  </button>
                }
              >
                <Reader post={post} />
              </PageSheet>
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
