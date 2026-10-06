import { track as vercelTrack } from '@vercel/analytics';

// 全站唯一的事件出口（PRD-004 §4.5、RES-004 §6）。元件一律呼叫這個函式，
// 之後要換量測工具只改這裡。Vercel Web Analytics 的自訂事件需要 Pro 方案；
// 免費方案下呼叫不會出錯，只是後台看不到。
export type TrackEvent =
  | 'need_select'
  | 'chapter_view'
  | 'stage_open'
  | 'line_click'
  | 'booking_click'
  | 'community_click'
  | 'sticky_click'
  | 'cta_click';

type TrackProps = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: TrackEvent, props: TrackProps = {}) {
  if (typeof window === 'undefined') return;
  try {
    vercelTrack(event, props);
    // 若日後加上 GA4／GTM，事件會一併進到 dataLayer。
    window.dataLayer?.push({ event, ...props });
  } catch {
    // 量測失敗不能影響操作
  }
}
