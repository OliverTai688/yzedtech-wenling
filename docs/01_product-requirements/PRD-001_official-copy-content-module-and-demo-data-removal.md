# PRD-001：官方文案內容模組化與 Demo 資料清除

**版本：** 1.1（2026-08-18 決策確認版）
**日期：** 2026-08-18
**狀態：** Ready for Implementation（開放決策已於 2026-08-18 由使用者確認，見第 3 節）
**前置稽核：** [`AUD-001_official-copy-vs-current-site-audit.md`](../05_audits-and-reports/AUD-001_official-copy-vs-current-site-audit.md)
**內容來源：** [`docs/網站文案集.md`](../網站文案集.md)（建議之後重新命名為 `REF-002_official-website-copy-source.md`；以下簡稱「文案集」）
**後續文件：** [`PLN-001_official-copy-rollout-execution-plan.md`](../04_execution-plans/PLN-001_official-copy-rollout-execution-plan.md)、[`PLN-002_multi-phase-agent-orchestrated-execution-plan.md`](../04_execution-plans/PLN-002_multi-phase-agent-orchestrated-execution-plan.md)

---

## 1. 概觀

目前 `wenling-web-main` 網站的頁面結構（路由、元件組成）已大致成形，且已經是「單一資料來源」的模組化架構（`src/data.ts` + `src/types.ts`，各頁面/元件皆從此讀取），但**內容本身幾乎全是 AI Studio 產生的示範資料**：服務名稱、方案價格、見證、部落格文章、FAQ、資源、以及大量 CTA 連結（`example.com`、`@example`）都不是文案集裡的真實文案（詳見 `AUD-001` 第 3～8 節）。

本 PRD 的目標：

1. 將全站文字內容，改為**以文案集為唯一內容主軸**，不得出現文案集以外的杜撰內容（服務、方案、案例、人名、數字、連結皆需可在文案集中找到出處，或明確標示為「即將推出／待補」）。
2. 重新設計內容資料模型，讓文案集裡的長文案（多方案價格表、流程、FAQ、見證、免責聲明）可以被結構化地放進 `types.ts` / `src/data.ts`（或拆分後的 `src/content/`），維持現有「元件只讀資料、不寫死文案」的良好慣例，並讓非工程人員／未來的我（AI agent）之後修改文案時，只需要改資料，不需要碰元件程式碼。
3. 建立**防呆機制**，避免未來又不小心把示範資料／demo 連結留在正式頁面上（呼應使用者需求「避免 demo 資料殘留」）。

---

## 2. 範圍

### 2.1 本次 PRD 涵蓋

- 內容資料模型（`types.ts`）重新設計，足以承載文案集要求的內容深度。
- `src/data.ts` 內容全面以文案集置換（或拆分為 `src/content/*.ts` 多檔案，見第 4 節模組設計）。
- Header／Footer／Hero／Personas／ContactSection／ClientLayoutWrapper 等元件內「寫死」的聯絡資訊與連結，全面置換為文案集內的真實資訊。
- Services 頁分類重整：`energy-healing`（8 項）／`theta-training`（含待補課程標示）／新增金錢靈氣・愛情靈氣・人魚靈氣證照課程・直覺力訓練（待補）分類，取代現有 `healer-business`／`reiki-training` 分類。
- Legal 頁面文字改為文案集內的正式「隱私權政策」「服務條款」「免責聲明」條文。
- 建立內容防呆檢查（腳本或 lint 規則），偵測 `example.com` / `@example` 等佔位樣式與缺漏的必填欄位。

### 2.2 不在本次範圍內（需另開 PRD 或另行溝通）

- Blog 舊文章復原（文案集標註「需要 recover 過往文章，另外整理一頁」，屬內容盤點／版權確認工作，非本次程式改動範圍）。
- 圖片／影片等視覺素材製作（文案集與 `design-spec.md` 皆標註目前為 image-slot 佔位）。
- 金流／預約系統串接（服務 CTA 目前皆導到 `booking.wenling.tw` 外部系統，本次僅置換連結，不重做金流或表單邏輯）。
- Gemini（`@google/genai`）AI 功能導入（見 `ARC-001` 第 6 節，需另開 PRD）。

---

## 3. 決策紀錄（2026-08-18 已確認）

以下項目原列為開放決策，**使用者已於 2026-08-18 確認：除第 5 項外，其餘依 AI 建議採用**。第 5 項使用者另行明確指示，覆蓋原本 AI 建議。

| # | 決策項目 | 文案集指示 | 原建議 | **最終決策** |
| --- | --- | --- | --- | --- |
| 1 | Story 頁去留 | 獨立頁 `/story`（我的故事＋學經歷/證照） | 拆成 `/about`＋`/about/story` 或 `/story` | ✅ 採用建議：拆成 `/about`（品牌理念＋方法體系）與獨立 Story 頁 |
| 2 | FAQ 獨立頁去留 | 標註「刪除，每個服務介紹頁皆有 FAQ」 | 保留 `/faq` 總覽頁 + 各服務頁補專屬 FAQ（both/and） | ✅ 採用建議：`/faq` 保留作總覽入口，Header 導覽不移除；同時每個服務頁補上專屬 FAQ |
| 3 | Media 獨立頁 | 主導覽列出的獨立頁面 | 新增 `/media` 路由，Home 的 `MediaSection` 為精選版 | ✅ 採用建議：新增 `/media`，Home 區塊改為精選版並連到完整頁 |
| 4 | Pricing 頁 | 「外部商城連結」，非站內頁面 | Header／Footer 增加外部連結，不需站內路由 | ✅ 採用建議：不建立站內路由。**待補**：文案集未提供統一商城網址，實際連結目標需使用者另行提供（見第 9 節資料缺口），在取得前 CTA 一律使用各服務個別的 `booking.wenling.tw/activities/*` 連結，不建立單一「Pricing」入口 |
| 5 | 《七週遇見對的人》課程頁 | 僅作為書籍／行銷 hook 出現，Services 內容裡沒有這門課的完整課綱 | 保留但需另外取得客戶課綱 | ❌ **使用者明確指示：拿掉，不保留**。已與客戶確認文案集內沒有這門課的官方課綱，不編造內容，直接移除 `seven-weeks-love` 分類、`loveCourseWeeks` 資料，以及所有頁面對它的交叉引用（Persona 推薦、Footer 連結、Home 區塊等）。**《七週遇見對的人》書籍本身**（Keila 的改版推薦序）仍是文案集中真實存在的出版品資訊，於 About／Media／Hero 提及「暢銷書推薦序作者」時保留，僅移除「課程產品」這個部分 |
| 6 | 臼井靈氣（Usui Reiki）初/中/高階課程頁 | About 方法體系表格有技術說明，但 Services 章節沒有獨立課程頁文案 | 未明確建議 | ✅ 套用與第 5 項相同原則（文案集查無課程頁來源即不編造）：移除獨立的臼井靈氣初/中/高階課程頁與 `reikiTrainingCourses` 資料；臼井靈氣僅保留在 About「方法體系」14 項技術表格中作為技術介紹，不做成可購買/報名的課程頁 |
| 7 | 客服聯絡 Email | 全文查無官方 Email，聯絡方式一律是 LINE 官方帳號 `@healer.wenling` | 移除 `hello@example.com`，以 LINE 為主 | ✅ 採用建議 |
| 8 | LINE／IG 帳號 | `@healer.wenling`（LINE）、`@keila.healing1491`（IG） | 直接置換 | ✅ 採用建議 |

所有批次現已可依此決策排入 `PLN-001` / `PLN-002` 的明確順序（僅第 4 項的實際商城網址仍待補）。

---

## 4. 內容模組設計（Content Module）

### 4.1 設計原則

1. **文案集是唯一內容主軸（Single Source of Truth）**：任何寫進 `src/content/` 或 `src/data.ts` 的文字，都必須能在文案集中找到出處。找不到出處但頁面結構需要的欄位（例如「待補」項目），一律用明確的「即將推出」狀態呈現，不得由 AI 或工程師自行編造替代文案。
2. **內容與元件分離**（現況已經如此，予以延續強化）：元件只負責「怎麼呈現」，資料檔只負責「呈現什麼」。
3. **按文案集的分類拆檔**，避免單一 `data.ts` 檔案持續肥大（目前已 45KB）：

