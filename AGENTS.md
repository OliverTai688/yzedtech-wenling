# AGENTS.md

本檔案提供給在此 repository 工作的 AI coding agent（Claude Code、Codex 等）閱讀，說明專案背景、技術棧、慣例，以及**文件治理流程**。任何非單純文字修正的工作，開始前請先讀完本檔案，特別是「docs/ 文件架構」與「Agent 工作流程」兩節。

---

## 1. 專案概觀

- **品牌**：豐盛之翼學苑（創辦人：文齡老師 Keila）。依 PRD-003，網站以學苑為品牌主體，文齡老師以創辦人身分呈現
- **性質**：品牌官網，整合能量療癒服務、希塔療癒與靈氣（金錢／愛情／人魚）雙證照認證培訓；暢銷書《七週遇見對的人》為文齡老師撰寫改版推薦序之真實著作（非本站銷售之課程產品，該課程產品已依 PRD-001 決策 #5 下架）
- **框架**：Next.js 15（App Router）＋ React 19 ＋ TypeScript
- **語言**：介面與內容以繁體中文（zh-Hant-TW）為主
- **內容型態**：全站文案集中於 `src/data.ts`（靜態資料）＋ `src/types.ts`（型別定義）。目前**沒有資料庫、沒有後端 API layer**。
- **AI 相依**：已安裝 `@google/genai`（Gemini），但目前尚未串接任何 `app/api` route。若要導入 AI 功能（例如聊天諮詢、內容生成），需先在 `docs/01_product-requirements` 建立 PRD 再開發。

---

## 2. 指令

套件管理工具為 **pnpm**（repo 內有 `pnpm-lock.yaml`，即使 `package.json` 的 script 名稱看起來通用）。

```bash
pnpm install          # 安裝相依套件
pnpm dev              # 本地開發伺服器（next dev --port=3000）
pnpm build            # 正式建置
pnpm start            # 啟動正式建置後的伺服器
pnpm lint             # next lint
pnpm clean            # 清除 .next / dist / server.js
pnpm content:check    # 防呆掃描（example.com／已下架課程 identifier／失真背景敘述／品牌誤植／舊 LINE 連結）
```

目前沒有設定測試框架（無 unit/integration test）。修改程式碼後，至少要能通過 `pnpm lint` 與 `pnpm build`。

---

## 3. 技術棧

- **Framework**：Next.js 15（App Router），React 19，TypeScript 5.8
- **樣式**：Tailwind CSS 4（`@tailwindcss/postcss`）
- **動畫**：`motion`（Framer Motion 的後繼套件）
- **圖示**：`lucide-react`
- **AI**：`@google/genai`（Gemini，尚未串接）
- **其他 devDependencies**：`express`、`dotenv`、`tsx` — 目前未見對應的伺服器進入點，若要使用請先確認用途並在 PRD/ARC 文件中說明，避免留下未使用的相依。

---

## 4. 專案結構

```text
app/                        # Next.js App Router 路由
├── layout.tsx               # Root layout：字體（Noto Sans/Serif TC）、Header/Footer、ClientLayoutWrapper
├── page.tsx                 # 首頁
├── HomeClientPage.tsx
├── ClientLayoutWrapper.tsx
├── not-found.tsx
├── globals.css
├── about/page.tsx
├── story/page.tsx
├── media/page.tsx
├── training/page.tsx, training/[id]/
├── blog/page.tsx, BlogClientPage.tsx
├── contact/page.tsx
├── faq/page.tsx
├── legal/page.tsx
├── resources/page.tsx
├── services/page.tsx, services/[id]/
└── testimonials/page.tsx

src/
├── components/               # 所有版面區塊元件（PascalCase）
│   ├── Header.tsx / Footer.tsx
│   ├── Hero.tsx / AboutStory.tsx / Personas.tsx / TrustSystem.tsx
│   ├── ServicesSection.tsx / HomeServicesGrid.tsx / HomeTrainingSection.tsx
│   ├── BlogSection.tsx / ResourcesSection.tsx / MediaSection.tsx
│   ├── FAQSection.tsx / ContactSection.tsx / LegalSection.tsx
│   ├── HomeIntuitionBanner.tsx / HomeTestimonialsSection.tsx
│   └── NotFoundPage.tsx
├── data.ts                   # 全站靜態內容（services、courses、blog posts、testimonials、FAQ、resources）
├── types.ts                  # 對應型別：Service / ReikiCourse / Testimonial / BlogPost / FAQItem / ResourceItem
└── index.css

assets/                       # 靜態資源
docs/                         # 專案文件庫（見第 5 節）
```

Path alias：`@/*` → repo 根目錄（見 `tsconfig.json`）。

---

## 5. 開發慣例

- 文案內容一律先進 `src/data.ts` / `src/types.ts`，不要把內容寫死在元件裡。
- 對外連結（官方 LINE、商城、社群、Email 等）一律引用 `src/data.ts` 的 `siteLinks`，不要在元件裡寫死網址。
- 文案來源是本機的 `docs/網站文案集.md`（不上傳）。客戶給新版 docx 時，用 `python3 scripts/docx-to-copy-deck.py <docx> docs/網站文案集.md` 轉檔，才能保留內嵌超連結。
- 元件放在 `src/components/`，檔名與元件名稱一致，使用 PascalCase。
- 樣式以 Tailwind CSS 為主；動畫使用 `motion`。
- 新頁面照現有模式：`app/<route>/page.tsx`（server component）＋ 視需要拆出 `<Route>ClientPage.tsx`（client component）。
- 修改或新增功能前，先確認是否需要建立 PRD／執行計畫（見下方文件流程）。
- 提交前執行 `pnpm lint` 與 `pnpm build`，確保沒有型別或建置錯誤。

