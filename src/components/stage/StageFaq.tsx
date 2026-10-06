import { Plus } from 'lucide-react';
import { homeContent } from '../../data';

// Slide 07 常見問題（RES-005 §3）。不釘住、不做舞台效果：回到一般的頁面底色，讀起來是「散場之後」。
// 原生 <details name="home-faq">，一次開一題；收合的內容仍在 HTML 裡。題目同 home/HomeSections.tsx 的 HomeFaq。
export default function StageFaq() {
  const { heading, items } = homeContent.faq;
  return (
    <section id="home-faq" data-sec="faq" className="st-sec st-faq">
      <div className="st-faq__in" data-rvg>
        <h2 className="st-cap" data-rv>
          {heading}
        </h2>
        <div className="st-faq__list" data-rv>
          {items.map((item) => (
            <details key={item.question} name="home-faq" className="disclosure st-faq__item">
              <summary>
                <span>{item.question}</span>
                <Plus className="disclosure-icon" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
