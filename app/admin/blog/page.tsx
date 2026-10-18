import Link from 'next/link';
import { Plus } from 'lucide-react';
import { requireAdminPage } from '../../../lib/admin/guard';
import { isDbConfigured } from '../../../lib/db/mongo';
import { listAllPosts } from '../../../lib/blog/repo';
import AdminShell from '../../../src/components/admin/AdminShell';
import DbMissing from '../../../src/components/admin/DbMissing';
import PostTable from '../../../src/components/admin/PostTable';

// 後台：文章列表（PRD-005 §2 #2）
export default async function Page() {
  await requireAdminPage();

  return (
    <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-2xl font-bold text-card-foreground">部落格文章</h1>
        <Link href="/admin/blog/new" className="gold-btn inline-flex min-h-11 items-center gap-1.5 rounded-full px-5 font-bold">
          <Plus className="size-4" aria-hidden="true" />
          新增文章
        </Link>
      </div>
      {isDbConfigured() ? <PostTable initialPosts={await listAllPosts()} /> : <DbMissing />}
    </AdminShell>
  );
}
