'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Award, 
  BookOpen, 
  Calendar,
  AlertCircle,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Mock data
const studentPerformanceData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 80 },
  { month: 'Apr', score: 72 },
  { month: 'May', score: 85 },
  { month: 'Jun', score: 90 },
];

const mockNotifications = [
  { 
    id: 1, 
    title: 'Upcoming Midterm Exams', 
    description: 'Midterm exams begin on June 15th. Make sure to check your exam schedule.', 
    date: '2025-06-01',
    type: 'exam'
  },
  { 
    id: 2, 
    title: 'Certificate Request Approved', 
    description: 'Your JSC certificate request has been approved. Payment pending.', 
    date: '2025-05-28',
    type: 'certificate'
  },
  { 
    id: 3, 
    title: 'Registration Profile Update', 
    description: 'Please update your contact information in your profile.', 
    date: '2025-05-25',
    type: 'registration'
  },
  { 
    id: 4, 
    title: 'Payment Reminder', 
    description: 'Reminder to complete your exam fee payment by June 5th.', 
    date: '2025-05-20',
    type: 'payment'
  },
];

const mockUpcomingEvents = [
  { 
    id: 1, 
    title: 'Science Fair', 
    date: '2025-06-10',
    location: 'School Auditorium',
    type: 'event'
  },
  { 
    id: 2, 
    title: 'Midterm Exams Begin', 
    date: '2025-06-15',
    location: 'Examination Hall',
    type: 'exam'
  },
  { 
    id: 3, 
    title: 'Parent-Teacher Meeting', 
    date: '2025-06-20',
    location: 'Class Rooms',
    type: 'meeting'
  },
];

const mockCertificates = [
  { 
    id: 1, 
    type: 'JSC', 
    requestDate: '2025-05-15',
    status: 'Processing',
    paymentStatus: 'Paid'
  },
  { 
    id: 2, 
    type: 'SSC', 
    requestDate: '2025-04-20',
    status: 'Issued',
    paymentStatus: 'Paid'
  },
];

const mockExams = [
  { 
    id: 1, 
    name: 'Midterm Examination 2025', 
    dates: '2025-06-15 to 2025-06-25',
    admitCardStatus: 'Available',
    paymentStatus: 'Paid'
  },
  { 
    id: 2, 
    name: 'Final Examination 2025', 
    dates: '2025-12-05 to 2025-12-15',
    admitCardStatus: 'Not Available',
    paymentStatus: 'Pending'
  },
];

type StudentDashboardProps = {
  user: any;
};

export default function StudentDashboard({ user }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'certificate':
        return <Award className="h-4 w-4 text-green-500" />;
      case 'registration':
        return <FileText className="h-4 w-4 text-orange-500" />;
      case 'payment':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'meeting':
        return <FileText className="h-4 w-4 text-orange-500" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'Processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>;
      case 'Issued':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Issued</Badge>;
      case 'Available':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
      case 'Not Available':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Not Available</Badge>;
      case 'Paid':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your academic journey.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline">
            <Link href="/profile">View Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/registration">Complete Registration</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registration Status</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Pending</div>
                <p className="text-xs text-muted-foreground">Complete your student registration</p>
                <Progress value={60} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certificates</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Certificates requested</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs">JSC: Processing</span>
                  <span className="text-xs">SSC: Issued</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Registered exams</p>
                <div className="text-xs text-muted-foreground mt-2">Next: Midterm Exam (June 15)</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payments Due</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">$45.00</div>
                <p className="text-xs text-muted-foreground">Final exam registration fee</p>
                <Button variant="outline" size="sm" className="mt-2 w-full">Pay Now</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
                <CardDescription>
                  Your academic progress over the last semester
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={studentPerformanceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="hsl(var(--chart-1))" 
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Your recent notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(notification.date), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Important dates and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUpcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {event.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(event.date), 'MMMM d, yyyy')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Link href="/registration">
                      <FileText className="mb-2 h-6 w-6" />
                      <span>Complete Registration</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Link href="/certificates/request">
                      <Award className="mb-2 h-6 w-6" />
                      <span>Request Certificate</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Link href="/exams/admit-card">
                      <BookOpen className="mb-2 h-6 w-6" />
                      <span>Download Admit Card</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Link href="/profile">
                      <CheckCircle2 className="mb-2 h-6 w-6" />
                      <span>Update Profile</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Certificate Management</h2>
            <Button asChild>
              <Link href="/certificates/request">Request Certificate</Link>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Certificates</CardTitle>
              <CardDescription>
                View and manage your certificate requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium">
                  <div>Type</div>
                  <div>Request Date</div>
                  <div>Status</div>
                  <div>Payment</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {mockCertificates.map((certificate) => (
                    <div key={certificate.id} className="grid grid-cols-5 p-4 items-center">
                      <div>{certificate.type}</div>
                      <div>{format(new Date(certificate.requestDate), 'MMM d, yyyy')}</div>
                      <div>{getStatusBadge(certificate.status)}</div>
                      <div>{getStatusBadge(certificate.paymentStatus)}</div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        {certificate.status === 'Issued' && (
                          <Button size="sm">Download</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Certificate Verification</CardTitle>
              <CardDescription>
                Verify the authenticity of your certificates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Use the certificate verification system to confirm the authenticity of your certificates. 
                Each certificate has a unique verification code that can be used to verify its authenticity.
              </p>
              <Button variant="outline">Verify Certificate</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Exam Management</h2>
            <Button asChild>
              <Link href="/exams/register">Register for Exam</Link>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Exams</CardTitle>
              <CardDescription>
                View and manage your exam registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium">
                  <div>Exam Name</div>
                  <div>Dates</div>
                  <div>Admit Card</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {mockExams.map((exam) => (
                    <div key={exam.id} className="grid grid-cols-4 p-4 items-center">
                      <div>{exam.name}</div>
                      <div>{exam.dates}</div>
                      <div>{getStatusBadge(exam.admitCardStatus)}</div>
                      <div className="flex space-x-2">
                        {exam.admitCardStatus === 'Available' ? (
                          <Button size="sm">Download Admit Card</Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled={exam.paymentStatus !== 'Paid'}>
                            {exam.paymentStatus === 'Paid' ? 'Admit Card Pending' : 'Pay Fee'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Exam Schedule</CardTitle>
              <CardDescription>
                View upcoming exam dates and schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Midterm Examination 2025</h3>
                    <p className="text-sm text-muted-foreground">June 15 - June 25, 2025</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mathematics</span>
                        <span>June 15, 2025 (10:00 AM - 12:00 PM)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Science</span>
                        <span>June 17, 2025 (10:00 AM - 12:00 PM)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>English</span>
                        <span>June 19, 2025 (10:00 AM - 12:00 PM)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Social Studies</span>
                        <span>June 21, 2025 (10:00 AM - 12:00 PM)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Computer Science</span>
                        <span>June 23, 2025 (10:00 AM - 12:00 PM)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Final Examination 2025</h3>
                    <p className="text-sm text-muted-foreground">December 5 - December 15, 2025</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mathematics</span>
                        <span>December 5, 2025 (10:00 AM - 12:00 PM)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Science</span>
                        <span>December 7, 2025 (10:00 AM - 12:00 PM)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>English</span>
                        <span>December 9, 2025 (10:00 AM - 12:00 PM)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Social Studies</span>
                        <span>December 11, 2025 (10:00 AM - 12:00 PM)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Computer Science</span>
                        <span>December 13, 2025 (10:00 AM - 12:00 PM)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}