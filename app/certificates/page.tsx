import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, FileText, Search, Download, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certificate Management',
  description: 'Manage and request educational certificates',
};

export default async function CertificatesPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Certificate Management</h1>
            <p className="text-muted-foreground">
              Request, track, and manage your educational certificates.
            </p>
          </div>
          <Button asChild>
            <Link href="/certificates/request">Request New Certificate</Link>
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certificates">My Certificates</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">JSC Certificate</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Junior School Certificate</div>
                  <p className="text-xs text-muted-foreground">
                    For students who have completed junior secondary education
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/certificates/request?type=JSC">
                      Request Certificate
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">SSC Certificate</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Secondary School Certificate</div>
                  <p className="text-xs text-muted-foreground">
                    For students who have completed secondary education
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/certificates/request?type=SSC">
                      Request Certificate
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">How It Works</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Request Certificate</p>
                      <p className="text-xs text-muted-foreground">
                        Complete the certificate request form
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pay Processing Fee</p>
                      <p className="text-xs text-muted-foreground">
                        Complete the payment for certificate processing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Track Status</p>
                      <p className="text-xs text-muted-foreground">
                        Monitor your certificate status in the dashboard
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">4</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Receive Certificate</p>
                      <p className="text-xs text-muted-foreground">
                        Download your digital certificate once approved
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Certificate Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">Pending</span>
                      </div>
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Processing</span>
                      </div>
                      <span className="text-sm font-bold">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Issued</span>
                      </div>
                      <span className="text-sm font-bold">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Certificate Verification</CardTitle>
                  <CardDescription>
                    Verify the authenticity of certificates issued by the institution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      Each certificate issued by our institution contains a unique verification code. 
                      Use the code to verify the authenticity of the certificate.
                    </p>
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Enter verification code"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <Button>
                        <Search className="mr-2 h-4 w-4" />
                        Verify
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="certificates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Certificates</CardTitle>
                <CardDescription>
                  Manage your requested and issued certificates
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
                    <div className="grid grid-cols-5 p-4 items-center">
                      <div>JSC</div>
                      <div>May 15, 2025</div>
                      <div>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 border-yellow-300">
                          Pending
                        </div>
                      </div>
                      <div>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-300">
                          Paid
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 p-4 items-center">
                      <div>SSC</div>
                      <div>April 20, 2025</div>
                      <div>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-300">
                          Issued
                        </div>
                      </div>
                      <div>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-300">
                          Paid
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Preview</CardTitle>
                  <CardDescription>
                    Preview your issued certificates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border bg-muted p-6 text-center">
                    <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-lg">Secondary School Certificate</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Select a certificate to preview it here. You can download the certificate 
                      in PDF format for printing or sharing.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Details</CardTitle>
                  <CardDescription>
                    Information about the selected certificate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Type</p>
                      <p className="text-sm">Secondary School Certificate (SSC)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Certificate ID</p>
                      <p className="text-sm">SSC-2025-001234</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Issue Date</p>
                      <p className="text-sm">April 25, 2025</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Verification Code</p>
                      <p className="text-sm">VER-26578-SSC-2025</p>
                    </div>
                    <div className="pt-2">
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="verification" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Verification</CardTitle>
                <CardDescription>
                  Verify the authenticity of educational certificates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p className="text-sm">
                    Enter the verification code found on the certificate to verify its authenticity. 
                    Each certificate issued by our institution contains a unique verification code.
                  </p>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter verification code (e.g., VER-12345-JSC-2025)"
                      className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button>Verify Certificate</Button>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Certificate is Valid</h3>
                      <p className="text-sm text-muted-foreground">
                        This certificate has been verified as authentic and was issued by our institution.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Certificate Type</p>
                          <p className="text-sm">Secondary School Certificate (SSC)</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Student Name</p>
                          <p className="text-sm">John Smith</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Issue Date</p>
                          <p className="text-sm">April 25, 2025</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Certificate ID</p>
                          <p className="text-sm">SSC-2025-001234</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Verification Instructions</CardTitle>
                <CardDescription>
                  How to use the certificate verification system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Locate the Verification Code</p>
                      <p className="text-xs text-muted-foreground">
                        Find the unique verification code on the certificate. It is usually located at the 
                        bottom of the certificate and starts with "VER-".
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Enter the Code</p>
                      <p className="text-xs text-muted-foreground">
                        Enter the complete verification code in the input field above.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Verify the Certificate</p>
                      <p className="text-xs text-muted-foreground">
                        Click the "Verify Certificate" button to check the authenticity of the certificate.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">4</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">View the Results</p>
                      <p className="text-xs text-muted-foreground">
                        The system will display the verification results along with certificate details if valid.
                      </p>
                    </div>
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