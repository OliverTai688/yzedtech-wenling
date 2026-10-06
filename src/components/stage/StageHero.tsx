import { ArrowRight, Plus } from 'lucide-react';
import WingsCompass from '../brand/WingsCompass';
import { heroContent, homeContent } from '../../data';
import { HERO_OPEN } from './emblemGeo';
import { HeroMore } from './StageMore';
import type { OpenSheet } from './types';

// Slide 01 Hero（RES-005 §3）。主角是金翼羅盤；字幕是主標，捲動後換成眉標那一句。
// 主標與主按鈕在伺服器輸出的 HTML 裡、載入就看得到，不做透明進場。
// 內文、社群按鈕與三個信任標記：一般頁面模式直接顯示，舞台模式收在「＋」裡。
export default function StageHero({ onMore }: { onMore: OpenSheet }) {
  const { eyebrow, headlineLines, primaryCta } = heroContent;
  return (
    <section id="hero" data-chapter="hero" data-slide="hero" className="st-slide st-hero">
      <div className="st-stage">
        <div className="st-in">
          <div className="st-subject">
            <div className="st-hero__em" data-dock="hero">
              <WingsCompass open={HERO_OPEN} />
            </div>
          </div>
          <span className="st-floormark" aria-hidden="true" />
          <div className="st-capzone">
            <span className="st-num" aria-hidden="true">
              {homeContent.chapters.items[0].number}
            </span>
            <div className="st-caps">
              <h1 className="st-cap" data-cap="title">
                {headlineLines[0]}
                <br />
                {headlineLines[1]}
              </h1>
              <p className="st-cap st-cap--line st-later" data-cap="line">
                {eyebrow}
              </p>
            </div>
            <div className="st-act" data-cap="act">
              <a id="hero-primary-cta" href={primaryCta.href} className="gold-btn gold-sheen px-7 text-base font-bold">
                <span>{primaryCta.label}</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                className="st-disc st-plus"
                aria-label={eyebrow}
                onClick={(event) => onMore({ key: 'hero', title: eyebrow, body: <HeroMore inSheet /> }, event.currentTarget)}
              >
                <Plus aria-hidden="true" />
              </button>
            </div>
            <HeroMore />
          </div>
        </div>
      </div>
    </section>
  );
}
