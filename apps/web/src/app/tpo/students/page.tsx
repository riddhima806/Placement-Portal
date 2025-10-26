"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  UserCheck,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [driveFilter, setDriveFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      rollNo: "2021001",
      email: "rahul.sharma@nmims.edu",
      phone: "+91 98765 43210",
      cgpa: 8.5,
      backlogs: 0,
      department: "Computer Science",
      year: "2024",
      location: "Mumbai",
      skills: ["React", "Node.js", "Python", "AWS"],
      status: "Eligible",
      appliedDrives: ["Google India", "Microsoft"],
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 2,
      name: "Priya Patel",
      rollNo: "2021002",
      email: "priya.patel@nmims.edu",
      phone: "+91 98765 43211",
      cgpa: 7.8,
      backlogs: 1,
      department: "Information Technology",
      year: "2024",
      location: "Delhi",
      skills: ["Java", "Spring Boot", "MySQL", "Docker"],
      status: "Eligible",
      appliedDrives: ["Amazon", "TCS"],
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 3,
      name: "Amit Kumar",
      rollNo: "2021003",
      email: "amit.kumar@nmims.edu",
      phone: "+91 98765 43212",
      cgpa: 6.2,
      backlogs: 3,
      department: "Electronics",
      year: "2024",
      location: "Bangalore",
      skills: ["C++", "Arduino", "MATLAB"],
      status: "Not Eligible",
      appliedDrives: [],
      statusColor: "text-red-600",
      statusBg: "bg-red-100",
    },
    {
      id: 4,
      name: "Sneha Singh",
      rollNo: "2021004",
      email: "sneha.singh@nmims.edu",
      phone: "+91 98765 43213",
      cgpa: 9.1,
      backlogs: 0,
      department: "Computer Science",
      year: "2024",
      location: "Pune",
      skills: ["Machine Learning", "Python", "TensorFlow", "Data Science"],
      status: "Eligible",
      appliedDrives: ["Google India", "Microsoft", "Amazon"],
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 5,
      name: "Vikram Reddy",
      rollNo: "2021005",
      email: "vikram.reddy@nmims.edu",
      phone: "+91 98765 43214",
      cgpa: 7.5,
      backlogs: 0,
      department: "Mechanical",
      year: "2024",
      location: "Hyderabad",
      skills: ["AutoCAD", "SolidWorks", "Project Management"],
      status: "Eligible",
      appliedDrives: ["TCS"],
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
  ];

  const drives = [
    { id: 1, name: "Google India", role: "Software Engineer" },
    { id: 2, name: "Microsoft", role: "Product Manager" },
    { id: 3, name: "Amazon", role: "Data Scientist" },
    { id: 4, name: "TCS", role: "System Engineer" },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDrive = driveFilter === "all" || student.appliedDrives.some(drive => 
      drive.toLowerCase().includes(driveFilter.toLowerCase())
    );
    const matchesStatus = statusFilter === "all" || student.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesDrive && matchesStatus;
  });

  const handleViewProfile = (studentId: number) => {
    console.log("View profile:", studentId);
    alert("View profile functionality will be implemented");
  };

  const handleExportStudents = () => {
    console.log("Exporting students data...");
    alert("Export functionality will be implemented");
  };

  const handleShortlist = (studentId: number) => {
    console.log("Shortlist student:", studentId);
    alert("Shortlist functionality will be implemented");
  };

  return (
    <main className="w-full max-w-7xl mx-auto mt-10 px-4 pb-16">
          {/* Header */}
          <header className="bg-nmims rounded-tr-full rounded-bl-full w-full p-5 mb-8">
            <h1 className="text-center text-white font-bold text-2xl">
              Student Management
            </h1>
            <p className="text-center text-white/90 mt-2">
              View eligible students, manage shortlists, and track applications
            </p>
          </header>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Total Students</p>
                  <p className="text-3xl font-bold text-zinc-900">{students.length}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Users className="size-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Eligible</p>
                  <p className="text-3xl font-bold text-green-600">
                    {students.filter(s => s.status === "Eligible").length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="size-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Not Eligible</p>
                  <p className="text-3xl font-bold text-red-600">
                    {students.filter(s => s.status === "Not Eligible").length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-red-100">
                  <XCircle className="size-6 text-red-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Applied</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {students.filter(s => s.appliedDrives.length > 0).length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <FileText className="size-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 size-4" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  />
                </div>
                <select
                  value={driveFilter}
                  onChange={(e) => setDriveFilter(e.target.value)}
                  className="px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                >
                  <option value="all">All Drives</option>
                  {drives.map((drive) => (
                    <option key={drive.id} value={drive.name}>{drive.name}</option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                >
                  <option value="all">All Status</option>
                  <option value="eligible">Eligible</option>
                  <option value="not eligible">Not Eligible</option>
                </select>
              </div>
              <button
                onClick={handleExportStudents}
                className="bg-nmims text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition flex items-center gap-2"
              >
                <Download className="size-4" />
                Export Data
              </button>
            </div>
          </div>

          {/* Students List */}
          <div className="bg-white rounded-lg shadow-md border border-zinc-200">
            <div className="p-6 border-b border-zinc-200">
              <h2 className="font-bold text-xl text-zinc-800">Student Records</h2>
              <p className="text-zinc-600 mt-1">{filteredStudents.length} students found</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Student Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Academic Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Applied Drives
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{student.name}</div>
                          <div className="text-sm text-zinc-500">Roll: {student.rollNo}</div>
                          <div className="text-sm text-zinc-500 flex items-center gap-1">
                            <MapPin className="size-3" />
                            {student.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-zinc-900">{student.department}</div>
                          <div className="text-sm text-zinc-500">Year: {student.year}</div>
                          <div className="text-sm text-zinc-500">CGPA: {student.cgpa}</div>
                          <div className="text-sm text-zinc-500">Backlogs: {student.backlogs}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-zinc-900 flex items-center gap-1">
                            <Mail className="size-3" />
                            {student.email}
                          </div>
                          <div className="text-sm text-zinc-500 flex items-center gap-1">
                            <Phone className="size-3" />
                            {student.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {student.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-zinc-100 text-zinc-700 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                          {student.skills.length > 3 && (
                            <span className="px-2 py-1 bg-zinc-100 text-zinc-700 text-xs rounded">
                              +{student.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${student.statusBg} ${student.statusColor}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-900">
                          {student.appliedDrives.length > 0 ? (
                            <div className="space-y-1">
                              {student.appliedDrives.slice(0, 2).map((drive, index) => (
                                <div key={index} className="text-xs">{drive}</div>
                              ))}
                              {student.appliedDrives.length > 2 && (
                                <div className="text-xs text-zinc-500">+{student.appliedDrives.length - 2} more</div>
                              )}
                            </div>
                          ) : (
                            <span className="text-zinc-400">None</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewProfile(student.id)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Profile"
                          >
                            <Eye className="size-4" />
                          </button>
                          {student.status === "Eligible" && (
                            <button
                              onClick={() => handleShortlist(student.id)}
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Shortlist"
                            >
                              <UserCheck className="size-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    </main>
  );
}