# PLN-003：首頁架構、品牌標示、合作夥伴與服務轉商品頁重構 執行計畫

**狀態：** In Progress（Batch A／B／C 已完成，Batch D–G 待排時間執行）
**日期：** 2026-08-21
**前置 PRD：** [`PRD-002_round4-homepage-brand-partner-product-restructure.md`](../01_product-requirements/PRD-002_round4-homepage-brand-partner-product-restructure.md)

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

### Batch D：服務／課程型別與資料重構（商品頁前置）

- `src/types.ts`：盤點 `Service` 與 `ReikiCourse` 兩個型別是否足以支撐獨立詳細頁（例如是否需要 `slug`、`category: 'energy-healing' | 'theta-training' | 'certification'` 欄位方便詳細頁麵包屑與返回列表)。已確認 `services`／`reikiCourses`／`certificationCourses` 三個陣列共 41 個 `id`，彼此不重複，可用同一組 `id` 做為路由參數。
- `src/data.ts`：視需要為每筆資料補上 `category` 欄位（若型別調整有加）。

### Batch E：服務詳細頁路由與元件重構

- 新增動態路由 `app/services/[id]/page.tsx`（＋對應 Client Component），依 `id` 到 `services`／`reikiCourses`／`certificationCourses` 三陣列查找資料並渲染詳細頁；查無資料則 `notFound()`。
- 詳細頁版面延續現有卡片展開內容（名稱、適合對象、效益列點、方案/價格、CTA、如有 FAQ／流程/退費政策等既有欄位），不做電商風格改版。
- `ServicesSection.tsx`：卡片從「點擊展開 `expandedServiceId`」改為「點擊導向 `/services/${id}`」（`Link`），移除原地展開的 `AnimatePresence` 手風琴邏輯，改為總覽卡片 + 連結。
- `app/services/page.tsx`：`metadata` 維持總覽頁描述（依 Batch A 討論結果決定品牌字樣去留）。

### Batch F：連結盤點與修正

依 `PRD-002` 3.4 節清單逐一檢查並修正：

- `app/HomeClientPage.tsx`（Persona／HomeServicesGrid 的 `onNavigateToService`）：`/services?tab=${serviceId}` → `/services/${serviceId}`。
- `StorySection.tsx`、`BlogSection.tsx`、`Header.tsx`（Quick Booking CTA）、`MobileNav.tsx`：確認是否應保持指向 `/services` 總覽，或改指向特定詳細頁；多數應維持指向總覽頁，僅 CTA 型連結（例如部落格文章結尾推薦特定服務）才需要改成詳細頁網址。

### Batch G：測試與 QA

- `npx tsc --noEmit`、`pnpm run lint`、`pnpm run content:check`。
- 手動走查：首頁無 FAQ、主導覽無 FAQ 無折行、`/services` 總覽卡片可正確導向 41 個詳細頁且無 404、品牌標示三處一致、合作夥伴佔位卡片版面正常（桌機＋手機）。
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
metadata.json
```

---

## 4. 資料與外部服務注意事項

- 所有內容仍先進 `src/data.ts`／`src/types.ts`，不寫死在元件內，延續 PLN-001 的既有原則。
- 合作夥伴的照片，本次僅做佔位版型，正式圖片之後以外部連結或 `public/` 靜態資源方式補上即可，不涉及後端上傳功能。
- 服務詳細頁不涉及金流/購物車，CTA 一律導向既有 `booking.wenling.tw` 預約平台，維持現行模式。

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
- 主導覽（無 FAQ 項目、無折行、服務入口正常）
- 服務／課程詳細頁（41 筆逐一可訪問、內容與原展開卡片一致、無 404）
- 合作夥伴佔位區塊版面（桌機／手機）

---

## 7. 風險

- **Batch E 影響面最廣**：`ServicesSection.tsx` 的展開/收合邏輯目前也被 `initialSubTab` query 導頁機制使用（見 `useEffect` 內的 `services.some(s => s.id === initialSubTab)` 分支），改為獨立路由後，這段邏輯與相關 query 導頁方式需要整段重新設計，非單純新增檔案。
- **品牌標示範圍（Batch A）** 目前只確認「網站所有權」標示（Logo/Footer/版權/SEO 標題/metadata.json）要換，但各內頁 `<title>` 是否也算在內，PRD-002 已標記為待確認，實作前建議先跟客戶對齊，避免做完又要改一次。
- **合作夥伴資料結構（Batch C）** 命名需與既有 `partnerLogos`（媒體合作紀錄）明確區分，避免未來維護時混淆兩種不同性質的「夥伴」資料。
