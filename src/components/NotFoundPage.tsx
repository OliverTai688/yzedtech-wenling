import { Sparkles, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  setCurrentTab: (tabId: string) => void;
}

export default function NotFoundPage({ setCurrentTab }: NotFoundPageProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FBF1DD] px-4 py-16 text-center">
      <div className="max-w-md space-y-6 bg-[#FDF6E6] p-8 sm:p-10 rounded-3xl border border-[#F0DFA0] shadow-xs">
        
        {/* Error icon */}
        <div className="w-16 h-16 rounded-full bg-linear-to-tr from-brand-pink-200 to-brand-gold-200 flex items-center justify-center mx-auto text-brand-pink-600 shadow-2xs animate-bounce">
          <Sparkles className="w-8 h-8" />
        </div>

        {/* Headline */}
        <h2 className="text-2xl font-bold text-brand-stone-900 font-serif">
          404 尋回內在方向
        </h2>

        {/* Quote / Description */}
        <p className="text-base text-stone-600 leading-relaxed italic">
          「有時候，迷路只是為了解鎖全新的生命軌跡，讓我們在此處重新對齊。」
        </p>

        <p className="text-base text-stone-500 leading-relaxed">
          您所存取的網頁路徑可能已移動或正在進行能量維護。別擔心，隨時可以點選下方按鈕回到幸運首頁 Hub，重新展開療癒旅程。
        </p>

        {/* Back Home CTA button */}
        <button
          onClick={() => {
            setCurrentTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-linear-to-r from-brand-pink-500 to-brand-gold-500 hover:opacity-95 text-white font-semibold text-base rounded-xl transition-all shadow-2xs hover:shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
          <span>返回幸運首頁 Hub</span>
        </button>

      </div>
    </div>
  );
}
