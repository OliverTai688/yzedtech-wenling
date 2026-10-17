import 'server-only';
import sharp from 'sharp';

// 上傳圖片的伺服器端壓縮（PRD-005 §3.3）：每張圖都在存進 MongoDB 之前重新編碼成 WebP，並保證 ≤ 1 MB。
// 做法：長邊先縮到 2000px，從高畫質往下試；畫質降到底仍超過，就把尺寸再縮小 25% 重來。
// 重新編碼也會拿掉 EXIF（含手機照片的 GPS 位置）；方向先依 EXIF 轉正，避免拿掉後圖片變成橫躺。
// GIF 會保留動畫（轉成動態 WebP）。

export const MAX_STORED_BYTES = 1024 * 1024;

const START_EDGE = 2000;
const MIN_EDGE = 320;
const QUALITIES = [82, 72, 62, 52, 42];

export interface CompressedImage {
  buffer: Buffer;
  contentType: 'image/webp';
  width: number;
  height: number;
}

export async function compressImage(input: Buffer, sourceType: string): Promise<CompressedImage> {
  const animated = sourceType === 'image/gif';
  // 限制解碼後的像素數，避免很小的檔案解開後佔滿記憶體（decompression bomb）
  const open = () => sharp(input, { animated, limitInputPixels: 100_000_000 });

  let edge = START_EDGE;
  let last: { data: Buffer; info: sharp.OutputInfo } | null = null;

  while (edge >= MIN_EDGE) {
    for (const quality of QUALITIES) {
      let pipeline = open();
      if (!animated) pipeline = pipeline.rotate();
      last = await pipeline
        .resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true })
        .webp({ quality, effort: 4 })
        .toBuffer({ resolveWithObject: true });
      if (last.data.byteLength <= MAX_STORED_BYTES) {
        return {
          buffer: last.data,
          contentType: 'image/webp',
          width: last.info.width,
          // 動態圖的 height 是所有影格疊起來的高度，取單一影格的高度
          height: last.info.pageHeight ?? last.info.height,
        };
      }
    }
    edge = Math.floor(edge * 0.75);
  }

  throw new Error(`無法把圖片壓到 1 MB 以內（最後一次 ${last?.data.byteLength ?? 0} bytes）`);
}