```text
src/content/
├── home.ts               # Hero / Persona 卡片 / FAQ 精選 等 Home 專屬文字（不含服務/課程本身資料，用 id 參照）
├── about.ts               # 品牌理念、方法體系 14 項技術表格、技術搭配三階段
├── story.ts                # 我的故事、學經歷與證照列表
├── services/
│   ├── energy-healing.ts   # 8 項一對一/團體服務（含多方案價格表、流程、FAQ、見證）
│   ├── theta-training.ts   # 基礎/進階/深度挖掘 DNA 課程（含待補課程標示）
│   └── certifications.ts   # 金錢靈氣／愛情靈氣／人魚靈氣證照 + 直覺力訓練（待補）
├── testimonials.ts         # 成功案例（依 persona 分類，來源於文案集 Block 6 與各服務頁見證）
├── media.ts                 # 書籍／Podcast／演講合作
├── resources.ts             # 免費資源
├── faqs.ts                   # FAQ（Home 精選 + 各服務頁專屬，用 scope 欄位區分）
├── legal.ts                   # 隱私權政策／服務條款／免責聲明正式條文
└── site.ts                     # 全站共用：品牌名稱、LINE/IG/booking 網域、免責聲明短版、Header/Footer 連結
```

`src/data.ts` / `src/types.ts` 是否整檔搬遷到 `src/content/` 由 `PLN-001` 評估搬遷成本後決定；最低限度也要在現有 `data.ts` 內把資料依上述分類整理成清楚區塊並補齊欄位，讓元件的 import 介面盡量不變。

### 4.2 型別（`types.ts`）擴充方向

在現有 `Service` / `ReikiCourse` 之外，新增：

```ts
export interface PricingPlan {
  id: string;
  name: string;          // 例如「方案 B：【核心破浪】」
  highlight?: string;    // 「主力推薦」等標籤
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
  bodySensationNotes?: string;      // 「個案通常會有的體驗與感受」
  faqs?: ServiceFaqItem[];
  testimonialQuotes?: string[];
  disclaimer?: string;
  addOns?: { name: string; description: string }[];
  status: 'live' | 'coming-soon';    // 取代目前用「留空」表示待補的隱性做法
  bookingUrl?: string;               // 明確區分「無資料」與「即將推出」
}
```

`ReikiCourse` / 課程類型比照擴充：`certificationIncludes`（贈品）、`refundPolicy`、`prerequisite`、`repeatPrice` 等欄位，對應文案集每個課程頁固定出現的「報名注意事項與退費規範」「進階連報加碼送」段落。

### 4.3 待補內容處理原則

文案集中明確標註「⚠️ 待客戶補充」「待提供」「待更新」的內容（例如：直覺力培訓完整文案、線上「造物主與我」課程、實體「顯化與豐盛」課程、Media 的 Podcast 連結待更新），一律：

- 資料模型加上 `status: 'coming-soon'`。
- UI 呈現「敬請期待／搶先登記」樣式，CTA 導向文案集指定的暫定連結（例如直覺力訓練用 `https://lin.ee/yo6a6FW` 搶先登記）。
- **不得**生成任何內容細節去填補這些留白（這是本次修正最核心的問題來源）。

---

## 5. Services 頁分類調整（已定案）

依 `AUD-001` 第 5 節與第 3 節決策紀錄，Services 頁最終調整為 **3 個分類**（原 3 個 tab：`energy-healing` / `reiki-training` / `seven-weeks-love` 全部替換）：

1. `energy-healing`：個人療癒（一對一）、靈性解讀（一對一）、靈性按摩（一對一）、人生推進器（原團體療癒）、主題工作坊、煙供祈福、豐盛靈氣、五行香水供奉（原愛情靈氣位置，內容改為文案集的香水供奉頁）。
2. `theta-training`：基礎 DNA、進階 DNA、深度信念挖掘班（皆為 live），線上「造物主與我」、實體「顯化與豐盛」（皆為 `coming-soon`）。
3. `certifications`（取代 `healer-business`）：金錢靈氣療癒師與導師授證、愛情靈氣證照（鬱金香熱情靈氣導師班）、人魚靈氣證照、直覺力訓練（`coming-soon`）。

**明確移除、不建立分類或課程頁**：

