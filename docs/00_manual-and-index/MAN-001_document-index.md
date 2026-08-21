# MAN-001 文件索引

本文件列出 `docs/` 內所有正式文件。新增文件後請一併更新此索引（依資料夾分區、依文件號排序）。

狀態欄說明：`Active` 目前有效／`Draft` 草稿中／`Superseded` 已被取代（請在文件內標註取代者）。

## 00_manual-and-index

| 文件號 | 標題 | 狀態 | 摘要 |
| --- | --- | --- | --- |
| MAN-000 | [docs 使用說明書](./MAN-000_docs-usage-manual.md) | Active | docs 分類、文件號規則、新增文件流程 |
| MAN-001 | 文件索引（本檔） | Active | 全部正式文件的索引表 |
| MAN-002 | [專案／品牌總覽](./MAN-002_project-overview.md) | Active | wenling-web 專案與品牌背景、技術棧總覽 |

## 01_product-requirements

| 文件號 | 標題 | 狀態 | 摘要 |
| --- | --- | --- | --- |
| PRD-001 | [官方文案內容模組化與 Demo 資料移除](../01_product-requirements/PRD-001_official-copy-content-module-and-demo-data-removal.md) | Active | 全站文字內容一律溯源至 `docs/網站文案集.md`；移除《七週遇見對的人》課程產品與臼井靈氣獨立課程頁 |
| PRD-002 | [首頁架構、品牌標示、合作夥伴與服務轉商品頁重構](../01_product-requirements/PRD-002_round4-homepage-brand-partner-product-restructure.md) | Ready for Implementation | 首頁移除 FAQ、新增合作夥伴區塊、服務課程改獨立商品頁、品牌標示統一為「豐盛之翼學苑」、導覽微調 |

## 02_architecture-and-rules

| 文件號 | 標題 | 狀態 | 摘要 |
| --- | --- | --- | --- |
| ARC-001 | [架構總覽](../02_architecture-and-rules/ARC-001_architecture-overview.md) | Active | Next.js App Router 結構、資料流、技術慣例 |

## 03_feature-reference

| 文件號 | 標題 | 狀態 | 摘要 |
| --- | --- | --- | --- |
| _(既有文件，尚未套用編號)_ | [`design-spec.md`](../03_feature-reference/design-spec.md) — 首頁視覺規範 | Active | 字體、色票、版面結構、間距、元件規則等首頁視覺系統，供工程實作對照。建議之後依 MAN-000 規則重新命名為 `REF-001_home-visual-spec.md`。 |

各版面（Services／Blog／Resources／Testimonials／FAQ／Contact／Legal）若需要更詳細的功能說明，於此建立 `REF-NNN_<slug>.md`。

## 04_execution-plans

| 文件號 | 標題 | 狀態 | 摘要 |
| --- | --- | --- | --- |
| PLN-001 | [官方文案上線執行計畫](../04_execution-plans/PLN-001_official-copy-rollout-execution-plan.md) | Active | Batch A–L 內容批次定義與文案集行號對照 |
| PLN-002 | [多階段開發、Agent 協作與驗收執行計畫](../04_execution-plans/PLN-002_multi-phase-agent-orchestrated-execution-plan.md) | Active | Phase 0–6 開發階段、三層次驗收法、開發邊界 |
| PLN-003 | [首頁架構、品牌標示、合作夥伴與服務轉商品頁重構 執行計畫](../04_execution-plans/PLN-003_round4-execution-plan.md) | In Progress | Batch A–C 已完成（品牌標示／首頁 FAQ 移除／合作夥伴佔位）；Batch D–G（服務轉商品詳細頁）待排時間 |

## 05_audits-and-reports

| 文件號 | 標題 | 狀態 | 摘要 |
| --- | --- | --- | --- |
| AUD-001 | [官方文案 vs. 現行網站盤點](../05_audits-and-reports/AUD-001_official-copy-vs-current-site-audit.md) | Active | 逐頁盤點現行網站與文案集的落差、demo 資料殘留清單 |

## 06_research-and-design

_目前尚無文件。設計探索、方案比較可於此建立 `RES-NNN_<slug>.md`。_

## 07_acceptance-and-qa

| 文件號 | 標題 | 狀態 | 摘要 |
| --- | --- | --- | --- |
| ACC-001 | [官方文案上線驗收](../07_acceptance-and-qa/ACC-001_official-copy-rollout-acceptance.md) | Active | Phase 0–6 出處對照表彙整、三層次驗收結果、已知未完成事項 |

---

> 維護提醒：建立新文件、變更狀態、或標註 `Superseded by` 時，請同步更新本索引，讓文件庫維持可追溯。
