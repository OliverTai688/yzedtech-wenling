import { ShieldCheck, HelpCircle, AlertCircle } from 'lucide-react';

export default function LegalSection() {
  return (
    <section id="legal-section" className="py-20 bg-linear-to-b from-brand-stone-50 via-white to-brand-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Heading */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-sm uppercase tracking-widest text-brand-pink-600 font-bold">Legal / Disclaimer</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif">
            隱私權政策與服務使用條款
          </h2>
          <div className="w-12 h-1 bg-linear-to-r from-brand-pink-300 to-brand-gold-300 mx-auto rounded-full"></div>
          <p className="text-base text-stone-500">
            請您在預約、購買、或報名文齡老師的服務與課程前，務必詳閱以下條款。使用本網站代表您同意以下約定。
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl border border-stone-150 p-6 sm:p-10 space-y-10 shadow-2xs text-base text-stone-600 leading-relaxed">

          {/* Section 1: Privacy policy */}
          <div className="space-y-3.5">
            <h3 className="text-base font-bold text-brand-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-pink-500" />
              一、個人資料蒐集與隱私權保護政策
            </h3>
            <p>
              本品牌官網（幸運教主 文齡 Keila，以下簡稱本平台）極度重視您的個人隱私。我們僅在您填寫聯絡表單、購買外部商城服務或加入 LINE 社群時，依合法、必要原則蒐集您所主動提供的個人資料（包括：姓名、稱呼、電子信箱、通訊紀錄等）。
            </p>
            <p>
              本平台所蒐集之個人資料，僅限用於回覆諮詢意願、寄送開班通知、以及提供客製化調頻服務。我們絕不擅自將您的個資洩漏、揭露、轉移、或轉售予任何第三方無關機構。
            </p>
            <p>
              本平台可能使用一般性的網站流量統計工具，以了解整體使用狀況並優化使用者體驗；同時整合 LINE 官方帳號（<a href="https://lin.ee/yo6a6FW" target="_blank" rel="noopener noreferrer" className="text-brand-gold-600 underline">lin.ee/yo6a6FW</a>）作為即時諮詢與開班通知管道。這些服務可能會使用 Cookie 紀錄使用者行為，您可以隨時在瀏覽器設定中關閉或清除 Cookie。
            </p>
          </div>

          {/* Section 2: Terms of service */}
          <div className="space-y-3.5">
            <h3 className="text-base font-bold text-brand-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2.5">
              <HelpCircle className="w-4 h-4 text-brand-gold-600" />
              二、身心靈療癒服務之正確認知與免責條款
            </h3>

            <div className="bg-brand-pink-50/50 rounded-xl p-4.5 border border-brand-pink-100/50 space-y-2">
              <span className="text-base font-extrabold text-brand-pink-600 block flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                【重要聲明】非醫療、法律與財務之替代
              </span>
              <p className="text-base text-stone-600">
                本平台所提供之所有能量調頻項目、靈氣、希塔療癒諮詢、煙供祈福祝福，<b>均屬於靈性日常保養、心靈陪伴、情緒調和與自我覺察輔助工具。本平台之服務絕不涉及、亦絕不提供任何醫療診斷、藥物處方、精神疾病治療、心理諮商治療。</b>
              </p>
              <p className="text-base text-stone-600">
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
              <b>3. 預約與交易約定：</b> 本平台之一對一療癒、課程與相關服務，主要透過官方預約平台
              <a href="https://booking.wenling.tw/activities/soul-healing" target="_blank" rel="noopener noreferrer" className="text-brand-gold-600 underline">booking.wenling.tw</a>
              完成預約與付款。交易成立、時段異動及退款事宜，均依預約當下所載明之條款辦理，如有疑問歡迎透過官方 LINE 帳號與我們聯繫，我們將盡力協助您。
            </p>
          </div>

          {/* Section 3: intellectual property */}
          <div className="space-y-3.5">
            <h3 className="text-base font-bold text-brand-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2.5">
              <AlertCircle className="w-4 h-4 text-stone-500" />
              三、智慧財產權與著作權聲明
            </h3>
            <p>
              本平台刊登之所有文字、原創文案、插畫設計、品牌商標，其智慧財產權及著作權均屬「幸運教主 文齡 Keila」品牌創辦人或其授權之合作方所有；暢銷書《七週遇見對的人》內容之著作權則屬原出版社與原作者所有，本平台僅刊登文齡老師之推薦序身分介紹。
            </p>
            <p>
              未經書面許可，任何人不得擅自將本平台內容進行重製、改作、公開傳輸、或用於任何商業銷售目的。尊重智慧財產權，是維護美好能量循環與正面頻率最好的方式。
            </p>
          </div>

        </div>

        {/* Closing note */}
        <div className="text-center text-sm text-stone-400 mt-6 italic">
          * 最近更新修訂日期：2026 年 7 月 6 日
        </div>

      </div>
    </section>
  );
}
