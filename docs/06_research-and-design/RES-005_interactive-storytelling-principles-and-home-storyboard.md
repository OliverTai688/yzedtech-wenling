# RES-005 互動敘事網站的設計原則與首頁分鏡（第二版）

**狀態：** Active
**日期：** 2026-10-06
**相關文件：** [`PRD-004`](../01_product-requirements/PRD-004_story-driven-interactive-site.md)、[`ARC-002`](../02_architecture-and-rules/ARC-002_ui-and-interaction-rules.md)、[`RES-004`](./RES-004_story-driven-interaction-and-cta-depth-research.md)、原型 [`proposals/home-script/`](./proposals/home-script/)（`STORYBOARD.md` 第一版、`STAGE-LIGHT.md`、`stage-light.html`）、金翼羅盤 [`proposals/emblem/BRIEF.md`](./proposals/emblem/BRIEF.md)、設計系統 <https://claude.ai/artifact/4g9AR5QwELZpFhjd3apdf8>

使用者 2026-10-06 指示：先上網學習這類互動網站設計的精髓（可參考動畫分鏡的知識），整理設計，專注把首頁實作出來供驗收。本文件是研究的結論、據此整理的首頁分鏡，以及實作規格。

---

## 1. 學到什麼

### 1.1 來自動畫與分鏡

| 原則 | 內容 | 來源 |
| --- | --- | --- |
| 一次只做一件事 | 觀眾無法同時注意兩個動作。每個鏡頭只有一個焦點；焦點可以依序轉移，不能同時競爭 | 動畫的 Staging 原則 |
| 剪影要清楚 | 主體的輪廓單看就要讀得懂；主體是「有細節的正空間」，背景是「安靜的負空間」 | 同上 |
| 鏡頭要停得夠久 | 動作完成後要有停留，讓人看懂再走 | 同上 |
| 畫面上的每樣東西都為故事服務 | 用構圖、線條、明暗把視線帶到故事的重點 | 同上 |
| 分鏡先定拍點 | 先決定關鍵畫面（拍點）與它們的順序，再補中間的動作；鏡頭之間的轉場要有目的 | 分鏡教學 |
| 預備與跟隨 | 動作前有一個小的反向預備；主體停下後，附屬的部分晚一點才停（羽毛由內而外依序到位） | 迪士尼十二原則 |
| 緩入緩出、走弧線 | 起止要慢、中段快；移動走弧線而不是直線 | 同上 |
| 次要動作不搶戲 | 金粉、光暈是次要動作，幅度與對比都要小於主體 | 同上 |

### 1.2 來自捲動敘事的實務

| 原則 | 內容 | 來源 |
| --- | --- | --- |
| 少字、一個主角 | 成功的產品頁是「更少的字、一個主角、隨捲動變化的主角本身」，而不是固定的文字欄 | Apple 式頁面的拆解 |
| 捲動距離等於你要求的注意力 | 一段動畫綁多長的捲動，要看你希望訪客在這裡花多少注意力，而不是動畫本身多長 | The Pudding |
| 手機要更短 | 手機的步驟要比桌機少；先設計手機，會逼你只留必要的東西 | The Pudding |
| 不要用點擊才能前進的步驟 | 核心內容靠捲動出現；點擊只用來看補充內容。不覆寫瀏覽器的捲動 | The Pudding |
| 高度不要依賴會變動的視窗高 | 手機瀏覽器的網址列會伸縮，用它算高度會讓觸發點跳動 | The Pudding |
| 釘住的段落不要太多 | 一頁疊六、七個釘住的段落是常見的錯誤；要有不釘住的段落讓人喘息 | 捲動敘事的實務文章 |
| 轉場要有意義才保留 | 純裝飾的轉場在手機上改成直接堆疊 | The Pudding |
| 只動 transform 與 opacity | 其他屬性會觸發重排；釘住的元素只釘必要的 | GSAP 效能建議 |
| 釘住與互動分開清理 | React 裡用 `useGSAP` 自動清理；之後才建立的動畫要包在 `contextSafe` | GSAP 官方 React 指南 |

