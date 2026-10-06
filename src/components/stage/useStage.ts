'use client';

import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';
import { setCurrentChapter } from '@/lib/chapter';
import { track } from '@/lib/track';
import { PIN, STAGE_MQ } from './emblemGeo';
import { buildHero } from './timelines/hero';
import { buildBook, measureBook } from './timelines/book';
import { bookPlan, needAt, restAt } from './timelines/bookPlan';
import { buildRoutes, layoutRoutes } from './timelines/routes';
import { buildFounder, measureFounder } from './timelines/founder';
import { startRest } from './timelines/rest';
import { STAGE_OFF } from './stageGuard';
import { measureDock, type StageCtx } from './timelines/shared';
import type { StageBus } from './types';

// 舞台的動畫接線（RES-005 §4）。
// - 一條以捲動推進（scrub）的總時間軸，依序放進三張 slide 的時間軸與交棒給創辦人的那一段；釘住用 CSS sticky，不改捲動。
// - slide 04～07 不釘住：進入畫面才出現、媒體的三本書、頁首在釘住期間變淡，都在 timelines/rest.ts。
// - 版面有變（ScrollTrigger refresh）就重新量停靠點、重建時間軸。
// - 目前章節（lib/chapter.ts）由 ScrollTrigger 判斷，任何模式都啟用，供手機底部固定列使用。
// - 全部建立在 useGSAP 的 context 裡，離開頁面或 React 嚴格模式重跑時會自動清乾淨。
let registered = false;
function register() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

function startStage(root: HTMLElement, desktop: boolean, bus: StageBus, headerHeight: () => number) {
  const mode = desktop ? 'desktop' : 'mobile';
  const pin = PIN[mode];
  const plan = bookPlan(mode);
  const q = <T extends Element = HTMLElement>(selector: string) => Array.from(root.querySelectorAll<T>(selector));
  const [fly] = q('[data-st="fly"]');
  const emblem = fly.querySelector<HTMLElement>('.emblem')!;
  const bookStart = pin.hero + 1;
  const routesStart = bookStart + pin.book + 1;
  const [routesSlide] = q('[data-slide="routes"]');
  // 交棒給創辦人的長度依版面而定（拱形到位的位置），所以總長每次重建時重算
  const handoffLen = () => measureFounder(root, pin.routes)?.len ?? 1;
  let total = routesStart + pin.routes + handoffLen();
  const proxy = { t: 0 };
  let master: gsap.core.Timeline | null = null;
  let resetRoutes = () => {};
  let need = -2;
  const [bookEl] = q('[data-st="book"]');
  let bookOpen: boolean | null = null;

  const render = () => {
    if (!master) return;
    const time = proxy.t * total;
    master.time(time, true);
    const bt = time - bookStart;
    // 書闔著（縮小）或已離場時，書頁上的字與翻頁箭頭不佔版面（stage-book.css 的 [data-open]）
    const open = bt >= plan.open[0] + (plan.open[1] - plan.open[0]) * 0.75 && bt < plan.pin + 0.4;
    if (open !== bookOpen) {
      bookOpen = open;
      bookEl?.toggleAttribute('data-open', open);
    }
    const now = bt > pin.book + 1 ? -1 : needAt(plan, bt);
    if (now !== need) {
      need = now;
      bus.need = now;
      bus.setNeedFromScroll?.(now);
    }
  };

  const build = () => {
    master?.revert();
    resetRoutes();
    root.style.setProperty('--st-hdr', `${headerHeight()}px`);
    const [stageIn] = q('.st-in');
    const handoff = measureFounder(root, pin.routes);
    total = routesStart + pin.routes + (handoff?.len ?? 1);
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
    const bookFit = measureBook(q, desktop);
    const ctx: StageCtx = {
      root, mode, desktop, pin, fly, emblem, q,
      flyW: fly.offsetWidth,
      W: stageIn.offsetWidth,
      H: stageIn.offsetHeight,
      bar: desktop ? 0 : (document.getElementById('sticky-cta-bar')?.offsetHeight ?? 0),
      docks: {
        hero: measureDock(q('[data-dock="hero"]')[0], true),
        bookClosed: bookFit.closed,
        bookOpen: bookFit.open,
      },
      handoff,
      init: (targets, vars) => tl.set(targets, vars, 0),
    };
    const routes = layoutRoutes(ctx);
    resetRoutes = routes.reset;
    const hero = buildHero(ctx);
    const book = buildBook(ctx);
    const fan = buildRoutes(ctx, routes.origin);
    tl.add(hero, 0).add(book, bookStart).add(fan, routesStart);
    if (handoff) tl.add(buildFounder(ctx, handoff), routesStart + pin.routes);
    master = tl;
    tl.render(proxy.t * total, true, true);
    render();
  };

  const driver = gsap.to(proxy, {
    t: 1,
    ease: 'none',
    onUpdate: render,
    scrollTrigger: {
      trigger: root,
      start: () => `top top+=${headerHeight()}`,
      // 三幕的底端，再加上交棒比一個舞台高多（或少）出來的部分
      endTrigger: routesSlide,
      end: () => `bottom+=${Math.round((handoffLen() - 1) * (routesSlide.offsetHeight / (1 + pin.routes)))} top+=${headerHeight()}`,
      scrub: desktop ? 0.5 : true,
    },
  });
  bus.live = true;
  bus.goNeed = (index) => {
    const st = driver.scrollTrigger;
    if (!st) return;
    const at = (bookStart + restAt(plan, index)) / total;
    window.scrollTo({ top: Math.round(st.start + at * (st.end - st.start)), behavior: 'smooth' });
  };
  root.dataset.live = '';
  document.documentElement.classList.remove(STAGE_OFF);
  build();
  ScrollTrigger.addEventListener('refresh', build);
  const stopRest = startRest(root, desktop, headerHeight);

  return () => {
    stopRest();
    ScrollTrigger.removeEventListener('refresh', build);
    master?.revert();
    master = null;
    resetRoutes();
    bus.live = false;
    bus.need = undefined;
    bus.goNeed = undefined;
    bookEl?.removeAttribute('data-open');
    delete root.dataset.live;
    root.style.removeProperty('--st-hdr');
  };
}