- `seven-weeks-love`（《七週遇見對的人》課程）：整個分類、`loveCourseWeeks` 資料、`ServicesSection.tsx` 內的 `seven-weeks-love-tab`、Header/Footer/Personas 對它的所有連結與交叉引用，全部移除。書籍本身的行銷提及（推薦序作者身份）不受影響，保留在 About／Media 相關內容中。
- `reiki-training`（臼井靈氣初/中/高階課程頁）：整個分類與 `reikiTrainingCourses` 資料移除；臼井靈氣技術說明僅保留於 About 方法體系表格。

每個服務／課程頁至少要包含文案集原文出現的區塊：服務定位／適合對象／方案與價格／流程與注意事項／個案體驗與感受（如有）／見證／FAQ／免責聲明／預約 CTA。

---

## 6. 防呆機制（避免 Demo 資料殘留）

新增一支內容檢查腳本（建議 `scripts/check-content.ts`，並在 `package.json` 增加 `content:check`），在 CI／提交前執行，規則至少包含：

1. `src/` 與 `app/` 內不得出現 `example.com`、`@example`、`hello@example` 等佔位樣式（比照 `AUD-001` 第 7 節的 grep 規則，改為自動化）。
2. 所有 `bookingUrl` / `ctaLink` 欄位必須符合允許的網域清單（如 `booking.wenling.tw`、`lin.ee`、`line.me/R/ti/p/@healer.wenling`、`reurl.cc` 等文案集內出現過的網域），非清單內網域需人工複核。
3. `status: 'coming-soon'` 的項目，不得同時填寫完整的 `plans` / `processSteps`（避免「假裝待補、實際上又編了內容」的矛盾狀態）。

此腳本可先以 `pnpm lint` 的延伸腳本形式存在，不強求一次做到完整型別驗證，但至少要能攔截「示範連結外洩到正式頁面」這個目前最嚴重的問題。

---

## 7. 驗收方向（供未來 ACC-001 使用）

實作完成後的驗收，至少需要涵蓋：

- 全站 `grep example.com/@example` 結果為 0。
- Home 8 個 block、About／Story、Services 各分類頁、Testimonials、Media、Resources、Legal 的文字內容，逐段可對照到文案集出處（或明確標示 `coming-soon`）。
- 全站 LINE／IG／booking 連結皆為文案集內的真實網址。
- `content:check` 腳本與 `pnpm lint`、`pnpm build` 皆需通過。

---

## 8. 風險

- 文案集內容篇幅極大（超過 2500 行），且部分服務頁文字本身互有重複／措辭微調版本（例如香水供奉那段文字前面還留有「這就為你將『五行香水供奉』的服務內容…」這類 AI 對話殘留字句），置換時需要人工複核每段是否為「最終文案」還是「AI 撰寫過程留下的過場語句」，避免把過場語句也一併搬進網站。
- Services 分類重整牽動路由與既有連結（`?tab=` query），需確認外部（LINE、Email）是否已流出舊的 tab id 連結，若有需做轉址規劃。
- **移除 `seven-weeks-love` 與 `reiki-training`（臼井靈氣）需做「乾淨移除」**：除了刪除分類本身，還要清掉 `Personas.tsx` 的 `recommendedServices` 交叉引用、`Footer.tsx` 的導覽連結、`Header.tsx`（若有）、以及任何寫死的 `?tab=seven-weeks-love` / `?tab=reiki-training` 連結，避免留下 404 或指向不存在分類的連結。詳見 `PLN-001` 新增之移除批次。

## 9. 已知資料缺口（非決策，待使用者／客戶提供）

- **Pricing 外部商城統一連結**：文案集僅說明 Pricing 為「外部商城連結」，未提供實際網址。目前所有 CTA 皆使用各服務個別的 `booking.wenling.tw/activities/*` 連結，若客戶另有一個總覽商城頁，需提供網址後才能在 Header／Footer 加上該入口。
- **Resources 頁具體資源**：文案集 Resources 章節僅有標題（「免費資源／外部連結（YouTube／LINE 社群介紹）」），沒有具體資源清單，需要客戶確認實際要上架的資源內容與連結。
- **Blog 舊文章**：文案集標註需 recover 過往文章，屬內容盤點工作，不在本次 PRD 範圍（見 2.2 節）。
