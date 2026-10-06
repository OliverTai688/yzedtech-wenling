# RES-004 故事型互動網站研究：主題、深入 CTA、漸進元件與視覺素材

**狀態：** Draft（待使用者選定主題並回覆 PLN-005 §2 的決定）
**日期：** 2026-10-05
**相關文件：** [`PLN-005`](../04_execution-plans/PLN-005_story-driven-interactive-site-roadmap.md)（依本研究排定的多階段計畫）、[`RES-001`](./RES-001_second-revision-uiux-research.md)（轉化路徑）、[`RES-003`](./RES-003_3d-motion-assets-and-conversion-evidence.md)（3D 與轉化數據）、[`RPT-001`](../05_audits-and-reports/RPT-001_content-asset-and-motion-gap-proposal.md)（素材缺口）、[`ACC-003`](../07_acceptance-and-qa/ACC-003_second-revision-phase-d-acceptance.md)（階段 D 驗收）

---

## 1. 研究問題

階段 D 完成後，網站是「乾淨、不堆字、每頁都有下一步」的品牌網站。下一輪的方向是：

1. 網站要有**明確的主題**，讓各頁像同一個故事的章節，而不是 13 張版型一致的頁面。
2. **CTA 要有深度**：不只是「預約」與「LINE」兩顆按鈕，而是一段由淺到深的承諾。
3. 用**很多小元件漸進推進**，但操作只能是捲動與點一下，不要複雜操作。
4. 補上**視覺素材**，讓網站走向有故事的互動網站。

本文件回答：這四件事各有什麼證據、有哪些做法、缺什麼素材、要先研究什麼。

---

## 2. 結論

- **主題建議用「改變地圖」，視覺主角是金翼與羅盤。** 這四個字出自文案集首頁原文（「最理性、安心且溫和的改變地圖」），「翅膀」「改變起點」「從這裡，開始我的改變」也都是原文。主題從客戶自己的話長出來，不必另外發明口號。
- **故事要「跟著捲動」，不能「綁架捲動」。** 易用性研究很明確：改變捲動速度、把重要文字放進固定舞台、在手機上或第一屏使用，都會讓多數人迷失，帶著目的來的人最不耐煩。做法是頁面照常捲動，畫面元素跟著反應。
- **深入 CTA 是一段六階的階梯**，每一階都比上一階多一點承諾，而且任何一階都能直接跳到預約。目前網站只有頭（選需求）和尾（LINE、預約）。
- **最值得先做的三件事不需要任何新素材**：LINE 帶話連結、免費直播倒數、依章節變化的固定行動列。
- **量測要排在改版之前。** 現在沒有任何轉化數據。先接追蹤、留兩週基準，之後每一階段才知道有沒有變好。Vercel 免費方案不支援自訂事件，需要換方案或換工具（§6）。
- **視覺素材分三種來源**：真人實景只能由客戶提供；氛圍與插畫可以用 AI 生成；小動畫用向量檔。AI 生成的人像不能當成創辦人或個案使用。
- **故事內容有法規邊界**：不能出現病名與療效暗示，見證必須是真實體驗。這會直接限制故事怎麼寫（§7）。

---

## 3. 主題

### 3.1 三個候選

| | A「改變地圖」（建議） | B「開外掛」 | C「點亮」 |
| --- | --- | --- | --- |
| 一句話 | 找到你現在的位置，看見路怎麼走，展翼出發 | 把療癒當成替人生解鎖的能力 | 從暗到亮，一盞一盞點起來 |
| 文案依據 | 首頁原文「改變地圖」「改變起點」「從這裡，開始我的改變」；副標「成為你豐盛之路上的翅膀」 | 首頁主標「為你的人生開外掛！」 | 無直接原文（最接近的是一集 Podcast 的標題） |
| 視覺主角 | 金翼羅盤（已實作）、路徑線、地圖節點 | 關卡、解鎖、徽章 | 光點、燭光、亮度漸增 |
| 故事骨架 | 起點 → 你在哪裡 → 路怎麼走 → 誰陪你走 → 第一步 | 第一關 → 升級 → 通關 | 暗 → 微光 → 全亮 |
| 與 CTA 的關係 | 每一階 CTA 是地圖上的下一站 | 每個行動解鎖一項 | 每個行動點亮一盞 |
| 風險 | 最安全；需要避免做成真的地圖介面而變複雜 | 遊戲感與療癒的沉穩氣質衝突；容易被解讀成誇大成效 | 沒有原文支撐，章節標題全部要客戶新寫 |
| 新文案需求 | 少（章節標題可沿用原文） | 中 | 多 |

