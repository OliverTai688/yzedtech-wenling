# AUD-001 官方文案集 vs. 現有網站內容稽核

**狀態：** Active
**日期：** 2026-08-18
**比對來源：** [`docs/網站文案集.md`](../網站文案集.md)（建議之後依 MAN-000 規則重新命名為 `REF-002_official-website-copy-source.md`，以下簡稱「文案集」）
**比對對象：** 現有 `wenling-web-main` 專案（`app/`、`src/components/`、`src/data.ts`、`src/types.ts`）
**後續文件：** [`PRD-001_official-copy-content-module-and-demo-data-removal.md`](../01_product-requirements/PRD-001_official-copy-content-module-and-demo-data-removal.md)、[`PLN-001_official-copy-rollout-execution-plan.md`](../04_execution-plans/PLN-001_official-copy-rollout-execution-plan.md)

---

## 1. 稽核目的

依使用者要求，比對「文案集」定義的 sitemap／頁面結構／block 內容，與目前 `wenling-web-main` 實際上線的頁面結構與文案，找出：

1. 頁面結構（sitemap）差異。
2. 各頁面 block／區塊結構差異。
3. 內容文字是否為「demo／示範資料」而非文案集內容（含連結、聯絡方式、案例、方案內容）。

供 `PRD-001` 規劃內容模組化方向、`PLN-001` 規劃實作批次。

---

## 2. 結論摘要（TL;DR）

- **頁面結構（路由 / 元件組成）已經相當接近文案集的 sitemap**，Home 頁尤其吻合（8 個 block 對應 8 個元件，順序一致）。**元件模組化程度也已經不錯**：`src/data.ts` + `src/types.ts` 是唯一資料來源，所有頁面／元件皆從此讀取，沒有到處寫死內容的情形。
- **但幾乎所有「文字內容」都是 AI Studio 產生的示範資料（demo copy），不是文案集裡的真實文案**：服務名稱、方案價格、見證案例、部落格文章、FAQ、資源、以及大量 CTA 連結（`https://example.com/...`、`https://line.me/R/ti/p/@example`、`hello@example.com`）都是佔位內容。
  - 全站掃描到 **40 處** `example.com` / `@example` 佔位連結，分布在 **12 個檔案**（`src/data.ts` 與 11 個元件）。
- **服務／課程的資料結構（`Service` type）太單薄**，撐不住文案集要求的內容深度（多方案價格表、流程步驟、事前準備、FAQ、見證、免責聲明皆是每個服務頁面必備區塊），需要先擴充 `types.ts` 才能承載真實文案。
- **部分頁面在文案集裡有明確結構調整指示，現有網站尚未反映**，例如：Story 應獨立成頁、Services 三大分類要重整（`energy-healing` 擴充為 8 項、`healer-business` 整類刪除改為金錢/愛情/人魚靈氣證照＋直覺力培訓）、FAQ 獨立頁應刪除並分散到各服務頁、新增 Media 獨立頁、Pricing 為外部商城連結。

---

## 3. 頁面結構（Sitemap）比對

