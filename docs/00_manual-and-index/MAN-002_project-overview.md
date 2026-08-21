# MAN-002 專案／品牌總覽

## 品牌

**幸運教主 文齡 Keila**：整合能量療癒服務、希塔（ThetaHealing）與靈氣（Reiki，含金錢／愛情／人魚靈氣）雙證照認證培訓，主要服務對象為媽媽、單身者、與高壓企業主，協助他們在關係、家庭、財富與人生方向中找回穩定與內在力量。暢銷書《七週遇見對的人》為文齡老師撰寫改版推薦序之真實著作，非本站銷售之課程產品（原課程產品已依 PRD-001 決策 #5 下架）。

## 網站範圍（App Router 路由）

| 路由 | 說明 |
| --- | --- |
| `/` | 首頁：Hero、直覺 Banner、服務精選、培訓精選、見證精選 |
| `/about` | 品牌故事 |
| `/services` | 服務／課程完整介紹 |
| `/blog` | 部落格文章列表 |
| `/resources` | 免費資源（pdf／audio／video／article） |
| `/testimonials` | 學員／個案見證 |
| `/faq` | 常見問題 |
| `/contact` | 聯絡表單 |
| `/legal` | 法律聲明／隱私權政策 |

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
