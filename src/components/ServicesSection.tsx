import Link from 'next/link';
import { Sparkles, Heart, Coins, Flame, Users, Compass, Wind, Flower2, ArrowRight } from 'lucide-react';
import { services } from '../data';

// PRD-002 §3.3 v1.1（2026-08-21，Batch E）：`/services` 改為只收錄能量療癒
// 8 項服務的獨立總覽頁，不再用 `activeTab` 切換希塔培訓／證照分類（那兩類已
// 移至 `/training` 總覽頁，見 TrainingSection.tsx）。卡片點擊改為導向各自的
// 詳細頁 `/services/[id]`（ServiceDetailClientPage.tsx），取代原本的
// `expandedServiceId` 原地展開／收合手風琴邏輯，因此本檔案不再需要
// useState／useEffect／AnimatePresence，可作為單純的伺服器端呈現元件。

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

        {/* Service Cards Grid — 圖片一律採用品牌漸層背景＋文字，不使用照片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = getIcon(service.iconName);

            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                id={`service-card-${service.id}`}
                className="group flex flex-col h-full bg-white rounded-2xl border border-stone-100 shadow-xs transition-all duration-300 hover:shadow-md hover:border-brand-pink-200"
              >
                {/* Brand gradient + text placeholder (no photography per PRD-002 §3.3) */}
                <div className="h-44 rounded-t-2xl relative overflow-hidden bg-linear-to-br from-brand-pink-100 via-brand-pink-50 to-brand-gold-100 flex items-center justify-center border-b border-stone-50">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-pink-600 group-hover:scale-105 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-brand-pink-500" />
                  </div>
                  <span className="absolute bottom-3 left-3 text-sm text-stone-500 font-semibold bg-white/80 px-2.5 py-1 rounded-full border border-stone-100/50">
                    {service.duration}
                  </span>
                </div>

                {/* Info Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-brand-stone-900 font-serif mb-2.5">
                    {service.name}
                  </h3>
                  <p className="text-base text-stone-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-stone-50 flex items-center gap-1.5 text-base font-semibold text-brand-pink-600 group-hover:text-brand-pink-700">
                    <span>查看完整介紹</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
