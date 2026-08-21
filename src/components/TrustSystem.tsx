'use client';

import { Users, Coins, Sparkles, ShieldAlert, Clock } from 'lucide-react';
import { InfoPopover } from '@/components/ui/info-popover';

// 2026-08-18 本輪瀏覽器視覺 QA 發現：原本 `testimonials`（見 ../data.ts）內的 4 位具名客戶
// （姓名／居住地／職業／完整前後對照故事）在 docs/網站文案集.md 裡完全查無出處——文案集只有
// 4 句匿名的一行見證，沒有姓名、城市、職業或完整故事。且下方原本有一段文字聲稱這些見證
// 「均獲得當事人去識別化同意後公開刊登」，但見證內容本身是虛構的，等同不實聲明。
// 依使用者指示（2026-08-18）：先隱藏整段具名見證卡片與該聲明，待有真實個案資料後再啟用。
// 若要復原，將下方註解掉的 import 與渲染區塊還原即可：
// import { testimonials } from '../data';

export default function TrustSystem() {

  // 依文案集 Story 區「現在，我每年累積破百次的個案療癒經驗，影響了至少30人踏上
  // 學習希塔療癒的道路」（第 436 行）與 Hero「整合希塔療癒、14 種以上靈氣與顯化技術」
  // （第 113 行）改寫，移除原本查無出處的「5億級企業業績」「100+ 位個案」等數字。
  const stats = [
    {
      id: 1,
      icon: Users,
      value: '破百次／年',
      label: '個案療癒陪伴經驗',
      description: '每年累積破百次的個案療癒經驗，陪伴媽媽、單身人士及企業主找回穩定與安全感。'
    },
    {
      id: 2,
      icon: Coins,
      value: '30+ 位',
      label: '學生踏上希塔療癒學習之路',
      description: '影響至少 30 人正式踏上學習希塔療癒的道路。'
    },
    {
      id: 3,
      icon: Sparkles,
      value: '14 種以上',
      label: '靈氣與顯化技術整合體系',
      description: '結合希塔療癒、金錢／豐盛／愛情／人魚靈氣、人生推進器、煙供、香水供等技術。'
    }
    // 原第 4 項統計卡（'7週陪伴' / 《七週遇見對的人》課程）已依 PRD-001 決策 #5
    // （2026-08-18 使用者確認）移除，因其內容完全建立在已下架的課程產品上。
    // 若之後想以「暢銷著作《七週遇見對的人》」重新呈現一張書籍主題卡，需先從
    // 文案集取得可用文案，不得杜撰代寫（見 PLN-002 §5.1）。
  ];

  return (
    <section id="testimonials-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Achievements stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => {
            const IconComp = stat.icon;
            return (
              <div key={stat.id} className="relative bg-brand-gold-50/50 rounded-2xl border border-brand-pink-100 p-6 flex flex-col justify-between hover:shadow-xs hover:border-brand-pink-200 transition-all duration-300">
                <InfoPopover label="數據來源說明" className="absolute top-3 right-3">
                  * 數據與經驗源自個案累積與受眾回饋示意
                </InfoPopover>
                <div className="space-y-4">
                  <div className="p-3 bg-white shadow-xs rounded-xl inline-block text-brand-pink-500">
                    <IconComp className="w-5 h-5 text-brand-pink-600" />
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold font-serif text-brand-stone-900 block tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-sm font-bold text-brand-gold-600 block mt-1">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-base text-stone-600 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-sm uppercase tracking-widest text-brand-pink-600 font-bold">Case Studies</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif">
            聽聽他們的真實轉化：從卡關到看見光
          </h2>
          <div className="w-12 h-1 bg-linear-to-r from-brand-pink-300 to-brand-gold-300 mx-auto rounded-full"></div>
          <p className="text-base text-stone-600 leading-relaxed">
            每一個案例都是真實生命的舒展與蛻變。以下呈現個案接受療癒、祈福或加入課程後的原原本本心路歷程。
          </p>
        </div>

        {/* 具名見證卡片區塊已暫時隱藏（見檔案頂部說明），改為誠實的「籌備中」提示，
            避免展示查無出處的虛構客戶故事。 */}
        <div className="max-w-3xl mx-auto bg-brand-gold-50/40 border border-brand-gold-150 rounded-2xl p-8 sm:p-10 text-center space-y-3 mb-12">
          <Clock className="w-6 h-6 text-brand-gold-600 mx-auto" />
          <h3 className="font-bold font-serif text-base text-brand-stone-900">真實個案見證整理中</h3>
          <p className="text-base text-stone-600 leading-relaxed max-w-xl mx-auto">
            我們正在向個案取得正式授權與去識別化整理，確保每一則見證都真實可查證。完整的個案故事上線前，
            歡迎透過 LINE 官方帳號或 Instagram 私訊直接詢問文齡老師過往的服務經驗。
          </p>
        </div>

        {/* Global Testimonials Note / Disclaimer Banner */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 flex items-start gap-4 max-w-4xl mx-auto shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-brand-gold-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-base font-bold text-brand-stone-900">身心靈能量陪伴之誠實守則</h5>
            <p className="text-base text-stone-500 leading-relaxed">
              能量療癒與諮詢服務均為心靈保養與宇宙共振之日常輔助，旨在引導自我覺察與放鬆調和。<strong>本站服務絕不提供任何醫療診斷、藥物處方、心理諮商治療、法律訴訟、或投資與財務獲利建議。</strong> 如有身體或心理重大疾病，請優先就醫，為自身的身心決策承擔健康主權。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
