import ServicesSection from '../../src/components/ServicesSection';

// PRD-002 §3.3 v1.1（2026-08-21，Batch E）：`/services` 改為只收錄能量療癒
// 8 項服務的獨立總覽頁（不再用 tab 切換希塔培訓／證照分類，那兩類已移至
// `/training`，見 app/training/page.tsx）。各內頁 title 依 Batch A 決策維持
// 「幸運教主 文齡 Keila」作 SEO 個人品牌關鍵字，不變動。
export const metadata = {
  title: '全部服務｜豐盛之翼學苑・一對一療癒、團體療癒、祈福與工作坊',
  description: '豐盛之翼學苑的 8 項能量療癒服務：一對一個人療癒、靈性解讀、靈性按摩、人生推進器團體療癒、主題工作坊、煙供祈福、豐盛靈氣與五行香水供奉。',
};

export default function Page() {
  return <ServicesSection />;
}
