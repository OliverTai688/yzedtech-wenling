import { Award, Shield, Gem, CheckCircle2, MessageCircle, ExternalLink } from 'lucide-react';
import { thetaTrainingCourses, certificationCourses } from '../data';
// 注意：舊的臼井靈氣獨立初/中/高階課程資料已依
// PRD-001 決策 #6（2026-08-18 使用者確認）移除，不建立可購買/報名的獨立
// 靈氣課程頁；臼井靈氣僅保留在 About「方法體系」表格中作為技術介紹。
// 本區塊依文案集 Block 4「Section 2：靈氣／希塔療癒培訓」呈現雙欄：
// 左欄希塔療癒系列、右欄靈氣認證系列（金錢／愛情／人魚靈氣，僅列已開放報名項目，
// 「直覺力訓練」為 coming-soon 狀態，改於 HomeIntuitionBanner 呈現）。
const liveCertificationCourses = certificationCourses.filter((c) => c.status !== 'coming-soon');

interface HomeTrainingSectionProps {
  onNavigateToTab: (tabId: string) => void;
}

export default function HomeTrainingSection({ onNavigateToTab }: HomeTrainingSectionProps) {
  return (
    <section id="training-section" className="py-20 md:py-28 bg-[#20140A] text-[#F5E4C8] border-b border-[#3A2A18]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E1D10] border border-[#F0C875]/30 text-[#F0C875] text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>國際官方雙認證培訓體系</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#FFFDF0] font-serif leading-snug">
            希塔療癒 官方認證證照班
          </h2>
          <p className="text-sm sm:text-base text-[#C7AE8A] leading-relaxed max-w-2xl mx-auto">
            不論您是渴望自主掌握身心自癒的小白，或是立志成為合格職業療癒師的助人工作者。由文齡老師親授，以最嚴謹、邏輯化的教學，帶您開啟大腦潛意識與神聖能量的連結。
          </p>
        </div>

        {/* 雙欄：希塔療癒系列（左）＋ 靈氣認證系列（右） */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-14 max-w-5xl mx-auto">

          {/* ThetaHealing 希塔療癒認證 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0C875]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#3A2409] border border-[#F0C875]/40 flex items-center justify-center text-[#F0C875]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-[#F0C875]">
                    美國 Think 官方 希塔療癒認證系列
                  </h3>
                  <p className="text-[11px] text-[#B49A76]">大腦 Theta 腦波切換 • 潛意識信念拔除與重塑</p>
                </div>
              </div>
              <span className="text-[10px] text-[#F0C875] bg-[#3A2409] px-2.5 py-1 rounded-full border border-[#F0C875]/30 hidden sm:inline">
                美國 Think 授權
              </span>
            </div>

            {/* Courses List */}
            <div className="space-y-4">
              {thetaTrainingCourses.map((course) => (
                <div key={course.id} className="dark-card p-6 rounded-2xl space-y-3.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10.5px] font-bold text-[#F0C875] tracking-wider uppercase bg-[#20140A]/80 px-2.5 py-0.5 rounded-full border border-[#F0C875]/30">
                        {course.level}
                      </span>
                      <h4 className="text-base font-bold font-serif text-[#FFFDF0] mt-2">
                        {course.name}
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#C7AE8A] bg-[#20140A] px-2.5 py-1 rounded-lg border border-[#F0C875]/20">
                      {course.duration}
                    </span>
                  </div>

                  <p className="text-xs text-[#C7AE8A] leading-relaxed">
                    {course.objective}
                  </p>

                  {/* Highlights Bullet points */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {course.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#F5E4C8]">
                        <CheckCircle2 className="w-3 h-3 text-[#F0C875] shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#F0C875]/15 flex items-center justify-between text-[11px]">
                    <span className="text-[#B49A76]">{course.certification}</span>
                    <a
                      href={course.ctaLink || 'https://lin.ee/yo6a6FW'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F0C875] hover:text-[#FFF] font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>報名此課程</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 靈氣認證系列（金錢／愛情／人魚靈氣） */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0C875]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#3A2409] border border-[#F0C875]/40 flex items-center justify-center text-[#F0C875]">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-[#F0C875]">
                    靈氣認證系列
                  </h3>
                  <p className="text-[11px] text-[#B49A76]">金錢／愛情／人魚靈氣 • 完訓即可接案或開課</p>
                </div>
              </div>
            </div>

            {/* Courses List */}
            <div className="space-y-4">
              {liveCertificationCourses.map((course) => (
                <div key={course.id} className="dark-card p-6 rounded-2xl space-y-3.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10.5px] font-bold text-[#F0C875] tracking-wider uppercase bg-[#20140A]/80 px-2.5 py-0.5 rounded-full border border-[#F0C875]/30">
                        {course.badge}
                      </span>
                      <h4 className="text-base font-bold font-serif text-[#FFFDF0] mt-2">
                        {course.name}
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#C7AE8A] bg-[#20140A] px-2.5 py-1 rounded-lg border border-[#F0C875]/20">
                      {course.duration}
                    </span>
                  </div>

                  <p className="text-xs text-[#C7AE8A] leading-relaxed">
                    {course.objective}
                  </p>

                  <div className="pt-3 border-t border-[#F0C875]/15 flex items-center justify-end text-[11px]">
                    <a
                      href={course.ctaLink || 'https://lin.ee/yo6a6FW'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F0C875] hover:text-[#FFF] font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>報名此課程</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Training CTA Banner within dark container */}
        <div className="bg-gradient-to-r from-[#3A2409] via-[#4A2F0A] to-[#3A2409] rounded-2xl border border-[#F0C875]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5">
            <h4 className="text-lg font-bold font-serif text-[#FFFDF0]">
              想了解自己適合從哪一個階級開始進修？
            </h4>
            <p className="text-xs sm:text-sm text-[#C7AE8A]">
              歡迎加入 LINE 官方社群或聯繫助理團隊，為您說明線上/實體開班日程與學員共修方案。
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => onNavigateToTab('contact')}
              className="gold-btn px-6 py-2.5 text-xs font-semibold"
            >
              填寫開班諮詢單
            </button>
            <a
              href="https://lin.ee/yo6a6FW"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#06C755] hover:bg-[#05b04b] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>LINE 一對一諮詢</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
