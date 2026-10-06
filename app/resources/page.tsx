import ResourcesSection from '../../src/components/ResourcesSection';
import JourneyNext from '../../src/components/page/JourneyNext';
import CtaBand from '../../src/components/CtaBand';
import StickyCtaBar from '../../src/components/StickyCtaBar';
import { heroContent, pageMeta, uiLabels } from '../../src/data';

// <title> 與 description 是文案集原文，集中在 src/data.ts 的 pageMeta。
export const metadata = pageMeta.resources;

export default function Page() {
  const { label, href } = heroContent.secondaryCta;
  return (
    <>
      <ResourcesSection />
      <JourneyNext route="/resources" />
      <CtaBand />
      {/* 手機底部固定列：這一頁唯一的行動（加入免費社群），捲過第一個畫面後出現 */}
      <StickyCtaBar primary={{ label, href, external: true }} lineLabel={uiLabels.lineShort} />
    </>
  );
}
