import { notFound } from 'next/navigation';
import BlogArticle from '../../../src/components/blog/BlogArticle';
import CtaBand from '../../../src/components/CtaBand';
import JourneyNext from '../../../src/components/page/JourneyNext';
import { offeringMeta, pageMeta } from '../../../src/data';
import { getPublishedPostBySlug } from '../../../lib/blog/repo';

// 好運blog 文章頁（PRD-005 §3.1、§3.5）。第一次被造訪時產生並快取；後台儲存、發布、刪除時
// 由 revalidatePath 更新（lib/blog/revalidate.ts），另外每 5 分鐘最多重新產生一次作為保險。
export const revalidate = 300;

export function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 中文 slug 可能以編碼後的形式傳進來
function decodeSlug(raw: string) {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPublishedPostBySlug(decodeSlug((await params).slug));
  if (!post) return pageMeta.blog;
  return {
    ...offeringMeta(post.title, post.summary || undefined),
    openGraph: { type: 'article', title: post.title, ...(post.summary ? { description: post.summary } : {}), publishedTime: post.publishedAt ?? undefined },
  };
}

export default async function Page({ params }: PageProps) {
  const post = await getPublishedPostBySlug(decodeSlug((await params).slug));
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary || undefined,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: '豐盛之翼學苑' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <BlogArticle post={post} />
      <JourneyNext route="/blog" />
      <CtaBand />
    </>
  );
}
