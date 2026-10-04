'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { primaryNavigation } from '../data';
import type { NavGroup } from '../types';

// 桌機導覽：直接吃 primaryNavigation（src/data.ts），分組與 Footer 網站地圖一致，
// 讓導覽列結構真正對應網站架構，而不是另外維護一份選單文案。

function groupPaths(group: NavGroup) {
  const links = group.items ?? (group.href ? [{ href: group.href }] : []);
  return links.map((item) => item.href.split('?')[0]);
}

function isPathActive(pathname: string, path: string) {
  return path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);
}

// 2026-08-22（客戶要求：桌機主導覽改用這份既有的 shadcn NavigationMenu 元件）：
// `components/ui/navigation-menu.tsx` 預設用的 `bg-secondary`／`text-primary`／
// `border-border`／`text-muted-foreground`／`bg-popover`／`ring-foreground/10`
// 等語意色 token，目前 app/globals.css 的 @theme 並未定義對應變數（跟上一輪
// Card／Badge 遇到的狀況相同），套用預設 variant 會呈現無色/透明。以下改用
// 專案既有品牌色票（比照 Header.tsx 原本手刻選單的顏色）逐一 override。
const triggerClass = (active: boolean) =>
  cn(
    'rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 bg-transparent hover:bg-[#FDF6E6]/60 data-popup-open:bg-[#FDF6E6]/60 data-open:bg-[#FDF6E6]/60',
    active
      ? 'bg-[#FDF6E6] text-[#B5762A] font-semibold border border-[#F0DFA0] shadow-xs hover:bg-[#FDF6E6]'
      : 'text-[#5A4A38] hover:text-[#B5762A]'
  );

// NavigationMenuContent 下拉面板：viewport=false 時套用的是
// `group-data-[viewport=false]/navigation-menu:` 這組 class，同樣需要覆寫
// bg-popover／text-popover-foreground／ring-foreground/10。
//
// 2026-08-22（客戶截圖回報 bug）：viewport=false 模式下，Content 是相對於
// 各自 NavigationMenuItem（`relative`，寬度＝該 trigger 本身寬度）用
// `absolute left-0` 定位，也就是面板一律從「trigger 自己的左邊界」往右展開
// 固定寬度。移除本輪搜尋／CTA 後，整個 DesktopNav 貼齊 Header 容器右邊界，
// 越靠右側的 trigger（例如「見證與內容」，甚至「療癒與培訓」在較窄的
// lg 斷點寬度下）往右展開就會超出視窗右邊界，文字被裁切。
//
// 修法：改成 `left-auto right-0`，讓面板一律從「trigger 自己的右邊界」往左
// 展開。因為導覽項目是由左到右排列，任何一個 trigger 左側必然有更多累積可用
// 空間（至少有 Logo／更左側的項目），往左展開幾乎不會超出左邊界；而往右
// 展開的可用空間則會隨位置越靠右而越少。這個方向與「哪一組是最後一項」無關，
// 之後 primaryNavigation 分組順序或項目增減都不需要另外判斷哪個是「最右邊」。
const contentClass =
  'left-auto right-0 group-data-[viewport=false]/navigation-menu:bg-white group-data-[viewport=false]/navigation-menu:text-[#3A2A18] group-data-[viewport=false]/navigation-menu:ring-[#F0DFA0] group-data-[viewport=false]/navigation-menu:shadow-lg';

// 子選單項目連結（NavigationMenuLink 本身，不是內層 <Link>）：預設
// hover:bg-muted／data-active:bg-muted/50／focus-visible:ring-ring/50 同樣是
// 無色 token，改用品牌淺色底＋金色 focus ring。
const subLinkClass =
  'hover:bg-[#FDF6E6] focus:bg-[#FDF6E6] data-active:bg-[#FBF1DD] data-active:hover:bg-[#FBF1DD] data-active:focus:bg-[#FBF1DD] focus-visible:ring-[#B5762A]/40';

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false} className="hidden max-w-none xl:flex" id="desktop-nav">
      <NavigationMenuList className="gap-1">
        {/* PRD-003 §4.3（2026-10-04）：第一層 8 項全部呈現；「商城」按鈕在 Header.tsx。
            8 項加按鈕在 1024～1279px 放不下，桌機導覽改從 xl 斷點起顯示（PLN-004 §6）。 */}
        {primaryNavigation.map((group) => {
            const active = groupPaths(group).some((path) => isPathActive(pathname, path));

            if (!group.items) {
              return (
                <NavigationMenuItem key={group.id}>
                  <NavigationMenuLink asChild active={active} className={triggerClass(active)}>
                    <Link href={group.href!}>{group.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            }

            return (
              <NavigationMenuItem key={group.id}>
                <NavigationMenuTrigger className={triggerClass(active)}>
                  {group.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className={contentClass}>
                  {/* 寬度上限＋響應式：一般情況固定 300px，但視窗本身很窄
                      （例如平板橫向）時改以 100vw 扣掉左右各 1rem 緩衝為準，
                      避免面板寬度本身就超過視窗。 */}
                  <ul className="grid w-[min(300px,calc(100vw-2rem))] gap-0.5 p-1.5">
                    {group.items.map((item) => {
                      const itemPath = item.href.split('?')[0];
                      return (
                        <li key={item.id}>
                          <NavigationMenuLink asChild active={isPathActive(pathname, itemPath)} className={subLinkClass}>
                            <Link href={item.href} className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5">
                              <span className="text-sm font-medium text-[#3A2A18]">{item.label}</span>
                              {item.description && (
                                <span className="text-sm text-[#9A8060]">{item.description}</span>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
