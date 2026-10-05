'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tabs } from 'radix-ui';
import { ArrowRight, MessageCircle } from 'lucide-react';
import PageHeader, { cardClass, narrowShell, sectionTitle } from './PageHeader';
import { homeContent, offeringsContent, pagesContent, serviceBlurbs, services, siteLinks, testimonialQuotes } from '../data';

// 客戶見證（PLN-004 D8；定案見 RES-002 §8）。
// - 已授權：提案 A「分類分頁＋引言卡」，一次看一類。
// - 未授權（目前狀態）：不顯示任何見證內文，只放說明與出口，並用提案 C 的做法把
//   服務清單當成下一步，頁面不是死路。開關是 homeContent.testimonials.authorized（RPT-001 C1）。
export default function TrustSystem() {
  const labels = pagesContent.testimonials;
  const { authorized, heading, description } = homeContent.testimonials;
  const categories = [...new Set(testimonialQuotes.map((q) => q.category))];
  const [active, setActive] = useState(categories[0]);
  const featured = services.filter((s) => homeContent.services.ids.includes(s.id));

  const exits = (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <Link href="/#personas-section" className="gold-btn px-6 text-base font-bold">
        {offeringsContent.helper.needs}
        <ArrowRight className="size-4" />
      </Link>
      <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="btn-outline text-base">
        <MessageCircle className="size-4 text-line" />
        {offeringsContent.helper.line}
      </a>
    </div>
  );

  return (
    <div className={narrowShell} id="trust-section">
      <PageHeader eyebrow={heading} title={labels.title} description={authorized ? description : labels.pendingNotice}>
        {exits}
      </PageHeader>

      {authorized ? (
        <Tabs.Root value={active} onValueChange={setActive} className="mt-12">
          <Tabs.List aria-label={labels.title} className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Tabs.Trigger
                key={category}
                value={category}
                className="min-h-11 rounded-full border border-border bg-popover px-5 text-sm font-bold text-secondary-foreground transition-colors hover:border-ring data-[state=active]:border-ring data-[state=active]:bg-accent data-[state=active]:text-primary-foreground"
              >
                {category}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {categories.map((category) => (
            <Tabs.Content
              key={category}
              value={category}
              forceMount
              className="mt-6 grid grid-cols-1 gap-5 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:duration-300 md:grid-cols-2"
            >
              {testimonialQuotes
                .filter((q) => q.category === category)
                .map((q) => (
                  <figure key={q.quote} className={`${cardClass} flex flex-col p-6`}>
                    <blockquote className="flex-1 font-serif text-base leading-relaxed text-card-foreground">「{q.quote}」</blockquote>
                    <figcaption className="mt-4 text-sm text-muted-foreground">— {q.source}</figcaption>
                  </figure>
                ))}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      ) : null}

      <section className="mt-14">
        <h2 className={sectionTitle}>{homeContent.services.eyebrow}</h2>
        <ul className="mt-5 divide-y divide-border/70 border-y border-border/70">
          {featured.map((service) => (
            <li key={service.id}>
              <Link href={`/services/${service.id}`} className="group flex min-h-16 items-center justify-between gap-4 py-3">
                <span>
                  <span className="block text-base font-bold text-card-foreground group-hover:underline">{service.name}</span>
                  <span className="mt-0.5 block text-base text-muted-foreground">{serviceBlurbs[service.id]}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-ring" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/services" className="btn-outline mt-6 text-base">
          {labels.servicesLabel}
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}
