'use client';

import { useRouter } from 'next/navigation';
import NotFoundPage from '../src/components/NotFoundPage';

export default function NotFound() {
  const router = useRouter();

  const handleBackHome = () => {
    router.push('/');
  };

  return <NotFoundPage setCurrentTab={handleBackHome} />;
}
