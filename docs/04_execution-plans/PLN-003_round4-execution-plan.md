# PLN-003：首頁架構、品牌標示、合作夥伴與服務轉商品頁重構 執行計畫

**狀態：** ✅ 完成（Batch A–G 全數完成，2026-08-21；驗收見 [`ACC-002`](../07_acceptance-and-qa/ACC-002_round4-services-training-restructure-acceptance.md)）
**日期：** 2026-08-21
**前置 PRD：** [`PRD-002_round4-homepage-brand-partner-product-restructure.md`](../01_product-requirements/PRD-002_round4-homepage-brand-partner-product-restructure.md)（v1.1，2026-08-21 追加 §3.3 服務/培訓詳細頁規格）

> **2026-08-21 更新**：Batch D／E 尚未開工，客戶同日對話進一步釐清規格，本文件 Batch D–G 已依 PRD-002 v1.1 改寫（服務/培訓拆兩個總覽頁、詳細頁含專屬見證、允許商城式版面、圖片改漸層＋文字、直覺力培訓併入療癒師認證）。

---

## 1. 開發目標

落地 PRD-002 的 5 項需求。範圍最大、風險最高的是 Batch D／E（服務轉商品詳細頁），建議獨立驗證後再繼續其他批次；其餘批次（品牌標示、首頁 FAQ 移除、合作夥伴佔位）彼此獨立、可平行處理。

---

## 2. 建議批次

### Batch A：品牌標示置換（低風險，建議優先做）— ✅ 已完成（2026-08-21）

- `Header.tsx` Logo 區、`Footer.tsx` 品牌區塊與版權列 → 「豐盛之翼學苑」。
- `app/layout.tsx`、`app/page.tsx` 的 `<title>`／`description`、`metadata.json` 的 `name`／`description` → 改為「豐盛之翼學苑」為主、保留「幸運教主 文齡 Keila」作副標／SEO 關鍵字。
- **已確認**：`app/about`、`app/services`、`app/blog` 等各內頁 `<title>` 維持原樣（保留「幸運教主 文齡 Keila」作 SEO 個人品牌關鍵字），本批次不動。
- 講師個人介紹文案（`文齡老師`／`Keila` 出現在內文敘述處）維持不動，不在此批次處理範圍內。
- 順帶修復：`src/data.ts` 的 `primaryNavigation` 匯出在本次開工前已因既有未提交修改遺失，但 `Footer.tsx`／`DesktopNav.tsx`／`MobileNav.tsx` 仍在引用，導致 `tsc` 編譯失敗——已從 git 已提交版本復原，非本次需求範圍內的 bug。

### Batch B：首頁移除 FAQ ＋ 導覽列調整 — ✅ 已完成（2026-08-21）

- `app/HomeClientPage.tsx`：移除 `FAQSection` import 與渲染。
- `Header.tsx`：`menuItems` 移除 `faq` 項目（`DesktopNav.tsx`／`MobileNav.tsx` 本來就讀取 `primaryNavigation`，不需另外改）。
- `src/data.ts` 的 `primaryNavigation`：「支持」分組本來就含 FAQ 連結，隨 Batch A 的復原一併生效，Footer 網站地圖可正常顯示。
- `FAQSection.tsx` 元件本身、`/faq` 路由未變動，僅取消首頁與主導覽引用。

### Batch C：合作夥伴佔位區塊 — ✅ 已完成（2026-08-21）

- `src/types.ts`：新增 `TeamPartner` 型別（`id`、`name`、`title`、`specialty`、`bio`、`photoUrl?`）。
- `src/data.ts`：新增 `teamPartners: TeamPartner[]` 佔位陣列（3 筆假資料，`photoUrl` 留空由元件顯示佔位圖）。已與既有 `partnerLogos`（媒體/講座合作紀錄，性質不同）明確區分。
- `AboutStory.tsx`：在「14 項方法體系」區塊之後、CTA 之前，新增合作夥伴卡片區塊，讀取 `teamPartners`；照片欄位無資料時顯示漸層圓形頭像佔位圖（沿用 Founder Bio 卡片的既有手法）。

### Batch D：服務／培訓型別與資料重構（總覽頁＋詳細頁前置）

