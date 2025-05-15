import Link from 'next/link';
import Image from 'next/image';
import { 
  FileText, 
  Award, 
  BookOpen,
  Users,
  Calendar,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Streamline Your School Management
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A comprehensive digital solution for student registration, certificate management, and exam administration.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/registration">Register Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
                <Image
                  src="https://images.pexels.com/photos/8617942/pexels-photo-8617942.jpeg"
                  alt="Students using digital devices"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Comprehensive School Management Features
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to efficiently manage student information, certificates, and exams.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Student Registration</CardTitle>
                </div>
                <CardDescription>
                  Digital student enrollment and profile management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Comprehensive registration forms</li>
                  <li>Photo upload functionality</li>
                  <li>Guardian information management</li>
                  <li>Editable student profiles</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Certificate Management</CardTitle>
                </div>
                <CardDescription>
                  Request and track educational certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>JSC & SSC certificate requests</li>
                  <li>Status tracking dashboard</li>
                  <li>Digital certificate previews</li>
                  <li>Secure verification system</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Exam Management</CardTitle>
                </div>
                <CardDescription>
                  Streamline exam registration and admit card generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Exam scheduling system</li>
                  <li>Online fee payment</li>
                  <li>Digital admit card generation</li>
                  <li>QR code verification</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">User Management</CardTitle>
                </div>
                <CardDescription>
                  Role-based access control system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Admin and student portals</li>
                  <li>Secure authentication</li>
                  <li>Profile management</li>
                  <li>Password recovery</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Schedule Management</CardTitle>
                </div>
                <CardDescription>
                  Organize academic schedules efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Academic calendar</li>
                  <li>Exam timetables</li>
                  <li>Registration deadlines</li>
                  <li>Important date notifications</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Payment Processing</CardTitle>
                </div>
                <CardDescription>
                  Secure payment handling for fees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Exam fee collection</li>
                  <li>Certificate processing fees</li>
                  <li>Payment history tracking</li>
                  <li>Receipt generation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our digital school management platform today for a more efficient educational experience.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/registration">Register as Student</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/auth/login">Admin Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}