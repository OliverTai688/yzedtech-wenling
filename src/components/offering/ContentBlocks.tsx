import { Plus } from 'lucide-react';
import type { ContentBlock } from '../../types';

// 把 src/content/offerings.ts 的區塊轉成畫面。文字都是文案集原文，這裡只決定排版：
// 表格改成一列一張小卡（手機與桌機都好讀），Q&A 每題一個可展開的項目。
export function QaList({ items, name }: { items: { q: string; a: string[] }[]; name: string }) {
  return (
    <div className="divide-y divide-border/70 border-y border-border/70">
      {items.map((item) => (
        <details key={item.q} name={name} className="disclosure">
          <summary className="flex min-h-12 items-center justify-between gap-4 py-2 text-base font-bold text-card-foreground">
            <span>{item.q}</span>
            <Plus className="disclosure-icon size-4 shrink-0 text-ring" />
          </summary>
          <div className="space-y-3 pb-4 text-base leading-relaxed text-muted-foreground">
            {item.a.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function ContentBlocks({ blocks, idPrefix }: { blocks: ContentBlock[]; idPrefix: string }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
      {blocks.map((block, index) => {
        const key = `${idPrefix}-${index}`;
        switch (block.type) {
          case 'p':
            return <p key={key}>{block.text}</p>;
          case 'h':
            return (
              <h4 key={key} className="pt-2 font-sans text-base font-bold text-card-foreground">
                {block.text}
              </h4>
            );
          case 'list':
            return (
              <ul key={key} className="space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-[#D89A3E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'table':
            // 沒有表頭的表格（例如研習紀錄）：一列一行，精簡呈現
            if (block.header.length === 0) {
              return (
                <ul key={key} className="divide-y divide-border/60 text-sm">
                  {block.rows.map((row) => (
                    <li key={row.join('|')} className="grid grid-cols-1 gap-x-4 gap-y-0.5 py-2 sm:grid-cols-[1.4fr_1fr_auto]">
                      <span className="font-semibold text-card-foreground">{row[0]}</span>
                      <span>{row[1]}</span>
                      <span className="tabular-nums">{row.slice(2).filter(Boolean).join(' ')}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <div key={key} className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {block.rows.map((row) => (
                  <div key={row.join('|')} className="rounded-xl border border-border bg-popover p-4">
                    <p className="font-bold text-card-foreground">{row[0]}</p>
                    <dl className="mt-2 space-y-1.5 text-sm">
                      {row.slice(1).map((cell, cellIndex) =>
                        cell ? (
                          <div key={block.header[cellIndex + 1] ?? cellIndex} className="flex gap-2">
                            <dt className="shrink-0 font-semibold text-accent-foreground">{block.header[cellIndex + 1]}</dt>
                            <dd>{cell}</dd>
                          </div>
                        ) : null
                      )}
                    </dl>
                  </div>
                ))}
              </div>
            );
          case 'qa':
            return <QaList key={key} items={block.items} name={key} />;
        }
      })}
    </div>
  );
}