**建議 A，並把 B 的「解鎖」當成小回饋使用**（例如完成選擇時金翼張開一點），不當成主軸。

### 3.2 「改變地圖」的五個章節

章節名稱先用功能性的稱呼，正式標題要客戶確認或沿用原文（§8 的 T10）。

| 章 | 訪客心裡的問題 | 內容來源（都已在文案集內） | 畫面 |
| --- | --- | --- | --- |
| 1 起點 | 這裡是做什麼的？ | Hero | 金翼收攏，晨光色 |
| 2 你在哪裡 | 我的狀況適合嗎？ | 需求入口四張卡 | 羅盤指針轉向所選方向 |
| 3 路怎麼走 | 會經歷什麼？ | 三階段：淨化與釋放 → 滋養與修復 → 顯化與推進（目前只在 `/about`） | 路徑線經過三個節點，金翼逐段張開 |
| 4 誰陪你走 | 可以相信嗎？ | 創辦人、媒體與出版、見證（授權後） | 人物與書封，暖金色 |
| 5 第一步 | 我現在可以做什麼？ | 免費社群、LINE、預約 | 金翼全開，最亮 |

色溫隨章節由晨光的奶油色走到飽和的金色，這是「光感、財氣豐盛」在整頁尺度上的表現。

### 3.3 主題要延伸到其他頁

| 頁面 | 在地圖上的角色 |
| --- | --- |
| 服務／課程詳細頁 | 一條路線的說明：這一站會發生什麼（過程時間軸）、之後可以去哪一站 |
| `/services`、`/training` | 路線總覽 |
| `/story` | 創辦人自己走過的地圖 |
| `/resources` | 免費的第一站 |
| `/testimonials` | 別人走過的路（授權後） |

---

## 4. 故事型捲動：證據與規則

### 4.1 證據

| 發現 | 來源 | 可信度 |
| --- | --- | --- |
| 多數受測者被捲動綁架弄得迷失；帶著目的來的人容忍度最低，有人表示會直接離開 | Nielsen Norman Group 2023 年易用性研究 | 高（實測） |
| 最糟的組合是「改變捲動速度」加上「需要閱讀文字」 | 同上 | 高 |
| 手機螢幕小，綁架的時間被拉長，問題更嚴重 | 同上 | 高 |
| 可接受的用法：時間短、放在第一屏以下、以圖像為主、用來漸進揭露真正相關的補充資訊 | 同上 | 高 |
| 固定的導覽列是迷路時的逃生口 | 同上 | 高 |
| 敘事型頁面的停留時間是一般頁面的 3–5 倍、轉化較高 | 行銷部落格、開發者社群貼文 | 低（無對照組、無樣本說明） |
| Hero 影片讓最大內容繪製平均慢 1.2 秒 | 轉化優化工具商的文章 | 低至中（單一來源） |

「故事型網站提升轉化」沒有查到可靠的對照實驗。可靠的證據反而是它**做錯時的傷害**。所以策略是：採用故事的結構與視覺，避開會傷害易用性的手法，並自己量測。

### 4.2 本站規則

1. **頁面永遠以原生方式捲動。** 不改捲動速度、不改方向、不做整頁吸附。
2. **固定舞台只用在桌機、第一屏以下、畫面以圖像為主時**，而且長度不超過兩個螢幕。手機一律不做固定舞台，改成一般的直向排列。
3. **文字不放進會動的舞台。** 文字照常排在文件流裡，動的是旁邊的圖。
4. **每一章結尾有一張「下一步」卡**，隨時可以跳到行動，不必把故事看完。
5. **任何時候都能直接預約**：頁首的商城按鈕與底部固定列不因敘事而消失。
6. 系統開啟「減少動態效果」時，所有章節直接顯示完成狀態。

### 4.3 技術現況

| 技術 | 支援度（2026 年） | 本站用法 |
| --- | --- | --- |
| CSS 捲動驅動動畫（`animation-timeline`） | Chrome／Edge 115 起、Safari 26 起；Firefox 仍在旗標後 | 只做漸進增強；主要邏輯維持用已安裝的 `motion`（`useScroll`） |
| 同頁 View Transitions | 2025 年 10 月起各主流瀏覽器都支援 | 已用在 `/services` 的類型切換，可擴大到分頁切換、清單與詳細內容之間 |
| 跨頁 View Transitions | Chrome 126、Safari 18.2 起；Firefox 的支援狀況各來源說法不一 | 漸進增強：從服務卡進到詳細頁時，標題與圖示延續過去。Next.js 有實驗性的 `viewTransition` 設定，需先小範圍試 |
| 原生 `<details>` 同名群組 | 已在使用 | 繼續當作收合的基礎 |

