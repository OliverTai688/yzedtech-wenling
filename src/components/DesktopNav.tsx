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

// 桌機主導覽用既有的 shadcn NavigationMenu 元件；顏色一律用 app/globals.css 的語意 token（PLN-006 P0）。
const triggerClass = (active: boolean) =>
  cn(
    'inline-flex h-10 items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 bg-transparent hover:bg-card/60 data-popup-open:bg-card/60 data-open:bg-card/60',
    active
      ? 'bg-card text-accent-foreground font-semibold border border-border shadow-xs hover:bg-card'
      : 'text-card-foreground hover:text-ring'
  );

// NavigationMenuContent 下拉面板：viewport=false 時套用的是
// `group-data-[viewport=false]/navigation-menu:` 這組 class。
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
  'left-auto right-0 group-data-[viewport=false]/navigation-menu:bg-stage group-data-[viewport=false]/navigation-menu:text-card-foreground group-data-[viewport=false]/navigation-menu:ring-border group-data-[viewport=false]/navigation-menu:shadow-lg';

// 子選單項目連結（NavigationMenuLink 本身，不是內層 <Link>）：淺色底加金色的焦點框。
const subLinkClass =
  'hover:bg-card focus:bg-card data-active:bg-background data-active:hover:bg-background data-active:focus:bg-background focus-visible:ring-ring/40';

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false} className="hidden max-w-none lg:flex" id="desktop-nav">
      <NavigationMenuList className="gap-1">
        {/* 第一層是文案集的三個分組，lg（1024px）起完整顯示；私訊與商城按鈕在 Header.tsx。 */}
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
                  <ul className="grid w-[min(240px,calc(100vw-2rem))] gap-0.5 p-1.5">
                    {group.items.map((item) => {
                      const itemPath = item.href.split('?')[0];
                      return (
                        <li key={item.id}>
                          <NavigationMenuLink asChild active={isPathActive(pathname, itemPath)} className={subLinkClass}>
                            <Link href={item.href} className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5">
                              <span className="text-sm font-medium text-card-foreground">{item.label}</span>
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
