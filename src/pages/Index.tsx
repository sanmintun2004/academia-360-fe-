import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description: "Access a wide range of courses designed by industry experts to enhance your skills."
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from certified professionals with years of experience in their respective fields."
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Earn recognized certificates upon course completion to boost your career prospects."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Enrolled" },
    { number: "500+", label: "Courses Available" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-dashboard-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <GraduationCap className="h-16 w-16 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Academia 360
            </h1>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Transform Your Learning
            <span className="block text-primary">Journey Today</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are advancing their careers through our comprehensive online education platform. Expert-led courses, hands-on projects, and personalized learning paths.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated() ? (
              <Button 
                size="lg" 
                onClick={() => navigate('/dashboard')}
                className="text-lg px-8 py-3"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  className="text-lg px-8 py-3"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/login?admin=true')}
                  className="text-lg px-8 py-3"
                >
                  Admin Access
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Academia 360?
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey with cutting-edge technology and expert guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 shadow-course hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Learn at Your Own Pace
              </h3>
              <div className="space-y-4">
                {[
                  "Self-paced learning with flexible schedules",
                  "Interactive assignments and real-world projects", 
                  "Progress tracking and performance analytics",
                  "Community support and peer collaboration",
                  "Mobile-friendly platform for learning anywhere"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-soft rounded-2xl p-8">
              <div className="text-center">
                <Star className="h-16 w-16 text-primary mx-auto mb-4" />
                <blockquote className="text-lg italic text-foreground mb-4">
                  "Academia 360 transformed my career. The courses are comprehensive and the instructors are world-class. I couldn't be happier with my progress!"
                </blockquote>
                <cite className="text-muted-foreground">
                  — Sarah Johnson, Software Developer
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community of learners and take the first step towards achieving your goals.
          </p>
          {!isAuthenticated() && (
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-3"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
