'use client';

import StickyCtaBar from '../StickyCtaBar';
import { heroContent, homeContent, needEntries, siteLinks } from '../../data';
import { useChosenNeed } from '@/lib/need';
import { useCurrentChapter } from '@/lib/chapter';
import { useViewedNeed } from './stageNeed';

// 首頁手機底部固定列（PRD-004 §4.3）。規則同 home/HomeStickyCta.tsx，多一條給舞台用：
// 1. 最後一章（免費資源以後）：加入免費體驗社群。
// 2. 舞台裡的書翻到某個對象時：該對象的第一個按鈕（與書頁第一頁上的那一顆相同）。
// 3. 選過方向：該方向卡片的第一個按鈕。
// 4. 其餘：Hero 主按鈕的文字（回到需求入口）。
// 文字全部是既有的按鈕文字。
const BOOK_CHAPTER = homeContent.chapters.items[1].id;

export default function StageStickyCta({ lastChapterId }: { lastChapterId: string }) {
  const chosen = useChosenNeed();
  const chapter = useCurrentChapter();
  const viewed = useViewedNeed();
  const entry = needEntries.find((item) => item.id === chosen);
  const page = chapter === BOOK_CHAPTER ? needEntries.find((item) => item.id === viewed) : undefined;

  let primary: { label: string; href: string; external?: boolean } = {
    label: homeContent.stickyCta.primary,
    href: '#personas-section',
  };
  if (chapter === lastChapterId) {
    primary = { label: heroContent.secondaryCta.label, href: siteLinks.community, external: true };
  } else if (page) {
    primary = page.ctas[0];
  } else if (entry) {
    primary = entry.ctas[0];
  }

  return <StickyCtaBar primary={primary} lineLabel={homeContent.stickyCta.line} />;
}
