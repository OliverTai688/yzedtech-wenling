'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Eye, EyeOff, Pencil, Search, Trash2 } from 'lucide-react';
import { formatDate, type BlogPostSummary } from '../../../lib/blog/types';
import { adminCard, adminInput } from './styles';

// 後台文章列表：搜尋、依狀態篩選、快速發布／下架、刪除（PRD-005 §2 #2）。
const FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'published', label: '已發布' },
  { id: 'draft', label: '草稿' },
] as const;

type Filter = (typeof FILTERS)[number]['id'];

export function StatusBadge({ status }: { status: BlogPostSummary['status'] }) {
  return status === 'published' ? (
    <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-accent-foreground">已發布</span>
  ) : (
    <span className="inline-flex items-center rounded-full border border-border bg-popover px-2.5 py-0.5 text-xs font-bold text-muted-foreground">草稿</span>
  );
}

export default function PostTable({ initialPosts }: { initialPosts: BlogPostSummary[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (post) =>
        (filter === 'all' || post.status === filter) &&
        (!q || [post.title, post.category, post.slug, ...post.tags].some((text) => text.toLowerCase().includes(q))),
    );
  }, [posts, filter, query]);

  async function toggleStatus(post: BlogPostSummary) {
    setBusyId(post.id);
    setError('');
    const status = post.status === 'published' ? 'draft' : 'published';
    const response = await fetch(`/api/admin/posts/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => null);
    const data = await response?.json().catch(() => null);
    if (response?.ok && data?.post) {
      setPosts((current) => current.map((item) => (item.id === post.id ? data.post : item)));
    } else {
      setError(data?.error ?? '更新失敗');
    }
    setBusyId(null);
  }

  async function remove(post: BlogPostSummary) {
    if (!window.confirm(`確定刪除「${post.title}」？\n文章與只屬於這篇的圖片都會刪除，無法復原。`)) return;
    setBusyId(post.id);
    setError('');
    const response = await fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' }).catch(() => null);
    if (response?.ok) {
      setPosts((current) => current.filter((item) => item.id !== post.id));
    } else {
      const data = await response?.json().catch(() => null);
      setError(data?.error ?? '刪除失敗');
    }
    setBusyId(null);
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="狀態" className="flex gap-2">
          {FILTERS.map((item) => (
            <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)} className="chip text-sm">
              {item.label}
              <span className="ml-1 tabular-nums opacity-70">
                {item.id === 'all' ? posts.length : posts.filter((post) => post.status === item.id).length}
              </span>
            </button>
          ))}
        </div>
        <label className="relative sm:w-72">
          <span className="sr-only">搜尋</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋標題、分類、標籤" className={`${adminInput} pl-9`} />
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}

      {visible.length === 0 ? (
        <div className={`${adminCard} mt-6 p-10 text-center text-muted-foreground`}>
          {posts.length === 0 ? '還沒有文章，按「新增文章」開始寫第一篇。' : '沒有符合條件的文章。'}
        </div>
      ) : (
        <ul className={`${adminCard} mt-6 divide-y divide-border/70 overflow-hidden`}>
          {visible.map((post) => (
            <li key={post.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <StatusBadge status={post.status} />
                  {post.category && <span className="font-semibold text-accent-foreground">{post.category}</span>}
                  <span>{post.status === 'published' ? `發布 ${formatDate(post.publishedAt)}` : `更新 ${formatDate(post.updatedAt)}`}</span>
                </div>
                <Link href={`/admin/blog/${post.id}`} className="mt-1 block truncate font-serif text-lg font-bold text-card-foreground hover:underline">
                  {post.title}
                </Link>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Link href={`/admin/blog/${post.id}`} className="icon-btn" aria-label="編輯" title="編輯">
                  <Pencil className="size-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className="icon-btn disabled:opacity-50"
                  disabled={busyId === post.id}
                  onClick={() => toggleStatus(post)}
                  aria-label={post.status === 'published' ? '取消發布' : '發布'}
                  title={post.status === 'published' ? '取消發布' : '發布'}
                >
                  {post.status === 'published' ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                </button>
                {post.status === 'published' && (
                  <a href={`/blog/${encodeURIComponent(post.slug)}`} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="查看前台" title="查看前台">
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                )}
                <button
                  type="button"
                  className="icon-btn text-destructive disabled:opacity-50"
                  disabled={busyId === post.id}
                  onClick={() => remove(post)}
                  aria-label="刪除"
                  title="刪除"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
