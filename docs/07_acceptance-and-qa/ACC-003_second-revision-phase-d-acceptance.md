# ACC-003 第二次修改階段 D：分頁提案、實作與轉化路徑驗收報告

> 適用範圍：[`PRD-003`](../01_product-requirements/PRD-003_second-revision-academy-ia-restructure.md)、[`PLN-004`](../04_execution-plans/PLN-004_second-revision-execution-plan.md) §3A（批次 D0–D12）。
> 相關文件：[`RES-002`](../06_research-and-design/RES-002_page-proposals-and-selection.md)（各頁三提案與定案）、[`RES-001`](../06_research-and-design/RES-001_second-revision-uiux-research.md) §4（轉化路徑）、[`RES-003`](../06_research-and-design/RES-003_3d-motion-assets-and-conversion-evidence.md)、[`RPT-001`](../05_audits-and-reports/RPT-001_content-asset-and-motion-gap-proposal.md)（素材缺口）。
> 測試日期基準：2026-10-05。分支：`feat/second-revision-phase-d`。

這份報告分兩部分。§1–§6 是已經用程式實測的結果，附數字。§8 是需要人親自看、親自點的驗收清單。§7 列出還沒做與等客戶的項目。

---

## 1. 結論

| 完成定義（PLN-004 §3A） | 結果 |
| --- | --- |
| 13 個分頁都走完「三提案 → AI 定案 → 實作 → 驗證」 | 完成。39 份提案中 38 份可開啟，媒體頁提案 B 產出空白，依規則淘汰 |
| 四條轉化路徑實際點過 | 完成。21 項檢查全數通過，開發版與正式建置版各跑一次 |
| `pnpm lint`、`pnpm build`、`pnpm content:check` | 全數通過。建置產出 29 個靜態頁，內容檢查 9 條規則 |
| 驗收報告 | 本文件 |

驗證過程中發現並修掉三個問題：

1. **11 個媒體連結壞掉或繞路**。文案集裡的 Podcast／YouTube 連結多是「網站時光機」的存檔網址，其中 7 個點下去是 404。原始網址都還活著，已改回原始網址（§4）。
2. **每一頁要等約 4 秒才出現第一個畫面**（模擬慢速 4G 手機）。原因是兩套中文字各載入 5 種粗細，字型樣式表有 1MB。改用可變字型後降到約 1.4 秒（§5）。
3. **`/about` 有一區同時顯示 242 字**，超過文字密度規則，已把後段收合，降到 120 字（§6）。

沒有驗證到的事：真實手機（iOS Safari、Android Chrome）、部署到 Vercel 後的表現、螢幕閱讀器、預約系統 `booking.wenling.tw` 內部的預約與付款流程。這些列在 §8 請人確認。

---

## 2. 十三個分頁的提案與定案

提案檔都在 [`docs/06_research-and-design/proposals/`](../06_research-and-design/proposals/)，可直接用瀏覽器開啟。評分明細與完整理由見 RES-002 對應章節。

