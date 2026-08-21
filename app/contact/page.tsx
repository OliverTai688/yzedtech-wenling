import ContactSection from '../../src/components/ContactSection';

export const metadata = {
  title: '線上諮詢意願預約單｜幸運教主 Keila 文齡療癒團隊',
  description: '想了解適合自己的療癒路徑，或諮詢近期開班梯次？歡迎在此填寫簡易聯絡意願表，我們將有溫柔的助理團隊在 24 小時內與您取得聯繫。',
};

export default function ContactPage() {
  return (
    <div className="animate-fadeIn">
      <ContactSection />
    </div>
  );
}