捲動綁架的風險（RES-004 §4）仍然成立：不改捲動速度、文字不放進會動的舞台、手機與第一屏尤其要小心。

---

## 2. 據此定下的設計規則

1. **一個畫面一個主角、一句話、一個行動。** 主角佔畫面的一半左右；其餘是負空間。
2. **拍點先行。** 每張 slide 由三到四個拍點組成：建立（主角出現）→ 發展（主角變化）→ 停留（讓人看）→ 交棒（轉到下一張）。
3. **主角不離場。** 金翼羅盤從頭到尾在畫面裡，轉場用「形狀接形狀」：羅盤的圓接書的書徽，再接放射圖的圓心、創辦人身後的光暈、書封上的圓。
4. **釘住的只有三張**（Hero、書、三階段；桌機另加媒體）。其餘是一般捲動的段落，當作呼吸。
5. **文字是字幕。** 每個拍點最多一行字。補充內容（故事、長段落）收在「＋」裡，點了才看；主要訊息與主要按鈕不需要點擊就看得到。
6. **動作的語彙只有五種**：展開／收攏、沿弧線飛行、畫線、淡入淡出、金光掃過。不另外發明效果。
7. **預備、跟隨、緩入緩出**：起飛前雙翼先微微下壓；展開時三層羽毛由內而外依序到位；所有移動走弧線。
8. **次要動作要小**：金粉最多六顆、移動很慢、不透明度低。
9. **手機更短**：釘住的長度手機約一個螢幕、桌機約一個半；手機省去純裝飾的轉場。
10. **高度用穩定的單位**（`svh`），並設定 ScrollTrigger 忽略手機網址列造成的高度變化。
11. **退路**：沒有 JavaScript 或開啟「減少動態效果」時，是一般的直向頁面，內容全部可讀可點。
12. **文案只用 docx 原文**（ARC-002 §1）；配色是金、銀、暖白（設計系統）。

---

## 3. 首頁分鏡（第二版）

共七張 slide。內容與錨點不變；「釘住」表示該段落停在畫面上、由捲動推進動畫。

| # | 錨點 | 主角 | 釘住 | 字幕（都是原文） | 行動 |
| --- | --- | --- | --- | --- | --- |
| 01 Hero | `#hero` | 金翼羅盤，橫跨畫面 | 是 | 主標兩行 → 眉標「成為你豐盛之路上的翅膀」 | 「從這裡，開始我的改變」 |
| 02 書 | `#personas-section` | 一本白金色的書 | 是 | 區塊標題 → 目前對象的標題 | 該對象卡片的第一個按鈕 |
| 03 三階段 | `#home-stages`、`#featured-services` | 張開的金翼與放射圖 | 是 | 「這些技術之間的關係是什麼？…」→「能量療癒服務｜…」 | 圓點可點；「服務項目」 |
| 04 創辦人 | `#founder` | 拱形（照片位置）與身後的光 | 否 | 創辦人名稱、使命標題 | 「創辦人經歷與故事」 |
| 05 媒體 | `#media-section` | 三本立著的書 | 桌機是、手機否 | 媒體區塊標題 | 點書到媒體專訪 |
| 06 社群 | `#free-resources` | 密碼數字 | 否 | 免費資源的標題 | 「加入免費體驗社群：密碼168168」 |
| 07 常見問題 | `#home-faq` | —（閱讀區） | 否 | 「常見問題」 | 收合的四題 |

### 各張的拍點

**01 Hero**

| 拍點 | 畫面 |
| --- | --- |
| 建立 | 載入就看得到：暖白舞台，金翼羅盤收攏著停在地平線上方，主標與主按鈕在下方。不做透明進場 |
| 發展 | 雙翼先微微下壓（預備），再由內而外一層層展開到橫跨畫面；主標換成眉標那一句 |
| 停留 | 展開的金翼停住，光暈最亮 |
| 交棒 | 一道金光掃過，金翼沿弧線飛向下方的書；這一段沒有字 |

內文與三個信任標記收在「＋」裡。

