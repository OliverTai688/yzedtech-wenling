# 金翼羅盤重繪：共用風格規範

**日期：** 2026-10-06
**依據：** 使用者 2026-10-06 核可的提示詞，並指示「每張圖片用一個子代理，由主代理控制細節、風格相同」。
**相關：** 設計系統 <https://claude.ai/artifact/4g9AR5QwELZpFhjd3apdf8>、[`ARC-002`](../../../02_architecture-and-rules/ARC-002_ui-and-interaction-rules.md) §8

這份文件是四張圖共同的風格依據。四張圖：展開（主圖）、收攏、分解、小標誌。風格一致靠三件事：同一份幾何模組、同一組色碼與漸層、同一個線寬。

這組圖是替代用的主視覺圖形，不是學苑的正式 Logo；正式 Logo 到位後整組替換。

## 1. 美術方向（核可的提示詞，逐字）

> A heraldic emblem of a pair of golden wings flanking a round compass, strict front view, perfectly bilaterally symmetric on the vertical axis, flat vector illustration with crisp edges.
>
> Geometry: built on a visible underlying logic of concentric circles and the golden ratio. The compass is a circle of diameter D at the exact centre. Each wing is 1.618 × D long and springs from the left and right edge of the compass ring. Each wing has exactly three tiers of feathers fanned from one shoulder pivot at equal angular steps: 9 long primary feathers, 7 medium secondary feathers (0.618 of the primary length), 5 short covert feathers (0.382 of the primary length). Feather tips of each tier lie on one smooth circular arc. Every feather is a slender leaf shape with a rounded tip and a single fine centre vein; feathers overlap neatly like roof tiles, never tangled.
>
> Compass: an outer ring with four larger cardinal markers and four smaller intermediate ticks, shown as small dots and short lines only; a thin inner ring; a pearl-white dial; a four-pointed compass rose with a longer vertical axis; a slim diamond-shaped needle split lengthwise into a gold half and a silver half; a small round pin at the centre. The four cardinal markers are clearly separate shapes.
>
> Colour: three tiers of feathers in three distinct tones so each tier reads on its own — primaries deep gold #B5762A to #C9862E, secondaries mid gold #D89A3E, coverts pale gold #F5D98A. Fine bronze outline #8A5415 of constant thin weight. Feather veins and the inner compass ring in soft silver #E3E1DC with highlights #FAFAF8 and shade #C4C1BA. Dial in pearl white #FFFDF0. Each shape uses a subtle two-stop gradient at most, light from top left. Background pure white #FFFFFF, generous empty margin.
>
> Style: refined, calm, luminous, jewellery-like precision, art-deco restraint. Every part is a separate closed shape with no merged outlines, suitable for layer-by-layer animation.

排除：文字、字母、數字、N E S W 字樣、人物、臉、鳥身、光環、皇冠、盾、緞帶、不對稱、透視、寫實、3D、厚重浮雕、陰影、外發光、光斑、材質雜訊、凌亂的羽毛、多餘的翅膀、卡通感。

## 2. 固定的數值

| 項目 | 值 |
| --- | --- |
| 羅盤外徑 D | 120 單位 |
| 單翼長度（肩點到最長羽尖） | 1.618 × D |
| 三層羽毛數量 | 9／7／5 |
| 三層羽毛長度比 | 1：0.618：0.382 |
| 每層的角度間距 | 層內等距 |
| 輪廓線 | 青銅 `#8A5415`，全圖同一線寬（D=120 時約 0.9 單位） |
| 主羽（第一層） | `#B5762A` → `#C9862E` |
| 次羽（第二層） | `#D89A3E`（可帶到 `#E2A84E` 的極淺漸層） |
| 覆羽（第三層） | `#F5D98A`（可帶到 `#FBE9B0`） |
| 羽軸、羅盤內環 | 銀 `#E3E1DC`，亮部 `#FAFAF8`，暗部 `#C4C1BA` |
| 盤面 | 珍珠白 `#FFFDF0` |
| 指針 | 縱向對分，一半金 `#C9862E`、一半銀 `#E3E1DC` |
| 最深的細線 | 墨 `#3A2A18`，只用在極小的點與指針軸心 |

不使用上表以外的顏色。每個形狀最多兩個色階的漸層，光源在左上。不用 `filter`、`mask` 的模糊、點陣圖、`<text>`、`<script>`、外部連結。

左右對稱以鏡射達成：只畫左翼，右翼用 `transform="scale(-1,1)"` 取得，不另畫。

## 3. 共用的幾何模組（風格一致的來源）

主圖的子代理建立，其餘三張只能匯入、不可修改：

```
scripts/emblem/geometry.mjs   常數、色盤、共用 <defs>、羽毛路徑函式、翼與羅盤的產生函式
scripts/emblem/pose.mjs       收攏姿態的參數（由「收攏」那一張調整）
scripts/emblem/build.mjs      產生 public/brand/emblem-open.svg
```

