// 服務／培訓分類 — PRD-002 §3.3／§3.4：供各筆資料標示自己屬於 `/services`
// 還是 `/training` 底下的哪個分類，作為總覽頁分組與詳細頁麵包屑判斷依據。
export type ServiceCategory =
  | 'energy-healing' // /services：能量療癒 8 項
  | 'theta-training' // /training：希塔療癒認證課程（thetaTrainingCourses）
  | 'healer-certification'; // /training：療癒師認證（certificationCourses，含併入的直覺力培訓說明）

// 畫面上的文字欄位（name、ctaText）逐字取自 docs/網站文案集.md。舊版文案集的摘要、對象、
// 時長、費用欄位已於 2026-10-05 移除；一句話介紹在 serviceBlurbs，完整內容在 src/content/offerings.ts。
export interface Service {
  id: string;
  name: string;
  ctaText: string;
  ctaLink: string;
  iconName: string;
  // PRD-002 §3.3／§3.4（Batch D）— additive。
  category: ServiceCategory;
  // 對應該服務專屬的客戶見證 id（見 `testimonials`）。目前 `testimonials` 陣列
  // 內容經 2026-08-18 QA 認定查無文案集出處、全站已停用渲染（見 TrustSystem.tsx／
  // HomeTestimonialsSection.tsx 註解），因此本輪暫不填入任何 id，一律留空陣列，
  // 待取得真實個案授權後再比對填入，不可虛構或亂配見證內容。
  testimonialIds?: string[];
}

export interface ReikiCourse {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'online' | 'physical' | 'both';
  name: string;
  /** 課程資訊的條列原文（docs/網站文案集.md 逐字，例如上課形式、課程時數） */
  facts: string[];
  /** 費用的原文（docs/網站文案集.md 逐字，自帶「課程費用」等字樣） */
  price?: string;
  // Phase 2 additions: per-course CTA link (取代寫死在元件內的共用連結) and
  // coming-soon 狀態（例如「直覺力訓練」，文案集標註「⚠️ 待客戶補充」）。
  ctaLink?: string;
  status?: 'live' | 'coming-soon';
  // PRD-002 §3.3／§3.4（Batch D）— additive。
  category: ServiceCategory;
  // 見 Service.testimonialIds 註解：`testimonials` 陣列目前全數查無出處、
  // 全站已停用渲染，本輪一律留空，不可虛構或亂配見證內容。
  testimonialIds?: string[];
}

// `thetaTrainingCourses`（src/data.ts）用的型別 — 原本以隱性推論型別存在，
// 本次補上明確 interface 以便加上 category／testimonialIds 兩個新欄位。
export interface ThetaTrainingCourse {
  id: string;
  level: string; // 文案集 Home Block 4 的課程短名，例如「基礎 DNA 課程」
  name: string;
  /** 課程資訊的條列原文（docs/網站文案集.md 逐字，例如先修要求、上課形式） */
  facts: string[];
  ctaLink?: string;
  /** 費用的原文（docs/網站文案集.md 逐字，自帶「課程費用」等字樣） */
  price?: string;
  // PRD-002 §3.3／§3.4（Batch D）— additive。
  category: ServiceCategory;
  // 見 Service.testimonialIds 註解：`testimonials` 陣列目前全數查無出處、
  // 全站已停用渲染，本輪一律留空，不可虛構或亂配見證內容。
  testimonialIds?: string[];
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

// 免費資源的一個步驟。所有文字逐字取自 docs/網站文案集.md。
export interface ResourceItem {
  id: string;
  title: string;
  /** 要用大字顯示的一行（例如加入密碼） */
  highlight?: string;
  description: string;
  /** 條列（例如每週的固定時段） */
  list?: string[];
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
}

export interface NavGroup {
  id: string;
  label: string;
  /** 無子項的單一連結（例如「首頁」「預約聯絡」）填 href；有子項則填 items。 */
  href?: string;
  items?: NavItem[];
}

// --- PRD-003／PLN-004 階段 A ---

// 首頁需求入口卡片（文案集 v2 Home Block 2）。
export interface NeedEntry {
  id: string;
  /** 分頁按鈕上的短名稱 */
  shortLabel: string;
  iconName: 'heart' | 'sparkles' | 'coins' | 'sprout';
  title: string;
  painPoint: string;
  stories: { title: string; text: string }[];
  startingPoint: string;
  ctas: { label: string; href: string; external?: boolean }[];
}

// 媒體專訪（文案集 v2 Home Block 7 與 Media 頁）。
export interface MediaPublication {
  id: string;
  title: string;
  /** 文案集的整行標題（含書名與角色），例如「暢銷書《七週遇見對的人》改版唯一推薦序作者」 */
  heading: string;
  description: string;
  note?: string;
  link?: { label: string; href: string };
}

export interface MediaEpisode {
  title: string;
  /** 文案集未提供可用連結時留空，元件只顯示標題。 */
  href?: string;
  /** 同一節目下的季別分組，例如「2022 S3」。 */
  group?: string;
  note?: string;
  /** 首頁 Block 7 的精選單集。 */
  featured?: boolean;
}

export interface MediaShow {
  id: string;
  show: string;
  kind: 'podcast' | 'youtube' | 'facebook';
  summary?: string;
  episodes: MediaEpisode[];
}

// 法律文件（文案集 v2 Privacy Policy／Terms of Service／免責聲明）。
// blocks 內：字串為段落，字串陣列為條列。
export interface LegalDocument {
  id: string;
  title: string;
  intro: string;
  sections: { heading: string; blocks: (string | string[])[] }[];
}

// 服務／課程詳細頁的完整文案（src/content/offerings.ts，由 scripts/build-offering-content.py 產生）。
export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; header: string[]; rows: string[][] }
  | { type: 'qa'; items: { q: string; a: string[] }[] };

export type ContentGroup = 'intro' | 'plans' | 'process' | 'proof' | 'faq' | 'notes';

export interface ContentSection {
  id: string;
  group: ContentGroup;
  title: string;
  blocks: ContentBlock[];
}

export interface OfferingContent {
  title: string;
  lead: ContentBlock[];
  sections: ContentSection[];
}
