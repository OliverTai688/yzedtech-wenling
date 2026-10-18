import 'server-only';
import { ObjectId, type Collection, type Filter, type WithId } from 'mongodb';
import type { JSONContent } from '@tiptap/core';
import { getDb, getImageBucket, isDbConfigured } from '../db/mongo';
import { collectImageIds, estimateReadMinutes, renderPostHtml } from './render';
import { OBJECT_ID } from './validate';
import type { BlogPostDetail, BlogPostInput, BlogPostSummary, PostStatus } from './types';

// 部落格文章的資料存取（PRD-005 §3.3）。前台只用 listPublishedPosts／getPublishedPostBySlug，
// 讀取失敗時回傳空結果而不是讓頁面壞掉；後台的函式失敗就丟出錯誤，由 API 回應 500。

interface PostDoc {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  coverImageId: string | null;
  content: JSONContent;
  html: string;
  readMinutes: number;
  /** 內文與封面用到的圖片，刪除文章時用來判斷哪些圖可以一起刪 */
  imageIds: string[];
  status: PostStatus;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const globalForIndexes = globalThis as typeof globalThis & { _blogIndexes?: Promise<unknown> };

async function posts(): Promise<Collection<PostDoc>> {
  const collection = (await getDb()).collection<PostDoc>('blogPosts');
  globalForIndexes._blogIndexes ??= collection
    .createIndexes([
      { key: { slug: 1 }, unique: true },
      { key: { status: 1, publishedAt: -1 } },
      { key: { imageIds: 1 } },
    ])
    .catch((error) => {
      globalForIndexes._blogIndexes = undefined;
      throw error;
    });
  await globalForIndexes._blogIndexes;
  return collection;
}

const summaryProjection = { content: 0, html: 0, imageIds: 0 } as const;

function toSummary(doc: WithId<Omit<PostDoc, 'content' | 'html' | 'imageIds'>>): BlogPostSummary {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    title: doc.title,
    summary: doc.summary,
    category: doc.category,
    tags: doc.tags ?? [],
    coverImageId: doc.coverImageId ?? null,
    readMinutes: doc.readMinutes,
    status: doc.status,
    publishedAt: doc.publishedAt ? doc.publishedAt.toISOString() : null,
    updatedAt: doc.updatedAt.toISOString(),
  };
}

function toDetail(doc: WithId<PostDoc>): BlogPostDetail {
  return { ...toSummary(doc), content: doc.content, html: doc.html };
}

// ── 前台 ────────────────────────────────────────────────────────────────

