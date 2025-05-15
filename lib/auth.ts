import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';

export async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
}

export async function getCurrentUser(session?: Session | null) {
  if (!session?.user) {
    return null;
  }
  
  return session.user;
}

export async function requireAuth() {
  const session = await getSession();
  const user = await getCurrentUser(session);
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return user;
}

export async function requireAdminAuth() {
  const session = await getSession();
  const user = await getCurrentUser(session);
  
  if (!user) {
    redirect('/auth/login');
  }
  
  if (user.role !== 'ADMIN') {
    redirect('/dashboard');
  }
  
  return user;
}