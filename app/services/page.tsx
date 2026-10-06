import ServicesSection from '../../src/components/ServicesSection';
import JourneyNext from '../../src/components/page/JourneyNext';
import CtaBand from '../../src/components/CtaBand';
import { pageMeta } from '../../src/data';

// 服務項目總覽頁（PLN-006 P2；提案見 proposals/pages-v2/services）：8 項能量療癒服務，可依類型篩選。
// <title> 與 description 是文案集原文，集中在 src/data.ts 的 pageMeta。
export const metadata = pageMeta.services;

export default function Page() {
  return (
    <>
      <ServicesSection />
      <JourneyNext route="/services" />
      <CtaBand />
    </>
  );
}
