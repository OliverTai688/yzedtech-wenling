import { ArrowUpRight, MessageCircle, Plus } from 'lucide-react';
import ContentBlocks from '../offering/ContentBlocks';
import { summaryClass } from '../PageHeader';
import { pagesContent, siteLinks, uiLabels } from '../../data';
import type { ContentBlock } from '../../types';

// 「不確定自己需要哪一種」的兩條路：免費社群、一對一私訊。各一個收合，各帶自己的連結，一次開一個。
// blocks 是文案集這一段第一句之後的原文；網址那一行不顯示（連結用 siteLinks）。
// 小標後面沒有內文的（「加入密碼：168168」）併入前一項，當成一行粗體，不當成標題。
const externalProps = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function UnsureOptions({ blocks }: { blocks: ContentBlock[] }) {
  const options: { title: string; blocks: ContentBlock[]; note?: string }[] = [];
  blocks.forEach((block, index) => {
    const current = options[options.length - 1];
    if (block.type !== 'h') {
      current?.blocks.push(block);
      return;
    }
    const next = blocks[index + 1];
    if (current && (!next || next.type === 'h')) current.note = block.text;
    else options.push({ title: block.text, blocks: [] });
  });
  // 順序與文案集相同：社群、私訊
  const links = [
    { href: siteLinks.community, label: pagesContent.about.communityCta, line: false },
    { href: siteLinks.line, label: uiLabels.line, line: true },
  ];

  return (
    <div className="divide-y divide-border/70 border-y border-border/70">
      {options.map((option, index) => {
        const link = links[index];
        return (
          <details key={option.title} name="about-unsure" className="disclosure">
            <summary className={summaryClass}>
              <span>{option.title}</span>
              <Plus className="disclosure-icon size-4 shrink-0 text-ring" aria-hidden="true" />
            </summary>
            <div className="pb-4">
              <ContentBlocks blocks={option.blocks} idPrefix={`about-unsure-${index}`} />
              {option.note && <p className="mt-4 text-base font-bold text-card-foreground">{option.note}</p>}
              {link && (
                <a href={link.href} {...externalProps} className="btn-text mt-2 text-base">
                  {link.line && <MessageCircle className="size-4" aria-hidden="true" />}
                  {link.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}
