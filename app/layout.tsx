import './globals.css';
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import ClientLayoutWrapper from './ClientLayoutWrapper';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata = {
  title: '幸運療癒師 Keila Wenling 文齡｜能量療癒・希塔靈氣培訓・暢銷書推薦序作者',
  description: '幸運療癒師 Keila Wenling 文齡，提供能量療癒、希塔與靈氣認證培訓、愛情與豐盛能量調頻，陪伴你在關係、家庭、財富與人生方向中找回穩定與內在力量。',
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
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ClientLayoutWrapper />
        </div>
      </body>
    </html>
  );
}
