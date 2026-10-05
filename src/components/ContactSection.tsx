import { ArrowUpRight, AtSign, Mail, MessageCircle, MessageSquare, Plus, Users } from 'lucide-react';
import PageHeader, { narrowShell, sectionTitle } from './PageHeader';
import { footerContent, pagesContent, siteLinks } from '../data';

// 聯絡我們（PLN-004 D11；定案見 RES-002 §11）：提案 B「依目的分流」，其餘管道列在下方。
// - 訪客先選來意，只看到對應的那一個管道；第一項（官方 LINE）預設展開。
// - 來意的文字逐字取自既有資料，不自行撰寫；用原生 <details>，不需要 JavaScript。
// - 沒有表單，也不承諾回覆時間（PRD-003 §4.12）。
const channels = {
  line: { icon: MessageCircle, title: '官方 LINE', detail: siteLinks.lineId, href: siteLinks.line },
  email: { icon: Mail, title: 'Email', detail: siteLinks.email, href: `mailto:${siteLinks.email}` },
  community: { icon: Users, title: 'LINE 社群', detail: footerContent.communityNote, href: siteLinks.lineCommunity },
  facebook: { icon: MessageSquare, title: 'Facebook', detail: 'm.me/keila.healing', href: siteLinks.facebook },
  instagram: { icon: AtSign, title: 'Instagram', detail: '@keila.healing1491', href: siteLinks.instagram },
} as const;

type ChannelId = keyof typeof channels;

function ChannelLink({ id, large = false }: { id: ChannelId; large?: boolean }) {
  const channel = channels[id];
  const Icon = channel.icon;
  const external = channel.href.startsWith('http');
  const isLine = id === 'line';
  return (
    <a
      href={channel.href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      id={`contact-${id}${large ? '' : '-other'}`}
      className={`flex items-center gap-4 rounded-2xl border p-4 transition-shadow hover:shadow-md ${
        large && isLine ? 'border-line/40 bg-line/10' : 'border-border bg-popover'
      }`}
    >
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${large && isLine ? 'bg-line text-line-foreground' : 'border border-border bg-card text-ring'}`}>
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-bold text-card-foreground">{channel.title}</span>
        <span className="mt-0.5 block break-words text-base text-muted-foreground">{channel.detail}</span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
    </a>
  );
}

export default function ContactSection() {
  const labels = pagesContent.contact;
  const used = new Set<string>(labels.purposes.map((p) => p.channel));
  const others = (Object.keys(channels) as ChannelId[]).filter((id) => !used.has(id));

  return (
    <div className={narrowShell} id="contact-section">
      <PageHeader eyebrow={footerContent.contactHeading} title={labels.title} description={footerContent.contactIntro} />

      <div className="mt-10 space-y-3">
        {labels.purposes.map((purpose, index) => (
          <details key={purpose.id} name="contact-purpose" open={index === 0} className="disclosure rounded-[18px] border border-border bg-card px-5 sm:px-6">
            <summary className="flex min-h-14 items-center justify-between gap-4 py-3 text-base font-bold text-card-foreground">
              <span>{purpose.label}</span>
              <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
            </summary>
            <div className="pb-5">
              <ChannelLink id={purpose.channel as ChannelId} large />
            </div>
          </details>
        ))}
      </div>

      <section className="mt-12">
        <h2 className={sectionTitle}>{labels.otherLabel}</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {others.map((id) => (
            <ChannelLink key={id} id={id} />
          ))}
        </div>
      </section>
    </div>
  );
}
