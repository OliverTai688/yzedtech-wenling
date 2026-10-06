import type { SheetState } from './StageSheet';

/** 打開補充內容的面板；再點同一顆按鈕則收起 */
export type OpenSheet = (sheet: Omit<SheetState, 'trigger'>, trigger: HTMLElement) => void;

/** HomeStage 與各張 slide 之間的小型溝通介面（不經 React 重新渲染） */
export interface StageBus {
  /** 舞台版面是否啟用中（否則是一般頁面模式） */
  live: boolean;
  /** 舞台模式：目前捲到書的第幾個對象（-1：書還闔著）；書晚一步掛上來時用它補上狀態 */
  need?: number;
  /** 舞台模式：捲到書裡第 index 個對象的那一拍；-1 是序（由 useStage 設定） */
  goNeed?: (index: number) => void;
  /** 舞台模式：捲動翻到第 index 頁時通知書（由 StageBook 設定；-1 表示書還闔著） */
  setNeedFromScroll?: (index: number) => void;
}
