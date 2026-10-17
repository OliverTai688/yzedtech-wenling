#!/usr/bin/env bash
# setup-vercel-env.sh — 設定部落格後台在 Vercel 的環境變數（PRD-005 / PLN-007 §4）
#
# 用法（在 repo 根目錄、已執行過 vercel link）：
#   bash scripts/setup-vercel-env.sh <Atlas 叢集主機，例如 wenling.abcde.mongodb.net>
#
# - Atlas 資料庫使用者的密碼由你在終端機貼上，不會顯示在畫面上，也不會寫進任何檔案。
# - 後台登入密碼（ADMIN_PASSWORD）與 cookie 簽章金鑰（ADMIN_SESSION_SECRET）由腳本隨機產生；
#   後台密碼只在最後顯示一次，請存進密碼管理器。
# - 全部以 Sensitive（Secret）型別寫入 Vercel 的 Production 與 Preview。
set -euo pipefail

HOST="${1:?用法：bash scripts/setup-vercel-env.sh <叢集主機，例如 wenling.abcde.mongodb.net>}"
DB_USER="${MONGO_USER:-wenling-web}"
DB_NAME="${MONGO_DB:-wenling}"
TARGETS="production,preview"

read -rsp "貼上 Atlas 資料庫使用者「${DB_USER}」的密碼（不會顯示），按 Enter：" DB_PASS
echo
[ -n "$DB_PASS" ] || { echo "沒有輸入密碼，已取消。"; exit 1; }

# 密碼可能含有 @ : / 等字元，放進連線字串前要先編碼（經 stdin 傳給 node，不出現在程序列表）
ENC_PASS=$(printf '%s' "$DB_PASS" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>process.stdout.write(encodeURIComponent(s)))')
URI="mongodb+srv://${DB_USER}:${ENC_PASS}@${HOST}/?retryWrites=true&w=majority&appName=wenling"
unset DB_PASS ENC_PASS

ADMIN_PASSWORD=$(openssl rand -base64 24 | tr -d '/+=' | cut -c1-24)
ADMIN_SESSION_SECRET=$(openssl rand -base64 48)

add() {
  printf '%s' "$2" | vercel env add "$1" "$TARGETS" --force --sensitive --yes >/dev/null
  echo "✓ $1 → ${TARGETS}"
}

add MONGODB_URI "$URI"
add MONGODB_DB "$DB_NAME"
add ADMIN_PASSWORD "$ADMIN_PASSWORD"
add ADMIN_SESSION_SECRET "$ADMIN_SESSION_SECRET"
unset URI ADMIN_SESSION_SECRET

echo
echo "後台登入密碼（只顯示這一次，請存進密碼管理器）："
echo "  $ADMIN_PASSWORD"
echo
echo "完成。重新部署後生效。"
