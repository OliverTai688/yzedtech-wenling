# ARC-001 架構總覽

**狀態：** Active
**日期：** 2026-08-18

---

## 1. 總覽

wenling-web 是一個 Next.js 15（App Router）品牌官網，目前為**純前端內容站**：所有頁面內容來自 `src/data.ts` 靜態資料，沒有資料庫、沒有 `app/api` 後端 route。

## 2. 資料夾結構

```text
app/                        # Next.js App Router 路由（每個路由一個資料夾 + page.tsx）
├── layout.tsx               # Root layout：Noto Sans/Serif TC 字體、Header/Footer、ClientLayoutWrapper
├── page.tsx / HomeClientPage.tsx
├── ClientLayoutWrapper.tsx
├── not-found.tsx
├── globals.css
└── about/ blog/ contact/ faq/ legal/ resources/ services/ testimonials/
    （各自為 page.tsx，部分搭配 <Route>ClientPage.tsx 拆出 client component）

src/
├── components/               # 版面區塊元件（PascalCase 命名，對應區塊功能）
├── data.ts                   # 全站靜態內容（services、courses、blog posts、testimonials、FAQ、resources）
├── types.ts                  # 對應型別定義
└── index.css

assets/                       # 靜態資源
```

## 3. 路由與 Client/Server 拆分模式

- `app/<route>/page.tsx` 預設為 server component。
- 若頁面需要互動（state、事件處理），拆出 `app/<route>/<Route>ClientPage.tsx` 作為 client component，由 `page.tsx` 引入渲染。範例：`blog/BlogClientPage.tsx`、`services/ServicesClientPage.tsx`。
- `ClientLayoutWrapper.tsx` 掛在 root layout，處理需要在所有頁面套用的 client-side 邏輯。

## 4. 資料層

- 沒有資料庫、沒有 CMS。內容集中在 `src/data.ts`，依 `src/types.ts` 定義的型別（`Service`、`ReikiCourse`、`Testimonial`、`BlogPost`、`FAQItem`、`ResourceItem`）組織。
- 元件透過 import `src/data.ts` 取得內容，不應該在元件內寫死文案或另開本地資料檔。
- 若日後需要 CMS 或資料庫，應先在 `docs/01_product-requirements` 建立 PRD 說明資料來源與遷移方式，並在本文件補充架構異動。

## 5. 樣式與動畫

- Tailwind CSS 4（`@tailwindcss/postcss`），全域樣式在 `app/globals.css`（`src/index.css` 內容需與其核對是否重複，如發現不一致請在 PRD/PLN 中處理，不要各自修改造成漂移）。
- 動畫使用 `motion`（Framer Motion 後繼套件）。
- 圖示使用 `lucide-react`。

## 6. AI（Gemini）相依現況

- `@google/genai` 已列在 `dependencies`，但目前**沒有任何 `app/api` route 或元件呼叫它**。
- 若要導入 AI 功能（例如聊天諮詢、內容輔助生成），必須：
  1. 先在 `docs/01_product-requirements` 建立 PRD，說明使用情境、輸入輸出、隱私與金鑰管理方式。
  2. API 金鑰只能在 server-side（`app/api/*` route）使用，不可以在 client component 中直接呼叫 Gemini SDK 曝露金鑰。
  3. 依 `.env.example` 的慣例新增對應環境變數說明。

## 7. 其他相依套件（待釐清）

`express`、`dotenv`、`tsx` 目前在 `devDependencies`，但 repo 內沒有看到對應的 server 進入點或腳本使用它們。若確認未使用，建議在對應的稽核文件（`docs/05_audits-and-reports`）記錄並考慮移除；若有用途（例如本地腳本、SSR 前的資料抓取），請補充說明並移到適當的 `dependencies`/`devDependencies` 分類。

## 8. 路徑別名

```json
{ "@/*": ["./*"] }
```

`@/*` 對應 repo 根目錄（非 `src/`），import 時請留意這與許多其他 Next.js 專案「`@/*` 對應 `src/*`」的慣例不同。

## 9. 型別與 Lint

- TypeScript `strict: false`（見 `tsconfig.json`），新增程式碼仍建議盡量寫出明確型別，不要依賴寬鬆設定省略型別。
- `pnpm lint` 為 `next lint`，提交前必須跑過。
