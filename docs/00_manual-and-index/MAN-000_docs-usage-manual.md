# MAN-000 docs 使用說明書

本說明書定義 wenling-web 專案 `docs/` 的分類、文件號與命名規則。規則參考自 2026-nuvaclub 專案的 docs 治理模式，並依本專案規模精簡。

## 快速使用

- 要找需求，先看 `01_product-requirements`。
- 要找架構、技術慣例，先看 `02_architecture-and-rules`。
- 要找版面/功能說明，先看 `03_feature-reference`。
- 要找接下來怎麼做，先看 `04_execution-plans`。
- 要找已完成盤點、問題、報告或修復紀錄，先看 `05_audits-and-reports`。
- 要找研究或設計探索，先看 `06_research-and-design`。
- 要找驗收、QA 文件，先看 `07_acceptance-and-qa`。
- 要建立新文件，先看 `templates/`。

完整文件清單請看 [MAN-001_document-index.md](./MAN-001_document-index.md)。
專案與品牌總覽請看 [MAN-002_project-overview.md](./MAN-002_project-overview.md)。

## 目錄分類

| 資料夾 | 文件屬性 |
| --- | --- |
| `00_manual-and-index` | 使用說明與索引 |
| `01_product-requirements` | 產品需求文件 |
| `02_architecture-and-rules` | 架構、慣例與技術規則 |
| `03_feature-reference` | 版面／功能參考文件 |
| `04_execution-plans` | 實作、行動計畫 |
| `05_audits-and-reports` | 盤點、報告與問題紀錄 |
| `06_research-and-design` | 研究與設計探索 |
| `07_acceptance-and-qa` | 驗收與 QA 文件 |
| `templates` | 建立新文件用的模板（不編號，不計入文件索引） |

## 文件號規則

命名格式：

```text
<TYPE>-<NNN>_<kebab-case-title>.<ext>
```

範例：

- `PRD-001_contact-form-ai-assistant.md`：產品需求文件。
- `PLN-003_blog-category-filter-plan.md`：實作或行動計畫。
- `ACC-002_contact-form-acceptance.md`：驗收文件。
- `ARC-001_architecture-overview.md`：架構文件。

## 類型代碼

| 代碼 | 用途 |
| --- | --- |
| `MAN` | Manual / Guide 使用說明 |
| `PRD` | Product Requirements 產品需求 |
| `ARC` | Architecture 架構與技術規則 |
| `REF` | Reference 功能／版面參考 |
| `PLN` | Plan 實作／行動計畫 |
| `AUD` | Audit 盤點／稽核 |
| `RPT` | Report 分析／完成度報告 |
| `BUG` | Bug／問題紀錄 |
| `RES` | Research 研究／設計探索 |
| `ACC` | Acceptance / QA 驗收文件 |

若日後專案規模擴大（例如加入資料庫、認證、金流、多語系等），可參考 2026-nuvaclub 專案追加對應代碼（如 `DBS`、`AUT`、`ENV`、`BIZ`），原則不變：**先判斷文件屬性，再決定資料夾**。

## 新增文件流程

1. 先判斷文件屬性，不要先用功能模組決定資料夾。
2. 到對應資料夾找同類型代碼的最大文件號，接下一號。
3. 檔名使用小寫英文 kebab-case，文件標題可以保留中文或中英混合。
4. 從 `docs/templates/` 複製對應模板作為起點（目前提供 `PRD-TEMPLATE.md`、`PLN-TEMPLATE.md`、`ACC-TEMPLATE.md`）。
5. 建立文件後，更新 `MAN-001_document-index.md` 的索引表。

## 維護原則

- PRD、計畫、驗收不要混放；同一功能通常會依序產生三種文件，但應依文件屬性分區存放。
- 需求變更以新的 PRD 承接，不要直接把審計報告或計畫改成需求文件。
- 過期文件不要刪除；在文件開頭標註 `> Superseded by: <TYPE>-<NNN>`，並在索引中補充說明。
- 每個功能／任務理想上留下 PRD → PLN → ACC 的可追溯鏈；小型 bug fix 可只留 `BUG` 紀錄。
