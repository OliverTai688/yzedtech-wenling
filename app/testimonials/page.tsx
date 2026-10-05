import TrustSystem from '../../src/components/TrustSystem';

export const metadata = {
  title: '客戶見證｜豐盛之翼學苑',
  description: '豐盛之翼學苑的客戶見證整理中，完整個案故事將於取得授權後公開。',
};

export default function TestimonialsPage() {
  return (
    <div className="animate-fadeIn">
      <TrustSystem />
    </div>
  );
}