**02 書**

| 拍點 | 畫面 |
| --- | --- |
| 建立 | 白金色的書闔著立在舞台上，金翼落在書後成為書的翅膀，羅盤接成封面的書徽 |
| 發展 | 封面打開；依序翻到四個對象。每一頁只有圖示、對象標題與一顆主要按鈕 |
| 停留 | 每翻一頁停一下；羅盤的指針轉向該對象的方位 |
| 交棒 | 書與書籤一起縮小淡出（不留下書籤），金翼離開 |

書籤（家庭／感情／事業／新手）可以直接點，鍵盤可切換。選擇會被記住。

**2026-10-06 修訂（使用者指示）**：補充內容不放在「＋」的面板裡，直接印在書頁上，像一本真的書，三種操作各司其職：

| 操作 | 作用 |
| --- | --- |
| 捲動 | 略讀：書打開（扉頁是區塊的說明），依序翻到四個對象的第一頁，然後書與書籤一起退場。釘住的長度維持短（手機約 1.4 個螢幕、桌機約 1.8 個） |
| 翻頁箭頭、頁角、鍵盤左右鍵 | 翻頁：同一個對象的下一頁，翻完接下一個對象的第一頁；可以往回翻 |
| 書籤 | 跳到某個對象的第一頁 |

每個對象的頁面：第一頁是圖示、標題、痛點引言與一顆主要按鈕；之後是「真實改變故事」（手機一則一頁、桌機兩則同頁）；最後是「專屬起點」、主要按鈕與一個文字連結。頁面下方有一排小圓點表示頁次。提示只用圖示與動作：第一頁的翻頁箭頭會輕輕閃動，右下角是翹起的頁角；不加任何文字。換到另一個對象時，捲動位置會跟著移到對應的地方，捲動與翻頁的狀態不會不一致。

**03 三階段**

| 拍點 | 畫面 |
| --- | --- |
| 建立 | 金翼由下方升起，在畫面底部張開 |
| 發展 | 內圈圓弧畫出，三條金線依序長到三個圓點，各帶出一個階段名稱並點亮一層羽毛 |
| 停留 | 沒有字幕的一拍 |
| 發展二 | 外圈圓弧畫出，三個圓點帶出三項服務名稱，字幕換成服務區的標題 |
| 交棒 | 金翼羅盤整體上升、縮小，成為下一張創辦人身後的光暈（羅盤與雙翼不分開） |

每個圓點點了才滑出原文與連結。

**04 創辦人**（不釘住）

拱形的照片位置進入畫面時，身後的光與金翼由小放大到位（跟隨），名稱與使命標題依序出現。使命宣言的引文直接顯示（它就是這一張的字幕）。

**05 媒體**

三本立著的書以 CSS 3D 呈現，書封是文字（書名），白金配色。桌機釘住，三本書隨捲動依序轉正；手機不釘住，進入畫面時依序立起。點任何一本到 `/media`。Podcast 精選三集列在書的下方，各是一列連結。

**06 社群**（不釘住）

密碼的六個數字進入畫面時依序翻出，下方是主要按鈕。金翼縮成小標誌停在標題旁。

**07 常見問題**（不釘住）

一般的收合清單，一次開一題。之後是共用的最終行動區塊與頁尾。

### 預算（手機 390×844，釘住的畫面）

| | 文字佔畫面 | 主角佔畫面 | 看得到的字 | 可點的東西 |
| --- | --- | --- | --- | --- |
| 01、02 | ≤ 12% | ≥ 40% | ≤ 70 | ≤ 7 |
| 03 | ≤ 16% | ≥ 40% | ≤ 120 | ≤ 9 |

「主角佔畫面」只算主角本身（金翼羅盤、書、放射圖），不算舞台背景。原型的實測是 32%、50%、41%，Hero 要再放大。

---

## 4. 實作規格（Next.js）

