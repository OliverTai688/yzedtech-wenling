import { MessageCircle, Mail, MessageSquare, Users, AtSign, ArrowUpRight } from 'lucide-react';
import { footerContent, siteLinks } from '../data';

// PRD-003 §4.12（2026-10-04）：原聯絡表單送出後只是前端模擬成功訊息、不會寄出任何
// 資料（ACC-001 §6 已列為未完成），本輪改為導流卡片：官方 LINE 第一順位，其次
// Email、Facebook、LINE 社群與 Instagram。聯絡管道取自文案集 v2「網站下方區塊調整」
// （第 302～308 行）；Instagram 為既有管道，依 PRD-003 §7 第 9 項預設保留。
const channels = [
  {
    id: 'line',
    icon: MessageCircle,
    title: '官方 LINE',
    detail: siteLinks.lineId,
    href: siteLinks.line,
    primary: true,
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email',
    detail: siteLinks.email,
    href: `mailto:${siteLinks.email}`,
  },
  {
    id: 'facebook',
    icon: MessageSquare,
    title: 'Facebook',
    detail: 'm.me/keila.healing',
    href: siteLinks.facebook,
  },
  {
    id: 'community',
    icon: Users,
    title: 'LINE 社群',
    detail: footerContent.communityNote,
    href: siteLinks.lineCommunity,
  },
  {
    id: 'instagram',
    icon: AtSign,
    title: 'Instagram',
    detail: '@keila.healing1491',
    href: siteLinks.instagram,
  },
];

export default function ContactSection() {
  return (
    <section id="contact-section" className="py-20 bg-[#FBF1DD]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-10 space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3A2A18] font-serif">聯絡我們</h1>
          <p className="text-base text-[#6A5642] leading-relaxed">{footerContent.contactIntro}</p>
        </div>

        <ul className="space-y-4">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const external = channel.href.startsWith('http');
            return (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  id={`contact-${channel.id}`}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-shadow hover:shadow-md ${
                    channel.primary
                      ? 'bg-[#06C755]/10 border-[#06C755]/40'
                      : 'bg-[#FFFDF0] border-[#F0DFA0]'
                  }`}
                >
                  <div
                    className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${
                      channel.primary ? 'bg-[#06C755] text-white' : 'bg-[#FDF6E6] border border-[#F0DFA0] text-[#B5762A]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-base text-[#3A2A18]">{channel.title}</h2>
                    <p className="text-base text-[#6A5642] mt-0.5 break-words">{channel.detail}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-[#9A8060]" />
                </a>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
