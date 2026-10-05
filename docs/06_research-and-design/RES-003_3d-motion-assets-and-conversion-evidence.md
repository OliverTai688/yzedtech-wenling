# RES-003 3D 動畫素材與轉化數據研究

**狀態：** Active
**日期：** 2026-10-05
**相關文件：** [`RES-001`](./RES-001_second-revision-uiux-research.md)（轉化路徑）、[`RPT-001`](../05_audits-and-reports/RPT-001_content-asset-and-motion-gap-proposal.md) §5（動效缺口）、[`proposals/BRIEF.md`](./proposals/BRIEF.md)
**方法：** 2026-10-05 以網路搜尋彙整公開研究、A/B 測試報告與工具說明。數字取自搜尋結果的摘要，未逐一讀原文查核；每項都標了來源類型與可信度。

---

## 1. 研究問題

1. 有哪些現成的 3D 動畫或素材可以用，讓網站的整體感更強？
2. 數據上，哪些做法真的有助於訪客走到 CTA？3D 與動畫算不算？

---

## 2. 結論

- **數據最支持的不是 3D，是速度與 CTA 的可及性。** 載入快 0.1 秒、長頁面加固定 CTA，都有多個測試顯示轉化提升。
- **動畫對轉化的效果不一致。** 同樣的效果在不同品牌有升有降；會拖慢閱讀的捲動動畫反而傷害品牌觀感。
- **「3D 首頁提升轉化」沒有可靠證據。** 查到的數字都來自部落格與接案公司的自述，沒有對照組與樣本說明。
- **所以 3D 的定位是品牌記憶，不是轉化手段。** 它值得做，但要放在不拖慢載入、不擋住閱讀的位置，並且實際量測它有沒有影響 CTA 點擊。
- **整體感最強的 3D 素材是學苑自己的 Logo。** 把 Logo 的向量檔在 three.js 裡擠出厚度、上金屬材質，就是品牌專屬的 3D 金翼，不需要買模型。

---

## 3. 轉化數據

### 3.1 證據強度總表

| 做法 | 對轉化的效果 | 證據 | 可信度 |
| --- | --- | --- | --- |
| 載入速度 | 手機網站快 0.1 秒，零售轉化 +8.4%、旅遊 +10.1%；研究樣本也包含名單型網站 | Google 委託 Deloitte 的跨品牌研究 | 高 |
| 長頁面的固定 CTA | 一個案例銷售 +25%；同一份報告指出各種固定按鈕版本都比沒有按鈕高至少 8%。其他電商測試為 +7% 至 +16% | 轉化優化公司的 A/B 測試報告，多個獨立案例 | 中高（都是電商） |
| CTA 的對比與文案 | 把文字連結改成按鈕，點擊 +34% 與 +77%；行動導向的文案 +12–28% | 單一案例與彙整文章 | 中 |
| CTA 按鈕的小動畫 | 有的品牌小幅上升，有的持平或下降 | 同一家公司跨品牌測試 | 中（結論是「看情況」） |
| 淡入、背景動畫 | 沒有一致的方向 | 同上 | 中 |
| 動畫的時間長短 | 縮短一段流程動畫，轉化 +60% | 單一案例 | 低至中（重點是「短」，不是「有動畫」） |
| 捲動觸發動畫 | 拖慢資訊取得時，使用者不喜歡，並影響對品牌的觀感 | 第三方轉述 Nielsen Norman Group 的易用性研究 | 中（轉述） |
| 3D／WebGL 首頁 | 自述互動 +250%、跳出 −40%、轉化 +28%；一個個案停留時間由 29 秒升到 1 分 38 秒 | 部落格、接案公司文章、個人作品集 | 低（無對照組） |

### 3.2 對本站的意義

1. **速度是第一優先。** 任何 3D 都不能延後主標題與主按鈕出現的時間。做法：畫面先用伺服器輸出的 HTML 與 CSS 顯示，3D 等頁面可互動後才載入；離開視窗就停止繪製。
2. **固定 CTA 是數據最明確的一項。** RES-001 已規劃詳細頁的手機底部固定列。依這次的數據，首頁在手機上也加上固定列（捲過 Hero 之後出現）。
3. **動效用來指路。** 動效應該把視線帶向下一步：光的路徑通往 CTA、主按鈕的金光、分頁切換的回饋。純裝飾、與下一步無關的動效要少。
4. **捲動敘事不能擋路。** 不鎖住捲動、不強迫看完動畫才能讀內容；手機不做固定舞台。
5. **3D 要量測。** 階段 E 用 Vercel Analytics 的事件帶上「是否顯示 3D」的欄位，比較兩組的需求入口點擊率。若沒有差異或更差，就把 3D 縮到只剩 Logo。

