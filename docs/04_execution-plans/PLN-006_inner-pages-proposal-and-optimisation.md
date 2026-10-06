# PLN-006：其他分頁的提案與優化

**狀態：** Done（待使用者驗收，見 ACC-006）
**日期：** 2026-10-06
**前置 PRD：** [`PRD-004`](../01_product-requirements/PRD-004_story-driven-interactive-site.md)
**相關文件：** [`ARC-002`](../02_architecture-and-rules/ARC-002_ui-and-interaction-rules.md)、[`RES-005`](../06_research-and-design/RES-005_interactive-storytelling-principles-and-home-storyboard.md)、[`ACC-005`](../07_acceptance-and-qa/ACC-005_staged-homepage-acceptance.md)、共用簡報 [`proposals/pages-v2/BRIEF.md`](../06_research-and-design/proposals/pages-v2/BRIEF.md)、設計系統 <https://claude.ai/artifact/4g9AR5QwELZpFhjd3apdf8>

---

## 1. 目標（使用者 2026-10-06 指示）

首頁通過後，**其餘每個分頁都先做 HTML 提案，再實作優化**。不用捲動動畫，但要是乾淨、專業的設計；文字不要一次讀太密，可以用介面操作來分層；每一頁在整個網站的旅程裡有清楚的位置與下一步。**全部提案並實作完成後才請使用者驗收**，同時交付整體網站體驗的評估（評估框架、缺口、下一步開發建議）。

### 完成定義

1. 下方追蹤表的每個分頁都有：HTML 提案、實作、檢查三欄完成。
2. 全站檢查通過：每個手機畫面的內文字數與按鈕數在預算內、文案逐句比對 docx、四條轉化路徑、25 頁 × 4 寬度的版面、`pnpm lint`、`pnpm build`、`pnpm content:check`、正式建置版的載入速度。
3. 元件裡不再有寫死的色碼（首頁舞台的專用樣式除外），全部使用設計系統的 token。
4. 交付 `RPT-002`：整體網站體驗評估（框架、逐項評分與證據、缺口、下一步建議）。
5. 交付 `ACC-006`：給人逐項勾選的驗收清單。

### 這一輪和階段 D 的差別

階段 D 每頁做過三個提案的比較，版面的骨架已經選定。這一輪是把各頁對齊首頁通過後的設計語言（金、銀、暖白；一個畫面一顆按鈕；文字分層；金翼羅盤第二版），所以**每頁一個提案**，由主代理依共用簡報的標準審查後實作；結構上有明顯兩種走法的頁面，提案內要並列說明取捨。

---

## 2. 批次與追蹤

| 批次 | 內容 | 提案 | 實作 | 檢查 |
| --- | --- | --- | --- | --- |
| P0 | 基礎：色彩 token 收斂、共用的分頁元件、旅程資料、提案用的外殼與樣式 | ✅ 示範頁 `proposals/pages-v2/_demo.html` | ✅ `src/components/page/`（PageHero、PageSection、ChipTabs、PageSheet、Pager、JourneyNext）；移除 18 個重複的舊 token | ✅ 型別、lint、100 項版面、首頁互動 24 項、文案比對 |
| P1 | 關於我們 `/about`、創辦人 `/story` | ✅ `proposals/pages-v2/about/`、`proposals/pages-v2/story/` | ✅ `AboutStory`、`about/{TechniqueGroups,UnsureOptions}`、`StorySection`、`story/{ChapterPager,CredentialGroups}` | ✅ 每畫面最多 85／112 字；一個 H1；一顆按鈕 |
| P2 | 服務項目 `/services`、培訓課程 `/training` | ✅ `proposals/pages-v2/services/`、`proposals/pages-v2/training/` | ✅ `ServicesSection`、`services/ChosenMark`、`TrainingSection`、`training/CourseCard` | ✅ 124／100 字；路徑 P1、P4 全過 |
| P3 | 服務詳細頁 `/services/[id]`、課程詳細頁 `/training/[id]`（共用模板） | ✅ `proposals/pages-v2/service-detail/`、`proposals/pages-v2/course-detail/` | ✅ `offering/OfferingDetail`、`offering/{deck,SectionDeck,SectionBehavior}` | ✅ 14 個詳細頁；46–72／88–109 字 |
| P4 | 真實見證 `/testimonials`、媒體專訪 `/media`、好運blog `/blog` | ✅ `proposals/pages-v2/testimonials/`（含授權後的 `authorized.html`）、`proposals/pages-v2/media/`、`proposals/pages-v2/blog/` | ✅ `TrustSystem`、`MediaSection`、`media/EpisodeList`、`BlogSection`、`blog/BlogPosts` | ✅ 0／70／0 字；路徑 P3 全過 |
| P5 | 免費資源 `/resources`、聯繫 `/contact`、法律頁 `/legal`、404 | ✅ `proposals/pages-v2/resources/`、`proposals/pages-v2/contact/`、`proposals/pages-v2/legal/`、`proposals/pages-v2/not-found/` | ✅ `ResourcesSection`、`resources/ResourceTicket`、`ContactSection`、`LegalSection`、`legal/LegalHashSync`、`NotFoundPage` | ✅ 118／38／78 字；錨點直達 |
| P6 | 全站檢查、`RPT-002` 體驗評估、`ACC-006` 驗收清單 | — | ✅ 移除舊首頁元件 9 個檔；結尾區塊不等程式淡入；兩個無障礙修正 | ✅ 正式建置版：首頁互動 24／24、路徑 21 項、速度 13 頁、文案比對；無障礙 28 組零違規；[`RPT-002`](../05_audits-and-reports/RPT-002_site-experience-evaluation-and-next-steps.md)、[`ACC-006`](../07_acceptance-and-qa/ACC-006_inner-pages-acceptance.md) |

P0 先做；P1–P5 在 P0 完成後同時進行（各批只改自己的檔案）；P6 最後。

---

## 3. 風險

| 風險 | 對策 |
| --- | --- |
| 多個子代理同時改到共用檔案 | P0 先把共用元件定好；P1–P5 不得修改共用元件，需要時在回報中提出，由主代理統一處理 |
| 各頁風格又走散 | 共用簡報、共用元件、同一組 token；主代理逐批看截圖 |
| 文案被改動 | 每批完成都跑 docx 比對 |
| 子代理中斷 | 要求小步存檔；中斷後由主代理檢查磁碟上的成果再接續 |

---

## 4. 執行紀錄

- 2026-10-06：P0 完成；P1–P5 由五個子代理同時進行，各自交付提案、實作與回報。
- 2026-10-07：P6。主代理逐批看截圖並重跑全站檢查；處理各批回報的共用問題（翻頁箭頭改用 `aria-disabled`、文字連結的焦點外框）。正式建置版量測時發現慢速網路下字型排在程式之前下載、互動要等約 12 秒，列為 RPT-002 K2，本輪未改字型。
- 各批回報的未解問題彙整在 ACC-006 §5（待決定）與 §6（已知不足）。
