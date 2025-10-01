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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Plus, 
  Briefcase, 
  Users, 
  Eye, 
  Edit, 
  Trash2,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';



interface CompanyDashboardProps {
  user: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function CompanyDashboard({ user, activeTab, setActiveTab }: CompanyDashboardProps) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    type: 'Full-time',
    experience: '',
    deadline: '',
    minCGPA: '',
    eligibleBranches: '',
    skills: ''
  });

  useEffect(() => {
    if (activeTab === 'jobs') {
      fetchJobs();
    }
  }, [activeTab]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/company-jobs`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
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

  const fetchJobApplications = async (jobId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/job-applications/${jobId}`, {
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
    }
  };

  const createJob = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          ...jobFormData,
          minCGPA: parseFloat(jobFormData.minCGPA) || 0,
          eligibleBranches: jobFormData.eligibleBranches.split(',').map(b => b.trim()).filter(b => b),
          skills: jobFormData.skills.split(',').map(s => s.trim()).filter(s => s)
        })
      });

      if (response.ok) {
        alert('Job posted successfully!');
        setJobFormData({
          title: '',
          description: '',
          requirements: '',
          location: '',
          salary: '',
          type: 'Full-time',
          experience: '',
          deadline: '',
          minCGPA: '',
          eligibleBranches: '',
          skills: ''
        });
        setShowJobDialog(false);
        fetchJobs();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job');
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        alert('Application status updated successfully!');
        if (selectedJob) {
          fetchJobApplications(selectedJob.id);
        }
      } else {
        alert('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Failed to update application status');
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

  const totalApplications = jobs.reduce((sum, job) => sum + (job.applicationsCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Posted Jobs</p>
                <p className="text-2xl font-semibold">{jobs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-semibold">{totalApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-2xl font-semibold">
                  {jobs.filter(job => job.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Company</p>
                <p className="text-sm font-semibold">{user.profile?.companyName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="jobs">Manage Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome, {user.profile?.companyName}!</CardTitle>
                <CardDescription>
                  Manage your job postings and review applications from talented students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Recent Job Posts</h4>
                    <div className="space-y-2">
                      {jobs.slice(0, 3).map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-gray-600">{job.applicationsCount || 0} applications</p>
                          </div>
                          <Badge variant="outline">{job.status}</Badge>
                        </div>
                      ))}
                      {jobs.length === 0 && (
                        <p className="text-gray-500">No jobs posted yet</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button
                        onClick={() => {
                          setActiveTab('jobs');
                          setShowJobDialog(true);
                        }}
                        className="w-full justify-start"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Post New Job
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab('applications')}
                        className="w-full justify-start"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Review Applications
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab('profile')}
                        className="w-full justify-start"
                      >
                        <Building2 className="h-4 w-4 mr-2" />
                        Update Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Job Management</h3>
              <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Post New Job</DialogTitle>
                    <DialogDescription>
                      Create a new job posting to attract talented students.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Software Developer"
                          value={jobFormData.title}
                          onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Job Type</Label>
                        <Select value={jobFormData.type} onValueChange={(value) => setJobFormData({ ...jobFormData, type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the role, responsibilities, and what you're looking for..."
                        value={jobFormData.description}
                        onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="e.g., New York, NY"
                          value={jobFormData.location}
                          onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary">Salary</Label>
                        <Input
                          id="salary"
                          placeholder="e.g., $60,000 - $80,000"
                          value={jobFormData.salary}
                          onChange={(e) => setJobFormData({ ...jobFormData, salary: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Required</Label>
                        <Input
                          id="experience"
                          placeholder="e.g., 0-2 years"
                          value={jobFormData.experience}
                          onChange={(e) => setJobFormData({ ...jobFormData, experience: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minCGPA">Minimum CGPA</Label>
                        <Input
                          id="minCGPA"
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          placeholder="e.g., 7.0"
                          value={jobFormData.minCGPA}
                          onChange={(e) => setJobFormData({ ...jobFormData, minCGPA: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eligibleBranches">Eligible Branches (comma separated)</Label>
                      <Input
                        id="eligibleBranches"
                        placeholder="e.g., Computer Science, Information Technology, Electronics"
                        value={jobFormData.eligibleBranches}
                        onChange={(e) => setJobFormData({ ...jobFormData, eligibleBranches: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Required Skills (comma separated)</Label>
                      <Input
                        id="skills"
                        placeholder="e.g., JavaScript, React, Node.js, SQL"
                        value={jobFormData.skills}
                        onChange={(e) => setJobFormData({ ...jobFormData, skills: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Additional Requirements</Label>
                      <Textarea
                        id="requirements"
                        placeholder="Any additional requirements or qualifications..."
                        value={jobFormData.requirements}
                        onChange={(e) => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={jobFormData.deadline}
                        onChange={(e) => setJobFormData({ ...jobFormData, deadline: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowJobDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={createJob} disabled={!jobFormData.title || !jobFormData.description}>
                      Post Job
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading jobs...</div>
            ) : (
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold">{job.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
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
                                <Badge variant="outline">{job.type}</Badge>
                              </div>
                            </div>
                            <Badge className={job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {job.status}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{job.applicationsCount || 0} applications</span>
                              <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedJob(job);
                                  fetchJobApplications(job.id);
                                  setActiveTab('applications');
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Applications
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {jobs.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No jobs posted yet.</p>
                      <p className="text-sm text-gray-400">Create your first job posting to start receiving applications.</p>
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
              <h3 className="text-lg font-semibold">
                Applications {selectedJob && `for ${selectedJob.title}`}
              </h3>
              {selectedJob && (
                <Button variant="outline" onClick={() => setSelectedJob(null)}>
                  View All Jobs
                </Button>
              )}
            </div>

            {!selectedJob ? (
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.applicationsCount || 0} applications</p>
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedJob(job);
                            fetchJobApplications(job.id);
                          }}
                          disabled={!job.applicationsCount}
                        >
                          View Applications
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{app.studentName}</h4>
                          <p className="text-sm text-gray-600">{app.studentEmail}</p>
                          <p className="text-sm text-gray-500">
                            Applied {new Date(app.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(app.status)}
                          <Badge className={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                        </div>
                      </div>
                      
                      {app.coverLetter && (
                        <div className="mb-4">
                          <h5 className="font-medium mb-2">Cover Letter:</h5>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                            {app.coverLetter}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                          disabled={app.status === 'shortlisted'}
                        >
                          Shortlist
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateApplicationStatus(app.id, 'selected')}
                          disabled={app.status === 'selected'}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Select
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateApplicationStatus(app.id, 'rejected')}
                          disabled={app.status === 'rejected'}
                        >
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {applications.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No applications for this job yet.</p>
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
                <Building2 className="h-5 w-5" />
                <span>Company Profile</span>
              </CardTitle>
              <CardDescription>
                Update your company information to attract the best talent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input value={user.profile?.companyName || ''} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Input value={user.profile?.industry || ''} disabled />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input value={user.profile?.website || ''} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input value={user.email} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Company Description</Label>
                <Textarea 
                  value={user.profile?.description || ''} 
                  disabled 
                  rows={4}
                />
              </div>

              <div className="text-sm text-gray-500">
                Contact your college administrator to update company profile information.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}