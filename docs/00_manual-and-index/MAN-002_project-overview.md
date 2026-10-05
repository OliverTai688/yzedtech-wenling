# MAN-002 專案／品牌總覽

## 品牌

**豐盛之翼學苑**（創辦人：文齡老師 Keila）：提供能量療癒服務，以及希塔療癒（ThetaHealing）與靈氣（金錢／愛情／人魚靈氣）認證培訓。官網依 PRD-003 以學苑為品牌主體，首頁依訪客需求分流，再導向服務、認證班、官方 LINE 或商城。

## 網站範圍（App Router 路由）

| 路由 | 說明 |
| --- | --- |
| `/` | 首頁：Hero、需求入口、服務、培訓、見證、媒體精選（區塊重排見 PRD-003 §4.4） |
| `/about` | 關於我們：品牌理念、方法體系、合作夥伴 |
| `/story` | 創辦人介紹 |
| `/services`、`/services/[id]` | 全部服務與各服務詳細頁 |
| `/training`、`/training/[id]` | 認證班與各課程詳細頁 |
| `/testimonials` | 客戶見證 |
| `/media` | 媒體專訪 |
| `/blog` | 部落格 |
| `/resources` | 免費資源 |
| `/contact` | 聯絡我們（導流卡片，無表單） |
| `/legal` | 免責聲明、隱私權政策、服務條款 |
| `/faq` | 常見問題（已退出導覽，待 PRD-003 階段 D 轉址） |

## 技術棧摘要

- Next.js 15（App Router）＋ React 19 ＋ TypeScript
- Tailwind CSS 4
- `motion`（動畫）、`lucide-react`（圖示）
- `@google/genai`（Gemini，已安裝但尚未串接任何功能）
- 內容資料集中於 `src/data.ts`，型別定義於 `src/types.ts`，**無資料庫、無後端 API layer**

完整架構細節見 [ARC-001_architecture-overview.md](../02_architecture-and-rules/ARC-001_architecture-overview.md)。
開發指令與 Agent 工作流程見根目錄 [AGENTS.md](../../AGENTS.md)。

## 內容資料模型（`src/types.ts`）

| 型別 | 用途 |
| --- | --- |
| `Service` | 服務項目（能量療癒／培訓等） |
| `ReikiCourse` | 靈氣／希塔課程（等級、形式、大綱） |
| `Testimonial` | 學員／個案見證（依 persona：媽媽／單身者／企業主） |
| `BlogPost` | 部落格文章（分類：愛情／財運／豐盛靈氣／事業／心路歷程／個案成長） |
| `FAQItem` | 常見問題（依 persona） |
| `ResourceItem` | 免費資源（pdf／audio／video／article） |

新增或調整上述任一內容型態時，優先修改 `src/data.ts` 與 `src/types.ts`，避免在元件內寫死文案。