---

## 6. docs/ 文件架構

本專案的文件治理方式**參考 2026-nuvaclub 專案**的 docs 分類與命名規則，並依 wenling-web 的專案規模做了精簡。完整規則見：

- [`docs/00_manual-and-index/MAN-000_docs-usage-manual.md`](./docs/00_manual-and-index/MAN-000_docs-usage-manual.md) — 分類、文件號規則、新增文件流程
- [`docs/00_manual-and-index/MAN-001_document-index.md`](./docs/00_manual-and-index/MAN-001_document-index.md) — 目前所有文件的索引
- [`docs/00_manual-and-index/MAN-002_project-overview.md`](./docs/00_manual-and-index/MAN-002_project-overview.md) — 專案/品牌總覽
- [`docs/02_architecture-and-rules/ARC-001_architecture-overview.md`](./docs/02_architecture-and-rules/ARC-001_architecture-overview.md) — 技術架構文件

### 目錄總覽

| 資料夾 | 用途 |
| --- | --- |
| `docs/00_manual-and-index` | 使用說明與文件索引 |
| `docs/01_product-requirements` | 產品需求文件（PRD） |
| `docs/02_architecture-and-rules` | 架構、慣例、技術規則（ARC） |
| `docs/03_feature-reference` | 各版面/功能參考說明（REF） |
| `docs/04_execution-plans` | 實作／行動計畫（PLN） |
| `docs/05_audits-and-reports` | 盤點、報告、問題紀錄（AUD / RPT / BUG） |
| `docs/06_research-and-design` | 研究與設計探索（RES） |
| `docs/07_acceptance-and-qa` | 驗收與 QA 文件（ACC） |
| `docs/templates` | 建立新文件用的模板（不計入編號文件庫） |

### 文件號規則

```text
<TYPE>-<NNN>_<kebab-case-title>.<ext>
```

例如：`PRD-001_contact-form-ai-assistant.md`、`PLN-003_blog-category-filter-plan.md`、`ACC-002_contact-form-acceptance.md`。

新增文件時：到對應資料夾找同類型代碼目前最大的編號，接下一號；檔名使用小寫 kebab-case，標題可保留中文。

---

## 7. Agent 工作流程（重要）

在 wenling-web 執行任何「非單純文字/樣式微調」的任務時，請依下列流程走，讓每個功能都留下可追溯的 PRD → 計畫 → 驗收 鏈：

1. **先讀索引**：開始前先看 `docs/00_manual-and-index/MAN-001_document-index.md`，確認是否已有相關 PRD／計畫，避免重工或衝突。
2. **需求變更或新功能 → 先寫 PRD**：在 `docs/01_product-requirements` 新增 `PRD-NNN_<slug>.md`，可複製 `docs/templates/PRD-TEMPLATE.md`。單純文字/樣式修正可省略。
3. **開始實作前 → 先寫執行計畫**：在 `docs/04_execution-plans` 新增 `PLN-NNN_<slug>.md`（複製 `docs/templates/PLN-TEMPLATE.md`），列出批次、涉及檔案、風險，並標註對應的 PRD 編號。
4. **依計畫實作**，過程中若發現需要調整範圍，回頭更新 PRD／PLN，而不是只在程式碼裡默默改掉。
5. **完成後 → 寫驗收文件**：在 `docs/07_acceptance-and-qa` 新增 `ACC-NNN_<slug>.md`（複製 `docs/templates/ACC-TEMPLATE.md`），條列可勾選的驗收項目，並互相引用 PRD／PLN 編號。
6. **小型 bug fix**：可以省略 PRD/PLN，但建議在 `docs/05_audits-and-reports` 留一則簡短的 `BUG-NNN` 或在既有審計報告中補充紀錄。
7. **每次新增文件後，更新** `docs/00_manual-and-index/MAN-001_document-index.md` 索引表。
8. **文件不要刪除**：過期文件在檔案內標註 `> Superseded by: <TYPE>-<NNN>`，保留歷史脈絡。

### 類型代碼

| 代碼 | 用途 |
| --- | --- |
| `MAN` | 使用說明 / 索引 |
| `PRD` | 產品需求文件 |
| `ARC` | 架構、慣例、技術規則 |
| `REF` | 功能／版面參考說明 |
| `PLN` | 實作／行動計畫 |
| `AUD` | 盤點／稽核 |
| `RPT` | 報告 |
| `BUG` | Bug／問題紀錄 |
| `RES` | 研究／設計探索 |
| `ACC` | 驗收／QA 文件 |

如果日後專案變複雜（例如加入後端、認證、金流），可以再參考 2026-nuvaclub 的 `AUT` / `DBS` / `ENV` / `BIZ` 等代碼擴充，原則仍是：**先判斷文件屬性，再決定資料夾**，不要用功能模組直接猜資料夾。
