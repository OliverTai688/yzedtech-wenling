# PLN-001：官方文案上線與 Demo 資料清除 執行計畫

**狀態：** Ready for Implementation（PRD-001 決策已於 2026-08-18 確認）
**日期：** 2026-08-18
**前置 PRD：** [`PRD-001_official-copy-content-module-and-demo-data-removal.md`](../01_product-requirements/PRD-001_official-copy-content-module-and-demo-data-removal.md)
**前置稽核：** [`AUD-001_official-copy-vs-current-site-audit.md`](../05_audits-and-reports/AUD-001_official-copy-vs-current-site-audit.md)
**內容來源：** [`docs/網站文案集.md`](../網站文案集.md)
**配套文件：** [`PLN-002_multi-phase-agent-orchestrated-execution-plan.md`](./PLN-002_multi-phase-agent-orchestrated-execution-plan.md) — 本計畫的批次「內容做什麼」，PLN-002 規劃「怎麼分階段執行、Agent 怎麼分工、怎麼驗收」

---

## 1. 開發目標

依 `PRD-001` 的內容模組設計與已確認決策，分批把文案集內容置入網站，移除所有 demo／示範資料，並**明確移除**《七週遇見對的人》課程頁與臼井靈氣課程頁（PRD-001 第 3 節決策 #5、#6）。

---

## 2. 建議批次

### Batch A：型別與內容模組骨架

- 依 `PRD-001` 4.2 節擴充 `src/types.ts`（`PricingPlan` / `ProcessStep` / `ServiceFaqItem` / `ServiceContent` / 課程擴充欄位 / `status: 'live' | 'coming-soon'`）。
- 建立 `src/content/` 目錄骨架（`home.ts`、`about.ts`、`story.ts`、`services/energy-healing.ts`、`services/theta-training.ts`、`services/certifications.ts`、`testimonials.ts`、`media.ts`、`resources.ts`、`faqs.ts`、`legal.ts`、`site.ts`）。
- 決定 `src/data.ts` 去留：若整檔搬遷，需同步更新所有 `import { services, ... } from '../data'` 的引用點（`AUD-001` 第 4～5 節列出的元件）。

### Batch B：全站共用資訊置換（`site.ts`）

- LINE 官方帳號：`@healer.wenling`（`https://lin.ee/yo6a6FW` 或對應 `line.me` 格式，以文案集實際出現的連結為準）。
- IG 帳號：`@keila.healing1491`。
- 免費體驗社群連結：`https://reurl.cc/8DDd1M`（加入密碼 168168）。
- 移除 `hello@example.com`（依 PRD-001 開放決策 #7 結果處理：改 LINE 為主聯絡方式，或等客戶提供正式 Email）。
- 涉及檔案：`src/components/Header.tsx`、`Footer.tsx`、`Hero.tsx`、`ContactSection.tsx`、`app/ClientLayoutWrapper.tsx`。

### Batch C：Home 頁 8 個 Block 文案置換

依 `AUD-001` 第 4 節逐一對應置換，內容出處為文案集第 107～330 行（Home 區塊）：

1. `Hero.tsx`：標題「陪你潛入內心，找回你本具的豐盛與力量」、CTA 連結 `booking.wenling.tw/activities/soul-healing`、次要 CTA 加入免費體驗社群。
2. `Personas.tsx`：三張人物卡（媽媽／單身／企業主）文字、真實一句話見證、各自 CTA（煙供祈福／靈魂伴侶解讀／金錢靈氣課程）連結，依文案集卡片一～三逐字置換。**推薦服務 id 需改指向新的 `energy-healing` / `theta-training` / `certifications` 內容 id，不得再引用已移除的 `seven-weeks-love` / `theta-reiki-training` 舊 id。**
3. `HomeServicesGrid.tsx`：改讀 Batch D 產出的 8 項 `energy-healing` 服務（含 icon、一句話描述、CTA）。
4. `HomeTrainingSection.tsx`：改讀 Batch E 產出的希塔療癒系列 + 靈氣認證系列課程精選。
5. `HomeIntuitionBanner.tsx`：文字改為文案集 Block 5「直覺力培訓」的待補文案與搶先登記 CTA（`status: coming-soon`）。
6. `HomeTestimonialsSection.tsx`：改讀文案集 Block 6「成功案例精選」四大分類見證（感情/單身、家庭/媽媽、事業/企業主、身心蛻變/其他）。
7. `MediaSection.tsx`：改讀文案集 Block 7 出版品（《七週遇見對的人》推薦序、《練愛大確幸》、《好女人的情場攻略》）與 Podcast 精選（美麗佳人／好女人的情場攻略／迷人說）。
8. `FAQSection.tsx`（Home 精選版）：改讀文案集 Block 8 六題 FAQ。

### Batch D：`energy-healing` 8 項服務內容（篇幅最大）