---

## 5. 深入 CTA

### 5.1 承諾階梯

| 階 | 訪客做的事 | 付出的成本 | 現況 | 缺口 |
| --- | --- | --- | --- | --- |
| 0 | 看到行動入口 | 無 | ✅ 頁首商城、固定列、每頁結尾行動區塊 | 固定列的文字不會隨內容變化 |
| 1 | 選一個方向 | 點一下 | ✅ 需求入口四個分頁 | 選擇沒有被記住，換頁就忘了 |
| 2 | 30 秒找到起點 | 點三下 | ❌ | 引導元件與題目（需客戶確認對應關係） |
| 3 | 加入免費社群／看免費直播 | 離站、輸入密碼 | ✅ 有連結 | 沒有「下一場什麼時候」的具體感；沒有加入行事曆 |
| 4 | 傳訊息到 LINE | 離站、打字 | ✅ 有連結，但開啟後是空白對話框 | 帶話連結：自動帶入「我想了解○○」 |
| 5 | 預約或報名 | 付費 | ✅ 深連結到預約系統的品項 | 「預約之後會發生什麼」的說明；離站後無法追蹤 |

第 2、3、4 階是目前最空的一段。多數訪客還沒準備好付費，但願意做一件小事；網站現在沒有接住這群人。

### 5.2 各項做法與證據

**LINE 帶話連結（第 4 階）**

- LINE 官方的網址格式 `https://line.me/R/oaMessage/{LINE ID}/?{文字}` 會打開與官方帳號的對話，並把文字填進輸入框；使用者要自己按送出。
- 只支援 iOS 與 Android，桌機不支援。桌機維持現有的 `lin.ee` 連結。
- 用法：在「心靈引渡人」頁面點 LINE，輸入框已經寫好「你好，我想了解心靈引渡人｜一對一個人能量療癒」。訪客不必想第一句話，客服也立刻知道對方看了什麼。
- 需要實機確認：尚未加好友的人點了之後的行為；`@healer.wenling` 與 `lin.ee/N7QHCND` 是否為同一個帳號。
- 帶入的文字是訪客要送出的話，仍屬於新文案，需客戶確認句型（§8 的 T11）。

**免費直播倒數（第 3 階）**

- 文案集寫明「每週一晚間 21:30–22:30」。可以算出距離下一場還有多久，顯示「下一場：本週一 21:30，還有 2 天」，並提供加入行事曆。
- 這是真實的時間，不是假的限時優惠。
- 需客戶確認：直播是否每週固定、遇假日是否停播。

**依章節變化的固定行動列（第 0 階）**

- 固定 CTA 是 RES-003 裡證據最明確的一項。進一步的做法是讓它的文字跟著訪客看到的章節變：看需求入口時是「了解適合我的服務」，看三階段時是「看免費直播時間」，看創辦人時是「LINE 諮詢」。
- 這個做法本身沒有查到對照實驗，列為要自己量測的項目。

**30 秒找到起點（第 2 階）**

| 發現 | 來源 | 可信度 |
| --- | --- | --- |
| 開始作答的人約 40% 會留下聯絡方式；分析 2,100 個測驗 | 測驗工具商 Interact 的年度報告 | 中低（廠商自家數據） |
| 測驗完成率約 35–42% | 產業彙整文章 | 低至中 |
| 測驗型著陸頁平均從 11.28% 的訪客取得名單；1,063 個活動 | 工具商 ConvertFlow 的基準報告 | 中低（廠商自家數據） |
| 多步驟表單的第一步互動是單頁長表單的 1.5–2.5 倍；完成率提升 15–40% | 表單工具商文章 | 低（廠商彙整） |
| 多步驟對「已經準備好」的人可能反而變差 | 行銷顧問文章 | 低至中 |

這些數字都來自賣測驗工具的公司，方向一致但幅度不能直接套用。對本站的意義：

- 引導只有三題、每題點一下，結果是「一項服務＋一項免費資源」，並接上帶話的 LINE 連結。**不收 Email、不設門檻**，結果直接顯示。
- 引導是選配路線。已經知道要什麼的人照樣可以直接預約。
- 題目與選項必須取自文案集（需求入口的痛點、各服務的「適合這樣的你」）。哪個答案對應哪項服務是新的判斷，需要客戶確認（§8 的 C11）。

