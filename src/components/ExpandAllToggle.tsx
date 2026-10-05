'use client';

import { useState } from 'react';

// 把指定容器內的 <details> 全部展開或收合（法律頁用）。
export default function ExpandAllToggle({ targetId, expandLabel, collapseLabel }: { targetId: string; expandLabel: string; collapseLabel: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={open}
      onClick={() => {
        const next = !open;
        document.querySelectorAll<HTMLDetailsElement>(`#${targetId} details`).forEach((d) => {
          d.open = next;
        });
        setOpen(next);
      }}
      className="btn-outline text-sm"
    >
      {open ? collapseLabel : expandLabel}
    </button>
  );
}
