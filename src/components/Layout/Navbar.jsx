import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { 
  GraduationCap, 
  LogOut, 
  User, 
  Settings,
  BookOpen,
  Users,
  MessageSquare
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Navbar = () => {
  const { user, userType, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-nav-background border-b border-nav-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-primary">
              <GraduationCap className="h-8 w-8" />
              <span className="font-bold text-xl">Academia 360</span>
            </Link>
            
            {isAuthenticated() && (
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/courses"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Courses</span>
                </Link>
                
                {isAdmin() && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                    <Link
                      to="/admin/users"
                      className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                    >
                      <Users className="h-4 w-4" />
                      <span>Users</span>
                    </Link>
                  </>
                )}
                
                <Link
                  to="/announcements"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Announcements</span>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated() ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user?.name || user?.username || 'User'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-2">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/login?admin=true')}>
                  Admin Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
