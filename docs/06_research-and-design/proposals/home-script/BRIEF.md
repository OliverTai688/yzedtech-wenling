# 首頁腳本式捲動故事：設計簡報

**日期：** 2026-10-05
**依據：** 使用者 2026-10-05 的指示（下方「使用者指定的分鏡」逐條照錄）、[`PRD-004`](../../../01_product-requirements/PRD-004_story-driven-interactive-site.md)、[`ARC-002`](../../../02_architecture-and-rules/ARC-002_ui-and-interaction-rules.md)

## 1. 目標

把首頁做成一支連貫的「腳本」：每個區塊是一張獨立的 slide，靠捲動推進動畫來說故事。一開始每張 slide 只保留很少的文字、主題明確，其餘內容靠互動展開。視覺以學苑的金翼 Logo 為發想：可以分解說明，也可以飛行，串起整頁。

參考作品：<https://codepen.io/alyona-mysiura/pen/dygaMRe>（Zajno 的 Cicada v2）。它的做法：GSAP 加 ScrollTrigger，以原生捲動 `scrub` 一條主時間軸；畫面元素多為 `position: fixed` 的圖層；標題用 SplitText 逐行進出；一隻有翅膀的昆蟲用 MotionPath 沿路徑飛行，在各 slide 之間擔任主角；另用 DrawSVG 與自訂緩動。我們要的是同一種「一個主角貫穿、slide 之間連貫轉場」的感受，主角換成金翼。

## 2. 使用者指定的分鏡（必須照做）

| Slide | 內容 | 使用者的指示 |
| --- | --- | --- |
| 1 | Hero | （起點） |
| 2 | 需求入口，四個對象：家庭／感情／事業／新手 | 變成一本 3D 的書讓使用者打開。往下滑的過程打開書，然後陸續顯示四個對象；也可以直接點選來跳（翻書動畫）看不同對象的描述 |
| 3 | 三階段 | 翅膀慢慢從底下飛出來，然後陸續遇到三個階段。原本的插圖拿掉，因為重複了 |
| 4 | 創辦人 | 正式介紹創辦人 |
| 5 | 媒體 | 3D 的三本書和 Podcast 可以看；點書就到媒體專訪 |
| 6 | 免費社群 | 再次說加入社群 |
| 7 | 常見問題 | |
| — | 頁尾 | |

使用者另外指出：現在的「能量療癒服務」三張卡片文字太多、不是互動的。分鏡沒有單獨給它一張 slide。請在腳本裡提出它的去處（建議：併入 Slide 3 的結尾，金翼飛抵後只露出標題與三項服務名稱，點一下才看一句話與連結），並在 STORYBOARD 標為「待使用者確認」。錨點 `#featured-services` 要保留。

## 3. 不能違反的規則

1. **文案只能逐字取自 docx**。所有文字已整理在 `src/data.ts`（`heroContent`、`needEntriesIntro`、`needEntries`、`homeContent`、`uiLabels`、`serviceBlurbs`、`services`、`mediaIntro`、`mediaPublications`、`mediaShows`、`resources`、`siteLinks`）與 `src/content/stages.ts`（三階段）。只能使用這些檔案裡現有的字串，一個字都不能新增、改寫、摘要或翻譯。沒有對應文字的地方用數字（01–07）、圖示或圖形。完成後會用腳本逐句比對 `docs/網站文案集.md`。
2. **路由與錨點不變**：`#hero`、`#personas-section`、`#home-stages`、`#featured-services`、`#founder`、`#media-section`、`#free-resources`、`#home-faq` 都要存在；所有連結沿用 `src/data.ts` 的網址。
3. **不偽造**：不放任何人像或書封照片（素材未到）。創辦人照片位置用圖形佔位；書用文字封面。不顯示見證。
4. **隨時能行動**：頁首的商城按鈕與手機底部固定列（主按鈕＋私訊諮詢）在任何 slide 都可用；每張 slide 至少有一個出口或下一步。
5. **可及性與退路**：所有文字是真正的 DOM 文字、依閱讀順序排列；收合的內容留在 HTML。沒有 JavaScript、或系統開啟「減少動態效果」時，整頁是一般的直向頁面，內容全部可讀可點。
6. **不改變捲動本身**：用原生捲動驅動（ScrollTrigger 的 `pin` 與 `scrub`），不攔截滾輪、不改速度與方向、不強制吸附。每張 slide 釘住的捲動長度要短（桌機不超過約 1.5 個螢幕，手機不超過約 1 個螢幕），讓只想往下找資訊的人很快通過。
7. **手機優先**：多數訪客用手機。390px 寬必須完整可用：3D 書在手機上可簡化成單頁翻面，但翻頁與點選跳頁都要能用；點擊目標至少 44px。
8. **效能**：只動 `transform` 與 `opacity`；不用 three.js、不放影片；3D 用 CSS 3D transform。第三方資源已獲使用者允許，但只載入 GSAP（核心與需要的外掛）與 Google Fonts。

