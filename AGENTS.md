# AGENTS.md

本檔案提供給在此 repository 工作的 AI coding agent（Claude Code、Codex 等）閱讀，說明專案背景、技術棧、慣例，以及**文件治理流程**。任何非單純文字修正的工作，開始前請先讀完本檔案，特別是「docs/ 文件架構」與「Agent 工作流程」兩節。

---

## 1. 專案概觀

- **品牌**：豐盛之翼學苑（創辦人：文齡老師 Keila）。依 PRD-003，網站以學苑為品牌主體，文齡老師以創辦人身分呈現
- **性質**：品牌官網，整合能量療癒服務、希塔療癒與靈氣（金錢／愛情／人魚）雙證照認證培訓；暢銷書《七週遇見對的人》為文齡老師撰寫改版推薦序之真實著作（非本站銷售之課程產品，該課程產品已依 PRD-001 決策 #5 下架）
- **框架**：Next.js 15（App Router）＋ React 19 ＋ TypeScript
- **語言**：介面與內容以繁體中文（zh-Hant-TW）為主
- **內容型態**：全站文案集中於 `src/data.ts`（靜態資料）＋ `src/types.ts`（型別定義）。目前**沒有資料庫、沒有後端 API layer**。
- **AI 相依**：無。`@google/genai` 從未串接，已於 2026-10-05 移除（PLN-005 決定 3）。若要導入 AI 功能（例如聊天諮詢、內容生成），需先在 `docs/01_product-requirements` 建立 PRD 再開發。

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
- **動畫**：`motion`（Framer Motion 的後繼套件）；首頁的捲動故事用 `gsap`＋`ScrollTrigger`（經 `@gsap/react` 的 `useGSAP`）
- **圖示**：`lucide-react`
- **互動元件**：`radix-ui`（Tabs 等原件）、原生 `<details>` 收合
- **量測**：`@vercel/analytics`，只透過 `lib/track.ts` 呼叫（自訂事件需 Vercel Pro 方案）
- 未使用的 `express`、`dotenv`、`tsx`、`@google/genai` 已於 2026-10-05 移除。新增相依前先確認用途並在 PRD/ARC 文件中說明。

---

## 4. 專案結構

```text
app/                        # Next.js App Router 路由（路由不可任意增減，見 PRD-004 §3）
├── layout.tsx               # Root layout：字體（Noto Sans/Serif TC 可變字型）、Header/Footer、MotionProvider、SiteInteractions
├── page.tsx                 # 首頁（七張 slide 的故事舞台，見 RES-005 與 ARC-002 §7）
├── ClientLayoutWrapper.tsx  # 右下角浮動按鈕
├── not-found.tsx, globals.css
├── about/ story/ media/ testimonials/ resources/ contact/ blog/ legal/
├── services/page.tsx, services/[id]/page.tsx
└── training/page.tsx, training/[id]/page.tsx

src/
├── components/               # 版面區塊元件（PascalCase）
│   ├── Header / DesktopNav / MobileNav / Footer / CtaBand / StickyCtaBar / PageHeader
│   ├── SiteInteractions.tsx  # 全站點擊：量測事件、LINE 帶話
│   ├── AboutStory / StorySection / TrustSystem / MediaSection / ResourcesSection
│   ├── ContactSection / BlogSection / LegalSection / ServicesSection / TrainingSection / NotFoundPage
│   ├── page/                 # 分頁共用：PageHero、PageSection、ChipTabs、PageSheet、Pager、JourneyNext（PLN-006）
│   ├── about/ story/ services/ training/ media/ blog/ resources/ legal/  # 各分頁自己的小元件
│   ├── stage/                # 首頁的故事舞台：HomeStage、各張 slide、StageSheet、stage*.css、timelines/（GSAP）
│   ├── offering/             # 服務與課程詳細頁：OfferingDetail、ContentBlocks
│   ├── motion/               # Reveal、CountUp、MotionProvider、useScrolled
│   └── brand/                # WingsCompass、WingsMark（替代圖形，正式 Logo 到位後替換）；
│                             #   emblemData.ts 由 `node scripts/emblem/build-react.mjs` 產生
├── content/                  # 由文案集產生或整理的內容：offerings.ts、pages.ts、stages.ts
├── data.ts                   # 全站靜態內容與 siteLinks
└── types.ts

components/ui/                # shadcn 元件：button、navigation-menu、separator、sheet
lib/                          # utils、track（量測出口）、need（記住選擇）、chapter（目前章節）
scripts/                      # docx-to-copy-deck.py、build-offering-content.py、content-check.sh
│                             # emblem/：金翼羅盤的幾何模組與四張 SVG 的產生腳本（規範見 proposals/emblem/BRIEF.md）
public/brand/                 # 金翼羅盤 SVG：emblem-open／folded／exploded／mark（由 scripts/emblem 產生，不要手改）
docs/                         # 專案文件庫（見第 6 節）
```

Path alias：`@/*` → repo 根目錄（見 `tsconfig.json`）。

---

## 5. 開發慣例

- **文案只能逐字取自客戶的 `網站文案集.docx`（本機轉檔 `docs/網站文案集.md`），不可自行撰寫、改寫或摘要任何對訪客顯示的文字**；docx 沒有的就不放文字，改用數字或圖示，並列為待客戶提供。細則見 [`ARC-002`](./docs/02_architecture-and-rules/ARC-002_ui-and-interaction-rules.md) §1。
- 文案內容一律先進 `src/data.ts` / `src/types.ts`（或 `src/content/**`），不要把內容寫死在元件裡。
- 對外連結（官方 LINE、商城、社群、Email 等）一律引用 `src/data.ts` 的 `siteLinks`，不要在元件裡寫死網址。
- 文案來源是本機的 `docs/網站文案集.md`（不上傳）。客戶給新版 docx 時，用 `python3 scripts/docx-to-copy-deck.py <docx> docs/網站文案集.md` 轉檔，才能保留內嵌超連結。
- 元件放在 `src/components/`，檔名與元件名稱一致，使用 PascalCase。
- 樣式以 Tailwind CSS 為主；動畫使用 `motion`。UI、動效與互動規則見 `ARC-002`。
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
