export interface Service {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  targetAudience: string;
  benefits: string[];
  duration: string;
  price?: string;
  ctaText: string;
  ctaLink: string;
  iconName: string;
}

export interface ReikiCourse {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'online' | 'physical' | 'both';
  name: string;
  objective: string;
  targetAudience: string;
  curriculum: string[];
  duration: string;
  badge: string;
  // Optional fields per PRD-001 §4.2 — additive, populated when 文案集 provides
  // matching 「報名注意事項與退費規範」「進階連報加碼送」 content (Phase 2+).
  certificationIncludes?: string[];
  refundPolicy?: string;
  prerequisite?: string;
  repeatPrice?: string;
  // Phase 2 additions: per-course CTA link (取代寫死在元件內的共用連結) and
  // coming-soon 狀態（例如「直覺力訓練」，文案集標註「⚠️ 待客戶補充」）。
  ctaLink?: string;
  status?: 'live' | 'coming-soon';
}

// --- PRD-001 §4.2 content-module type skeleton (Phase 0) ---
// Populated/consumed starting Phase 2 (src/content/services/**). Kept here
// until PLN-001 決定是否搬遷至 src/content/ 的最終落點。

export interface PricingPlan {
  id: string;
  name: string; // 例如「方案 B：【核心破浪】」
  highlight?: string; // 「主力推薦」等標籤
  duration: string;
  price: string;
  audience: string;
}

export interface ProcessStep {
  order: number;
  title: string;
  description: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceContent extends Service {
  plans?: PricingPlan[];
  processSteps?: ProcessStep[];
  preparation?: string[];
  bodySensationNotes?: string; // 「個案通常會有的體驗與感受」
  faqs?: ServiceFaqItem[];
  testimonialQuotes?: string[];
  disclaimer?: string;
  addOns?: { name: string; description: string }[];
  status: 'live' | 'coming-soon'; // 取代目前用「留空」表示待補的隱性做法
  bookingUrl?: string; // 明確區分「無資料」與「即將推出」
}

export interface Testimonial {
  id: string;
  persona: 'mom' | 'single' | 'business';
  category: string;
  clientName: string;
  beforeState: string;
  afterState: string;
  testimonialText: string;
  relatedService: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: '愛情' | '財運' | '豐盛靈氣' | '事業' | '心路歷程' | '個案成長';
  tags: string[];
  summary: string;
  content: string;
  readTime: string;
  imageSeed: string;
}

export interface FAQItem {
  id: string;
  persona: 'mom' | 'single' | 'business' | 'general';
  question: string;
  answer: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'pdf' | 'audio' | 'video' | 'article';
  typeName: string;
  description: string;
  targetAudience: string;
  ctaText: string;
  ctaLink: string;
}

// 合作夥伴（療癒師／協作老師）介紹卡片 — PRD-002 §3.5。與既有 `partnerLogos`
// （媒體/講座合作紀錄，性質不同、不可混用）分開維護。素材尚未到位前，
// `src/data.ts` 的 `teamPartners` 先放佔位資料，photoUrl 留空即可。
export interface TeamPartner {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  photoUrl?: string;
}

// 導覽架構：與 app/ 路由一一對應，供 Header（桌機 mega menu + 手機 Sheet）
// 及未來其他導覽型元件（如 Footer 網站地圖）共用同一份資料，避免各自寫死文案。
export interface NavItem {
  id: string;
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  /** 無子項的單一連結（例如「首頁」「預約聯絡」）填 href；有子項則填 items。 */
  href?: string;
  items?: NavItem[];
}
