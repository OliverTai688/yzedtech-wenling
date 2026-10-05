import ContactSection from '../../src/components/ContactSection';
import CtaBand from '../../src/components/CtaBand';

export const metadata = {
  title: '聯絡我們｜豐盛之翼學苑',
  description: '透過官方 LINE、Email、Facebook 或 LINE 社群聯絡豐盛之翼學苑，洽詢服務、課程與合作。',
};

export default function Page() {
  return (
    <>
      <ContactSection />
      <CtaBand />
    </>
  );
}
