import { NextResponse } from 'next/server';
import { SESSION_COOKIE, SESSION_MAX_AGE, checkPassword, createSessionToken } from '../../../../lib/admin/session';

// 後台登入（PRD-005 §3.4）：比對 ADMIN_PASSWORD，成功就發簽章 cookie。
export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: '伺服器尚未設定 ADMIN_PASSWORD／ADMIN_SESSION_SECRET' }, { status: 500 });
  }
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!(await checkPassword(password))) {
    // 稍微放慢失敗的回應，降低暴力猜測的速度
    await new Promise((resolve) => setTimeout(resolve, 800));
    return NextResponse.json({ error: '密碼錯誤' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
