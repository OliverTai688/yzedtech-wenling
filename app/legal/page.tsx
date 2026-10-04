import LegalSection from '../../src/components/LegalSection';

export const metadata = {
  title: '免責聲明、隱私權政策與服務條款｜豐盛之翼學苑',
  description: '豐盛之翼學苑的網站服務與課程免責聲明、隱私權政策與服務條款。',
};

export default function LegalPage() {
  return (
    <div className="animate-fadeIn">
      <LegalSection />
    </div>
  );
}
