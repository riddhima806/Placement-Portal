import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  Building2, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Calendar,
  Search,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  GraduationCap
} from 'lucide-react';



interface CollegeDashboardProps {
  user: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function CollegeDashboard({ user, activeTab, setActiveTab }: CollegeDashboardProps) {
  const [analytics, setAnalytics] = useState<any>({});
  const [students, setStudents] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (activeTab === 'analytics') {
      fetchAnalytics();
    } else if (activeTab === 'students') {
      fetchStudents();
    } else if (activeTab === 'companies') {
      fetchCompanies();
    } else if (activeTab === 'jobs') {
      fetchJobs();
    }
  }, [activeTab]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/analytics`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/students`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-013e6437/companies`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const applicationStatusData = analytics.applicationsByStatus ? [
    { name: 'Pending', value: analytics.applicationsByStatus.pending, color: '#f59e0b' },
    { name: 'Shortlisted', value: analytics.applicationsByStatus.shortlisted, color: '#3b82f6' },
    { name: 'Selected', value: analytics.applicationsByStatus.selected, color: '#10b981' },
    { name: 'Rejected', value: analytics.applicationsByStatus.rejected, color: '#ef4444' },
  ] : [];

  const branchData = students.reduce((acc: any, student: any) => {
    const branch = student.branch || 'Unknown';
    acc[branch] = (acc[branch] || 0) + 1;
    return acc;
  }, {});

  const branchChartData = Object.entries(branchData).map(([branch, count]) => ({
    branch,
    count
  }));

  const batchData = students.reduce((acc: any, student: any) => {
    const batch = student.batch || 'Unknown';
    acc[batch] = (acc[batch] || 0) + 1;
    return acc;
  }, {});

  const batchChartData = Object.entries(batchData).map(([batch, count]) => ({
    batch,
    count
  }));

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.branch?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanies = companies.filter(company =>
    company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-semibold">{analytics.totalStudents || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Companies</p>
                <p className="text-2xl font-semibold">{analytics.totalCompanies || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Job Openings</p>
                <p className="text-2xl font-semibold">{analytics.totalJobs || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Placed Students</p>
                <p className="text-2xl font-semibold">{analytics.placedStudents || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Placement Rate</p>
                <p className="text-2xl font-semibold">{analytics.placementRate || 0}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Analytics Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive overview of placement statistics and trends.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Application Status Distribution */}
                  <div>
                    <h4 className="font-medium mb-4">Application Status Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={applicationStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {applicationStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Students by Branch */}
                  <div>
                    <h4 className="font-medium mb-4">Students by Branch</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={branchChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="branch" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Students by Batch */}
              <Card>
                <CardHeader>
                  <CardTitle>Students by Batch</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={batchChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="batch" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded">
                      <div className="text-2xl font-bold text-green-600">
                        {analytics.placementRate || 0}%
                      </div>
                      <div className="text-sm text-gray-600">Placement Rate</div>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <div className="text-2xl font-bold text-blue-600">
                        {analytics.totalApplications || 0}
                      </div>
                      <div className="text-sm text-gray-600">Total Applications</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Pending Applications:</span>
                      <span className="font-medium">{analytics.applicationsByStatus?.pending || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shortlisted Applications:</span>
                      <span className="font-medium">{analytics.applicationsByStatus?.shortlisted || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Selected Applications:</span>
                      <span className="font-medium text-green-600">{analytics.applicationsByStatus?.selected || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rejected Applications:</span>
                      <span className="font-medium text-red-600">{analytics.applicationsByStatus?.rejected || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Student Management</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={fetchStudents}>
                  Refresh
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading students...</div>
            ) : (
              <div className="grid gap-4">
                {filteredStudents.map((student) => (
                  <Card key={student.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{student.name}</h4>
                            <Badge variant="outline">{student.branch}</Badge>
                          </div>
                          <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Roll No:</span> {student.rollNumber}
                            </div>
                            <div>
                              <span className="font-medium">Batch:</span> {student.batch}
                            </div>
                            <div>
                              <span className="font-medium">CGPA:</span> {student.cgpa}
                            </div>
                            <div>
                              <span className="font-medium">Email:</span> {student.email}
                            </div>
                          </div>
                          {student.skills && student.skills.length > 0 && (
                            <div className="mt-2">
                              <span className="text-sm font-medium">Skills: </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {student.skills.slice(0, 5).map((skill: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {student.skills.length > 5 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{student.skills.length - 5} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          Joined {new Date(student.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredStudents.length === 0 && !loading && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {searchTerm ? 'No students found matching your search.' : 'No students registered yet.'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="companies">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Company Management</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search companies..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={fetchCompanies}>
                  Refresh
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading companies...</div>
            ) : (
              <div className="grid gap-4">
                {filteredCompanies.map((company) => (
                  <Card key={company.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{company.companyName}</h4>
                            <Badge variant="outline">{company.industry}</Badge>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                            <div>
                              <span className="font-medium">Contact:</span> {company.name}
                            </div>
                            <div>
                              <span className="font-medium">Email:</span> {company.email}
                            </div>
                            <div>
                              <span className="font-medium">Website:</span> 
                              {company.website ? (
                                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                  {company.website}
                                </a>
                              ) : (
                                <span className="ml-1 text-gray-400">Not provided</span>
                              )}
                            </div>
                          </div>
                          {company.description && (
                            <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                              {company.description}
                            </p>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          Joined {new Date(company.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredCompanies.length === 0 && !loading && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {searchTerm ? 'No companies found matching your search.' : 'No companies registered yet.'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="jobs">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Job Posting Management</h3>
              <Button variant="outline" onClick={fetchJobs}>
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading jobs...</div>
            ) : (
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{job.title}</h4>
                            <Badge variant="outline">{job.type}</Badge>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(job.status)}
                              <Badge className={job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {job.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-blue-600 font-medium mb-2">{job.companyName}</p>
                          <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                            <div>
                              <span className="font-medium">Location:</span> {job.location || 'Not specified'}
                            </div>
                            <div>
                              <span className="font-medium">Salary:</span> {job.salary || 'Not specified'}
                            </div>
                            <div>
                              <span className="font-medium">Experience:</span> {job.experience || 'Not specified'}
                            </div>
                            <div>
                              <span className="font-medium">Applications:</span> {job.applicationsCount || 0}
                            </div>
                          </div>
                          
                          {job.minCGPA && (
                            <div className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Min CGPA:</span> {job.minCGPA}
                            </div>
                          )}
                          
                          {job.eligibleBranches && job.eligibleBranches.length > 0 && (
                            <div className="mb-2">
                              <span className="text-sm font-medium">Eligible Branches: </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {job.eligibleBranches.map((branch: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {branch}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <p className="text-sm text-gray-700 line-clamp-2">{job.description}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {jobs.length === 0 && !loading && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No jobs posted yet.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}