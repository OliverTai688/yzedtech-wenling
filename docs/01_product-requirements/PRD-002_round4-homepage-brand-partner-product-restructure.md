# PRD-002：首頁架構、品牌標示、合作夥伴與服務轉商品頁重構

**版本：** 1.0
**日期：** 2026-08-21
**狀態：** Ready for Implementation（客戶已於 2026-08-21 對話中逐項確認決策）
**相關文件：** [`PRD-001_official-copy-content-module-and-demo-data-removal.md`](./PRD-001_official-copy-content-module-and-demo-data-removal.md)、[`PLN-001`](../04_execution-plans/PLN-001_official-copy-rollout-execution-plan.md)、[`PLN-002`](../04_execution-plans/PLN-002_multi-phase-agent-orchestrated-execution-plan.md)

---

## 1. 概觀

客戶在 PLN-001／PLN-002 完成的官方文案上線基礎上，提出第四輪的 5 項調整需求：首頁移除 FAQ、新增合作夥伴介紹、新增商品頁、統一品牌標示為「豐盛之翼學苑」、重新檢視 Navigation。本 PRD 記錄與客戶逐項確認後的決策範圍，作為 `PLN-003` 執行計畫的前置依據。

---

## 2. 異動摘要

| # | 需求 | 現況 | 目標狀態 |
| --- | --- | --- | --- |
| 1 | 首頁不放 FAQ | `HomeClientPage.tsx` 第 8 段為 `FAQSection` | 直接移除該段，不補其他內容；`/faq` 頁面本身保留 |
| 2 | 合作夥伴介紹與照片區塊 | 不存在；`合作夥伴` 僅是文案裡的形容詞 | 於 `/about`（`AboutStory.tsx`）下半部新增區塊，素材未到位前先用佔位資料卡版位 |
| 3 | 商品頁 | 服務／課程以「卡片內展開收合」呈現於 `/services` 單頁 | 三大類（能量療癒 8 項／希塔培訓／證照課程）全數改為各自獨立的詳細頁，導覽列沿用原「服務」入口 |
| 4 | 品牌所有權標示統一為「豐盛之翼學苑」 | Logo 區、Footer、版權列、SEO 標題、`metadata.json` 皆顯示「幸運教主 文齡 Keila」 | 上述所有對外「網站/品牌」標示改為「豐盛之翼學苑」；講師個人介紹文案（文齡老師／Keila）維持不動 |
| 5 | Navigation 呈現方式 | 8 項 icon＋文字，桌機曾折成兩行 | 維持 icon＋文字風格；先靠本次 #1、#3 的異動騰出空間（移除 FAQ 主導覽項目、服務／商品共用一個入口），暫不做大改版，待 #2、#3 內容底定後再整體檢視 |

---

## 3. 詳細需求

### 3.1 首頁移除 FAQ 區塊

現況：`app/HomeClientPage.tsx` 匯入並渲染 `FAQSection` 作為首頁最後一段。

期望行為：移除該段落與匯入，首頁在 `MediaSection` 之後直接接 `Footer`。不需要用其他內容遞補（客戶已確認）。

**涉及檔案：** `app/HomeClientPage.tsx`

### 3.2 導覽列：FAQ 項目與服務／商品整併

現況：`src/components/Header.tsx` 主導覽（桌機／手機共用 `menuItems`）含 8 項，其中 `faq` 為獨立入口；`services` 為獨立入口。

期望行為：
- 主導覽移除 `faq` 項目；`/faq` 頁面路由不刪除，改由 `Footer.tsx` 的網站地圖（`primaryNavigation`，見 `src/data.ts`）收錄連結，維持可被找到。
- `services` 導覽項目原地保留，但其目的地內容依 3.3 節重構為商品頁；不新增獨立「商品」入口。

**涉及檔案：** `src/components/Header.tsx`、`src/components/DesktopNav.tsx`、`src/components/MobileNav.tsx`（如導覽項目定義在此）、`src/data.ts`（`primaryNavigation`，若 Footer 網站地圖需要新增 FAQ 連結）

