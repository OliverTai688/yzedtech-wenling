import 'server-only';
import { GridFSBucket, MongoClient, type Db } from 'mongodb';

// MongoDB 連線（PRD-005 §3.3）。開發模式下熱更新會重新執行模組，所以把連線存在 globalThis，
// 避免每次存檔就多開一組連線；正式環境同一個函式實例也只建立一次。
// 沒有設定 MONGODB_URI 時，isDbConfigured() 為 false，前台把它當成「沒有文章」。
const globalForMongo = globalThis as typeof globalThis & { _mongoClient?: Promise<MongoClient> };

export function isDbConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

function clientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri, { maxPoolSize: 10 }).connect().catch((error) => {
      // 連線失敗不要把失敗的 Promise 留在快取裡，下次請求重試
      globalForMongo._mongoClient = undefined;
      throw error;
    });
  }
  return globalForMongo._mongoClient;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise();
  return client.db(process.env.MONGODB_DB || 'wenling');
}

export const IMAGE_BUCKET = 'blogImages';

export async function getImageBucket() {
  return new GridFSBucket(await getDb(), { bucketName: IMAGE_BUCKET });
}
