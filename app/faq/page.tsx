import FAQSection from '../../src/components/FAQSection';

export const metadata = {
  title: '常見問題 FAQ｜理性療癒觀念對齊與正確認知聲明',
  description: '收錄媽媽、單身者、與企業主在預約前最常見的疑惑。秉持專業倫理與誠實原則，提供不浮誇、不保證療效、安全客觀的心態指南與免責說明。',
};

export default function FAQPage() {
  return (
    <div className="animate-fadeIn">
      <FAQSection />
    </div>
  );
}
