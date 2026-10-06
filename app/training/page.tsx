import TrainingSection from '../../src/components/TrainingSection';
import JourneyNext from '../../src/components/page/JourneyNext';
import CtaBand from '../../src/components/CtaBand';
import { pageMeta } from '../../src/data';

// 培訓課程總覽頁（PLN-006 P2；提案見 proposals/pages-v2/training）：希塔療癒三階課程與靈氣認證三門
// 以分頁切換，另有即將推出的直覺力培訓。
// <title> 與 description 是文案集原文，集中在 src/data.ts 的 pageMeta。
export const metadata = pageMeta.training;

export default function Page() {
  return (
    <>
      <TrainingSection />
      <JourneyNext route="/training" />
      <CtaBand />
    </>
  );
}
