import LegalSection from '../../src/components/LegalSection';
import CtaBand from '../../src/components/CtaBand';
import { pageMeta } from '../../src/data';

// <title> 與 description 是文案集原文，集中在 src/data.ts 的 pageMeta。
export const metadata = pageMeta.legal;

export default function Page() {
  return (
    <>
      <LegalSection />
      <CtaBand />
    </>
  );
}
