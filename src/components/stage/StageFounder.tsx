import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import WingsCompass from '../brand/WingsCompass';
import { heroContent, homeContent } from '../../data';

// Slide 04 創辦人（RES-005 §3）。不釘住。
// 主角是拱形的照片位置（照片未到，RPT-001 G2）與身後的光、金翼：
// 舞台模式下，從 slide 03 飛上來的金翼羅盤在這裡交棒給拱形身後的這一個（timelines/founder.ts），
// 由小放大到位、羽毛由內而外依序張開（跟隨）。字幕是創辦人名稱與使命標題；使命宣言的引文直接顯示。
// 文字與連結同 home/HomeSections.tsx 的 FounderIntro。
export default function StageFounder({ id }: { id: string }) {
  const { eyebrow, missionLabel, missionTitle, mission, cta } = homeContent.founder;
  return (
    <section id={id} data-sec="founder" className="st-sec st-founder">
      <div className="st-founder__subject">
        <div className="st-founder__em" data-st="founder-em" aria-hidden="true">
          <WingsCompass />
        </div>
        <div className="st-arch" data-placeholder="founder-portrait" aria-hidden="true" />
      </div>
      <div className="st-sec__text" data-rvg>
        <p className="st-eye" data-rv>
          <span className="st-eye__n" aria-hidden="true">
            {homeContent.chapters.items[3].number}
          </span>
          {eyebrow}
        </p>
        <h2 className="st-cap" data-rv>
          {heroContent.portraitCaption}
        </h2>
        <p className="st-founder__lbl" data-rv>
          {missionLabel}｜{missionTitle}
        </p>
        <p className="st-founder__q" data-rv>
          {mission}
        </p>
        <div className="st-sec__act" data-rv>
          <Link href="/story" className="btn-outline text-base">
            {cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