**記住選擇（第 1 階）**

- 訪客在首頁選了「感情」，之後到 `/services` 時預設顯示相關服務、固定列與 LINE 帶話也跟著調整。
- 資料只存在訪客自己的瀏覽器，不送到伺服器。
- 是否需要在隱私權政策說明，需確認（§7）。

**預約之後會發生什麼（第 5 階）**

- 付費前最大的不確定是「接下來呢」。各服務的文案集段落已有流程說明，可以整理成三步的橫向時間軸放在預約按鈕旁。
- 預約系統在站外，離站後追蹤不到。可在連結加上來源參數，前提是預約系統會保留參數，需測試。

### 5.3 有效與否怎麼知道

每一階對應一個事件（§6）。看的是「上一階有多少人走到下一階」，而不只是最後的預約數，因為預約發生在站外。

---

## 6. 量測

**先量再改**。目前沒有任何行為數據，直接改版就無從比較。

| 工具 | 自訂事件 | 費用 | 適合用途 | 注意 |
| --- | --- | --- | --- | --- |
| Vercel Web Analytics（原決策） | 免費方案**不支援**；Pro 方案支援，每個事件 2 個欄位 | 免費方案每月 5 萬次事件；Pro 另計 | 與部署整合最簡單 | 客戶的方案待確認（RPT-001 S1）。免費方案只能看頁面瀏覽 |
| Google Analytics 4 | 支援 | 免費 | 漏斗、來源分析；客戶或行銷人員最可能已經會用 | 需要同意橫幅的可能性較高 |
| PostHog | 支援 | 每月 100 萬次事件免費 | 漏斗、功能開關、A/B 測試一次到位 | 功能多，需要學習 |
| Microsoft Clarity | 有限 | 免費、無流量上限 | 熱點圖與操作錄影，看人實際怎麼捲、卡在哪 | 會錄下操作畫面，需在隱私權政策說明 |
| Umami | 支援 | 自架免費 | 不用 Cookie | 需要自己維護主機 |

建議：

1. 程式裡只寫一個自己的 `track()` 函式，背後接哪家工具可以換。
2. 數字用 Vercel（若為 Pro）或 GA4；另加 Clarity 看操作錄影。故事型頁面「人到底捲到哪裡停下來」用錄影最直接。
3. **加任何追蹤工具前，隱私權政策要先更新。** 現在的隱私權條文是文案集原文，`content:check` 也有規則擋「查無出處的第三方服務聲明」。條文與實際使用的工具必須一致，這段文字要客戶提供或確認（§8 的 T12）。

事件清單（沿用 RES-001 §4.3 並擴充）：`need_select`、`chapter_view`、`guide_start`、`guide_complete`、`community_click`、`calendar_add`、`line_click`（帶 `context`）、`booking_click`（帶 `offering`）、`sticky_click`。

---

## 7. 故事內容的邊界

以下是查到的法規重點，**不是法律意見**；上線前建議請客戶的法律顧問看過故事文案。

| 規範 | 重點 | 對本站的影響 |
| --- | --- | --- |
| 醫療法第 84 條 | 非醫療機構不得為醫療廣告；內容「暗示或影射」醫療業務也算。罰鍰 5 萬至 25 萬元。主管機關函釋指出不得以病名為刊載內容 | 故事、插畫說明、引導題目都不能出現病名、症狀改善、治療等字眼。「路怎麼走」一章只描述過程與感受，不承諾結果 |
| 公平交易委員會薦證廣告規範 | 見證必須出自薦證者的真實意見或親身體驗，薦證當時須是真實使用者；與廣告主有利害關係要揭露。罰鍰 5 萬至 2,500 萬元（依 2005 年發布時的說明；公平交易法條號其後修正過，以現行條文為準） | 見證授權（RPT-001 C1）不只是禮貌問題。需求入口的案例故事與金額（C2）同樣適用 |
| 個人資料保護 | 追蹤工具、記住選擇 | 隱私權政策要與實際做法一致 |

設計上的對應：

- 新增的敘事文字一律由客戶提供或確認，開發端不自行撰寫（延續既有的文案規則）。
- **AI 生成的人像不用來代表創辦人、個案或學員。** 用了就等於偽造見證的畫面。AI 只用在氛圍、材質、物件與抽象場景。
- 引導的結果用「可以從這裡開始了解」，不用「你需要」「能解決」。
- 把既有文案搬到更顯眼的位置時也要留意。例如三階段原文有「疏通身體經絡」這類描述，目前收在 `/about` 的收合區；若放上首頁當章節主文，建議先請客戶的法律顧問看過。

