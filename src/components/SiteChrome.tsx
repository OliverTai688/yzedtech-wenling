'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// 網站外框（PRD-005 §3.1）：頁首、頁尾、右下角浮動按鈕。後台（/admin）不顯示這些，只留內容。
// 頁首、頁尾仍是伺服器元件，由 app/layout.tsx 以 props 傳進來。
interface SiteChromeProps {
  header: ReactNode;
  footer: ReactNode;
  widgets: ReactNode;
  children: ReactNode;
}

export default function SiteChrome({ header, footer, widgets, children }: SiteChromeProps) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen">
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      {widgets}
    </div>
  );
}
