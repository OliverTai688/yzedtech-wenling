# ACC-001 官方文案上線驗收

> 適用範圍：PRD-001、PLN-001、PLN-002（Phase 0–6）。
> 測試日期基準：2026-08-18（第二輪更新）。
> 驗收方式：本輪已改善 PLN-002 §4.5「獨立覆核」缺口——透過獨立的唯讀（無 Write/Edit 權限）
> agent session，重新對照 `docs/網站文案集.md` 原文覆核本輪異動的高風險內容（見第 3.1 節），
> 找出 4 項問題並已全數修正。惟該獨立覆核仍在同一使用者的同一次任務中執行，非跨 session／跨人
> 的正式簽核，建議重大內容異動仍由使用者本人做最終確認。

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
| Phase 6：路由收尾與最終 QA | Batch I、L | ✅ 完成 | `/story` 路由拆分完成；ESLint 設定補上並通過；`content:check` 腳本已建立；獨立唯讀 QA 覆核已執行 |

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
- [ ] 手動點過一輪網站確認無 404：**本輪僅以程式碼審閱與型別檢查驗證，未實際啟動 `pnpm dev` 手動點擊**（雲端沙盒 build 受限，建議使用者本機 `pnpm dev` 後手動走一輪）

---

## 6. 已知未完成事項（誠實列出）

本輪已解決上一輪列出的「`/story` 獨立路由未拆分」「`pnpm lint` 未設定」「獨立覆核未執行」三項，
以下為重新盤點後、仍誠實存在的未完成事項：

| 項目 | 說明 |
| --- | --- |
| 學經歷完整清單 | 文案集列出數十筆希塔療癒官方認證的講師姓名與日期（如「基礎DNA　King Chung　十月/27, 2019」），本輪僅按四大類別彙整代表性項目，未逐筆轉錄；文案集原文本身也註記「因檔案眾多，獨立一頁」，建議另開任務逐筆建置 |
| `pnpm build` 沙盒驗證 | 雲端沙盒對 `fonts.googleapis.com` 有網路白名單限制（`curl` 確認 403 Forbidden），無法在本環境完整跑完 `next build`；純屬沙盒網路政策，非程式碼缺陷，需使用者於本機執行 `pnpm build` 做最終確認 |
| 視覺驗收（第四層） | 未使用瀏覽器截圖比對 `design-spec.md`，僅完成程式碼、型別與獨立唯讀 QA 層級驗證，尚未手動啟動 `pnpm dev` 逐頁點擊確認無 404／版面異常 |
| 獨立覆核的獨立性程度 | 本輪的「獨立唯讀覆核」雖以獨立 agent session（無 Write/Edit 權限、未讀取先前 diff）執行，但仍在同一使用者、同一次任務脈絡下完成，非跨人／跨組織的正式簽核，重大內容異動建議使用者本人再做一次最終確認 |

---

## 7. 結論

Phase 0–6（型別骨架、全站連結、Services、Home 8 區塊、About／Story 路由拆分、Testimonials／Media／
Resources／Legal、路由收尾與最終 QA）內容已全數完成溯源修正並通過驗收。本輪具體完成：

1. **`/about` 與 `/story` 路由正式拆分**：`/about` 保留品牌理念與 14 項方法體系總覽，`/story` 新增完整
   個人故事敘述（2019 年崩塌與轉折）與學經歷／證照總覽，並於 `Footer.tsx`／`AboutStory.tsx` 補上互相
   連結。
2. **ESLint 設定補齊**：repo 首次建立 `eslint.config.mjs`（flat config，`eslint@9` + `eslint-config-next@15`），
   修正過程中一併清除 5 個未使用 import、2 個未使用 props、4 處 `as any` 型別斷言，`pnpm lint` 現為
   `✔ No ESLint warnings or errors`。
3. **獨立唯讀 QA 覆核（PLN-002 §4.5／§3.1）**：以獨立 agent session 重新對照文案集原文，找出並修正
   4 項先前自我核對遺漏的問題（詳見第 3.1 節），其中最關鍵的一項是「同一段失真文案『100+ 位個案』
   只在一個檔案被修正、另一個檔案的重複殘留未被抓到」——具體印證了 PLN-002 主張「撰寫與驗收應由不同
   角色執行」的必要性。

`tsc --noEmit`、`pnpm lint`、`pnpm run content:check` 三項技術驗證全數通過。仍誠實保留的缺口（見第 6
節）：`pnpm build` 因沙盒網路限制無法在此環境完整驗證、學經歷逐筆講師姓名/日期尚未全數轉錄、尚無
瀏覽器視覺走查與截圖比對、以及獨立覆核仍屬同一使用者任務脈絡內執行而非跨人正式簽核。建議使用者在
本機執行 `pnpm dev`／`pnpm build` 做最終確認後再行部署。
