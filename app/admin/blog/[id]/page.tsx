import { notFound } from 'next/navigation';
import { requireAdminPage } from '../../../../lib/admin/guard';
import { isDbConfigured } from '../../../../lib/db/mongo';
import { getPostById, listCategories } from '../../../../lib/blog/repo';
import AdminShell from '../../../../src/components/admin/AdminShell';
import DbMissing from '../../../../src/components/admin/DbMissing';
import PostForm from '../../../../src/components/admin/PostForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  await requireAdminPage();
  if (!isDbConfigured()) {
    return (
      <AdminShell>
        <DbMissing />
      </AdminShell>
    );
  }
  const { id } = await params;
  const [post, categories] = await Promise.all([getPostById(id), listCategories()]);
  if (!post) notFound();
  // key：存檔後 router.refresh() 不重建編輯器；換一篇文章時才重建
  return (
    <AdminShell>
      <PostForm key={post.id} post={post} categories={categories} />
    </AdminShell>
  );
}
