import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { GraduationCap, Building2, Users, Mail, Lock, User } from 'lucide-react';



interface AuthPageProps {
  onAuthSuccess: (user: any) => void;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Test server connectivity on component mount
  useEffect(() => {
    const testServerConnectivity = async () => {
      try {
        console.log('Testing server connectivity...');
        console.log('Project ID for health check:', projectId);
        
        if (!projectId) {
          console.error('Project ID not available for health check');
          return;
        }
        
        const healthUrl = `https://${projectId}.supabase.co/functions/v1/make-server-013e6437/health`;
        console.log('Health check URL:', healthUrl);
        
        const response = await fetch(healthUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Health check response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Server is reachable:', data);
        } else {
          const errorText = await response.text();
          console.warn('Server health check failed:', response.status, errorText);
        }
      } catch (error) {
        console.error('Server connectivity test failed:', error);
        console.error('This might indicate a network issue or server is not running');
      }
    };
    
    testServerConnectivity();
  }, []);
  
  // Sign In State
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    role: '',
    name: '',
    // Student specific
    rollNumber: '',
    batch: '',
    branch: '',
    cgpa: '',
    skills: '',
    // Company specific
    companyName: '',
    industry: '',
    website: '',
    description: '',
    // College specific
    collegeName: '',
    code: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting sign in for:', signInData.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      if (error) {
        console.error('Supabase sign in error:', error);
        setError(error.message);
        return;
      }

      console.log('Sign in successful, fetching profile...');

      // Fetch user profile
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/profile`, {
        headers: {
          'Authorization': `Bearer ${data.session.access_token}`,
        },
      });

      console.log('Profile fetch response status:', response.status);

      if (response.ok) {
        const profile = await response.json();
        console.log('Profile loaded:', profile);
        onAuthSuccess({
          id: data.user.id,
          email: data.user.email!,
          role: profile.role,
          profile: profile
        });
      } else {
        const errorText = await response.text();
        console.error('Failed to load profile:', errorText);
        setError('Failed to load user profile');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setError('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        setError('An error occurred during sign in: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!signUpData.email || !signUpData.password || !signUpData.name) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!signUpData.role) {
      setError('Please select a role');
      setLoading(false);
      return;
    }

    if (signUpData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Role-specific validation
    if (signUpData.role === 'student') {
      if (!signUpData.rollNumber || !signUpData.batch || !signUpData.branch || !signUpData.cgpa) {
        setError('Please fill in all required student fields');
        setLoading(false);
        return;
      }
    } else if (signUpData.role === 'company') {
      if (!signUpData.companyName || !signUpData.industry) {
        setError('Please fill in all required company fields');
        setLoading(false);
        return;
      }
    } else if (signUpData.role === 'college') {
      if (!signUpData.collegeName || !signUpData.code) {
        setError('Please fill in all required college fields');
        setLoading(false);
        return;
      }
    }

    try {
      console.log('Starting registration process for:', signUpData.email, 'role:', signUpData.role);
      
      const profileData: any = { name: signUpData.name };

      if (signUpData.role === 'student') {
        profileData.rollNumber = signUpData.rollNumber;
        profileData.batch = signUpData.batch;
        profileData.branch = signUpData.branch;
        profileData.cgpa = parseFloat(signUpData.cgpa) || 0;
        profileData.skills = signUpData.skills.split(',').map(s => s.trim()).filter(s => s);
      } else if (signUpData.role === 'company') {
        profileData.companyName = signUpData.companyName;
        profileData.industry = signUpData.industry;
        profileData.website = signUpData.website;
        profileData.description = signUpData.description;
      } else if (signUpData.role === 'college') {
        profileData.collegeName = signUpData.collegeName;
        profileData.code = signUpData.code;
      }

      console.log('Profile data:', profileData);
      
      console.log('Project ID:', projectId);
      const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-013e6437/register`;
      console.log('Making request to server URL:', serverUrl);

      if (!projectId) {
        setError('Configuration error: Project ID not found');
        return;
      }

      const requestPayload = {
        email: signUpData.email,
        password: signUpData.password,
        role: signUpData.role,
        profileData
      };
      console.log('Request payload:', requestPayload);

      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(requestPayload)
      });

      console.log('Response status:', response.status);
      
      let result;
      try {
        result = await response.json();
        console.log('Response data:', result);
      } catch (parseError) {
        console.error('Failed to parse response JSON:', parseError);
        setError('Server returned invalid response');
        return;
      }

      if (!response.ok) {
        console.error('Registration failed:', result);
        const errorMessage = result.error || result.details || `Registration failed (${response.status})`;
        setError(errorMessage);
        return;
      }

      if (!result.success) {
        console.error('Registration response indicates failure:', result);
        setError(result.error || 'Registration failed');
        return;
      }

      console.log('Registration successful, attempting sign in...');
      
      // Auto sign in after registration
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signUpData.email,
        password: signUpData.password,
      });

      if (error) {
        console.error('Sign in after registration failed:', error);
        setError('Registration successful, but sign in failed. Please sign in manually.');
        return;
      }

      console.log('Sign in successful, calling onAuthSuccess');
      onAuthSuccess({
        id: data.user.id,
        email: data.user.email!,
        role: signUpData.role,
        profile: { ...profileData, email: signUpData.email }
      });

    } catch (error) {
      console.error('Sign up error:', error);
      console.error('Error type:', typeof error);
      console.error('Error constructor:', error.constructor.name);
      console.error('Error stack:', error.stack);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setError('Unable to connect to the server. This could be due to:\n• Network connectivity issues\n• Server not running\n• CORS configuration issues\n\nPlease try again in a moment.');
      } else if (error.name === 'NetworkError' || error.message.includes('NetworkError')) {
        setError('Network error occurred. Please check your connection and try again.');
      } else {
        setError('An error occurred during registration: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return <GraduationCap className="h-5 w-5" />;
      case 'company': return <Building2 className="h-5 w-5" />;
      case 'college': return <Users className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Placement Portal</CardTitle>
          <CardDescription>
            Connect students, companies, and colleges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={signUpData.role} onValueChange={(value) => setSignUpData({ ...signUpData, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4" />
                          <span>Student</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="company">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4" />
                          <span>Company</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="college">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>College Admin</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {signUpData.role === 'student' && (
                  <>
                    <Input
                      placeholder="Full Name *"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Roll Number *"
                        value={signUpData.rollNumber}
                        onChange={(e) => setSignUpData({ ...signUpData, rollNumber: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Batch (e.g., 2024) *"
                        value={signUpData.batch}
                        onChange={(e) => setSignUpData({ ...signUpData, batch: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Branch *"
                        value={signUpData.branch}
                        onChange={(e) => setSignUpData({ ...signUpData, branch: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="CGPA *"
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={signUpData.cgpa}
                        onChange={(e) => setSignUpData({ ...signUpData, cgpa: e.target.value })}
                        required
                      />
                    </div>
                    <Input
                      placeholder="Skills (comma separated)"
                      value={signUpData.skills}
                      onChange={(e) => setSignUpData({ ...signUpData, skills: e.target.value })}
                    />
                  </>
                )}

                {signUpData.role === 'company' && (
                  <>
                    <Input
                      placeholder="Contact Person Name"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Company Name"
                      value={signUpData.companyName}
                      onChange={(e) => setSignUpData({ ...signUpData, companyName: e.target.value })}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Industry"
                        value={signUpData.industry}
                        onChange={(e) => setSignUpData({ ...signUpData, industry: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Website"
                        value={signUpData.website}
                        onChange={(e) => setSignUpData({ ...signUpData, website: e.target.value })}
                      />
                    </div>
                    <Input
                      placeholder="Company Description"
                      value={signUpData.description}
                      onChange={(e) => setSignUpData({ ...signUpData, description: e.target.value })}
                    />
                  </>
                )}

                {signUpData.role === 'college' && (
                  <>
                    <Input
                      placeholder="Admin Name"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="College Name"
                      value={signUpData.collegeName}
                      onChange={(e) => setSignUpData({ ...signUpData, collegeName: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="College Code"
                      value={signUpData.code}
                      onChange={(e) => setSignUpData({ ...signUpData, code: e.target.value })}
                      required
                    />
                  </>
                )}

                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}