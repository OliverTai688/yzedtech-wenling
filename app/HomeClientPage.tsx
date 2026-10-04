'use client';

import { useRouter } from 'next/navigation';
import { resolveOfferingHref } from '../src/data';
import Hero from '../src/components/Hero';
import Personas from '../src/components/Personas';
import HomeServicesGrid from '../src/components/HomeServicesGrid';
import HomeTrainingSection from '../src/components/HomeTrainingSection';
import HomeIntuitionBanner from '../src/components/HomeIntuitionBanner';
import HomeTestimonialsSection from '../src/components/HomeTestimonialsSection';
import MediaSection from '../src/components/MediaSection';

export default function HomeClientPage() {
  const router = useRouter();

  const handleNavigateToTab = (tabId: string) => {
    const route = tabId === 'home' ? '/' : `/${tabId}`;
    router.push(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // PRD-002 §3.4（Batch F）：不再用 `/services?tab=${serviceId}` 這種舊的
  // 「傳 id、由 ServicesSection 原地展開」機制；改用 resolveOfferingHref
  // 依 Batch D 補上的 category 欄位，導向對應的 `/services/[id]` 或
  // `/training/[id]` 詳細頁。
  const handleNavigateToService = (serviceId: string) => {
    router.push(resolveOfferingHref(serviceId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fadeIn">
      {/* 1. Hero（文案集 v2 Home Block 1） */}
      <Hero />

      {/* 2. 需求入口（文案集 v2 Home Block 2，4 張卡） */}
      <Personas />

      {/* 3～5：PRD-003 決策 D2 將於階段 D 移出首頁（PLN-004 §2），階段 A 先保留。 */}
      {/* 3. Services 服務項目 (8 cards with gold metallic numbers) */}
      <HomeServicesGrid 
        onNavigateToService={handleNavigateToService} 
        onNavigateToTab={handleNavigateToTab}
      />

      {/* 4. Training 深色認證培訓專區 */}
      <HomeTrainingSection 
        onNavigateToTab={handleNavigateToTab}
      />

      {/* 5. Intuition CTA Banner */}
      <HomeIntuitionBanner />

      {/* 6. Testimonials 個案心得 */}
      <HomeTestimonialsSection 
        onNavigateToTab={handleNavigateToTab}
      />

      {/* 7. 媒體精選（完整內容在 /media） */}
      <MediaSection variant="home" />
    </div>
  );
}
