import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabase/client';
import { projectId } from './utils/supabase/info';
import { AuthPage } from './components/AuthPage';
import { StudentDashboard } from './components/StudentDashboard';
import { CompanyDashboard } from './components/CompanyDashboard';
import { CollegeDashboard } from './components/CollegeDashboard';
import { Button } from './components/ui/button';
import { LogOut, Users, Building2, GraduationCap } from 'lucide-react';

interface User {
  id: string;
  email: string;
  role: 'student' | 'company' | 'college';
  profile?: any;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Fetch user profile to determine role
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/profile`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        });
        
        if (response.ok) {
          const profile = await response.json();
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: profile.role,
            profile: profile
          });
        }
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  const getDashboardComponent = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'company':
        return <CompanyDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'college':
        return <CollegeDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <div>Invalid role</div>;
    }
  };

  const getRoleIcon = () => {
    switch (user.role) {
      case 'student':
        return <GraduationCap className="h-5 w-5" />;
      case 'company':
        return <Building2 className="h-5 w-5" />;
      case 'college':
        return <Users className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {getRoleIcon()}
                <h1 className="text-xl font-semibold text-gray-900">
                  Placement Portal
                </h1>
              </div>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                {user.role}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user.profile?.name || user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {getDashboardComponent()}
      </main>
    </div>
  );
}