import { cn } from '@/lib/utils';

// 免費資源第一個畫面的「票卡」：加入密碼與每週時段，用大數字當這一頁的視覺焦點。
// 字都由 ResourcesSection 從 src/data.ts 的原文拆出來傳入（小字是標籤，大字是數字），這裡不寫任何字。
interface ResourceTicketProps {
  passLabel: string;
  pass: string;
  times: { name: string; day: string; time: string }[];
}

const cell = 'flex flex-col-reverse justify-center gap-1 px-3 py-4 md:px-4 md:py-5';
const figure = 'font-serif font-bold leading-tight text-secondary-foreground tabular-nums';

export default function ResourceTicket({ passLabel, pass, times }: ResourceTicketProps) {
  return (
    <dl className="mx-auto grid max-w-[30rem] grid-cols-2 overflow-hidden rounded-[18px] border border-border bg-popover text-center md:max-w-none md:grid-cols-[1.2fr_1fr_1fr]">
      <div className={cn(cell, 'col-span-2 border-b border-border md:col-span-1 md:border-b-0 md:border-r')}>
        <dt className="text-sm leading-normal text-muted-foreground">{passLabel}</dt>
        <dd className={cn(figure, 'text-[40px] tracking-[0.08em]')}>{pass}</dd>
      </div>
      {times.map((item, index) => (
        <div key={item.name} className={cn(cell, 'justify-end', index > 0 && 'border-l border-border')}>
          <dt className="text-sm leading-normal text-muted-foreground">{item.name}</dt>
          <dd className={cn(figure, 'text-[28px]')}>
            <span className="mb-0.5 block font-sans text-sm font-semibold leading-normal tracking-[0.12em] text-accent-foreground">{item.day}</span>
            {item.time}
          </dd>
        </div>
      ))}
    </dl>
  );
}