- `src/types.ts`：盤點 `Service` 與 `ReikiCourse` 兩個型別是否足以支撐獨立詳細頁，新增：
  - `category`（例如 `'energy-healing' | 'theta-training' | 'theta-certification' | 'healer-certification'`），供詳細頁麵包屑、歸屬總覽頁（`/services` vs `/training`）判斷。
  - `testimonialIds?: string[]`（或等效欄位），對應該服務/課程的專屬客戶見證；供詳細頁抓取指定見證，而非泛用見證池。
  - 圖片欄位改為描述「漸層＋文字」樣式所需的資料（例如沿用既有漸層色票 token，不需要圖片 URL 欄位；如型別已有 `imageUrl` 之類欄位需評估是否移除或改用途）。
- `src/data.ts`：
  - 為 `services`、`thetaTrainingCourses`、`reikiCourses`、`certificationCourses` 四個陣列補上 `category` 欄位。
  - 盤點既有 `testimonials` 內容，建立與各服務/課程的對應關係（`testimonialIds`）；文案集無對應見證者標記待補，不可虛構內容。
  - `certificationCourses`：移除獨立的 `intuition-training` 項目，將其內容（`docs/網站文案集.md` 241–249 行一帶）併入療癒師認證的敘述中（例如作為療癒師認證總覽/詳細頁的一段模組說明），不再產生獨立 `id`／獨立卡片／獨立詳細頁。

### Batch E：`/services`、`/training` 兩個總覽頁 ＋ 詳細頁路由與元件重構

- 新增 `app/training/page.tsx`（＋對應 Client Component）：培訓總覽頁，收錄 `thetaTrainingCourses`＋`reikiCourses`＋`certificationCourses`（已含併入的直覺力培訓內容），版面比照 `/services` 總覽頁（大標題、分類說明、卡片清單），不再依賴 `activeTab` 切換。
- `app/services/page.tsx`：改為只收錄 `services` 陣列（能量療癒 8 項）的總覽頁，移除 `theta-training`／`certifications` tab。
- 新增動態路由 `app/services/[id]/page.tsx`、`app/training/[id]/page.tsx`（＋對應 Client Component），依 `id` 到各自陣列查找資料並渲染詳細頁；查無資料則 `notFound()`。
- 詳細頁版面延續現有卡片欄位（名稱、適合對象、效益列點、方案/價格、CTA、如有 FAQ／流程/退費政策等），並依 PRD-002 v1.1 加長為商城商品銷售頁式的完整介紹（痛點／效益／流程鋪陳可更完整），加入該項專屬客戶見證區塊；圖片一律用品牌漸層背景＋文字，不使用照片。
- `ServicesSection.tsx`：拆分為服務／培訓兩份呈現邏輯，卡片從「點擊展開 `expandedServiceId`」改為「點擊導向 `/services/${id}` 或 `/training/${id}`」（`Link`），移除原地展開的 `AnimatePresence` 手風琴邏輯與 `activeTab` 切換，改為兩個總覽頁 + 卡片連結。
- 導覽：`Header.tsx`／`DesktopNav.tsx`／`MobileNav.tsx` 的 `theta-training` 子項目 `href` 由 `/services?tab=theta-training` 改為 `/training`。
- `app/services/page.tsx`、`app/training/page.tsx`：`metadata` 各自設定總覽頁描述（依 Batch A 討論結果決定品牌字樣去留）。

### Batch F：連結盤點與修正

依 `PRD-002` 3.4 節清單逐一檢查並修正：

- `app/HomeClientPage.tsx`（Persona／HomeServicesGrid 的 `onNavigateToService`）：`/services?tab=${serviceId}` → 依 `id` 所屬陣列改為 `/services/${serviceId}` 或 `/training/${serviceId}`。
- `StorySection.tsx`、`BlogSection.tsx`、`Header.tsx`（Quick Booking CTA）、`MobileNav.tsx`：確認是否應保持指向 `/services`／`/training` 總覽，或改指向特定詳細頁；多數應維持指向對應總覽頁，僅 CTA 型連結（例如部落格文章結尾推薦特定服務）才需要改成詳細頁網址。

### Batch G：測試與 QA

- `npx tsc --noEmit`、`pnpm run lint`、`pnpm run content:check`。
- 手動走查：首頁無 FAQ、主導覽無 FAQ 無折行、`/services`／`/training` 兩個總覽頁各自完整呈現且無 tab 殘留、卡片可正確導向各自詳細頁且無 404、每個詳細頁顯示對應專屬見證、直覺力培訓已併入療癒師認證不再獨立出現、服務項目圖片皆為品牌漸層＋文字樣式、品牌標示三處一致、合作夥伴佔位卡片版面正常（桌機＋手機）。
- 完成後建立 `ACC-002` 驗收文件，記錄結果。

