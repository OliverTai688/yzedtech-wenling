'use client';

import { useEffect, useReducer, useRef, useSyncExternalStore, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { homeContent, needEntries, needEntriesIntro } from '../../data';
import { setChosenNeed, useChosenNeed } from '@/lib/need';
import { track } from '@/lib/track';
import WingsCompass from '../brand/WingsCompass';
import StageBookArt from './StageBookArt';
import StageBookPages, { STOPS, type BookMode } from './StageBookPages';
import { setViewedNeed } from './stageNeed';
import type { StageBus } from './types';

// Slide 02 需求入口：一本白金色的書（RES-005 §3）。內容直接印在書頁上，有三種翻法：
// - 捲動＝翻閱：書打開是序（區塊說明），再依序翻到四個對象的第一頁（timelines/book.ts）。
// - 箭頭＝翻頁：書兩側的箭頭（與右下的書角）一頁一頁翻；翻過最後一頁就到下一個對象的第一頁。
//   鍵盤焦點在書上（不在書籤列）時，左右方向鍵也翻頁。
// - 書籤＝跳到某個對象的第一頁（role="tab"，可用方向鍵／Home／End）；選擇會被記住（lib/need.ts）。
// 換對象時頁面捲到那個對象在時間軸上的位置，捲動與狀態才不會不一致；同一個對象裡翻頁不動捲動。
// 一般頁面模式：就是普通的分頁，內容全部直接顯示，沒有箭頭。
const KEYS: Record<string, (i: number, n: number) => number> = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowDown: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  ArrowUp: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
};
// 版面：手機單頁；桌機對頁，視窗夠高時兩則故事放同一頁（條件與 stage-book.css 的 @media 一致）
const DESKTOP = '(min-width: 1024px)';
const TALL = '(min-height: 761px)';
const readMode = (): BookMode => (!window.matchMedia(DESKTOP).matches ? 'm' : window.matchMedia(TALL).matches ? 'd2' : 'd3');
function useBookMode(): BookMode {
  return useSyncExternalStore(
    (fn) => {
      const queries = [window.matchMedia(DESKTOP), window.matchMedia(TALL)];
      queries.forEach((mq) => mq.addEventListener('change', fn));
      return () => queries.forEach((mq) => mq.removeEventListener('change', fn));
    },
    readMode,
    () => 'm'
  );
}

/** active：書籤標示的對象；where：書目前翻到的對象（-1：闔著或在序）；page：該對象的第幾頁 */
interface State {
  active: string;
  where: number;
  page: number;
}
type Action = { type: 'scroll'; index: number } | { type: 'go'; index: number; page: number; live: boolean } | { type: 'page'; page: number } | { type: 'chosen'; id: string };
function reduce(s: State, a: Action): State {
  switch (a.type) {
    case 'scroll': {
      if (a.index < 0) return s.where < 0 ? s : { ...s, where: -1, page: 0 };
      const id = needEntries[a.index].id;
      // 換了對象就從第一頁開始；同一個對象（例如點書籤後捲動抵達）則不動
      return s.where === a.index && s.active === id ? s : { active: id, where: a.index, page: 0 };
    }
    case 'go':
      return { active: a.index < 0 ? s.active : needEntries[a.index].id, where: a.live ? a.index : s.where, page: a.page };
    case 'page':
      return { ...s, page: a.page };
    case 'chosen':
      // 書正翻在某個對象上時，以書為準
      return s.where >= 0 || s.active === a.id ? s : { ...s, active: a.id };
  }
}

export default function StageBook({ bus }: { bus: StageBus }) {
  const [{ active, where, page }, dispatch] = useReducer(reduce, { active: needEntries[0].id, where: -1, page: 0 });
  const mode = useBookMode();
  const stops = STOPS[mode];
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  // 訪客選過的方向：回到首頁時直接標示那一個
  const chosen = useChosenNeed();
  useEffect(() => {
    if (chosen && needEntries.some((entry) => entry.id === chosen)) dispatch({ type: 'chosen', id: chosen });
  }, [chosen]);
  // 版面切換時頁數不同，回到第一頁
  useEffect(() => dispatch({ type: 'page', page: 0 }), [mode]);

  // 點書籤或箭頭後頁面會捲到那個對象；途中經過的頁不切換，直到抵達或逾時
  const flight = useRef<{ index: number; until: number } | null>(null);
  useEffect(() => {
    bus.setNeedFromScroll = (index) => {
      const f = flight.current;
      if (f && f.index !== index && performance.now() < f.until) return;
      flight.current = null;
      dispatch({ type: 'scroll', index: index < needEntries.length ? index : -1 });
    };
    // 時間軸可能比這個元件早一步建立（例如在頁面中段重新載入），補上目前的頁
    if (bus.need !== undefined) bus.setNeedFromScroll(bus.need);
    return () => {
      bus.setNeedFromScroll = undefined;
      setViewedNeed(null);
    };
  }, [bus]);
  // 手機底部固定列帶著目前這個對象的第一顆按鈕；書闔著或在序的時候回到預設
  useEffect(() => setViewedNeed(where >= 0 ? needEntries[where].id : null), [where]);

  /** 換到第 index 個對象（-1 是序）的第 toPage 頁，並把頁面捲到那裡 */
  const go = (index: number, toPage: number) => {
    const live = Boolean(bus.live && bus.goNeed);
    dispatch({ type: 'go', index, page: toPage, live });
    if (!live) return;
    flight.current = { index, until: performance.now() + 1800 };
    bus.goNeed?.(index);
    // 捲動若被中途打斷，逾時後以實際捲到的位置為準
    window.setTimeout(() => {
      if (flight.current?.index === index && bus.need !== undefined) bus.setNeedFromScroll?.(bus.need);
    }, 1850);
  };
  const select = (index: number, toPage = 0) => {
    const { id } = needEntries[index];
    setChosenNeed(id);
    track('need_select', { need: id });
    go(index, toPage);
  };
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = KEYS[event.key]?.(index, needEntries.length);
    if (next === undefined) return;
    event.preventDefault();
    document.getElementById(`need-tab-${needEntries[next].id}`)?.focus({ preventScroll: true });
    select(next);
  };

  // 往前／往後翻一頁會到哪裡
  type Spot = { need: number; page: number };
  const step = (from: Spot, dir: 1 | -1): Spot | null => {
    if (from.need < 0) return dir > 0 ? { need: 0, page: 0 } : null;
    const to = from.page + dir;
    if (to >= 0 && to < stops) return { need: from.need, page: to };
    if (dir > 0) return from.need < needEntries.length - 1 ? { need: from.need + 1, page: 0 } : null;
    return from.need > 0 ? { need: from.need - 1, page: stops - 1 } : { need: -1, page: 0 };
  };
  // 箭頭的無障礙名稱：要去的那一頁既有的標題（文案集沒有「上一頁／下一頁」這類字）
  const { heading, description } = needEntriesIntro;
  const { storiesLabel, startLabel } = homeContent.needs;
  const nameOf = (spot: Spot | null) => {
    if (!spot) return undefined;
    if (spot.need < 0) return heading;
    const entry = needEntries[spot.need];
    const names = { m: [entry.title, storiesLabel, entry.stories[1].title, startLabel], d3: [entry.title, entry.stories[1].title, startLabel], d2: [entry.title, startLabel] };
    return names[mode][spot.page];
  };
  const here: Spot = { need: where, page };
  const prev = step(here, -1);
  const next = step(here, 1);
  const turn = (dir: 1 | -1) => {
    const to = dir > 0 ? next : prev;
    if (!to || !bus.live) return;
    if (to.need !== where) {
      if (to.need < 0) go(-1, 0);
      else select(to.need, to.page);
    } else {
      dispatch({ type: 'page', page: to.page });
      track('stage_open', { need: needEntries[to.need].id, page: to.page + 1 });
    }
    // 這個方向沒有下一頁了：箭頭會消失，焦點交給另一顆
    if (!step(to, dir)) (dir > 0 ? prevRef : nextRef).current?.focus({ preventScroll: true });
  };
  const onBookKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    if ((event.target as HTMLElement).closest('[role="tablist"]') || !bus.live) return;
    event.preventDefault();
    turn(event.key === 'ArrowRight' ? 1 : -1);
  };
  const activeIndex = Math.max(0, needEntries.findIndex((entry) => entry.id === active));

  return (
    <section id="personas-section" data-chapter="personas-section" data-slide="book" className="st-slide st-bookslide">
      <div className="st-stage">
        <div className="st-in">
          {/* 標題在前（閱讀順序）；舞台上它是闔著的書下方的字幕 */}
          <div className="st-capzone">
            <span className="st-num" aria-hidden="true">
              {homeContent.chapters.items[1].number}
            </span>
            <div className="st-caps">
              <div className="st-block" data-cap="intro">
                <h2 className="st-cap">{heading}</h2>
              </div>
            </div>
          </div>
          <span className="st-floormark" aria-hidden="true" />
          <div className="st-subject">
            <span className="st-stand" data-st="book-stand" />
            <div className="st-book" data-st="book" onKeyDown={onBookKey}>
              <span className="st-dock st-dock--closed" data-dock="book-closed" />
              <span className="st-dock st-dock--open" data-dock="book-open" />
              {/* 書頂的小羅盤：指針轉向目前對象的方位（stage-book.css） */}
              <span className="st-crest" data-st="crest" aria-hidden="true">
                <WingsCompass needle={activeIndex * 90} activeMark={activeIndex} />
              </span>
              <div className="st-book__shift" data-st="book-shift">
                <StageBookArt />
                <p className="st-preface st-later" data-cap="preface">
                  {description}
                </p>
                {/* 文案集沒有分頁列的說明文字；無障礙名稱沿用本區塊的標題 */}
                <div className="st-tabs" role="tablist" aria-label={heading}>
                  {needEntries.map((entry, index) => (
                    <button
                      key={entry.id}
                      type="button"
                      role="tab"
                      id={`need-tab-${entry.id}`}
                      aria-selected={active === entry.id}
                      aria-controls={`need-${entry.id}`}
                      data-state={active === entry.id ? 'active' : 'inactive'}
                      tabIndex={active === entry.id ? 0 : -1}
                      className="st-tab"
                      onClick={() => select(index)}
                      onKeyDown={(event) => onTabKey(event, index)}
                    >
                      {entry.shortLabel}
                    </button>
                  ))}
                </div>
                <button ref={prevRef} type="button" className="st-disc st-arrow st-arrow--prev st-later" data-st="book-nav" data-off={prev ? undefined : ''} aria-label={nameOf(prev)} onClick={() => turn(-1)}>
                  <ChevronLeft aria-hidden="true" />
                </button>
                {needEntries.map((entry) => (
                  <StageBookPages key={entry.id} entry={entry} off={active !== entry.id} page={active === entry.id ? page : 0} mode={mode} />
                ))}
                <button ref={nextRef} type="button" className="st-disc st-arrow st-arrow--next st-later" data-st="book-nav" data-off={next ? undefined : ''} aria-label={nameOf(next)} onClick={() => turn(1)}>
                  <ChevronRight aria-hidden="true" />
                  {/* 沒有字的提示：停在某個對象的第一頁時，箭頭輕輕亮兩下 */}
                  {where >= 0 && page === 0 && <span key={where} className="st-arrow__ring" aria-hidden="true" />}
                </button>
                {/* 右下翹起的書角：與「往後翻」同一個動作 */}
                <button type="button" tabIndex={-1} className="st-curl st-later" data-st="book-nav" data-off={next ? undefined : ''} aria-label={nameOf(next)} onClick={() => turn(1)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
