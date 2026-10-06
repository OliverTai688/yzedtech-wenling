import { MessageCircle, Mail, MessageSquare, Users, AtSign, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import WingsMark from './brand/WingsMark';
import { footerContent, footerNavigation, siteLinks } from '../data';

// 頁尾（2026-10-06 精簡）：內容仍是文案集「網站下方區塊調整」的全部項目（PRD-003 §4.13），
// 只改呈現方式，對齊金、銀、暖白的設計系統：
// - 淺色底，一條細線與上方的深色行動區塊分開；不再用深色底、外框與方塊。
// - 三欄等寬：品牌、導覽（每組一行）、聯繫管道；免責聲明改成一段小字，不加框。
// - 全站只留一顆實心按鈕給主要行動，所以「訂購」在這裡是文字連結。
const legalLinks = [
  { label: '免責聲明與條款', href: '/legal#disclaimer' },
  { label: '隱私權保護政策', href: '/legal#privacy' },
  { label: '服務條款', href: '/legal#terms' },
];

const link = 'inline-flex min-h-10 items-center gap-2 transition-colors hover:text-card-foreground';
const heading = 'text-sm font-bold tracking-[0.08em] text-accent-foreground';

export default function Footer() {
  const contacts = [
    { href: `mailto:${siteLinks.email}`, label: siteLinks.email, Icon: Mail, external: false },
    { href: siteLinks.line, label: `LINE ${siteLinks.lineId}`, Icon: MessageCircle, external: true },
    { href: siteLinks.facebook, label: 'Facebook m.me/keila.healing', Icon: MessageSquare, external: true },
    { href: siteLinks.instagram, label: 'IG keila.healing1491', Icon: AtSign, external: true },
  ];

  return (
    <footer className="border-t border-border bg-popover text-base text-muted-foreground">
      <div className="mx-auto max-w-[1180px] px-6 py-12 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">

          {/* 品牌 */}
          <div>
            <Link href="/" className="inline-flex min-h-10 items-center gap-2.5">
              <WingsMark className="h-7 w-auto" />
              <span className="font-serif text-lg font-bold tracking-wide text-card-foreground">豐盛之翼學苑</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">{footerContent.tagline}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-accent-foreground">
              <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-ring" />
              {footerContent.status}
            </p>
          </div>

          {/* 導覽：每組一行 */}
          <nav className="space-y-5">
            {footerNavigation.map((group) => (
              <div key={group.id}>
                <h3 className={heading}>{group.label}</h3>
                <ul className="mt-1 flex flex-wrap gap-x-5">
                  {group.items!.map((item) => (
                    <li key={item.id}>
                      <Link href={item.href} className={link}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* 聯繫 */}
          <div>
            <h3 className={heading}>{footerContent.contactHeading}</h3>
            <p className="mt-2 text-sm leading-relaxed">{footerContent.contactIntro}</p>
            <ul className="mt-2">
              {contacts.map(({ href, label, Icon, external }) => (
                <li key={href}>
                  <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={link}>
                    <Icon className="size-4 shrink-0 text-ring" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={siteLinks.lineCommunity} target="_blank" rel="noopener noreferrer" className={`${link} items-start py-2`}>
                  <Users className="mt-1 size-4 shrink-0 text-ring" />
                  <span>{footerContent.communityNote}</span>
                </a>
              </li>
            </ul>
            <a
              href={siteLinks.shop}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link} mt-2 font-bold text-accent-foreground`}
              id="footer-shop-link"
            >
              <span>{footerContent.shopLabel}</span>
              <ArrowUpRight className="size-4" />
            </a>
          </div>

        </div>

        {/* 免責聲明：一段小字 */}
        <p className="mt-10 border-t border-border pt-6 text-sm leading-relaxed">
          <span className="mr-2 font-bold text-accent-foreground">{footerContent.disclaimerHeading}</span>
          {footerContent.disclaimer}
        </p>

        {/* 版權與法律連結 */}
        <div className="mt-4 flex flex-col gap-x-6 gap-y-1 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 豐盛之翼學苑</p>
          <ul className="flex flex-wrap gap-x-5">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
