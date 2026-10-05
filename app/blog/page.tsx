import BlogSection from '../../src/components/BlogSection';
import CtaBand from '../../src/components/CtaBand';

export const metadata = {
  title: '部落格｜豐盛之翼學苑',
  description: '豐盛之翼學苑的文章：愛情、財運、豐盛靈氣、事業、心路歷程與個案成長。',
};

export default function Page() {
  return (
    <>
      <BlogSection />
      <CtaBand />
    </>
  );
}
