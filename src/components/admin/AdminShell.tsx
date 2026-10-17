import type { ReactNode } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import WingsMark from '../brand/WingsMark';
import LogoutButton from './LogoutButton';

// 後台外框：品牌、導覽（文章、查看前台）、登出。
export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/admin/blog" className="flex min-h-11 items-center gap-2">
            <WingsMark className="h-7 w-auto" />
            <span className="font-serif text-base font-bold text-card-foreground">學苑後台</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm sm:gap-3">
            <Link href="/admin/blog" className="btn-text">
              文章
            </Link>
            <Link href="/blog" target="_blank" className="btn-text">
              查看前台
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </>
  );
}
