import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { Upload, FileText, User, Target, Award } from 'lucide-react';

const SchemeApplication = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.contactNumber || '',
    address: user?.address || '',
    dateOfBirth: '',
    
    // Academic Information
    university: '',
    major: '',
    currentGPA: '',
    expectedGraduation: '',
    
    // Application Essays
    personalStatement: '',
    careerGoals: '',
    leadershipExperience: '',
    communityService: '',
    
    // Documents
    transcript: null as File | null,
    recommendation: null as File | null,
    portfolio: null as File | null,
    
    // Additional Information
    previousScholarships: '',
    specialCircumstances: ''
  });

  const scholarship = {
    title: 'Merit-Based Excellence Award',
    amount: 2500,
    documentsRequired: ['Academic Transcripts', 'Letter of Recommendation', 'Personal Statement', 'Leadership Portfolio']
  };

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateURN = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 100000).toString().padStart(6, '0');
    return `URN-${year}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const urn = generateURN();
      
      toast({
        title: "Application submitted successfully!",
        description: `Your URN is ${urn}. You will receive updates on your application status.`,
      });
      
      navigate('/application-history');
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Academic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="university">University/College</Label>
                <Input
                  id="university"
                  value={formData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">Major/Field of Study</Label>
                <Input
                  id="major"
                  value={formData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentGPA">Current GPA</Label>
                <Input
                  id="currentGPA"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={formData.currentGPA}
                  onChange={(e) => handleInputChange('currentGPA', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedGraduation">Expected Graduation</Label>
                <Input
                  id="expectedGraduation"
                  type="month"
                  value={formData.expectedGraduation}
                  onChange={(e) => handleInputChange('expectedGraduation', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Application Essays</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="personalStatement">Personal Statement (500 words max)</Label>
                <Textarea
                  id="personalStatement"
                  value={formData.personalStatement}
                  onChange={(e) => handleInputChange('personalStatement', e.target.value)}
                  rows={6}
                  placeholder="Tell us about yourself, your goals, and why you deserve this scholarship..."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="careerGoals">Career Goals (300 words max)</Label>
                <Textarea
                  id="careerGoals"
                  value={formData.careerGoals}
                  onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                  rows={4}
                  placeholder="Describe your career aspirations and how this scholarship will help..."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="leadershipExperience">Leadership Experience (300 words max)</Label>
                <Textarea
                  id="leadershipExperience"
                  value={formData.leadershipExperience}
                  onChange={(e) => handleInputChange('leadershipExperience', e.target.value)}
                  rows={4}
                  placeholder="Describe your leadership roles and experiences..."
                  required
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Document Upload</h3>
            </div>
            
            <div className="space-y-4">
              {scholarship.documentsRequired.map((doc, index) => (
                <div key={index} className="space-y-2">
                  <Label>{doc}</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => handleFileChange('transcript', e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="previousScholarships">Previous Scholarships (Optional)</Label>
                <Textarea
                  id="previousScholarships"
                  value={formData.previousScholarships}
                  onChange={(e) => handleInputChange('previousScholarships', e.target.value)}
                  rows={3}
                  placeholder="List any previous scholarships or awards you have received..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialCircumstances">Special Circumstances (Optional)</Label>
                <Textarea
                  id="specialCircumstances"
                  value={formData.specialCircumstances}
                  onChange={(e) => handleInputChange('specialCircumstances', e.target.value)}
                  rows={3}
                  placeholder="Any special circumstances we should consider..."
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Apply for {scholarship.title}
          </h1>
          <p className="text-muted-foreground">
            Complete all sections to submit your application
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="card-elevated mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card className="card-elevated">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep === totalSteps ? (
                  <Button
                    type="submit"
                    className="bg-gradient-primary text-white hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="bg-gradient-primary text-white hover:opacity-90"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchemeApplication;