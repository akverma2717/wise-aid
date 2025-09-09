import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Calendar, DollarSign, Users, ArrowRight } from 'lucide-react';

interface Scholarship {
  id: string;
  title: string;
  summary: string;
  eligibility: string;
  amount: number;
  lastDate: string;
  documentsRequired: string[];
  category: string;
  applicants: number;
}

const mockScholarships: Scholarship[] = [
  {
    id: '1',
    title: 'Merit-Based Excellence Award',
    summary: 'Recognizing outstanding academic achievement and leadership potential in undergraduate students.',
    eligibility: 'Minimum GPA 3.5, enrolled in accredited university, demonstrated leadership experience',
    amount: 2500,
    lastDate: '2025-03-15',
    documentsRequired: ['Academic Transcripts', 'Letter of Recommendation', 'Personal Statement'],
    category: 'Merit-Based',
    applicants: 1250
  },
  {
    id: '2',
    title: 'STEM Innovation Grant',
    summary: 'Supporting students pursuing degrees in Science, Technology, Engineering, and Mathematics.',
    eligibility: 'STEM major, minimum GPA 3.0, research project proposal required',
    amount: 3000,
    lastDate: '2025-04-01',
    documentsRequired: ['Research Proposal', 'Academic Records', 'Faculty Endorsement'],
    category: 'STEM',
    applicants: 890
  },
  {
    id: '3',
    title: 'Community Service Leadership Award',
    summary: 'For students who have demonstrated exceptional commitment to community service and social impact.',
    eligibility: 'Minimum 100 hours community service, leadership role in community organization',
    amount: 1500,
    lastDate: '2025-02-28',
    documentsRequired: ['Service Hours Log', 'Community Leader Reference', 'Impact Essay'],
    category: 'Community Service',
    applicants: 675
  },
  {
    id: '4',
    title: 'Financial Need Assistance Program',
    summary: 'Supporting students from low-income families to pursue higher education opportunities.',
    eligibility: 'Family income below $50,000, enrolled full-time, minimum GPA 2.5',
    amount: 4000,
    lastDate: '2025-05-15',
    documentsRequired: ['Tax Returns', 'FAFSA', 'Financial Hardship Statement'],
    category: 'Need-Based',
    applicants: 2100
  },
  {
    id: '5',
    title: 'Arts and Humanities Excellence Grant',
    summary: 'Celebrating creativity and academic excellence in arts, literature, and humanities.',
    eligibility: 'Arts/Humanities major, portfolio submission, minimum GPA 3.2',
    amount: 2000,
    lastDate: '2025-03-30',
    documentsRequired: ['Portfolio', 'Artist Statement', 'Academic Transcripts'],
    category: 'Arts & Humanities',
    applicants: 445
  },
  {
    id: '6',
    title: 'Entrepreneurship Innovation Fund',
    summary: 'Supporting student entrepreneurs with innovative business ideas and startup potential.',
    eligibility: 'Business plan required, prototype or proof of concept, undergraduate/graduate students',
    amount: 5000,
    lastDate: '2025-04-20',
    documentsRequired: ['Business Plan', 'Prototype Demo', 'Market Analysis'],
    category: 'Entrepreneurship',
    applicants: 320
  }
];

const RecommendScheme = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Merit-Based', 'STEM', 'Community Service', 'Need-Based', 'Arts & Humanities', 'Entrepreneurship'];
  
  const filteredScholarships = mockScholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scholarship.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Discover Scholarships
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect scholarship opportunity to fund your educational journey
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredScholarships.length} scholarship{filteredScholarships.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Scholarship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => {
            const daysLeft = getDaysUntilDeadline(scholarship.lastDate);
            return (
              <Card key={scholarship.id} className="card-interactive h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{scholarship.category}</Badge>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(scholarship.amount)}
                      </p>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{scholarship.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {scholarship.summary}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Deadline: {formatDate(scholarship.lastDate)}</span>
                      {daysLeft > 0 && (
                        <Badge 
                          variant={daysLeft <= 7 ? "destructive" : "secondary"}
                          className="ml-2"
                        >
                          {daysLeft} days left
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{scholarship.applicants.toLocaleString()} applicants</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Required Documents:</h4>
                      <div className="flex flex-wrap gap-1">
                        {scholarship.documentsRequired.slice(0, 2).map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                        {scholarship.documentsRequired.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{scholarship.documentsRequired.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Link to={`/scheme-details/${scholarship.id}`}>
                      <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">No scholarships found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all available scholarships.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendScheme;