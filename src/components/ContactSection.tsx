import { ArrowUpRight, AtSign, Mail, MessageSquare, Users, type LucideIcon } from 'lucide-react';
import PageHero from './page/PageHero';
import PageSection from './page/PageSection';
import { footerContent, pagesContent, siteLinks, uiLabels } from '../data';

// 聯絡頁（PLN-006 P5；提案見 proposals/pages-v2/contact）：依來意分流，但只留一顆按鈕。
// - 第一個畫面：來意「一對一私訊諮詢」當眉批、頁名與說明句（文案集頁尾的「官方聯繫與諮詢管道」）、
//   唯一的金色按鈕「私訊官方 LINE」。
// - 其餘管道是一份清單，每列一個文字連結：加粗的名稱加上一般字重的帳號或說明。
//   三種來意都在原文本來的位置（眉批、說明句、社群那一句的括號），不再另外重複一次。
// - 社群那一列用頁尾的原句（footerContent.communityNote），不拆開，只把括號前的部分加粗；目的地不變。
// - 沒有表單，也不承諾回覆時間（PRD-003 §4.12）。
interface Channel {
  id: string;
  icon: LucideIcon;
  title: string;
  detail: string;
  href: string;
  /** 名稱與說明之間是否空一格（社群那一句是連續的原文，不空格） */
  joined?: boolean;
}

// 把「…（…）」拆成括號前與括號起的兩段，只為了字重不同；兩段相接仍是原句
const noteCut = footerContent.communityNote.indexOf('（');
const noteHead = noteCut > 0 ? footerContent.communityNote.slice(0, noteCut) : footerContent.communityNote;
const noteTail = noteCut > 0 ? footerContent.communityNote.slice(noteCut) : '';

const channels: Channel[] = [
  { id: 'email', icon: Mail, title: 'Email', detail: siteLinks.email, href: `mailto:${siteLinks.email}` },
  { id: 'community', icon: Users, title: noteHead, detail: noteTail, href: siteLinks.lineCommunity, joined: true },
  { id: 'facebook', icon: MessageSquare, title: 'Facebook', detail: 'm.me/keila.healing', href: siteLinks.facebook },
  { id: 'instagram', icon: AtSign, title: 'Instagram', detail: '@keila.healing1491', href: siteLinks.instagram },
];

export default function ContactSection() {
  // 對應官方 LINE 的那一個來意
  const linePurpose = pagesContent.contact.purposes.find((purpose) => purpose.channel === 'line');

  return (
    <>
      <PageHero
        eyebrow={linePurpose?.label}
        title={footerContent.contactHeading}
        lead={footerContent.contactIntro}
        action={{ label: uiLabels.line, href: siteLinks.line, external: true }}
      />

      <PageSection id="contact-channels" width="narrow">
        <ul className="divide-y divide-border/70 border-y border-border/70">
          {channels.map(({ id, icon: Icon, title, detail, href, joined }) => {
            const external = href.startsWith('http');
            return (
              <li key={id}>
                <a
                  id={`contact-${id}`}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="btn-text min-h-14! w-full justify-start! gap-3! py-3! text-left text-base leading-relaxed"
                >
                  <Icon className="size-[18px] shrink-0 text-ring" aria-hidden="true" />
                  <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">
                    <span>{title}</span>
                    {joined ? null : ' '}
                    <span className="font-normal text-muted-foreground">{detail}</span>
                  </span>
                  {external && <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>
      </PageSection>
    </>
  );
}