| # | 分頁 | 三個提案（合計分數） | 定案 | 一句話理由 |
| --- | --- | --- | --- | --- |
| 1 | 首頁 `/` | [A](../06_research-and-design/proposals/home/a.html) 69、[B](../06_research-and-design/proposals/home/b.html) 59、[C](../06_research-and-design/proposals/home/c.html) 76 | 以 C 為骨幹整合 | 見 RES-002 §1 |
| 2 | 服務詳細頁 `/services/[id]` | [A](../06_research-and-design/proposals/service-detail/a.html) 80、[B](../06_research-and-design/proposals/service-detail/b.html) 70、[C](../06_research-and-design/proposals/service-detail/c.html) 75 | A 長頁收合 | 見 RES-002 §2 |
| 3 | 課程詳細頁 `/training/[id]` | [A](../06_research-and-design/proposals/course-detail/a.html) 78、[B](../06_research-and-design/proposals/course-detail/b.html) 70、[C](../06_research-and-design/proposals/course-detail/c.html) 79 | A＋C 的學習路徑 | 見 RES-002 §3 |
| 4 | 全部服務 `/services` | [A](../06_research-and-design/proposals/services/a.html) 80、[B](../06_research-and-design/proposals/services/b.html) 74、[C](../06_research-and-design/proposals/services/c.html) 58 | A 類型切換＋B 導引 | 見 RES-002 §4 |
| 5 | 認證班 `/training` | [A](../06_research-and-design/proposals/training/a.html) 65、[B](../06_research-and-design/proposals/training/b.html) 80、[C](../06_research-and-design/proposals/training/c.html) 63 | B 學習路徑圖 | 唯一能讓六門課同時出現又不堆字的做法 |
| 6 | 關於我們 `/about` | [A](../06_research-and-design/proposals/about/a.html) 62、[B](../06_research-and-design/proposals/about/b.html) 74、[C](../06_research-and-design/proposals/about/c.html) 78 | C＋B 的開場 | 以「解決什麼問題」當 14 項技術的標題，最接近訪客的語言 |
| 7 | 創辦人介紹 `/story` | [A](../06_research-and-design/proposals/story/a.html) 78、[B](../06_research-and-design/proposals/story/b.html) 74、[C](../06_research-and-design/proposals/story/c.html) 66 | A 時間軸＋B 人物卡 | 五章標題都看得到，不必換頁；資歷先交代 |
| 8 | 客戶見證 `/testimonials` | [A](../06_research-and-design/proposals/testimonials/a.html) 78、[B](../06_research-and-design/proposals/testimonials/b.html) 66、[C](../06_research-and-design/proposals/testimonials/c.html) 70 | A；未授權時用 C 的服務出口 | 授權後可直接打開；未授權時這頁也不是死路 |
| 9 | 媒體專訪 `/media` | [A](../06_research-and-design/proposals/media/a.html) 79、[B](../06_research-and-design/proposals/media/b.html) 40（空白）、[C](../06_research-and-design/proposals/media/c.html) 70 | A，改單一節目清單 | C 的主題分類不是文案集的結構，需逐集判讀 |
| 10 | 免費資源 `/resources` | [A](../06_research-and-design/proposals/resources/a.html) 68、[B](../06_research-and-design/proposals/resources/b.html) 80、[C](../06_research-and-design/proposals/resources/c.html) 76 | B 三步開始＋C 時間卡 | 把「怎麼加入免費社群」講得最清楚 |
| 11 | 聯絡我們 `/contact` | [A](../06_research-and-design/proposals/contact/a.html) 70、[B](../06_research-and-design/proposals/contact/b.html) 79、[C](../06_research-and-design/proposals/contact/c.html) 68 | B 依目的分流 | 想預約的人直接去預約系統，不必先傳訊息等回覆 |
| 12 | 部落格 `/blog` | [A](../06_research-and-design/proposals/blog/a.html) 70、[B](../06_research-and-design/proposals/blog/b.html) 76、[C](../06_research-and-design/proposals/blog/c.html) 58 | B 主打＋清單，加 A 的分類按鈕 | 只有 6 篇文章時最不顯空 |
| 13 | 法律頁 `/legal` | [A](../06_research-and-design/proposals/legal/a.html) 77、[B](../06_research-and-design/proposals/legal/b.html) 66、[C](../06_research-and-design/proposals/legal/c.html) 72 | A 逐節收合＋C 桌機目錄 | 條文不能刪，收合是手機上唯一不變成文字牆的做法 |

不走三提案的頁面：`/faq`（轉址到首頁常見問題）、`/start` 新手入門（等文案，未建立）、404 頁（只換成統一樣式）。

分數是 AI 依 BRIEF §7 六項標準給的判斷，不是使用者測試的結果。若對某一頁的定案有不同看法，三份提案都留著，可以直接指定改用另一案。

---

## 3. 四條轉化路徑實測

用程式操作無頭 Chrome，手機尺寸 390×844，以觸控點擊。開發版（`next dev`）與正式建置版（`next build` 後 `next start`）各跑一次，結果相同。

### P1 需求明確：首頁 → 需求入口 → 服務詳細頁 → 預約（3 次點擊）

