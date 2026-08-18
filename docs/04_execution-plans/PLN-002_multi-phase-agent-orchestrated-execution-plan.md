# PLN-002：多階段開發、Agent 協作與驗收執行計畫

**狀態：** Draft
**日期：** 2026-08-18
**前置文件：** [`AUD-001`](../05_audits-and-reports/AUD-001_official-copy-vs-current-site-audit.md)、[`PRD-001`](../01_product-requirements/PRD-001_official-copy-content-module-and-demo-data-removal.md)、[`PLN-001`](./PLN-001_official-copy-rollout-execution-plan.md)
**用途：** `PLN-001` 定義「內容做什麼、放進哪個批次」；本文件定義「怎麼分階段推進、Agent／Sub-agent 怎麼分工、怎麼驗收才不會漏東西、開發時要守住哪些邊界」。

---

## 1. 為什麼需要這份文件

`PLN-001` 的批次（A–L）加起來牽動全站幾乎每一個頁面，文案集本身超過 2500 行。如果一次性用一個很長的 session／一個很大的 commit 硬做完，會有三個具體風險：

1. **Context 過長導致「拼接錯頁」**：AI agent 在同一個對話裡處理太多不同服務的文案，容易把 A 服務的方案價格複製貼到 B 服務、或漏改某個 CTA 連結。
2. **沒有獨立驗收，錯誤不會被攔下來**：如果寫內容的人／agent 同時也是驗收的人，容易對自己寫的東西「盲點式放行」。
3. **一次性巨大 commit 難以回退**：文案集比對出錯時，難以精準只回退某一頁，而不影響其他已經驗收過的頁面。

因此本計畫把 `PLN-001` 的批次重新編排成 **7 個開發階段（Phase 0–6）**，每個階段有明確的「輸入（文案集出處）→ 輸出（程式異動）→ 驗收關卡」，並且**指定寫作與驗收使用不同的 agent 角色**。

---

## 2. 開發階段總覽

| Phase | 對應 PLN-001 批次 | 內容 | 建議 Agent 角色 | 驗收關卡 |
| --- | --- | --- | --- | --- |
| Phase 0：地基與清場 | Batch A、Batch K | 型別擴充、`src/content/` 骨架、**移除**七週課程／臼井靈氣課程 | `route-refactor` | `pnpm build` 通過；舊 id grep 為 0 |
| Phase 1：全站共用資訊 | Batch B | LINE／IG／社群連結置換 | `content-writer` | `content:check`（若已建）或手動 grep |
| Phase 2：Services 內容（分 3 批） | Batch D → E → F | energy-healing／theta-training／certifications | `content-writer`（每個分類各開一輪） | `copy-qa-reviewer` 逐頁比對文案集出處 |
| Phase 3：Home 8 Blocks | Batch C | Hero／Persona／Services Grid／Training／Intuition／Testimonials／Media／FAQ | `content-writer` | `copy-qa-reviewer` + 目視畫面檢查 |
| Phase 4：About／Story | Batch G | 品牌理念、14 項技術表格、我的故事、學經歷 | `content-writer` + `route-refactor`（拆頁） | `copy-qa-reviewer` |
| Phase 5：Testimonials／Media／Resources／Legal | Batch H | 見證、媒體完整清單、資源、正式法律條文 | `content-writer` | `copy-qa-reviewer`（Legal 逐字比對務必更嚴格） |
| Phase 6：路由收尾與最終 QA | Batch I、Batch L | `/media`、Story 路由、tab id 收尾、`content:check` 腳本、全站掃描、`ACC-001` | `route-refactor` + `copy-qa-reviewer` | 見第 5 節「三層次驗收法」全部通過 |

> 每個 Phase 建議對應**一個獨立的 git 分支／PR**，完成並通過驗收後才合併，不要把 7 個 Phase 疊在同一個分支上一次送審。

---

## 3. Agent／Sub-agent 協作設定建議（回答問題 1）

### 3.1 分工原則：寫作與驗收要用不同的 agent

不要讓同一個 agent session 既寫文案又自己驗收。原因跟人類工作一樣：寫的人容易對自己的假設視而不見。建議至少分成兩種角色：

- **`content-writer`**：負責把文案集的指定段落轉成 `src/content/**` 的結構化資料、調整對應元件。**只讀文案集與現有程式碼，只寫 `src/`／`app/` 內的內容與元件**，不做「順手」的架構大改。
- **`copy-qa-reviewer`**：**唯讀**（不給 Write/Edit 權限），任務是拿文案集原文和 `content-writer` 的產出逐段比對，找出「查無出處的內容」「漏改的 demo 連結」「`coming-soon` 卻寫了完整方案」等問題，用類似 code review 的方式回報，而不是自己動手改。

第三種角色用於結構性改動：

- **`route-refactor`**：處理型別擴充、目錄搬遷、路由新增／刪除、分類 tab 重整、舊功能移除（Phase 0、Phase 6）。這類改動影響面廣，需要比較大的工具權限（含刪除檔案），但**不負責生成行銷文案**，避免把「這段文字怎麼寫」跟「這個檔案怎麼搬」兩種決策混在一起。

