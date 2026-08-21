#!/usr/bin/env bash
# content-check.sh — PLN-002 §4.2／§6 防呆掃描腳本
#
# 用途：攔截「忘記改」的常見殘留問題，每個 Phase 結束前、以及正式部署前都應執行一次。
# 這個腳本只做字串層級的防呆檢查，不能取代第 4.1 節的「內容溯源比對」與
# 第 4.5 節的獨立覆核，僅是三層驗收法中的第二層（自動化防呆）。
#
# 用法：
#   bash scripts/content-check.sh
#   pnpm run content:check   （已於 package.json 註冊同名 script）
#
# exit code：0 = 全數通過；非 0 = 有殘留問題，請往上捲動查看是哪一條規則失敗。

set -uo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

FAIL=0

check() {
  local label="$1"
  local pattern="$2"
  shift 2
  local paths=("$@")

  # 排除「說明某項目已移除／下架」的歷史紀錄型註解（例如解釋 PRD 決策的 code comment），
  # 只攔截真正還留在網站上的殘留敘述。
  local matches
  matches=$(grep -rnE "$pattern" "${paths[@]}" 2>/dev/null | grep -vE "已移除|已下架|已刪除|取代原")

  if [ -n "$matches" ]; then
    echo "❌ 未通過：$label"
    echo "$matches" | sed 's/^/   /'
    echo
    FAIL=1
  else
    echo "✅ 通過：$label"
  fi
}

echo "=== content-check.sh：全站防呆掃描 ==="
echo

# 1. Demo 佔位連結／假 email 殘留（PLN-002 §4.2）
check "無 example.com／@example 佔位連結" \
  "example\.com|@example" \
  src app

# 2. 已下架課程產品的識別字殘留（PLN-002 §4.2、§5.6）
#    注意：程式註解中對「已移除」這件事本身的說明文字不受此規則限制，
#    這裡只抓真正的舊 identifier／變數名稱，不會誤抓「已移除」類型的中文敘述。
check "無已下架課程之舊 identifier（seven-weeks-love／loveCourseWeeks／reikiTrainingCourses／theta-reiki-training）" \
  "seven-weeks-love|loveCourseWeeks|reikiTrainingCourses|theta-reiki-training" \
  src app

# 3. 「七週遇見對的人」課程銷售式引用殘留（保留書籍/推薦序真實內容，只抓課程化措辭）
check "無《七週遇見對的人》殘留課程化措辭（例如「系列課程」「這套陪伴課程」）" \
  "七週遇見對的人.{0,6}(系列課程|陪伴課程|這套課程)" \
  src app

# 4. 失真的創辦人背景敘述（PRD-001／文案集 Story 區：真實背景為外商數位行銷／專案管理，
#    非科技業工程師；此規則只抓與 Keila 自身背景相關的敘述，不影響其他真實客戶職稱）
check "無「科技業工程師／高科技」等失真創辦人背景敘述" \
  "文齡老師(以前|之前)?(是|曾是)?(一名)?科技業工程師|從科技業工程師|高科技資深工程師" \
  src app

# 5. 查無出處的第三方服務／金流具名聲明（2026-08-18 瀏覽器視覺 QA 發現：Legal 頁曾寫
#    Google Analytics 4／Shopify／蝦皮金流等文案集完全未提及的具名廠商，屬杜撰細節）
check "無查無出處的具名第三方服務聲明（GA4／Shopify／蝦皮金流）" \
  "Google Analytics 4|Shopify|蝦皮金流|藍新金流" \
  src app

# 6. 臼井靈氣不得誇大為導師/大師級（文案集僅記載三階療癒師，非導師/大師級認證）
check "無「臼井靈氣」導師／大師級誇大用語" \
  "臼井靈氣.{0,4}(導師|大師)" \
  src app

echo
if [ "$FAIL" -eq 0 ]; then
  echo "🎉 全部規則通過。記得這只是第二層（自動化防呆），仍需完成第 4.1 節內容溯源比對與第 4.5 節獨立覆核。"
  exit 0
else
  echo "⚠️ 有規則未通過，請修正後重新執行。"
  exit 1
fi