`geometry.mjs` 要匯出：

| 匯出 | 內容 |
| --- | --- |
| `PALETTE` | §2 的色碼 |
| `D`、`VIEWBOX`、`CENTER`、`PIVOT` | 基本尺寸；`PIVOT` 是左翼的肩點 |
| `STROKE` | 輪廓線寬 |
| `DEFS` | 共用的 `<defs>` 字串，漸層 id 一律以 `em-` 開頭 |
| `TIERS` | 三層的資料：每根羽毛的長度、寬度、展開角度 |
| `featherPath(length, width)` | 一根羽毛的路徑（葉形、圓尖）；`veinPath(length)` 是羽軸 |
| `wing({ side, open, pose })` | 一側翅膀的 SVG 片段。`open` 0 到 1；每根羽毛是 `<g class="f" style="--fold: …deg">`，`--fold` 是該羽毛由展開轉到收攏的角度差 |
| `compass({ needle })` | 羅盤的 SVG 片段 |
| `emblem({ open, needle, pose })` | 完整的 `<svg>` 字串 |

元素命名（網站的動畫靠這些）：

- `#wing-l`、`#wing-r`；每層 `<g class="tier tier-1">`（主羽）、`tier-2`、`tier-3`；每根羽毛 `<g class="f">`，內含輪廓與羽軸兩條路徑。
- `#compass`；`#compass-ring`、`#compass-inner`、`#dial`、`#rose`、`#needle`、`#pin`。
- 四個方位點 `<g class="mark" data-dir="n|e|s|w">`，各自是獨立的形狀；四個小刻度 `class="tick"`。

收攏的算法：每根羽毛繞 `PIVOT` 旋轉 `--fold × (1 − open)`。`open = 1` 時就是主圖。

## 4. 四張圖

| 檔案 | 內容 | 用途 |
| --- | --- | --- |
| `public/brand/emblem-open.svg` | 主圖：雙翼完全展開 | 首頁各處、設計系統 |
| `public/brand/emblem-folded.svg` | 雙翼收攏，三層羽毛像闔起的扇子貼著羅盤兩側、羽尖朝下 | Hero 的起點 |
| `public/brand/emblem-exploded.svg` | 分解圖：左翼三層上下分開、羅盤的外環、盤面、羅盤玫瑰、指針、軸心各自排開，對齊格線，無任何標籤 | 分解說明的畫面、設計系統 |
| `public/brand/emblem-mark.svg` | 小標誌：每側三根粗羽毛（每層一根，三種金），羅盤簡化為一個環、四芒星與中心點；線條加粗，沒有羽軸 | 頁首、頁尾、網站圖示（24–40px） |

SVG 一律透明背景（不放底色矩形），只有 `viewBox`、沒有固定的寬高，檔案不超過 30 KB。

## 5. 檢查

每張圖交付前，用下面的指令把 SVG 畫成 PNG，並實際讀圖判斷（至少兩輪）：

```
cd "/private/tmp/claude-501/-Users-pzps0964713-Documents-github-wenling-web-main/9156bccd-d94a-4044-84ac-1c19c280e369/scratchpad/shots"
node render-svg.mjs <svg 的絕對路徑> <輸出.png> 1200 "#FFFFFF"
```

背景另外用 `#FBF1DD`（網站底色）與 `#20140A`（深色區塊）各畫一次；寬度另用 160 畫一次看小尺寸。

- [ ] 左右完全對稱。
- [ ] 羽毛數量 9／7／5，沒有多或少。
- [ ] 每層羽尖落在一條平順的圓弧上，角度等距，疊放整齊。
- [ ] 三層的金色一眼分得出來。
- [ ] 羅盤的四個方位點是獨立的形狀，沒有黏在外環上；指針金銀對分。
- [ ] 沒有 §1 排除的任何東西，沒有 §2 以外的顏色。
- [ ] 在白、奶油、深色三種底上都清楚；160px 寬時仍看得出翅膀與羅盤。
- [ ] 沒有主控台錯誤；檔案大小在限制內。

## 6. 完成紀錄（2026-10-06）

四張圖各由一個子代理完成，主代理逐張渲染檢查後套用。

| 檔案 | viewBox | 大小 | 檢查結果 |
| --- | --- | --- | --- |
| `emblem-open.svg` | 0 0 474 249 | 15.9 KB | 左右對稱；羽毛 9／7／5；三層金色分明；四個方位點獨立；指針金銀對分 |
| `emblem-folded.svg` | 117 78 240 296 | 17.4 KB | 雙翼垂下、羽尖略向內；由收攏到展開的過程沒有羽毛互相穿過 |
| `emblem-exploded.svg` | 0 0 888 515 | 10.0 KB | 左翼三層上下排開、羅盤六個零件沿一條水平軸排開；全部由主圖的函式產生 |
| `emblem-mark.svg` | 0 0 72 44 | 2.4 KB | 24–240px 清楚；16px 會糊成一團 |

