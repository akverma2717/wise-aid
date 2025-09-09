import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, Eye, Calendar, DollarSign, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Application {
  id: string;
  urn: string;
  scholarshipTitle: string;
  amount: number;
  status: 'PENDING_SAG' | 'REJECTED_BY_SAG' | 'PENDING_FINANCE' | 'REJECTED_BY_FINANCE' | 'PAID';
  appliedDate: string;
  sagRemarks?: string;
  financeRemarks?: string;
  lastUpdated: string;
}

const ApplicationHistory = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  
  // Mock applications data
  const [applications] = useState<Application[]>([
    {
      id: '1',
      urn: 'URN-2025-000123',
      scholarshipTitle: 'Merit-Based Excellence Award',
      amount: 2500,
      status: 'PENDING_FINANCE',
      appliedDate: '2025-01-05',
      sagRemarks: 'Excellent academic record and strong leadership experience. Approved for finance review.',
      lastUpdated: '2025-01-10'
    },
    {
      id: '2',
      urn: 'URN-2025-000124',
      scholarshipTitle: 'STEM Innovation Grant',
      amount: 3000,
      status: 'PENDING_SAG',
      appliedDate: '2025-01-08',
      lastUpdated: '2025-01-08'
    },
    {
      id: '3',
      urn: 'URN-2025-000125',
      scholarshipTitle: 'Community Service Award',
      amount: 1500,
      status: 'PAID',
      appliedDate: '2024-12-15',
      sagRemarks: 'Outstanding community service record.',
      financeRemarks: 'Payment processed successfully.',
      lastUpdated: '2024-12-20'
    },
    {
      id: '4',
      urn: 'URN-2024-000890',
      scholarshipTitle: 'Arts Excellence Grant',
      amount: 2000,
      status: 'REJECTED_BY_SAG',
      appliedDate: '2024-11-20',
      sagRemarks: 'Portfolio does not meet the required standards. Please improve your work and reapply next year.',
      lastUpdated: '2024-11-25'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING_SAG':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'PENDING_FINANCE':
        return <Clock className="h-4 w-4 text-primary" />;
      case 'PAID':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'REJECTED_BY_SAG':
      case 'REJECTED_BY_FINANCE':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING_SAG':
        return <Badge className="status-pending">Under SAG Review</Badge>;
      case 'PENDING_FINANCE':
        return <Badge className="status-pending">Finance Processing</Badge>;
      case 'PAID':
        return <Badge className="status-paid">Disbursed</Badge>;
      case 'REJECTED_BY_SAG':
        return <Badge className="status-rejected">SAG Rejected</Badge>;
      case 'REJECTED_BY_FINANCE':
        return <Badge className="status-rejected">Finance Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.scholarshipTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.urn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Simulate real-time updates (in real app this would be Socket.io)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate receiving status updates
      console.log('Checking for application updates...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'PENDING_SAG', label: 'Under SAG Review' },
    { value: 'PENDING_FINANCE', label: 'Finance Processing' },
    { value: 'PAID', label: 'Disbursed' },
    { value: 'REJECTED_BY_SAG', label: 'SAG Rejected' },
    { value: 'REJECTED_BY_FINANCE', label: 'Finance Rejected' }
  ];

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Application History
          </h1>
          <p className="text-muted-foreground">
            Track the status of all your scholarship applications
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by scholarship name or URN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredApplications.length} of {applications.length} applications
          </p>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="card-interactive">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(application.status)}
                      <h3 className="text-lg font-semibold text-foreground">
                        {application.scholarshipTitle}
                      </h3>
                      {getStatusBadge(application.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">URN:</span>
                        <span className="font-mono">{application.urn}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Applied: {formatDate(application.appliedDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Amount: {formatCurrency(application.amount)}</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Last updated: {formatDate(application.lastUpdated)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{application.scholarshipTitle}</DialogTitle>
                          <DialogDescription>
                            Application Details - URN: {application.urn}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium mb-1">Status</p>
                              {getStatusBadge(application.status)}
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Amount</p>
                              <p className="text-lg font-semibold text-primary">
                                {formatCurrency(application.amount)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium mb-1">Applied Date</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(application.appliedDate)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Last Updated</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(application.lastUpdated)}
                              </p>
                            </div>
                          </div>

                          {application.sagRemarks && (
                            <div>
                              <p className="text-sm font-medium mb-2">SAG Bureau Remarks</p>
                              <div className="bg-muted p-3 rounded-lg">
                                <p className="text-sm">{application.sagRemarks}</p>
                              </div>
                            </div>
                          )}

                          {application.financeRemarks && (
                            <div>
                              <p className="text-sm font-medium mb-2">Finance Bureau Remarks</p>
                              <div className="bg-muted p-3 rounded-lg">
                                <p className="text-sm">{application.financeRemarks}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">No applications found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search criteria.' 
                : "You haven't submitted any applications yet."}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button className="bg-gradient-primary text-white hover:opacity-90">
                Browse Scholarships
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationHistory;