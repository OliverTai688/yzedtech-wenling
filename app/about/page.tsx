import AboutStory from '../../src/components/AboutStory';
import CtaBand from '../../src/components/CtaBand';

export const metadata = {
  title: '關於我們｜豐盛之翼學苑・品牌理念與方法體系',
  description: '豐盛之翼學苑的品牌理念、14 項療癒與顯化技術方法體系，以及創辦人文齡老師介紹。',
};

export default function Page() {
  return (
    <>
      <AboutStory />
      <CtaBand />
    </>
  );
}
