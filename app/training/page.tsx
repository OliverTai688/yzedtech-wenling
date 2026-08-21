import TrainingSection from '../../src/components/TrainingSection';

// PRD-002 §3.3 v1.1（2026-08-21，Batch E）：新增培訓總覽頁，收錄
// `thetaTrainingCourses`＋`reikiCourses`＋`certificationCourses`（希塔培訓／
// 希塔認證班／療癒師認證，含併入的直覺力培訓加值模組），取代原本
// `/services?tab=theta-training`／`?tab=certifications` 的舊 tab 切換方式。
// 各內頁 title 依 Batch A 決策維持「幸運教主 文齡 Keila」作 SEO 個人品牌關鍵字。
export const metadata = {
  title: '希塔療癒認證培訓與專業證照課程｜國際希塔療癒・靈氣證照班 — 幸運教主 文齡 Keila',
  description: '幸運教主文齡的希塔療癒基礎／進階／深度挖掘認證培訓，以及金錢／愛情／人魚靈氣療癒師暨導師認證課程，皆由美國官方授權國際導師親授。',
};

export default function Page() {
  return <TrainingSection />;
}
