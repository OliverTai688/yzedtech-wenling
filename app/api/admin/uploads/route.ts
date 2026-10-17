import { NextResponse } from 'next/server';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { guardAdminApi } from '../../../../lib/admin/guard';
import { getImageBucket } from '../../../../lib/db/mongo';
import { compressImage } from '../../../../lib/blog/compress';
import { imageUrl } from '../../../../lib/blog/types';

// 後台：上傳圖片到 GridFS（PRD-005 §3.3）。
// 1. 檢查大小與檔頭，只收 JPEG／PNG／WebP／GIF（不收 SVG，避免夾帶程式）。
// 2. 一律經過 compressImage 重新編碼成 WebP、確保 ≤ 1 MB 並拿掉 EXIF，才存進 MongoDB。
// 瀏覽器端也會先縮圖，那只是為了讓請求落在 Vercel 的 4.5 MB 上限內；大小的保證在這裡。
export const runtime = 'nodejs';

// 收到的原檔上限（Vercel 函式請求上限 4.5 MB）；存進資料庫的大小上限見 lib/blog/compress.ts
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

function sniff(bytes: Uint8Array): string | null {
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.subarray(start, end));
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes[0] === 0x89 && ascii(1, 4) === 'PNG') return 'image/png';
  if (ascii(0, 4) === 'GIF8') return 'image/gif';
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'image/webp';
  return null;
}

export async function POST(request: Request) {
  const denied = await guardAdminApi(request);
  if (denied) return denied;

  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: '沒有收到圖片' }, { status: 400 });
  if (file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: '圖片超過 4 MB' }, { status: 413 });

  const bytes = new Uint8Array(await file.arrayBuffer());
  const contentType = sniff(bytes);
  if (!contentType) return NextResponse.json({ error: '只接受 JPEG、PNG、WebP、GIF' }, { status: 415 });

  let image;
  try {
    image = await compressImage(Buffer.from(bytes), contentType);
  } catch (error) {
    console.error('[blog] compressImage failed', error);
    return NextResponse.json({ error: '圖片無法處理，請換一張或先用其他工具壓縮' }, { status: 422 });
  }

  const name = (file.name.replace(/\.[^.]+$/, '') || 'image').slice(0, 120) + '.webp';
  const bucket = await getImageBucket();
  const upload = bucket.openUploadStream(name, {
    metadata: {
      contentType: image.contentType,
      size: image.buffer.byteLength,
      width: image.width,
      height: image.height,
      originalType: contentType,
      originalSize: bytes.byteLength,
      uploadedAt: new Date(),
    },
  });
  await pipeline(Readable.from(image.buffer), upload);

  const id = upload.id.toHexString();
  return NextResponse.json(
    { id, url: imageUrl(id), size: image.buffer.byteLength, width: image.width, height: image.height },
    { status: 201 },
  );
}
