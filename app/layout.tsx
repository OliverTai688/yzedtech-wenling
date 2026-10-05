import './globals.css';
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import ClientLayoutWrapper from './ClientLayoutWrapper';
import MotionProvider from '../src/components/motion/MotionProvider';

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

export const metadata = {
  title: '豐盛之翼學苑｜能量療癒・希塔與靈氣認證培訓',
  description: '豐盛之翼學苑提供能量療癒服務與希塔、靈氣認證培訓，由創辦人文齡老師帶領，陪你在感情、家庭、事業與人生方向中找到適合的起點。',
};

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
    <html lang="zh-Hant-TW" className={`${notoSansTC.variable} ${notoSerifTC.variable}`}>
      <body className="antialiased min-h-screen bg-[#FBF1DD] text-[#2E2318]">
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
      </body>
    </html>
  );
}
