import ResourcesSection from '../../src/components/ResourcesSection';

export const metadata = {
  title: '免費資源｜豐盛之翼學苑公益直播・免費社群・媒體專訪精選',
  description: '加入文齡老師的免費公益體驗直播與豐盛之翼學苑社群，或透過官方 LINE 帳號預約諮詢，陪伴您踏出自我照顧的第一步。',
};

export default function ResourcesPage() {
  return (
    <div className="animate-fadeIn">
      <ResourcesSection />
    </div>
  );
}
