import { MessageCircle, Check, ArrowRight } from 'lucide-react';
import { heroContent } from '../../data';

// 首頁 Hero（RES-002 §1：採提案 A 的奶油底編排）。文案來自 heroContent（文案集 v2 Home Block 1）。
// - 主標題與按鈕不做透明進場，載入就看得到（RES-003：速度與 CTA 可及性優先）。
// - 主按鈕是錨點，滑到需求入口；進場後金光掃過一次。
// - 右側圓框是創辦人形象照的位置，照片到位前只顯示光感底（RPT-001 G2）。
export default function HomeHero() {
  const { eyebrow, headlineLines, description, primaryCta, secondaryCta, trustBadges, portraitCaption } = heroContent;

  return (
    <section id="hero" className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(252,231,168,0.85),rgba(252,231,168,0.35)_55%,transparent)]"
      />
      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-6 py-12 md:py-20 lg:grid-cols-12 lg:gap-8 lg:px-10">

        <div className="space-y-6 lg:col-span-7">
          <p className="eyebrow">{eyebrow}</p>

          <h1 className="font-serif text-[32px] font-bold leading-[1.25] tracking-tight text-card-foreground sm:text-[40px] lg:text-[46px]">
            {headlineLines[0]}
            <br />
            <span className="gold-text-gradient">{headlineLines[1]}</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
            <a href={primaryCta.href} className="gold-btn gold-sheen px-7 text-base font-bold" id="hero-primary-cta">
              <span>{primaryCta.label}</span>
              <ArrowRight className="size-4" />
            </a>
            <a
              href={secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm"
              id="hero-community-cta"
            >
              <MessageCircle className="size-4 text-line" />
              <span>{secondaryCta.label}</span>
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
            {trustBadges.map((badge) => (
              <li key={badge} className="flex items-center gap-1.5">
                <Check className="size-4 shrink-0 text-ring" />
                <span>{badge}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-5 lg:col-span-5">
          <div className="relative size-56 sm:size-72 lg:size-80" data-placeholder="founder-portrait" aria-hidden="true">
            <div className="absolute -inset-5 rounded-full border border-dashed border-ring/30" />
            <div className="absolute -inset-2 rounded-full border border-border" />
            <div className="absolute inset-0 rounded-full border-4 border-popover bg-[radial-gradient(circle_at_50%_40%,#FFFDF0,#FCE7A8_70%,#F5D98A)] shadow-[0_20px_60px_rgba(201,134,46,0.25)]" />
            <span className="sparkle left-[12%] top-[8%] size-2.5" style={{ animationDelay: '0s' }} />
            <span className="sparkle bottom-[14%] right-[6%] size-2" style={{ animationDelay: '1.4s' }} />
          </div>
          <p className="text-center text-sm font-semibold text-secondary-foreground">{portraitCaption}</p>
        </div>

      </div>
    </section>
  );
}
