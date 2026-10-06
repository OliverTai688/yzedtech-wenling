import './globals.css';
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import ClientLayoutWrapper from './ClientLayoutWrapper';
import MotionProvider from '../src/components/motion/MotionProvider';
import SiteInteractions from '../src/components/SiteInteractions';
import { Analytics } from '@vercel/analytics/next';
import { pageMeta } from '../src/data';

// 不指定 weight＝使用可變字型：一組 @font-face 涵蓋所有粗細。
// 原本兩套字各載 5 種粗細，光字型樣式表就有 2 × 515KB 且會擋住首次繪製（ACC-003 §5）。
const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
});

// <title> 與 description 是文案集原文，集中在 src/data.ts 的 pageMeta。
export const metadata = pageMeta.home;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning：下面的行內指令會在 React 接手前替 <html> 加上 js 類別
    <html lang="zh-Hant-TW" className={`${notoSansTC.variable} ${notoSerifTC.variable}`} suppressHydrationWarning>
      <head>
        {/* 首次繪製前標記「有 JavaScript」：首頁的舞台版面只在有這個類別時套用（RES-005 §4），
            沒有 JavaScript 時維持一般的直向頁面。 */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {/* 沒有 JavaScript 時，進場動效的元素直接顯示（見 src/components/motion/Reveal.tsx） */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <MotionProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ClientLayoutWrapper />
          </div>
        </MotionProvider>
        <SiteInteractions />
        {/* 只在 Vercel 上載入量測腳本，本機與其他主機不會有載入失敗的請求 */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
