# ACC-001 官方文案上線驗收

> 適用範圍：PRD-001、PLN-001、PLN-002（Phase 0–6）。
> 測試日期基準：2026-08-18（第三輪更新）。
> 驗收方式：第二輪已改善 PLN-002 §4.5「獨立覆核」缺口（見第 3.1 節）。第三輪首次補上「第四層：
> 視覺驗收」——實際啟動 `pnpm dev`，以 Playwright 走訪全部 10 個路由（桌機＋手機兩種尺寸）、
> 檢查 console error／網路 404，並肉眼複查全頁截圖，過程中發現並修正多項先前三層驗證（內容溯源、
> 自動化防呆、獨立覆核）都沒有攔到的問題，詳見第 3.2 節。

---

## 1. Phase 完成度總覽

| Phase | 對應 PLN-001 批次 | 狀態 | 備註 |
| --- | --- | --- | --- |
| Phase 0：地基與清場 | Batch A、K | ✅ 完成 | 型別擴充；移除七週課程／臼井靈氣課程頁 |
| Phase 1：全站共用資訊 | Batch B | ✅ 完成 | LINE／IG 連結置換；假 email／假商城連結清除 |
| Phase 2：Services 內容 | Batch D→E→F | ✅ 完成 | 8 項服務／3 階希塔課程／4 項證照課程皆逐條溯源 |
| Phase 3：Home 8 Blocks | Batch C | ✅ 完成 | Hero／Persona／培訓／直覺力／見證／媒體／FAQ 逐區塊比對文案集 Block 1–8 |
| Phase 4：About／Story | Batch G | ✅ 完成 | 品牌理念與 14 項技術總覽（`/about`）／真實故事與學經歷、證照（獨立 `/story` 路由）已拆分 |
| Phase 5：Testimonials／Media／Resources／Legal | Batch H | ✅ 完成 | Media 改為真實出版與 Podcast 紀錄；Resources 改為真實免費社群；Legal 移除不實著作權宣稱 |
| Phase 6：路由收尾與最終 QA | Batch I、L | ✅ 完成 | `/story` 路由拆分完成；ESLint 設定補上並通過；`content:check` 腳本已建立並擴充；獨立唯讀 QA 覆核已執行；第三輪補上瀏覽器視覺驗收（第四層），修正多項視覺／內容缺陷（見第 3.2 節） |

---

## 2. 內容溯源比對（第一層：出處對照表節錄）

完整比對已逐檔進行，以下節錄具代表性／風險較高的項目：

| 網站呈現位置 | 文案集行號／段落 | 是否相符 | 備註 |
| --- | --- | --- | --- |
| Hero 標題／副標／雙 CTA | 第 111～117 行 | ✅ | 已改為逐字對照原文，CTA 連結改為真實 `booking.wenling.tw`／`reurl.cc` |
| Persona 3 張卡片內容 | 第 121～144 行 | ✅ | 對應媽媽／單身／企業主三張卡片文字與 CTA 連結 |
| Services energy-healing 8 項 | 第 546～1418 行 | ✅ | 逐服務核對方案／CTA／FAQ |
| Theta 3 階課程 | 第 1542～1822 行 | ✅ | 含深度信念挖掘班（原缺漏，已補齊） |
| 金錢／愛情／人魚靈氣證照 | 第 1824～2196 行 | ✅ | 含退費政策逐字轉錄 |
| 直覺力訓練（HomeIntuitionBanner／certifications 分頁） | 第 241～249 行 | ✅ coming-soon | 文案集本身標註「⚠️ 待客戶補充」，網站以 coming-soon 呈現，未杜撰課程大綱 |
| Media 出版品／Podcast | 第 281～301、2201～2298 行 | ✅ | 3 本書籍真實出版紀錄；6 集 Podcast 為文案集提供之 Wayback Machine 存檔連結 |
| Resources 免費資源 | 第 93、117、382～384、1808～1817 行 | ✅ | 改為真實「豐盛之翼學苑」社群／直播／LINE／媒體專訪頁，移除查無出處的音檔／PDF |
| About 品牌理念 | 第 335～343 行 | ✅ | 逐字轉錄品牌使命宣言 |
| About 14 項方法體系表 | 第 346～367 行 | ✅ | 原網站僅有 10 項且描述為改寫版，已補齊為 14 項並逐欄轉錄原文三欄位 |
| Story 我的故事 | 第 399～438 行 | ✅ | 原網站敘述「科技業工程師」與源文不符，已改為 2019 年家庭／健康／財務崩塌與希塔療癒轉折之真實敘述 |
| 學經歷與證照 | 第 440～534 行 | ✅（節錄） | 原網站「IC 製造科學園區」為失真敘述，已改為台灣大學政治學系／外商數位行銷 9 年／PMP 等真實項目；完整逐條講師姓名與日期未全數轉錄（見第 4 節） |
| blogPosts post-1／post-5 | Story 全文 | ✅ | 移除「設計七週課程」「科技業工程師」等失真敘述，改用真實故事與服務導引 |
| testimonials test-2 | — | ✅ | 移除「完成七週遇見對的人系列課程」，改為「靈魂伴侶解讀＋一對一療癒」（真實服務） |
| Legal 智慧財產權聲明 | — | ✅ | 移除對不存在之引導音頻／PDF 手冊著作權宣稱 |

