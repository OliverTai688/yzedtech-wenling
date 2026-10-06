import PageHero from './page/PageHero';
import BlogPosts from './blog/BlogPosts';
import { SHOW_BLOG_POSTS, blogPosts, pagesContent } from '../data';

// 好運blog（PLN-006 P4；提案見 docs/06_research-and-design/proposals/pages-v2/blog）。
// 現有的 6 篇文章不在文案集（docx）裡，依「全站文字只能出自 docx」的規定不顯示：SHOW_BLOG_POSTS 為 false 時
// 只有頁名（文案集的「好運blog」），不放分類、文章，也不寫「尚無文章」之類的說明。
// 「下一站」與結尾的行動區塊在 app/blog/page.tsx，所以這一頁不是死路。
// 這是伺服器元件：開關關閉時，文章的文字不進 HTML；打開後文章區見 blog/BlogPosts.tsx。
export default function BlogSection() {
  return (
    <>
      <PageHero title={pagesContent.blog.title} />
      {SHOW_BLOG_POSTS && <BlogPosts posts={[...blogPosts].sort((a, b) => b.date.localeCompare(a.date))} />}
    </>
  );
}
