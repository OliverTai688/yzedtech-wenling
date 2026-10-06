import { Plus } from 'lucide-react';
import Pager from '../page/Pager';
import { methodologySystems, pagesContent } from '../../data';

// 14 項技術，一次看一組（pages-v2/about/PAGE.md §3）。
// - 文案集沒有分組的名稱，所以依原順序每 5 項一組，用翻頁（只有箭頭與圓點）而不是分頁。
// - 每一列先講「能解決什麼問題」，技術名稱為輔；點開才看定義與適合對象。同一時間只開一項。
// - 沒有 JavaScript 時三組直向列出，收合照常可用。
const GROUP_SIZE = 5;
const groups: (typeof methodologySystems)[] = [];
for (let i = 0; i < methodologySystems.length; i += GROUP_SIZE) groups.push(methodologySystems.slice(i, i + GROUP_SIZE));

export default function TechniqueGroups({ ariaLabel }: { ariaLabel: string }) {
  const labels = pagesContent.about;
  return (
    // 箭頭的無障礙名稱：要去的那一組的第一項技術
    <Pager labels={groups.map((group) => group[0].name)} ariaLabel={ariaLabel}>
      {groups.map((group) => (
        <div key={group[0].id} className="divide-y divide-border/70 border-y border-border/70">
          {group.map((item) => (
            <details key={item.id} name="technique" className="disclosure">
              <summary className="flex min-h-16 items-center justify-between gap-4 py-3">
                <span>
                  <span className="block text-base font-bold leading-snug text-card-foreground">{item.solves}</span>
                  <span className="mt-1 block text-sm font-semibold text-accent-foreground">{item.name}</span>
                </span>
                <Plus className="disclosure-icon size-4 shrink-0 text-ring" aria-hidden="true" />
              </summary>
              <dl className="space-y-3 pb-5 text-base leading-relaxed text-muted-foreground">
                <div>
                  <dt className="text-sm font-bold text-accent-foreground">{labels.definitionLabel}</dt>
                  <dd>{item.definition}</dd>
                </div>
                <div>
                  <dt className="text-sm font-bold text-accent-foreground">{labels.suitedLabel}</dt>
                  <dd>{item.suitedFor}</dd>
                </div>
              </dl>
            </details>
          ))}
        </div>
      ))}
    </Pager>
  );
}
