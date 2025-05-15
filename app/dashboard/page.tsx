import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession, getCurrentUser } from '@/lib/auth';
import StudentDashboard from '@/components/dashboard/student-dashboard';
import AdminDashboard from '@/components/dashboard/admin-dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'School Management System Dashboard',
};

export default async function DashboardPage() {
  const session = await getSession();
  const user = await getCurrentUser(session);

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {user.role === 'ADMIN' ? (
        <AdminDashboard user={user} />
      ) : (
        <StudentDashboard user={user} />
      )}
    </div>
  );
}