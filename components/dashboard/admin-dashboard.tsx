'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Award, 
  BookOpen, 
  Users,
  CreditCard,
  BarChart4,
  AlertCircle,
  Search,
  Download,
  Filter,
  ChevronDown
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const studentData = [
  { month: 'Jan', registrations: 30 },
  { month: 'Feb', registrations: 45 },
  { month: 'Mar', registrations: 60 },
  { month: 'Apr', registrations: 40 },
  { month: 'May', registrations: 50 },
  { month: 'Jun', registrations: 55 },
];

const certificateData = [
  { name: 'Pending', value: 15, color: 'hsl(var(--chart-1))' },
  { name: 'Processing', value: 10, color: 'hsl(var(--chart-2))' },
  { name: 'Issued', value: 40, color: 'hsl(var(--chart-3))' },
  { name: 'Rejected', value: 5, color: 'hsl(var(--chart-4))' },
];

const examData = [
  { name: 'Midterm', students: 120, percent: 90 },
  { name: 'Final', students: 110, percent: 85 },
  { name: 'JSC', students: 80, percent: 60 },
  { name: 'SSC', students: 65, percent: 50 },
];

const mockRecentStudents = [
  { 
    id: 1, 
    name: 'Emma Johnson', 
    class: 'Class 10',
    registrationDate: '2025-05-28',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Liam Smith', 
    class: 'Class 9',
    registrationDate: '2025-05-27',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Olivia Brown', 
    class: 'Class 8',
    registrationDate: '2025-05-26',
    status: 'Pending'
  },
  { 
    id: 4, 
    name: 'Noah Williams', 
    class: 'Class 10',
    registrationDate: '2025-05-25',
    status: 'Active'
  },
  { 
    id: 5, 
    name: 'Sophia Davis', 
    class: 'Class 9',
    registrationDate: '2025-05-24',
    status: 'Inactive'
  },
];

const mockPendingCertificates = [
  { 
    id: 1, 
    studentName: 'Emma Johnson', 
    type: 'JSC',
    requestDate: '2025-05-28',
    status: 'Pending'
  },
  { 
    id: 2, 
    studentName: 'Liam Smith', 
    type: 'SSC',
    requestDate: '2025-05-27',
    status: 'Processing'
  },
  { 
    id: 3, 
    studentName: 'Olivia Brown', 
    type: 'JSC',
    requestDate: '2025-05-26',
    status: 'Pending'
  },
];

const mockUpcomingExams = [
  { 
    id: 1, 
    name: 'Midterm Examination 2025', 
    dates: '2025-06-15 to 2025-06-25',
    registeredStudents: 125,
    status: 'Upcoming'
  },
  { 
    id: 2, 
    name: 'JSC Examination 2025', 
    dates: '2025-07-10 to 2025-07-20',
    registeredStudents: 80,
    status: 'Registration Open'
  },
];