| 檢查 | 結果 |
| --- | --- |
| 首頁第一個畫面看得到主按鈕「從這裡，開始我的改變」 | 通過 |
| 點主按鈕後捲到需求入口 | 通過 |
| 點「感情」後只顯示感情那一張卡 | 通過 |
| 卡片第一個按鈕指向 `/services/personal-1on1` | 通過 |
| 點下去到達服務詳細頁 | 通過 |
| 詳細頁第一個畫面看得到預約按鈕 | 通過 |
| 預約按鈕指向 `booking.wenling.tw/activities/soul-healing` | 通過 |
| 往下捲後底部固定列出現，含預約與 LINE | 通過 |

### P2 不確定：首頁 → LINE（1 次點擊）

原規劃是「首頁 → 新手入門 → LINE」。新手入門頁的文案還沒到（RPT-001 T1），所以這條路徑目前以「直接到 LINE」替代。

| 檢查 | 結果 |
| --- | --- |
| 站內沒有任何連結指向不存在的 `/start` | 通過 |
| 捲過 Hero 後底部固定列出現，含 LINE | 通過 |
| 首頁最後的行動區塊有 LINE 與商城 | 通過 |

### P3 先求信任：見證／媒體／關於 → 服務（2 次點擊）

| 檢查 | 結果 |
| --- | --- |
| 見證頁在未授權時不輸出任何見證內文 | 通過（HTML 內 0 則） |
| 見證頁有通往需求入口、LINE 與服務的出口 | 通過 |
| 從見證頁可點進服務詳細頁 | 通過 |
| 媒體頁有導回需求入口的區塊 | 通過 |
| 關於我們有主要行動與 LINE | 通過 |
| 創辦人介紹有主要行動與 LINE | 通過 |

### P4 想學習：首頁「新手」→ 課程詳細頁 → 報名（3 次點擊）

| 檢查 | 結果 |
| --- | --- |
| 「新手」卡的按鈕指向 `/training/theta-basic` | 通過 |
| 課程頁報名按鈕指向 `booking.wenling.tw/activities/basicDNA` | 通過 |
| 學習路徑標出目前位置，並可前往另外兩門 | 通過 |
| 認證班總覽列出 6 門課並有 LINE 洽詢 | 通過 |

### 每一頁手機上隨時看得到的行動

| 頁面 | 固定可見的行動 |
| --- | --- |
| 首頁、8 個服務詳細頁、6 個課程詳細頁 | 頁首「商城」＋底部固定列（主要行動＋LINE） |
| 其餘 10 頁 | 頁首「商城」＋右下角 LINE 浮動按鈕 |
| 全部 25 頁 | 頁面結尾的行動區塊（LINE＋商城） |

`/media`、`/contact`、`/blog`、`/legal` 的第一個畫面內沒有頁面自己的行動按鈕，靠上表的固定元素承接。

### 這些測試沒有涵蓋的

路徑測試確認的是「連結存在、指向正確、點得到、看得到」。**有沒有效**（訪客實際會不會點）要等上線後的數據：PLN-004 階段 E 規劃用 Vercel Analytics 記錄 `cta_click`，目前尚未接上，方案是否支援自訂事件也待確認（RPT-001 S 類）。

---

## 4. 連結檢查

| 項目 | 結果 |
| --- | --- |
| 從首頁爬到的站內頁面 | 24 個，全部回 200 |
| 站內錨點連結（例如 `/legal#privacy`、`/#home-faq`） | 0 個失效 |
| 直接開啟錨點網址會停在正確位置 | 通過（測 5 個） |
| `/faq` 轉址 | → `/#home-faq` |
| `/training/theta-basic-cert` 等三個舊網址轉址 | → 新網址 |
| 不存在的網址 | 回 404，顯示統一樣式的 404 頁 |
| 站外連結 | 54 個不重複網址＋1 個 Email |

### 站外連結

修正前：45 個回 200、7 個 404、2 個擋自動檢查。

**7 個 404 都是網站時光機（`web.archive.org`）的存檔網址。** 文案集的媒體連結有 12 個是這種存檔網址。逐一比對後：

| 狀況 | 數量 | 處理 |
| --- | --- | --- |
| 存檔網址 404，原始網址正常 | 7 | 改回原始網址 |
| 存檔網址與原始網址都正常 | 4 | 改回原始網址（少繞一層，也不會顯示時光機的橫幅） |
| 原始網域已失效（談芯時刻 `chuchu.firstory.io`），存檔網址正常 | 1 | 保留存檔網址 |

