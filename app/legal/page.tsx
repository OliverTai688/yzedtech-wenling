import LegalSection from '../../src/components/LegalSection';

export const metadata = {
  title: '隱私權保護政策、免責聲明與服務使用條款',
  description: '幸運療癒師 Keila Wenling 文齡官方合約政策。保障個資隱私，並明確界定身心靈能量陪伴非醫療、諮商、法律或財務建議之基本誠實立場。',
};

export default function LegalPage() {
  return (
    <div className="animate-fadeIn">
      <LegalSection />
    </div>
  );
}
