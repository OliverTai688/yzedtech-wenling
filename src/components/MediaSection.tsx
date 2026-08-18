import { BookOpen, Mic, ExternalLink, Headphones, Sparkles } from 'lucide-react';
import { partnerLogos } from '../data';

export default function MediaSection() {
  // 出版品 — 依 docs/網站文案集.md Block 7｜媒體與出版 逐條核實，不含任何未提供之購買連結
  const publications = [
    {
      id: 'pub-1',
      title: '七週遇見對的人',
      role: '暢銷書改版推薦序・唯一推薦序作者',
      description: '文齡老師受邀成為本書改版之唯一推薦序作者，分享潛意識調頻與吸引理想伴侶的核心心法。',
      linkNote: '購買連結請洽各大書店／博客來搜尋書名'
    },
    {
      id: 'pub-2',
      title: '練愛大確幸',
      role: '參與著作',
      description: '與多位講者共同參與撰寫的合輯著作，分享陪伴個案走過失戀與感情卡關的實務心法。',
      linkNote: '購買連結籌備中，敬請期待'
    },
    {
      id: 'pub-3',
      title: '好女人的情場攻略',
      role: '節目合作／內容參與',
      description: '長期合作來賓身分參與節目內容規劃與錄製，分享感情與自我價值相關主題。',
      linkNote: '詳見下方 Podcast 精選單集'
    }
  ];

  // Podcast 精選 — 皆為 docs/網站文案集.md Media 區塊列出之真實受訪紀錄（連結為 Wayback Machine 存檔網址）
  const podcasts = [
    {
      id: 'pod-1',
      show: '美麗佳人 Podcast',
      title: 'S2EP29｜失戀急診：希塔療癒 Ft. 療癒師文齡（上）',
      link: 'https://web.archive.org/web/20250518033113/https://player.soundon.fm/p/10d7b46c-1a7b-4979-8421-6e3039e8c9c5/episodes/65751f59-2024-41a0-b890-335b2f0780d3'
    },
    {
      id: 'pod-2',
      show: '美麗佳人 Podcast',
      title: 'S9EP7｜練愛大確幸：療癒師手把手帶你成為最好的自己並找到真愛',
      link: 'https://web.archive.org/web/20250518033113/https://open.spotify.com/episode/0qA1IYCIPNWwo6ZGUh2bAa?si=LiQruRCRRC-B-Q7_h2IqPA'
    },
    {
      id: 'pod-3',
      show: '好女人的情場攻略 Podcast',
      title: 'Ep.103｜情侶相處溝通的 10 個超棒秘訣（2022 年收聽冠軍單集）',
      link: 'https://web.archive.org/web/20250518033113/https://open.firstory.me/story/cl4vg6oez001d01t99rpi2bwd'
    },
    {
      id: 'pod-4',
      show: '好女人的情場攻略 Podcast',
      title: 'Ep.005｜【鏡子練習】用肯定句創造理想人生',
      link: 'https://web.archive.org/web/20250518033113/https://open.firstory.me/story/clr4bn1gi030i01tzcvvsboco'
    },
    {
      id: 'pod-5',
      show: '迷人說 Podcast',
      title: '#20｜如何創造魅力氣場，找尋適合你的真愛',
      link: 'https://web.archive.org/web/20250518033113/https://podcasters.spotify.com/pod/show/stellasu/episodes/20-Wenling-e12eoh1'
    },
    {
      id: 'pod-6',
      show: '小紀老師的幸福學 Podcast',
      title: 'Ep.163｜如何成為金錢磁鐵',
      link: 'https://web.archive.org/web/20250518033113/https://podcasts.apple.com/tw/podcast/%E5%B0%8F%E7%B4%80%E8%80%81%E5%B8%AB%E7%9A%84%E5%B9%B8%E7%A6%8F%E5%AD%B8/id1524242943?i=1000592233229'
    }
  ];

  return (
    <section id="media-section" className="py-20 md:py-28 bg-[#FDF6E6] border-b border-[#F0DFA0]/70">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF0] border border-[#F0DFA0] text-[#B5762A] text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>媒體專訪與出版紀錄</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#3A2A18] font-serif leading-snug">
            文齡的蛻變故事，多次受邀於全台知名 Podcast 節目分享
          </h2>
          <p className="text-sm sm:text-base text-[#6A5642] leading-relaxed max-w-2xl mx-auto">
            以下為文齡老師公開可查證的出版與媒體受訪紀錄，收錄自官方公開頁面與節目存檔連結。
          </p>
        </div>

        {/* Publications Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#F0DFA0]">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#3A2A18] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#B5762A]" />
              <span>出版品</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="brand-card p-6 sm:p-7 flex flex-col justify-between hover:border-[#D89A3E] transition-all"
              >
                <div>
                  <div className="w-full h-40 bg-gradient-to-br from-[#FFFDF0] to-[#FBF1DD] rounded-[18px] border border-[#F0DFA0] shadow-sm mb-6 p-5 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-[#8A5415] bg-[#FFFDF0] px-2.5 py-0.5 rounded-full border border-[#F0DFA0]">
                        {pub.role}
                      </span>
                      <BookOpen className="w-4 h-4 text-[#B5762A]" />
                    </div>
                    <div className="my-auto text-center">
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#3A2A18]">
                        《{pub.title}》
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-[#6A5642] leading-relaxed mb-4">
                    {pub.description}
                  </p>
                </div>

                <p className="text-[11px] text-[#9A8060] italic border-t border-[#F0DFA0]/60 pt-3">
                  {pub.linkNote}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Podcasts Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#F0DFA0]">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#3A2A18] flex items-center gap-2">
              <Headphones className="w-5 h-5 text-[#B5762A]" />
              <span>Podcast 精選訪談</span>
            </h3>
            <span className="text-xs text-[#9A8060] hidden sm:inline">連結為節目原始存檔頁面</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {podcasts.map((pod) => (
              <div
                key={pod.id}
                className="brand-card p-6 flex flex-col justify-between hover:border-[#D89A3E] transition-all"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFFDF0] border border-[#F0DFA0] text-[#8A5415] flex items-center gap-1">
                      <Mic className="w-3 h-3" />
                      {pod.show}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#3A2A18] font-serif mb-4 leading-snug">
                    {pod.title}
                  </h4>
                </div>

                <a
                  href={pod.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-3 border-t border-[#F0DFA0]/70 flex items-center gap-1 text-xs text-[#8A5415] hover:text-[#3A2409] font-semibold"
                >
                  <span>前往收聽</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Logos Wall */}
        <div className="bg-[#FFFDF0] rounded-2xl p-6 sm:p-8 text-center border border-[#F0DFA0]/80">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A5415] block mb-5">
            官方授權認證資歷與合作機構
          </span>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            {partnerLogos.map((logo, idx) => (
              <div key={idx} className="bg-[#FDF6E6] rounded-xl border border-[#F0DFA0] px-4 py-2 text-xs font-semibold text-[#3A2A18] shadow-xs">
                {logo.name}
              </div>
            ))}
          </div>
        </div>

        {/* Integrity note */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-[10px] text-[#9A8060]">
          <Sparkles className="w-3 h-3" />
          <span>所有媒體資料均可於節目官方頁面查證，非行銷宣稱</span>
        </div>

      </div>
    </section>
  );
}
