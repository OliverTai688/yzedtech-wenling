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

const triggerClass = (active: boolean) =>
  cn(
    'rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-all duration-200 bg-transparent hover:bg-secondary/60 data-popup-open:bg-secondary/60 data-open:bg-secondary/60',
    active
      ? 'bg-secondary text-primary font-semibold border border-border shadow-xs hover:bg-secondary'
      : 'text-muted-foreground hover:text-primary'
  );

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false} className="hidden max-w-none lg:flex" id="desktop-nav">
      <NavigationMenuList className="gap-1">
        {primaryNavigation
          .filter((group) => group.id !== 'contact')
          .map((group) => {
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
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-0.5 p-1.5">
                    {group.items.map((item) => {
                      const itemPath = item.href.split('?')[0];
                      return (
                        <li key={item.id}>
                          <NavigationMenuLink asChild active={isPathActive(pathname, itemPath)}>
                            <Link href={item.href} className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5">
                              <span className="text-sm font-medium text-foreground">{item.label}</span>
                              {item.description && (
                                <span className="text-xs text-muted-foreground">{item.description}</span>
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
