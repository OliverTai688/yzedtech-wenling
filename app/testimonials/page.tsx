import TrustSystem from '../../src/components/TrustSystem';
import CtaBand from '../../src/components/CtaBand';
import JourneyNext from '../../src/components/page/JourneyNext';
import { pageMeta } from '../../src/data';

// <title> 與 description 是文案集原文，集中在 src/data.ts 的 pageMeta。
export const metadata = pageMeta.testimonials;

export default function Page() {
  return (
    <>
      <TrustSystem />
      <JourneyNext route="/testimonials" />
      <CtaBand />
    </>
  );
}
