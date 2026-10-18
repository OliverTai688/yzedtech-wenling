import 'server-only';
import { revalidatePath } from 'next/cache';

// 後台儲存、發布、刪除後更新前台的快取（PRD-005 §2 #7）。
// 文章頁用路由樣式一次更新全部，避免中文 slug 的編碼差異漏掉某一頁。
export function revalidateBlog() {
  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
}
