import Link from 'next/link';
import { Sparkles, Heart, Coins, Flame, Users, Compass, Wind, Flower2, ArrowRight } from 'lucide-react';
import { services } from '../data';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// PRD-002 §3.3 v1.1（2026-08-21，Batch E）：`/services` 改為只收錄能量療癒
// 8 項服務的獨立總覽頁，不再用 `activeTab` 切換希塔培訓／證照分類（那兩類已
// 移至 `/training` 總覽頁，見 TrainingSection.tsx）。卡片點擊改為導向各自的
// 詳細頁 `/services/[id]`（ServiceDetailClientPage.tsx），取代原本的
// `expandedServiceId` 原地展開／收合手風琴邏輯，因此本檔案不再需要
// useState／useEffect／AnimatePresence，可作為單純的伺服器端呈現元件。
//
// 2026-08-22（客戶回報重疊 bug＋設計系統要求）：卡片改用 shadcn/ui 的
// Card／CardHeader／CardTitle／CardContent／CardFooter＋Badge 重寫，時長徽章
// 從原本疊在漸層圖片上的 `absolute bottom-3 left-3` 手法，改成 CardHeader
// 內的正常文件流（Badge 在上、標題在下，各自獨立一行），不論標題或徽章文字
// 多長、是否換行，兩者都不會互相覆蓋。Card／Badge 為求視覺與既有品牌配色
// 一致，個別覆寫了 className（專案的 shadcn 色彩 tokens 目前尚未在
// app/globals.css 的 @theme 定義 --color-primary／--color-card 等變數，
// 沿用預設 variant 顏色會呈現無色/透明，因此改用專案既有的 brand-* 色階）。

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sparkles': return Sparkles;
    case 'Users': return Users;
    case 'Compass': return Compass;
    case 'Flame': return Flame;
    case 'Coins': return Coins;
    case 'Heart': return Heart;
    case 'Wind': return Wind;
    case 'Flower2': return Flower2;
    default: return Sparkles;
  }
};

export default function ServicesSection() {
  return (
    <section id="services-section" className="py-20 bg-linear-to-b from-brand-stone-50 via-brand-pink-50/10 to-brand-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-sm uppercase tracking-widest text-brand-pink-600 font-bold">Offerings</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif">
            核心能量調頻服務：打造您的豐盛生活軌道
          </h2>
          <div className="w-12 h-1 bg-linear-to-r from-brand-pink-300 to-brand-gold-300 mx-auto rounded-full"></div>
          <p className="text-base text-stone-600">
            從一對一深度療癒、靈性解讀，到主題工作坊與遠距能量調頻，陪伴你在生活的各個維度中除錯，回歸穩定。若想了解希塔療癒與靈氣培訓／證照課程，請前往
            {' '}
            <Link href="/training" className="text-brand-pink-600 font-semibold hover:text-brand-pink-700 underline underline-offset-2">
              培訓總覽頁
            </Link>
            。
          </p>
        </div>

        {/* Service Cards Grid — 圖片一律採用品牌漸層背景＋文字，不使用照片。
            RWD：手機 1 欄／平板（sm-md）2 欄／桌機（lg 以上）3 欄。 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const IconComponent = getIcon(service.iconName);

            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                id={`service-card-${service.id}`}
                className="group block h-full"
              >
                {/* 卡片外殼：漸層圖示區塊置頂＋下方文字內容，全部走正常文件流，
                    不使用 absolute 疊加，因此不會有徽章蓋住標題的風險。 */}
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-xs transition-all duration-300 group-hover:shadow-md group-hover:border-brand-pink-200">

                  {/* Brand gradient + icon placeholder (no photography per PRD-002 §3.3) */}
                  <div className="relative h-40 sm:h-44 shrink-0 overflow-hidden bg-linear-to-br from-brand-pink-100 via-brand-pink-50 to-brand-gold-100 flex items-center justify-center border-b border-stone-50">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-pink-600 group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-brand-pink-500" />
                    </div>
                  </div>

                  <Card className="flex flex-1 flex-col rounded-none border-0 bg-transparent p-0 shadow-none ring-0">
                    <CardHeader className="gap-2 px-5 pt-5 sm:px-6">
                      {/* 時長徽章：獨立一行、正常文件流，不論標題多長都不會被蓋到 */}
                      <Badge
                        variant="outline"
                        className="h-auto w-fit whitespace-normal break-words rounded-full border-brand-pink-200 bg-brand-pink-50 px-2.5 py-1 text-sm font-semibold text-brand-pink-600"
                      >
                        {service.duration}
                      </Badge>
                      <CardTitle className="text-lg font-bold font-serif leading-snug text-brand-stone-900">
                        {service.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 px-5 sm:px-6">
                      <p className="text-base text-stone-600 leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>

                    <CardFooter className="mt-auto border-t border-stone-50 bg-transparent px-5 py-4 sm:px-6">
                      <span className="inline-flex items-center gap-1.5 text-base font-semibold text-brand-pink-600 group-hover:text-brand-pink-700">
                        <span>查看完整介紹</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </CardFooter>
                  </Card>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
