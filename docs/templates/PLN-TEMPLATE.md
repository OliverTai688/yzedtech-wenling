# PLN-NNN：&lt;標題&gt;實作計畫

**狀態：** Draft / In Progress / Done
**日期：** YYYY-MM-DD
**前置 PRD：** &lt;PRD-xxx，若有&gt;
**相關文件：** &lt;REF-xxx / RES-xxx / ARC-xxx&gt;

---

## 1. 開發目標

&lt;這次要落地什麼，範圍到哪裡（第一版做到什麼程度）。&gt;

---

## 2. 建議批次

### Batch A：&lt;例如：內容與型別&gt;

&lt;需要新增/調整的 `src/data.ts` 內容、`src/types.ts` 型別。&gt;

### Batch B：&lt;例如：元件與版面&gt;

&lt;需要新增/調整的 `src/components/*`、`app/<route>/*`。&gt;

### Batch C：&lt;例如：API / 外部服務（如需要）&gt;

&lt;若涉及 `app/api/*` route 或 Gemini 等外部服務，於此說明串接方式與金鑰管理。若無則刪除本節。&gt;

---

## 3. 建議檔案位置

```text
src/data.ts
src/types.ts
src/components/<Component>.tsx
app/<route>/page.tsx
app/<route>/<Route>ClientPage.tsx
```

---

## 4. 資料與外部服務注意事項

- 內容一律先進 `src/data.ts` / `src/types.ts`，不要寫死在元件內。
- 若涉及使用者輸入（例如聯絡表單）或呼叫外部 API（例如 Gemini），需在 server-side 處理，不可在 client component 暴露金鑰。
- &lt;其他資料邊界或風險，依實際功能補充。&gt;

---

## 5. 實作順序

1. &lt;例如：更新 `src/types.ts` 與 `src/data.ts`&gt;
2. &lt;例如：實作/調整元件&gt;
3. &lt;例如：串接頁面路由&gt;
4. 補齊文案（繁體中文）與圖片/資源
5. 跑 `pnpm run lint`、`pnpm run build`

---

## 6. 驗收對應

對應 `ACC-NNN`（實作完成後建立）：

- &lt;驗收項目分類一&gt;
- &lt;驗收項目分類二&gt;

---

## 7. 風險

- &lt;列出可能踩雷的地方，例如既有元件的相依、內容資料結構變動影響其他頁面等。&gt;
