import { Plus } from 'lucide-react';
import Pager from '../page/Pager';
import { QaList } from './ContentBlocks';
import { buildDeck, priceColumn, splitLabel, type DeckItem, type DeckPage } from './deck';
import type { ContentBlock } from '../../types';

// 一個小節展開之後的內容（pages-v2/service-detail/PAGE.md §3）。文字全部是文案集原文，這裡只決定分層：
// - 內文超過一個畫面的字數上限時分成幾頁，一次看一頁，用共用的 Pager 左右翻（沒有 JavaScript 時直向全部列出）；
// - 表格是直向堆疊的列：一列一個收合，一次開一列，方案名稱與金額在收合的那一行就看得到；
// - 問答一次開一題；「標題：說明」的條列，把標題標成粗體方便掃讀。
type TableBlock = Extract<ContentBlock, { type: 'table' }>;

const rule = 'divide-y divide-border/70 border-y border-border/70';
const columnLabel = 'text-sm font-semibold text-accent-foreground';

// 表格的格子裡用「•」分開的幾點，改成直向的幾行（圓點由樣式畫出）
function Cell({ text }: { text: string }) {
  const parts = text.split(/\s*•\s*/).filter(Boolean);
  if (!text.trimStart().startsWith('•') || parts.length < 2) return <>{text}</>;
  return (
    <ul className="space-y-1.5">
      {parts.map((part) => (
        <li key={part} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-gold-to" />
          <span>{part}</span>
        </li>
      ))}
    </ul>
  );
}

function TableRows({ block, name }: { block: TableBlock; name: string }) {
  const price = priceColumn(block);
  return (
    <div>
      {block.header.length > 0 && (
        <p className={`flex justify-between gap-4 pb-2 ${columnLabel}`}>
          <span>{block.header[0]}</span>
          {price > 0 && <span className="pr-7">{block.header[price]}</span>}
        </p>
      )}
      <div className={rule}>
        {block.rows.map((row, rowIndex) => (
          <details key={row.join('|')} name={name} className="disclosure" open={rowIndex === 0}>
            <summary className="flex min-h-12 items-center justify-between gap-3 py-2 text-base font-bold text-card-foreground">
              <span>{row[0]}</span>
              <span className="flex shrink-0 items-center gap-3">
                {price > 0 && <span className="tabular-nums text-accent-foreground">{row[price]}</span>}
                <Plus className="disclosure-icon size-4 text-ring" aria-hidden="true" />
              </span>
            </summary>
            <dl className="space-y-3 pb-4">
              {row.map((cell, cellIndex) =>
                cellIndex === 0 || cellIndex === price || !cell ? null : (
                  <div key={cellIndex}>
                    {block.header[cellIndex] && <dt className={columnLabel}>{block.header[cellIndex]}</dt>}
                    <dd className="mt-0.5">
                      <Cell text={cell} />
                    </dd>
                  </div>
                )
              )}
            </dl>
          </details>
        ))}
      </div>
    </div>
  );
}

// 兩欄的短表格：直接是一張表，兩欄在 390px 排得下，不需要橫向捲動
function PlainTable({ block }: { block: TableBlock }) {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className={columnLabel}>
          {block.header.map((cell) => (
            <th key={cell} scope="col" className="pb-2 pr-4 font-semibold">
              {cell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={rule}>
        {block.rows.map((row) => (
          <tr key={row.join('|')} className="align-top">
            <th scope="row" className="w-[38%] py-2.5 pr-4 font-bold text-card-foreground">
              {row[0]}
            </th>
            <td className="py-2.5">{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Item({ item, id }: { item: DeckItem; id: string }) {
  switch (item.type) {
    case 'p':
      return <p>{item.text}</p>;
    case 'list':
      return (
        <ul className="space-y-3">
          {item.items.map((text) => {
            const label = splitLabel(text);
            return (
              <li key={text} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-gold-to" />
                {label ? (
                  <span>
                    <span className="font-bold text-card-foreground">{label[0]}</span>
                    {label[1]}
                  </span>
                ) : (
                  <span>{text}</span>
                )}
              </li>
            );
          })}
        </ul>
      );
    case 'table':
      return item.mode === 'plain' ? <PlainTable block={item.block} /> : <TableRows block={item.block} name={`${id}-rows`} />;
    case 'qa':
      return <QaList items={item.block.items} name={`${id}-qa`} />;
  }
}

function PageView({ page, id, Heading }: { page: DeckPage; id: string; Heading: 'h2' | 'h3' }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
      {page.heading && <Heading className="font-sans text-base font-bold text-accent-foreground">{page.heading}</Heading>}
      {page.items.map((item, index) => (
        <Item key={index} item={item} id={`${id}-${index}`} />
      ))}
    </div>
  );
}

interface SectionDeckProps {
  blocks: ContentBlock[];
  /** 這一段在頁面上唯一的前綴（收合群組的 name 用） */
  id: string;
  /** 這一段的標題（docx 原文）：翻頁區塊與箭頭的無障礙名稱 */
  title: string;
  /** 段落裡小標的層級：段落標題是 h2 時用 h3（預設）；段落沒有自己的標題時用 h2 */
  headingLevel?: 'h2' | 'h3';
}

export default function SectionDeck({ blocks, id, title, headingLevel = 'h3' }: SectionDeckProps) {
  const pages = buildDeck(blocks);
  if (pages.length === 0) return null;
  if (pages.length === 1) return <PageView page={pages[0]} id={`${id}-p0`} Heading={headingLevel} />;
  // 有表格或問答的段落，各頁高度差很多（一頁十列、一頁一句）：高度跟著目前這一頁，箭頭緊接在內容下面；
  // 純文字的段落各頁高度相近：高度固定為最高的一頁，翻頁時箭頭不跳動。
  const autoHeight = pages.some((page) => page.items.some((item) => item.type === 'table' || item.type === 'qa'));
  return (
    <Pager autoHeight={autoHeight} ariaLabel={title} labels={pages.map((page, index) => page.heading ?? `${title} ${index + 1}`)}>
      {pages.map((page, index) => (
        <PageView key={index} page={page} id={`${id}-p${index}`} Heading={headingLevel} />
      ))}
    </Pager>
  );
}
