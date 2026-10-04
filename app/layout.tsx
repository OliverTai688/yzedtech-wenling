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