---

## 3. 防呆掃描（第二層：自動化）

執行 `pnpm run content:check`（`scripts/content-check.sh`）結果：

```
✅ 通過：無 example.com／@example 佔位連結
✅ 通過：無已下架課程之舊 identifier（seven-weeks-love／loveCourseWeeks／reikiTrainingCourses／theta-reiki-training）
✅ 通過：無《七週遇見對的人》殘留課程化措辭
✅ 通過：無「科技業工程師／高科技」等失真創辦人背景敘述
```

### 3.1 獨立唯讀覆核（第五層：本輪新增）

依 PLN-002 §4.5，指派一個獨立、無 Write/Edit 權限的 agent session，重新對照 `docs/網站文案集.md`
原文（不參考先前 session 的 diff 說明），逐一核對本輪異動的高風險檔案。發現並已修正 4 項問題：

| # | 檔案 | 問題 | 修正 |
| --- | --- | --- | --- |
| 1 | `src/components/Hero.tsx` | 「臼井靈氣 Master 導師級傳承」——文案集僅記載「臼井靈氣三階療癒師」，無導師/大師級認證 | 改為「臼井靈氣三階療癒師認證」 |
| 2 | `src/components/Hero.tsx` | 「100+ 位個案真實轉化見證」——查無出處，且 `TrustSystem.tsx` 已在前一輪自我核對時發現並移除同一數字，但 Hero.tsx 裡的重複殘留未被抓到 | 改為「每年破百次個案療癒經驗」（有文案集 Story 區出處） |
| 3 | `app/about/page.tsx` | SEO metadata 描述同樣寫「臼井靈氣大師級資格」 | 改為「臼井靈氣三階療癒師認證」 |
| 4 | `src/components/TrustSystem.tsx` | 「影響至少 30 人…成為身心靈領域的執業療癒師」——文案集僅說 30 人「踏上學習希塔療癒的道路」，未說明後續是否執業 | 移除「成為執業療癒師」的推論性敘述 |

修正後已重新執行 `content:check`／`tsc`／`lint`，全數通過。此發現印證了 PLN-002 §3.1「寫作與驗收
需用不同 agent」的價值——同一 session 自我核對時遺漏的重複性錯誤（同一段失真文案在兩個檔案各出現
一次，只修了一個），改由獨立 session 才被抓出。

### 3.2 瀏覽器視覺驗收（第四層：本輪新增）

依使用者指示，本輪首次實際啟動 `pnpm dev`（雲端沙盒內），以 Playwright + Chromium 走訪全部
10 個路由（`/`、`/about`、`/story`、`/services`、`/services?tab=theta-training`、`/testimonials`、
`/resources`、`/blog`、`/faq`、`/legal`、`/contact`，另加一個刻意不存在的路徑驗證 404 頁），
桌機（1440×900）與手機（390×844）兩種尺寸各跑一輪，記錄 console error、失敗的網路請求與全頁截圖，
並逐頁肉眼複查。發現並修正以下問題（重要性由高至低）：

