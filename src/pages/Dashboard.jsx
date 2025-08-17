import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { coursesAPI, announcementsAPI } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Users, 
  TrendingUp,
  Bell,
  Play,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const { user, userType } = useAuth();
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesResponse, announcementsResponse] = await Promise.all([
        coursesAPI.getCourses(0),
        announcementsAPI.getAnnouncements()
      ]);
      
      setCourses(coursesResponse.data?.content || coursesResponse.data || []);
      setAnnouncements(announcementsResponse.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dashboard-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-background">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name || user?.username || 'Student'}!
          </h1>
          <p className="text-muted-foreground">
            {userType === 'admin' ? 
              'Manage courses, users, and platform content from your admin dashboard.' :
              'Continue your learning journey and explore new courses.'
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userType === 'admin' ? 'Total Students' : 'Enrolled Courses'}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userType === 'admin' ? '245' : '12'}
              </div>
              <p className="text-xs text-muted-foreground">
                {userType === 'admin' ? '+15 this month' : '+3 this month'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userType === 'admin' ? '1,234' : '42'}
              </div>
              <p className="text-xs text-muted-foreground">
                +8 hours this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{userType === 'admin' ? 'Recent Courses' : 'Continue Learning'}</span>
                </CardTitle>
                <CardDescription>
                  {userType === 'admin' ? 
                    'Latest courses added to the platform' :
                    'Pick up where you left off'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.slice(0, 5).map((course, index) => (
                  <div key={course.id || index} className="flex items-center space-x-4 p-4 rounded-lg bg-course-card hover:bg-course-card-hover transition-colors">
                    <div className="w-12 h-12 bg-primary-soft rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground">
                        {course.title || course.name || `Course ${index + 1}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {course.description || 'No description available'}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {course.level || 'Beginner'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {course.duration || '4 weeks'}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Play className="h-4 w-4 mr-1" />
                      {userType === 'admin' ? 'Manage' : 'Continue'}
                    </Button>
                  </div>
                ))}
                {courses.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No courses available yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Announcements */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Announcements</span>
                </CardTitle>
                <CardDescription>
                  Latest updates and news
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {announcements.slice(0, 4).map((announcement, index) => (
                  <div key={announcement.id || index} className="p-4 rounded-lg bg-muted">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-4 w-4 mt-1 text-primary" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-card-foreground">
                          {announcement.title || `Announcement ${index + 1}`}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {announcement.content || announcement.message || 'No content available'}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {announcement.date || 'Today'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {announcements.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No announcements yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
