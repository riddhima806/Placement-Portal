import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Search, 
  Briefcase, 
  User, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  MapPin,
  Calendar,
  DollarSign,
  Users
} from 'lucide-react';



interface StudentDashboardProps {
  user: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function StudentDashboard({ user, activeTab, setActiveTab }: StudentDashboardProps) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [profileData, setProfileData] = useState({
    name: user.profile?.name || '',
    rollNumber: user.profile?.rollNumber || '',
    batch: user.profile?.batch || '',
    branch: user.profile?.branch || '',
    cgpa: user.profile?.cgpa || '',
    skills: user.profile?.skills?.join(', ') || '',
  });

  useEffect(() => {
    if (activeTab === 'jobs') {
      fetchJobs();
    } else if (activeTab === 'applications') {
      fetchApplications();
    }
  }, [activeTab]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/jobs`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/my-applications`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          jobId,
          coverLetter
        })
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        setCoverLetter('');
        setSelectedJob(null);
        fetchApplications();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Failed to submit application');
    }
  };

  const updateProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          ...profileData,
          skills: profileData.skills.split(',').map(s => s.trim()).filter(s => s),
          cgpa: parseFloat(profileData.cgpa) || 0
        })
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'shortlisted': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'selected': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-blue-100 text-blue-800';
      case 'selected': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Available Jobs</p>
                <p className="text-2xl font-semibold">{jobs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-2xl font-semibold">{applications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Selected</p>
                <p className="text-2xl font-semibold">
                  {applications.filter(app => app.status === 'selected').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-semibold">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="jobs">Browse Jobs</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome, {user.profile?.name}!</CardTitle>
                <CardDescription>
                  Track your placement journey and discover new opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Recent Applications</h4>
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-2 border rounded mb-2">
                        <div>
                          <p className="font-medium">{app.job?.title}</p>
                          <p className="text-sm text-gray-600">{app.job?.companyName}</p>
                        </div>
                        <Badge className={getStatusColor(app.status)}>
                          {app.status}
                        </Badge>
                      </div>
                    ))}
                    {applications.length === 0 && (
                      <p className="text-gray-500">No applications yet</p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Profile Completeness</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Basic Info</span>
                        <span className="text-green-600">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Academic Details</span>
                        <span className="text-green-600">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Skills</span>
                        <span className={profileData.skills ? 'text-green-600' : 'text-gray-400'}>
                          {profileData.skills ? '✓' : '○'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies, locations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={fetchJobs} variant="outline">
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading jobs...</div>
            ) : (
              <div className="grid gap-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold">{job.title}</h3>
                              <p className="text-blue-600 font-medium">{job.companyName}</p>
                            </div>
                            <Badge variant="outline">{job.type}</Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            {job.location && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                              </div>
                            )}
                            {job.salary && (
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{job.salary}</span>
                              </div>
                            )}
                            {job.experience && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{job.experience}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{job.applicationsCount || 0} applicants</span>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                          
                          {job.requirements && (
                            <div className="mb-3">
                              <p className="text-sm font-medium mb-1">Requirements:</p>
                              <div className="flex flex-wrap gap-1">
                                {job.requirements.split(',').slice(0, 5).map((req: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {req.trim()}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t">
                        <div className="text-sm text-gray-500">
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button onClick={() => setSelectedJob(job)}>
                              Apply Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Apply for {job.title}</DialogTitle>
                              <DialogDescription>
                                Submit your application to {job.companyName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="coverLetter">Cover Letter</Label>
                                <Textarea
                                  id="coverLetter"
                                  placeholder="Write a brief cover letter explaining why you're interested in this position..."
                                  value={coverLetter}
                                  onChange={(e) => setCoverLetter(e.target.value)}
                                  rows={5}
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedJob(null);
                                    setCoverLetter('');
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => handleApply(job.id)}
                                  disabled={!coverLetter.trim()}
                                >
                                  Submit Application
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredJobs.length === 0 && !loading && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {searchTerm ? 'No jobs found matching your search.' : 'No jobs available at the moment.'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="applications">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">My Applications</h3>
              <Button onClick={fetchApplications} variant="outline">
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading applications...</div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{app.job?.title}</h3>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(app.status)}
                              <Badge className={getStatusColor(app.status)}>
                                {app.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-blue-600 font-medium mb-2">{app.job?.companyName}</p>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
                            {app.updatedAt && app.updatedAt !== app.appliedAt && (
                              <p>Updated: {new Date(app.updatedAt).toLocaleDateString()}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          {app.job?.location && (
                            <p className="text-sm text-gray-600">{app.job.location}</p>
                          )}
                          {app.job?.salary && (
                            <p className="text-sm font-medium">{app.job.salary}</p>
                          )}
                        </div>
                      </div>
                      
                      {app.coverLetter && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium mb-2">Cover Letter:</p>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                            {app.coverLetter}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {applications.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No applications yet.</p>
                      <p className="text-sm text-gray-400">Start applying to jobs to see them here.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Student Profile</span>
              </CardTitle>
              <CardDescription>
                Update your profile information to help employers find you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    value={profileData.rollNumber}
                    onChange={(e) => setProfileData({ ...profileData, rollNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch</Label>
                  <Input
                    id="batch"
                    value={profileData.batch}
                    onChange={(e) => setProfileData({ ...profileData, batch: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input
                    id="branch"
                    value={profileData.branch}
                    onChange={(e) => setProfileData({ ...profileData, branch: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgpa">CGPA</Label>
                  <Input
                    id="cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={profileData.cgpa}
                    onChange={(e) => setProfileData({ ...profileData, cgpa: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Textarea
                  id="skills"
                  placeholder="e.g., JavaScript, React, Node.js, Python, SQL"
                  value={profileData.skills}
                  onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
                />
              </div>

              <Button onClick={updateProfile} className="w-full">
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}