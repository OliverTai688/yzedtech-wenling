import ContactSection from '../../src/components/ContactSection';
import JourneyNext from '../../src/components/page/JourneyNext';
import CtaBand from '../../src/components/CtaBand';
import { pageMeta } from '../../src/data';

// <title> 與 description 是文案集原文，集中在 src/data.ts 的 pageMeta。
export const metadata = pageMeta.contact;

export default function Page() {
  return (
    <>
      <ContactSection />
      <JourneyNext route="/contact" />
      <CtaBand />
    </>
  );
}
