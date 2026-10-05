import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import WingsMark from './brand/WingsMark';

// 404 頁：統一成全站的視覺語言，只留一個回首頁的行動。
export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16 text-center">
      <div className="max-w-md rounded-[18px] border border-border bg-card p-8 shadow-[0_4px_20px_rgba(58,42,24,0.05)] sm:p-10">
        <WingsMark className="mx-auto w-20" />
        <h1 className="mt-6 font-serif text-2xl font-bold text-card-foreground">找不到這個頁面</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">這個網址可能已經移動或不存在。</p>
        <Link href="/" className="gold-btn mt-6 w-full px-6 text-base font-bold">
          <ArrowLeft className="size-4" />
          回到首頁
        </Link>
      </div>
    </div>
  );
}