依文案集第 546～1418 行，逐一建立：個人療癒(一對一)、靈性解讀與能量療癒（含人生指南針／靈魂伴侶／4+1 感知中心三主題）、靈性按摩（脈輪清理）、人生推進器（團體遠距療癒）、能量身心靈主題工作坊、遠距煙供祈福儀式、五行香水供奉，共 8 個服務頁／卡片內容，每項含方案價格表、流程、FAQ、見證、免責聲明。

> 註：文案集內「豐盛靈氣」內容在第 1423～1541 行，性質上屬於 `energy-healing` 第 8 項（取代原「愛情靈氣」欄位），需與五行香水供奉一併確認在文案集裡的最終定位（兩者皆可能落在 energy-healing 分類，需依 PRD-001 §5 的 8 項清單核對排序）。

### Batch E：`theta-training` 課程內容

依文案集第 1542～1723 行，建立基礎 DNA、進階 DNA、深度信念挖掘班三門課程（含課綱、費用、報名福利、退費政策），以及線上「造物主與我」／實體「顯化與豐盛」兩門 `coming-soon` 課程。

### Batch F：`certifications` 課程內容（取代 `healer-business`）

依文案集第 1824～2195 行，建立金錢靈氣療癒師與導師授證課程、愛情靈氣證照（鬱金香熱情靈氣導師班）、人魚靈氣證照課程，以及直覺力訓練（`coming-soon`，文案集僅有零星提及，暫無完整課綱）。

### Batch G：About／Story 頁面重構

- `about.ts`：品牌理念（文案集第 335～343 行）、方法體系 14 項技術表格（第 351～366 行）、技術搭配三階段（第 372～378 行）、結尾 CTA（第 380～393 行）。
- `story.ts`：我的故事（第 397～438 行）、學經歷與專業認證（第 440～542 行，含希塔療癒認證列表、靈氣與能量體系認證、高階能量與氣場修護、占卜分析類、直覺力導師認證、學經歷與進修紀錄）。
- 依 PRD-001 決策 #1（已確認拆頁），建立 `/about`（品牌理念＋方法體系）與獨立 Story 路由（`/about/story` 或 `/story`，實作時二擇一並在 `PLN-002` 記錄最終路徑）。`AboutStory.tsx` 需拆分為 About／Story 兩個元件，並重新設計版面容納完整 14 項技術表格與學經歷列表（目前版面較短，需評估是否要做成可展開／分類篩選的長內容頁）。

### Batch H：Testimonials／Media／Resources／Legal

- `TrustSystem.tsx` 讀取的 `testimonials.ts`：整合 Home 精選見證 + 各服務頁見證，依 persona 分類。
- `MediaSection.tsx` 完整版／未來 `/media` 頁：依文案集第 2201～2352 行的完整 Podcast／YouTube／FB 直播清單建立資料。
- `ResourcesSection.tsx`：依文案集「Resources」章節簡短描述（YouTube／LINE 社群介紹），內容需與客戶確認是否已有正式資源可上架，避免沿用現有 4 筆示範資源的連結。
- `LegalSection.tsx`：改為文案集第 2371～2568 行的隱私權政策／服務條款／免責聲明正式條文（`Footer.tsx` 免責聲明已相符，可作為文字比對基準）。

### Batch I：路由結構調整（依決策執行）

- 新增 `/media` 路由；新增 Story 頁（`/about/story` 或 `/story`，Batch G 一併決定路徑）；調整 Header／Footer 導覽項目（Pricing 暫不建站內路由，見 PRD-001 §9 資料缺口）。
- Services 分類 tab id 調整為 `energy-healing` / `theta-training` / `certifications`，需檢查並更新 `Personas.tsx`、`Header.tsx`、`Footer.tsx` 內以 `?tab=` 導頁的連結。

### Batch K：移除《七週遇見對的人》課程與臼井靈氣課程頁（PRD-001 決策 #5、#6）

**目的：乾淨移除，不留殘影。** 依 `AUD-001` 與 `PRD-001` §5，此批次為「刪除」而非「置換」，建議與 Batch A（型別骨架）同時或緊接著做，避免後續批次（尤其 Batch C 的 Home Persona／Training block）誤用到即將被刪除的 id。

- 刪除 `src/data.ts`（或 `src/content/`）內 `loveCourseWeeks`、`reikiTrainingCourses`，以及 `services` / `reikiCourses` 內對應的 `seven-weeks-love`、臼井靈氣相關項目。
- `ServicesSection.tsx`：移除 `seven-weeks-love-tab`、`reiki-training-tab` 兩個分頁與其渲染邏輯，改為三個新分類（`energy-healing-tab` 保留、新增 `theta-training-tab`、`certifications-tab`）。
- `Personas.tsx`：`recommendedServices` 陣列內若引用 `seven-weeks-love`、`theta-reiki-training`，改指向新分類下的真實服務/課程 id（隨 Batch C 一併處理，但需在此批次先確認舊 id 已無殘留）。
- `Footer.tsx`：移除「七週遇見對的人」`/services?tab=seven-weeks-love` 連結；「希塔/靈氣認證班」連結改指向 `theta-training` 或 `certifications`（依實際導頁需求二擇一或改列兩條）。
- 全域搜尋確認：`grep -rn "seven-weeks-love\|loveCourseWeeks\|reikiTrainingCourses\|theta-reiki-training" src app` 結果為 0（Media/About 中純粹提及《七週遇見對的人》**書籍**的文字不受此規則限制，只清除「課程產品」相關的程式碼與資料）。

