import PageHero from './page/PageHero';
import BlogPosts from './blog/BlogPosts';
import { pagesContent } from '../data';
import { listPublishedPosts } from '../../lib/blog/repo';

// 好運blog（PLN-006 P4；PRD-005 §3.5）。文章由學苑在後台（/admin/blog）撰寫並發布，存在 MongoDB。
// 沒有已發布的文章（或沒有設定資料庫）時只有頁名（文案集的「好運blog」），不寫「尚無文章」之類的說明。
// 「下一站」與結尾的行動區塊在 app/blog/page.tsx，所以這一頁不是死路。
export default async function BlogSection() {
  const posts = await listPublishedPosts();
  return (
    <>
      <PageHero title={pagesContent.blog.title} />
      {posts.length > 0 && <BlogPosts posts={posts} />}
    </>
  );
}
