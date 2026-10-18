'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import WingsMark from '../brand/WingsMark';
import { adminInput } from './styles';

// 後台登入（PRD-005 §3.4）。後台文字只給管理者看，不受「文案只用 docx」的限制。
export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError('');
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).catch(() => null);
    if (response?.ok) {
      router.replace('/admin/blog');
      router.refresh();
      return;
    }
    const data = await response?.json().catch(() => null);
    setError(data?.error ?? '登入失敗，請稍後再試');
    setPending(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-[18px] border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center gap-3 text-center">
          <WingsMark className="h-12 w-auto" />
          <h1 className="font-serif text-xl font-bold text-card-foreground">豐盛之翼學苑・後台</h1>
        </div>
        <label className="mt-8 block text-sm font-semibold text-card-foreground" htmlFor="admin-password">
          管理密碼
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={`${adminInput} mt-2`}
        />
        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}
        <button type="submit" disabled={pending} className="gold-btn mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full font-bold disabled:opacity-60">
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          登入
        </button>
      </form>
    </div>
  );
}