---

## 8. 視覺素材

### 8.1 缺口（接續 RPT-001 的編號）

| 編號 | 素材 | 用在哪裡 | 來源 | 優先 |
| --- | --- | --- | --- | --- |
| G1–G3 | Logo 向量檔、創辦人形象照、書封 | 已列於 RPT-001，仍未到 | 客戶 | P0 |
| G12 | 主視覺：金色光感的抽象場景（晨光、羽毛、金粉） | Hero、章節背景、分享圖 | AI 生成＋人工修整 | P0 |
| G13 | 四個方向的插畫或圖像（家庭／感情／事業／新手） | 需求入口、引導結果 | AI 生成或委託插畫 | P1 |
| G14 | 三階段的圖像（淨化／滋養／顯化） | 「路怎麼走」一章、`/about` | AI 生成或委託插畫 | P1 |
| G15 | 14 項服務與課程的圖示組，同一筆觸 | 清單、詳細頁、引導結果 | 委託繪製，或以現有線條圖示加金色處理 | P1 |
| G16 | 創辦人故事照片：五章各 1–2 張（可用舊照） | `/story` | 客戶 | P1 |
| G17 | 過程實景：療癒空間、課堂、煙供、香水等物件特寫 | 詳細頁的過程時間軸 | 客戶拍攝（附拍攝清單） | P1 |
| G18 | 小動畫：羽毛飄落、羅盤指針、光點、煙、水波 | 章節轉場、選擇回饋 | SVG 加 CSS 自製；複雜的再用 Lottie 或 Rive | P1 |
| G19 | 短迴圈影片 6–8 秒：光與羽毛 | 章節之間（非 Hero） | AI 影片生成或實拍 | P2 |
| G20 | 創辦人 30–60 秒自我介紹影片 | `/story`、首頁「誰陪你走」 | 客戶拍攝 | P2 |
| G21 | 各頁分享圖 | 社群貼連結的預覽 | 由 G12 與標題合成 | P1 |
| G22 | 材質：金箔、紙紋、散景 | 卡片與區塊底紋 | AI 生成或免費圖庫 | P2 |

### 8.2 新文案與確認（接續 RPT-001 的編號）

| 編號 | 項目 | 說明 |
| --- | --- | --- |
| T10 | 五個章節的標題 | 每個 10 字以內；可直接指定沿用原文的哪一句 |
| T11 | LINE 帶話句型 | 例如「你好，我想了解〈服務名稱〉」；確認語氣 |
| T12 | 隱私權政策更新 | 列出實際使用的追蹤工具與「記住選擇」 |
| T13 | 引導的三個問題與選項 | 可由開發端從原文整理草稿，客戶確認 |
| T14 | 「預約之後會發生什麼」三步 | 各服務一組，或全站共用一組 |
| C11 | 引導答案與服務的對應 | 哪種狀況推薦哪項服務 |
| C12 | 免費直播是否每週固定、遇假日是否停播 | 倒數元件的前提 |
| C13 | 可否使用 AI 生成的氛圍圖像 | 部分品牌不希望使用 |

### 8.3 來源與工具

**AI 圖像**（用於 G12–G14、G22）

| 工具 | 特點 | 商用授權（需在購買時再確認條款） |
| --- | --- | --- |
| Midjourney | 美感與氛圍最強；可用風格參照維持一致 | 付費方案可商用，免費試用不可 |
| Flux（Black Forest Labs） | 可指定精確色碼、一次參照多張圖，適合守住品牌金色 | 透過官方 API 產出的圖可商用 |
| Google Nano Banana 系列 | 以文字指令修圖、保持主體一致 | 可商用 |

維持風格一致的做法：先做一張定調圖，之後每張都以它為風格參照；色碼固定用網站的金色與奶油色；同一批一次產完。

**AI 影片**（用於 G19）：Veo、Kling、Runway 都能從一張圖產生短片，付費方案含商用授權。先有 G12 的定調圖再做。

**小動畫**（用於 G18）

