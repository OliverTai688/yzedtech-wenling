'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { homeContent, offeringsContent, serviceBlurbs, services, serviceTypes, siteLinks } from '../data';
import { cn } from '@/lib/utils';

// 全部服務（PLN-004 D4；定案見 RES-002 §4）。採提案 A「類型切換」：
// - 每張卡只露出名稱、一句話與時長，完整內容在詳細頁（BRIEF §4A）。
// - 切換類型時用瀏覽器的 View Transitions 讓卡片平滑移位；不支援的瀏覽器直接切換。
// - 八張卡都在 HTML 裡，未選中的類型以 hidden 隱藏。
// - 上方的導引取自提案 B：不確定的人先回首頁的需求入口，或直接問 LINE。
export default function ServicesSection() {
  const [active, setActive] = useState<string>('all');
  const { title, allLabel, itemLabel } = offeringsContent.services;
  const { description } = homeContent.services;
  const { helper } = offeringsContent;

  const select = (id: string) => {
    const update = () => setActive(id);
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doc.startViewTransition(() => flushSync(update));
    } else {
      update();
    }
  };

  const filters = [{ id: 'all', label: allLabel }, ...serviceTypes.map((t) => ({ id: t.id, label: t.label }))];

  return (
    <section id="services-section" className="mx-auto max-w-[1180px] px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-14">
      <p className="eyebrow">{homeContent.services.eyebrow}</p>
      <h1 className="mt-3 font-serif text-[32px] font-bold leading-snug text-card-foreground md:text-[40px]">{title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/#personas-section" className="btn-outline text-base">
          {helper.needs}
          <ArrowRight className="size-4" />
        </Link>
        <a href={siteLinks.line} target="_blank" rel="noopener noreferrer" className="btn-outline text-base">
          <MessageCircle className="size-4 text-line" />
          {helper.line}
        </a>
      </div>

      <div role="group" aria-label={title} className="mt-10 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={active === filter.id}
            onClick={() => select(filter.id)}
            className={cn(
              'min-h-11 rounded-full border px-5 text-sm font-bold transition-colors',
              active === filter.id
                ? 'border-ring bg-accent text-primary-foreground'
                : 'border-border bg-popover text-secondary-foreground hover:border-ring'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const type = serviceTypes.find((t) => t.serviceIds.includes(service.id));
          const visible = active === 'all' || type?.id === active;
          return (
            <li key={service.id} hidden={!visible} style={{ viewTransitionName: `service-${service.id}` }}>
              <Link
                href={`/services/${service.id}`}
                className="group flex h-full flex-col rounded-[18px] border border-border bg-card p-6 shadow-[0_4px_20px_rgba(58,42,24,0.05)] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-ring"
              >
                {type && <span className="self-start rounded-full bg-accent px-3 py-0.5 text-sm font-bold text-accent-foreground">{type.label}</span>}
                <h2 className="mt-3 font-serif text-lg font-bold leading-snug text-card-foreground">{service.name}</h2>
                <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">{serviceBlurbs[service.id]}</p>
                <p className="mt-3 text-sm text-muted-foreground">{service.duration}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-base font-bold text-accent-foreground">
                  {itemLabel}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
