import { adminCard } from './styles';

// 沒有設定 MONGODB_URI 時的提示
export default function DbMissing() {
  return (
    <div className={`${adminCard} mt-6 p-6 text-base text-muted-foreground`}>
      尚未設定資料庫。請在環境變數設定 <code className="rounded bg-muted px-1">MONGODB_URI</code>（見 <code className="rounded bg-muted px-1">.env.example</code>）後重新啟動。
    </div>
  );
}