type AdminDashboardProps = {
  user: any;
};

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'Inactive':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>;
      case 'Processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>;
      case 'Upcoming':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Upcoming</Badge>;
      case 'Registration Open':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Registration Open</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage students, certificates, and exams from one place.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline">
            <Link href="/admin/settings">
              <span>Settings</span>
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/reports">
              <Download className="mr-2 h-4 w-4" />
              <span>Export Reports</span>
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,543</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+5.2%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certificate Requests</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-yellow-500">+2.5%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  2 upcoming, 2 open for registration
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,580</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Student Registrations</CardTitle>
                <CardDescription>
                  Monthly student registration trend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="registrations" 
                        name="Student Registrations" 
                        fill="hsl(var(--chart-1))" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Certificate Status</CardTitle>
                <CardDescription>
                  Distribution of certificate request statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={certificateData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {certificateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Recent Students</CardTitle>
                <CardDescription>
                  Recently registered students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentStudents.slice(0, 4).map((student) => (
                    <div key={student.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{student.name}</p>
                        <div className="flex items-center">
                          <p className="text-xs text-muted-foreground mr-2">{student.class}</p>
                          {getStatusBadge(student.status)}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/admin/students">View All Students</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Pending Certificates</CardTitle>
                <CardDescription>
                  Certificate requests awaiting action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPendingCertificates.map((certificate) => (
                    <div key={certificate.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{certificate.studentName}</p>
                        <div className="flex items-center">
                          <p className="text-xs text-muted-foreground mr-2">{certificate.type}</p>
                          {getStatusBadge(certificate.status)}
                        </div>
                      </div>
                      <Button size="sm">Process</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/admin/certificates">View All Certificates</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Exams</CardTitle>
                <CardDescription>
                  Exams scheduled for the near future
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUpcomingExams.map((exam) => (
                    <div key={exam.id} className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{exam.name}</p>
                        {getStatusBadge(exam.status)}
                      </div>
                      <p className="text-xs text-muted-foreground">{exam.dates}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {exam.registeredStudents} students registered
                        </p>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/admin/exams">View All Exams</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <h2 className="text-xl font-bold">Student Management</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Class</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Registration Date</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Clear Filters</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button asChild>
                <Link href="/admin/students/add">
                  <span>Add Student</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 font-medium">
                  <div>Name</div>
                  <div>ID</div>
                  <div>Class</div>
                  <div>Registration Date</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {mockRecentStudents.map((student) => (
                    <div key={student.id} className="grid grid-cols-6 p-4 items-center">
                      <div className="font-medium">{student.name}</div>
                      <div>STU-{student.id.toString().padStart(5, '0')}</div>
                      <div>{student.class}</div>
                      <div>{format(new Date(student.registrationDate), 'MMM d, yyyy')}</div>
                      <div>{getStatusBadge(student.status)}</div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Print ID Card</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">2,543</span> students
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <h2 className="text-xl font-bold">Certificate Management</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search certificates..."
                  className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Type</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Request Date</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Clear Filters</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button asChild>
                <Link href="/admin/certificates/bulk-process">
                  <span>Process Certificates</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">
                  Certificate requests awaiting initial review
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">View</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Processing</CardTitle>
                <div className="h-4 w-4 rounded-full bg-blue-400"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10</div>
                <p className="text-xs text-muted-foreground">
                  Certificate requests under processing
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">View</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <div className="h-4 w-4 rounded-full bg-green-400"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">40</div>
                <p className="text-xs text-muted-foreground">
                  Certificates issued and completed
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">View</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Certificate Requests</CardTitle>
              <CardDescription>
                Manage and process certificate requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 font-medium">
                  <div>Student</div>
                  <div>Type</div>
                  <div>Request Date</div>
                  <div>Status</div>
                  <div>Payment Status</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {mockPendingCertificates.map((certificate) => (
                    <div key={certificate.id} className="grid grid-cols-6 p-4 items-center">
                      <div className="font-medium">{certificate.studentName}</div>
                      <div>{certificate.type}</div>
                      <div>{format(new Date(certificate.requestDate), 'MMM d, yyyy')}</div>
                      <div>{getStatusBadge(certificate.status)}</div>
                      <div>{getStatusBadge('Paid')}</div>
                      <div className="flex space-x-2">
                        <Button size="sm">Process</Button>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <h2 className="text-xl font-bold">Exam Management</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Exam Type</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Date Range</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Clear Filters</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button asChild>
                <Link href="/admin/exams/create">
                  <span>Create Exam</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Exam Participation</CardTitle>
                <CardDescription>
                  Student registration by exam type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={examData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="students" 
                        name="Registered Students" 
                        fill="hsl(var(--chart-1))" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Exams</CardTitle>
                <CardDescription>
                  Currently active and upcoming exams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockUpcomingExams.map((exam) => (
                    <div key={exam.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{exam.name}</h3>
                        {getStatusBadge(exam.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{exam.dates}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Registered Students:</span>
                          <span className="font-medium">{exam.registeredStudents}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Registration Status:</span>
                          <span className="font-medium">{exam.status === 'Registration Open' ? 'Open' : 'Closed'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Admit Cards:</span>
                          <span className="font-medium">{exam.status === 'Upcoming' ? 'Generated' : 'Not Generated'}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1">Manage</Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Generate Admit Cards
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Create New Exam</CardTitle>
              <CardDescription>
                Set up and schedule a new examination
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Exam Name</label>
                    <Input placeholder="e.g., Final Examination 2025" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Exam Type</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">Select Exam Type</option>
                      <option value="midterm">Midterm</option>
                      <option value="final">Final</option>
                      <option value="jsc">JSC</option>
                      <option value="ssc">SSC</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Registration Opens</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Registration Closes</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Registration Fee</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Eligible Classes</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">Select Classes</option>
                      <option value="all">All Classes</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Detailed description of the examination"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Exam</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}