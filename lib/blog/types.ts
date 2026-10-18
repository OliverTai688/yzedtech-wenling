import type { JSONContent } from '@tiptap/core';

// 部落格文章的型別（PRD-005 §3.3）。資料庫文件、後台 API、前台元件共用。
export type PostStatus = 'draft' | 'published';

/** 前台與後台都會用到的文章欄位（_id 轉成字串、日期轉成 ISO 字串，可以直接傳給 client component） */
export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  coverImageId: string | null;
  readMinutes: number;
  status: PostStatus;
  publishedAt: string | null;
  updatedAt: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: JSONContent;
  html: string;
}

/** 後台表單送出的內容 */
export interface BlogPostInput {
  title: string;
  slug?: string;
  summary: string;
  category: string;
  tags: string[];
  coverImageId: string | null;
  content: JSONContent;
  status: PostStatus;
  /** YYYY-MM-DD；空字串代表第一次發布時用當天 */
  publishedAt?: string;
}

export const imageUrl = (id: string) => `/api/blog/images/${id}`;

/** ISO 日期 → 台灣時間的 YYYY-MM-DD */
export function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Taipei' }).format(new Date(iso));
}
