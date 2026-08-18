'use client';

import { useSearchParams } from 'next/navigation';
import BlogSection from '../../src/components/BlogSection';
import { Suspense } from 'react';

function BlogContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  return <BlogSection initialSearchQuery={q} />;
}

export default function BlogClientPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#9A8060]">載入中...</div>}>
      <BlogContent />
    </Suspense>
  );
}