### Batch L：防呆機制與 QA

- 依 `PRD-001` 第 6 節建立 `scripts/check-content.ts` 與 `content:check` script。
- 全站跑一次 `grep -rn "example.com\|@example\|hello@example" src app`，確認結果為 0。
- 跑 Batch K 的移除確認 grep（見上）。
- 跑 `pnpm run lint`、`pnpm run build` 確認無型別／建置錯誤。
- 建立 `docs/07_acceptance-and-qa/ACC-001_official-copy-rollout-acceptance.md`（實作完成後才建立，逐頁比對文案集出處）。

---

## 3. 建議檔案位置

```text
src/types.ts                          # 擴充型別
src/content/
  home.ts
  about.ts
  story.ts
  services/energy-healing.ts
  services/theta-training.ts
  services/certifications.ts
  testimonials.ts
  media.ts
  resources.ts
  faqs.ts
  legal.ts
  site.ts
src/components/*.tsx                  # 改為讀取 src/content/*，移除寫死文字
app/about/、app/services/、app/media/（新增）、app/story/（視決策新增）
scripts/check-content.ts              # 新增防呆腳本
```

---

## 4. 實作順序

1. Batch A（型別與骨架）＋ Batch K（移除七週課程／臼井靈氣）— 前置工程，兩者一起做：先確立乾淨的資料骨架，避免其他批次踩到即將刪除的 id。
2. Batch B（全站共用資訊）— 影響面廣但改動小，優先做，立即降低 demo 連結數量。
3. Batch D → E → F（Services 各分類內容：`energy-healing` → `theta-training` → `certifications`）— 篇幅最大，可依服務分類拆成多次提交，須先於 Batch C 完成，Home 才能正確引用。
4. Batch C（Home 8 blocks）— 依賴 D/E/F 產出的服務/課程資料。
5. Batch G（About／Story）。
6. Batch H（Testimonials／Media／Resources／Legal）。
7. Batch I（路由調整：新增 `/media`、Story 頁、Services tab id 收尾）。
8. Batch L（防呆機制與 QA）— 每個批次提交前皆應跑 `pnpm lint`／`pnpm build`；`content:check` 腳本建成後補跑一次全站掃描，含 Batch K 的移除確認 grep。

> 建議按階段分批交付與驗收，而非一次性大改。具體怎麼分階段、怎麼用 agent／sub-agent 分工、怎麼驗收，見 `PLN-002`。

---

## 5. 驗收對應

對應未來 `ACC-001_official-copy-rollout-acceptance.md`，建議至少涵蓋：

- SITE-DEMO：`grep example.com/@example` 結果為 0。
- SITE-LINK：全站 LINE／IG／booking 連結皆可對照文案集出處。
- HOME-BLK：Home 8 個 block 逐一比對文案集內容。
- SVC-EH／SVC-THETA／SVC-CERT：Services 三分類頁逐一比對文案集內容，`coming-soon` 項目正確標示且無杜撰內容。
- SVC-REMOVED：`grep seven-weeks-love/loveCourseWeeks/reikiTrainingCourses` 結果為 0，且站上找不到任何導向這兩個已移除分類的連結（無 404）。
- ABOUT-STORY：品牌理念、14 項技術表格、我的故事、學經歷皆完整呈現。
- LEGAL：隱私權政策／服務條款／免責聲明與文案集逐字相符。
- BUILD：`pnpm lint`、`pnpm build`、`content:check` 皆通過。

---

## 6. 風險

- 文案集篇幅巨大且部分段落含有 AI 對話殘留字句（見 `PRD-001` 第 8 節），逐批次置換時需要人工複核，工作量不小，建議每個 Batch 完成後都跑一次目視比對，而非一次性機械轉換。
- Services 分類與路由調整可能影響外部已發出的連結（LINE、Email 行銷素材），需一併盤點是否要做轉址。
- **移除 `seven-weeks-love` 與 `reiki-training`（臼井靈氣）需做「乾淨移除」**：除了刪除分類本身，還要清掉 `Personas.tsx` 的 `recommendedServices` 交叉引用、`Footer.tsx` 的導覽連結、以及任何寫死的 `?tab=seven-weeks-love` / `?tab=reiki-training` 連結，避免留下 404。務必分清楚「刪課程」跟「刪書籍提及」的界線——《七週遇見對的人》書籍本身的真實行銷素材（推薦序作者身份）不應被一併刪掉，只刪「課程產品」相關程式碼與資料。
