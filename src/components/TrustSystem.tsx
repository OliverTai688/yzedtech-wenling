import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageHero from './page/PageHero';
import PageSection from './page/PageSection';
import ChipTabs from './page/ChipTabs';
import Pager from './page/Pager';
import { cardClass } from './PageHeader';
import { heroContent, homeContent, needEntries, pagesContent, services, testimonialQuotes } from '../data';

// 真實見證（PLN-006 P4；提案見 docs/06_research-and-design/proposals/pages-v2/testimonials）。
// 開關是 homeContent.testimonials.authorized（RPT-001 C1）。這是伺服器元件：開關關閉時，見證文字不進 HTML。
// - 未授權（目前）：第一個畫面只有頁名與唯一的按鈕，接著列三項服務當成去處。文案集沒有「見證整理中」的句子，
//   所以沒有導言，也不顯示見證區的標題。
// - 授權後：分類是分頁（ChipTabs），一類一次看一則（Pager），每一類帶一個相關服務的連結。
const rowsClass = 'divide-y divide-border/70 border-y border-border/70';
// .btn-text 不在 Tailwind 的 layer 裡，要改它的排列與顏色得加上 !
const rowLink = 'btn-text flex! w-full justify-between! gap-4! text-left text-base font-bold! text-card-foreground!';

// 分類對應到首頁的對象入口（needEntries 的 id），連結用該入口的第一個 CTA。只有對應關係，沒有新文字；待客戶確認。
const relatedNeed: Record<string, string> = {
  '感情／單身': 'love',
  '家庭／媽媽': 'family',
  '事業／企業主': 'business',
  '身心蛻變／其他': 'starter',
};

function RelatedLink({ category }: { category: string }) {
  const cta = needEntries.find((entry) => entry.id === relatedNeed[category])?.ctas[0];
  if (!cta) return null;
  return cta.external ? (
    <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn-text mt-2 text-base">
      {cta.label}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </a>
  ) : (
    <Link href={cta.href} className="btn-text mt-2 text-base">
      {cta.label}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

// 授權後的見證區：四個分類，一次一則
function Quotes() {
  const categories = [...new Set(testimonialQuotes.map((quote) => quote.category))];
  const items = categories.map((category, index) => {
    const quotes = testimonialQuotes.filter((quote) => quote.category === category);
    return {
      id: `c${index + 1}`,
      label: category,
      content: (
        <>
          <Pager labels={quotes.map((quote) => quote.source)} ariaLabel={category}>
            {quotes.map((quote) => (
              <figure key={quote.quote} className={`${cardClass} flex h-full flex-col p-6`}>
                <blockquote className="font-serif text-lg font-semibold leading-[1.8] text-card-foreground">「{quote.quote}」</blockquote>
                <figcaption className="eyebrow mt-auto pt-4">{quote.source}</figcaption>
              </figure>
            ))}
          </Pager>
          <RelatedLink category={category} />
        </>
      ),
    };
  });
  return <ChipTabs items={items} idPrefix="proof" ariaLabel={pagesContent.testimonials.title} />;
}

// 未授權時的去處：首頁精選的三項服務，加上全部服務
function ServiceLinks() {
  const featured = homeContent.services.ids.flatMap((id) => services.find((service) => service.id === id) ?? []);
  return (
    <>
      <ul className={rowsClass}>
        {featured.map((service) => (
          <li key={service.id} className="py-1">
            <Link href={`/services/${service.id}`} className={rowLink}>
              {service.name}
              <ArrowRight className="size-4 shrink-0 text-ring" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/services" className="btn-text mt-3 text-base">
        {pagesContent.testimonials.servicesLabel}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </>
  );
}

export default function TrustSystem() {
  const { authorized, heading, description } = homeContent.testimonials;

  return (
    <>
      <PageHero
        title={pagesContent.testimonials.title}
        lead={authorized ? description : undefined}
        action={{ label: heroContent.primaryCta.label, href: `/${heroContent.primaryCta.href}` }}
      />
      {authorized ? (
        <PageSection id="testimonial-quotes" title={heading} width="narrow">
          <Quotes />
        </PageSection>
      ) : (
        <PageSection id="testimonial-services" title={homeContent.services.heading} width="narrow">
          <ServiceLinks />
        </PageSection>
      )}
    </>
  );
}
