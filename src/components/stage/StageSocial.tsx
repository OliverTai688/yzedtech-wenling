import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import WingsMark from '../brand/WingsMark';
import { homeContent, resources } from '../../data';

// Slide 06 社群（RES-005 §3）。不釘住。主角是社群密碼的六個數字，進入畫面時依序翻出。
// 數字取自既有文案（resources 第一項的「加入密碼：168168」），不另外寫字；金翼縮成小標誌停在標題旁。
// 文字與連結同 home/HomeSections.tsx 的 ResourcesBand。
export default function StageSocial({ id }: { id: string }) {
  const [community] = resources.steps;
  const highlight = community.highlight ?? '';
  const digits = (highlight.match(/\d/g) ?? []).slice(0, 6);
  const label = highlight.replace(/\d+\s*$/, '');
  return (
    <section id={id} data-sec="social" className="st-sec st-social">
      <p className="st-code" data-rvg>
        <span className="sr-only">{highlight}</span>
        <span className="st-code__lbl" aria-hidden="true" data-rv>
          {label}
        </span>
        <span className="st-code__digits" aria-hidden="true">
          {digits.map((digit, index) => (
            <span key={index} className="st-digit" style={{ '--i': index } as CSSProperties}>
              {digit}
            </span>
          ))}
        </span>
      </p>
      <div className="st-sec__text" data-rvg>
        <p className="st-eye" data-rv>
          <WingsMark className="st-eye__mark" />
          {homeContent.resources.eyebrow}
        </p>
        <h2 className="st-cap" data-rv>
          {community.title}
        </h2>
        <p className="st-social__intro" data-rv>
          {resources.intro}
        </p>
        <div className="st-sec__act" data-rv>
          <a href={community.ctaLink} target="_blank" rel="noopener noreferrer" className="gold-btn gold-sheen px-6 text-base font-bold">
            <span>{community.ctaText}</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <Link href="/resources" className="st-lk">
            {homeContent.resources.moreLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
