import ServicesSection from '../../src/components/ServicesSection';
import CtaBand from '../../src/components/CtaBand';

// 全部服務總覽頁（PLN-004 D4；定案見 RES-002 §4）：8 項能量療癒服務，可依類型切換。
export const metadata = {
  title: '全部服務｜豐盛之翼學苑・一對一療癒、團體療癒、祈福與工作坊',
  description: '豐盛之翼學苑的 8 項能量療癒服務：一對一個人療癒、靈性解讀、靈性按摩、人生推進器團體療癒、主題工作坊、煙供祈福、豐盛靈氣與五行香水供奉。',
};

export default function Page() {
  return (
    <>
      <ServicesSection />
      <CtaBand />
    </>
  );
}