| # | 問題 | 影響範圍 | 修正 |
| --- | --- | --- | --- |
| 1 | **`app/globals.css` 的 `@theme` 從未定義 `brand-pink-*`／`brand-gold-*`／`brand-stone-*` 這三組色階**，但全站元件大量使用（9 個檔案、上百處）。這些 Tailwind class 因此完全不會產生任何 CSS，等同於整個網站的粉玫瑰輔助強調色（分類標籤、篩選 pill、hover 狀態、次要按鈕）全部消失不見，且連帶讓 `/contact` 頁的送出按鈕（`bg-linear-to-r from-brand-pink-500 to-brand-gold-500`）完全不可見 | 全站視覺呈現、`/contact` 表單可用性 | 在 `@theme` 補上完整的 `--color-brand-gold-*`（對齊既有 design-spec.md 金色色票）與 `--color-brand-pink-*`（design-spec.md 未定義 pink，採用與既有咖啡金色調協調的低飽和玫瑰色）、`--color-brand-stone-*` 色階，一次修復全站數十處失色與 `/contact` 送出按鈕消失問題 |
| 2 | **`/testimonials` 頁與首頁「真實個案蛻變見證」區塊的 4 位具名客戶**（林媽媽／Eva／陳先生／張小姐，含居住地、職業、完整前後對照故事）在 `docs/網站文案集.md` 裡完全查無出處——文案集第 643～648 行「個案真實見證」只有 4 句匿名一行見證。網站上還有一段文字聲稱這些見證「均獲得當事人去識別化同意後公開刊登」，但見證內容本身是虛構的，屬不實聲明 | `TrustSystem.tsx`、`HomeTestimonialsSection.tsx`、`src/data.ts` | 依使用者指示（2026-08-18）：`TrustSystem.tsx`／`HomeTestimonialsSection.tsx` 不再 import／渲染這份具名見證資料，改為誠實的「真實個案見證整理中」提示卡片；`data.ts` 內原始陣列保留但加註警語，待取得真實個案授權後再啟用 |
| 3 | **`app/contact` 送出按鈕不會渲染**（實測為問題 #1 的直接後果，修復後已一併解決） | `src/components/ContactSection.tsx` | 隨問題 #1 修復自動解決；另外把載入態的 emoji 換成 `Loader2` 轉圈圖示 |
| 4 | **`/legal` 隱私權政策聲稱使用「Google Analytics 4 (GA4)」與「第三方 Shopify 商城系統／藍新金流」**，這兩項具名服務在文案集裡完全查無出處，屬杜撰細節 | `src/components/LegalSection.tsx` | 改為不具名的「一般性網站流量統計工具」措辭，並把交易條款改為指向真實的 `booking.wenling.tw` 預約平台 |
| 5 | `/resources` 頁「媒體專訪」項目的 `ctaLink` 寫死為 `/media`，但全站沒有 `/media` 這個路由（`MediaSection` 只掛載在首頁），點擊會導向 404 | `src/data.ts` | 改為 `/#media-section`，錨點連結回首頁的媒體專訪區塊 |
| 6 | 全站有 15 處以上直接把 emoji（🎯🚀✓🔍💰💞🎤💡✕✨等）當作 UI icon 使用，與其餘全站一致使用 `lucide-react` 的視覺語言不一致，觀感不夠專業 | `Personas.tsx`／`StorySection.tsx`／`ResourcesSection.tsx`／`ContactSection.tsx`／`BlogSection.tsx`／`Header.tsx`／`ServicesSection.tsx`／`Hero.tsx` | 全數換成對應的 `lucide-react` icon 元件（`Lightbulb`／`Wallet`／`Heart`／`Mic`／`Target`／`Loader2`／`CheckCircle`／`Search`／`X`／`BookOpen`）；保留 design-spec.md §5 明文允許的「文字＋箭頭 →」次要連結慣例，未強制替換 |
| 7 | 導覽列 8 個分類純文字（例如「療癒與培訓」「療癒部落格」）在桌機版寬度不足時會折成兩行，資訊密度偏高 | `src/components/Header.tsx` | 依使用者指示改為「icon + 縮短文字」（例如「服務」「見證」「部落格」），桌機／手機選單皆同步更新 |

