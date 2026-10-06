import { pageContent } from './pages';
import { services } from '../data';

// 三階段（淨化與釋放／滋養與修復／顯化與推進）：文案集 About「這些技術之間的關係是什麼？
// 可以搭配使用嗎？」一段的原文，由 /about 與首頁第 03 章共用（PRD-004 §4.1）。
// 每個階段只連結原文在該階段點名、且名稱與本站服務直接對應的一項，不自行歸類。
const relations = pageContent.about.sections[2];
const list = relations.blocks.find((b) => b.type === 'list');
const intro = relations.blocks.find((b) => b.type === 'p');

const NAMED_SERVICE: [keyword: string, serviceId: string][] = [
  ['煙供', 'smoke-prayer'],
  ['香水供', 'five-elements-perfume'],
  ['人生推進器', 'group-healing'],
];

export interface Stage {
  title: string;
  text: string;
  service?: { id: string; name: string };
}

const stages: Stage[] = [];
if (list?.type === 'list') {
  for (let i = 0; i + 1 < list.items.length; i += 2) {
    const text = list.items[i + 1];
    const match = NAMED_SERVICE.find(([keyword]) => text.includes(keyword));
    const service = match ? services.find((s) => s.id === match[1]) : undefined;
    stages.push({ title: list.items[i], text, service: service ? { id: service.id, name: service.name } : undefined });
  }
}

export const stageContent = {
  heading: relations.title,
  intro: intro?.type === 'p' ? intro.text : '',
  stages,
};
