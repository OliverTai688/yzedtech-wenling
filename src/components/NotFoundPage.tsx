import PageHero from './page/PageHero';
import WingsMark from './brand/WingsMark';
import { heroContent, homeContent } from '../data';

// 404 頁（PLN-006 P5；提案見 proposals/pages-v2/not-found）：文案集沒有這一頁的文字，所以不寫任何說明句。
// 和其他內頁同一個第一個畫面（PageHero）：金翼標誌、數字 404（H1）、一顆金色按鈕（Hero 的主按鈕，回首頁選對象）、
// 一個文字連結（服務項目）。沒有下一站，也沒有結尾的行動區塊：這個畫面只留一顆按鈕。
// PageHero 沒有調整 H1 大小與區塊高度的參數，這裡由外層容器放大數字、把區塊撐到至少六成的畫面高度並垂直置中。
export default function NotFoundPage() {
  return (
    <div className="[&>section>div:last-child]:min-h-[min(60svh,520px)] [&>section>div:last-child]:justify-center [&_h1]:text-[64px] [&_h1]:leading-[1.1] [&_h1]:tracking-[0.06em] md:[&_h1]:text-[80px]">
      <PageHero
        title="404"
        visual={<WingsMark className="h-[72px] w-auto" />}
        action={{ label: heroContent.primaryCta.label, href: `/${heroContent.primaryCta.href}` }}
        secondary={{ label: homeContent.services.moreLabel, href: '/services' }}
      />
    </div>
  );
}
