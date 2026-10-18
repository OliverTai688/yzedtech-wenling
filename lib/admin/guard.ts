import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from './session';

// 後台的二次檢查（PRD-005 §3.4）：middleware 之外，每個後台頁面與 API 自己再驗一次登入。

export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** 後台頁面（server component）用：沒登入就導到登入頁 */
export async function requireAdminPage() {
  if (!(await isAdmin())) redirect('/admin/login');
}

/** 寫入用的 API：只接受同源請求。瀏覽器送出的 fetch 一定帶 Origin。 */
function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return request.method === 'GET';
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** 後台 API 用：回傳 null 代表通過，否則回傳要直接送出的錯誤回應 */
export async function guardAdminApi(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: '不允許的來源' }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ error: '請先登入' }, { status: 401 });
  return null;
}
