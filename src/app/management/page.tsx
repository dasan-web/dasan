import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decryptSession } from '@/lib/auth';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('dasan-admin-session')?.value;

  if (token) {
    const payload = decryptSession(token);
    if (payload && payload.expiresAt && Date.now() < payload.expiresAt) {
      redirect('/management/dashboard');
    }
  }

  redirect('/management/login');
}

