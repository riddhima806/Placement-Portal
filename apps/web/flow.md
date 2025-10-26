1. Student Mobile App (Primary User: Students)
🔹 Overview
This is the most active interface, where students manage their profile, check eligibility, view drives, and interact with placement opportunities. It should feel intuitive, mobile-friendly, and gamified with progress/insights.
🔹 User Flow & Features
Authentication & Onboarding


Login via college SSO or student email.


AI-guided onboarding: students enter skills, GPA, interests.


System auto-generates initial eligibility metrics.


Dashboard (Home)


Displays upcoming drives, ongoing applications, and deadlines.


Personalized “AI Skill Gap Insight” section:


 “You’re eligible for 12 companies this semester. Improve your DSA score to qualify for 3 more.”



Attendance tracker (if integrated with TPO attendance data).


Profile Management


Editable fields: personal info, education, resume uploads, skills, achievements.


Resume Builder integration: auto-format resume from profile.


AI suggestions for improvements (“Add project descriptions,” “Include a GitHub link”).


Drive & Company Listings


Filters: By company, salary, location, eligibility criteria.


Detailed Drive Page:
 → Company overview, job role, eligibility, deadlines, status.
 → “Apply Now” button (triggers validation against eligibility).


Eligibility Check


Real-time check based on GPA, backlogs, skills, etc.


Shows reasons for ineligibility (“You need a CGPA ≥ 7.0 to apply for XYZ.”)


Application Tracking


Shows all applied drives with statuses: “Applied,” “Under Review,” “Shortlisted,” “Rejected,” “Offer Received.”


Option to download offer letter or schedule interview slot.


AI Skill Mentor


Based on rejected drives or missed eligibility, suggests online resources or tasks.
 (“Practice Python for XYZ Drive” / “Improve Aptitude for Infosys.”)


Could integrate with learning APIs like Coursera or HackerRank.


Company Reviews


Students can view and contribute anonymous reviews after drives.


Filters by company or role.


Notifications


Push notifications for new drives, updates, and admin/TPO announcements.


Support


Contact TPO via chat or query form.


FAQs and guidelines about placement rules.



2. TPO Portal (Web App for Student Elected Officers)
🔹 Overview
TPOs act as intermediaries — managing drives, collecting student data, and liaising with Admins. Their dashboard focuses on company/drive management and student performance insights.
🔹 User Flow & Features
Authentication


Login via faculty-assigned credentials.


Restricted access based on department.


Dashboard


Overview of ongoing and upcoming drives, company approvals, and student stats.


Quick metrics: “Active Drives: 4”, “Pending Approvals: 2”, “Total Applicants: 150”.


Drive Management


Add New Drive: Fill form with company details, eligibility, deadline, and role.


View/Edit Drives: Edit details before admin approval.


Status Tracking: Shows which drives are approved, rejected, or pending.


Company Management


Add or propose new company details.


Attach brochures, company links, and job descriptions.


Await admin approval.


Eligibility & Student Management


View eligible students for each drive.


Manually shortlist if required (optional override with admin consent).


Export student lists to CSV or PDF.


Reports & Analytics


Generate placement statistics for their department.


Download performance reports.


Communication Tools


Broadcast announcements to students.


Send reminders or updates on deadlines.


(Optional) chat interface for internal coordination.


Attendance Integration


Mark attendance for placement training sessions or aptitude tests.


Data synced to Student App dashboard.



3. Admin / Faculty Portal (Core Management)
🔹 Overview
Admins (faculty/staff) hold the highest control — verifying TPO actions, approving drives, managing company relations, and generating official reports.
🔹 User Flow & Features
Authentication


Secure login via institution credentials (with MFA preferred).


Role-based access (Head Admin, Department Head, etc.).


Dashboard


Global view of all activities: students, TPOs, companies, drives.


KPIs: “Total Drives Conducted,” “Students Placed,” “Placement Rate.”


TPO Management


Add or remove departmental TPOs.


Assign permissions and view performance logs.


Company Verification


Review company details added by TPOs.


Approve or reject based on legitimacy.


Attach verification notes for audit trail.


Drive Approval Workflow


See all pending drives added by TPOs.


Verify eligibility conditions and deadlines.


Approve → Automatically visible on Student App.


Reject → Notify TPO with feedback.


Student Management


View student profiles and academic data.


Generate department-wise or batch-wise placement reports.


Modify or lock profiles post-verification.


Placement Reports


Auto-generate analytics: Placement %, Average CTC, Company count.


Export as Excel/PDF for accreditation or NAAC reporting.


Announcements & Policy Updates


Push placement-related circulars to all students/TPOs.


Manage event announcements like “Placement Week” or “Mock Interviews.”



4. Company Dashboard (External Interface for Recruiters)
🔹 Overview
This portal allows companies to post drives, review applicants, shortlist students, and communicate with TPOs/admins. Communication remains formal (through contact links or email integrations).
🔹 User Flow & Features
Authentication & Profile Setup


Login via company email (verified via Admin).


Add company profile: Logo, domain, HR contact details, website.


Dashboard


View all active drives they’ve posted.


View applicant stats and shortlist progress.


Drive Posting


Add job description, eligibility, compensation, number of roles, deadlines.


Once submitted → visible to Admin/TPO for approval.


Applicant Management


View eligible applicants once drive is live.


Download resumes (PDF format, standardized by system).


Mark shortlists or interview selections.


Export final lists.
Communication


No internal chat (to maintain formality and auditability).


Being Able to push notifications to the students and only TPO’s or Admins are allowed to respond


Drive Analytics


Track number of applicants, shortlisted, and final selected.


Download summary report after drive completion.


Post-Drive Feedback


Option to rate drive organization, student performance, and TPO cooperation.


Helps Admins assess process efficiency.



Inter-System Workflows (Simplified Summary)
Flow
Triggered By
Involves
Description
Add New Drive
TPO
Admin → Student
TPO adds → Admin approves → Students apply
Student Application
Student
Database → Company
Student applies → Data stored → Company retrieves
Shortlisting
Company
TPO/Admin
Company uploads shortlist → Admin verifies
Report Generation
Admin
Database
Generates placement analytics
Feedback Loop
Company, Student
Admin
Used to refine training and placement processes


