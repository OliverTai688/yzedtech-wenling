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
| PRD-002 | [首頁架構、品牌標示、合作夥伴與服務轉商品頁重構](../01_product-requirements/PRD-002_round4-homepage-brand-partner-product-restructure.md) | Ready for Implementation | v1.1：首頁移除 FAQ、新增合作夥伴區塊、服務／培訓拆為兩個總覽頁＋各自獨立詳細頁（含專屬見證、漸層圖片、直覺力併入療癒師認證）、品牌標示統一為「豐盛之翼學苑」、導覽微調 |
| PRD-003 | [第二次修改——學苑品牌主體、需求分流首頁與資訊架構重整](../01_product-requirements/PRD-003_second-revision-academy-ia-restructure.md) | Ready for Implementation | v1.1：品牌主體為「豐盛之翼學苑」、首頁改需求分流 10 段、導覽採方案 C（5 項＋LINE／商城按鈕）、CTA 分流規則、三層動效；分 A–E 五階段（文案對齊 → UIUX 研究 → 缺口建議書 → 實作 → 轉化驗證） |
| PRD-004 | [故事型互動網站（主題「改變地圖」）](../01_product-requirements/PRD-004_story-driven-interactive-site.md) | 草案，已依指示開工 | 首頁五章、敘事元件、深入 CTA（記住選擇、會變的固定列、LINE 帶話）、量測事件；硬性限制：文案只用 docx、路由不變 |

## 02_architecture-and-rules

| 文件號 | 標題 | 狀態 | 摘要 |
| --- | --- | --- | --- |
| ARC-001 | [架構總覽](../02_architecture-and-rules/ARC-001_architecture-overview.md) | Active | Next.js App Router 結構、資料流、技術慣例 |
| ARC-002 | [UI 與互動規範](../02_architecture-and-rules/ARC-002_ui-and-interaction-rules.md) | Active | 文案只用 docx、不擋路、文字密度、色彩字級、按鈕、動效參數、首頁章節、視覺素材、量測與檢查 |

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
| PLN-003 | [首頁架構、品牌標示、合作夥伴與服務轉商品頁重構 執行計畫](../04_execution-plans/PLN-003_round4-execution-plan.md) | ✅ 完成 | Batch A–G 全數完成；`/services`＋`/training` 兩個總覽頁與 17 個獨立詳細頁已上線，驗收見 ACC-002 |
| PLN-004 | [第二次修改執行計畫](../04_execution-plans/PLN-004_second-revision-execution-plan.md) | In Progress | 階段 A（文案對齊）批次 A0–A8 已完成，含執行紀錄與已知未完成事項；文案集 v2 行號對照；階段 B–E 大綱 |
| PLN-005 | [故事型互動網站多階段計畫](../04_execution-plans/PLN-005_story-driven-interactive-site-roadmap.md) | Draft | 階段 F0–F6：定調與基礎、量測基準、敘事骨架、深入 CTA、視覺素材、各頁故事化、比較與取捨；開工前的十項決定；前置 PRD-004 尚未撰寫 |
| PLN-006 | [其他分頁的提案與優化](../04_execution-plans/PLN-006_inner-pages-proposal-and-optimisation.md) | Done（待驗收） | 目標與完成定義；批次 P0–P6 的追蹤表；每頁一個 HTML 提案再實作，最後交付體驗評估 RPT-002 與驗收 ACC-006 |

## 05_audits-and-reports

| 文件號 | 標題 | 狀態 | 摘要 |
| --- | --- | --- | --- |
| AUD-001 | [官方文案 vs. 現行網站盤點](../05_audits-and-reports/AUD-001_official-copy-vs-current-site-audit.md) | Active | 逐頁盤點現行網站與文案集的落差、demo 資料殘留清單 |
| AUD-002 | [第二次修改需求書＋新版文案集 vs. 現行網站落差稽核](../05_audits-and-reports/AUD-002_second-revision-requirements-and-copy-v2-audit.md) | Active | 需求書（2026-09-19）與文案集 v2（2026-10-04）對現行網站的逐頁落差、v1→v2 文案變動、需求書與文案集衝突、查無出處內容、圖文素材缺口初盤 |
| RPT-001 | [圖文與動效缺口建議書](../05_audits-and-reports/RPT-001_content-asset-and-motion-gap-proposal.md) | Active | 圖像 11 項、文案與確認 19 項、動效 5 項、設定 3 項的缺口與優先級；動效三層系統與逐區塊規格；不等素材可先做的工作；客戶回覆表 |
| RPT-002 | [整體網站體驗評估：框架、評分、缺口與下一步](../05_audits-and-reports/RPT-002_site-experience-evaluation-and-next-steps.md) | Active | 八個面向的評估框架與評分（任務旅程、可用性、可信度、閱讀負擔、無障礙、效能、量測、搜尋分享）；缺口 K1–K15；下一步四個階段 E1–E4 |

