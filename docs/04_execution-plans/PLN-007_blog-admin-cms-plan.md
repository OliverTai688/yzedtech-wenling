# PLN-007：部落格後台實作計畫

**狀態：** Done（待人工驗收，見 ACC-007）
**日期：** 2026-10-17
**前置 PRD：** [`PRD-005`](../01_product-requirements/PRD-005_blog-admin-cms-mongodb.md)
**相關文件：** [`ARC-001`](../02_architecture-and-rules/ARC-001_architecture-overview.md)、[`ARC-002`](../02_architecture-and-rules/ARC-002_ui-and-interaction-rules.md)

---

## 1. 開發目標

第一版做到：管理者登入後台 → 用圖文編輯器寫文章（上傳圖片、嵌入 YouTube）→ 存草稿或發布 → 前台 `/blog` 與 `/blog/[slug]` 立即更新；文章與圖片都在 MongoDB。

### 技術選擇

| 項目 | 選擇 | 理由 |
| --- | --- | --- |
| 編輯器 | **Tiptap 3**（`@tiptap/react`、`starter-kit`、`extension-image`、`extension-youtube`、`extensions`） | 以 ProseMirror 為核心、無預設樣式，可完全套用學苑的 token；官方就有 Image 與 YouTube 擴充；輸出 JSON，伺服器可用同一組擴充轉成 HTML（`@tiptap/html`），不必信任瀏覽器送來的 HTML |
| 資料庫驅動 | 官方 **`mongodb`** 驅動（不用 Mongoose） | 只有兩個 collection，不需要 ODM；GridFS 內建 |
| 圖片儲存 | **GridFS**（bucket `blogImages`） | 使用者指定存在 MongoDB；GridFS 可串流輸出，不受 16 MB 文件上限 |
| 登入 | 單一管理密碼＋HMAC 簽章 cookie（Web Crypto） | 只有學苑一位管理者；不引入 NextAuth；Web Crypto 在 middleware（Edge）與 Node 都能用 |
| 前台快取 | 靜態快取＋`revalidatePath` | 讀者不必每次查資料庫；後台一儲存就更新 |

其他候選：Editor.js（區塊式、JSON，但 YouTube 需第三方套件、樣式較難統一）、Lexical（彈性高但 Image／YouTube 要自己寫節點）。

---

## 2. 批次

| 批次 | 內容 | 狀態 |
| --- | --- | --- |
| A | 相依套件、`lib/db/mongo.ts`（連線快取）、`lib/blog/*`（型別、存取、HTML 產生、驗證） | ✅ |
| B | 登入：`lib/admin/session.ts`、`middleware.ts`、`/api/admin/login`、`/api/admin/logout`、`/admin/login` | ✅ |
| C | API：`/api/admin/posts`（列表／新增）、`/api/admin/posts/[id]`（讀／改／刪）、`/api/admin/uploads`（上傳）、`/api/blog/images/[id]`（公開輸出） | ✅ |
| D | 後台畫面：`app/admin/**`、`src/components/admin/**`（版面、列表、表單、Tiptap 編輯器與工具列） | ✅ |
| E | 前台：`/blog` 改讀資料庫、`/blog/[slug]`、`.blog-prose` 樣式、`SiteChrome`（後台不顯示頁首頁尾） | ✅ |
| F | 檢查：lint、build、content:check；本機 MongoDB 實測 CRUD、上傳、發布後前台更新；ACC-007 | ✅ |

---

## 3. 檔案位置

```text
middleware.ts                              # 擋未登入的 /admin、/api/admin
lib/db/mongo.ts                            # MongoClient 快取、getDb()、GridFSBucket
lib/admin/session.ts                       # 簽章 cookie（Edge／Node 共用）
lib/admin/guard.ts                         # requireAdmin()、同源檢查（Node）
lib/blog/types.ts                          # BlogPostDoc、BlogPostSummary、輸入型別
lib/blog/extensions.ts                     # 編輯器與伺服器共用的 Tiptap 擴充設定
lib/blog/render.ts                         # JSON → HTML、讀取時間、圖片 id 擷取
lib/blog/validate.ts                       # 輸入驗證、slug 產生、網址白名單
lib/blog/repo.ts                           # CRUD、索引、已發布文章查詢、刪圖
app/api/admin/login/route.ts, logout/route.ts
app/api/admin/posts/route.ts, posts/[id]/route.ts
app/api/admin/uploads/route.ts
app/api/blog/images/[id]/route.ts
app/admin/layout.tsx, page.tsx, login/page.tsx
app/admin/blog/page.tsx, new/page.tsx, [id]/page.tsx
src/components/admin/                      # AdminShell、LoginForm、PostTable、PostForm、BlogEditor、EditorToolbar、uploadImage
app/blog/page.tsx, app/blog/[slug]/page.tsx
src/components/BlogSection.tsx, blog/BlogPosts.tsx, blog/BlogArticle.tsx
src/components/SiteChrome.tsx              # /admin 不顯示頁首、頁尾、浮動按鈕
app/globals.css                            # .blog-prose、後台少量樣式
.env.example
```

---

## 4. 環境變數

| 變數 | 必填 | 說明 |
| --- | --- | --- |
| `MONGODB_URI` | 是 | 例如 MongoDB Atlas 的連線字串 |
| `MONGODB_DB` | 否 | 資料庫名稱，預設 `wenling` |
| `ADMIN_PASSWORD` | 是 | 後台密碼 |
| `ADMIN_SESSION_SECRET` | 是 | cookie 簽章金鑰，至少 32 字元（`openssl rand -base64 48`） |

部署到 Vercel 時在 Project Settings → Environment Variables 設定；Atlas 的 Network Access 要允許 Vercel 連線（或 `0.0.0.0/0` 搭配強密碼）。

---

## 5. 風險

| 風險 | 處理 |
| --- | --- |
| 單一密碼被暴力猜測 | 要求長密碼；上線前建議加上登入次數限制（例如 Upstash Ratelimit）或改用 Vercel 的密碼保護／Clerk |
| Vercel 函式請求上限 4.5 MB | 瀏覽器端先縮圖轉 WebP；伺服器拒絕超過 4 MB |
| 建置時沒有資料庫 | 讀取失敗時回傳空陣列並記錄錯誤，`/blog` 只顯示頁名 |
| 上傳後沒儲存的圖片留在 GridFS | 第一版接受；儲存時清掉從內文移除的圖片、刪除文章時清掉只屬於該文章的圖片 |
| 新增路由與 PRD-004「路由不變」衝突 | PRD-005 §3.1 明確列出例外 |
