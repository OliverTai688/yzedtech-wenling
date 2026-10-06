import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { homeContent, services } from '../../data';
import { stageContent } from '../../content/stages';
import { track } from '@/lib/track';
import { RouteStageMore, ServiceMore } from './StageMore';
import type { OpenSheet } from './types';

// Slide 03 三階段與精選服務（RES-005 §3；構圖見 proposals/home-script/STAGE-LIGHT.md）。
// 金翼羅盤在畫面底部當原點，三條金線各連到一個圓點；先是三個階段，之後換成三項服務。
// 每個圓點是按鈕，點了才滑出原文與連結。一般頁面模式是兩份清單，內容直接顯示。
// 圓點、弧線與金線的位置由 timelines/routes.ts 依畫面大小計算。
export default function StageRoutes({ onMore }: { onMore: OpenSheet }) {
  const { heading, ids, moreLabel } = homeContent.services;
  const featured = ids.flatMap((id) => services.filter((service) => service.id === id));
  return (
    <section id="home-stages" data-chapter="home-stages" data-slide="routes" className="st-slide st-routes">
      <div className="st-stage">
        <div className="st-in">
          <svg className="st-fan" data-st="fan" aria-hidden="true" focusable="false">
            <path className="st-arc" />
            <path className="st-arc" />
            <line className="st-ray" />
            <line className="st-ray" />
            <line className="st-ray" />
          </svg>
          <div className="st-capzone">
            <span className="st-num" aria-hidden="true">
              {homeContent.chapters.items[2].number}
            </span>
            <div className="st-caps">
              <h2 className="st-cap st-later" data-cap="a">
                {stageContent.heading}
              </h2>
              <h2 className="st-cap st-later" data-cap="b" id="featured-services">
                {heading}
              </h2>
            </div>
            <div className="st-act st-later" data-cap="more">
              <Link href="/services" className="btn-outline text-sm">
                {moreLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ol className="st-nodes" data-set="stages" aria-label={stageContent.heading}>
            {stageContent.stages.map((stage, index) => (
              <li key={stage.title}>
                <button
                  type="button"
                  className="st-node"
                  data-node="stage"
                  onClick={(event) => {
                    track('stage_open', { stage: index + 1 });
                    onMore({ key: `stage-${index}`, title: stage.title, body: <RouteStageMore stage={stage} /> }, event.currentTarget);
                  }}
                >
                  <span className="st-node__in">
                    <span className="st-node__dot" aria-hidden="true" />
                    <span className="st-node__t">{stage.title}</span>
                  </span>
                </button>
                <RouteStageMore stage={stage} />
              </li>
            ))}
          </ol>
          <ul className="st-nodes" data-set="services" aria-label={heading}>
            {featured.map((service) => (
              <li key={service.id}>
                <button
                  type="button"
                  className="st-node"
                  data-node="service"
                  onClick={(event) =>
                    onMore({ key: `service-${service.id}`, title: service.name, body: <ServiceMore id={service.id} /> }, event.currentTarget)
                  }
                >
                  <span className="st-node__in">
                    <span className="st-node__dot" aria-hidden="true" />
                    <span className="st-node__t">{service.name}</span>
                  </span>
                </button>
                <ServiceMore id={service.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
