'use client';

import { Sparkles, MessageCircle, Mail, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { primaryNavigation } from '../data';

// Footer 網站地圖直接吃 primaryNavigation（src/data.ts），跟 Header 的
// DesktopNav / MobileNav 共用同一份導覽架構資料，避免兩處各自維護、長期漂移。
export default function Footer() {
  const router = useRouter();
  const navGroups = primaryNavigation.filter((group) => group.items);
  const contactHref = primaryNavigation.find((group) => group.id === 'contact')?.href ?? '/contact';

  const goTo = (href: string) => {
    router.push(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="dark bg-[#20140A] text-[#C7AE8A] border-t border-[#3A2409]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14 py-16">

        {/* Top Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">

          {/* Logo & Brand Info */}
          <div className="md:col-span-3 space-y-4">
            <Link href="/" onClick={() => goTo('/')} className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D89A3E] to-[#FCE7A8] flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4 text-[#3A2409]" />
              </div>
              <h2 className="text-lg font-bold font-serif text-[#FFFDF0] tracking-wide">
                豐盛之翼學苑 <span className="text-[#F0C875] font-sans text-sm">幸運教主 文齡 Keila</span>
              </h2>
            </Link>
            <p className="text-base text-[#B49A76] leading-relaxed max-w-sm">
              結合多年商務行銷與專案管理的理性思維與溫柔宇宙能量調頻。陪伴你在愛情、家庭與事業財富中，找回內在的光芒與篤定，活出最圓滿的豐盛本色。
            </p>
            <div className="pt-2 flex items-center gap-3 text-sm text-[#F0C875]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#06C755]"></span>
              <span>線上全球遠距諮詢服務中</span>
            </div>
          </div>

          {/* Sitemap — 與 Header 導覽同一份資料，僅版面改為 2x2 呈現 */}
          <div className="md:col-span-6 grid grid-cols-2 gap-x-6 gap-y-8">
            {navGroups.map((group) => (
              <div key={group.id}>
                <h3 className="text-sm font-bold text-[#F0C875] uppercase tracking-wider mb-3.5">
                  {group.label}
                </h3>
                <ul className="space-y-2.5 text-base">
                  {group.items!.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="hover:text-[#FFFDF0] transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & Community Channels */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-bold text-[#F0C875] uppercase tracking-wider">
              官方聯繫與諮詢
            </h3>
            <p className="text-base text-[#B49A76] leading-relaxed">
              企業心靈講座、讀書會導讀合作或個人開班詢問，歡迎隨時聯繫團隊：
            </p>
            <div className="space-y-2.5 text-base">
              <Link
                href={contactHref}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 hover:text-[#FFFDF0] transition-colors"
              >
                <ArrowUpRight className="w-4 h-4 text-[#F0C875]" />
                <span>前往預約聯絡頁</span>
              </Link>
              <a href="https://www.instagram.com/keila.healing1491" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FFFDF0] transition-colors">
                <Mail className="w-4 h-4 text-[#F0C875]" />
                <span>IG @keila.healing1491</span>
              </a>
              <a href="https://lin.ee/yo6a6FW" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FFFDF0] transition-colors">
                <MessageCircle className="w-4 h-4 text-[#06C755]" />
                <span>加入 LINE 官方社群 (最新開班情報)</span>
                <ArrowUpRight className="w-3 h-3 text-[#B49A76]" />
              </a>
            </div>
          </div>

        </div>

        <Separator className="mb-10" />

        {/* Verbatim Disclaimer Banner */}
        <div className="bg-[#170E07] rounded-2xl p-5 sm:p-6 border border-[#3A2409] mb-8 text-base text-[#B49A76] leading-relaxed">
          <p className="font-semibold text-[#F0C875] mb-1.5 flex items-center gap-1.5">
            <span>官方免責與專業倫理守則聲明</span>
          </p>
          <p>
            本網站所提供之能量療癒、靈氣與相關課程，皆屬身心靈輔助與自我覺察支持，非醫療行為，不能取代專業醫療診斷、精神醫學治療或專業諮商。如有生理或心理疾患，請務必優先諮詢專業醫師。
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#8A7458]">
          <p>© 2026 豐盛之翼學苑. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-base text-[#8A7458] hover:text-[#FFFDF0]"
              onClick={() => goTo('/legal')}
            >
              隱私權保護政策
            </Button>
            <Separator orientation="vertical" className="h-3 bg-[#3A2409]" />
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-base text-[#8A7458] hover:text-[#FFFDF0]"
              onClick={() => goTo('/legal')}
            >
              服務條款
            </Button>
            <Separator orientation="vertical" className="h-3 bg-[#3A2409]" />
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-base text-[#8A7458] hover:text-[#FFFDF0]"
              onClick={() => goTo('/contact')}
            >
              聯絡我們
            </Button>
          </div>
        </div>

      </div>
    </footer>
  );
}
