import 'server-only';
import type { JSONContent } from '@tiptap/core';
import { generateHTML } from '@tiptap/html';
import { blogExtensions } from './extensions';
import { IMAGE_SRC } from './validate';

// 文章 JSON → 前台輸出的 HTML（PRD-005 §3.3）。只在伺服器端、儲存時執行一次；
// 傳進來的 JSON 必須先經過 validate.ts 的 cleanDoc。
export function renderPostHtml(doc: JSONContent) {
  return generateHTML(doc, blogExtensions);
}

function walk(node: JSONContent, visit: (node: JSONContent) => void) {
  visit(node);
  node.content?.forEach((child) => walk(child, visit));
}

/** 依字數估算閱讀時間：中文每分鐘約 400 字，至少 1 分鐘 */
export function estimateReadMinutes(doc: JSONContent) {
  let chars = 0;
  walk(doc, (node) => {
    if (node.type === 'text' && node.text) chars += node.text.replace(/\s+/g, '').length;
  });
  return Math.max(1, Math.round(chars / 400));
}

/** 文章用到的 GridFS 圖片 id（內文圖片＋封面），刪除文章時用來清圖 */
export function collectImageIds(doc: JSONContent, coverImageId: string | null) {
  const ids = new Set<string>();
  if (coverImageId) ids.add(coverImageId);
  walk(doc, (node) => {
    const src = node.type === 'image' ? node.attrs?.src : null;
    if (typeof src === 'string' && IMAGE_SRC.test(src)) ids.add(src.slice(src.lastIndexOf('/') + 1));
  });
  return [...ids];
}
