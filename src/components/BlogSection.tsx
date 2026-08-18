'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Clock, ArrowRight, BookOpen, MessageCircle, X, Sparkles } from 'lucide-react';
import { blogPosts } from '../data';
import { BlogPost } from '../types';

interface BlogSectionProps {
  initialSearchQuery?: string;
}

export default function BlogSection({ initialSearchQuery = '' }: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', name: '全部文章' },
    { id: '愛情', name: '愛情與親密關係' },
    { id: '財運', name: '金錢與豐盛信念' },
    { id: '豐盛靈氣', name: '日常能量清理' },
    { id: '事業', name: '企業主心靈護航' },
    { id: '心路歷程', name: '文齡的生命自白' },
    { id: '個案成長', name: '個案陪伴紀實' }
  ];

  const handlePostClick = (post: BlogPost) => {
    setReadingPost(post);
    // Scroll modal to top
    setTimeout(() => {
      const element = document.getElementById('blog-reader-modal-top');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog-section" className="py-20 bg-[#FBF1DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-pink-600 font-bold">Blog / Insights</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-stone-900 font-serif">
            文齡的療癒隨筆：看見生命的另一種可能
          </h2>
          <div className="w-12 h-1 bg-linear-to-r from-brand-pink-300 to-brand-gold-300 mx-auto rounded-full"></div>
          <p className="text-sm text-stone-600">
            不談迷信玄虛，文齡老師在此以最白話、溫暖、且有邏輯的文字，分享潛意識改寫心法、日常脈輪調理、以及真實陪伴個案的暖心成長故事。
          </p>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="bg-[#FDF6E6] rounded-3xl border border-[#F0DFA0] p-6 shadow-2xs max-w-4xl mx-auto mb-14 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Bar */}
            <div className="md:col-span-6 relative">
              <input
                type="text"
                placeholder="輸入關鍵字搜尋，例如「愛情」、「能量」..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-brand-stone-50 rounded-full border border-stone-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-300 text-xs sm:text-sm"
              />
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-stone-400 hover:text-stone-800 text-xs font-bold"
                >
                  ✕ 清除
                </button>
              )}
            </div>
            
            {/* Display count and status */}
            <div className="md:col-span-6 md:text-right text-xs text-stone-500">
              篩選出 <span className="font-bold text-brand-pink-600">{filteredPosts.length}</span> 篇精選療癒文章
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-brand-pink-100 border-brand-pink-300 text-brand-pink-600'
                    : 'bg-[#FDF6E6] border-[#F0DFA0] text-stone-600 hover:bg-brand-pink-50 hover:border-brand-pink-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Empty Search State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-[#FDF6E6] rounded-2xl border border-dashed border-[#F0DFA0] max-w-md mx-auto space-y-4">
            <span className="text-4xl">🔍</span>
            <h4 className="font-bold text-brand-stone-900 font-serif">查無相關文章</h4>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
              試著輸入其他關鍵字（例如「靈氣」、「煙供」、「匱乏」），或者點選上方的分類標籤。
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-brand-pink-50 text-brand-pink-600 text-xs font-semibold rounded-lg hover:bg-brand-pink-100"
            >
              顯示全部文章
            </button>
          </div>
        )}

        {/* Blog Post Cards Grid */}
        {filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="group bg-[#FDF6E6] rounded-2xl border border-[#F0DFA0] shadow-2xs hover:shadow-md hover:border-[#D89A3E] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden"
              >
                {/* Image Placeholder with category badge */}
                <div className="h-44 bg-linear-to-tr from-brand-pink-50 to-brand-gold-50 flex items-center justify-center relative border-b border-stone-50 overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#bfa043_1px,transparent_1px)] [background-size:24px_24px] group-hover:scale-105 transition-transform duration-500"></div>
                  
                  {/* Glowing core representation */}
                  <div className="w-14 h-14 rounded-full bg-[#FFFDF0] flex items-center justify-center text-brand-pink-400 shadow-2xs group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-6 h-6 text-brand-pink-400" />
                  </div>

                  <span className="absolute top-3 left-3 text-[10px] font-bold bg-[#FFFDF0] text-brand-pink-600 px-2.5 py-1 rounded-full border border-brand-pink-100">
                    {post.category}
                  </span>
                  
                  <span className="absolute bottom-3 right-3 text-[9px] text-stone-500 bg-[#FFFDF0]/80 px-2 py-0.5 rounded-sm">
                    素材待提供
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5.5 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Date and read time */}
                    <div className="flex items-center gap-3 text-[10px] text-stone-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />閱讀：{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm sm:text-base text-brand-stone-900 group-hover:text-brand-pink-600 transition-colors line-clamp-2 leading-snug font-serif pt-1">
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  {/* Tags and CTA */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex gap-1.5 overflow-hidden">
                      {post.tags.slice(0, 2).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-brand-pink-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      閱讀全文 <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}

        {/* DETAILED ARTICLE READER DIALOG (MODAL WINDOW) */}
        <AnimatePresence>
          {readingPost && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#FDF6E6] rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#F0DFA0] flex flex-col"
              >
                <div id="blog-reader-modal-top"></div>
                
                {/* Modal Header Actions */}
                <div className="sticky top-0 z-10 bg-[#FDF6E6] border-b border-[#F0DFA0] px-6 py-4 flex justify-between items-center">
                  <span className="text-xs font-bold text-brand-pink-600 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-brand-pink-500" />
                    療癒心靈筆記 • {readingPost.category}專區
                  </span>
                  <button
                    onClick={() => setReadingPost(null)}
                    className="p-1.5 rounded-full border border-stone-200 text-stone-600 hover:text-brand-pink-600 hover:border-brand-pink-200 transition-colors"
                    aria-label="關閉閱讀器"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body: Grid split for premium look */}
                <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto">
                  
                  {/* Left Column (8 cols): Main Article Content */}
                  <article className="lg:col-span-8 space-y-6">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-stone-500 border-b border-stone-100 pb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{readingPost.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />預估閱讀時間：{readingPost.readTime}</span>
                    </div>

                    {/* Article Headline */}
                    <h1 className="text-xl sm:text-2xl font-bold font-serif text-brand-stone-900 leading-snug">
                      {readingPost.title}
                    </h1>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {readingPost.tags.map((tag, idx) => (
                        <span key={idx} className="bg-brand-pink-100/50 text-brand-pink-600 text-xs px-2.5 py-0.5 rounded-md font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Abstract design placeholder for inside the article */}
                    <div className="bg-linear-to-tr from-brand-pink-50/50 to-brand-gold-50/30 rounded-2xl p-5 border border-dashed border-brand-pink-100 text-center my-4">
                      <BookOpen className="w-8 h-8 text-brand-pink-400 mx-auto mb-2" />
                      <span className="text-xs text-brand-stone-800 font-serif italic block">
                        「當你的內在能量重歸穩定，所有的好運都將奔你而來。」
                      </span>
                      <span className="text-[10px] text-stone-400 mt-1 block">素材待提供 / 療癒意境插圖占位</span>
                    </div>

                    {/* Rich text body parser */}
                    <div className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line space-y-4">
                      {readingPost.content}
                    </div>

                    {/* Ethical disclaimer in end of blog */}
                    <div className="bg-[#FBF1DD] rounded-xl p-4.5 border border-[#F0DFA0]/60 text-[10px] text-stone-400 italic">
                      * 聲明提示：本文所分享之個案與能量探掘經驗係經去識別化之改寫，其成效因其潛意識及功課而異。身心靈能量調頻與自愛練習純屬情緒調護之輔助方法，不能替代科學、醫學、心理治療、或專業法律與財務意見，請讀者秉持理性進行自主生活抉擇。
                    </div>

                  </article>

                  {/* Right Column (4 cols): Persistent Sidebar CRO triggers */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="sticky top-6 space-y-6">
                      
                      {/* Books / Author intro box */}
                      <div className="bg-brand-gold-50/60 rounded-2xl border border-brand-gold-200 p-5 space-y-4">
                        <div className="text-center">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gold-600">Author & Coach</span>
                          <h4 className="font-bold text-sm font-serif text-brand-stone-900 mt-0.5">幸運療癒師 Keila Wenling</h4>
                          <p className="text-[11px] text-stone-500">希塔/靈氣雙證照大師級培訓導師</p>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          協助個案在愛情、家庭與財富能量中，透過大腦潛意識除錯與信念調頻，找回穩定、自信與豐盛之自愛天賦。
                        </p>
                        <button
                          onClick={() => { setReadingPost(null); document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                          className="w-full py-2 bg-[#FFFDF0] hover:bg-brand-pink-50 text-stone-800 text-xs font-semibold border border-[#F0DFA0] hover:border-brand-pink-200 rounded-lg transition-all"
                        >
                          看更多文齡故事 ➔
                        </button>
                      </div>

                      {/* Main Service CTA box */}
                      <div className="bg-linear-to-br from-brand-pink-100 to-brand-gold-100 rounded-2xl border border-brand-pink-200 p-5 space-y-4 shadow-2xs">
                        <h4 className="font-bold text-xs sm:text-sm text-brand-stone-900 font-serif">
                          想解決這篇文章提到的卡點？
                        </h4>
                        <p className="text-xs text-stone-700 leading-relaxed">
                          您可以預約文齡老師的<b>心靈引渡人｜一對一個人能量療癒</b>，或依您的卡點瀏覽其他能量調頻服務，進行系統化清理。
                        </p>
                        <div className="space-y-2">
                          <a
                            href="/services"
                            className="w-full inline-flex items-center justify-center py-2.5 bg-brand-pink-600 hover:bg-brand-pink-700 text-white font-semibold text-xs rounded-lg shadow-xs text-center"
                          >
                            前往服務頁選擇適合方案
                          </a>
                          <a
                            href="https://lin.ee/yo6a6FW"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1 py-2.5 bg-[#FFFDF0] hover:bg-brand-pink-50 text-stone-800 text-xs font-semibold border border-brand-pink-200 rounded-lg text-center"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-[#06C755]" />
                            <span>在 LINE 上詢問適合度</span>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Modal Footer Close */}
                <div className="sticky bottom-0 bg-[#FBF1DD] border-t border-[#F0DFA0] px-6 py-4 flex justify-end">
                  <button
                    onClick={() => setReadingPost(null)}
                    className="px-6 py-2 rounded-lg bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold"
                  >
                    關閉並返回列表
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
