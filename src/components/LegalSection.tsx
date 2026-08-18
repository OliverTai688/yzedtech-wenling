import { ShieldCheck, HelpCircle, AlertCircle } from 'lucide-react';

export default function LegalSection() {
  return (
    <section id="legal-section" className="py-20 bg-[#FBF1DD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Heading */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-brand-pink-600 font-bold">Legal / Disclaimer</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif">
            隱私權政策與服務使用條款
          </h2>
          <div className="w-12 h-1 bg-linear-to-r from-brand-pink-300 to-brand-gold-300 mx-auto rounded-full"></div>
          <p className="text-xs text-stone-500">
            請您在預約、購買、或報名文齡老師的服務與課程前，務必詳閱以下條款。使用本網站代表您同意以下約定。
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-[#FDF6E6] rounded-3xl border border-[#F0DFA0] p-6 sm:p-10 space-y-10 shadow-2xs text-xs text-stone-600 leading-relaxed">
          
          {/* Section 1: Privacy policy */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold text-brand-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-pink-500" />
              一、個人資料蒐集與隱私權保護政策
            </h3>
            <p>
              本品牌官網（幸運療癒師 Keila Wenling 文齡，以下簡稱本平台）極度重視您的個人隱私。我們僅在您填寫聯絡表單、購買外部商城服務或加入 LINE 社群時，依合法、必要原則蒐集您所主動提供的個人資料（包括：姓名、稱呼、電子信箱、通訊紀錄等）。
            </p>
            <p>
              本平台所蒐集之個人資料，僅限用於回覆諮詢意願、寄送開班通知、以及提供客製化調頻服務。我們絕不擅自將您的個資洩漏、揭露、轉移、或轉售予任何第三方無關機構。
            </p>
            <p>
              本平台使用 Google Analytics 4 (GA4) 進行匿名流量統計與使用者路徑分析，並整合 LINE 官方社群與第三方 Shopify 商城系統以優化使用者體驗。這些第三方服務可能會使用 Cookie 紀錄使用者行為，您可以隨時在瀏覽器設定中關閉或清除 Cookie。
            </p>
          </div>

          {/* Section 2: Terms of service */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold text-brand-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2.5">
              <HelpCircle className="w-4 h-4 text-brand-gold-600" />
              二、身心靈療癒服務之正確認知與免責條款
            </h3>
            
            <div className="bg-brand-pink-50/50 rounded-xl p-4.5 border border-brand-pink-100/50 space-y-2">
              <span className="text-[11px] font-extrabold text-brand-pink-600 block flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                【重要聲明】非醫療、法律與財務之替代
              </span>
              <p className="text-[11px] text-stone-600">
                本平台所提供之所有能量調頻項目、靈氣、希塔療癒諮詢、煙供祈福祝福，<b>均屬於靈性日常保養、心靈陪伴、情緒調和與自我覺察輔助工具。本平台之服務絕不涉及、亦絕不提供任何醫療診斷、藥物處方、精神疾病治療、心理諮商治療。</b>
              </p>
              <p className="text-[11px] text-stone-600">
                本平台所有提到之「豐盛」、「愛情」、「金錢」、「關係調整」等描述，<b>均不屬於亦不能替代專業的法律訴訟建議、稅務規劃、商業決策、或理財與投資收益承諾。</b> 任何因能量調整而產生的生活啟發，均需使用者維持個人之理性思考與現實努力。
              </p>
            </div>

            <p>
              <b>1. 效果之主觀與不確定性：</b> 因每個人潛意識卡點深度、信念重組程度、以及生命功課與投入努力之不同，能量療癒與陪伴課程的感受與成果均存在高度個人主觀差異，<b>本平台絕不對任何感情挽回、特定對象脫單、業績翻倍、或財富收益做出任何百分之百的保證效果或合約宣稱。</b>
            </p>
            
            <p>
              <b>2. 身心健康之自我主權：</b> 若您當前正面臨嚴重之身體疾病、憂鬱、恐慌或其他精神、心理障礙，本平台強烈建議您必須優先前往各大正規醫療機構尋求專業合格醫師、臨床/諮商心理師之醫學診斷與系統治療。您必须秉持理智，並為自己的生命選擇與身心安全負完全責任。
            </p>

            <p>
              <b>3. 商城交易約定：</b> 本平台之課程與實體商品購買主要連結至外部合法第三方商城系統（如 Shopify、藍新金流等）。交易成立、退換貨規範及退款手續，均依該第三方商城之交易合約條款辦理，本平台提供最友善之聯絡諮詢窗口以支持您的消費權益。
            </p>
          </div>

          {/* Section 3: intellectual property */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold text-brand-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2.5">
              <AlertCircle className="w-4 h-4 text-stone-500" />
              三、智慧財產權與著作權聲明
            </h3>
            <p>
              本平台刊登之所有文字、原創文案、插畫設計、品牌商標，其智慧財產權及著作權均屬「幸運療癒師 Keila Wenling 文齡」品牌創辦人或其授權之合作方所有；暢銷書《七週遇見對的人》內容之著作權則屬原出版社與原作者所有，本平台僅刊登文齡老師之推薦序身分介紹。
            </p>
            <p>
              未經書面許可，任何人不得擅自將本平台內容進行重製、改作、公開傳輸、或用於任何商業銷售目的。尊重智慧財產權，是維護美好能量循環與正面頻率最好的方式。
            </p>
          </div>

        </div>

        {/* Closing note */}
        <div className="text-center text-[10px] text-stone-400 mt-6 italic">
          * 最近更新修訂日期：2026 年 7 月 6 日
        </div>

      </div>
    </section>
  );
}
