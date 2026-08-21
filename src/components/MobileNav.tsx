'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, MessageCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { primaryNavigation } from '../data';

// 手機導覽：與 DesktopNav 共用同一份 primaryNavigation，
// 用 Sheet 抽屜取代原本手寫的 isOpen 下拉選單。

function isPathActive(pathname: string, path: string) {
  return path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);
}

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#3A2A18] hover:bg-secondary hover:text-primary lg:hidden"
          aria-label="開啟選單"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-[85%] flex-col bg-card p-0 sm:max-w-sm">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-serif text-lg text-foreground">網站導覽</SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-4 py-3" id="mobile-drawer">
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isPathActive(pathname, '/')
                    ? 'border border-border bg-secondary font-semibold text-primary'
                    : 'text-muted-foreground hover:bg-secondary/60'
                )}
              >
                首頁
              </Link>
            </li>
          </ul>

          {primaryNavigation
            .filter((group) => group.items)
            .map((group) => (
              <div key={group.id} className="mt-4">
                <p className="px-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </p>
                <ul className="mt-1.5 space-y-1">
                  {group.items!.map((item) => {
                    const itemPath = item.href.split('?')[0];
                    const active = isPathActive(pathname, itemPath);
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                            active
                              ? 'border border-border bg-secondary font-semibold text-primary'
                              : 'text-muted-foreground hover:bg-secondary/60'
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

          <div className="mt-4">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={cn(
                'block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isPathActive(pathname, '/contact')
                  ? 'border border-border bg-secondary font-semibold text-primary'
                  : 'text-muted-foreground hover:bg-secondary/60'
              )}
            >
              預約聯絡
            </Link>
          </div>
        </nav>

        <SheetFooter className="border-t border-border">
          <ShimmerButton
            background="linear-gradient(135deg,#F5D98A 0%,#C9862E 100%)"
            shimmerColor="#FFFDF0"
            borderRadius="999px"
            className="w-full py-3 text-base font-semibold text-[#3A2409]"
            onClick={() => {
              setOpen(false);
              router.push('/services');
            }}
          >
            前往服務頁選購服務 ➔
          </ShimmerButton>
          <a
            href="https://lin.ee/yo6a6FW"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-4 py-2.5 text-center text-base font-semibold text-white shadow-xs hover:opacity-95"
          >
            <MessageCircle className="h-4 w-4" />
            <span>加入 LINE 官方帳號</span>
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
