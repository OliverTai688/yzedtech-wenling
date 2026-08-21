import Link from 'next/link';
import { Sparkles, Award, GraduationCap, CheckCircle, Moon, ArrowLeft, Wallet, Heart, Mic } from 'lucide-react';

// /story 頁：完整的「我的故事」敘述與學經歷／證照總覽，拆分自原本合併於
// /about 的 AboutStory.tsx（依 PLN-002 Phase 4 建議，About／Story 分頁呈現）。
// 全文依 docs/網站文案集.md「03 | Story 我的故事」（第 397～534 行）改寫。
export default function StorySection() {
  // 依文案集「🎓 核心專業認證」（第 490～516 行）按四大類別彙整代表性認證，
  // 不逐條列出所有講師姓名／日期（原文承認「因檔案眾多，獨立一頁」）。
  const certificationGroups = [
    {
      category: '希塔療癒 (ThetaHealing®)',
      items: ['美國 THInK 總部官方認證療癒師（基礎／進階／深度挖掘）', '美國 THInK 總部官方認證導師（基礎／進階／深度挖掘／神與我／顯化與豐盛）']
    },
    {
      category: '靈氣與能量體系 (Reiki & Energy Healing)',
      items: ['金錢靈氣三階與導師認證', '鬱金香熱情靈氣療癒師與導師認證', '百花靈氣三階療癒師認證', '人魚靈氣／美人魚轉化靈氣療癒師與導師認證', '獨角獸靈氣二階、彩虹靈氣一階、煦陽靈氣、臼井靈氣三階療癒師']
    },
    {
      category: '高階能量與氣場修護',
      items: ['擴大療癒法 (Magnified Healing) 一階／二階與導師認證', '般尼克療癒 (Pranic Healing) 基礎／心理／高級／能量風水／水晶療癒師 — Institute For Inner Studies, Inc. 美國總部發證']
    },
    {
      category: '占卜分析與直覺力',
      items: ['靈擺冥想 (Pendulum)、生命靈數 (Numerology)', '直覺力導師認證']
    }
  ];

  // 依文案集「📚 學經歷與進修紀錄」（第 519～534 行）節錄代表性項目。
  const credentials = [
    { school: '台灣大學 政治學系', major: '學士畢業', year: '學歷背景' },
    { school: '外商數位行銷產業', major: '9 年資歷（田中系統顧問股份有限公司／美商艾比傑媒體行銷／法商陽獅媒體集團）', year: '前職涯背景' },
    { school: 'PMP 專案管理師・多益黃金證書', major: '國際專案管理與語言專業認證', year: '專業證照' },
    { school: '《好女人的情場攻略》Podcast', major: '2022 年收聽數冠軍・2024 年前十名', year: '媒體紀錄' },
    { school: '暢銷書《七週遇見對的人》改版推薦序', major: '唯一推薦序作者・《練愛大確幸》參與著作', year: '出版紀錄' }
  ];

  const giftItems = [
    { title: '靈通感知力的快速開發', desc: '原本自認是「麻瓜」的我，開始能清晰地看到畫面、感知能量、讀取訊息，能輕鬆同理、讀懂伴侶與他人的真實想法。' },
    { title: '生活除錯能力', desc: '面對偶爾不順心的事，我不再陷入情緒內耗，而是能迅速覺察背後的根本原因，並快速化解。' },
    { title: '心想事成的加速器', desc: '顯化速度大幅提升，吸引了許多極度契合的合作夥伴、客戶與學生來到生命中，並擁有源源不絕的靈感去實踐自己的熱忱。' },
    { title: '修復與支持身邊的人', desc: '大幅增加了與原本疏離的家人間的溫暖互動，也幫助身邊帶有靈通體質的好友學會接納自己的特質。' }
  ];

  return (
    <section id="story-section" className="py-20 bg-linear-to-b from-white via-brand-pink-50/10 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link href="/about" className="inline-flex items-center gap-1.5 text-base font-semibold text-stone-500 hover:text-brand-pink-600 mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回品牌理念與方法體系</span>
        </Link>

        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink-50 border border-brand-pink-100 text-brand-pink-600 text-sm font-semibold">
            <Moon className="w-3.5 h-3.5" />
            <span>03 | Story 我的故事</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif leading-tight">
            從全面崩塌到重生的轉折
          </h1>
        </div>

        <div className="text-base text-stone-600 space-y-6 leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-brand-stone-900 font-serif mb-2">▍ 跌入谷底：當人生的一切同時崩塌</h2>
            <p>
              2019 年的下半年，是我生命中最黑暗、也最無助的時刻。那段時間，所有的挑戰彷彿約好了一起降臨：家庭爆發爭吵與分裂、職場上背負沉重的誤會、外婆突然中風、感情深受創傷，我的身上甚至還背負了百萬的負債。
            </p>
            <p className="mt-3">
              那時的我，幾乎每天醒來都只想問蒼天：「為什麼這些事都發生在我身上？」深陷在受害者情緒與無力感中的我，覺得人生已經全面崩塌，找不到任何出路。
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-brand-stone-900 font-serif mb-2">▍ 轉折的契機：看見潛意識，找回內在的光</h2>
            <p>
              直到我接觸了「希塔療癒（ThetaHealing®）」，這成為了我生命的終極救贖與轉捩點。透過冥想進入 θ（Theta）腦波狀態，我終於鼓起勇氣，往自己的內心深處看去。我驚訝地發現，原來這一切外在的崩潰與停滯，都源自於我內在深層的限制性信念——在潛意識裡，我一直覺得自己「不值得被愛」、「不值得成功」。
            </p>
            <p className="mt-3">
              當我開始運用希塔療癒改寫這些信念，並徹底釋放積壓已久的恐懼與罪惡感後，不可思議的奇蹟開始在我的生命中一一顯化，人生迎來了全面的翻轉！
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-brand-stone-900 font-serif mb-2">▍ 蛻變與顯化：拿回生命主導權的奇蹟</h2>
            <p>清理了能量場的淤堵後，我的人生在極短的時間內發生了具體且震撼的改變：</p>
            <ul className="mt-3 space-y-2.5">
              <li className="flex items-start gap-2">
                <Wallet className="w-4 h-4 text-brand-gold-600 shrink-0 mt-0.5" />
                <span><strong className="text-brand-stone-900">財富的絕對大翻轉</strong>：我離開了長達 9 年的工作，全職投入療癒領域，僅僅第三個月的收入，就超過了過去當上班族的時期！我從背負百萬負債，成功翻轉為年收百萬。</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-brand-pink-500 shrink-0 mt-0.5" />
                <span><strong className="text-brand-stone-900">遇見 90% 契合的靈魂伴侶</strong>：因為終於學會不再害怕看自己、學會面對潛意識，我在半年內就遇見了符合我九成條件的靈魂伴侶。</span>
              </li>
              <li className="flex items-start gap-2">
                <Mic className="w-4 h-4 text-brand-gold-600 shrink-0 mt-0.5" />
                <span><strong className="text-brand-stone-900">影響力的擴展與肯定</strong>：我受邀至知名節目《好女人的情場攻略》、《美麗佳人 Podcast》分享我的蛻變故事，更榮幸成為暢銷書《七週遇見對的人》改版推薦序的唯一作者。</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-brand-stone-900 font-serif mb-2">▍ 意想不到的禮物：能量與靈性的全面躍升</h2>
            <p>這趟旅程帶給我的，遠不止於物質與感情的豐盛，還有許多無價的生命禮物：</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {giftItems.map((g, idx) => (
                <div key={idx} className="bg-brand-gold-50/40 rounded-xl p-4 border border-brand-gold-100">
                  <span className="font-bold text-brand-stone-900 block mb-1 text-base">{g.title}</span>
                  <p className="text-base text-stone-500 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-brand-stone-900 font-serif mb-2">▍ 我的使命：陪你重啟人生，走向真正的自由</h2>
            <div className="bg-brand-pink-50 border-l-4 border-brand-pink-500 p-4.5 rounded-r-2xl italic text-base text-brand-stone-800 leading-relaxed font-serif my-3">
              「真正的療癒，不是逃離現實，而是重新看見內在的光。」
            </div>
            <p>
              希塔療癒帶給我的，不只是生活條件的轉化，而是一種能量上真正的「自由」。現在，我每年累積破百次的個案療癒經驗，影響了至少 30 人踏上學習希塔療癒的道路，並協助無數人重啟人生。如果你也正經歷我曾經走過的黑夜，請相信：你本就具備翻轉生命的力量，而我，會在這裡陪你一起把它找回來。
            </p>
          </div>
        </div>

        {/* Credentials, education & Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Certifications Card */}
          <div className="bg-white rounded-2xl border border-stone-150 p-6 sm:p-8 hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-6">
              <div className="p-2.5 rounded-xl bg-brand-gold-100 text-brand-gold-600">
                <Award className="w-5 h-5 text-brand-gold-600" />
              </div>
              <h4 className="font-bold font-serif text-base text-brand-stone-900">導師專業資格與國際授權證照</h4>
            </div>
            <div className="space-y-5">
              {certificationGroups.map((group, gIdx) => (
                <div key={gIdx}>
                  <span className="text-sm font-bold text-brand-gold-600 uppercase tracking-wider block mb-2">{group.category}</span>
                  <ul className="space-y-2">
                    {group.items.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-base text-stone-600 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-brand-pink-500 shrink-0 mt-0.5" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Card */}
          <div className="bg-white rounded-2xl border border-stone-150 p-6 sm:p-8 hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-6">
              <div className="p-2.5 rounded-xl bg-brand-pink-100 text-brand-pink-600">
                <GraduationCap className="w-5 h-5 text-brand-pink-600" />
              </div>
              <h4 className="font-bold font-serif text-base text-brand-stone-900">學經歷與實踐軌跡</h4>
            </div>
            <div className="space-y-6">
              {credentials.map((cred, idx) => (
                <div key={idx} className="relative pl-5 border-l-2 border-brand-pink-100 space-y-1">
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-brand-pink-500 -left-[6px] top-1"></div>
                  <span className="text-sm text-brand-gold-600 font-bold block tracking-wider">{cred.year}</span>
                  <h5 className="font-bold text-base text-brand-stone-900">{cred.school}</h5>
                  <p className="text-base text-stone-500 leading-relaxed">{cred.major}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-linear-to-br from-brand-pink-50 to-brand-gold-50 rounded-3xl border border-brand-gold-150 p-8 sm:p-10 space-y-4">
          <Sparkles className="w-6 h-6 text-brand-gold-600 mx-auto" />
          <h4 className="font-bold font-serif text-base sm:text-lg text-brand-stone-900">如果你也正經歷我曾經走過的黑夜</h4>
          <p className="text-base text-stone-600 max-w-lg mx-auto">你本就具備翻轉生命的力量，而我，會在這裡陪你一起把它找回來。</p>
          <Link href="/services" className="gold-btn inline-flex items-center gap-1.5 px-6 py-3 text-base font-semibold">
            <span>瀏覽適合你的療癒服務</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
