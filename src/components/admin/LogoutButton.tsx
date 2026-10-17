'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }
  return (
    <button type="button" onClick={logout} className="btn-text">
      <LogOut className="size-3.5" aria-hidden="true" />
      登出
    </button>
  );
}
