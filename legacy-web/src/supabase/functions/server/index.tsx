import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2.39.7'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Enable CORS for all routes
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}))

// Add logging
app.use('*', logger())

// Handle preflight requests
app.options('*', (c) => c.text('', 204))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Health check endpoint (no auth required)
app.get('/make-server-013e6437/health', (c) => {
  console.log('Health check requested')
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    server: 'placement-portal'
  })
})

// Root endpoint
app.get('/make-server-013e6437/', (c) => {
  return c.json({ message: 'Placement Portal API Server' })
})

// User registration
app.post('/make-server-013e6437/register', async (c) => {
  console.log('=== Registration request received ===')
  
  try {
    // Parse request body
    const requestBody = await c.req.json()
    console.log('Request body:', requestBody)
    
    const { email, password, role, profileData } = requestBody
    
    // Basic validation
    if (!email || !password || !role) {
      console.log('Missing required fields')
      return c.json({ error: 'Missing required fields' }, 400)
    }
    
    console.log('Creating user for:', email, 'with role:', role)
    
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { role },
      email_confirm: true
    })

    if (error) {
      console.log('Supabase auth error:', error.message)
      return c.json({ error: error.message }, 400)
    }

    console.log('User created:', data.user.id)
    
    // Store profile
    const profile = {
      id: data.user.id,
      email,
      role,
      ...profileData,
      createdAt: new Date().toISOString()
    }
    
    await kv.set(`profile:${data.user.id}`, profile)
    console.log('Profile stored')
    
    return c.json({ success: true, user: data.user })
    
  } catch (error) {
    console.log('Registration error:', error.message)
    return c.json({ error: 'Registration failed', details: error.message }, 500)
  }
})

// Get user profile
app.get('/make-server-013e6437/profile', async (c) => {
  try {
    console.log('Profile fetch requested')
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    
    if (!accessToken) {
      console.log('No access token provided')
      return c.json({ error: 'No authorization token provided' }, 401)
    }
    
    console.log('Validating user with token')
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error) {
      console.log('Token validation error:', error)
      return c.json({ error: 'Invalid token' }, 401)
    }
    
    if (!user) {
      console.log('No user found for token')
      return c.json({ error: 'Unauthorized' }, 401)
    }

    console.log('Fetching profile for user:', user.id)
    const profile = await kv.get(`profile:${user.id}`)
    
    if (!profile) {
      console.log('No profile found for user:', user.id)
      // Return basic profile based on user metadata
      const basicProfile = {
        id: user.id,
        email: user.email,
        role: user.user_metadata?.role || 'student',
        name: user.user_metadata?.name || user.email?.split('@')[0],
        createdAt: user.created_at
      }
      return c.json(basicProfile)
    }

    console.log('Profile found:', profile)
    return c.json(profile)
  } catch (error) {
    console.log('Profile fetch error:', error)
    return c.json({ error: 'Internal server error: ' + error.message }, 500)
  }
})

// Update user profile
app.put('/make-server-013e6437/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const profileData = await c.req.json()
    const existingProfile = await kv.get(`profile:${user.id}`)
    
    const updatedProfile = {
      ...existingProfile,
      ...profileData,
      updatedAt: new Date().toISOString()
    }

    await kv.set(`profile:${user.id}`, updatedProfile)
    return c.json(updatedProfile)
  } catch (error) {
    console.log('Profile update error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Job Management
app.post('/make-server-013e6437/jobs', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const profile = await kv.get(`profile:${user.id}`)
    if (profile.role !== 'company') {
      return c.json({ error: 'Only companies can post jobs' }, 403)
    }

    const jobData = await c.req.json()
    const jobId = `job:${Date.now()}-${Math.random().toString(36).substring(7)}`
    
    const job = {
      id: jobId,
      companyId: user.id,
      companyName: profile.name,
      ...jobData,
      status: 'active',
      applicationsCount: 0,
      createdAt: new Date().toISOString()
    }

    await kv.set(jobId, job)
    return c.json(job)
  } catch (error) {
    console.log('Job creation error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get all jobs
app.get('/make-server-013e6437/jobs', async (c) => {
  try {
    const jobs = await kv.getByPrefix('job:')
    return c.json(jobs.filter(job => job.status === 'active'))
  } catch (error) {
    console.log('Jobs fetch error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get company's jobs
app.get('/make-server-013e6437/company-jobs', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const jobs = await kv.getByPrefix('job:')
    const companyJobs = jobs.filter(job => job.companyId === user.id)
    return c.json(companyJobs)
  } catch (error) {
    console.log('Company jobs fetch error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Apply for job
app.post('/make-server-013e6437/applications', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const profile = await kv.get(`profile:${user.id}`)
    if (profile.role !== 'student') {
      return c.json({ error: 'Only students can apply for jobs' }, 403)
    }

    const { jobId, coverLetter } = await c.req.json()
    const applicationId = `application:${Date.now()}-${Math.random().toString(36).substring(7)}`
    
    // Check if already applied
    const existingApplications = await kv.getByPrefix('application:')
    const alreadyApplied = existingApplications.some(app => 
      app.studentId === user.id && app.jobId === jobId
    )

    if (alreadyApplied) {
      return c.json({ error: 'Already applied for this job' }, 400)
    }

    const application = {
      id: applicationId,
      jobId,
      studentId: user.id,
      studentName: profile.name,
      studentEmail: profile.email,
      coverLetter,
      status: 'pending',
      appliedAt: new Date().toISOString()
    }

    await kv.set(applicationId, application)

    // Update job application count
    const job = await kv.get(jobId)
    if (job) {
      job.applicationsCount = (job.applicationsCount || 0) + 1
      await kv.set(jobId, job)
    }

    return c.json(application)
  } catch (error) {
    console.log('Application error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get student applications
app.get('/make-server-013e6437/my-applications', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const applications = await kv.getByPrefix('application:')
    const myApplications = applications.filter(app => app.studentId === user.id)
    
    // Get job details for each application
    const applicationsWithJobs = await Promise.all(
      myApplications.map(async (app) => {
        const job = await kv.get(app.jobId)
        return { ...app, job }
      })
    )

    return c.json(applicationsWithJobs)
  } catch (error) {
    console.log('My applications fetch error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get job applications (for companies)
app.get('/make-server-013e6437/job-applications/:jobId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const jobId = c.req.param('jobId')
    const job = await kv.get(jobId)
    
    if (job.companyId !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403)
    }

    const applications = await kv.getByPrefix('application:')
    const jobApplications = applications.filter(app => app.jobId === jobId)
    
    return c.json(jobApplications)
  } catch (error) {
    console.log('Job applications fetch error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Update application status
app.put('/make-server-013e6437/applications/:applicationId/status', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const applicationId = c.req.param('applicationId')
    const { status } = await c.req.json()
    
    const application = await kv.get(applicationId)
    if (!application) {
      return c.json({ error: 'Application not found' }, 404)
    }

    // Verify user can update this application
    const job = await kv.get(application.jobId)
    if (job.companyId !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403)
    }

    application.status = status
    application.updatedAt = new Date().toISOString()
    
    await kv.set(applicationId, application)
    return c.json(application)
  } catch (error) {
    console.log('Application status update error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Analytics for colleges
app.get('/make-server-013e6437/analytics', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const profile = await kv.get(`profile:${user.id}`)
    if (profile.role !== 'college') {
      return c.json({ error: 'Only colleges can access analytics' }, 403)
    }

    const jobs = await kv.getByPrefix('job:')
    const applications = await kv.getByPrefix('application:')
    const profiles = await kv.getByPrefix('profile:')
    
    const students = profiles.filter(p => p.role === 'student')
    const companies = profiles.filter(p => p.role === 'company')
    
    const selectedApplications = applications.filter(app => app.status === 'selected')
    const placementRate = students.length > 0 ? (selectedApplications.length / students.length) * 100 : 0

    const analytics = {
      totalStudents: students.length,
      totalCompanies: companies.length,
      totalJobs: jobs.length,
      totalApplications: applications.length,
      placedStudents: selectedApplications.length,
      placementRate: Math.round(placementRate * 100) / 100,
      applicationsByStatus: {
        pending: applications.filter(app => app.status === 'pending').length,
        shortlisted: applications.filter(app => app.status === 'shortlisted').length,
        rejected: applications.filter(app => app.status === 'rejected').length,
        selected: applications.filter(app => app.status === 'selected').length,
      }
    }

    return c.json(analytics)
  } catch (error) {
    console.log('Analytics fetch error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get all students (for colleges)
app.get('/make-server-013e6437/students', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const profiles = await kv.getByPrefix('profile:')
    const students = profiles.filter(p => p.role === 'student')
    
    return c.json(students)
  } catch (error) {
    console.log('Students fetch error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get all companies (for colleges)
app.get('/make-server-013e6437/companies', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const profiles = await kv.getByPrefix('profile:')
    const companies = profiles.filter(p => p.role === 'company')
    
    return c.json(companies)
  } catch (error) {
    console.log('Companies fetch error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Catch-all error handler
app.onError((err, c) => {
  console.error('Unhandled error:', err)
  return c.json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  }, 500)
})

// 404 handler
app.notFound((c) => {
  console.log('404 - Route not found:', c.req.url)
  return c.json({ error: 'Route not found', path: c.req.url }, 404)
})

console.log('Starting Placement Portal server...')
Deno.serve(app.fetch)