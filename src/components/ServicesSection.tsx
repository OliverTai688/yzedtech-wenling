'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { homeContent, offeringsContent, serviceBlurbs, services, serviceTypes } from '../data';
import PageHero from './page/PageHero';
import PageSection from './page/PageSection';
import ChosenMark, { useChosenTarget } from './services/ChosenMark';

// 服務項目（PLN-006 P2；提案見 docs/06_research-and-design/proposals/pages-v2/services/）。
// - 第一個畫面：H1、一句導言（Home Block 3 副標）、類型篩選。清單頁沒有金色按鈕，每張卡的文字連結就是行動。
// - 一張卡＝名稱＋文案集 Home Block 3 的一句話＋一個文字連結；連結的可點範圍蓋滿整張卡。
// - 篩選沿用原本的做法：八張卡都在 HTML 裡，未選中的以 hidden 隱藏；切換時用 View Transitions 平滑移位
//   （不支援的瀏覽器直接切換）。沒有 JavaScript 時篩選列不顯示，八張卡全部列出。
// - 訪客在首頁選過對象時，那個對象的第一個 CTA 所指的服務排到最前面，並標上對象既有的短名。
// - 所有文字逐字取自文案集（offeringsContent.services、homeContent.services、serviceBlurbs）。
const cardShadow = 'shadow-[0_4px_20px_color-mix(in_srgb,var(--color-card-foreground)_5%,transparent)]';

export default function ServicesSection() {
  const [active, setActive] = useState<string>('all');
  const { title, allLabel, itemLabel } = offeringsContent.services;
  const target = useChosenTarget();

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
  const hrefOf = (id: string) => `/services/${id}`;
  // 排序是穩定的：選過的那一張移到最前面，其餘維持文案集的順序
  const ordered = target
    ? [...services].sort((a, b) => Number(hrefOf(b.id) === target.href) - Number(hrefOf(a.id) === target.href))
    : services;

  return (
    <>
      <PageHero title={title} lead={homeContent.services.description}>
        <div role="group" aria-label={title} className="flex flex-wrap justify-center gap-2 [html:not(.js)_&]:hidden">
          {filters.map((filter) => (
            <button key={filter.id} type="button" aria-pressed={active === filter.id} onClick={() => select(filter.id)} className="chip text-base">
              {filter.label}
            </button>
          ))}
        </div>
      </PageHero>

      <PageSection id="services-section" className="pb-12 pt-10 lg:pb-16 lg:pt-12">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ordered.map((service) => {
            const type = serviceTypes.find((t) => t.serviceIds.includes(service.id));
            const visible = active === 'all' || type?.id === active;
            const titleId = `service-${service.id}-name`;
            return (
              <li
                key={service.id}
                hidden={!visible}
                style={{ viewTransitionName: `service-${service.id}` }}
                className={`relative flex flex-col rounded-[18px] border border-border bg-card px-6 pb-4 pt-6 transition-colors duration-200 hover:border-ring has-[[data-chosen-mark]]:border-ring ${cardShadow}`}
              >
                <ChosenMark href={hrefOf(service.id)} className="mb-2" />
                <h2 id={titleId} className="font-serif text-lg font-bold leading-normal text-card-foreground md:text-xl">
                  {service.name}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{serviceBlurbs[service.id]}</p>
                <Link
                  href={hrefOf(service.id)}
                  aria-describedby={titleId}
                  className="btn-text mt-auto self-start text-base after:absolute after:inset-0 after:rounded-[18px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"
                >
                  {itemLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      </PageSection>
    </>
  );
}