| 做法 | 優點 | 代價 |
| --- | --- | --- |
| SVG 加 CSS／`motion` | 不必多載播放器；已有金翼羅盤的經驗 | 複雜動作要手寫 |
| dotLottie | 素材庫大（LottieFiles 免費素材可商用、不必標示）；檔案比 JSON 小約八成 | 要多載一個播放器；現成素材風格不一定合 |
| Rive | 檔案最小；有狀態機，能做「依選擇變化」的互動 | 要多載一個播放器；社群檔案是 CC BY，需標示作者；製作要學新工具 |

建議先用 SVG 加 CSS。只有在某一個動畫手寫成本太高時才引入播放器，而且全站只選一種。

**免費素材**：Unsplash、Pexels（照片與材質）、LottieFiles（動畫）。靈性題材的圖庫照很容易看起來像別人的網站，只建議用在材質，不用在主視覺。

**委託繪製**：G15 的圖示組最適合找人畫，一次 14 個、同一筆觸，之後客戶的社群貼文也能用。

### 8.4 素材進站的規格

- 圖片一律經 `next/image`，提供寬高避免版面跳動；Hero 圖要預先載入，其餘延後。
- 影片不放在 Hero；放在第一屏以下，先顯示靜態封面，進入畫面才載入，靜音、可暫停。
- 每加一批素材就重量一次速度（ACC-003 §5 的方法），手機首次繪製維持在 2.5 秒內。

---

## 9. 漸進推進的元件清單

原則：每個元件只要求**捲動**或**點一下**；每個元件都把視線帶向下一步。

### 9.1 敘事骨架

| 元件 | 做什麼 | 操作 | 需要素材 |
| --- | --- | --- | --- |
| 章節容器 | 每章有編號、標題、色溫 | 捲動 | 否 |
| 路徑線 | 一條金線串起各章，捲到哪亮到哪（首頁已有雛形） | 捲動 | 否 |
| 章節進度 | 桌機側邊五個節點；手機是頁首下方一條細線 | 捲動；點節點跳章 | 否 |
| 章末「下一步」卡 | 每章結尾一個最合適的行動 | 點一下 | 否 |
| 色溫漸變 | 背景由奶油色走到金色 | 捲動 | 否 |
| 金翼展開 | 金翼隨章節張開，第五章全開 | 捲動 | Logo 到位後換正式圖形 |

### 9.2 指路

| 元件 | 做什麼 | 操作 | 需要素材 |
| --- | --- | --- | --- |
| 羅盤選方向 | 現有四個分頁的延伸，選擇後被記住 | 點一下 | G13 更好 |
| 30 秒找起點 | 三題，每題點一個選項，直接出結果 | 點三下 | T13、C11 |
| 三階段路線 | 三個節點，點開看每階段做什麼、對應哪些服務 | 點一下 | G14 更好 |
| 服務比較抽屜 | 兩項服務並排看時間、費用、形式 | 點一下 | 否 |
| 學習路徑（已有） | 基礎 → 進階 → 深度挖掘 | 點一下 | 否 |

### 9.3 深入 CTA

| 元件 | 做什麼 | 操作 | 需要素材 |
| --- | --- | --- | --- |
| 會變的固定行動列 | 文字與連結跟著章節與所選方向變 | 點一下 | 否 |
| LINE 帶話按鈕 | 帶入目前頁面的服務名稱 | 點一下 | T11 |
| 直播倒數卡 | 下一場時間、加入行事曆、社群密碼 | 點一下 | C12 |
| 預約三步 | 預約之後會發生什麼 | 無 | T14 |
| 行動抽屜 | 手機上點固定列時，從底部滑出三個選項：預約、LINE、免費社群 | 點一下 | 否 |

### 9.4 信任

| 元件 | 做什麼 | 操作 | 需要素材 |
| --- | --- | --- | --- |
| 數字進場 | 「500+個案」「14 種技術」數字由 0 跑到定值（都是原文） | 捲動 | 否 |
| 過程時間軸 | 一次服務從開始到結束的幾個步驟 | 捲動或點一下 | G17 更好 |
| 故事卡 | 需求入口的案例改成可左右滑的卡片，一次一則 | 滑動或點一下 | 否 |
| 媒體試聽 | 精選單集直接連到播放 | 點一下 | G8 更好 |
| 見證牆 | 授權後開啟 | 點一下 | C1、G10 |
| 創辦人影片 | 封面加播放鍵 | 點一下 | G20 |

### 9.5 氛圍