修正後已重新執行 `content:check`（並新增 2 條防呆規則攔截問題 2、4 的殘留與臼井靈氣導師/大師級誇大
用語，見 §3 程式碼）／`tsc`／`lint`，全數通過，並重新截圖確認視覺修復生效。其中問題 1（CSS 色票
遺失）是這一輪影響面最大的發現——三層文字層級的驗證（內容溯源、自動化防呆、獨立覆核）都不會抓到
純視覺呈現的 bug，唯有實際啟動瀏覽器渲染頁面才看得出來，這也印證了 PLN-002 §4「三層驗證法」原本
就規劃了第四層「視覺驗收」的必要性。

## 4. 技術驗證（第三層）

- [x] `npx tsc --noEmit`：0 錯誤
- [x] `pnpm lint`：**本輪已修復**——安裝 `eslint@9` + `eslint-config-next@15` + `@eslint/eslintrc`，
  新增 `eslint.config.mjs`（flat config，extends `next/core-web-vitals`／`next/typescript`），
  並修正過程中發現的既有問題（5 個未使用的 import、4 處 `as any` 型別斷言改為明確聯集型別、
  2 個未使用的元件 props）。目前 `pnpm lint` 輸出 `✔ No ESLint warnings or errors`。
- [ ] `pnpm build`：**雲端沙盒仍因 Google Fonts 網路限制無法完整執行**——已重新測試並用 `curl` 確認
  `fonts.googleapis.com` 回傳 `403 Forbidden`，判定為此沙盒環境的網路白名單限制（非暫時性錯誤、
  非程式碼問題）。請使用者於本機執行最終確認。

## 5. 移除功能的邊界檢查（PLN-002 §5.6）

- [x] `src/data.ts` 內 `loveCourseWeeks`／`reikiTrainingCourses` 等舊資料已刪除
- [x] `ServicesSection.tsx` 內對應 tab／渲染邏輯已刪除
- [x] `Personas.tsx` 的 `recommendedServices` 不再引用舊 id
- [x] `Footer.tsx`／`Header.tsx` 導覽連結已移除或改向新分類
- [x] 全域 grep 對應關鍵字結果為 0（見第 3 節）
- [x] 點過一輪網站確認無 404：**本輪已改用 Playwright 自動化走訪全部 10 個路由（桌機＋手機），
  確認皆回傳 200，且發現並修正一處會導致 404 的錯誤連結（`/resources` 媒體專訪項目，見 §3.2 問題 5）。**
  仍建議使用者另外用真人肉眼在自己的瀏覽器裡走一輪，確認互動細節（例如表單送出後的真實後端行為，
  目前送出後只是前端模擬成功訊息，尚未接任何後端 API）。

---

## 6. 已知未完成事項（誠實列出）

本輪已解決上一輪列出的「視覺驗收（第四層）未執行」「手動 404 檢查未執行」兩項，並額外發現與修正
第 3.2 節列出的 7 項問題。以下為重新盤點後、仍誠實存在的未完成事項：

