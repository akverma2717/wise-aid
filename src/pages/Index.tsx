import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { GraduationCap, Users, Award, TrendingUp, ArrowRight, CheckCircle, Star, Globe } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Award,
      title: 'Merit-Based Awards',
      description: 'Recognition for academic excellence and leadership achievements',
      color: 'bg-primary'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Tracking',
      description: 'Live updates on your application status and progress',
      color: 'bg-success'
    },
    {
      icon: Globe,
      title: 'Easy Application',
      description: 'Streamlined process with document upload and progress tracking',
      color: 'bg-warning'
    },
    {
      icon: Users,
      title: 'Expert Review',
      description: 'Professional evaluation by SAG and Finance bureaus',
      color: 'bg-destructive'
    }
  ];

  const stats = [
    { label: 'Active Scholarships', value: '50+' },
    { label: 'Students Helped', value: '10K+' },
    { label: 'Total Disbursed', value: '$2.5M+' },
    { label: 'Success Rate', value: '85%' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science Student',
      quote: 'EduGrant Pro made the scholarship application process so simple. I received my STEM grant in just 2 weeks!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Engineering Student',
      quote: 'The real-time tracking feature kept me informed every step of the way. Outstanding platform!',
      rating: 5
    }
  ];

  return (
    <div className="page-container">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary shadow-strong">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Unlock Your Educational
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Future</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            EduGrant Pro connects ambitious students with scholarship opportunities. 
            Apply, track, and receive funding through our streamlined platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90 px-8">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/recommend-schemes">
                  <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90 px-8">
                    Browse Scholarships
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose EduGrant Pro?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform simplifies the scholarship process with modern tools and expert support
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="card-interactive text-center">
              <CardHeader>
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get funded in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Browse & Apply', description: 'Find scholarships that match your profile and submit applications with required documents.' },
              { step: '2', title: 'Expert Review', description: 'Our SAG and Finance bureaus review your application with professional evaluation.' },
              { step: '3', title: 'Get Funded', description: 'Receive your scholarship funds directly and track everything in real-time.' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Student Success Stories
          </h2>
          <p className="text-xl text-muted-foreground">
            See how EduGrant Pro has helped students achieve their dreams
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-warning fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully received scholarships through EduGrant Pro
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8">
                Create Account
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-white border-white hover:bg-white hover:text-primary">
                Browse Scholarships
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">EduGrant Pro</span>
          </div>
          <p className="text-background/70">
            © 2025 EduGrant Pro. Empowering students through accessible education funding.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
