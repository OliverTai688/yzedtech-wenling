# PRD-005：部落格後台（CRUD、圖文編輯器、MongoDB 儲存）

**版本：** 1.1（2026-10-17 加入伺服器端壓縮 ≤ 1 MB）
**日期：** 2026-10-17
**狀態：** Ready for Implementation
**相關文件：** [`ARC-001`](../02_architecture-and-rules/ARC-001_architecture-overview.md)、[`ARC-002`](../02_architecture-and-rules/ARC-002_ui-and-interaction-rules.md)、[`PRD-004`](./PRD-004_story-driven-interactive-site.md) §硬性限制、執行計畫 [`PLN-007`](../04_execution-plans/PLN-007_blog-admin-cms-plan.md)

---

## 1. 概觀

「好運blog」（`/blog`）目前只顯示頁名：6 篇示範文章寫死在 `src/data.ts`，因為不是客戶提供的文字而以 `SHOW_BLOG_POSTS = false` 關閉。網站沒有資料庫，也沒有後端。

使用者（2026-10-17）指示：要有**後台頁面**，可以對部落格文章做新增、讀取、修改、刪除與發布，對應到前台的部落格；編輯器要能**上傳圖片、編排文字、嵌入 YouTube 連結**；**文章與圖片都存在 MongoDB**。

文章由客戶（文齡老師／學苑）在後台親自撰寫，所以前台顯示的文章內容屬於「客戶提供的內容」，符合 ARC-002 §1 的文案來源規定。

---

## 2. 異動摘要

| # | 需求 | 現況 | 目標狀態 |
| --- | --- | --- | --- |
| 1 | 後台登入 | 無 | `/admin/login`：以環境變數設定的管理密碼登入，登入後發 httpOnly 簽章 cookie（7 天） |
| 2 | 文章 CRUD | 文章寫死在 `src/data.ts` | `/admin/blog` 列表（草稿／已發布、搜尋）、`/admin/blog/new` 新增、`/admin/blog/[id]` 編輯、刪除、發布／取消發布 |
| 3 | 圖文編輯器 | 無 | Tiptap 所見即所得：H2／H3、粗體、斜體、底線、刪除線、連結、項目／編號清單、引言、分隔線、圖片（上傳、拖放、貼上，可填替代文字）、YouTube 嵌入、復原／重做 |
| 4 | 儲存 | 無資料庫 | MongoDB：文章存 `blogPosts` collection；圖片存 GridFS（bucket `blogImages`），由 `/api/blog/images/[id]` 輸出並長期快取 |
| 5 | 前台列表 | 只有頁名 | `/blog` 列出已發布文章（分類篩選、最新一篇顯示封面與摘要）；沒有已發布文章時維持只有頁名 |
| 6 | 前台文章頁 | 文章在面板（PageSheet）裡讀 | **新增 `/blog/[slug]`**：完整文章頁（封面、圖文、YouTube），可分享、可被搜尋引擎收錄 |
| 7 | 更新即時性 | — | 後台儲存、發布、刪除後以 `revalidatePath` 更新前台快取，不需重新部署 |

---

## 3. 詳細需求

### 3.1 路由與 PRD-004「路由不變」的例外

PRD-004 的硬性限制「不新增、不移除、不改名任何網址」適用於該輪的故事化改版。本 PRD 是新功能，**明確新增**下列路由，既有網址與錨點都不變：

| 路由 | 用途 | 索引 |
| --- | --- | --- |
| `/blog/[slug]` | 前台文章頁 | 收錄 |
| `/admin`、`/admin/login`、`/admin/blog`、`/admin/blog/new`、`/admin/blog/[id]` | 後台 | `noindex`，`robots.txt` 不需列出 |
| `/api/blog/images/[id]` | 公開的圖片輸出 | — |
| `/api/admin/*` | 後台 API（需登入） | — |

後台頁面不顯示網站的頁首、頁尾與浮動按鈕。

### 3.2 文字來源規則的適用範圍

- **後台介面**（按鈕、欄位名稱、提示）只給管理者看，不屬於 ARC-002 §1 的「對訪客顯示的文字」，可由開發者撰寫。
- **前台**的文章標題、摘要、分類、內文全部來自後台輸入（客戶提供）。前台介面字只沿用既有字串：`pagesContent.blog`（`好運blog`、`全部`、`閱讀全文`）與 `uiLabels`；其中 `全部`、`閱讀全文` 原本就標為待客戶確認，維持此狀態。
- 日期、閱讀時間用數字＋圖示呈現（不加「分鐘」以外的新字；「分鐘」沿用既有 `readTime` 的寫法並列為待確認）。

### 3.3 資料模型

