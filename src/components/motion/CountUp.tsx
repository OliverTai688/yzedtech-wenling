'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

// 文字裡的第一個數字由 0 跑到定值（PRD-004 §4.2），其餘文字原樣顯示。
// 伺服器輸出的就是完整文字；沒有 JavaScript 或開啟「減少動態效果」時不會變動。
export default function CountUp({ text, className }: { text: string; className?: string }) {
  const match = text.match(/\d+/);
  const ref = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!match || !inView || reduce || !numberRef.current) return;
    const node = numberRef.current;
    const controls = animate(0, Number(match[0]), {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        node.textContent = String(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, match]);

  if (!match || match.index === undefined) return <span className={className}>{text}</span>;
  return (
    <span ref={ref} className={className}>
      {text.slice(0, match.index)}
      {/* 預留最終數字的寬度，跑數字時旁邊的文字不會位移 */}
      <span ref={numberRef} className="inline-block text-center tabular-nums" style={{ minWidth: `${match[0].length}ch` }}>
        {match[0]}
      </span>
      {text.slice(match.index + match[0].length)}
    </span>
  );
}
