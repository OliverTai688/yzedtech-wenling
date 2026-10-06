import { Plus } from 'lucide-react';
import ContentBlocks from '../offering/ContentBlocks';
import PageSheet from '../page/PageSheet';
import type { ContentBlock } from '../../types';

// 學經歷與專業認證，依文案集的分類分組（pages-v2/story/PAGE.md §3）。每一類一列，點了開面板；
// 研習紀錄有 24 列，放在面板裡捲動，頁面長度不變。列尾的數字是這一類的筆數（文案集沒有對應的字，用數字表達）。
// 分類名稱在資料裡有兩種：小標（h），以及清單裡的其中一項。同一份清單同時有帶破折號與不帶破折號的項目時，
// 不帶的那幾項是分類名稱（例如「靈氣與能量體系」），其餘是該類的認證。
const DASH = '—';

interface Group {
  title: string;
  blocks: ContentBlock[];
  subs: { title: string; blocks: ContentBlock[] }[];
}

function groupCredentials(blocks: ContentBlock[]): Group[] {
  const groups: Group[] = [];
  for (const block of blocks) {
    if (block.type === 'h') {
      groups.push({ title: block.text, blocks: [], subs: [] });
      continue;
    }
    const group = groups[groups.length - 1];
    if (!group) continue;
    const target = () => group.subs[group.subs.length - 1]?.blocks ?? group.blocks;
    const mixed = block.type === 'list' && block.items.some((item) => item.includes(DASH)) && block.items.some((item) => !item.includes(DASH));
    if (block.type !== 'list' || !mixed) {
      target().push(block);
      continue;
    }
    for (const item of block.items) {
      if (!item.includes(DASH)) {
        group.subs.push({ title: item, blocks: [] });
        continue;
      }
      const list = target();
      const last = list[list.length - 1];
      // 不改動來源資料：接在最後一份清單後面時換成新的物件
      if (last?.type === 'list') list[list.length - 1] = { type: 'list', items: [...last.items, item] };
      else list.push({ type: 'list', items: [item] });
    }
  }
  return groups;
}

const count = (blocks: ContentBlock[]) =>
  blocks.reduce((n, block) => n + (block.type === 'list' ? block.items.length : block.type === 'table' ? block.rows.length : 1), 0);

const listClass = 'divide-y divide-border/70 border-y border-border/70';
const rowClass =
  'flex min-h-14 w-full cursor-pointer items-center gap-4 rounded-sm py-3 text-left text-base font-bold text-card-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

function Row({ id, title, blocks }: { id: string; title: string; blocks: ContentBlock[] }) {
  return (
    <li>
      <PageSheet
        title={title}
        trigger={
          <button type="button" className={rowClass}>
            <span className="flex-1">{title}</span>
            <span className="text-sm font-semibold text-muted-foreground tabular-nums">{count(blocks)}</span>
            <Plus className="size-4 shrink-0 text-ring" aria-hidden="true" />
          </button>
        }
      >
        <ContentBlocks blocks={blocks} idPrefix={id} />
      </PageSheet>
    </li>
  );
}

export default function CredentialGroups({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-7">
      {groupCredentials(blocks).map((group, index) =>
        group.subs.length ? (
          <div key={group.title}>
            <h3 className="mb-2 font-serif text-lg font-bold text-card-foreground">{group.title}</h3>
            <ul className={listClass}>
              {group.subs.map((sub, subIndex) => (
                <Row key={sub.title} id={`cred-${index}-${subIndex}`} title={sub.title} blocks={sub.blocks} />
              ))}
            </ul>
          </div>
        ) : (
          <ul key={group.title} className={listClass}>
            <Row id={`cred-${index}`} title={group.title} blocks={group.blocks} />
          </ul>
        )
      )}
    </div>
  );
}
