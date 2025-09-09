import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, DollarSign, Users, FileText, CheckCircle, Clock } from 'lucide-react';

const SchemeDetails = () => {
  const { id } = useParams();
  
  // Mock scholarship data - in real app this would come from API
  const scholarship = {
    id: '1',
    title: 'Merit-Based Excellence Award',
    summary: 'Recognizing outstanding academic achievement and leadership potential in undergraduate students pursuing various fields of study.',
    description: 'The Merit-Based Excellence Award is designed to support exceptional students who have demonstrated outstanding academic performance, leadership skills, and commitment to their field of study. This prestigious scholarship recognizes students who not only excel in their coursework but also contribute positively to their communities and demonstrate the potential to make significant contributions to their chosen profession.',
    eligibility: 'Minimum GPA 3.5, enrolled in accredited university, demonstrated leadership experience',
    detailedEligibility: [
      'Must be enrolled full-time in an accredited undergraduate program',
      'Minimum cumulative GPA of 3.5 on a 4.0 scale',
      'Demonstrated leadership experience in academic, community, or professional settings',
      'U.S. citizen or permanent resident',
      'Must not have received this award previously'
    ],
    amount: 2500,
    lastDate: '2025-03-15',
    documentsRequired: ['Academic Transcripts', 'Letter of Recommendation', 'Personal Statement', 'Leadership Portfolio'],
    category: 'Merit-Based',
    applicants: 1250,
    selectionCriteria: [
      'Academic Excellence (40%)',
      'Leadership Experience (30%)',
      'Personal Statement Quality (20%)',
      'Community Impact (10%)'
    ],
    timeline: [
      { phase: 'Application Deadline', date: '2025-03-15', status: 'upcoming' },
      { phase: 'Initial Review', date: '2025-03-30', status: 'upcoming' },
      { phase: 'Finalist Selection', date: '2025-04-15', status: 'upcoming' },
      { phase: 'Award Notification', date: '2025-05-01', status: 'upcoming' }
    ]
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
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilDeadline = (dateString: string) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline(scholarship.lastDate);

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/recommend-schemes">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Scholarships
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="card-elevated">
              <CardHeader>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">{scholarship.category}</Badge>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">
                        {formatCurrency(scholarship.amount)}
                      </p>
                      <p className="text-sm text-muted-foreground">Award Amount</p>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-3xl mb-2">{scholarship.title}</CardTitle>
                    <CardDescription className="text-lg">{scholarship.summary}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Description */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>About This Scholarship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {scholarship.description}
                </p>
              </CardContent>
            </Card>

            {/* Eligibility Requirements */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Eligibility Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scholarship.detailedEligibility.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Selection Criteria */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Selection Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scholarship.selectionCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{criteria.split(' (')[0]}</span>
                      <Badge variant="outline">{criteria.match(/\(([^)]+)\)/)[1]}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scholarship.timeline.map((phase, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{phase.phase}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(phase.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Quick Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Application Deadline</p>
                    <p className="text-sm text-muted-foreground">{formatDate(scholarship.lastDate)}</p>
                    {daysLeft > 0 && (
                      <Badge variant={daysLeft <= 7 ? "destructive" : "secondary"} className="mt-1">
                        {daysLeft} days remaining
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Total Applicants</p>
                    <p className="text-sm text-muted-foreground">{scholarship.applicants.toLocaleString()}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Award Amount</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(scholarship.amount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scholarship.documentsRequired.map((doc, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Apply Button */}
            <Card className="card-elevated">
              <CardContent className="pt-6">
                <Link to={`/scheme-application/${scholarship.id}`}>
                  <Button 
                    className="w-full bg-gradient-primary text-white hover:opacity-90" 
                    size="lg"
                    disabled={daysLeft <= 0}
                  >
                    {daysLeft <= 0 ? 'Application Closed' : 'Apply Now'}
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Make sure you have all required documents ready
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;