## 06_research-and-design

| 文件號 | 標題 | 狀態 | 摘要 |
| --- | --- | --- | --- |
| RES-001 | [第二次修改 UIUX 研究：導覽、轉化路徑、線框與設計 token](../06_research-and-design/RES-001_second-revision-uiux-research.md) | Active | 現況量測（首頁長度、各頁轉化出口、對比度、視覺語言分裂）、4 條轉化路徑與設計規則、3 個導覽方案、各頁線框、語意 token 與粉色替換對照、元件對照、6 項決策（已確認） |
| RES-002 | [各分頁三提案與 AI 定案紀錄](../06_research-and-design/RES-002_page-proposals-and-selection.md) | Active | 階段 D 每個分頁的三個 HTML 提案、評分、定案與整合說明；提案檔在 `proposals/`，共用規範見 `proposals/BRIEF.md` |
| RES-003 | [3D 動畫素材與轉化數據研究](../06_research-and-design/RES-003_3d-motion-assets-and-conversion-evidence.md) | Active | 各做法對轉化的證據強度（速度、固定 CTA、動畫、3D）、8 種 3D／動畫素材方案的授權與取捨、落到設計的 7 項決定、來源清單 |
| RES-004 | [故事型互動網站研究：主題、深入 CTA、漸進元件與視覺素材](../06_research-and-design/RES-004_story-driven-interaction-and-cta-depth-research.md) | Draft | 三個主題候選（建議「改變地圖」）、敘事捲動的易用性證據與規則、六階承諾階梯、量測工具比較、法規邊界、素材缺口 G12–G22 與文案缺口 T10–T14、元件清單、十個研究方向與來源 |
| RES-005 | [互動敘事網站的設計原則與首頁分鏡（第二版）](../06_research-and-design/RES-005_interactive-storytelling-principles-and-home-storyboard.md) | Active | 動畫分鏡與捲動敘事的原則（含來源）、十二條設計規則、首頁七張 slide 的拍點、文字與主角的預算、Next.js 實作規格 |

## 07_acceptance-and-qa

| 文件號 | 標題 | 狀態 | 摘要 |
| --- | --- | --- | --- |
| ACC-001 | [官方文案上線驗收](../07_acceptance-and-qa/ACC-001_official-copy-rollout-acceptance.md) | Active | Phase 0–6 出處對照表彙整、三層次驗收結果、已知未完成事項 |
| ACC-002 | [首頁架構、品牌標示、合作夥伴與服務轉商品頁重構 驗收](../07_acceptance-and-qa/ACC-002_round4-services-training-restructure-acceptance.md) | Active | Batch A–G 驗收；獨立覆核發現並修正 3 項問題、瀏覽器視覺驗收確認新導覽項目無折行 |
| ACC-003 | [第二次修改階段 D：分頁提案、實作與轉化路徑驗收報告](../07_acceptance-and-qa/ACC-003_second-revision-phase-d-acceptance.md) | Active（待人工驗收） | 13 個分頁的三提案與定案、四條轉化路徑 21 項實測、連結／速度／文字密度量測、已知未完成事項與人工驗收清單 |
| ACC-004 | [故事型互動首頁與「文案只用 docx」驗收報告](../07_acceptance-and-qa/ACC-004_story-interactive-and-docx-copy-acceptance.md) | Active（待人工驗收） | 首頁五章與深入 CTA 的實測；全站 1,658 個字串逐句比對 docx 的結果；為符合 docx 而換字與拿掉的清單；需客戶提供的文字 T10–T18 |
| ACC-005 | [故事舞台首頁驗收報告](../07_acceptance-and-qa/ACC-005_staged-homepage-acceptance.md) | Active（待人工驗收） | 首頁七張 slide 的實作現況、24 項互動檢查、文字與主角比例、速度、已知不足與實機驗收清單 |
| ACC-006 | [其他分頁（第二輪）驗收報告](../07_acceptance-and-qa/ACC-006_inner-pages-acceptance.md) | Active（待人工驗收） | 12 種分頁的實測結果、逐頁驗收清單、實機清單、10 項待使用者決定的事、已知不足 |

---

> 維護提醒：建立新文件、變更狀態、或標註 `Superseded by` 時，請同步更新本索引，讓文件庫維持可追溯。