### 3.3 服務／課程改為獨立商品詳細頁

現況：`ServicesSection.tsx` 以 `activeTab`（healing／theta-training／certifications）切換三大分類，`healing` 分類下每張卡片用 `expandedServiceId` 做原地展開／收合；資料來自 `src/data.ts` 的 `services`、`reikiCourses`、`certificationCourses` 三個陣列（共 41 個 `id`，跨陣列彼此不重複，已確認）。

期望行為：
- 三大類（能量療癒 8 項、希塔培訓 3 門、證照課程 N 門）全部改為**各自獨立的詳細頁**，每項有自己的網址，可被直接分享／加入書籤／利於 SEO。
- 視覺延續現有服務卡片的設計語言（大標題、適合對象、效益列點、方案與價格、CTA），**不**改成電商商品頁風格（不做大圖規格表／購物車按鈕語彙）。
- `/services` 維持為總覽列表頁（分類 tab + 卡片清單），卡片點擊後導向對應的詳細頁，取代目前的原地展開。
- Header／Footer／各處連結中原本用 `/services?tab=xxx` 或錨點導頁的地方，需要盤點並改為導向新的詳細頁網址（見 3.4）。

**涉及檔案：** `src/components/ServicesSection.tsx`、`src/data.ts`、`src/types.ts`、`app/services/**`

### 3.4 相關連結盤點（受 3.3 影響）

以下位置目前導向 `/services` 或 `/services?tab=xxx`，重構後需要確認連結目的地是否仍正確（多數應維持指向總覽頁即可，不需逐一改為詳細頁）：

- `app/HomeClientPage.tsx`（Persona／HomeServicesGrid 的 `onNavigateToService` → `/services?tab=${serviceId}`）
- `src/components/StorySection.tsx`、`src/components/BlogSection.tsx`、`src/components/Header.tsx`、`src/components/MobileNav.tsx`

> 注意：目前 `?tab=` 的 query 實際傳的是 `serviceId`（例如 `personal-1on1`），不是分類 tab id；`ServicesSection.tsx` 現有邏輯是用這個 id 去比對 `services` 陣列並展開對應卡片。重構後這些呼叫點應改為直接連到新的詳細頁網址（例如 `/services/personal-1on1`），語意更正確。

### 3.5 合作夥伴介紹區塊（佔位版）

現況：`AboutStory.tsx` 目前只有品牌理念 + 14 項方法體系 + 導向 `/story` 的 CTA，沒有夥伴／團隊區塊。

期望行為：在 `AboutStory.tsx` 下半部（14 項方法體系之後、CTA 之前）新增一個合作夥伴介紹區塊，卡片式呈現多位夥伴，每張卡片含：照片佔位圖、姓名（佔位）、頭銜／專長（佔位）、一句話介紹（佔位）。客戶素材尚未準備，本次先完成版型與資料結構，之後只需替換 `src/data.ts` 裡的陣列內容即可上線，不需要改元件。

**涉及檔案：** `src/components/AboutStory.tsx`、`src/data.ts`（新增例如 `teamPartners` 陣列，注意與既有 `partnerLogos`——媒體/講座合作紀錄——是不同概念，不可混用同一個變數）、`src/types.ts`（如需新增型別）

### 3.6 品牌標示統一為「豐盛之翼學苑」

現況：以下位置顯示「幸運教主 文齡 Keila」或「Keila Healing」：

- `src/components/Header.tsx`（Logo 旁品牌名稱）
- `src/components/Footer.tsx`（品牌區塊、版權列）
- `app/layout.tsx`、`app/page.tsx`（`<title>` / meta description）
- `metadata.json`（`name` / `description`）

期望行為：上述「網站/品牌所有權」標示全部改為「豐盛之翼學苑」。**不**更動講師個人介紹文案（例如 About／Story／服務內文中「文齡老師」「Keila」的敘述維持原樣，因為那是講師人設，不是網站品牌歸屬）。

