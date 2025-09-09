import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { FileText, Clock, CheckCircle, XCircle, User, Calendar, DollarSign, Eye } from 'lucide-react';

interface Application {
  id: string;
  urn: string;
  scholarshipTitle: string;
  studentName: string;
  studentEmail: string;
  amount: number;
  status: string;
  appliedDate: string;
  gpa: string;
  personalStatement: string;
  documents: string[];
}

const SagDashboard = () => {
  const { user } = useAuth();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [remarks, setRemarks] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock applications data
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      urn: 'URN-2025-000124',
      scholarshipTitle: 'STEM Innovation Grant',
      studentName: 'John Doe',
      studentEmail: 'john@student.com',
      amount: 3000,
      status: 'PENDING_SAG',
      appliedDate: '2025-01-08',
      gpa: '3.85',
      personalStatement: 'I am passionate about artificial intelligence and machine learning. My goal is to develop AI solutions that can help solve environmental challenges...',
      documents: ['transcript.pdf', 'recommendation.pdf', 'research_proposal.pdf']
    },
    {
      id: '2',
      urn: 'URN-2025-000125',
      scholarshipTitle: 'Community Service Award',
      studentName: 'Sarah Johnson',
      studentEmail: 'sarah@student.com',
      amount: 1500,
      status: 'PENDING_SAG',
      appliedDate: '2025-01-09',
      gpa: '3.65',
      personalStatement: 'Through my volunteer work at local food banks and environmental cleanup projects, I have learned the importance of giving back to the community...',
      documents: ['transcript.pdf', 'service_log.pdf', 'impact_essay.pdf']
    },
    {
      id: '3',
      urn: 'URN-2025-000120',
      scholarshipTitle: 'Merit-Based Excellence Award',
      studentName: 'Michael Chen',
      studentEmail: 'michael@student.com',
      amount: 2500,
      status: 'APPROVED_BY_SAG',
      appliedDate: '2025-01-05',
      gpa: '3.95',
      personalStatement: 'Academic excellence has always been my priority, but I believe true leadership comes from inspiring others to achieve their best...',
      documents: ['transcript.pdf', 'recommendation.pdf', 'leadership_portfolio.pdf']
    }
  ]);

  const pendingApplications = applications.filter(app => app.status === 'PENDING_SAG');
  const approvedApplications = applications.filter(app => app.status === 'APPROVED_BY_SAG');
  const rejectedApplications = applications.filter(app => app.status === 'REJECTED_BY_SAG');

  const stats = [
    { title: 'Pending Review', value: pendingApplications.length.toString(), icon: Clock, color: 'bg-warning' },
    { title: 'Approved', value: approvedApplications.length.toString(), icon: CheckCircle, color: 'bg-success' },
    { title: 'Rejected', value: rejectedApplications.length.toString(), icon: XCircle, color: 'bg-destructive' },
    { title: 'Total Applications', value: applications.length.toString(), icon: FileText, color: 'bg-primary' }
  ];

  const handleApprove = async (applicationId: string) => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setApplications(prev => prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: 'APPROVED_BY_SAG', sagRemarks: remarks }
          : app
      ));

      toast({
        title: "Application approved",
        description: "The application has been forwarded to Finance Bureau for processing.",
      });

      setRemarks('');
      setSelectedApplication(null);
      
      // In real app, this would emit a socket event
      console.log('Emitting application:approvedBySAG event');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (applicationId: string) => {
    if (!remarks.trim()) {
      toast({
        title: "Remarks required",
        description: "Please provide remarks before rejecting the application.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setApplications(prev => prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: 'REJECTED_BY_SAG', sagRemarks: remarks }
          : app
      ));

      toast({
        title: "Application rejected",
        description: "The student has been notified with your remarks.",
      });

      setRemarks('');
      setSelectedApplication(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const ApplicationCard = ({ application }: { application: Application }) => (
    <Card className="card-interactive">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {application.scholarshipTitle}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{application.studentName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(application.appliedDate)}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">URN: {application.urn}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-primary">{formatCurrency(application.amount)}</p>
            <p className="text-sm text-muted-foreground">GPA: {application.gpa}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            {application.documents.length} documents uploaded
          </Badge>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                <Eye className="h-4 w-4 mr-2" />
                Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{application.scholarshipTitle}</DialogTitle>
                <DialogDescription>
                  Application Review - URN: {application.urn}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Student Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Student Information</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Name:</span> {application.studentName}</p>
                      <p><span className="font-medium">Email:</span> {application.studentEmail}</p>
                      <p><span className="font-medium">GPA:</span> {application.gpa}</p>
                      <p><span className="font-medium">Applied:</span> {formatDate(application.appliedDate)}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Scholarship Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Title:</span> {application.scholarshipTitle}</p>
                      <p><span className="font-medium">Amount:</span> {formatCurrency(application.amount)}</p>
                      <p><span className="font-medium">URN:</span> {application.urn}</p>
                    </div>
                  </div>
                </div>

                {/* Personal Statement */}
                <div>
                  <h4 className="font-medium mb-2">Personal Statement</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">{application.personalStatement}</p>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="font-medium mb-2">Uploaded Documents</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {application.documents.map((doc, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 border border-border rounded">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doc}</span>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decision Section */}
                {application.status === 'PENDING_SAG' && (
                  <div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="remarks">Remarks</Label>
                        <Textarea
                          id="remarks"
                          placeholder="Enter your remarks for this application..."
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          rows={4}
                        />
                      </div>
                      
                      <div className="flex space-x-4">
                        <Button
                          onClick={() => handleApprove(application.id)}
                          disabled={isProcessing}
                          className="bg-success text-white hover:bg-success/90"
                        >
                          {isProcessing ? 'Processing...' : 'Approve'}
                        </Button>
                        <Button
                          onClick={() => handleReject(application.id)}
                          disabled={isProcessing}
                          variant="destructive"
                        >
                          {isProcessing ? 'Processing...' : 'Reject'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            SAG Bureau Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.fullName}. Review and process scholarship applications.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-interactive">
              <CardContent className="flex items-center p-6">
                <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applications Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Review ({pendingApplications.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedApplications.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingApplications.length > 0 ? (
              pendingApplications.map(application => (
                <ApplicationCard key={application.id} application={application} />
              ))
            ) : (
              <Card className="card-elevated">
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">No pending applications</h3>
                  <p className="text-muted-foreground">All applications have been reviewed.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="approved" className="space-y-4">
            {approvedApplications.length > 0 ? (
              approvedApplications.map(application => (
                <ApplicationCard key={application.id} application={application} />
              ))
            ) : (
              <Card className="card-elevated">
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">No approved applications</h3>
                  <p className="text-muted-foreground">Approved applications will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="rejected" className="space-y-4">
            {rejectedApplications.length > 0 ? (
              rejectedApplications.map(application => (
                <ApplicationCard key={application.id} application={application} />
              ))
            ) : (
              <Card className="card-elevated">
                <CardContent className="text-center py-12">
                  <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">No rejected applications</h3>
                  <p className="text-muted-foreground">Rejected applications will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SagDashboard;