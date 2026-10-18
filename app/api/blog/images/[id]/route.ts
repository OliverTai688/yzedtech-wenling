import { ObjectId } from 'mongodb';
import { Readable } from 'node:stream';
import { getImageBucket, isDbConfigured } from '../../../../../lib/db/mongo';
import { OBJECT_ID } from '../../../../../lib/blog/validate';

// 公開輸出部落格圖片（PRD-005 §3.3）。
// 快取（PRD-005 §3.4，ACC-007 §2.6 發現 1）：圖片內容不會變，但會被刪除。快取一年會讓刪掉的圖
// 在 CDN 與瀏覽器裡留很久，所以改成瀏覽器 1 小時、Vercel CDN 1 天：刪除的圖最晚一天後就打不開。
export const runtime = 'nodejs';

const BROWSER_CACHE = 'public, max-age=3600';
// 只給 Vercel 的 CDN 看的快取時間，不會傳給瀏覽器
const CDN_CACHE = 'public, max-age=86400';

interface Context {
  params: Promise<{ id: string }>;
}

const notFound = () => new Response('Not found', { status: 404 });

export async function GET(request: Request, { params }: Context) {
  const { id } = await params;
  if (!OBJECT_ID.test(id) || !isDbConfigured()) return notFound();

  const bucket = await getImageBucket();
  const [file] = await bucket.find({ _id: new ObjectId(id) }).limit(1).toArray();
  if (!file) return notFound();

  const etag = `"${id}"`;
  const headers = {
    'Content-Type': (file.metadata?.contentType as string) ?? 'application/octet-stream',
    'Cache-Control': BROWSER_CACHE,
    'Vercel-CDN-Cache-Control': CDN_CACHE,
    'X-Content-Type-Options': 'nosniff',
    ETag: etag,
  };
  if (request.headers.get('if-none-match') === etag) return new Response(null, { status: 304, headers });

  const stream = Readable.toWeb(bucket.openDownloadStream(file._id)) as ReadableStream<Uint8Array>;
  return new Response(stream, { headers: { ...headers, 'Content-Length': String(file.length) } });
}
