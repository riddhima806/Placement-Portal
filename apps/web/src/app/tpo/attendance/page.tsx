"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export default function AttendanceManagement() {
  const [showAddSession, setShowAddSession] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sessionFilter, setSessionFilter] = useState("all");

  const [sessionForm, setSessionForm] = useState({
    title: "",
    date: "",
    time: "",
    type: "",
    description: "",
  });

  const sessions = [
    {
      id: 1,
      title: "Mock Interview Session - Google",
      date: "2024-02-15",
      time: "10:00 AM",
      type: "Mock Interview",
      description: "Practice interview session for Google drive",
      totalStudents: 45,
      present: 42,
      absent: 3,
      attendanceRate: 93,
    },
    {
      id: 2,
      title: "Aptitude Test - Microsoft",
      date: "2024-02-12",
      time: "2:00 PM",
      type: "Aptitude Test",
      description: "Quantitative and logical reasoning test",
      totalStudents: 38,
      present: 35,
      absent: 3,
      attendanceRate: 92,
    },
    {
      id: 3,
      title: "Technical Workshop - Amazon",
      date: "2024-02-10",
      time: "9:00 AM",
      type: "Workshop",
      description: "AWS and cloud computing workshop",
      totalStudents: 52,
      present: 48,
      absent: 4,
      attendanceRate: 92,
    },
    {
      id: 4,
      title: "Resume Review Session",
      date: "2024-02-08",
      time: "3:00 PM",
      type: "Training",
      description: "One-on-one resume review and feedback",
      totalStudents: 30,
      present: 28,
      absent: 2,
      attendanceRate: 93,
    },
  ];

  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      rollNo: "2021001",
      department: "Computer Science",
      status: "Present",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 2,
      name: "Priya Patel",
      rollNo: "2021002",
      department: "Information Technology",
      status: "Present",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 3,
      name: "Amit Kumar",
      rollNo: "2021003",
      department: "Electronics",
      status: "Absent",
      statusColor: "text-red-600",
      statusBg: "bg-red-100",
    },
    {
      id: 4,
      name: "Sneha Singh",
      rollNo: "2021004",
      department: "Computer Science",
      status: "Present",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
  ];

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = sessionFilter === "all" || session.type.toLowerCase().includes(sessionFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = () => {
    console.log("Session submitted:", sessionForm);
    alert("Session created successfully!");
    setShowAddSession(false);
    setSessionForm({
      title: "",
      date: "",
      time: "",
      type: "",
      description: "",
    });
  };

  const handleMarkAttendance = (sessionId: number) => {
    console.log("Mark attendance for session:", sessionId);
    alert("Attendance marking functionality will be implemented");
  };

  const handleViewAttendance = (sessionId: number) => {
    console.log("View attendance for session:", sessionId);
    alert("View attendance functionality will be implemented");
  };

  const handleEditSession = (sessionId: number) => {
    console.log("Edit session:", sessionId);
    alert("Edit session functionality will be implemented");
  };

  const handleDeleteSession = (sessionId: number) => {
    if (confirm("Are you sure you want to delete this session?")) {
      console.log("Delete session:", sessionId);
      alert("Session deleted successfully");
    }
  };

  const handleExportAttendance = () => {
    console.log("Exporting attendance data...");
    alert("Attendance data exported successfully!");
  };

  return (
    <main className="w-full max-w-7xl mx-auto mt-10 px-4 pb-16">
          {/* Header */}
          <header className="bg-nmims rounded-tr-full rounded-bl-full w-full p-5 mb-8">
            <h1 className="text-center text-white font-bold text-2xl">
              Attendance Management
            </h1>
            <p className="text-center text-white/90 mt-2">
              Track placement session attendance and training participation
            </p>
          </header>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Total Sessions</p>
                  <p className="text-3xl font-bold text-zinc-900">{sessions.length}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Calendar className="size-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Avg Attendance</p>
                  <p className="text-3xl font-bold text-green-600">
                    {Math.round(sessions.reduce((acc, session) => acc + session.attendanceRate, 0) / sessions.length)}%
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
                  <p className="text-sm font-medium text-zinc-600">Total Students</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {sessions.reduce((acc, session) => acc + session.totalStudents, 0)}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Users className="size-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Present Today</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {sessions[0]?.present || 0}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <Clock className="size-6 text-orange-600" />
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
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  />
                </div>
                <select
                  value={sessionFilter}
                  onChange={(e) => setSessionFilter(e.target.value)}
                  className="px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                >
                  <option value="all">All Types</option>
                  <option value="mock interview">Mock Interview</option>
                  <option value="aptitude test">Aptitude Test</option>
                  <option value="workshop">Workshop</option>
                  <option value="training">Training</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleExportAttendance}
                  className="bg-zinc-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition flex items-center gap-2"
                >
                  <Download className="size-4" />
                  Export Data
                </button>
                <button
                  onClick={() => setShowAddSession(!showAddSession)}
                  className="bg-nmims text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition flex items-center gap-2"
                >
                  <Plus className="size-4" />
                  Add Session
                </button>
              </div>
            </div>
          </div>

          {/* Add Session Form */}
          {showAddSession && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200 mb-8">
              <h2 className="font-bold text-xl text-zinc-800 mb-6">Add New Session</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Session Title
                  </label>
                  <input
                    type="text"
                    value={sessionForm.title}
                    onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="e.g., Mock Interview Session - Google"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Session Type
                  </label>
                  <select
                    value={sessionForm.type}
                    onChange={(e) => setSessionForm({ ...sessionForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  >
                    <option value="">Select Type</option>
                    <option value="Mock Interview">Mock Interview</option>
                    <option value="Aptitude Test">Aptitude Test</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Training">Training</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={sessionForm.date}
                    onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={sessionForm.time}
                    onChange={(e) => setSessionForm({ ...sessionForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={sessionForm.description}
                    onChange={(e) => setSessionForm({ ...sessionForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    rows={3}
                    placeholder="Session description and details..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowAddSession(false)}
                  className="px-4 py-2 border border-zinc-300 text-zinc-700 rounded-md hover:bg-zinc-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-nmims text-white rounded-md font-medium hover:opacity-90 transition"
                >
                  Create Session
                </button>
              </div>
            </div>
          )}

          {/* Sessions List */}
          <div className="bg-white rounded-lg shadow-md border border-zinc-200">
            <div className="p-6 border-b border-zinc-200">
              <h2 className="font-bold text-xl text-zinc-800">Placement Sessions</h2>
              <p className="text-zinc-600 mt-1">{filteredSessions.length} sessions found</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Session Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Attendance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-200">
                  {filteredSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{session.title}</div>
                          <div className="text-sm text-zinc-500">{session.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-zinc-900 flex items-center gap-1">
                            <Calendar className="size-3" />
                            {session.date}
                          </div>
                          <div className="text-sm text-zinc-500 flex items-center gap-1">
                            <Clock className="size-3" />
                            {session.time}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {session.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-zinc-900">
                            {session.present}/{session.total} students
                          </div>
                          <div className="text-sm text-zinc-500">
                            {session.absent} absent
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-zinc-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-nmims h-2 rounded-full" 
                              style={{ width: `${session.attendanceRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-zinc-900">{session.attendanceRate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleMarkAttendance(session.id)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Mark Attendance"
                          >
                            <ClipboardCheck className="size-4" />
                          </button>
                          <button
                            onClick={() => handleViewAttendance(session.id)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="View Attendance"
                          >
                            <Eye className="size-4" />
                          </button>
                          <button
                            onClick={() => handleEditSession(session.id)}
                            className="text-yellow-600 hover:text-yellow-900 p-1"
                            title="Edit Session"
                          >
                            <Edit className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSession(session.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Session"
                          >
                            <Trash2 className="size-4" />
                          </button>
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