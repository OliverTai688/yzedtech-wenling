# Keila Healing 首頁 視覺規範（給工程實作用）

來源檔案：`Home.dc.html`（設計稿，含完整標記與文案，可直接對照還原）

## 1. 字體
- 中文標題／強調：`Noto Serif TC`（600–700）
- 中文內文／UI：`Noto Sans TC`（300–600）
- Google Fonts：`Noto+Serif+TC:wght@400;500;600;700` `Noto+Sans+TC:wght@300;400;500;600`

## 2. 色票
| 用途 | 色碼 |
|---|---|
| 頁面底色（淺區） | `#FBF1DD` |
| 淺區塊底色（卡片區） | `#FDF6E6` |
| 內文主色 | `#2E2318` |
| 標題深咖啡 | `#3A2A18` / `#4A2F0A` |
| 內文咖啡灰 | `#5A4A38` / `#6A5642` / `#7A6650` |
| 淡文字／說明 | `#9A8060` |
| 金色主強調 | `#B5762A`（連結／icon） |
| 金色深強調 | `#C9862E` |
| CTA 漸層 | `linear-gradient(135deg,#FCE7A8,#D89A3E)`（header 按鈕用 `#F5D98A→#C9862E`） |
| 卡片邊框 | `#F0DFA0` / `#EFDA9E` |
| 深色區塊底（Training／Footer） | `#20140A` |
| 深色區塊金字 | `#F0C875` / `#F5E4C8` |
| 深色區塊次文字 | `#B49A76` / `#C7AE8A` / `#8A7458` |

Hero／Intuition CTA 區塊使用「金色光斑（bokeh）」背景（`.bokeh-bg` class）：
```
background-color:#F3D999;
background-image: 8組不同位置/大小的 radial-gradient 光點（rgba 255,247,222 / 255,244,208 / 255,240,195，opacity .5–.9）
  + linear-gradient(135deg,#F7E3A8 0%,#E8B15A 45%,#D89A3E 75%,#C9862E 100%) 打底;
```
閃爍光點另用 `.sparkle`：4px–7px 圓點，`box-shadow` 發光，`shimmer` keyframe（opacity .4↔1，3s ease-in-out infinite）。

## 3. 版面結構（由上而下）
1. **Header**：sticky top，56px 左右留白，14px 上下，logo+站名 / 導覽 8 項 / CTA 圓角按鈕
2. **Hero**：`.bokeh-bg`，左右 2 欄（1.1fr / .9fr），左文字＋雙 CTA，右圓形人像
3. **Persona 快速導覽**：3 欄卡片，白底、圓角 18px、陰影
4. **Services**：4 欄 × 2 排卡片，圓角 16px，編號用金漸層文字
5. **Training**：深色底 `#20140A`，2 欄清單（希塔療癒 / 靈氣認證），每項標題+說明+報名按鈕
6. **Intuition CTA banner**：`.bokeh-bg` 圓角卡片，左文右按鈕
7. **Testimonials**：4 欄卡片
8. **Media**：3 張書封 + 3 個 podcast 標籤
9. **FAQ**：手風琴，6 題
10. **Footer**：深色 `#20140A`，logo + 連結 + 免責聲明

## 4. 間距與尺寸
- 版心 `max-width:1280px`，左右 padding `56px`
- Section 上下 padding：`80–110px`
- 卡片圓角：`14–20px`；按鈕：圓角 `999px`（膠囊）
- Grid gap：`24–28px`
- Hero 標題 `52px` / Section 標題 `32px` / 卡片標題 `16–20px` / 內文 `13–16px`

## 5. 元件規則
- **按鈕（主要）**：金色漸層背景、深咖啡文字 `#3A2409`、圓角 999px、`box-shadow` 金色陰影
- **連結（次要）**：純文字＋底線或箭頭 `→`
- **卡片**：白／米白底、1px 淡金邊框、輕陰影，深色區塊則用線框＋透明分隔線
- **手風琴 FAQ**：展開狀態圖示 `+` → `−`

## 6. 圖片
- Hero 人像：圓形 420×420，金框
- 書封 3 張：圓角矩形，16:9~ 直向皆可，220px 高度
- 目前皆為待補圖片區（image-slot 佔位）

## 7. RWD 注意
目前為桌機版設計稿（無響應式斷點）；工程師需自行規劃：
- Header 導覽在窄螢幕收合為漢堡選單
- Hero / Persona / Services / Training 等多欄 grid 於平板/手機改為單欄堆疊
- 字級與 padding 等比例縮小

## 8. 免責聲明文字（需完整保留於 Footer）
「本網站所提供之能量療癒、靈氣與相關課程，皆屬身心靈輔助與自我覺察支持，非醫療行為，不能取代專業醫療診斷、精神醫學治療或專業諮商。如有生理或心理疾患，請務必優先諮詢專業醫師。」
