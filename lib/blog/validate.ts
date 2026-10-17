import type { JSONContent } from '@tiptap/core';
import { isValidYoutubeUrl } from '@tiptap/extension-youtube';
import type { BlogPostInput } from './types';

// 後台送來的文章內容在伺服器端驗證與清理（PRD-005 §3.4）。
// 文件只保留 blogExtensions 認得的節點與標記；連結、圖片、YouTube 網址走白名單。

const NODE_TYPES = new Set([
  'doc', 'paragraph', 'text', 'heading', 'bulletList', 'orderedList', 'listItem',
  'blockquote', 'horizontalRule', 'hardBreak', 'image', 'youtube',
]);
const MARK_TYPES = new Set(['bold', 'italic', 'underline', 'strike', 'link']);

export const IMAGE_SRC = /^\/api\/blog\/images\/[a-f0-9]{24}$/;
export const OBJECT_ID = /^[a-f0-9]{24}$/;

export function isSafeHref(href: unknown): href is string {
  if (typeof href !== 'string' || href.length > 2000) return false;
  const value = href.trim();
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  if (value.startsWith('#')) return true;
  return /^(https?:|mailto:|tel:)/i.test(value);
}

const clip = (value: unknown, max: number) => (typeof value === 'string' ? value.slice(0, max) : undefined);

function cleanNode(node: JSONContent): JSONContent | null {
  if (!node || typeof node !== 'object' || !NODE_TYPES.has(node.type ?? '')) return null;
  const out: JSONContent = { type: node.type };

  if (node.type === 'text') {
    if (typeof node.text !== 'string' || node.text.length === 0) return null;
    out.text = node.text;
    const marks = (node.marks ?? []).flatMap((mark) => {
      if (!MARK_TYPES.has(mark?.type ?? '')) return [];
      if (mark.type !== 'link') return [{ type: mark.type }];
      return isSafeHref(mark.attrs?.href) ? [{ type: 'link', attrs: { href: mark.attrs.href.trim() } }] : [];
    });
    if (marks.length) out.marks = marks;
    return out;
  }

  switch (node.type) {
    case 'heading': {
      const level = node.attrs?.level === 3 ? 3 : 2;
      out.attrs = { level };
      break;
    }
    case 'orderedList': {
      const start = Number(node.attrs?.start);
      out.attrs = { start: Number.isInteger(start) && start > 0 ? start : 1 };
      break;
    }
    case 'image': {
      if (typeof node.attrs?.src !== 'string' || !IMAGE_SRC.test(node.attrs.src)) return null;
      out.attrs = { src: node.attrs.src, alt: clip(node.attrs.alt, 200) ?? '', title: clip(node.attrs.title, 200) ?? null };
      return out;
    }
    case 'youtube': {
      const src = node.attrs?.src;
      if (typeof src !== 'string' || !isValidYoutubeUrl(src)) return null;
      const start = Number(node.attrs?.start);
      out.attrs = { src, start: Number.isInteger(start) && start > 0 ? start : 0 };
      return out;
    }
  }

  if (Array.isArray(node.content)) {
    const content = node.content.map(cleanNode).filter((child): child is JSONContent => child !== null);
    if (content.length) out.content = content;
  }
  return out;
}

export function cleanDoc(doc: unknown): JSONContent {
  const cleaned = cleanNode(doc as JSONContent);
  if (!cleaned || cleaned.type !== 'doc') return { type: 'doc', content: [{ type: 'paragraph' }] };
  if (!cleaned.content?.length) cleaned.content = [{ type: 'paragraph' }];
  return cleaned;
}

/** 網址用的代稱：保留中英文與數字，空白換成連字號；全部被清掉時用時間戳記 */
export function slugify(value: string) {
  const slug = value
    .normalize('NFKC')
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
  return slug || `post-${Date.now().toString(36)}`;
}

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export function parsePostInput(body: unknown): Result<BlogPostInput> {
  if (!body || typeof body !== 'object') return { ok: false, error: '資料格式錯誤' };
  const raw = body as Record<string, unknown>;

  const title = typeof raw.title === 'string' ? raw.title.trim() : '';
  if (!title) return { ok: false, error: '請填寫標題' };
  if (title.length > 120) return { ok: false, error: '標題最多 120 字' };

  const summary = typeof raw.summary === 'string' ? raw.summary.trim() : '';
  if (summary.length > 300) return { ok: false, error: '摘要最多 300 字' };

  const category = typeof raw.category === 'string' ? raw.category.trim().slice(0, 30) : '';
  const tags = Array.isArray(raw.tags)
    ? [...new Set(raw.tags.filter((tag): tag is string => typeof tag === 'string').map((tag) => tag.trim().slice(0, 30)).filter(Boolean))].slice(0, 20)
    : [];

  const coverImageId = typeof raw.coverImageId === 'string' && OBJECT_ID.test(raw.coverImageId) ? raw.coverImageId : null;
  const status = raw.status === 'published' ? 'published' : 'draft';

  const publishedAt = typeof raw.publishedAt === 'string' ? raw.publishedAt.trim() : '';
  if (publishedAt && (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt) || Number.isNaN(Date.parse(publishedAt)))) {
    return { ok: false, error: '發布日期格式應為 YYYY-MM-DD' };
  }

  const slugSource = typeof raw.slug === 'string' && raw.slug.trim() ? raw.slug : title;

  return {
    ok: true,
    value: {
      title,
      slug: slugify(slugSource),
      summary,
      category,
      tags,
      coverImageId,
      content: cleanDoc(raw.content),
      status,
      publishedAt,
    },
  };
}
