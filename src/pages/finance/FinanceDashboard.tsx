import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { DollarSign, Clock, CheckCircle, XCircle, User, Calendar, CreditCard, Eye, Banknote } from 'lucide-react';

interface Application {
  id: string;
  urn: string;
  scholarshipTitle: string;
  studentName: string;
  studentEmail: string;
  amount: number;
  status: string;
  appliedDate: string;
  sagRemarks: string;
  financeRemarks?: string;
}

const FinanceDashboard = () => {
  const { user } = useAuth();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [remarks, setRemarks] = useState('');
  const [disbursalAmount, setDisbursalAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Mock applications data
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      urn: 'URN-2025-000123',
      scholarshipTitle: 'Merit-Based Excellence Award',
      studentName: 'Michael Chen',
      studentEmail: 'michael@student.com',
      amount: 2500,
      status: 'PENDING_FINANCE',
      appliedDate: '2025-01-05',
      sagRemarks: 'Excellent academic record and strong leadership experience. Approved for finance review.'
    },
    {
      id: '2',
      urn: 'URN-2025-000126',
      scholarshipTitle: 'STEM Innovation Grant',
      studentName: 'Emily Rodriguez',
      studentEmail: 'emily@student.com',
      amount: 3000,
      status: 'PENDING_FINANCE',
      appliedDate: '2025-01-07',
      sagRemarks: 'Outstanding research proposal and academic performance. Strong candidate for STEM funding.'
    },
    {
      id: '3',
      urn: 'URN-2025-000100',
      scholarshipTitle: 'Community Service Award',
      studentName: 'David Park',
      studentEmail: 'david@student.com',
      amount: 1500,
      status: 'PAID',
      appliedDate: '2024-12-15',
      sagRemarks: 'Outstanding community service record.',
      financeRemarks: 'Payment processed successfully via ACH transfer.'
    }
  ]);

  const pendingApplications = applications.filter(app => app.status === 'PENDING_FINANCE');
  const paidApplications = applications.filter(app => app.status === 'PAID');
  const rejectedApplications = applications.filter(app => app.status === 'REJECTED_BY_FINANCE');

  const stats = [
    { title: 'Pending Payment', value: pendingApplications.length.toString(), icon: Clock, color: 'bg-warning' },
    { title: 'Disbursed', value: paidApplications.length.toString(), icon: CheckCircle, color: 'bg-success' },
    { title: 'Rejected', value: rejectedApplications.length.toString(), icon: XCircle, color: 'bg-destructive' },
    { title: 'Total Value', value: `$${(paidApplications.reduce((sum, app) => sum + app.amount, 0)).toLocaleString()}`, icon: DollarSign, color: 'bg-primary' }
  ];

  const handleTransferMoney = (application: Application) => {
    setSelectedApplication(application);
    setDisbursalAmount(application.amount.toString());
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    if (!selectedApplication) return;

    setIsProcessing(true);
    try {
      // Simulate Stripe payment process
      await new Promise(resolve => setTimeout(resolve, 2000));

      setApplications(prev => prev.map(app => 
        app.id === selectedApplication.id 
          ? { 
              ...app, 
              status: 'PAID', 
              financeRemarks: remarks || 'Payment processed successfully.',
              amount: parseInt(disbursalAmount)
            }
          : app
      ));

      toast({
        title: "Payment processed successfully",
        description: `$${disbursalAmount} has been transferred to ${selectedApplication.studentName}.`,
      });

      setRemarks('');
      setDisbursalAmount('');
      setSelectedApplication(null);
      setShowPaymentModal(false);
      
      // In real app, this would emit a socket event
      console.log('Emitting application:paid event');
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Failed to process payment. Please try again.",
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
          ? { ...app, status: 'REJECTED_BY_FINANCE', financeRemarks: remarks }
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
            <p className="text-2xl font-bold text-primary">{formatCurrency(application.amount)}</p>
            {application.status === 'PAID' && (
              <Badge className="status-paid mt-2">Disbursed</Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <p><strong>SAG Remarks:</strong> {application.sagRemarks}</p>
          </div>
          
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{application.scholarshipTitle}</DialogTitle>
                  <DialogDescription>
                    Finance Review - URN: {application.urn}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Application Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Student Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Name:</span> {application.studentName}</p>
                        <p><span className="font-medium">Email:</span> {application.studentEmail}</p>
                        <p><span className="font-medium">Applied:</span> {formatDate(application.appliedDate)}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Financial Details</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Scholarship:</span> {application.scholarshipTitle}</p>
                        <p><span className="font-medium">Amount:</span> {formatCurrency(application.amount)}</p>
                        <p><span className="font-medium">Status:</span> 
                          <Badge className="ml-2">{application.status.replace('_', ' ')}</Badge>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SAG Remarks */}
                  <div>
                    <h4 className="font-medium mb-2">SAG Bureau Approval</h4>
                    <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
                      <p className="text-sm">{application.sagRemarks}</p>
                    </div>
                  </div>

                  {/* Finance Actions */}
                  {application.status === 'PENDING_FINANCE' && (
                    <div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="remarks">Finance Remarks</Label>
                          <Textarea
                            id="remarks"
                            placeholder="Enter your remarks for this application..."
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            rows={3}
                          />
                        </div>
                        
                        <div className="flex space-x-4">
                          <Button
                            onClick={() => handleTransferMoney(application)}
                            disabled={isProcessing}
                            className="bg-success text-white hover:bg-success/90"
                          >
                            <Banknote className="mr-2 h-4 w-4" />
                            Transfer Money
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

                  {/* Finance Remarks (if paid or rejected) */}
                  {application.financeRemarks && (
                    <div>
                      <h4 className="font-medium mb-2">Finance Bureau Remarks</h4>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm">{application.financeRemarks}</p>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {application.status === 'PENDING_FINANCE' && (
              <Button
                onClick={() => handleTransferMoney(application)}
                className="bg-primary text-white hover:bg-primary/90"
                size="sm"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Transfer
              </Button>
            )}
          </div>
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
            Finance Bureau Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.fullName}. Process approved applications and manage disbursals.
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
            <TabsTrigger value="pending">Pending Payment ({pendingApplications.length})</TabsTrigger>
            <TabsTrigger value="paid">Disbursed ({paidApplications.length})</TabsTrigger>
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
                  <h3 className="text-xl font-medium text-foreground mb-2">No pending payments</h3>
                  <p className="text-muted-foreground">All approved applications have been processed.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="paid" className="space-y-4">
            {paidApplications.length > 0 ? (
              paidApplications.map(application => (
                <ApplicationCard key={application.id} application={application} />
              ))
            ) : (
              <Card className="card-elevated">
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">No disbursed payments</h3>
                  <p className="text-muted-foreground">Completed payments will appear here.</p>
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

        {/* Payment Processing Modal */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Process Payment</DialogTitle>
              <DialogDescription>
                Confirm payment details for {selectedApplication?.studentName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    value={selectedApplication?.studentName || ''}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Disbursal Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={disbursalAmount}
                    onChange={(e) => setDisbursalAmount(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="paymentRemarks">Payment Remarks</Label>
                <Textarea
                  id="paymentRemarks"
                  placeholder="Enter payment processing remarks..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentModal(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={processPayment}
                  disabled={isProcessing || !disbursalAmount}
                  className="bg-success text-white hover:bg-success/90"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Transfer $${disbursalAmount}`
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FinanceDashboard;