import { Metadata } from 'next';
import StudentDashboard from '@/components/dashboard/student-dashboard';
import AdminDashboard from '@/components/dashboard/admin-dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'School Management System Dashboard',
};

export default function DashboardPage() {
  // For demo purposes, showing student dashboard by default
  const demoUser = {
    name: 'John Smith',
    email: 'john@example.com',
    role: 'STUDENT'
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {demoUser.role === 'ADMIN' ? (
        <AdminDashboard user={demoUser} />
      ) : (
        <StudentDashboard user={demoUser} />
      )}
    </div>
  );
}