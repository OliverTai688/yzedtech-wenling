import MediaSection from '../../src/components/MediaSection';
import CtaBand from '../../src/components/CtaBand';

export const metadata = {
  title: '媒體專訪｜豐盛之翼學苑・出版品、Podcast 與直播訪談紀錄',
  description: '豐盛之翼學苑創辦人文齡老師的出版品、Podcast 專訪與直播訪談紀錄。',
};

export default function Page() {
  return (
    <>
      <MediaSection />
      <CtaBand />
    </>
  );
}
