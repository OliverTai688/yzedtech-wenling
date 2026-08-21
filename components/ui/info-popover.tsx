"use client";

import * as React from "react";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * 小型「補充說明」揭露元件。
 *
 * 用途：當一張緊湊卡片放不下完整內文層字級（16px）的補充/免責文字時，
 * 用這個 icon-only 觸發鈕取代直接把小字硬塞進卡片。點擊/tap 後彈出的
 * 內容一律維持內文層字級，不因為藏在 popover 裡就允許縮小。
 */
export function InfoPopover({
  label,
  children,
  className,
}: {
  /** 給螢幕閱讀器與 tooltip-like 標題用的簡短說明，例如「數據來源說明」 */
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={cn(
            "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-brand-gold-600/70 transition-colors hover:bg-brand-gold-50 hover:text-brand-gold-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-gold-300",
            className
          )}
        >
          <Info className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 rounded-xl border border-brand-gold-150 bg-white p-4 text-base leading-relaxed text-stone-700 shadow-md">
        {children}
      </PopoverContent>
    </Popover>
  );
}