---

## 3. 建議檔案位置

```text
src/types.ts
src/data.ts
src/components/AboutStory.tsx
src/components/ServicesSection.tsx
src/components/Header.tsx
src/components/MobileNav.tsx
src/components/DesktopNav.tsx
src/components/Footer.tsx
app/HomeClientPage.tsx
app/layout.tsx
app/page.tsx
app/services/page.tsx
app/services/[id]/page.tsx
app/services/[id]/ServiceDetailClientPage.tsx
app/training/page.tsx
app/training/[id]/page.tsx
app/training/[id]/TrainingDetailClientPage.tsx
metadata.json
```

---

## 4. 資料與外部服務注意事項

- 所有內容仍先進 `src/data.ts`／`src/types.ts`，不寫死在元件內，延續 PLN-001 的既有原則。
- 合作夥伴的照片，本次僅做佔位版型，正式圖片之後以外部連結或 `public/` 靜態資源方式補上即可，不涉及後端上傳功能。
- 服務詳細頁不涉及金流/購物車，CTA 一律導向既有 `booking.wenling.tw` 預約平台，維持現行模式。
- 服務／培訓項目一律用品牌漸層背景＋文字呈現，不使用照片，因此不需要圖片素材／上傳流程。
- 詳細頁專屬客戶見證取用既有 `testimonials` 資料，不新增拍攝/募集流程；若某服務/課程目前無對應見證，先標記待補，不可虛構內容頂替。

---

## 5. 實作順序

1. Batch A（品牌標示）— 風險最低，可獨立先做並先給客戶確認效果。
2. Batch B（首頁 FAQ 移除＋導覽調整）— 與 Batch A 互不相依，可平行。
3. Batch C（合作夥伴佔位）— 與 A、B 互不相依，可平行。
4. Batch D → Batch E → Batch F（服務轉商品頁，依序做，因為 E 依賴 D 的型別/資料調整，F 依賴 E 的新路由確定）。
5. Batch G 全站測試與驗收文件。

---

## 6. 驗收對應

對應 `ACC-002`（實作完成後建立）：

- 品牌標示一致性（Logo／Footer／版權／瀏覽器分頁標題）
- 首頁架構（無 FAQ，捲動至 Footer 正常）
- 主導覽（無 FAQ 項目、無折行、服務入口正常、`theta-training` 子項目指向 `/training`）
- `/services`、`/training` 兩個總覽頁各自完整呈現，無 tab 殘留
- 服務／培訓詳細頁（逐一可訪問、內容含專屬客戶見證、圖片為漸層＋文字樣式、無 404）
- 直覺力培訓已併入療癒師認證、不再獨立呈現
- 合作夥伴佔位區塊版面（桌機／手機）

---

## 7. 風險

- **Batch E 影響面最廣**：`ServicesSection.tsx` 的展開/收合邏輯目前也被 `initialSubTab` query 導頁機制使用（見 `useEffect` 內的 `services.some(s => s.id === initialSubTab)` 分支），改為 `/services`、`/training` 兩個獨立總覽頁＋各自詳細頁後，這段邏輯與相關 query 導頁方式需要整段重新設計，非單純新增檔案。
- **專屬見證盤點（Batch D）**：需要人工比對每項服務/課程與既有 `testimonials` 內容的對應關係，資料量較大且可能有服務/課程目前無對應見證可用，需與客戶確認是否补拍/補寫或先留待補標記，避免實作時虛構見證內容。
- **直覺力培訓內容併入（Batch D）**：需確認併入療癒師認證後的文案措辭是否需要客戶/文案集重新調整，或僅做版面上的合併，避免自行改寫既有文案語意。
- **品牌標示範圍（Batch A）** 目前只確認「網站所有權」標示（Logo/Footer/版權/SEO 標題/metadata.json）要換，但各內頁 `<title>` 是否也算在內，PRD-002 已標記為待確認，實作前建議先跟客戶對齊，避免做完又要改一次。
- **合作夥伴資料結構（Batch C）** 命名需與既有 `partnerLogos`（媒體合作紀錄）明確區分，避免未來維護時混淆兩種不同性質的「夥伴」資料。