## 4. 可用資源

- GSAP 3（含 ScrollTrigger、MotionPathPlugin、SplitText、DrawSVGPlugin、CustomEase、Flip；現在全部免費可商用）。原型用 CDN：`https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js` 與同目錄的 `ScrollTrigger.min.js` 等。Repo 已安裝 `gsap` 與 `@gsap/react`，供之後實作。API 有疑問請查 <https://gsap.com/docs/v3/>。
- 金翼羅盤的 SVG：`src/components/brand/WingsCompass.tsx`（三層羽毛，可逐層、逐根操作）與 `WingsMark.tsx`；樣式在 `app/globals.css` 的 `.emblem`。這是替代圖形，正式 Logo 之後替換，所以動畫要以「左翼、右翼、羅盤、羽毛層」這幾個部件為單位，方便換圖。
- 設計 token 與頁首頁尾外殼：`../_kit.css`、`../_shell.html`（頁首導覽目前是三組：關於豐盛之翼學苑／療癒與培訓／見證與實用內容，按鈕「私訊諮詢」「商城」；以 `src/data.ts` 的 `primaryNavigation` 為準）。
- 現有首頁實作可參考：`app/page.tsx`、`src/components/home/*`。

## 5. 設計上的提示（可以推翻，但要說明理由）

- 金翼有三層羽毛，三階段正好各點亮一層：這是「分解說明」的機會。
- 主角的旅程：Hero 停在羅盤上 → 起飛 → 落在書的封面成為書徽 → 書闔上後再起飛，沿路經過三個階段 → 張開成創辦人身後的光 → 收成三本書的書籤或書徽 → 帶著社群密碼 → 最後停在頁尾。主角在 slide 之間不要消失再出現，要飛過去。
- 「少少的文字」：每張 slide 的初始畫面只有編號、一個標題、最多一句話、一顆按鈕。
- 書的每一頁只放該對象的標題與一句痛點引言；「真實改變故事」「專屬起點」與兩顆按鈕在翻到該頁後才出現或點開。

## 6. 交付

1. `STORYBOARD.md`（繁體中文）：逐 slide 的分鏡腳本，格式見下。
2. `index.html`：可直接用瀏覽器開啟的完整原型（`file://`），桌機 1280px 與手機 390px 都可用。
3. 回報（300 字內）：做了什麼、哪些地方沒達到、需要使用者決定的事。

STORYBOARD 每張 slide 要寫：這一張要讓訪客知道什麼；初始畫面上的文字（註明取自哪個欄位）；畫面與主角的狀態；捲動時間軸（0%→100% 分幾拍，每拍發生什麼）；點擊互動；手機版差異；沒有動效時的樣子；行動出口；需要的素材（現在用什麼佔位、之後換什麼）；風險。最後附整頁的節奏表（每張 slide 釘住多長）、技術做法摘要，以及待使用者確認的問題。
