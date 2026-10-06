import { Plus } from 'lucide-react';
import ContentBlocks from '../offering/ContentBlocks';
import Pager from '../page/Pager';
import PageSheet from '../page/PageSheet';
import { cardClass } from '../PageHeader';
import type { ContentBlock, ContentSection } from '../../types';

// 五章故事，一次一章（pages-v2/story/PAGE.md §3）。
// - 用翻頁而不是 chip：故事是依序讀的，讀完一章，下一章的箭頭就在卡片下方。
// - 卡片只放編號、標題與第一句；其餘在「＋」開的面板裡（面板標題與「＋」的無障礙名稱都是章名）。
// - 「＋」在 DOM 裡排在第一句之後（閱讀與焦點順序），畫面上放在卡片右上角，和翻頁箭頭分開。
// - 沒有 JavaScript 時五章直向列出，面板的內容接在第一句之後（PageSheet 的備援區塊，這裡替它補上段距），「＋」不顯示。
const pad = (n: number) => String(n).padStart(2, '0');

// 第一段在「句號加空白」的地方拆成兩塊（目前只有第一章有），不增刪任何字
function splitFirstSentence(blocks: ContentBlock[]): { hook: string; rest: ContentBlock[] } {
  const [first, ...rest] = blocks;
  if (first?.type !== 'p') return { hook: '', rest: blocks };
  const match = first.text.match(/^(.+?[。！？])\s+(.+)$/);
  return match ? { hook: match[1], rest: [{ type: 'p', text: match[2] }, ...rest] } : { hook: first.text, rest };
}

export default function ChapterPager({ chapters, ariaLabel }: { chapters: ContentSection[]; ariaLabel: string }) {
  return (
    <Pager labels={chapters.map((chapter) => chapter.title)} ariaLabel={ariaLabel}>
      {chapters.map((chapter, index) => {
        const { hook, rest } = splitFirstSentence(chapter.blocks);
        return (
          <article key={chapter.id} className={`${cardClass} relative flex flex-col p-6 [&_[class*=fallback]]:mt-4`}>
            <p aria-hidden="true" className="flex min-h-11 items-center gap-1.5 text-sm font-bold tracking-[0.12em] text-accent-foreground tabular-nums">
              {pad(index + 1)}
              <span className="font-medium text-muted-foreground">/ {pad(chapters.length)}</span>
            </p>
            <h3 className="mt-2 font-serif text-xl font-bold leading-normal text-card-foreground">{chapter.title}</h3>
            {hook && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{hook}</p>}
            {rest.length > 0 && (
              <PageSheet
                title={chapter.title}
                trigger={
                  <button type="button" aria-label={chapter.title} className="icon-btn absolute right-6 top-6 [html:not(.js)_&]:invisible">
                    <Plus aria-hidden="true" />
                  </button>
                }
              >
                <ContentBlocks blocks={rest} idPrefix={chapter.id} />
              </PageSheet>
            )}
          </article>
        );
      })}
    </Pager>
  );
}
