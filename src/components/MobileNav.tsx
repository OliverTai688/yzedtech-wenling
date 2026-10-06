'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MessageCircle, ShoppingBag } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import WingsMark from './brand/WingsMark';
import { primaryNavigation, siteLinks, uiLabels } from '../data';

// 手機／平板導覽：與 DesktopNav 共用同一份 primaryNavigation，用 Sheet 抽屜呈現。
//
// 顏色一律用 app/globals.css 的語意 token（PLN-006 P0）。
//
// PRD-003 §4.3 v1.1：抽屜標題是學苑名稱（同時是回首頁的連結），再依 primaryNavigation
// 的順序列出全部頁面；抽屜底部保留商城與官方 LINE 兩個 CTA。
// 文案集沒有「首頁」「網站導覽」這類用語，所以不另外寫字（2026-10-05）。

function isPathActive(pathname: string, path: string) {
  return path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);
}

const navLinkClass = (active: boolean) =>
  cn(
    'block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
    active
      ? 'border border-border bg-background font-semibold text-ring'
      : 'text-card-foreground hover:bg-background/60'
  );

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-11 text-card-foreground hover:bg-card hover:text-ring lg:hidden"
          aria-label="開啟選單"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-[85%] flex-col bg-card p-0 sm:max-w-sm">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-serif text-lg text-card-foreground">
            <Link href="/" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center gap-2.5">
              <WingsMark className="h-7 w-auto" />
              <span>豐盛之翼學苑</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-4 py-3" id="mobile-drawer">
          <ul className="space-y-1">
            {primaryNavigation.map((group) =>
              group.items ? (
                <li key={group.id} className="pt-3">
                  <p className="px-3 text-sm font-semibold tracking-wider text-muted-foreground">
                    {group.label}
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={navLinkClass(isPathActive(pathname, item.href.split('?')[0]))}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={group.id}>
                  <Link
                    href={group.href!}
                    onClick={() => setOpen(false)}
                    className={navLinkClass(isPathActive(pathname, group.href!))}
                  >
                    {group.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <SheetFooter className="border-t border-border">
          <a
            href={siteLinks.shop}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn flex w-full items-center justify-center gap-2 py-3 text-base font-semibold"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>{uiLabels.shop}</span>
          </a>
          <a
            href={siteLinks.line}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-silver px-4 text-base"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{uiLabels.line}</span>
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