| 項目 | 說明 |
| --- | --- |
| 學經歷完整清單 | 文案集列出數十筆希塔療癒官方認證的講師姓名與日期（如「基礎DNA　King Chung　十月/27, 2019」），本輪僅按四大類別彙整代表性項目，未逐筆轉錄；文案集原文本身也註記「因檔案眾多，獨立一頁」，建議另開任務逐筆建置 |
| `pnpm build` 沙盒驗證 | 雲端沙盒對 `fonts.googleapis.com` 有網路白名單限制（`curl` 確認 403 Forbidden），無法在本環境完整跑完 `next build`；純屬沙盒網路政策，非程式碼缺陷，需使用者於本機執行 `pnpm build` 做最終確認 |
| 真實個案見證尚未補齊 | `/testimonials` 與首頁見證區塊本輪已改為誠實的「整理中」提示（見 §3.2 問題 2），但這代表網站目前沒有任何具體社會認同（social proof）內容，需要使用者提供真實個案授權後才能重新上線，建議列為下一輪優先事項 |
| 聯絡表單尚未接後端 | `/contact` 送出按鈕修復後外觀已正常，但送出邏輯目前仍是前端模擬成功訊息（`setTimeout` 模擬），沒有真的寄出 email 或寫入任何後端／表單服務，需要另立 PRD 規劃真實的表單處理流程 |
| 全站文字量與 popup 化 | 本輪已將導覽列改為 icon＋縮短文字、testimonials 區塊大幅簡化；但「善用 popup 讓資訊不要一次呈現太多」這個較大範圍的目標，經檢視後發現 FAQ（手風琴）、Blog（文章內容已是彈出視窗）、Services（卡片內建展開／收合）等頁面本來就已採用漸進式揭露設計，本輪判斷不需要為了形式而強制改造這些已經運作良好的既有模式；Legal 頁僅 3 個小節，也評估不需要額外目錄導覽。若使用者觀察實際頁面後仍覺得特定頁面資訊量過大，歡迎指出具體頁面，可以再進一步優化 |
| 獨立覆核的獨立性程度 | 第二輪的「獨立唯讀覆核」雖以獨立 agent session（無 Write/Edit 權限、未讀取先前 diff）執行，但仍在同一使用者、同一次任務脈絡下完成，非跨人／跨組織的正式簽核，重大內容異動建議使用者本人再做一次最終確認 |

---

## 7. 結論

Phase 0–6（型別骨架、全站連結、Services、Home 8 區塊、About／Story 路由拆分、Testimonials／Media／
Resources／Legal、路由收尾與最終 QA）內容已全數完成溯源修正並通過驗收，本輪並補上第四層（瀏覽器
視覺驗收）。三輪累積具體完成：

1. **`/about` 與 `/story` 路由正式拆分**（第二輪）。
2. **ESLint 設定補齊**，`pnpm lint` 現為 `✔ No ESLint warnings or errors`（第二輪）。
3. **獨立唯讀 QA 覆核**，修正 4 項先前自我核對遺漏的問題（第二輪，詳見 §3.1）。
4. **瀏覽器視覺驗收（本輪新增）**：發現並修正全站最大的一個既有 bug——`app/globals.css` 從未定義
   `brand-pink-*`／`brand-gold-*` 色階，導致上百處元件的強調色與 `/contact` 送出按鈕完全不會渲染；
   同時發現並依使用者指示隱藏了完全查無出處的虛構具名見證內容、修正 Legal 頁杜撰的第三方服務具名
   聲明、修掉一處會 404 的錯誤連結、把全站 emoji icon 換成 `lucide-react`、並將導覽列改為 icon＋
   縮短文字（詳見 §3.2）。

`tsc --noEmit`、`pnpm lint`、`pnpm run content:check`（已擴充至 6 條防呆規則）三項技術驗證全數通過，
`pnpm run scripts/visual-qa.mjs`（Playwright，需另外安裝）走訪全部 10 個路由確認皆回傳 200 且無
console error／404。仍誠實保留的缺口（見第 6 節）：`pnpm build` 因沙盒網路限制無法在此環境完整驗證、
真實個案見證尚待使用者提供授權後補上、聯絡表單尚未接真實後端、學經歷逐筆講師姓名/日期尚未全數轉錄。

**是否可以讓客戶看這個第一版？** 就「文案內容是否誠實、可追溯」與「頁面是否能正常瀏覽、無明顯視覺
或功能缺陷」而言，本輪修復後已達到可以展示的水準。但在正式給客戶看之前，建議使用者至少先做兩件事：
（1）在本機跑一次 `pnpm dev` 親自點過一輪，確認手機/平板等實機顯示效果符合期待；（2）決定聯絡表單
在客戶看到之前要不要先接上真實的收件機制，避免客戶測試送出後誤以為已經送達。
