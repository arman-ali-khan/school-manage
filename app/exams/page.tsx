import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, CalendarDays, CreditCard, Download, Clock, CheckCircle2, ExternalLink, Printer, QrCode } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exam Management',
  description: 'Register for exams and download admit cards',
};

export default async function ExamsPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Exam Management</h1>
            <p className="text-muted-foreground">
              Register for exams, pay fees, and download admit cards.
            </p>
          </div>
          <Button asChild>
            <Link href="/exams/register">Register for Exam</Link>
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="admitcards">Admit Cards</TabsTrigger>
            <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    Midterm and Final exams are coming up
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="#exams-list">
                      View Exams
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Admit Cards</CardTitle>
                  <QrCode className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">
                    Midterm exam admit card is ready for download
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/exams/admitcards">
                      View Admit Cards
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45.00</div>
                  <p className="text-xs text-muted-foreground">
                    Final exam fee payment pending
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">
                    Pay Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card id="exams-list">
              <CardHeader>
                <CardTitle>Upcoming Examinations</CardTitle>
                <CardDescription>
                  Exams that are scheduled for the current academic period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-lg">Midterm Examination 2025</h3>
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">Registration Open</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground space-x-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>June 15 - June 25, 2025</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Fee Paid</Badge>
                        <Button size="sm" asChild>
                          <Link href="/exams/admitcards">
                            <Download className="mr-2 h-4 w-4" />
                            Admit Card
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Registration Period</p>
                        <p className="text-sm">May 15 - June 5, 2025</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Exam Fee</p>
                        <p className="text-sm">$30.00 <span className="text-green-600">(Paid)</span></p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Status</p>
                        <div className="flex items-center space-x-1 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>Registered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-lg">Final Examination 2025</h3>
                          <Badge className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Registration Opens Soon</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground space-x-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>December 5 - December 15, 2025</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Fee Pending</Badge>
                        <Button size="sm" variant="outline" disabled>
                          <Clock className="mr-2 h-4 w-4" />
                          Not Available
                        </Button>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Registration Period</p>
                        <p className="text-sm">November 1 - November 25, 2025</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Exam Fee</p>
                        <p className="text-sm">$45.00 <span className="text-yellow-600">(Pending)</span></p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Status</p>
                        <div className="flex items-center space-x-1 text-sm">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span>Registration opens November 1, 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Exam Guidelines</CardTitle>
                  <CardDescription>
                    Important information for exam preparation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Before the Exam</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Complete your exam registration and fee payment on time</li>
                        <li>Download and print your admit card</li>
                        <li>Check your exam schedule carefully</li>
                        <li>Prepare all required stationery and materials</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">During the Exam</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Arrive at the examination center at least 30 minutes early</li>
                        <li>Bring your admit card and school ID</li>
                        <li>Follow all instructions given by exam supervisors</li>
                        <li>Mobile phones and electronic devices are strictly prohibited</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">After the Exam</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Check the notice board for any announcements</li>
                        <li>Verify your attendance has been recorded</li>
                        <li>Results will be published within 2-3 weeks after the exam</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/exams/guidelines">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Complete Guidelines
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common exam-related tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                      <Link href="/exams/register">
                        <BookOpen className="mb-2 h-6 w-6" />
                        <span>Register for Exam</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                      <Link href="/exams/admitcards">
                        <QrCode className="mb-2 h-6 w-6" />
                        <span>Download Admit Card</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                      <Link href="/exams/schedule">
                        <CalendarDays className="mb-2 h-6 w-6" />
                        <span>View Schedule</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                      <Link href="/exams/payments">
                        <CreditCard className="mb-2 h-6 w-6" />
                        <span>Pay Exam Fee</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="admitcards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Admit Cards</CardTitle>
                <CardDescription>
                  Download and print your exam admit cards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-lg">Midterm Examination 2025</h3>
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground space-x-4">
                          <div className="flex items-center space-x-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>June 15 - June 25, 2025</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <QrCode className="h-4 w-4" />
                            <span>ID: ADM-2025-001234</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="#">
                            <Printer className="mr-2 h-4 w-4" />
                            Print
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href="#">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="rounded-lg border p-6 bg-white">
                      <div className="flex flex-col items-center space-y-4">
                        <h2 className="text-xl font-bold text-center">ADMIT CARD</h2>
                        <h3 className="text-lg font-semibold text-center">Midterm Examination 2025</h3>
                        
                        <div className="w-full max-w-xl mx-auto">
                          <div className="flex flex-col md:flex-row md:space-x-4">
                            <div className="md:w-1/3 flex items-center justify-center mb-4 md:mb-0">
                              <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center">
                                <span className="text-sm text-gray-500">Student Photo</span>
                              </div>
                            </div>
                            <div className="md:w-2/3 space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <p className="text-xs text-muted-foreground">Student Name</p>
                                  <p className="text-sm font-medium">John Smith</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-muted-foreground">Registration ID</p>
                                  <p className="text-sm font-medium">STU-20250001</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-muted-foreground">Class</p>
                                  <p className="text-sm font-medium">Class 10</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-muted-foreground">Roll Number</p>
                                  <p className="text-sm font-medium">1001</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-muted-foreground">Exam Center</p>
                                  <p className="text-sm font-medium">Main Building, Room 101</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-muted-foreground">Admit Card ID</p>
                                  <p className="text-sm font-medium">ADM-2025-001234</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-sm">Examination Schedule</h4>
                              <div className="mt-2 space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Mathematics</span>
                                  <span>June 15, 2025 (10:00 AM - 12:00 PM)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Science</span>
                                  <span>June 17, 2025 (10:00 AM - 12:00 PM)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>English</span>
                                  <span>June 19, 2025 (10:00 AM - 12:00 PM)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Social Studies</span>
                                  <span>June 21, 2025 (10:00 AM - 12:00 PM)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Computer Science</span>
                                  <span>June 23, 2025 (10:00 AM - 12:00 PM)</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 text-center">
                              <div className="mb-2 mx-auto w-32 h-32 bg-gray-200 flex items-center justify-center rounded-md">
                                <span className="text-sm text-gray-500">QR Code</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Scan for verification
                              </p>
                            </div>
                            
                            <div className="mt-4 p-2 bg-gray-100 rounded-md">
                              <p className="text-xs text-center">
                                This admit card must be presented at the examination center. 
                                No student will be allowed to enter without a valid admit card.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm">
                      <p className="text-muted-foreground">
                        Please print this admit card on A4-sized paper and bring it to the examination center 
                        along with your school ID card.
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-lg">Final Examination 2025</h3>
                          <Badge className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Not Available</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground space-x-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>December 5 - December 15, 2025</span>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm" disabled>
                          <Clock className="mr-2 h-4 w-4" />
                          Available from Nov 25, 2025
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Important Instructions</CardTitle>
                <CardDescription>
                  Guidelines for using admit cards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Admit Card Usage</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Print the admit card on A4-sized white paper in color</li>
                      <li>Ensure all details on the admit card are correct</li>
                      <li>Report any discrepancies immediately to the examination department</li>
                      <li>The admit card is valid only for the mentioned examination</li>
                      <li>Keep the admit card safe after the examination for future reference</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Examination Day Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Bring your admit card and school ID card</li>
                      <li>Arrive at the examination center at least 30 minutes before the exam</li>
                      <li>Bring all required stationery (pens, pencils, erasers, etc.)</li>
                      <li>Mobile phones and electronic devices are strictly prohibited</li>
                      <li>Follow all instructions given by examination supervisors</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Examination Schedule</CardTitle>
                <CardDescription>
                  Comprehensive exam timetable for the academic year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Midterm Examination 2025</h3>
                    <div className="rounded-lg border overflow-hidden">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr className="bg-muted">
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Day</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Venue</th>
                          </tr>
                        </thead>
                        <tbody className="bg-card divide-y divide-border">
                          <tr>
                            <td className="px-4 py-3 text-sm">June 15, 2025</td>
                            <td className="px-4 py-3 text-sm">Monday</td>
                            <td className="px-4 py-3 text-sm font-medium">Mathematics</td>
                            <td className="px-4 py-3 text-sm">10:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3 text-sm">Main Building, Room 101</td>
                          </tr>
                          <tr className="bg-muted/50">
                            <td className="px-4 py-3 text-sm">June 17, 2025</td>
                            <td className="px-4 py-3 text-sm">Wednesday</td>
                            <td className="px-4 py-3 text-sm font-medium">Science</td>
                            <td className="px-4 py-3 text-sm">10:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3 text-sm">Main Building, Room 101</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm">June 19, 2025</td>
                            <td className="px-4 py-3 text-sm">Friday</td>
                            <td className="px-4 py-3 text-sm font-medium">English</td>
                            <td className="px-4 py-3 text-sm">10:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3 text-sm">Main Building, Room 101</td>
                          </tr>
                          <tr className="bg-muted/50">
                            <td className="px-4 py-3 text-sm">June 21, 2025</td>
                            <td className="px-4 py-3 text-sm">Sunday</td>
                            <td className="px-4 py-3 text-sm font-medium">Social Studies</td>
                            <td className="px-4 py-3 text-sm">10:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3 text-sm">Main Building, Room 101</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm">June 23, 2025</td>
                            <td className="px-4 py-3 text-sm">Tuesday</td>
                            <td className="px-4 py-3 text-sm font-medium">Computer Science</td>
                            <td className="px-4 py-3 text-sm">10:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3 text-sm">Main Building, Room 101</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Final Examination 2025</h3>
                    <div className="rounded-lg border overflow-hidden">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr className="bg-muted">
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Day</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Venue</th>
                          </tr>
                        </thead>
                        <tbody className="bg-card divide-y divide-border">
                          <tr>
                            <td className="px-4 py-3 text-sm">December 5, 2025</td>
                            <td className="px-4 py-3 text-sm">Friday</td>
                            <td className="px-4 py-3 text-sm font-medium">Mathematics</td>
                            <td className="px-4 py-3 text-sm">10:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3 text-sm">Main Building, Room 101</td>
                          </tr>
                          <tr className="bg-muted/50">
                            <td className="px-4 py-3 text-sm">December 7, 2025</td>
                            <td className="px-4 py-3 text-sm">Sunday</td>
                            <td className="px-4 py-3 text-sm font-medium">Science</td>
                            <td className="px-4 py-3 text-sm">10:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3 text-sm">Main Building, Room 101</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm">December 9, 2025</td>
                            <td className="px-4 py-3 text-sm">Tuesday</td>
                            <td className="px-4 py-3 text-sm font-medium">English</td>
                            <td className="px-4 py-3 text-sm">10:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3 text-sm">Main Building, Room 101</td>
                          </tr>
                          <tr className="bg-muted/50">
                            <td className="px-4 py-3 text-sm">December 11, 2025</td>
                            <td className="px-4 py-3 text-sm">Thursday</td>
                            <td className="px-4 py-3 text-sm font-medium">Social Studies</td>
                            <td className="px-4 py-3 text-sm">10:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3 text-sm">Main Building, Room 101</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm">December 13, 2025</td>
                            <td className="px-4 py-3 text-sm">Saturday</td>
                            <td className="px-4 py-3 text-sm font-medium">Computer Science</td>
                            <td className="px-4 py-3 text-sm">10:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3 text-sm">Main Building, Room 101</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Schedule
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Examination Regulations</CardTitle>
                <CardDescription>
                  Rules and regulations for all examinations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">General Rules</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Students must arrive at the examination center at least 30 minutes before the start of the exam</li>
                      <li>Students must bring their valid admit card and school ID for verification</li>
                      <li>Any form of unfair means or malpractice will result in disqualification</li>
                      <li>Students are not allowed to leave the examination hall during the first 30 minutes and the last 15 minutes of the exam</li>
                      <li>Mobile phones, smart watches, and other electronic devices are strictly prohibited in the examination hall</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Stationery and Materials</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Students must bring their own stationery (pens, pencils, erasers, rulers, etc.)</li>
                      <li>Only transparent pencil cases are allowed</li>
                      <li>Scientific calculators are allowed only for specified subjects (Mathematics, Physics, Chemistry)</li>
                      <li>Students are not allowed to share stationery or materials during the examination</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Special Instructions</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Students with special needs should inform the examination department at least two weeks before the examination</li>
                      <li>In case of illness on the day of the examination, a medical certificate must be submitted within 24 hours</li>
                      <li>Students must follow all health and safety protocols as instructed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}