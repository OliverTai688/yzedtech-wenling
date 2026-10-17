import BlogSection from '../../src/components/BlogSection';
import CtaBand from '../../src/components/CtaBand';
import JourneyNext from '../../src/components/page/JourneyNext';
import { pageMeta } from '../../src/data';

// <title> 與 description 是文案集原文，集中在 src/data.ts 的 pageMeta。
export const metadata = pageMeta.blog;

// 文章來自 MongoDB（PRD-005）。後台儲存時以 revalidatePath 立即更新；每 5 分鐘最多重新產生一次作為保險。
export const revalidate = 300;

export default function Page() {
  return (
    <>
      <BlogSection />
      <JourneyNext route="/blog" />
      <CtaBand />
    </>
  );
}
