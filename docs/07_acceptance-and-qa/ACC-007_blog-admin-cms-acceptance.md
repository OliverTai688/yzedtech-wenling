# ACC-007：部落格後台驗收

**狀態：** Active（待人工驗收）
**日期：** 2026-10-17
**對應：** [`PRD-005`](../01_product-requirements/PRD-005_blog-admin-cms-mongodb.md)、[`PLN-007`](../04_execution-plans/PLN-007_blog-admin-cms-plan.md)

---

## 1. 自動檢查

| 項目 | 結果 |
| --- | --- |
| `pnpm lint` | ✅ 無警告 |
| `pnpm build` | ✅ 通過（後台編輯頁 First Load 250 kB，只影響 `/admin`；`/blog` 131 kB） |
| `pnpm content:check` | ✅ 全部規則通過 |

## 2. 實測（本機 MongoDB 7，2026-10-17）

測試環境：`mongodb-memory-server` 起的本機 MongoDB（port 27018）＋ `next dev`。

### 2.1 登入與權限

- [x] 未登入開 `/admin/blog` → 307 轉到 `/admin/login`
- [x] 未登入呼叫 `/api/admin/posts` → 401
- [x] 密碼錯誤 → 401「密碼錯誤」（約 0.8 秒延遲）
- [x] 密碼正確 → 200，設定 httpOnly cookie，畫面進入文章列表
- [x] 帶登入 cookie、但 `Origin` 是其他網站的寫入請求 → 403
- [x] 後台頁面不顯示網站頁首、頁尾、浮動按鈕；後台 metadata 設為 `robots: noindex, nofollow`

### 2.2 文章 CRUD

- [x] 新增（發布）：回傳 slug（中文標題 → `測試文章豐盛的第一步`）、`publishedAt`、閱讀時間
- [x] 同標題再新增 → slug 自動變成 `…-2`
- [x] 空白標題 → 400「請填寫標題」
- [x] 修改標題、移除內文圖片與封面 → 前台立即顯示新標題（revalidate 生效）
- [x] 列表快速「取消發布」→ 前台該文章 404
- [x] 刪除 → 列表移除；只屬於該文章的圖片一併刪除（圖片網址 404），仍被其他文章使用的圖片保留（200）

### 2.3 內容清理（伺服器端）

送出含惡意內容的 JSON，產生的 HTML 確認：

- [x] `javascript:` 連結被移除，文字保留
- [x] 外站圖片（非 `/api/blog/images/`）被移除
- [x] 非 YouTube 的影片網址被移除；YouTube 轉成 `youtube-nocookie.com/embed/…`
- [x] 未知節點（`script`）被移除
- [x] 文字中的 `<b>` 被跳脫成 `&lt;b&gt;`

### 2.4 圖片

- [x] 上傳 PNG → 存進 GridFS，`/api/blog/images/<id>` 回傳 `image/png`、`Cache-Control: public, max-age=31536000, immutable`、`nosniff`
- [x] 副檔名 .png 但內容是 SVG 文字 → 415（以檔頭判斷，不信任副檔名）
- [x] 編輯器內貼上 3000×1500、3.6 MB 的 PNG → 瀏覽器端縮成 2000px 寬的 WebP（7.5 KB）後上傳並插入游標位置

### 2.4.1 伺服器端壓縮 ≤ 1 MB（PRD-005 v1.1）

直接呼叫上傳 API（不經瀏覽器縮圖），從 `/api/blog/images/<id>` 取回存進 MongoDB 的檔案檢查：

| 測試檔 | 原檔 | 結果 | 存進資料庫 |
| --- | --- | --- | --- |
| 隨機雜訊 PNG（最難壓） | 3.9 MB，1200×1100 | 201，0.7 秒 | WebP 915 KB，1200×1100 |
| 4000×3000 JPEG，EXIF 方向 6＋GPS | 3.4 MB | 201，2.3 秒 | WebP 871 KB，1125×1500（已轉正為直式），EXIF 全部移除 |
| 動態 GIF 3 格 | 1 KB | 201 | 動態 WebP，3 格保留 |
| 16000×16000 PNG（解壓縮炸彈） | 730 KB | 422 | 未儲存 |
| 檔頭是 PNG、內容損毀 | 2 KB | 422 | 未儲存 |
| 編輯器貼上 2400×1600 雜訊圖 | 13.2 MB | 瀏覽器轉 WebP → 伺服器再壓 | WebP 997 KB，2000×1333 |

- [x] 每張存進資料庫的圖都是 WebP 且 ≤ 1 MB（1,048,576 bytes）
- [x] 照片的 EXIF（含 GPS）被移除，方向正確

### 2.5 畫面

- [x] 後台列表：狀態篩選（全部／已發布／草稿）＋數量、搜尋、編輯／發布切換／查看前台／刪除
- [x] 編輯頁：工具列（復原、重做、H2、H3、粗體、斜體、底線、刪除線、連結、項目清單、編號清單、引言、分隔線、上傳圖片、YouTube），選取圖片時出現「替代文字」；右側發布、草稿、封面、摘要、分類（提示既有分類）、標籤、網址代稱、發布日期
- [x] 「有未儲存的變更」提示；儲存後顯示「已儲存並發布」
- [x] 前台 `/blog`：最新一篇卡片（分類、日期、閱讀時間、摘要、閱讀全文）
- [x] 前台 `/blog/[slug]`：中文網址可開、`<title>` 為「文章標題｜豐盛之翼學苑」、圖片與 YouTube 正常顯示、含 `BlogPosting` 結構化資料
- [x] 手機寬度（375px）後台編輯頁無水平捲動，工具列自動換行
- [x] 瀏覽器主控台無錯誤

## 3. 人工驗收清單（上線前）

- [x] 在 MongoDB Atlas 建立資料庫與使用者，Network Access 允許 Vercel 連線（2026-10-17，見 PLN-007 §6）
- [x] Vercel 設定 `MONGODB_URI`、`MONGODB_DB`、`ADMIN_PASSWORD`、`ADMIN_SESSION_SECRET`（2026-10-17，以 `scripts/setup-vercel-env.sh` 寫入 Production 與 Preview）
- [ ] 正式網址登入後台、寫一篇含圖片與 YouTube 的草稿 → 預覽版面 → 發布 → 前台確認
- [ ] 手機（iOS Safari、Android Chrome）上傳手機相簿照片（HEIC 會被拒絕，需先轉 JPEG；見 §4）
- [ ] 和客戶確認前台介面字「全部」「閱讀全文」（不是文案集原文，PRD-005 §3.2）
- [ ] 決定是否加上登入次數限制（PLN-007 §5）

## 4. 已知限制

1. 只有一組管理密碼，沒有多帳號、沒有登入次數限制。
2. 上傳後從未儲存的圖片會留在 GridFS（沒有自動清理）。
3. iPhone 的 HEIC 照片不在接受格式內；多數情況下 iOS 選照片時會自動轉成 JPEG，但從「檔案」App 選 HEIC 檔會被拒絕。
4. 文章頁沒有 Open Graph 圖片（網站尚未設定 `metadataBase`，相對網址無法當社群預覽圖）。
5. 草稿用到的圖片網址是公開的（知道 id 才能開）。
6. `src/data.ts` 的 6 篇示範文章沒有匯入資料庫（不是客戶提供的文字）。
