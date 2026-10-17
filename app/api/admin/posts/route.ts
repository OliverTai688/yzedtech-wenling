import { NextResponse } from 'next/server';
import { guardAdminApi } from '../../../../lib/admin/guard';
import { createPost, listAllPosts } from '../../../../lib/blog/repo';
import { revalidateBlog } from '../../../../lib/blog/revalidate';
import { parsePostInput } from '../../../../lib/blog/validate';

// 後台：文章列表、新增文章（PRD-005 §2 #2）
export async function GET(request: Request) {
  const denied = await guardAdminApi(request);
  if (denied) return denied;
  return NextResponse.json({ posts: await listAllPosts() });
}

export async function POST(request: Request) {
  const denied = await guardAdminApi(request);
  if (denied) return denied;

  const parsed = parsePostInput(await request.json().catch(() => null));
  if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const post = await createPost(parsed.value);
  revalidateBlog();
  return NextResponse.json({ post }, { status: 201 });
}
