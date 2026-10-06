# ARC-002 UI 與互動規範

**狀態：** Active
**日期：** 2026-10-05
**相關文件：** [`ARC-001`](./ARC-001_architecture-overview.md)、[`PRD-004`](../01_product-requirements/PRD-004_story-driven-interactive-site.md)、[`RES-001`](../06_research-and-design/RES-001_second-revision-uiux-research.md) §7（設計 token）、[`RES-004`](../06_research-and-design/RES-004_story-driven-interaction-and-cta-depth-research.md)、[`proposals/BRIEF.md`](../06_research-and-design/proposals/BRIEF.md)

新增或修改任何畫面元件前先讀這一份。規則依優先順序排列，前面的壓過後面的。

**設計系統**：色彩、字級、間距、圓角、陰影與元件的具體數值，以 claude.ai 上的設計系統為準：<https://claude.ai/artifact/4g9AR5QwELZpFhjd3apdf8>（2026-10-05 建立，私人連結，需擁有者分享才能開啟）。本文件 §4、§5 與它不一致時，以設計系統為準。截至建立當天，網站程式碼尚未套用：元件裡有 33 種寫死的色碼（163 處）、`app/globals.css` 有兩套重複的色彩 token 與三種金色漸層，待依設計系統收斂。

---

## 1. 文案

1. **畫面上的每一句話都必須逐字出自 `Downloads/網站文案集.docx`**（本機轉檔為 `docs/網站文案集.md`，不上傳）。不撰寫、不改寫、不摘要、不翻譯。舊版文案集不是來源。
2. docx 沒有對應文字的地方不放文字，改用數字、圖示或版面本身表達，並把缺的文字記入 `RPT-001` 的待客戶提供清單。
3. 頁面標題與描述（`metadata`）同樣只用 docx 的文字。
4. 文字放在 `src/data.ts` 或 `src/content/**`，不寫死在元件裡；註解標明 docx 的行號。
5. 給螢幕閱讀器的隱藏標籤優先沿用 docx 的詞。純功能性、docx 沒有對應詞的標籤（例如選單按鈕）維持最少，並列在驗收文件。
6. 每次改動後執行比對腳本（§9），對不上的不得上線。

## 2. 不擋路

1. 頁面永遠以原生方式捲動。不改捲動速度、方向，不做整頁吸附。
2. 手機不做固定舞台。桌機的固定元素不放內文。
3. 任何頁面、任何捲動位置都看得到一個行動：頁首的商城按鈕，加上手機的底部固定列或右下角 LINE 按鈕。
4. 每一頁結尾是共用的 `CtaBand`。
5. 每個互動只要求捲動或點一下。不做拖曳、長按、多步表單。

## 3. 文字密度

- 同一個畫面的內文，手機約 100 字、桌機約 150 字為目標。標題、按鈕、收合中的內容不計。
- 卡片預設只有標題加一句話；其餘收合。
- 收合用原生 `<details class="disclosure">`，同一組給相同的 `name`，一次只開一個。收合的內容仍在 HTML 內。
- 不截斷文字（不用 `line-clamp` 藏住原文）。

## 4. 色彩與字級

- 一律用 `app/globals.css` `@theme` 的語意 token（`background`、`card`、`popover`、`primary`、`accent`、`muted`、`border`、`ring`、`inverse`、`line`）。不使用粉色；`content:check` 會擋舊色票 class。
- 深色區塊在容器加 `.dark`。
- 金色漸層只用在主要按鈕、路徑線與節點。底色最深到暖金（`rgba(248,223,160,0.6)`），不在深金底上放內文。
- 標題用明體（`font-serif`），內文用黑體。內文最小 16px，輔助文字最小 14px。
- 兩套字都是可變字型，不要在 `app/layout.tsx` 指定 `weight`（會讓字型樣式表變成 1MB）。

## 5. 按鈕與點擊目標

- **一個畫面只有一顆按鈕**（`.gold-btn`，金）。同一個畫面的第二個行動，只有在它是門檻更低的一步（例如先傳訊息）或文案集本來就列出時才保留，而且一律做成安靜的文字連結 `.btn-text`，不做成第二顆按鈕。清單裡每一列各自的行動（例如每門課的「報名」）也用 `.btn-text`。（2026-10-06 使用者決定；文案集把 Hero 的第二個行動註明為「次按鈕／文字連結」，各對象也只有一行標為「CTA按鈕」。）
- 銀色（`.btn-silver`）只用在手機底部固定列那顆只有圖示的 LINE 圓鈕與右下角的浮動聯絡按鈕。不用綠色或其他品牌色做按鈕（2026-10-06 使用者指示：金色之後是少量銀色）。`.btn-outline` 不再用於行動按鈕。
- 可點擊的元素高度至少 40px；`.gold-btn` 最低 44px。
- 站外連結加 `target="_blank" rel="noopener noreferrer"` 與右上箭頭圖示。
- 連結網址一律取自 `siteLinks`。

## 6. 動效