| 元件 | 做什麼 | 需要素材 |
| --- | --- | --- |
| 金粉光點 | 章節轉場時少量光點飄過，使用 CSS 或畫布 | 否 |
| 羽毛 | 選擇完成時一根羽毛落下 | G18 |
| 視差層 | 主視覺前後景以不同速度移動，桌機限定 | G12 |
| 頁面轉場 | 從卡片進詳細頁時標題延續 | 否 |

---

## 10. 建議的研究方向

排序依「會改變設計決定」的程度。

| # | 題目 | 為什麼重要 | 怎麼做 |
| --- | --- | --- | --- |
| 1 | 訪客實際從哪裡來、用什麼裝置 | LINE 帶話只在手機有效；如果多數流量來自 LINE 或 IG 內建瀏覽器，許多動效與轉場要另外測 | 接上量測後看兩週 |
| 2 | LINE、Instagram、Facebook 內建瀏覽器的相容性 | 台灣的品牌網站流量多半從這些 App 點進來；它們的瀏覽器版本與行為和 Safari、Chrome 不同 | 實機測試清單 |
| 3 | 現有客戶是怎麼決定預約的 | 承諾階梯是假設；真實的路可能是「朋友介紹 → 直接 LINE」 | 請客戶提供 5–10 位客戶的來源，或在 LINE 歡迎訊息問一題 |
| 4 | LINE 官方帳號能做到哪裡 | 圖文選單與網站對應（RPT-001 S3）、依來源顯示不同歡迎詞、LINE Tag 追蹤 | 查 LINE 官方帳號後台與文件；需客戶提供後台權限或截圖 |
| 5 | 預約系統 `booking.wenling.tw` 的能力 | 能否保留來源參數、能否嵌入時段、完成後能否導回網站 | 實測並詢問系統供應商 |
| 6 | 同類品牌的故事型網站 | 找 3–5 個身心靈、教練、課程品牌的例子，拆解章節與 CTA 位置 | Awwwards 的 storytelling 分類、台灣同業網站 |
| 7 | 療癒服務的廣告用語邊界 | §7 只是初步整理 | 請客戶的法律顧問確認；整理一份「可用／不可用」詞表 |
| 8 | AI 生成素材的著作權與揭露 | 生成圖像能否主張權利、是否需要標示 | 查智慧財產局的說明與各工具條款 |
| 9 | 中文字型的載入策略 | 兩套字 2.6 MB（ACC-003 §5）；加上圖片後更需要控制 | 測試只保留一套、或標題字只載用到的字 |
| 10 | 測驗式引導在高單價服務的效果 | 現有數據多來自電商與名單收集 | 上線後用功能開關做對照 |

### 參考資源

- 易用性：Nielsen Norman Group（捲動、動畫、行動裝置）、Baymard Institute（表單與結帳流程）
- 動效實作：`motion` 官方文件的 scroll 範例、Chrome for Developers 的 scroll-driven animations 與 view transitions 教學
- 靈感：Awwwards 的 storytelling scroll 分類、Godly、Land-book
- 素材：LottieFiles、Rive 社群、Unsplash、Pexels
- 量測：Microsoft Clarity、PostHog、GA4 文件
- LINE：LINE Developers 的 URL scheme 文件、LINE 官方帳號管理後台說明

---

## 11. 研究限制

- 「故事型網站提升轉化」與「測驗漏斗」的數字多來自工具商與行銷部落格，沒有對照組。本文件把它們標為低至中可信度，只取方向。
- 法規部分是公開資料的初步整理，不是法律意見。
- AI 工具的版本與授權條款變動快，§8.3 的內容需在採購時重新確認。
- 跨頁 View Transitions 在 Firefox 的支援狀況，各來源說法不一，需實測。
- LINE 帶話連結對未加好友者的行為、預約系統是否保留來源參數，都還沒有實測。
- 沒有本站的任何流量數據。§5 的承諾階梯是依一般行為推論的假設。

---

## 12. 來源

