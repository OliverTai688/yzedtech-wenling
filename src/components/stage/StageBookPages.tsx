import { Fragment } from 'react';
import { Coins, Heart, Sparkles, Sprout } from 'lucide-react';
import { homeContent } from '../../data';
import type { NeedEntry } from '../../types';
import { CtaLinkButton } from './StageMore';

// 一個對象在書裡的幾頁（真實的文字，疊在白金書頁上；文字全部取自 src/data.ts）。
// 版面有三種（BookMode）：
// - m　手機單頁，四頁：① 圖示、標題、痛點、第一顆按鈕　② 故事一　③ 故事二　④ 專屬起點、按鈕與第二個連結。
// - d2 桌機對頁（視窗夠高）：左頁固定是 ①；右頁兩頁：兩則故事 → 專屬起點與第二個連結。
// - d3 桌機對頁（視窗較矮，兩則故事放不下一頁）：左頁固定是 ①；右頁三頁：故事一 → 故事二 → 專屬起點與第二個連結。
// 一個畫面只有一顆按鈕樣式的行動（每個對象的第一個）；第二個是安靜的文字連結（st-lk）。
// 會翻的那幾頁帶 data-lyr，狀態 data-s：cur（目前這一頁）／past（已翻過去）／next（還在下面）；翻頁的動畫在 stage-book.css。
// 一般頁面模式（沒有舞台）不看這些屬性，全部內容依序直接顯示；st-dup 是只有舞台才需要的重複內容，平常不顯示。
const icons: Record<NeedEntry['iconName'], typeof Heart> = {
  heart: Heart,
  sparkles: Sparkles,
  coins: Coins,
  sprout: Sprout,
};

export type BookMode = 'm' | 'd2' | 'd3';
/** 每個對象有幾頁可以翻 */
export const STOPS: Record<BookMode, number> = { m: 4, d3: 3, d2: 2 };

interface Props {
  entry: NeedEntry;
  /** 不是目前的對象 */
  off: boolean;
  /** 目前翻到第幾頁（從 0 起算） */
  page: number;
  mode: BookMode;
}

export default function StageBookPages({ entry, off, page, mode }: Props) {
  const { storiesLabel, startLabel } = homeContent.needs;
  const Icon = icons[entry.iconName];
  const [first, second] = entry.ctas;
  const stops = STOPS[mode];
  // 第 k 頁的屬性；k 為 null 表示這一塊在目前的版面不是會翻的頁
  const lyr = (k: number | null) => (k === null ? {} : { 'data-lyr': '', 'data-s': page === k ? 'cur' : page > k ? 'past' : 'next' });

  return (
    <div
      id={`need-${entry.id}`}
      role="tabpanel"
      aria-labelledby={`need-tab-${entry.id}`}
      data-off={off ? '' : undefined}
      data-cap="need"
      className="st-panel st-later"
    >
      <div className="st-pp__l">
        <div className="st-pp__a" {...lyr(mode === 'm' ? 0 : null)}>
          <div className="st-pp__hd">
            <span className="st-pp__ico" aria-hidden="true">
              <Icon strokeWidth={1.4} />
            </span>
            {/* 標題有空格時（例如後面帶括號的補充），換行只發生在空格處，不把詞拆開；文字本身不變 */}
            <h3 className="st-pp__ttl">
              {entry.title.split(' ').map((word, i) => (
                <Fragment key={i}>
                  {i > 0 && ' '}
                  <span>{word}</span>
                </Fragment>
              ))}
            </h3>
          </div>
          <p className="st-pp__pain">{entry.painPoint}</p>
          <div className="st-pp__row">
            <CtaLinkButton cta={first} className="gold-btn px-6 text-base font-bold" />
          </div>
        </div>
      </div>
      <div className="st-pp__r">
        <div className="st-pp__stories" {...lyr(mode === 'd2' ? 0 : null)}>
          {entry.stories.map((story, i) => (
            <div key={story.title} className="st-pp__story" {...lyr(mode === 'd2' ? null : mode === 'm' ? i + 1 : i)}>
              <p className={i === 0 ? 'st-pp__lbl' : 'st-pp__lbl st-dup'}>{storiesLabel}</p>
              <h4 className="st-pp__sub">{story.title}</h4>
              <p className="st-pp__txt">{story.text}</p>
            </div>
          ))}
        </div>
        <div className="st-pp__c" {...lyr(stops - 1)}>
          <p className="st-pp__lbl">{startLabel}</p>
          <p className="st-pp__txt">{entry.startingPoint}</p>
          <div className="st-pp__row">
            <CtaLinkButton cta={first} className="gold-btn st-dup px-5 text-sm font-bold" />
            <CtaLinkButton cta={second} className="st-lk" />
          </div>
        </div>
      </div>
      {/* 頁數：只有圓點，沒有文字 */}
      <span className="st-pp__dots" aria-hidden="true">
        {Array.from({ length: stops }, (_, i) => (
          <i key={i} data-on={i === page ? '' : undefined} />
        ))}
      </span>
    </div>
  );
}
