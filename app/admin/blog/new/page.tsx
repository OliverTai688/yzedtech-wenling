import { requireAdminPage } from '../../../../lib/admin/guard';
import { isDbConfigured } from '../../../../lib/db/mongo';
import { listCategories } from '../../../../lib/blog/repo';
import AdminShell from '../../../../src/components/admin/AdminShell';
import DbMissing from '../../../../src/components/admin/DbMissing';
import PostForm from '../../../../src/components/admin/PostForm';

export default async function Page() {
  await requireAdminPage();
  return <AdminShell>{isDbConfigured() ? <PostForm categories={await listCategories()} /> : <DbMissing />}</AdminShell>;
}
