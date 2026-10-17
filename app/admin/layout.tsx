import type { Metadata } from 'next';

// 後台（PRD-005）：不被搜尋引擎收錄；網站的頁首頁尾由 SiteChrome 拿掉。
// 登入檢查在各頁面（requireAdminPage）與 middleware.ts，登入頁本身不需登入，所以不放在這裡。
export const metadata: Metadata = {
  title: '後台｜豐盛之翼學苑',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground">{children}</div>;
}