### 3.3 2026 年的 3D 網站趨勢

- 得獎網站多數是捲動敘事型：鏡頭沿路徑前進，每個捲動節點帶出新內容。
- 評價好的作品強調克制；單純的粒子背景因為太常見，評價下滑。
- three.js 仍是主流。

這些是設計圈的評選標準，不是轉化數據，只能當作「怎樣的 3D 不顯得過時」的參考。

---

## 4. 可用的 3D 與動畫素材

| 方案 | 內容 | 授權與費用 | 整體感 | 重量與風險 | 建議 |
| --- | --- | --- | --- | --- | --- |
| A. Logo 向量檔轉 3D | 用 three.js 讀取 Logo 的 SVG，擠出厚度、上金色金屬材質，加環境光反射 | Logo 是客戶自有；環境貼圖用 Poly Haven（CC0，可商用） | 最高：就是品牌本身 | three.js 核心加一張小貼圖；需要分層的 Logo SVG（RPT-001 G1） | **採用**，Logo 到位後做 |
| B. 程式產生的光效 | 金色光塵、光暈、流光，用著色器或 CSS 寫 | 自製，無授權問題 | 高：顏色直接用設計 token | 可控；粒子背景本身已氾濫，要有明確的光源與方向 | **採用**，少量、只圍繞主視覺 |
| C. 2D 向量動畫（SVG 加 `motion`） | 雙翼展開、光的路徑、羅盤轉動，用 SVG 與既有套件做 | 自製 | 高 | 最輕；不需新套件 | **採用**，作為 3D 的基礎與替代畫面 |
| D. AI 圖片轉 3D（Meshy、Tripo） | 上傳 Logo 圖，產生 GLB 模型 | 免費方案不可商用；商用需付費（Meshy Pro 約每月 20 美元） | 中：羽毛等細薄結構品質不穩，需要修模 | 模型檔較大，要壓縮 | 備案：方案 A 效果不夠立體時再用 |
| E. 現成模型（CGTrader、RenderHub、Fab、Sketchfab） | 現成的翅膀模型，有 GLB 格式 | 每個模型授權不同，多數需購買 | 低：風格不是學苑的翅膀 | 寫實羽毛模型面數高 | 不採用 |
| F. Spline | 3D 設計工具，可嵌入網頁 | 免費版有浮水印；每月 12 美元起可移除 | 中 | 場景由 Spline 代管並在執行時載入，另有執行環境的重量；多一個外部依賴 | 不採用 |
| G. Rive／Lottie | 互動式 2D 向量動畫檔。Rive 檔案通常比 Lottie 小很多，有狀態機，可由捲動控制 | 工具有免費方案 | 高（若請設計師製作） | 需要有人在 Rive 編輯器製作，等於多一項素材缺口 | 這一輪不採用；方案 C 已能涵蓋 |
| H. 小型 WebGL 漸層函式庫 | 例如 `gradient-gl` 等 MIT 授權的動態漸層背景 | MIT | 中 | 很輕，但效果通用 | 不採用；CSS 散景已足夠 |

**需要的套件**：只有 `three`（已安裝 0.186）。不加 `@react-three/fiber`、Spline、Rive、Lottie。

---

## 5. 落到設計的決定

1. **視覺主軸**：金翼與羅盤（Logo）是全站唯一的 3D 主角；光的路徑是貫穿各頁的 2D 線索。兩者都指向 CTA。
2. **3D 出現的位置**：首頁 Hero 的主視覺、最終 CTA 區塊。內頁不放 3D，只用同一套光效與進場動效維持一致。
3. **Logo 未到位前**：先用 SVG 繪製的替代圖形做 2D 版本；Logo 到位後換成方案 A 的 3D 版本，版面不必重排。
4. **載入策略**：3D 只在瀏覽器端、頁面可互動後載入；手機與「減少動態」設定顯示靜態圖。
5. **首頁手機加固定 CTA 列**（新增，依 3.1 的數據）。
6. **提案評分調整**：BRIEF §7 的「實作風險與素材依賴」併入效能，新增「動效是否指向 CTA」一項。
7. **階段 E 加一項比較**：有無 3D 兩組的需求入口點擊率。