與規範不同之處：

- 收攏的姿態是「垂在羅盤下方」，不是「貼在兩側」。羽毛只能繞肩點旋轉，肩點在外環內側，所以收起來會比較長。
- 分解圖的細虛線在深色底上幾乎看不見；版面左重右輕。
- 小標誌的輪廓線比主圖粗（為了在 24px 仍看得見淺色的那根羽毛），與「全圖同一線寬」不一致，屬於小尺寸的必要調整。

已套用：網站的 `WingsCompass`（首頁需求入口）、`WingsMark`（頁首、頁尾、行動區塊、章節編號旁、404）、設計系統的 Brand 素材。腳本原型（`proposals/home-script/`）尚未換圖。


## 7. 第二版：依使用者提供的參考圖重繪（2026-10-06）

使用者提供了一張參考圖，希望四張圖「更接近圖片中的細節」。圖檔沒有存進 repo，以下是主代理看圖後的描述，重繪以此為準。§1 的提示詞與 §2 的固定比例（1.618、9／7／5）與這張圖衝突的地方，**以這張圖為準**。

### 參考圖的樣子

- **整體**：左右鏡射的一對翅膀，**高而上揚**，合起來像一個寬的 V 字（也像一顆沒有閉合的心）。翅膀是主角，佔畫面絕大部分；羅盤很小，在兩翼之間的下方正中。
- **翅膀的姿態**：每一翼的最高點是一根最長的羽毛，尖端指向上方並略向外，幾乎碰到圖的頂端。兩翼的頂端相距很遠（約為整體寬度的九成），往下逐漸靠攏，翼根在底部正中的兩側收在一起，把羅盤夾在中間偏下的位置。內緣是一條平順的 S 形曲線（像左右括號 `) (` 的反向），由頂端向下、向內收到翼根；兩翼內緣之間圍出一個上寬下窄的空間。
- **羽毛**：每翼約 12–14 根看得清楚的長羽毛，都是**尖頭的刀葉形**（不是圓頭），尖端略帶上鉤。由上到下依序轉向：最上面的指向上方偏外，中段指向正外側，最下面的指向外下方並明顯變短，底部幾根向內彎向翼根。羽毛分層：靠內緣有一排較短的覆羽蓋在長的飛羽上，層次分明、像屋瓦。
- **比例**（以單翼高度為 1）：單翼寬約 0.6；兩翼頂端的距離約 1.25；羅盤直徑約 0.22，圓心在離底部約 0.24 的高度；兩翼在羅盤兩側的間隙只比羅盤略寬。
- **羅盤**：線稿風格，沒有實心的盤面，像刻上去的。雙層外環，一圈細密的刻度，十六芒的羅盤玫瑰（四個長的主方位、四個中等的次方位、八個短的），中心一個小圓。圖上有方位字母，我們不放字母，四個主方位改用獨立的小點或菱形標記。
- **材質**：金色亮片的質感，表面有顆粒狀的閃光，零星幾顆四芒星形的亮點；羽毛重疊處是較深的青銅色，羽毛邊緣有一道亮邊，看起來有浮雕的厚度。
- **背景**：淡金色加大顆的散景光斑（這是背景，不屬於圖形本身）。

### 重繪時要保留的（網站的動畫靠這些）

- `geometry.mjs` 的匯出項目、元素的 id 與類別（§3），以及每根羽毛的 `--fold` 收攏機制。
- 三層羽毛（`tier-1` 最長的飛羽、`tier-2`、`tier-3` 靠內緣的覆羽），三種可以分辨的金色，方便一層一層點亮；數量不必是 9／7／5，以接近參考圖為準。
- 四個獨立的方位標記 `.mark[data-dir]` 與可以轉動的 `#needle`（指針要細，不搶玫瑰的戲）。
- 左右以鏡射達成；不放任何文字；不用 `filter`、點陣圖、`<script>`。

### 可以放寬的

- 漸層可以用到三個色階，讓金屬感更明顯；可以加亮邊（另一條較淺的細線）與重疊處的深色。
- 亮片感用向量做：每翼最多約 40 個小亮點與 6–10 顆四芒星亮點，放在各自的 `<g class="sparkles">` 裡，位置用固定的亂數種子產生（每次建置結果相同）。亮點是裝飾，移除後圖形仍須完整。
- 檔案上限放寬到 45 KB（主圖）；小標誌仍不超過 4 KB。
- 顏色仍只用金、青銅、銀、珍珠白這一組，可以增加中間色階。

四張圖都要更新：展開（就是參考圖的姿態）、收攏、分解、小標誌。小標誌要認得出是同一對上揚的翅膀與小羅盤。