受影響的單集：美麗佳人 Podcast 2 集、迷人說 #20、小紀老師的幸福學 4 集、S3EP74 靈氣療癒、YouTube 3 支。這是連結修正，沒有改任何文字。**請確認這個處理方式可以接受**（§8 LINK-003）。

修正後仍無法自動確認的 2 個：

| 網址 | 自動檢查結果 | 說明 |
| --- | --- | --- |
| `https://m.me/keila.healing` | 400 | Messenger 連結會擋非瀏覽器的請求，需人工點擊確認 |
| `https://www.books.com.tw/products/0010917426` | 403 | 博客來擋自動檢查，需人工點擊確認 |

另有 1 支 YouTube 影片（`wwv1UPc1EyA`）存在但停用了嵌入；本站只放連結、不嵌入，不受影響。

---

## 5. 速度

正式建置版，模擬手機：慢速 4G（1.6 Mbps、延遲 150ms）、CPU 降速 4 倍、無快取。

| 頁面 | 第一個畫面出現（修正前 → 後） | 版面位移 CLS | 程式碼（JS） | 總下載量 |
| --- | --- | --- | --- | --- |
| `/` | 3.99 秒 → 1.48 秒 | 0 | 258 KB | 2,976 KB |
| `/services` | 3.85 → 1.41 | 0 | 262 KB | 2,903 KB |
| `/services/personal-1on1` | 3.82 → 1.40 | 0 | 262 KB | 2,565 KB |
| `/training` | 3.84 → 1.41 | 0 | 259 KB | 2,675 KB |
| `/training/theta-basic` | 3.82 → 1.39 | 0 | 261 KB | 2,633 KB |
| `/about` | 3.86 → 1.42 | 0 | 259 KB | 3,289 KB |
| `/story` | 3.84 → 1.41 | 0 | 259 KB | 2,865 KB |
| `/testimonials` | 3.86 → 1.40 | 0 | 265 KB | 2,527 KB |
| `/media` | 3.87 → 1.41 | 0 | 259 KB | 2,771 KB |
| `/resources` | 3.81 → 1.39 | 0 | 259 KB | 2,478 KB |
| `/contact` | 3.82 → 1.37 | 0 | 259 KB | 2,477 KB |
| `/blog` | 3.87 → 1.42 | 0 | 261 KB | 2,807 KB |
| `/legal` | 3.84 → 1.38 | 0 | 259 KB | 2,494 KB |

目前頁面沒有照片，最大內容繪製（LCP）就是第一段文字，時間與上表相同，低於 2.5 秒的門檻。

**修正內容**：`app/layout.tsx` 的兩套字（Noto Sans TC、Noto Serif TC）原本各指定 5 種粗細，產生兩份各 515 KB 的字型樣式表，瀏覽器要下載完才畫第一個畫面。改成可變字型後每份 104 KB。畫面外觀不變。

**仍然偏重的地方**：中文字型檔本身約 2.6 MB（每頁約 36 個分片）。它不擋畫面（先用系統字顯示，下載完再換），但吃行動流量，換字的瞬間字形會跳一下。要再降只能少一套字，例如標題改用系統明體，這是視覺取捨，列在 §8 PERF-002 請人決定。

**提醒**：上表是在本機量的，數字會比真實網路樂觀。上線後請用 PageSpeed Insights 對正式網址再量一次。照片素材補上後 LCP 會變成 Hero 照片，需重新量。

---

## 6. 文字密度與版面

規則（BRIEF §4A）：同一個畫面的內文，桌機約 150 字、手機約 100 字為目標；收合的內容仍留在 HTML 內。計算方式不含標題、按鈕與收合中的內容。

手機 390×844：

| 頁面 | 長度（螢幕） | 單一畫面最多內文 | 備註 |
| --- | --- | --- | --- |
| `/` | 9.3 | 160 | 改版前 23.1 個螢幕 |
| `/about` | 6.7 | 120 | 修正前 242 |
| `/story` | 4.6 | 167 | 預設展開的第一章 |
| `/services` | 5.4 | 44 | |
| `/training` | 4.5 | 54 | |
| `/testimonials` | 3.2 | 51 | 未授權狀態 |
| `/media` | 6.0 | 83 | |
| `/resources` | 3.9 | 121 | |
| `/contact` | 3.3 | 40 | |
| `/blog` | 3.7 | 109 | |
| `/legal` | 5.0 | 114 | |
| 8 個服務詳細頁 | 3.6–4.7 | 94–189 | |
| 6 個課程詳細頁 | 3.6–4.4 | 133–299 | 見下 |

超過 100 字的畫面都是文案集原文的長句，不能改寫。課程詳細頁最高 299 字，是時長、證書、先修、費用四項事實加上開場段落；已把手機第一屏的費用縮成第一句。若仍覺得太密，需要客戶提供較短的課程摘要（RPT-001 T 類）。

版面檢查：25 個頁面 × 4 種寬度（375／768／1024／1440）共 100 次。

| 檢查 | 結果 |
| --- | --- |
| 橫向捲軸 | 0 |
| 瀏覽器主控台錯誤 | 0 |
| 每頁恰好一個 H1 | 全部通過 |
| 每頁結尾有行動區塊 | 全部通過 |
| 手機上小於 40px 的點擊目標 | 0 |
| 桌機導覽 1024px 寬時排成一列不換行 | 通過（導覽項目高度由 32–36px 調到 40px） |

---

## 7. 已知未完成與待確認

### 等客戶素材或決定（RPT-001）

| 項目 | 目前狀態 | 到位後要做的事 |
| --- | --- | --- |
| Logo 向量檔（G1） | 頁首與首頁的金翼羅盤是替代圖形 | 換成正式 Logo |
| 創辦人形象照、書封（G 類） | 以金色拱形佔位 | 換圖，重新量 LCP |
| 客戶見證刊登授權（C1） | 首頁見證區不顯示；`/testimonials` 顯示「正在向個案取得正式授權」的說明與服務出口 | 把 `src/data.ts` 的 `homeContent.testimonials.authorized` 改為 `true` |
| 新手入門文案（T1） | `/start` 未建立，P2 以 LINE 替代 | 另開批次建立頁面 |
| 需求入口故事中的金額（PRD-003 待行政確認） | 照文案集上線 | 行政確認後若要改再調整 |
| 動效強度（A 類） | 預設「光感」 | 依回覆調整 |
| Vercel 方案是否支援自訂事件（S 類） | 未接追蹤 | 階段 E 接上 `cta_click` |

### 開發端還沒做

| 項目 | 說明 |
| --- | --- |
| `/ui-kit` 元件展示頁、UI 規範 `ARC-002` | PLN-004 D11 的內部文件，不影響訪客 |
| `express`、`dotenv`、`tsx`、`@google/genai` 四個相依 | 程式裡沒有用到，移除前想先確認是否有其他用途（§8 DEV-002） |
| `src/types.ts` 的 `Testimonial`、`FAQItem`、`TeamPartner` | 已無使用，尚未清除 |
| Hero 的 3D 金翼 | 延後。動效以 2D 與版面轉場為主；`three` 已從相依移除 |
| 分支未推送 | `feat/second-revision-phase-d` 只在本機；PR #1 只包含階段 A–C |

### 這一輪移除的東西

- 查無出處的舊見證與舊 FAQ 資料、`/faq` 頁面（改轉址）。
- 粉色與舊品牌色 token；`content:check` 新增規則防止再出現。
- 沒用到的 shadcn 元件（accordion、badge、breadcrumb、card、popover、tabs、toggle 等）與 `three`。

---

## 8. 人工驗收清單

本機啟動：`pnpm install` 後 `pnpm dev`，開 `http://localhost:3000`。若 3000 已被其他專案佔用，改用 `pnpm exec next dev --port 3100`。

### A. 提案與定案

#### D-SEL-001 ｜ 各頁定案是否同意

| 步驟 | 操作 |
| --- | --- |
| 1 | 對照 §2 的表，打開有疑慮的頁面的三份提案 |
| 2 | 打開實作後的頁面比較 |

**驗收標準**：

- [ ] 13 個分頁的定案都同意，或已註明要改用哪一案。
- [ ] 媒體頁提案 B 空白，接受只以 A、C 兩案比較（或要求重做 B）。

### B. 轉化路徑（請用真實手機）

#### D-PATH-001 ｜ P1 需求明確

