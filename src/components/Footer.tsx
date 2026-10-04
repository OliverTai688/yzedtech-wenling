import { Sparkles, MessageCircle, Mail, MessageSquare, Users, AtSign, ShoppingBag, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { footerContent, footerNavigation, siteLinks } from '../data';

// PRD-003 §4.13（2026-10-04）：頁尾依文案集 v2「網站下方區塊調整」重整。
// 導覽分三組（footerNavigation），不再沿用 Header 的 primaryNavigation；
// 刪除「支持」分組與底列「聯絡我們」，免責聲明與條款、隱私權、服務條款排在同一排。
const legalLinks = [
  { label: '免責聲明與條款', href: '/legal#disclaimer' },
  { label: '隱私權保護政策', href: '/legal#privacy' },
  { label: '服務條款', href: '/legal#terms' },
];

export default function Footer() {
  return (
    <footer className="dark bg-[#20140A] text-[#C7AE8A] border-t border-[#3A2409]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14 py-16">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-3 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D89A3E] to-[#FCE7A8] flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4 text-[#3A2409]" />
              </div>
              <h2 className="text-lg font-bold font-serif text-[#FFFDF0] tracking-wide">豐盛之翼學苑</h2>
            </Link>
            <p className="text-base text-[#B49A76] leading-relaxed max-w-sm">{footerContent.tagline}</p>
            <div className="pt-2 flex items-center gap-3 text-sm text-[#F0C875]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#06C755]"></span>
              <span>{footerContent.status}</span>
            </div>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8">
            {footerNavigation.map((group) => (
              <div key={group.id}>
                <h3 className="text-sm font-bold text-[#F0C875] tracking-wider mb-3.5">{group.label}</h3>
                <ul className="space-y-2.5 text-base">
                  {group.items!.map((item) => (
                    <li key={item.id}>
                      <Link href={item.href} className="hover:text-[#FFFDF0] transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-[#F0C875] tracking-wider">{footerContent.contactHeading}</h3>
            <p className="text-base text-[#B49A76] leading-relaxed">{footerContent.contactIntro}</p>
            <div className="space-y-2.5 text-base">
              <a href={`mailto:${siteLinks.email}`} className="flex items-center gap-2 hover:text-[#FFFDF0] transition-colors">
                <Mail className="w-4 h-4 shrink-0 text-[#F0C875]" />
                <span>{siteLinks.email}</span>
              </a>
              <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FFFDF0] transition-colors">
                <MessageCircle className="w-4 h-4 shrink-0 text-[#06C755]" />
                <span>LINE {siteLinks.lineId}</span>
              </a>
              <a href={siteLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FFFDF0] transition-colors">
                <MessageSquare className="w-4 h-4 shrink-0 text-[#F0C875]" />
                <span>Facebook m.me/keila.healing</span>
              </a>
              <a href={siteLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FFFDF0] transition-colors">
                <AtSign className="w-4 h-4 shrink-0 text-[#F0C875]" />
                <span>IG keila.healing1491</span>
              </a>
              <a href={siteLinks.lineCommunity} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-[#FFFDF0] transition-colors">
                <Users className="w-4 h-4 shrink-0 mt-1 text-[#06C755]" />
                <span>{footerContent.communityNote}</span>
              </a>
            </div>
            <a
              href={siteLinks.shop}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#F0C875]/60 px-4 py-2 text-base font-semibold text-[#F0C875] hover:bg-[#F0C875] hover:text-[#20140A] transition-colors"
              id="footer-shop-link"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{footerContent.shopLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        <Separator className="mb-10" />

        {/* Disclaimer */}
        <div className="bg-[#170E07] rounded-2xl p-5 sm:p-6 border border-[#3A2409] mb-8 text-base text-[#B49A76] leading-relaxed">
          <p className="font-semibold text-[#F0C875] mb-1.5">{footerContent.disclaimerHeading}</p>
          <p>{footerContent.disclaimer}</p>
        </div>

        {/* Copyright & legal links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#8A7458]">
          <p>© 2026 豐盛之翼學苑. All Rights Reserved.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#FFFDF0] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}
