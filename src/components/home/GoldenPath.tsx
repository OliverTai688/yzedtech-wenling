'use client';

import { useRef, type ReactNode } from 'react';
import { useReducedMotion, useScroll } from 'motion/react';
import * as m from 'motion/react-m';
import { cn } from '@/lib/utils';

// 全頁脊線（RES-002 §1：取自提案 A 的金線，簡化成版面左側的直線）。
// 金線隨捲動往下延伸，把視線帶到頁尾的 CTA；進度只用 transform，不量測版面。
// 每個 PathSection 的標題旁有一個節點，捲到時亮起。
export function GoldenPath({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 75%'] });

  return (
    <div ref={ref} className="relative mx-auto max-w-[1180px] pl-8 pr-4 md:pl-20 md:pr-10">
      <div aria-hidden="true" className="absolute bottom-0 left-3.5 top-0 w-px bg-border md:left-8" />
      <m.div
        aria-hidden="true"
        className="absolute bottom-0 left-3.5 top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-[#F5D98A] via-[#D89A3E] to-[#B5762A] shadow-[0_0_12px_rgba(216,154,62,0.55)] md:left-8"
        style={{ scaleY: reduce ? 1 : scrollYProgress, x: -1 }}
      />
      {children}
    </div>
  );
}

export function PathSection({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('relative scroll-mt-20 py-12 md:py-20', className)}>
      <m.span
        aria-hidden="true"
        className="absolute -left-[18px] top-[3.4rem] size-3 rounded-full border-2 border-[#D89A3E] bg-popover md:-left-12 md:top-[5.6rem]"
        style={{ x: '-50%' }}
        initial={{ scale: 0.6, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1, backgroundColor: '#E8B15A', boxShadow: '0 0 0 5px rgba(232,177,90,0.25)' }}
        viewport={{ once: true, margin: '0px 0px -45% 0px' }}
        transition={{ duration: 0.25 }}
      />
      {children}
    </section>
  );
}
