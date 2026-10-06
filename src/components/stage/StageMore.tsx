import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { heroContent, homeContent, serviceBlurbs } from '../../data';
import type { Stage } from '../../content/stages';

// 各張 slide 的補充內容（RES-005 §2 規則 5）。同一份元件用在兩個地方：
// 一般頁面模式直接排在頁面裡；舞台模式收進「＋」打開的面板（StageSheet）。
// inSheet 為 true 時不輸出 id，避免與頁面裡的那一份重複。
type CtaLink = { label: string; href: string; external?: boolean };

export function CtaLinkButton({ cta, className, id }: { cta: CtaLink; className: string; id?: string }) {
  return cta.external ? (
    <a id={id} href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
      <span>{cta.label}</span>
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </a>
  ) : (
    <Link id={id} href={cta.href} className={className}>
      <span>{cta.label}</span>
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export function HeroMore({ inSheet = false }: { inSheet?: boolean }) {
  const { description, secondaryCta, trustBadges } = heroContent;
  return (
    <div className="st-more">
      <p className="st-more__soft">{description}</p>
      <div className="st-more__row">
        <CtaLinkButton
          id={inSheet ? undefined : 'hero-community-cta'}
          cta={{ ...secondaryCta, external: true }}
          className="st-lk"
        />
      </div>
      <ul className="st-more__badges">
        {trustBadges.map((badge) => (
          <li key={badge}>
            <Check aria-hidden="true" />
            {badge}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RouteStageMore({ stage }: { stage: Stage }) {
  return (
    <div className="st-more">
      <p>{stage.text}</p>
      {stage.service && (
        <Link href={`/services/${stage.service.id}`} className="st-lk">
          {stage.service.name}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

export function ServiceMore({ id }: { id: string }) {
  return (
    <div className="st-more">
      <p>{serviceBlurbs[id]}</p>
      <Link href={`/services/${id}`} className="st-lk">
        {homeContent.services.itemLabel}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
