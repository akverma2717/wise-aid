import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, FileText, Clock, DollarSign, TrendingUp, Award } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Applications Submitted', value: '3', icon: FileText, color: 'bg-primary' },
    { title: 'Pending Review', value: '2', icon: Clock, color: 'bg-warning' },
    { title: 'Approved', value: '1', icon: Award, color: 'bg-success' },
    { title: 'Total Awarded', value: '$5,000', icon: DollarSign, color: 'bg-primary' }
  ];

  const recentApplications = [
    {
      id: 'URN-2025-000123',
      scholarship: 'Merit-Based Excellence Award',
      amount: '$2,500',
      status: 'PENDING_FINANCE',
      appliedDate: '2025-01-05'
    },
    {
      id: 'URN-2025-000124',
      scholarship: 'STEM Innovation Grant',
      amount: '$3,000',
      status: 'PENDING_SAG',
      appliedDate: '2025-01-08'
    },
    {
      id: 'URN-2025-000125',
      scholarship: 'Community Service Award',
      amount: '$1,500',
      status: 'PAID',
      appliedDate: '2024-12-15'
    }
  ];

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

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.fullName}!
          </h1>
          <p className="text-muted-foreground">
            Track your scholarship applications and discover new opportunities.
          </p>
        </div>

        {/* Quick Stats */}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                  Get started with these common tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/recommend-schemes">
                  <Button className="w-full justify-start bg-gradient-primary text-white hover:opacity-90">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Browse Scholarships
                  </Button>
                </Link>
                <Link to="/application-history">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    View Applications
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  Track the status of your scholarship applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground">{app.scholarship}</h4>
                          {getStatusBadge(app.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">URN: {app.id}</p>
                        <p className="text-sm text-muted-foreground">Applied: {app.appliedDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{app.amount}</p>
                        <Link to={`/application-history`}>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <Link to="/application-history">
                      <Button variant="outline">View All Applications</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;