'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { JSONContent } from '@tiptap/core';
import { ArrowLeft, ExternalLink, ImagePlus, Loader2, Trash2, X } from 'lucide-react';
import { formatDate, imageUrl, type BlogPostDetail, type PostStatus } from '../../../lib/blog/types';
import BlogEditor from './BlogEditor';
import { StatusBadge } from './PostTable';
import { adminCard, adminInput, adminLabel } from './styles';
import { uploadImage } from './uploadImage';

// 後台：新增／編輯文章（PRD-005 §2 #2）。左邊是標題與內文，右邊是發布設定與文章資訊。
// ⌘S／Ctrl+S 以目前狀態儲存；有未儲存的變更時離開頁面會提醒。

interface PostFormProps {
  post?: BlogPostDetail;
  categories: string[];
}

export default function PostForm({ post, categories }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? '');
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [summary, setSummary] = useState(post?.summary ?? '');
  const [category, setCategory] = useState(post?.category ?? '');
  const [tags, setTags] = useState(post?.tags.join('、') ?? '');
  const [coverImageId, setCoverImageId] = useState<string | null>(post?.coverImageId ?? null);
  const [publishedAt, setPublishedAt] = useState(formatDate(post?.publishedAt ?? null));
  const [status, setStatus] = useState<PostStatus>(post?.status ?? 'draft');
  const content = useRef<JSONContent | null>(post?.content ?? null);

  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState<PostStatus | null>(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  const touch = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setDirty(true);
  };

  const save = useCallback(
    async (nextStatus: PostStatus) => {
      setSaving(nextStatus);
      setMessage(null);
      const body = {
        title,
        slug,
        summary,
        category,
        tags: tags.split(/[,，、]/).map((tag) => tag.trim()).filter(Boolean),
        coverImageId,
        publishedAt,
        status: nextStatus,
        content: content.current ?? { type: 'doc', content: [] },
      };
      const response = await fetch(post ? `/api/admin/posts/${post.id}` : '/api/admin/posts', {
        method: post ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).catch(() => null);
      const data = await response?.json().catch(() => null);
      setSaving(null);

      if (!response?.ok || !data?.post) {
        setMessage({ kind: 'error', text: data?.error ?? '儲存失敗，請稍後再試' });
        return;
      }
      const saved = data.post as BlogPostDetail;
      setDirty(false);
      setStatus(saved.status);
      setSlug(saved.slug);
      setPublishedAt(formatDate(saved.publishedAt));
      setMessage({ kind: 'ok', text: saved.status === 'published' ? '已儲存並發布' : '已儲存草稿' });
      if (!post) {
        router.replace(`/admin/blog/${saved.id}`);
      } else {
        router.refresh();
      }
    },
    [title, slug, summary, category, tags, coverImageId, publishedAt, post, router],
  );

  // 未儲存就離開時提醒
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  // ⌘S／Ctrl+S
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        if (!saving) void save(status);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [save, saving, status]);

  async function onCoverPicked(file: File | undefined) {
    if (!file) return;
    setCoverUploading(true);
    setMessage(null);
    try {
      const { id } = await uploadImage(file);
      setCoverImageId(id);
      setDirty(true);
    } catch (error) {
      setMessage({ kind: 'error', text: error instanceof Error ? error.message : '封面上傳失敗' });
    } finally {
      setCoverUploading(false);
    }
  }

  async function remove() {
    if (!post || !window.confirm(`確定刪除「${post.title}」？\n文章與只屬於這篇的圖片都會刪除，無法復原。`)) return;
    const response = await fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' }).catch(() => null);
    if (response?.ok) {
      setDirty(false);
      router.replace('/admin/blog');
      router.refresh();
    } else {
      setMessage({ kind: 'error', text: '刪除失敗' });
    }
  }

  const publicHref = post && status === 'published' ? `/blog/${encodeURIComponent(slug)}` : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/blog" className="btn-text text-sm">
          <ArrowLeft className="size-4" aria-hidden="true" />
          文章列表
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <StatusBadge status={status} />
          {dirty && <span>有未儲存的變更</span>}
        </div>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex min-w-0 flex-col gap-4">
          <label className="sr-only" htmlFor="post-title">
            標題
          </label>
          <input
            id="post-title"
            value={title}
            onChange={(event) => touch(setTitle)(event.target.value)}
            placeholder="文章標題"
            maxLength={120}
            className="w-full rounded-[18px] border border-border bg-stage px-5 py-4 font-serif text-2xl font-bold text-card-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none sm:px-8 sm:text-3xl"
          />
          <BlogEditor
            initialContent={post?.content ?? null}
            onChange={(json) => {
              content.current = json;
              setDirty(true);
            }}
          />
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
          <section className={`${adminCard} flex flex-col gap-3 p-4`}>
            {message && (
              <p role={message.kind === 'error' ? 'alert' : 'status'} className={message.kind === 'error' ? 'text-sm text-destructive' : 'text-sm text-accent-foreground'}>
                {message.text}
              </p>
            )}
            <button type="button" disabled={saving !== null} onClick={() => save('published')} className="gold-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-bold disabled:opacity-60">
              {saving === 'published' && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {status === 'published' ? '更新已發布文章' : '發布'}
            </button>
            <button type="button" disabled={saving !== null} onClick={() => save('draft')} className="btn-outline disabled:opacity-60">
              {saving === 'draft' && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {status === 'published' ? '改回草稿' : '儲存草稿'}
            </button>
            <div className="flex items-center justify-between">
              {publicHref ? (
                <a href={publicHref} target="_blank" rel="noopener noreferrer" className="btn-text text-sm">
                  查看前台
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              ) : (
                <span />
              )}
              {post && (
                <button type="button" onClick={remove} className="btn-text text-sm !text-destructive">
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  刪除
                </button>
              )}
            </div>
          </section>

          <section className={`${adminCard} flex flex-col gap-4 p-4`}>
            <div>
              <span className={adminLabel}>封面圖片</span>
              {coverImageId ? (
                <div className="relative mt-2 overflow-hidden rounded-xl border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element -- 後台預覽，不需要最佳化 */}
                  <img src={imageUrl(coverImageId)} alt="" className="aspect-[16/9] w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => touch(setCoverImageId)(null)}
                    className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full bg-inverse/80 text-inverse-foreground"
                    aria-label="移除封面"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={coverUploading}
                  onClick={() => coverInput.current?.click()}
                  className="mt-2 flex aspect-[16/9] w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-popover text-sm text-muted-foreground hover:border-ring"
                >
                  {coverUploading ? <Loader2 className="size-5 animate-spin" aria-hidden="true" /> : <ImagePlus className="size-5" aria-hidden="true" />}
                  上傳封面
                </button>
              )}
              <input ref={coverInput} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={(event) => { void onCoverPicked(event.target.files?.[0]); event.target.value = ''; }} />
            </div>

            <div>
              <label className={adminLabel} htmlFor="post-summary">
                摘要
              </label>
              <textarea id="post-summary" rows={4} maxLength={300} value={summary} onChange={(event) => touch(setSummary)(event.target.value)} className={`${adminInput} mt-2 resize-y`} />
              <p className="mt-1 text-right text-xs tabular-nums text-muted-foreground">{summary.length}/300</p>
            </div>

            <div>
              <label className={adminLabel} htmlFor="post-category">
                分類
              </label>
              <input id="post-category" list="post-categories" value={category} onChange={(event) => touch(setCategory)(event.target.value)} maxLength={30} className={`${adminInput} mt-2`} />
              <datalist id="post-categories">
                {categories.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>

            <div>
              <label className={adminLabel} htmlFor="post-tags">
                標籤
              </label>
              <input id="post-tags" value={tags} onChange={(event) => touch(setTags)(event.target.value)} placeholder="用頓號或逗號分隔" className={`${adminInput} mt-2`} />
            </div>

            <div>
              <label className={adminLabel} htmlFor="post-slug">
                網址代稱
              </label>
              <input id="post-slug" value={slug} onChange={(event) => touch(setSlug)(event.target.value)} placeholder="留空會用標題產生" className={`${adminInput} mt-2`} />
              <p className="mt-1 break-all text-xs text-muted-foreground">/blog/{slug || '…'}</p>
            </div>

            <div>
              <label className={adminLabel} htmlFor="post-date">
                發布日期
              </label>
              <input id="post-date" type="date" value={publishedAt} onChange={(event) => touch(setPublishedAt)(event.target.value)} className={`${adminInput} mt-2`} />
              <p className="mt-1 text-xs text-muted-foreground">留空時，第一次發布會用當天日期</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