---

## 6. 研究限制

- 數字取自搜尋結果摘要，未讀原始報告全文，也沒有本站自己的流量數據。
- 轉化研究多數來自電商，本站是「諮詢與預約」型，效果幅度不一定相同。
- Nielsen Norman Group 的結論是經第三方文章轉述。
- 工具的方案與價格可能變動，採用前要再確認。

---

## 7. 來源

- [Milliseconds make millions（web.dev）](https://web.dev/case-studies/milliseconds-make-millions)
- [Win Report: How a "sticky" call to action increased sales by 25%（Conversion Rate Experts）](https://conversion-rate-experts.com/sticky-cta-win-report/)
- [Adding a sticky CTA to the product detail page（Blend Commerce）](https://blendcommerce.com/blogs/ab-tests-shopify/adding-a-sticky-cta-to-the-product-detail-page)
- [Better placed sticky add-to-cart（Blend Commerce）](https://blendcommerce.com/blogs/ab-tests-shopify/better-placed-sticky-add-to-cart-product-page-conversion)
- [Animated ping effect for collapsed button experiment（Recart）](https://recart.com/laboratory/animated-ping-effect-for-collapsed-button-experiment)
- [Fade-in animation for containers experiment（Recart）](https://recart.com/laboratory/fade-in-animation-for-containers-experiment)
- [How Talkspace increased conversions by 60%（Taplytics）](https://taplytics.com/blog/how-talkspace-increased-conversions-by-60-with-web-a-b-testing)
- [Clicks to key conversion pages increased 35–77%（Seer Interactive）](https://www.seerinteractive.com/case-studies/clicks-key-conversion-pages-increased-35-77/)
- [Landing page CTA button performance statistics（Flint）](https://www.flint.com/blog/landing-page-cta-button-performance-statistics)
- [Animation for Attention and Comprehension（Nielsen Norman Group）](https://www.nngroup.com/articles/animation-usability/)
- [Are scroll-triggered animations worth your time?（The Creative Momentum）](https://www.thecreativemomentum.com/blog/are-scroll-triggered-animations-worth-your-time)
- [The Ultimate Guide to Animated 3D Website Backgrounds（BrightCoding）](https://www.blog.brightcoding.dev/2025/12/07/the-ultimate-guide-to-animated-3d-website-backgrounds-transform-your-site-in-2025/)
- [Enhancing Engagement Rate using WebGL: A Case Study](https://rachitchaudhary.com/projects/enhancing-engagement-rate-using-webgl-a-case-study)
- [Why Static Heroes Blend Into Background Noise（Exmoor Web）](https://www.exmoorweb.co.uk/blog/posts/bubble-hero)
- [8 Best Three.js Websites of 2026（Utsubo）](https://www.utsubo.com/blog/best-threejs-websites-2026)
- [Awwwards 2026 3D](https://svilenkovic.com/3d/awwwards-2026-3d)
- [Core Web Vitals for animation-heavy sites](https://www.hontran.dev/blog/core-web-vitals-for-animation-heavy-sites)
- [Tripo AI Review 2026](https://pasqualepillitteri.it/en/news/7811/tripo-ai-review-3d-model-generator)
- [Best Free AI 3D Model Generator, 2026 picks（Sorceress）](https://sorceress.games/blog/best-free-ai-3d-model-generator-honest-2026-picks)
- [Spline 3D scenes（Instant docs）](https://docs.instant.so/en/articles/16068111-spline-3d-scenes)
- [Spline（FitGap）](https://us.fitgap.com/products/008644/spline)
- [Rive as a Lottie alternative（Rive）](https://rive.app/blog/rive-as-a-lottie-alternative)
- [Lottie vs. Rive（Callstack）](https://callstack.com/blog/lottie-vs-rive-optimizing-mobile-app-animation)
- [CSS scroll-driven animations go cross-browser](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)
- [gradient-gl（npm）](https://npmjs.com/package/gradient-gl)