本次已在專案內建立三份對應的 Claude Code 專案級 subagent 定義（`.claude/agents/*.md`），可直接於此專案的 Claude Code / Cowork session 中以 `content-writer`、`copy-qa-reviewer`、`route-refactor` 呼叫：

- [`.claude/agents/content-writer.md`](../../.claude/agents/content-writer.md)
- [`.claude/agents/copy-qa-reviewer.md`](../../.claude/agents/copy-qa-reviewer.md)
- [`.claude/agents/route-refactor.md`](../../.claude/agents/route-refactor.md)

### 3.2 什麼時候該用獨立 worktree／分支跑 sub-agent

- **Phase 2（Services 內容）與 Phase 5（Legal）建議用獨立 git worktree／分支**：這兩個 Phase 改動的檔案多、文字量大，若中途需要中斷或重跑，獨立 worktree 可以避免弄髒主要工作目錄，也方便產出完整 diff 給 `copy-qa-reviewer` 或人類覆核。
- **Phase 1、Phase 0 這類改動範圍小、檔案少的批次**，可以直接在主分支的一般 session 完成，不必開額外 worktree，避免流程過重。
- 不管有沒有用獨立 worktree，**每個 Phase 結束都要能產出一份乾淨的 git diff**，方便 `copy-qa-reviewer` 或使用者對照文案集逐段複核。

### 3.3 每個 Phase 一個 session／一個焦點

給 `content-writer` 的提示（prompt）**只放這個 Phase 需要的文案集行號區間**，不要把整份 2500 行文案集一次丟給 agent 處理全部服務——這正是「拼接錯頁」風險最高的做法。`PLN-001` 每個 Batch 已經標好文案集行號（例如 Batch D 為第 546～1418 行），呼叫 agent 時直接引用這個範圍。

### 3.4 Git／PR 策略

- 一個 Phase = 一個 feature branch（例如 `content/phase-2-energy-healing`）。
- PR 描述需附上：這個 Phase 對應文案集的哪些行號、`copy-qa-reviewer` 的比對結果、`pnpm lint`／`pnpm build` 的執行結果。
- 正式合併到預設分支前，至少完成一次 `copy-qa-reviewer` 覆核；Legal（Phase 5）與涉及金額/退費政策的服務頁（Phase 2），建議額外請使用者本人再看過一次。

---

## 4. 如何完美開發驗收（回答問題 2）：三層次驗收法

單靠「看起來對了」不夠，建議每個 Phase 都跑過以下三層驗收，缺一層都可能放過問題：

### 4.1 第一層：內容溯源比對（最重要，也最容易被跳過）

對每個 Phase 產出的頁面／資料，做一張「文案集出處對照表」，例如：

| 網站呈現位置 | 文案集行號／段落 | 是否逐字/逐段相符 | 備註 |
| --- | --- | --- | --- |
| `/services` energy-healing → 個人療癒(一對一) 方案 B | 第 605～606 行 | ✅ | — |
| Home Hero 標題 | 第 111 行 | ✅ | — |

這張表由 `copy-qa-reviewer` 產出（或由 `content-writer` 產出、`copy-qa-reviewer` 覆核），**沒有出處的內容一律視為缺陷**，除非是明確標示 `coming-soon` 的待補項目。

### 4.2 第二層：防呆掃描（自動化，攔截「忘記改」）

- `grep -rn "example.com\|@example\|hello@example" src app` 結果為 0。
- `grep -rn "seven-weeks-love\|loveCourseWeeks\|reikiTrainingCourses\|theta-reiki-training" src app` 結果為 0（Phase 0 完成後即應為 0，之後每個 Phase 都重跑一次防止復發）。
- `PRD-001` §6 的 `content:check` 腳本（建議在 Phase 6 前就先做出最小可用版本，讓後續 Phase 都能用）。

### 4.3 第三層：技術驗證

- `pnpm run lint`、`pnpm run build` 每個 Phase 結束都要跑過。
- TypeScript 型別檢查（`ServiceContent` 等新型別是否所有必填欄位都補齊，`coming-soon` 與 `plans`/`processSteps` 不可同時存在，呼應 `PRD-001` §6 規則 3）。

### 4.4 第四層（視覺驗收，Home／About／Services 等視覺改動較大的頁面）

- 對照 `docs/03_feature-reference/design-spec.md` 的色票、字體、版面結構，用瀏覽器截圖比對（可用 Claude in Chrome 或本機截圖）。
- 特別注意：文案集內容通常比目前 demo 文案更長（例如每個服務有多方案價格表、完整 FAQ），需確認版面能撐住更長的文字而不跑版。

### 4.5 獨立覆核（雙代理／雙人）

- `copy-qa-reviewer` 的覆核**不能只看 `content-writer` 交出的 diff**，必須自己重新打開文案集原文對照，才能發現「看起來合理但其實抄錯」的問題。
- 高風險內容（Legal 條文、金額數字、退費政策、免責聲明）建議額外由使用者本人做最終覆核，AI 覆核不能取代。

### 4.6 ACC 文件產出時機

- 每個 Phase 完成後，不必每次都開一份正式 `ACC-NNN`，但**至少要留下第 4.1 節的出處對照表**（可以先放在 PR 描述或暫存筆記）。
- 全部 Phase 完成、Batch L（防呆機制與 QA）跑過後，才正式建立 `docs/07_acceptance-and-qa/ACC-001_official-copy-rollout-acceptance.md`（複製 `docs/templates/ACC-TEMPLATE.md`），把各 Phase 的出處對照表彙整進去，作為最終上線前的驗收文件。

---

## 5. 開發邊界與注意事項（回答問題 3）

### 5.1 內容邊界

- **唯一內容來源是文案集**（`docs/網站文案集.md`）。找不到出處的內容一律不得杜撰，改用 `coming-soon` 狀態呈現。
- **移除範圍要精準**：拿掉的是《七週遇見對的人》**課程產品**與臼井靈氣**課程頁**；書籍本身的真實行銷內容（推薦序作者身份）與臼井靈氣作為「方法體系」技術介紹（非課程頁），都要保留，不要連坐刪除。
- 文案集內有些段落是 AI 撰寫過程留下的「過場語句」（例如「這就為你將『五行香水供奉』的服務內容…」），這類句子不是正式文案，不能被複製進網站。

### 5.2 技術邊界

- 不改動金流／預約系統邏輯（服務 CTA 一律連到既有 `booking.wenling.tw` 外部連結，本次工作只換連結文字，不重做表單或金流串接）。
- 不在沒有明確需求的情況下更動 `design-spec.md` 定義的視覺規範（色票、字體、版面結構）；若文案量超出現有版面負荷，優先調整版面容器（如改為可展開區塊），而不是隨意改變品牌視覺風格。
- 不引入非必要的新相依套件；型別／內容模組改動盡量用專案既有的 TypeScript／React 慣例（Atomic Design、`'use client'` 標記等，見 `AGENTS.md`）。
- `route-refactor` 類型的 agent 才可以刪除檔案／搬移目錄，`content-writer` 不應該做結構性搬遷。

### 5.3 資料與隱私邊界

- 文案集內的見證多為化名或第一人稱敘述，置換前需再次確認**沒有真實客戶全名、電話、Email 等個資**被直接寫進公開網站；如發現文案集本身含有疑似真實個資，先跟使用者確認是否已取得當事人同意公開，而不是逕自上架。
- 不把 `docs/網站文案集.md`（含商業機密的定價、退費政策、認證來源）以外的內部資訊外流到程式碼註解或 commit message 之外的地方（例如不要貼進第三方服務、不要放進公開 issue）。

### 5.4 外部連結邊界

- 所有新增／修改的連結，必須是文案集裡實際出現過的網域（`booking.wenling.tw`、`lin.ee`、`line.me/R/ti/p/@healer.wenling`、`reurl.cc`、`instagram.com/@keila.healing1491` 等），不可自己編造或猜測網址。
- Pricing 外部商城的統一入口網址目前**沒有來源**（見 `PRD-001` §9），在使用者提供之前，不要自己指定一個網址頂替。

### 5.5 Git／部署邊界

- 每個 Phase 各自開分支／PR，不要一次性巨大 commit；正式部署到 production 前，需使用者最終確認（尤其 Legal 條文與服務定價異動）。
- Services 分類 tab id 調整（`energy-healing` / `theta-training` / `certifications`）可能讓外部已發出的行銷連結（LINE、Email）失效，若客戶那邊已經有發出去的舊連結，部署前需與客戶確認是否要做轉址，不要默默讓連結變成 404。

### 5.6 移除功能的邊界（「乾淨移除」檢查清單）

刪除 `seven-weeks-love` 與 `reiki-training`（臼井靈氣）時，逐項確認：

- [ ] `src/data.ts` / `src/content/` 內對應資料（`loveCourseWeeks`、`reikiTrainingCourses`、`services`/`reikiCourses` 內相關項目）已刪除。
- [ ] `ServicesSection.tsx` 內對應 tab／渲染邏輯已刪除。
- [ ] `Personas.tsx` 的 `recommendedServices` 不再引用舊 id。
- [ ] `Footer.tsx`／`Header.tsx` 的導覽連結已移除或改向新分類。
- [ ] 全域 grep 對應關鍵字（`seven-weeks-love`、`loveCourseWeeks`、`reikiTrainingCourses`、`theta-reiki-training`）結果為 0。
- [ ] 手動點過一輪網站，確認沒有任何連結會導到已刪除的分類或 404 頁。

---

## 6. 快速檢查清單（每個 Phase 結束前過一遍）

- [ ] 這個 Phase 涉及的每段文字都能對照文案集出處，或明確標成 `coming-soon`。
- [ ] `example.com`／`@example` 與已移除功能（`seven-weeks-love`／`reikiTrainingCourses`）的 grep 皆為 0。
- [ ] `pnpm lint`、`pnpm build` 通過。
- [ ] `copy-qa-reviewer`（或使用者本人）已獨立覆核，不是只有 `content-writer` 自查。
- [ ] Legal／金額／退費政策等高風險內容，已有使用者本人的最終確認。
- [ ] PR 描述附上文案集行號依據，方便之後追溯。
