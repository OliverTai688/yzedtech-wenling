import AboutStory from '../../src/components/AboutStory';

export const metadata = {
  title: '關於 Keila 文齡老師｜從數位行銷專案經理到國際雙證照療癒培訓導師',
  description: '詳細了解 Keila Wenling 文齡老師的生命故事。9 年外商數位行銷與專案管理歷練，結合美國希塔療癒官方認證導師資格與臼井靈氣三階療癒師認證，以最理性、嚴謹、溫柔的邏輯陪伴靈魂除錯。',
};

export default function AboutPage() {
  return (
    <div className="animate-fadeIn">
      <AboutStory />
    </div>
  );
}
