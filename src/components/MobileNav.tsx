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
import { primaryNavigation, siteLinks } from '../data';

// 手機／平板導覽：與 DesktopNav 共用同一份 primaryNavigation，用 Sheet 抽屜呈現。
//
// `components/ui/sheet.tsx`／`button.tsx` 預設用的語意色 token 目前
// app/globals.css 的 @theme 並未定義，套用預設會呈現無色／透明，因此以下改用
// 專案既有品牌色票覆寫。
//
// PRD-003 §4.3（2026-10-04）：依 primaryNavigation 的順序呈現全部 8 項；抽屜底部
// 保留「商城」與「官方 LINE」兩個 CTA。

function isPathActive(pathname: string, path: string) {
  return path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);
}

const navLinkClass = (active: boolean) =>
  cn(
    'block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
    active
      ? 'border border-[#F0DFA0] bg-[#FBF1DD] font-semibold text-[#B5762A]'
      : 'text-[#5A4A38] hover:bg-[#FBF1DD]/60'
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
          className="text-[#3A2A18] hover:bg-[#FDF6E6] hover:text-[#B5762A] xl:hidden"
          aria-label="開啟選單"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-[85%] flex-col bg-[#FDF6E6] p-0 sm:max-w-sm">
        <SheetHeader className="border-b border-[#F0DFA0]">
          <SheetTitle className="font-serif text-lg text-[#3A2A18]">網站導覽</SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-4 py-3" id="mobile-drawer">
          <ul className="space-y-1">
            {primaryNavigation.map((group) =>
              group.items ? (
                <li key={group.id} className="pt-3">
                  <p className="px-3 text-sm font-semibold tracking-wider text-[#9A8060]">
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

        <SheetFooter className="border-t border-[#F0DFA0]">
          <a
            href={siteLinks.shop}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn flex w-full items-center justify-center gap-2 py-3 text-base font-semibold"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>前往商城</span>
          </a>
          <a
            href={siteLinks.line}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-4 py-2.5 text-center text-base font-semibold text-white shadow-xs hover:opacity-95"
          >
            <MessageCircle className="h-4 w-4" />
            <span>加入官方 LINE 諮詢</span>
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
