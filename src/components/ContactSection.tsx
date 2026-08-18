'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Sparkles, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'personal-1on1',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const servicesDropdown = [
    { value: 'personal-1on1', label: '心靈引渡人｜一對一個人能量療癒' },
    { value: 'spiritual-reading', label: '靈性解讀與能量療癒' },
    { value: 'spiritual-massage', label: '靈性按摩｜全域氣場修護與脈輪清理' },
    { value: 'group-healing', label: '人生推進器｜團體遠距療癒' },
    { value: 'workshop', label: '能量身心靈主題工作坊' },
    { value: 'smoke-prayer', label: '遠距煙供祈福儀式' },
    { value: 'abundance-reiki', label: '豐盛靈氣｜全方位能量調頻與願望顯化' },
    { value: 'five-elements-perfume', label: '五行香水供奉｜佛前加持版' },
    { value: 'theta-training', label: '希塔療癒認證培訓（現場/線上開課）' },
    { value: 'certifications', label: '金錢/愛情/人魚靈氣證照課程' },
    { value: 'other', label: '其他客製化需求 / 合作邀請' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', service: 'personal-1on1', message: '' });
      
      // Auto close success alert after 5s
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1200);
  };

  return (
    <section id="contact-section" className="py-20 bg-[#FBF1DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-center">
          
          {/* Left Column (5 Cols): Brand Quick contacts */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-brand-pink-600 font-bold">Contact Us</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif leading-tight">
              開啟您的心靈對齊，與豐盛好運接軌
            </h2>
            <div className="w-12 h-1 bg-linear-to-r from-brand-pink-300 to-brand-gold-300 rounded-full"></div>
            
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              對課程、療癒或煙供項目有任何疑問嗎？歡迎透過下方的表單直接發送您的需求，文齡老師與助理團隊將在 24 小時內回覆。
            </p>

            {/* Quick CTAs */}
            <div className="space-y-4 pt-4">
              
              {/* LINE card */}
              <a
                href="https://lin.ee/yo6a6FW"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#06C755]/10 border border-[#06C755]/30 hover:shadow-xs transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#06C755] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-stone-900">官方 LINE 社群與預約</h4>
                  <p className="text-xs text-stone-600 mt-0.5">即時發問、領取每週能量預報與公益調頻福利</p>
                </div>
              </a>

              {/* IG card — 文案集未提供官方 email，合作邀請一律導向 IG／LINE 官方管道 */}
              <a
                href="https://www.instagram.com/keila.healing1491"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-brand-pink-50 border border-brand-pink-100 hover:shadow-xs transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-brand-pink-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-stone-900">Instagram 私訊聯絡</h4>
                  <p className="text-xs text-stone-600 mt-0.5">@keila.healing1491 / 合作演講、機構合作邀請</p>
                </div>
              </a>

            </div>

            {/* Integrity statement */}
            <div className="bg-brand-gold-50 border border-brand-gold-200 p-4 rounded-xl flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-gold-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-stone-500 leading-relaxed">
                您的聯絡資料與留言內容將受到絕對的隱私保障。文齡療癒團隊絕不將您的個資洩漏、揭露、或轉售予任何第三方機構。
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols): Mock Contact Form */}
          <div className="lg:col-span-7 bg-brand-gold-50/30 border border-[#F0DFA0] rounded-3xl p-6 sm:p-8 shadow-2xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-brand-pink-100 to-transparent rounded-bl-full opacity-30"></div>
            
            <h3 className="font-bold font-serif text-base sm:text-lg text-brand-stone-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-pink-500" />
              填寫預約與諮詢意願表
            </h3>

            {/* Contact Form Container */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name field */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">您的稱呼 / 姓名 *</label>
                <input
                  type="text"
                  required
                  placeholder="請輸入您的姓名，如：林小姐 / Eva"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FFFDF0] rounded-xl border border-[#F0DFA0] focus:outline-hidden focus:ring-1 focus:ring-brand-pink-300"
                />
              </div>

              {/* Email field */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">電子信箱 *</label>
                <input
                  type="email"
                  required
                  placeholder="請輸入聯絡 Email，例如：yourname@mail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FFFDF0] rounded-xl border border-[#F0DFA0] focus:outline-hidden focus:ring-1 focus:ring-brand-pink-300"
                />
              </div>

              {/* Service Selection dropdown */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">感興趣的服務項目 *</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FFFDF0] rounded-xl border border-[#F0DFA0] focus:outline-hidden focus:ring-1 focus:ring-brand-pink-300"
                >
                  {servicesDropdown.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message field */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">留言內容 (可以簡述您目前的卡關或想要除錯的狀態) *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="請簡短描述您目前的生活/感情卡點，或您想預約、諮詢的梯次。文齡老師將親自查閱回信。"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FFFDF0] rounded-xl border border-[#F0DFA0] focus:outline-hidden focus:ring-1 focus:ring-brand-pink-300"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-linear-to-r from-brand-pink-500 to-brand-gold-500 hover:from-brand-pink-600 hover:to-brand-gold-600 text-white font-bold text-xs sm:text-sm tracking-widest rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>🚀 正在安全送出表單資訊...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white" />
                    <span>送出心靈預約意願單</span>
                  </>
                )}
              </button>

            </form>

            {/* Simulated Submit Success Alert Banner */}
            {submitSuccess && (
              <div className="absolute inset-x-6 bottom-6 bg-brand-gold-500 text-white p-4.5 rounded-2xl border border-brand-gold-600 shadow-xl animate-fadeIn flex flex-col items-center text-center space-y-1.5 z-10">
                <span className="text-xl">✓ 預約單送出成功</span>
                <p className="text-xs text-white/95 leading-relaxed font-medium">
                  感謝您的填寫！文齡老師與療癒團隊已安全收到您的意願，我們將盡快在 24 小時內與您取得信箱聯繫。
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