export async function listPublishedPosts(): Promise<BlogPostSummary[]> {
  if (!isDbConfigured()) return [];
  try {
    const docs = await (await posts())
      .find({ status: 'published' }, { projection: summaryProjection })
      .sort({ publishedAt: -1 })
      .toArray();
    return docs.map(toSummary);
  } catch (error) {
    console.error('[blog] listPublishedPosts failed', error);
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  if (!isDbConfigured()) return null;
  try {
    const doc = await (await posts()).findOne({ slug, status: 'published' });
    return doc ? toDetail(doc) : null;
  } catch (error) {
    console.error('[blog] getPublishedPostBySlug failed', error);
    return null;
  }
}

// ── 後台 ────────────────────────────────────────────────────────────────

export async function listAllPosts(): Promise<BlogPostSummary[]> {
  const docs = await (await posts()).find({}, { projection: summaryProjection }).sort({ updatedAt: -1 }).toArray();
  return docs.map(toSummary);
}

export async function listCategories(): Promise<string[]> {
  const values = await (await posts()).distinct('category');
  return values.filter(Boolean).sort();
}

export async function getPostById(id: string): Promise<BlogPostDetail | null> {
  if (!OBJECT_ID.test(id)) return null;
  const doc = await (await posts()).findOne({ _id: new ObjectId(id) });
  return doc ? toDetail(doc) : null;
}

/** slug 已被其他文章用掉時，加上 -2、-3… */
async function uniqueSlug(base: string, excludeId?: ObjectId) {
  const collection = await posts();
  for (let n = 1; n < 100; n += 1) {
    const candidate = n === 1 ? base : `${base}-${n}`;
    const filter: Filter<PostDoc> = { slug: candidate };
    if (excludeId) filter._id = { $ne: excludeId };
    if (!(await collection.countDocuments(filter, { limit: 1 }))) return candidate;
  }
  return `${base}-${Date.now().toString(36)}`;
}

// 日期以台灣時間的當天 00:00 儲存
const dateFromInput = (value: string) => new Date(`${value}T00:00:00+08:00`);

function buildFields(input: BlogPostInput, previousPublishedAt: Date | null) {
  let publishedAt = input.publishedAt ? dateFromInput(input.publishedAt) : previousPublishedAt;
  if (input.status === 'published' && !publishedAt) publishedAt = new Date();
  return {
    title: input.title,
    summary: input.summary,
    category: input.category,
    tags: input.tags,
    coverImageId: input.coverImageId,
    content: input.content,
    html: renderPostHtml(input.content),
    readMinutes: estimateReadMinutes(input.content),
    imageIds: collectImageIds(input.content, input.coverImageId),
    status: input.status,
    publishedAt,
  };
}

export async function createPost(input: BlogPostInput): Promise<BlogPostDetail> {
  const now = new Date();
  const doc: PostDoc = {
    ...buildFields(input, null),
    slug: await uniqueSlug(input.slug!),
    createdAt: now,
    updatedAt: now,
  };
  const { insertedId } = await (await posts()).insertOne(doc);
  return toDetail({ ...doc, _id: insertedId });
}

export async function updatePost(id: string, input: BlogPostInput): Promise<{ before: BlogPostDetail; after: BlogPostDetail } | null> {
  if (!OBJECT_ID.test(id)) return null;
  const _id = new ObjectId(id);
  const collection = await posts();
  const existing = await collection.findOne({ _id });
  if (!existing) return null;

  const update = {
    ...buildFields(input, existing.publishedAt),
    slug: input.slug === existing.slug ? existing.slug : await uniqueSlug(input.slug!, _id),
    updatedAt: new Date(),
  };
  const after = await collection.findOneAndUpdate({ _id }, { $set: update }, { returnDocument: 'after' });
  if (!after) return null;
  await deleteUnusedImages(existing.imageIds.filter((imageId) => !update.imageIds.includes(imageId)), _id);
  return { before: toDetail(existing), after: toDetail(after) };
}

export async function deletePost(id: string): Promise<BlogPostDetail | null> {
  if (!OBJECT_ID.test(id)) return null;
  const _id = new ObjectId(id);
  const doc = await (await posts()).findOneAndDelete({ _id });
  if (!doc) return null;
  await deleteUnusedImages(doc.imageIds ?? [], _id);
  return toDetail(doc);
}

/** 刪掉沒有被其他文章用到的圖片 */
async function deleteUnusedImages(imageIds: string[], ownerId: ObjectId) {
  if (!imageIds.length) return;
  const collection = await posts();
  const bucket = await getImageBucket();
  for (const imageId of imageIds) {
    if (!OBJECT_ID.test(imageId)) continue;
    const usedElsewhere = await collection.countDocuments({ _id: { $ne: ownerId }, imageIds: imageId }, { limit: 1 });
    if (usedElsewhere) continue;
    await bucket.delete(new ObjectId(imageId)).catch(() => {
      // 圖片已不存在就略過
    });
  }
}

/** 只切換發布狀態（後台列表的快速操作）；第一次發布時寫入當下時間 */
export async function setPostStatus(id: string, status: PostStatus): Promise<BlogPostSummary | null> {
  if (!OBJECT_ID.test(id)) return null;
  const _id = new ObjectId(id);
  const collection = await posts();
  const existing = await collection.findOne({ _id }, { projection: { publishedAt: 1 } });
  if (!existing) return null;
  const publishedAt = existing.publishedAt ?? (status === 'published' ? new Date() : null);
  const after = await collection.findOneAndUpdate(
    { _id },
    { $set: { status, publishedAt, updatedAt: new Date() } },
    { returnDocument: 'after', projection: summaryProjection },
  );
  return after ? toSummary(after) : null;
}
