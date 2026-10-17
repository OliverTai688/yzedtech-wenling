// 後台登入的簽章 cookie（PRD-005 §3.4）。只用 Web Crypto，middleware（Edge）與 API（Node）都能用。
// cookie 內容：`<到期毫秒>.<HMAC-SHA256(到期毫秒) 的 base64url>`。

export const SESSION_COOKIE = 'wl_admin';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 天（秒）

const encoder = new TextEncoder();

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be set (at least 32 characters)');
  }
  return secret;
}

function toBase64Url(bytes: ArrayBuffer) {
  let binary = '';
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(getSecret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toBase64Url(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

/** 長度相同時逐字比較，不因第一個不同的字元提早結束 */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken() {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${expires}.${await sign(expires)}`;
}

export async function verifySessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [expires, signature] = token.split('.');
  if (!expires || !signature || !/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;
  try {
    return safeEqual(signature, await sign(expires));
  } catch {
    return false;
  }
}

/** 密碼比對：先各自雜湊成同樣長度再比，避免從回應時間推測密碼長度 */
export async function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(input)),
    crypto.subtle.digest('SHA-256', encoder.encode(expected)),
  ]);
  return safeEqual(toBase64Url(a), toBase64Url(b));
}