| 類型 | 做法 | 參數 |
| --- | --- | --- |
| 進場 | `Reveal`／`RevealGroup`（`src/components/motion`） | 位移 16px、0.25 秒、只播一次 |
| 捲動連動 | `motion` 的 `useScroll`，只改 `transform` 與 `opacity` | 不量測版面 |
| 目前位置 | `IntersectionObserver` | 不監聽 `scroll` 事件做判斷 |
| 展開收合 | CSS `::details-content` | 0.25 秒 |
| 清單重排 | View Transitions（已用在 `/services`） | 漸進增強 |
| 數字進場 | `CountUp` | 0.9 秒，伺服器輸出的就是最終文字 |

- 動效要把視線帶向下一步；純裝飾的動效一個畫面最多一個。
- 主標題與主要按鈕不做透明進場。
- 全站包在 `MotionConfig reducedMotion="user"` 內；自己寫的動畫要用 `useReducedMotion()` 直接顯示完成狀態。
- 不載入動畫播放器（Lottie、Rive）與 three.js。小動畫用 SVG 加 CSS 或 `motion`。要引入播放器需先更新本文件。

## 7. 首頁的故事舞台

首頁是七張 slide 的捲動故事（設計原則與分鏡見 [`RES-005`](../06_research-and-design/RES-005_interactive-storytelling-principles-and-home-storyboard.md)），程式在 `src/components/stage/`。§2 的「手機不做固定舞台」在首頁不適用，改為下列規則：

- 釘住的只有 Hero、書、三階段（桌機另加媒體）；其餘是一般捲動。不再增加釘住的段落。
- 釘住用 CSS `position: sticky`，動畫用 GSAP 的 `scrub` 時間軸；不攔截滾輪、不吸附、不改捲動速度。高度用 `svh`。
- 一個畫面一個主角、最多一行字、一顆主要按鈕；補充內容放進 `StageSheet`（「＋」）。主要訊息與主要按鈕不可以藏在點擊之後。
- 動作只用五種：展開／收攏、沿弧線飛行、畫線、淡入淡出、金光掃過。
- 舞台版面只在三個條件都成立時套用：`<html>` 有 `js` 類別、沒有 `st-off`、訪客沒有開啟「減少動態效果」。預設的 CSS 是一般的直向頁面。`stageGuard.ts` 負責在程式沒接上時加上 `st-off`。
- 主標與主要按鈕在伺服器輸出的 HTML 裡，載入就可見，不做透明進場。
- 新增或調整 slide 時，三個地方要同步：`homeContent.chapters`、`app/page.tsx`、手機固定列的最後一章。
- 改動後要重跑：互動檢查、四條路徑、文案比對，並在正式建置版加上慢速網路量一次首次繪製與最大內容繪製（開發版量不出保險機制的問題）。

## 8. 視覺素材

- 目前全站沒有照片，視覺是自製 SVG 與 CSS。金翼羅盤是替代圖形，正式 Logo 到位後替換（RPT-001 G1）。
- 金翼羅盤（2026-10-06 重繪）由 `scripts/emblem/geometry.mjs` 以數學建構：每側三層羽毛 9／7／5 根、長度比 1：0.618：0.382、單翼長度是羅盤外徑的 1.618 倍。四張圖在 `public/brand/`，風格規範在 [`proposals/emblem/BRIEF.md`](../06_research-and-design/proposals/emblem/BRIEF.md)。
  - 改圖形只改 `geometry.mjs`（形狀）或 `pose.mjs`（收攏姿態），然後依序執行 `build.mjs`、`build-folded.mjs`、`build-exploded.mjs`、`build-mark.mjs`、`build-react.mjs`，最後 `check.mjs`。不要手改 SVG 或 `emblemData.ts`。
  - 大尺寸用 `WingsCompass`（可開合、指針可轉、方位點可亮起），72px 以下用 `WingsMark`。小標誌在 16px 會糊掉，所以瀏覽器分頁的圖示沒有換。
  - 一頁可以有多個金翼羅盤；元件會替每個實例的漸層 id 加上各自的前綴，不要把它們放進共用的 `<defs>`。
- 照片與插圖一律經 `next/image` 並提供寬高。第一屏的圖要預先載入，其餘延後。
- 不用 AI 生成的人像代表創辦人、個案或學員。
- 影片不放第一屏；先顯示靜態封面，進入畫面才載入。
- 裝飾性圖形加 `aria-hidden="true"`。

## 9. 量測與檢查

- 事件只透過 `lib/track.ts` 送出。連結類的事件由 `SiteInteractions` 統一處理，不必在按鈕上各寫一次。事件名稱見 PRD-004 §4.5。
- 訪客的選擇（`lib/need.ts`）只存在瀏覽器，不送出。
- 改動後依序執行：`pnpm lint`、`pnpm build`（先停掉開發伺服器）、`pnpm content:check`。
- 另有四支瀏覽器檢查腳本（文案比對、四條轉化路徑、首頁互動、25 頁 × 4 寬度的版面），目前放在開發時的暫存資料夾，尚未收進 repo；做法與結果記在 `ACC-003`、`ACC-004`。
- 速度底線：模擬慢速 4G 手機，首次繪製不慢於 1.5 秒；版面位移 0。