export function useStage(rootRef: RefObject<HTMLElement | null>, bus: StageBus) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      register();
      const header = document.getElementById('site-header');
      const headerHeight = () => header?.offsetHeight ?? 69;

      // 目前章節：章節跨過畫面中線時視為進入；第一次進入時送出 chapter_view
      const seen = new Set<string>();
      document.querySelectorAll<HTMLElement>('[data-chapter]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            const id = el.dataset.chapter ?? '';
            if (!self.isActive || !id) return;
            setCurrentChapter(id);
            if (!seen.has(id)) {
              seen.add(id);
              track('chapter_view', { chapter: id });
            }
          },
        });
      });

      // 程式太晚到、頁面已經退回一般版面而且訪客已往下讀：這一次就維持一般頁面，不把版面換回舞台（stageGuard.ts）
      if (document.documentElement.classList.contains(STAGE_OFF) && window.scrollY > 80) return () => setCurrentChapter('');

      const mm = gsap.matchMedia();
      mm.add({ desktop: `(min-width: 1024px) and ${STAGE_MQ}`, mobile: `(max-width: 1023.98px) and ${STAGE_MQ}` }, (context) =>
        startStage(root, Boolean(context.conditions?.desktop), bus, headerHeight)
      );
      // 字型到位後重新量一次（字幕與停靠點依實際排版計算）
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      // 直接開啟帶錨點的網址（例如 /#home-faq）：舞台啟用後各幕多出釘住的高度，瀏覽器原本捲到的位置就不對了，
      // 重新量完後再捲一次。只在載入時做一次。
      const hash = window.location.hash.slice(1);
      if (hash) {
        // 訪客一旦自己捲動、觸碰或按鍵，就不再替他移動畫面
        let touched = false;
        const mark = () => {
          touched = true;
        };
        const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
        events.forEach((type) => window.addEventListener(type, mark, { once: true, passive: true }));
        const jump = () => {
          events.forEach((type) => window.removeEventListener(type, mark));
          if (!touched) document.getElementById(hash)?.scrollIntoView({ block: 'start' });
        };
        (document.fonts?.ready ?? Promise.resolve()).then(() => window.setTimeout(jump, 120));
      }
      return () => setCurrentChapter('');
    },
    { scope: rootRef }
  );
}
