import { NextResponse } from 'next/server';
import { guardAdminApi } from '../../../../../lib/admin/guard';
import { deletePost, getPostById, setPostStatus, updatePost } from '../../../../../lib/blog/repo';
import { revalidateBlog } from '../../../../../lib/blog/revalidate';
import { parsePostInput } from '../../../../../lib/blog/validate';

// 後台：讀取、修改、刪除單篇文章（PRD-005 §2 #2）
interface Context {
  params: Promise<{ id: string }>;
}

const notFound = () => NextResponse.json({ error: '找不到這篇文章' }, { status: 404 });

export async function GET(request: Request, { params }: Context) {
  const denied = await guardAdminApi(request);
  if (denied) return denied;
  const post = await getPostById((await params).id);
  return post ? NextResponse.json({ post }) : notFound();
}

export async function PUT(request: Request, { params }: Context) {
  const denied = await guardAdminApi(request);
  if (denied) return denied;

  const parsed = parsePostInput(await request.json().catch(() => null));
  if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const result = await updatePost((await params).id, parsed.value);
  if (!result) return notFound();
  revalidateBlog();
  return NextResponse.json({ post: result.after });
}

// 只切換發布狀態：{ status: 'draft' | 'published' }
export async function PATCH(request: Request, { params }: Context) {
  const denied = await guardAdminApi(request);
  if (denied) return denied;
  const body = await request.json().catch(() => null);
  if (body?.status !== 'draft' && body?.status !== 'published') {
    return NextResponse.json({ error: '狀態只能是 draft 或 published' }, { status: 400 });
  }
  const post = await setPostStatus((await params).id, body.status);
  if (!post) return notFound();
  revalidateBlog();
  return NextResponse.json({ post });
}

export async function DELETE(request: Request, { params }: Context) {
  const denied = await guardAdminApi(request);
  if (denied) return denied;
  const post = await deletePost((await params).id);
  if (!post) return notFound();
  revalidateBlog();
  return NextResponse.json({ ok: true });
}
