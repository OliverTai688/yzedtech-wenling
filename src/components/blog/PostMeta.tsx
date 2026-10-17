import { CalendarDays, Clock } from 'lucide-react';
import { formatDate, type BlogPostSummary } from '../../../lib/blog/types';

// 文章的分類、發布日期、閱讀時間。日期與時間用數字＋圖示；「分鐘」沿用文案集裡的單位寫法。
export default function PostMeta({ post, className = '' }: { post: BlogPostSummary; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground ${className}`}>
      {post.category && <span className="font-semibold text-accent-foreground">{post.category}</span>}
      {post.publishedAt && (
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </span>
      )}
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3.5" aria-hidden="true" />
        {post.readMinutes} 分鐘
      </span>
    </p>
  );
}
