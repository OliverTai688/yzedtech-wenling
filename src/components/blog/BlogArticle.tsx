import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import PostMeta from './PostMeta';
import { narrowWidth } from '../PageHeader';
import { pagesContent, siteLinks, uiLabels } from '../../data';
import { imageUrl, type BlogPostDetail } from '../../../lib/blog/types';

// 好運blog 的文章頁（PRD-005 §3.5）。標題、摘要、內文都是學苑在後台寫的；介面字只沿用既有字串
// （「好運blog」頁名、uiLabels 的兩個行動）。內文 HTML 由伺服器在儲存時從編輯器 JSON 產生並清理過
// （lib/blog/validate.ts、render.ts），樣式 .blog-prose 與後台編輯器共用。
export default function BlogArticle({ post }: { post: BlogPostDetail }) {
  return (
    <article>
      <header className="relative isolate overflow-hidden border-b border-border/60 bg-stage">
        <div aria-hidden="true" className="page-halo -z-10" />
        <div className={`${narrowWidth} pb-8 pt-6 lg:pb-10 lg:pt-8`}>
          <Link href="/blog" className="btn-text text-sm">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {pagesContent.blog.title}
          </Link>
          <PostMeta post={post} className="mt-4" />
          <h1 className="mt-3 text-balance font-serif text-[28px] font-bold leading-snug text-card-foreground md:text-[36px]">{post.title}</h1>
          {post.summary && <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">{post.summary}</p>}
        </div>
      </header>

      <div className={`${narrowWidth} py-8 lg:py-12`}>
        {post.coverImageId && (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[18px] border border-border bg-muted">
            <Image src={imageUrl(post.coverImageId)} alt="" fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
          </div>
        )}

        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

        {post.tags.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-border bg-popover px-3 py-1 text-sm text-accent-foreground">
                #{tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex flex-col items-start border-t border-border/70 pt-4">
          <Link href="/#personas-section" className="btn-text text-base">
            {uiLabels.needs}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="btn-text text-base">
            {uiLabels.line}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
