import { Metadata } from 'next';
import Link from 'next/link';
import { StudentRegistrationForm } from '@/components/registration/student-registration-form';

export const metadata: Metadata = {
  title: 'Student Registration',
  description: 'Complete your student registration',
};

export default function RegistrationPage() {
  // Demo user ID for form
  const demoUserId = '123';
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-5xl">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Student Registration</h1>
          <p className="text-muted-foreground">
            Please fill out the form below to complete your registration.
          </p>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <StudentRegistrationForm userId={demoUserId} />
          </div>
        </div>
      </div>
    </div>
  );
}