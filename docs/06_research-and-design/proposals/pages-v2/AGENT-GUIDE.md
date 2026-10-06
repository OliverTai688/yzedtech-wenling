# 分頁子代理的共同作業說明

所有批次（P1–P5）都照這份做。設計要求在同資料夾的 [`BRIEF.md`](./BRIEF.md)。

## 先讀

1. `AGENTS.md` §5、`docs/02_architecture-and-rules/ARC-002_ui-and-interaction-rules.md`。
2. `docs/06_research-and-design/proposals/pages-v2/BRIEF.md`（硬性規則、預算、第一個畫面、旅程表、可用的操作、審查標準、交付）。
3. 共用元件 `src/components/page/`（`PageHero`、`PageSection`、`ChipTabs`、`PageSheet`、`Pager`、`JourneyNext`）與 `app/globals.css` 的 `.gold-btn`、`.btn-text`、`.chip`、`.icon-btn`、`.disclosure`、`.eyebrow`、`.page-halo`。
4. 示範頁 `docs/06_research-and-design/proposals/pages-v2/_demo.html`（配 `_kit.css`、`_shell.html`）：所有頁面都以它為視覺基準。提案檔放在子資料夾時，樣式連結寫 `../_kit.css`。
5. 自己那一批目前的頁面元件與資料來源（`src/data.ts`、`src/content/**`）。

## 流程（每一頁）

1. **量現況**：用下方工具量這一頁目前每個手機畫面的字數、按鈕數、長度，並看截圖。
2. **寫 `PAGE.md` 與 `index.html` 提案**（`docs/06_research-and-design/proposals/pages-v2/<page>/`）。提案要能直接用瀏覽器開啟，文字全部取自資料檔的原文。
3. **自評**：照 BRIEF §7 的六項給分，低於 80 就先修提案。
4. **實作**：只改自己那一批的頁面元件與對應的 `app/<route>/page.tsx`。
5. **檢查**：截圖讀圖、量測、文案比對、型別與 lint。至少兩輪。

## 共同的界線

- **不可修改**：`src/components/page/**`、`app/globals.css`、`src/data.ts`、`src/types.ts`、`src/content/**`、`src/components/stage/**`、`Header`／`Footer`／`CtaBand`／`StickyCtaBar`／`MobileNav`／`DesktopNav`、其他批次的檔案、`docs/` 其餘部分、`package.json`、git。需要共用元件或資料有所調整時，寫在回報裡，不要自己動。
- 資料需要整理（例如把一段原文拆成幾塊）時，在自己的元件裡處理，不新增任何文字。
- 不新增路由、不新增相依套件、不 commit。
- 每次回覆要短；檔案分小步寫入（單次不超過約 250 行）。先前有子代理因為一次輸出太長而中斷。
- 多個子代理同時在跑：`npx tsc --noEmit` 若出現別人檔案的錯誤，不要去修，只確保自己的檔案沒有錯。

## 工具

開發伺服器：`http://localhost:3100`（已在執行；若停了，有預覽工具就用 `wenling-web` 這個設定啟動，否則在背景執行 `pnpm exec next dev --port 3100`）。開發伺服器執行中不可執行 `pnpm build` 或 `pnpm clean`。

工具在 `/private/tmp/claude-501/-Users-pzps0964713-Documents-github-wenling-web-main/9156bccd-d94a-4044-84ac-1c19c280e369/scratchpad/shots`：

| 指令 | 用途 |
| --- | --- |
| `node shoot.mjs <url> <名稱> mobile\|desktop [螢幕數]` | 逐屏截圖並拼成 `<名稱>-<mode>-sheet*.jpg`，**要實際讀圖判斷** |
| `node audit.mjs <url> mobile\|desktop` | 每個畫面的內文字數（`textPerScreen`、`maxText`）、長度、H1 數、橫向捲軸、小於 40px 的點擊目標、主控台錯誤 |
| `node ctacount.mjs` | 各頁每個手機畫面的按鈕數（內容＋固定列） |
| `node copyaudit.mjs` | 全站文字逐句比對 docx；只能剩「開啟選單」「金色雙翼與羅盤」「麵包屑」 |
| `node widths.mjs` | 25 頁 × 4 寬度：無橫向捲軸、無錯誤、一個 H1、有結尾區塊 |
| `node paths.mjs > paths.json` | 四條轉化路徑（依賴 `[data-cta="offering-primary"]`、`#final-cta-line`、`#final-cta-shop`、`#sticky-cta-bar a` 等，不可破壞） |

提案的 HTML 用 `file://` 網址給 `shoot.mjs` 與 `audit.mjs`。需要測互動（分頁、面板、翻頁、鍵盤、關閉 JavaScript）時，在該資料夾寫小的 puppeteer 腳本（`import puppeteer from 'puppeteer-core'`；`executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'`）。

沒有在截圖或測試輸出裡看到的事，不要回報為完成。

## 回報（200 字以內）

每頁：自評分數；改版前後的長度、單一畫面最多字數、最多按鈕數；用了哪些分層操作；沒做到或不確定的地方；需要主代理調整的共用元件或資料。
