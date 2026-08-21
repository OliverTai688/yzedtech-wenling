'use client';

import { useRouter } from 'next/navigation';
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

  const handleNavigateToService = (serviceId: string) => {
    router.push(`/services?tab=${serviceId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fadeIn">
      {/* 1. Hero Section (Bokeh background, 2 cols, circular portrait) */}
      <Hero 
        onLearnMore={handleNavigateToTab} 
        onPersonaClick={handleNavigateToService} 
      />

      {/* 2. Persona 快速導覽 (3 Columns with expandable recommendation) */}
      <Personas 
        onNavigateToService={handleNavigateToService} 
        onNavigateToTab={handleNavigateToTab} 
      />

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

      {/* 7. Media 出版與聲音專區 */}
      <MediaSection />
    </div>
  );
}