| 文案集 sitemap 節點 | 現有網站路由／元件 | 狀態 | 備註 |
| --- | --- | --- | --- |
| Home | `app/page.tsx` → `HomeClientPage` | ✅ 存在 | Block 結構高度吻合，見第 4 節 |
| About（品牌理念／方法體系） | `app/about/page.tsx` → `AboutStory` | ⚠️ 部分吻合 | 現有 `AboutStory` 內容為示範文字，未包含文案集的 14 項技術總覽表格 |
| **Story（我的故事／學經歷）— 文案集要求獨立成頁** | 無獨立路由，內容併入 `AboutStory` | ❌ 結構缺口 | 需決策：獨立 `/about/story` 頁，或維持併入 About（見 PRD-001 開放決策） |
| Services（energy-healing / theta-training / healer-business→重整） | `app/services/page.tsx` → `ServicesSection`（3 tabs：`energy-healing` / `reiki-training` / `seven-weeks-love`） | ❌ 結構差距大 | 見第 5 節詳細比對，需重整分類與新增子服務 |
| Pricing（外部商城連結，非站內頁） | 無對應頁面；Header/Footer 的購買 CTA 導到 `https://example.com/shop` | ⚠️ 需置換 | 應改為真實商城／預約連結（文案集內各服務皆有各自 `booking.wenling.tw` 連結，非單一 Pricing 頁） |
| Testimonials（獨立頁） | `app/testimonials/page.tsx` → `TrustSystem` | ✅ 存在 | 內容為示範案例，見第 4/6 節 |
| **Media（獨立頁）** | 無獨立路由；僅 Home 內 `MediaSection` | ❌ 結構缺口 | 文案集把 Media 列為主導覽頁面（書籍／Podcast／演講合作），現況只在首頁一小節 |
| Blog | `app/blog/page.tsx` → `BlogSection` | ✅ 存在 | 需要 recover 舊文章（文案集標註「另外整理一頁」，屬營運工作非本次程式範圍） |
| Resources | `app/resources/page.tsx` → `ResourcesSection` | ✅ 存在 | 內容為示範資源，連結皆為 `example.com` |
| Contact（浮動 Icon＋聯絡頁） | `app/contact/page.tsx` → `ContactSection`；浮動 Icon 為 `ClientLayoutWrapper` | ✅ 存在 | 浮動 LINE 連結為 `@example` 佔位，需換成 `@healer.wenling` |
| Newsletter（訂閱頁）— **文案集標註「刪除」** | 不存在 | ✅ 已符合 | 現況本來就沒有，維持不做 |
| **FAQ（獨立頁）— 文案集標註「刪除，每個服務介紹頁皆有 FAQ」** | `app/faq/page.tsx` 仍存在，Header 導覽仍有「常見問題」 | ❌ 與文案集指示相反 | 需決策：保留全站 FAQ 精選頁（Home 已有 FAQ 精選 block）並將完整 FAQ 下放到各服務頁，或維持獨立頁（見 PRD-001 開放決策） |
| Legal（Privacy / Terms） | `app/legal/page.tsx` → `LegalSection` | ✅ 存在 | 文字為獨立撰寫版本，非文案集逐字內容，見第 6 節 |
| Footer 免責聲明 | `src/components/Footer.tsx` | ✅ 逐字相符 | 唯一一段與文案集完全一致的內容 |

---

## 4. Home 頁 Block 比對（結構吻合度最高）

| 文案集 Block | 現有元件（`app/HomeClientPage.tsx` 內順序） | 結構 | 文字內容 |
| --- | --- | --- | --- |
| 1. Hero（身心靈導師定位＋前往購買 CTA） | `Hero` | ✅ 對應 | ❌ 示範文案＋`example.com`／`@example` CTA |
| 2. Persona 快速入口（媽媽／單身／企業主） | `Personas` | ✅ 對應 | ❌ 痛點、推薦服務、CTA 連結皆為示範內容 |
| 3. Section 1：能量療癒服務（Shop CTA） | `HomeServicesGrid`（讀 `services.slice(0,8)`） | ✅ 對應 | ❌ 服務名稱/描述/連結為示範，且與文案集 8 項服務（個人療癒／靈性解讀／靈性按摩／人生推進器／工作坊／煙供祈福／豐盛靈氣／香水供祈福）對不上 |
| 4. Section 2：靈氣／希塔療癒培訓 | `HomeTrainingSection`（讀 `thetaTrainingCourses`、`reikiTrainingCourses`） | ✅ 對應 | ❌ 課程名稱與文案集（基礎/進階/深度挖掘 DNA、金錢/愛情/人魚靈氣證照）不符 |
| 5. Section 3：直覺力培訓（⚠️ 文案集標註待客戶補充） | `HomeIntuitionBanner` | ✅ 對應（推測） | ❌ 現有文字是通用「感到疲憊或迷茫」CTA banner，非文案集「直覺力培訓搶先登記」內容 |
| 6. 成功案例精選 | `HomeTestimonialsSection`（讀 `testimonials`） | ✅ 對應 | ❌ 見證案例為虛構人物（林媽媽、Eva、陳先生、張小姐），非文案集提供的真實回饋摘要 |
| 7. 媒體與出版 | `MediaSection` | ✅ 對應 | ❌ 書籍／Podcast 清單為示範資料，非文案集列出的《七週遇見對的人》改版推薦序／《練愛大確幸》／各 Podcast 真實集數 |
| 8. FAQ 精選 | `FAQSection` | ✅ 對應 | ❌ FAQ 內容與文案集 Home 精選 6 題（療癒多久有效／是否降頭巫術／可否代預約／需要幾次／進行方式／能否取代醫療）不符 |