| 步驟 | 操作 |
| --- | --- |
| 1 | 手機開首頁，點「從這裡，開始我的改變」 |
| 2 | 切換四個需求分頁，點任一張卡的按鈕 |
| 3 | 在服務詳細頁點預約按鈕 |

**驗收標準**：

- [ ] 三次點擊內到達預約系統的正確品項。
- [ ] 每一步都清楚知道下一步要點哪裡。
- [ ] 詳細頁往下捲時，底部固定列不會擋住內容或與系統列重疊。

#### D-PATH-002 ｜ P2 不確定

- [ ] 首頁往下捲，底部固定列的 LINE 按鈕能開啟官方 LINE（`@healer.wenling`）。
- [ ] 接受新手入門頁到位前以 LINE 作為替代路徑。

#### D-PATH-003 ｜ P3 先求信任

- [ ] `/testimonials` 未授權時的說明畫面（「我們正在向個案取得正式授權與去識別化整理…」）可以接受對外顯示。
- [ ] `/media`、`/about`、`/story` 看完後找得到下一步。

#### D-PATH-004 ｜ P4 想學習

- [ ] 首頁「新手」卡 → 希塔基礎課 → 報名，到達報名系統的正確課程。
- [ ] `/training` 的學習路徑順序正確（基礎 → 進階 → 深度挖掘）。

#### D-PATH-005 ｜ 預約系統內部

- [ ] 8 項服務與 6 門課程的預約／報名按鈕，各自到達 `booking.wenling.tw` 上對的品項，且品項可預約。

### C. 連結

#### D-LINK-001 ｜ 自動檢查擋掉的兩個連結

- [ ] `https://m.me/keila.healing` 用手機點擊能開啟 Messenger。
- [ ] 博客來書籍頁 `https://www.books.com.tw/products/0010917426` 能開啟且是正確的書。

#### D-LINK-002 ｜ 媒體連結抽查

- [ ] `/media` 每個節目各點一集，確認是對的單集。

#### D-LINK-003 ｜ 存檔網址改回原始網址

- [ ] 同意 §4 的處理：11 個媒體連結由網站時光機存檔網址改回原始網址，談芯時刻保留存檔版。

### D. 內容

#### D-COPY-001 ｜ 文案

- [ ] 抽查 3 個服務頁、2 個課程頁，內文與文案集一致，沒有被改寫或截斷。
- [ ] 收合的區塊點開後內容完整。
- [ ] 需求入口故事中的金額數字，行政已確認可以刊登。

#### D-COPY-002 ｜ 佔位內容

- [ ] 金翼羅盤替代圖形、照片佔位在素材到位前可以接受（或要求先不上線）。

### E. 視覺與動效

#### D-VIS-001 ｜ 品牌感受

- [ ] 整站是一致的奶油金色調，沒有殘留粉色。
- [ ] 動效有「光感、財氣豐盛」的感受，且不干擾閱讀。
- [ ] 系統開啟「減少動態效果」時，頁面仍完整可讀。

### F. RWD／跨裝置

#### D-RWD-001 ｜ 真實裝置

- [ ] iPhone Safari：首頁、一個服務頁、`/media` 版面正常，底部固定列不被瀏覽器工具列遮住。
- [ ] Android Chrome：同上。
- [ ] 平板直向與橫向：導覽列正常。
- [ ] 桌機 1024px 與 1440px：導覽列一列排完。

### G. 速度

#### D-PERF-001 ｜ 上線後量測

- [ ] 部署後用 PageSpeed Insights 量首頁與一個服務頁的手機分數，LCP 低於 2.5 秒。

#### D-PERF-002 ｜ 字型取捨

- [ ] 決定是否維持兩套中文字（約 2.6 MB），或標題改用系統字以減少流量。

### H. 開發端

#### D-DEV-001 ｜ Lint／Build

- [x] `pnpm lint` 通過。
- [x] `pnpm build` 通過（29 個靜態頁）。
- [x] `pnpm content:check` 通過（9 條規則）。

#### D-DEV-002 ｜ 待決定

- [ ] `express`、`dotenv`、`tsx`、`@google/genai` 是否可以移除。
- [ ] 是否推送分支並開階段 D 的 PR。
- [ ] `/ui-kit` 與 `ARC-002` 是否仍需要。
