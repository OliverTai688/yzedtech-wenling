'use client';

import { useSearchParams } from 'next/navigation';
import ServicesSection from '../../src/components/ServicesSection';
import { Suspense } from 'react';

function ServicesContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || undefined;
  return <ServicesSection initialSubTab={tab} />;
}

export default function ServicesClientPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#9A8060]">載入中...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
