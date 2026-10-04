import MediaSection from '../../src/components/MediaSection';

// PRD-003 §4.7（PLN-004 Batch A4）：媒體專訪獨立頁。資料來自 src/data.ts 的
// mediaPublications／mediaShows／mediaPartners（文案集 v2 Home Block 7 與 Media 頁）。
export const metadata = {
  title: '媒體專訪｜豐盛之翼學苑・出版品、Podcast 與直播訪談紀錄',
  description: '豐盛之翼學苑創辦人文齡老師的出版品、Podcast 專訪與直播訪談紀錄。',
};

export default function Page() {
  return (
    <div className="animate-fadeIn">
      <MediaSection variant="full" />
    </div>
  );
}
