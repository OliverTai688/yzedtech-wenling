import ResourcesSection from '../../src/components/ResourcesSection';
import CtaBand from '../../src/components/CtaBand';

export const metadata = {
  title: '免費資源｜豐盛之翼學苑・公益直播與免費社群',
  description: '加入文齡老師的免費公益體驗直播與豐盛之翼學苑社群，或透過官方 LINE 帳號預約諮詢，陪伴您踏出自我照顧的第一步。',
};

export default function Page() {
  return (
    <>
      <ResourcesSection />
      <CtaBand />
    </>
  );
}
