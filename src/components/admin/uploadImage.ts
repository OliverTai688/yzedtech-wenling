// 後台上傳圖片（PRD-005 §3.3）：上傳前在瀏覽器把長邊超過 2000px 的圖縮小並轉成 WebP，
// 讓檔案落在 Vercel 函式的請求上限（4.5 MB）之內。GIF 保留原檔以免失去動畫。
const MAX_EDGE = 2000;
const MAX_BYTES = 4 * 1024 * 1024;
export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

async function toWebp(file: File): Promise<Blob> {
  if (file.type === 'image/gif') return file;
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.85));
  // 沒縮小且轉檔後反而更大時，用原檔
  if (!blob || (scale === 1 && blob.size >= file.size)) return file;
  return blob;
}

export async function uploadImage(file: File): Promise<{ id: string; url: string }> {
  if (!ACCEPTED_TYPES.includes(file.type)) throw new Error('只接受 JPEG、PNG、WebP、GIF');
  const blob = await toWebp(file);
  if (blob.size > MAX_BYTES) throw new Error('圖片超過 4 MB，請先壓縮後再上傳');

  const name = blob === file ? file.name : file.name.replace(/\.[^.]+$/, '') + '.webp';
  const form = new FormData();
  form.append('file', blob, name);
  const response = await fetch('/api/admin/uploads', { method: 'POST', body: form }).catch(() => null);
  const data = await response?.json().catch(() => null);
  if (!response?.ok || !data?.url) throw new Error(data?.error ?? '上傳失敗');
  return data;
}

export const imageFilesFrom = (list: FileList | null | undefined) =>
  Array.from(list ?? []).filter((file) => ACCEPTED_TYPES.includes(file.type));
