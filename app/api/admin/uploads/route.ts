import { NextResponse } from 'next/server';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { guardAdminApi } from '../../../../lib/admin/guard';
import { getImageBucket } from '../../../../lib/db/mongo';
import { imageUrl } from '../../../../lib/blog/types';

// 後台：上傳圖片到 GridFS（PRD-005 §3.3）。瀏覽器端已先縮圖；這裡再檢查大小與檔頭，
// 只收 JPEG／PNG／WebP／GIF（不收 SVG，避免夾帶程式）。
export const runtime = 'nodejs';

const MAX_BYTES = 4 * 1024 * 1024;

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
  if (file.size > MAX_BYTES) return NextResponse.json({ error: '圖片超過 4 MB' }, { status: 413 });

  const bytes = new Uint8Array(await file.arrayBuffer());
  const contentType = sniff(bytes);
  if (!contentType) return NextResponse.json({ error: '只接受 JPEG、PNG、WebP、GIF' }, { status: 415 });

  const bucket = await getImageBucket();
  const upload = bucket.openUploadStream(file.name.slice(0, 120) || 'image', {
    metadata: { contentType, size: bytes.byteLength, uploadedAt: new Date() },
  });
  await pipeline(Readable.from(Buffer.from(bytes)), upload);

  const id = upload.id.toHexString();
  return NextResponse.json({ id, url: imageUrl(id) }, { status: 201 });
}