**結論：Home 頁的「積木」（block 組成與順序）幾乎不需要調整，只需要把每個 block 內的文字資料換成文案集內容。**

---

## 5. Services 頁結構差距（差距最大的頁面）

現有 `ServicesSection.tsx` 為 3 個 tab：`energy-healing-tab`、`reiki-training-tab`、`seven-weeks-love-tab`。

文案集要求的結構：

| 文案集分類 | 內容 | 現有對應 | 差距 |
| --- | --- | --- | --- |
| `energy-healing`（一對一與團體服務，共 8 項） | 個人療癒(一對一)、靈性解讀(一對一，新增)、靈性按摩(一對一，新增)、團體療癒→改人生推進器、工作坊、煙供祈福、豐盛靈氣、愛情靈氣→改香水供祈福 | `services` 陣列僅 9 筆示範服務，命名與分類邏輯都不同（例如仍有「愛情靈氣」而非「香水供祈福」，沒有「靈性解讀」「靈性按摩」獨立項目） | 需依文案集重新設計 8 項服務資料，每項都要有：多方案價格表、流程／事前準備、體感說明、見證、FAQ、免責聲明（文案集內容非常完整，現有 `Service` type 裝不下） |
| `theta-training`（希塔療癒系列） | 基礎 DNA／進階 DNA／深度信念挖掘班（皆有完整課綱、費用、報名福利、退費政策）＋ 線上「造物主與我」／實體「顯化與豐盛」（待提供，先不上線） | `thetaTrainingCourses`（3 筆，欄位精簡） | 欄位需擴充（費用、贈品、退費政策、先修要求、開課形式），且待提供課程須明確標示「即將推出」而非留空或杜撰 |
| **`healer-business`（文案集標註整類刪除）** → 改為金錢靈氣／愛情靈氣／人魚靈氣認證課程頁＋直覺力訓練課程（待補） | 金錢靈氣療癒師與導師授證、愛情靈氣證照（鬱金香熱情靈氣導師班）、人魚靈氣證照、直覺力訓練（待補） | `reiki-training-tab` 目前只是臼井靈氣初中高階（`reikiTrainingCourses`），與文案集要求的「金錢/愛情/人魚靈氣證照＋直覺力」完全不同課程體系 | 需整個重新設計此分類，臼井靈氣初中高階在文案集中未出現，需與客戶確認去留 |
| （Home Persona／Hero 常提及，但文案集未列為 Services 分類）《七週遇見對的人》 | 文案集中作為暢銷書／行銷 hook 出現，Services 內容裡沒有獨立的「七週遇見對的人」課程頁與完整課綱 | 現有 `seven-weeks-love-tab` + `loveCourseWeeks`（7 週課綱）為**完全原創、文案集中查無來源的虛構課程內容** | 需與客戶確認：`seven-weeks-love` 是否仍要作為獨立販售課程；若要保留，其課綱文字必須另外取得客戶提供的真實內容，不可沿用現有虛構 7 週課綱 |

---

## 6. 其他頁面重點差異