**涉及檔案：** `src/components/Header.tsx`、`src/components/Footer.tsx`、`app/layout.tsx`、`app/page.tsx`、`metadata.json`（其餘各頁 `app/**/page.tsx` 的 `<title>` 若也含「幸運教主 文齡 Keila」品牌字樣，一併檢查是否要同步調整，或保留作為 SEO 關鍵字——實作前需與客戶再次確認每頁 title 的處理原則）

---

## 4. 不在本次範圍內

- 商品頁**不**做金流／購物車功能，維持「介紹 + CTA 導向 `booking.wenling.tw`」的預約制模式。
- 合作夥伴真實照片與文案素材（客戶尚未準備），本次僅完成佔位版型。
- Navigation 的整體重新設計（例如漢堡選單改版、mega menu），待 #2、#3 頁面內容全部到位後再一次性規劃，本次僅做騰出空間的微調。
- 講師個人品牌文案（文齡老師／Keila）內容本身不調整。

---

## 5. 實作檢查清單

- [x] 首頁移除 `FAQSection`
- [x] 主導覽移除 FAQ 項目；Footer 網站地圖補上 FAQ 連結（順帶修復既有已遺失的 `primaryNavigation` 匯出，屬前置 bug，非本次需求範圍）
- [ ] `services`／`reikiCourses`／`certificationCourses` 型別與資料補齊詳細頁所需欄位
- [ ] 新增服務詳細頁路由，`/services` 總覽卡片改為連結而非原地展開
- [ ] 盤點並修正所有指向 `/services?tab=xxx` 的呼叫點
- [x] `AboutStory.tsx` 新增合作夥伴佔位區塊 + `teamPartners` 佔位資料
- [x] 品牌標示（Logo／Footer／版權／首頁 SEO title／metadata.json）改為「豐盛之翼學苑」；各內頁（about/services/blog/…）title 依客戶指示保留「幸運教主 文齡 Keila」作 SEO 個人品牌關鍵字，不變動
- [x] `pnpm run lint`、`npx tsc --noEmit`、`pnpm run content:check` 全數通過

---

## 6. 異動檔案清單

| 檔案 | 異動內容 |
| --- | --- |
| `app/HomeClientPage.tsx` | 移除 FAQ 段落 |
| `src/components/Header.tsx` | 移除 FAQ 導覽項目、品牌名稱改為豐盛之翼學苑 |
| `src/components/MobileNav.tsx` / `DesktopNav.tsx` | 同步導覽項目調整（如導覽定義獨立於 Header） |
| `src/components/Footer.tsx` | 品牌名稱、版權列改為豐盛之翼學苑；網站地圖補 FAQ 連結 |
| `app/layout.tsx`、`app/page.tsx` | title/description 品牌字樣調整 |
| `metadata.json` | `name`/`description` 調整 |
| `src/components/AboutStory.tsx` | 新增合作夥伴佔位區塊 |
| `src/data.ts` | 新增 `teamPartners` 佔位資料；服務相關陣列補欄位 |
| `src/types.ts` | 服務詳細頁所需型別調整 |
| `src/components/ServicesSection.tsx` | 卡片展開邏輯改為連結導頁 |
| `app/services/**` | 新增詳細頁路由 |

---

## 7. 測試／驗證方式

- 完成後建立對應 `ACC-NNN` 驗收文件（沿用 PLN-001 系列的三層次驗收法：文案溯源、程式檢查、瀏覽器視覺 QA）。
- 重點驗證：首頁不再出現 FAQ 但可正常捲動到 Footer；主導覽無 FAQ、無雙行折行；每個服務/課程詳細頁皆可獨立訪問且無 404；品牌標示三處（Logo／Footer／瀏覽器分頁標題）一致顯示「豐盛之翼學苑」；合作夥伴佔位卡片版面在桌機/手機皆正常。

---

> 下一步：對應執行計畫見 [`PLN-003_round4-execution-plan.md`](../04_execution-plans/PLN-003_round4-execution-plan.md)。
