import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Slide 04～07（不釘住的段落）與頁首，在舞台啟用時才接上的部分。都建立在 useStage 的 context 裡，會一起清掉。
// 一、進入畫面才出現：每一組（[data-rvg]）第一次進入畫面時加上 data-in，動作本身是 CSS 的轉場
// 　　（stage-rest.css、stage-media.css：淡入上移、數字依序翻出、手機的三本書依序立起）。只播一次。
// 二、媒體的三本書（桌機）：釘住一個舞台高，先以書背示人，隨捲動依序轉正，各帶出該書的那一行字。
// 三、頁首（桌機）：三幕與媒體釘住的期間，在 <body> 標上 data-st-pinned，樣式把主導覽與私訊按鈕調淡（stage.css）。

/** 書背朝前與轉正之後的角度（deg；轉正後留一點角度，看得出是立著的書） */
const SPINE = '68deg';
const FACING = '12deg';

export function startRest(root: HTMLElement, desktop: boolean, headerHeight: () => number) {
  const q = <T extends Element = HTMLElement>(selector: string) => Array.from(root.querySelectorAll<T>(selector));
  const groups = q('[data-rvg]');
  groups.forEach((group) => {
    ScrollTrigger.create({
      trigger: group,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        group.dataset.in = '';
      },
    });
  });

  let quiet = () => {};
  if (desktop) {
    const [pin] = q('.st-media__pin');
    const [routes] = q('[data-slide="routes"]');
    const fromHeader = () => `top top+=${headerHeight()}`;

    if (pin) {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: pin, start: fromHeader, end: 'bottom bottom', scrub: 0.5 },
      });
      const caps = q('.st-vol__cap');
      q('.st-vol__in').forEach((vol, i) => {
        const at = 0.06 + i * 0.27;
        tl.fromTo(vol, { '--ry': SPINE }, { '--ry': FACING, duration: 0.24, ease: 'back.out(1.5)' }, at);
        tl.fromTo(caps[i], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out' }, at + 0.12);
      });
      tl.set({}, {}, 1);
    }

    // 頁首：釘住的期間調淡。三幕之間的交棒也算在內（戲還在演），所以三幕是連續的一段。
    const active = new Set<ScrollTrigger>();
    const onToggle = (self: ScrollTrigger) => {
      if (self.isActive) active.add(self);
      else active.delete(self);
      if (active.size) document.body.dataset.stPinned = '';
      else delete document.body.dataset.stPinned;
    };
    ScrollTrigger.create({ trigger: root, start: () => `top+=24 top+=${headerHeight()}`, endTrigger: routes, end: 'bottom bottom', onToggle });
    if (pin) ScrollTrigger.create({ trigger: pin, start: fromHeader, end: 'bottom bottom', onToggle });
    quiet = () => delete document.body.dataset.stPinned;
  }

  return () => {
    quiet();
    groups.forEach((group) => delete group.dataset.in);
  };
}