| 項目 | 做法 |
| --- | --- |
| 位置 | `src/components/stage/`：`HomeStage.tsx`（客戶端根元件）、每張 slide 一個元件、`StageSheet.tsx`（補充內容的面板）、`stage.css`、`timelines/` 每張一個檔 |
| 動畫 | `gsap`＋`ScrollTrigger`＋`MotionPathPlugin`，透過 `@gsap/react` 的 `useGSAP` 建立與清理；`gsap.matchMedia()` 分手機、桌機、減少動態 |
| 釘住 | CSS `position: sticky` 加每張一條 `scrub` 時間軸（原型已驗證的做法）；高度用 `svh` |
| 金翼羅盤 | 用既有的 `WingsCompass`／`emblemData.ts`；以 GSAP 改變 `--open`、`--needle` 與各層羽毛的不透明度 |
| 面板 | Radix Dialog（專案已有 `radix-ui`），樣式做成手機底部面板、桌機側邊面板；一次開一個、Esc 關閉、焦點回到觸發點 |
| 文案 | 全部取自 `src/data.ts`、`src/content/stages.ts`，不寫死 |
| 樣式 | 類別以 `st-` 開頭；顏色只用 `app/globals.css` 的 token（含 `--color-silver*`）與設計系統定義的金色 |
| 退路 | 預設的 CSS 就是直向的靜態頁面；`<html>` 有 `js` 類別（由 `app/layout.tsx` 的行內指令在首次繪製前加上）且沒有開啟「減少動態效果」時才套用舞台版面 |
| 既有功能 | 保留：`lib/need.ts`（記住選擇）、`lib/chapter.ts`＋`HomeStickyCta`（會變的固定列）、`lib/track.ts` 的事件、`SiteInteractions` |
| 必須保留的 id | `hero`、`hero-primary-cta`、`hero-community-cta`、`personas-section`、`need-tab-<id>`、`need-<id>`（`role="tabpanel"`，第一個連結是該對象的第一個按鈕）、`home-stages`、`featured-services`、`founder`、`media-section`、`free-resources`、`home-faq`、`final-cta`、`sticky-cta-bar` |
| 舊的首頁元件 | `src/components/home/` 的 `NeedEntries`、`HomeStages`、`StagePath`、`GoldenPath`、`ChapterProgress` 等在驗收通過前保留不刪，方便退回 |

速度底線：模擬慢速 4G 手機首次繪製不慢於 1.8 秒（現為 1.5 秒；加入 GSAP 後允許增加 0.3 秒），版面位移 0。主標與主按鈕必須在伺服器輸出的 HTML 裡、載入就可見。

---

## 5. 來源

- [Responsive scrollytelling best practices（The Pudding）](https://pudding.cool/process/responsive-scrollytelling/)
- [Animation Principles: Staging（Wave Motion Cannon）](https://wavemotioncannon.com/2017/05/27/animation-principles-staging/)
- [The 12 Principles of Animation, Explained（Motion The Agency）](https://www.motiontheagency.com/blog/12-principles-of-animation)
- [How Disney conquered the animation industry with these 12 principles（UX Collective）](https://uxdesign.cc/how-disney-conquered-the-animation-industry-with-these-12-principles-687acca99716)
- [Staging and Storyboarding（UAL 課程筆記）](https://michaelabrucknerblog.myblog.arts.ac.uk/?p=665)
- [Scroll storytelling（StudioMeyer）](https://studiomeyer.io/en/blog/scroll-storytelling)
- [Scrollytelling（The Plus Addons，含 Apple 式頁面的拆解）](https://theplusaddons.com/blog/scrollytelling/)
- [GSAP 官方 React 指南](https://gsap.com/resources/React/)
- [GSAP performance（greensock/gsap-skills）](https://skills.sh/greensock/gsap-skills/gsap-performance)
- [Working Stiff Films case study（Awwwards）](https://www.awwwards.com/working-stiff-films-case-study.html)
- [Scrolljacking 101（Nielsen Norman Group）](https://www.nngroup.com/articles/scrolljacking-101/)

研究限制：這些是實務原則，不是對照實驗；「主角佔畫面 40%」等數字是本專案自訂的目標，用來讓檢查可以量化。
