import { redirect } from 'next/navigation';
import { isAdmin } from '../../../lib/admin/guard';
import LoginForm from '../../../src/components/admin/LoginForm';

export default async function Page() {
  if (await isAdmin()) redirect('/admin/blog');
  return <LoginForm />;
}
