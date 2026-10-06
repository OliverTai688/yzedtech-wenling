'use client';

import { useRef, type ReactNode } from 'react';
import { Dialog } from 'radix-ui';
import { X } from 'lucide-react';

// 補充內容的面板（RES-005 §4）：手機由下滑出、桌機在右側。一次只開一個（狀態在 HomeStage）。
// 非強制回應：頁面仍可捲動，不鎖捲動；Esc、關閉鈕、點面板以外的地方都會收起，焦點回到觸發的按鈕。
// 標題與關閉鈕的無障礙名稱都沿用該內容既有的標題（文案集沒有「關閉」這個詞）。
export interface SheetState {
  key: string;
  title: string;
  body: ReactNode;
  trigger: HTMLElement | null;
}

export default function StageSheet({ sheet, onClose }: { sheet: SheetState | null; onClose: () => void }) {
  // 收起的動畫期間仍要顯示剛才的內容
  const last = useRef<SheetState | null>(null);
  if (sheet) last.current = sheet;
  const shown = sheet ?? last.current;
  const outside = useRef(false);

  return (
    <Dialog.Root open={sheet !== null} onOpenChange={(open) => !open && onClose()} modal={false}>
      <Dialog.Portal>
        <Dialog.Content
          className="st-sheet"
          aria-describedby={undefined}
          onOpenAutoFocus={() => {
            outside.current = false;
          }}
          onInteractOutside={(event) => {
            // 再點一次同一顆按鈕是「收起」，交給按鈕自己處理
            if (shown?.trigger?.contains(event.target as Node)) event.preventDefault();
            else outside.current = true;
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (!outside.current && shown?.trigger?.isConnected) shown.trigger.focus({ preventScroll: true });
          }}
        >
          <span className="st-sheet__grip" aria-hidden="true" />
          <Dialog.Title className="st-sheet__title">{shown?.title}</Dialog.Title>
          <Dialog.Close className="st-disc st-sheet__close" aria-label={shown?.title}>
            <X aria-hidden="true" />
          </Dialog.Close>
          {shown?.body}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