- **About**：文案集要求呈現「品牌理念」＋「方法體系」（14 項技術一句話定義／解決什麼問題／適合誰的完整表格）＋「技術之間如何搭配（三階段）」＋ 引導 CTA。現有 `AboutStory.tsx` 沒有這張 14 項技術表格，內容為概略示範文字。
- **Testimonials（`TrustSystem`）**：結構（依 persona 篩選）可保留，但案例本身需替換為文案集列出的真實回饋摘要（媽媽／單身／事業／身心蛻變四大類）。
- **Media**：文案集列出大量真實 Podcast 集數與連結（美麗佳人 Podcast、好女人的情場攻略 Podcast、迷人說、小紀老師的幸福學、粉紅地獄辛辣麵、談芯時刻、多個 YouTube 訪談），現有 `MediaSection` 內容為示範清單，且文案集希望 Media 是獨立頁而非僅首頁區塊。
- **Resources**：文案集只簡短列「免費資源／外部連結（YouTube／LINE 社群介紹）」，現有 4 筆示範資源（音頻／PDF／LINE／YouTube）方向大致合理，但連結需替換為真實連結，內容需與客戶確認是否為官方實際提供的資源。
- **Legal**：`LegalSection.tsx` 是另外撰寫的政策文字，主旨接近但非文案集逐字內容；文案集裡有完整的「隱私權政策」「服務條款」「免責聲明」正式條文（見文案集第 2371～2568 行），應直接採用文案集條文而非現有改寫版本。**唯一例外**：`Footer.tsx` 的免責聲明文字已經與文案集逐字相符，是全站唯一已對齊的內容。
- **Header／Footer／浮動 Icon 的聯絡資訊**：LINE 官方帳號應為 `@healer.wenling`（文案集多處出現），Header 目前掛 `https://line.me/R/ti/p/@example`；IG 帳號應為 `@keila.healing1491`；文案集中未見客服 Email，`hello@example.com` 需與客戶確認是否有正式信箱或應移除改用 LINE 為主要聯絡方式。

---

## 7. Demo／示範資料具體證據

```bash
grep -rn "example.com\|@example\|hello@example" src app --include="*.tsx" --include="*.ts" | wc -l
# 40

grep -rl "example.com\|@example\|hello@example" src app --include="*.tsx" --include="*.ts"
```

命中檔案（12 個）：

- `src/data.ts`（服務、資源的 `ctaLink` 皆為 `example.com`／`@example`）
- `src/components/Personas.tsx`
- `src/components/MediaSection.tsx`
- `src/components/ResourcesSection.tsx`
- `src/components/Footer.tsx`
- `src/components/ContactSection.tsx`
- `src/components/BlogSection.tsx`
- `src/components/Header.tsx`
- `src/components/ServicesSection.tsx`
- `src/components/HomeTrainingSection.tsx`
- `src/components/Hero.tsx`
- `app/ClientLayoutWrapper.tsx`

此外，`testimonials`、`blogPosts`、`faqs`、`tenHealingSystems`、`partnerLogos`、`loveCourseWeeks` 等資料陣列內容本身（非僅連結）也是與文案集無關的原創示範文字，同樣屬於需要替換的「demo 資料」。

---

## 8. 資料模型（`types.ts`）缺口

現有 `Service` type 只有：`name / description / detailedDescription / targetAudience / benefits[] / duration / price? / ctaText / ctaLink / iconName`。

文案集裡每個服務頁面實際需要的資訊遠多於此，至少包含：

- 多方案價格表（方案名稱、亮點、時長、費用、適合對象）— 目前只有單一 `price?: string`。
- 服務流程／事前準備（分步驟）。
- 體感／常見反應說明。
- 服務專屬 FAQ（多筆問答）。
- 服務專屬見證（多筆）。
- 免責聲明段落。
- 加購/延伸服務（如人生推進器的「目標推進諮詢」「心靈量子儀器祝福」等）。
- 「即將推出」狀態（如直覺力訓練、線上造物主與我課程）。

課程類型（`ReikiCourse`）也有類似缺口：缺少報名福利、贈品、退費政策、先修要求、複訓價格等欄位。

詳細型別設計交由 `PRD-001` 規劃。

---

## 9. 下一步

1. `PRD-001` 依本稽核結果，定義內容模組目標、資料模型調整方向，並列出需要客戶／使用者確認的開放決策（Story 頁去留、FAQ 獨立頁去留、Media 獨立頁、七週課程課綱來源、聯絡信箱等）。
2. `PLN-001` 依 PRD 拆解實作批次（資料層重構 → 全站連結置換 → 各頁面文案置換 → QA 防呆機制）。
3. 實作完成後於 `docs/07_acceptance-and-qa` 建立對應 `ACC-001`，並在驗收項目中加入「`grep example.com/@example` 需為 0」等可自動化檢查的項目。
