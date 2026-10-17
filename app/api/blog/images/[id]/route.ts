import { ObjectId } from 'mongodb';
import { Readable } from 'node:stream';
import { getImageBucket, isDbConfigured } from '../../../../../lib/db/mongo';
import { OBJECT_ID } from '../../../../../lib/blog/validate';

// 公開輸出部落格圖片（PRD-005 §3.3）。圖片 id 一經建立內容就不會變，所以可以長期快取。
export const runtime = 'nodejs';

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
    'Cache-Control': 'public, max-age=31536000, immutable',
    'X-Content-Type-Options': 'nosniff',
    ETag: etag,
  };
  if (request.headers.get('if-none-match') === etag) return new Response(null, { status: 304, headers });

  const stream = Readable.toWeb(bucket.openDownloadStream(file._id)) as ReadableStream<Uint8Array>;
  return new Response(stream, { headers: { ...headers, 'Content-Length': String(file.length) } });
}
