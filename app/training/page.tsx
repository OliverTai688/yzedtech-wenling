import TrainingSection from '../../src/components/TrainingSection';
import CtaBand from '../../src/components/CtaBand';

// 認證班總覽頁（PLN-004 D5；定案見 RES-002 §5）：希塔療癒三階課程、靈氣認證三門與直覺力訓練。
export const metadata = {
  title: '認證班｜豐盛之翼學苑・希塔療癒與靈氣療癒師認證課程',
  description: '豐盛之翼學苑的希塔療癒基礎／進階／深度挖掘認證培訓，以及金錢／愛情／人魚靈氣療癒師暨導師認證課程，皆由美國官方授權國際導師親授。',
};

export default function Page() {
  return (
    <>
      <TrainingSection />
      <CtaBand />
    </>
  );
}