`blogPosts` collection：

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `_id` | ObjectId | |
| `slug` | string（唯一） | 網址用；可輸入中文；空白時由標題產生 |
| `title` | string | 必填，最多 120 字 |
| `summary` | string | 列表與 meta description，最多 300 字 |
| `category` | string | 自由輸入，後台提示既有分類 |
| `tags` | string[] | |
| `coverImageId` | string \| null | GridFS 檔案 id |
| `content` | Tiptap JSON | 編輯器的原始資料（唯一真實來源） |
| `html` | string | 儲存時由伺服器依同一組擴充套件從 JSON 產生，前台直接輸出 |
| `readMinutes` | number | 依字數估算（中文每分鐘約 400 字） |
| `status` | `'draft' \| 'published'` | |
| `publishedAt` | Date \| null | 第一次發布時寫入，可在後台修改 |
| `createdAt`、`updatedAt` | Date | |

索引：`{ slug: 1 }` 唯一、`{ status: 1, publishedAt: -1 }`。

圖片（GridFS `blogImages`）：只接受 JPEG／PNG／WebP／GIF，收到的原檔上限 4 MB（Vercel 函式請求上限 4.5 MB）。瀏覽器端上傳前先把超過 2000px 的圖縮小並轉成 WebP（GIF 不轉），降低傳輸量。

**伺服器端壓縮（v1.1，使用者 2026-10-17 指示）：每張圖都經過上傳 API 壓縮，確保存進 MongoDB 的檔案 ≤ 1 MB。** 以 `sharp` 重新編碼成 WebP：長邊先縮到 2000px，畫質從 82 依序降到 42；仍超過 1 MB 就把尺寸縮小 25% 重來（最小 320px）。同時依 EXIF 轉正方向後拿掉全部 EXIF（含 GPS 位置），GIF 轉成保留動畫的動態 WebP；解碼後超過 1 億像素或無法解碼的檔案回傳 422。GridFS 的 metadata 記錄壓縮後的寬高、大小與原檔格式、大小。

### 3.4 安全

- 管理密碼與簽章金鑰只放環境變數：`ADMIN_PASSWORD`、`ADMIN_SESSION_SECRET`（至少 32 字元）。
- `middleware.ts` 擋下未登入的 `/admin/*`（登入頁除外）與 `/api/admin/*`；每個後台 API 與後台版面**再檢查一次**（不只依賴 middleware）。
- cookie：`httpOnly`、`sameSite=lax`、正式環境 `secure`；內容是到期時間＋HMAC-SHA256 簽章。
- 寫入 API 只接受同源請求（檢查 `Origin`），防止跨站送出。
- 文章 HTML 由伺服器從 JSON 產生；連結只允許 `http(s)`、`mailto`、`tel`、站內路徑；YouTube 只接受 youtube.com／youtu.be 並以 `youtube-nocookie.com` 嵌入；圖片只接受站內 `/api/blog/images/` 路徑。

### 3.5 前台呈現

- `/blog`：伺服器元件從 MongoDB 讀已發布文章（依 `publishedAt` 新到舊），沿用現有 `BlogPosts` 的版面（分類 chip、最新一篇卡片、其餘清單），點擊改為前往 `/blog/[slug]`。
- `/blog/[slug]`：PageHero 風格的標題區（分類、日期、閱讀時間）、封面圖、內文（`.blog-prose` 樣式，與後台編輯器同一份樣式，所見即所得）、文末沿用既有的「選對象」與 LINE 兩個文字按鈕，再接 `JourneyNext` 與 `CtaBand`。
- `generateMetadata`：`title` 用 `metaTitle(文章標題)`、description 用摘要、OG 圖用封面。
- 未設定 `MONGODB_URI`（例如本機沒有資料庫或建置環境）時，前台不報錯，視為沒有文章。

---

## 4. 不在本次範圍內

- 多位管理者、角色權限、第三方登入（目前只有一組管理密碼）。
- 文章排程發布、版本紀錄、留言、全文搜尋、RSS。
- 圖片庫管理介面。編輯時移除的圖片會在**儲存後**刪除、刪除文章時清掉只屬於該文章的圖片；但上傳後從未儲存的圖片（例如放棄的新文章）會留在 GridFS。
- 把 `src/data.ts` 的 6 篇示範文章匯入資料庫（不是客戶提供的文字；資料保留不動）。
- 登入嘗試次數限制（列為上線前建議，見 PLN-007 §5）。

---

## 5. 實作檢查清單

- [ ] MongoDB 連線（開發模式重用連線）、索引建立
- [ ] 登入／登出、簽章 cookie、middleware 與每個 API 的二次檢查
- [ ] 文章 CRUD API、圖片上傳 API、圖片輸出 API
- [ ] 後台列表、新增、編輯頁與 Tiptap 編輯器（含圖片上傳、YouTube）
- [ ] 前台 `/blog` 讀資料庫、`/blog/[slug]` 文章頁、revalidate
- [ ] `.env.example` 更新、ARC-001 補上資料層說明
- [ ] `pnpm lint`、`pnpm build`、`pnpm content:check` 通過；以真實 MongoDB 實測 CRUD 與上傳

---

## 6. 異動檔案清單

見 [`PLN-007`](../04_execution-plans/PLN-007_blog-admin-cms-plan.md) §3。
