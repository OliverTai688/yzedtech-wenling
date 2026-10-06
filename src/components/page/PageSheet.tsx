'use client';

import { useSyncExternalStore, type ReactNode } from 'react';
import { Dialog } from 'radix-ui';
import { X } from 'lucide-react';

// 內頁的面板（pages-v2/BRIEF §6）：點清單的一列，看細節而不離開頁面。手機由下滑出，桌機在右側。
// 由首頁的 StageSheet 一般化而來，差別是這裡用強制回應的 Dialog：有淡淡的遮罩、焦點留在面板內，
// 所以同一時間只會開一個；Esc、關閉鈕、點遮罩都會收起，焦點回到觸發的元素（Radix 的預設行為）。
// - trigger：一個可以接 ref 與 onClick 的元素（<button>），文字用既有字串。
// - title：面板的標題，也是關閉鈕的無障礙名稱（文案集沒有「關閉」這個詞）。
// - 沒有 JavaScript 時，內容直接接在觸發元素之後（.page-sheet__fallback，見 app/globals.css）；
//   程式接上後這份備援就從 DOM 移除，所以面板內容裡可以放 id。
const subscribe = () => () => {};

interface PageSheetProps {
  title: string;
  trigger: ReactNode;
  children: ReactNode;
}

export default function PageSheet({ title, trigger, children }: PageSheetProps) {
  // 伺服器與接上之前是 false，接上之後是 true
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      {!hydrated && <div className="page-sheet__fallback">{children}</div>}
      <Dialog.Portal>
        <Dialog.Overlay className="page-sheet__overlay" />
        <Dialog.Content className="page-sheet" aria-describedby={undefined}>
          <span className="page-sheet__grip" aria-hidden="true" />
          <Dialog.Title className="page-sheet__title">{title}</Dialog.Title>
          <Dialog.Close className="icon-btn page-sheet__close" aria-label={title}>
            <X aria-hidden="true" />
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