- [Scrolljacking 101（Nielsen Norman Group）](https://www.nngroup.com/articles/scrolljacking-101/)
- [What is scroll hijacking（Alvaro Trigo）](https://alvarotrigo.com/blog/what-is-scroll-hijacking/)
- [How Scrolljacking Breaks UX Fundamentals（Webdesigner Depot）](https://webdesignerdepot.com/how-scrolljacking-breaks-ux-fundamentals/)
- [Scrollytelling is quietly changing how people read, watch, and buy online（DEV Community）](https://dev.to/marketingwithinzuoo/scrollytelling-is-quietly-changing-how-people-read-watch-and-buy-online-and-most-brands-still-1j76)
- [Storytelling scroll（Awwwards）](https://www.awwwards.com/inspiration/storytelling-scroll)
- [Science & Love storytelling page, The Renée Crown Wellness Institute（Awwwards）](https://www.awwwards.com/inspiration/science-love-storytelling-page-the-renee-crown-wellness-institute)
- [Treatment categories, Dhun Wellness（Awwwards）](https://www.awwwards.com/inspiration/treatment-categories-dhun-wellness)
- [Quiz Conversion Rate Report 2026（Interact）](https://tryinteract.com/blog/quiz-conversion-rate-report/)
- [Lead generation quiz funnel benchmark, September 2026（ConvertFlow）](https://www.convertflow.com/benchmark-reports/lead-generation-quiz-funnel-benchmark-september-2026)
- [Quiz funnel completion rate benchmark 2026](https://emaillistvalidation.com/blog/quiz-funnel-completion-rate-benchmark-2026/)
- [Quiz Funnels vs Lead Magnets（Dupple）](https://dupple.com/blog/quiz-funnels-vs-lead-magnets-which-one-wins-the-conversion-battle-in-2026)
- [Multi-step form benefits（Orbit Forms）](https://orbitforms.ai/blog/multi-step-form-benefits)
- [The Three-Step Form That Beat the One-Step Form（Atticus Li）](https://www.atticusli.com/blog/posts/adding-steps-to-funnel-increases-completion-rates/)
- [Measure multi-step vs. single-step form impact（The Pedowitz Group）](https://www.pedowitzgroup.com/measure-multi-step-vs.-single-step-form-impact?hsLang=en)
- [Use LINE features with the LINE URL scheme（LINE Developers）](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/)
- [Pricing for Web Analytics（Vercel）](https://vercel.com/docs/analytics/limits-and-pricing)
- [Best free web analytics（Toolradar）](https://toolradar.com/guides/best-free-web-analytics)
- [The best Microsoft Clarity alternatives（PostHog）](https://posthog.com/blog/best-microsoft-clarity-alternatives.md)
- [CSS scroll-driven animations go cross-browser](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)
- [CSS Scroll-driven Animations without JavaScript（ICS MEDIA）](https://ics.media/en/entry/230718/)
- [Same-document view transitions are now Baseline Newly available（web.dev）](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available)
- [Cross-document view transitions（Chrome for Developers）](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- [viewTransition（Next.js 文件）](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition)
- [High-impact hero sections that don't hurt page speed（Stellar）](https://gostellar.app/blog/high-impact-hero-sections-that-dont-hurt-page-speed)
- [Video backgrounds vs static images（Cloudinary）](https://cloudinary.com/blog/dam-guide-video-backgrounds-vs-static-images)
- [LottieFiles or Rive（LottieFiles）](https://lottiefiles.com/blog/lottie-animations/lottiefiles-or-rive)
- [Rive as a Lottie alternative（Rive）](https://rive.app/blog/rive-as-a-lottie-alternative)
- [Can I use a free animation on LottieFiles for commercial use?（LottieFiles）](https://help.lottiefiles.com/hc/en-us/articles/900002438343-Can-I-use-a-free-animation-on-Lottiefiles-for-commercial-business-use)
- [Rive community overview（Rive）](https://rive.app/docs/community/community-overview)
- [How to Generate Images in Consistent Brand Style with AI（getimg.ai）](https://getimg.ai/blog/how-to-generate-images-in-consistent-brand-style-with-ai)
- [Flux vs Midjourney（Rangy）](https://rangy.ai/blog/flux-vs-midjourney)
- [Can I use the API for a commercial application?（Black Forest Labs）](https://help.bfl.ai/articles/3670520907-can-i-use-the-api-for-a-commercial-application)
- [Midjourney Commercial Use Rights: 2026 Guide（Terms.law）](https://terms.law/2026/01/15/midjourney-commercial-use-rights-complete-2026-guide/)
- [Best AI video generator 2026（ChatCut）](https://chatcut.io/blog/best-ai-video-generator-2026)
- [AI Video Generation in 2026: Sora, Runway, Kling, Veo（FrankX）](https://www.frankx.ai/blog/ai-video-generation-2026-sora-runway-kling-veo)
- [薦證廣告規範說明（理律法律事務所通訊）](https://www.leeandli.com/TW/Newsletters/2501.htm)
- [醫療法第 84 條相關訴願決定（臺北市法規查詢系統）](https://laws.gov.taipei/law/LawDecision/ContentExport?id=751-068)
