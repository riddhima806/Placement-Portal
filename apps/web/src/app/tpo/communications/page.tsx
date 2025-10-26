"use client";
import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Bell,
  Send,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";

export default function Communications() {
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const [messageForm, setMessageForm] = useState({
    title: "",
    content: "",
    type: "",
    targetAudience: "",
    priority: "",
    scheduledDate: "",
    scheduledTime: "",
  });

  const announcements = [
    {
      id: 1,
      title: "Google Drive Application Deadline Extended",
      content: "The application deadline for Google India drive has been extended to February 20th, 2024. Please submit your applications before the new deadline.",
      type: "Drive Update",
      targetAudience: "All Students",
      priority: "High",
      status: "Sent",
      sentDate: "2024-02-10",
      sentTime: "10:30 AM",
      recipients: 150,
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
      priorityColor: "text-red-600",
      priorityBg: "bg-red-100",
    },
    {
      id: 2,
      title: "Mock Interview Session Tomorrow",
      content: "There will be a mock interview session for Microsoft drive tomorrow at 2:00 PM in the placement hall. All eligible students are required to attend.",
      type: "Reminder",
      targetAudience: "Eligible Students",
      priority: "Medium",
      status: "Sent",
      sentDate: "2024-02-11",
      sentTime: "3:15 PM",
      recipients: 45,
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
      priorityColor: "text-yellow-600",
      priorityBg: "bg-yellow-100",
    },
    {
      id: 3,
      title: "Resume Review Session Available",
      content: "One-on-one resume review sessions are now available. Book your slot through the student portal or contact the placement office.",
      type: "General",
      targetAudience: "All Students",
      priority: "Low",
      status: "Scheduled",
      sentDate: "2024-02-15",
      sentTime: "9:00 AM",
      recipients: 150,
      statusColor: "text-blue-600",
      statusBg: "bg-blue-100",
      priorityColor: "text-green-600",
      priorityBg: "bg-green-100",
    },
    {
      id: 4,
      title: "Amazon Drive Results Out",
      content: "The results for Amazon Data Scientist drive have been announced. Check your email for detailed feedback and next steps.",
      type: "Results",
      targetAudience: "Applicants",
      priority: "High",
      status: "Sent",
      sentDate: "2024-02-12",
      sentTime: "11:45 AM",
      recipients: 28,
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
      priorityColor: "text-red-600",
      priorityBg: "bg-red-100",
    },
  ];

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || announcement.type.toLowerCase().includes(typeFilter.toLowerCase());
    return matchesSearch && matchesType;
  });

  const handleSubmit = () => {
    console.log("Message submitted:", messageForm);
    alert("Message sent successfully!");
    setShowComposeForm(false);
    setMessageForm({
      title: "",
      content: "",
      type: "",
      targetAudience: "",
      priority: "",
      scheduledDate: "",
      scheduledTime: "",
    });
  };

  const handleEdit = (announcementId: number) => {
    console.log("Edit announcement:", announcementId);
    alert("Edit functionality will be implemented");
  };

  const handleDelete = (announcementId: number) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      console.log("Delete announcement:", announcementId);
      alert("Announcement deleted successfully");
    }
  };

  const handleView = (announcementId: number) => {
    console.log("View announcement:", announcementId);
    alert("View details functionality will be implemented");
  };

  const handleResend = (announcementId: number) => {
    console.log("Resend announcement:", announcementId);
    alert("Announcement resent successfully!");
  };

  return (
    <main className="w-full max-w-7xl mx-auto mt-10 px-4 pb-16">
          {/* Header */}
          <header className="bg-nmims rounded-tr-full rounded-bl-full w-full p-5 mb-8">
            <h1 className="text-center text-white font-bold text-2xl">
              Communications
            </h1>
            <p className="text-center text-white/90 mt-2">
              Send announcements, reminders, and updates to students
            </p>
          </header>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Total Messages</p>
                  <p className="text-3xl font-bold text-zinc-900">{announcements.length}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <MessageSquare className="size-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Sent Today</p>
                  <p className="text-3xl font-bold text-green-600">
                    {announcements.filter(a => a.sentDate === "2024-02-12").length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <Send className="size-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Scheduled</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {announcements.filter(a => a.status === "Scheduled").length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-yellow-100">
                  <Clock className="size-6 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Total Recipients</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {announcements.reduce((acc, a) => acc + a.recipients, 0)}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Users className="size-6 text-purple-600" />
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
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  />
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                >
                  <option value="all">All Types</option>
                  <option value="drive update">Drive Update</option>
                  <option value="reminder">Reminder</option>
                  <option value="general">General</option>
                  <option value="results">Results</option>
                </select>
              </div>
              <button
                onClick={() => setShowComposeForm(!showComposeForm)}
                className="bg-nmims text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition flex items-center gap-2"
              >
                <Plus className="size-4" />
                Compose Message
              </button>
            </div>
          </div>

          {/* Compose Form */}
          {showComposeForm && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200 mb-8">
              <h2 className="font-bold text-xl text-zinc-800 mb-6">Compose New Message</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Message Title
                  </label>
                  <input
                    type="text"
                    value={messageForm.title}
                    onChange={(e) => setMessageForm({ ...messageForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="Enter message title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Message Type
                  </label>
                  <select
                    value={messageForm.type}
                    onChange={(e) => setMessageForm({ ...messageForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  >
                    <option value="">Select Type</option>
                    <option value="Drive Update">Drive Update</option>
                    <option value="Reminder">Reminder</option>
                    <option value="General">General</option>
                    <option value="Results">Results</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={messageForm.targetAudience}
                    onChange={(e) => setMessageForm({ ...messageForm, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  >
                    <option value="">Select Audience</option>
                    <option value="All Students">All Students</option>
                    <option value="Eligible Students">Eligible Students</option>
                    <option value="Applicants">Applicants</option>
                    <option value="Placed Students">Placed Students</option>
                    <option value="Specific Department">Specific Department</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={messageForm.priority}
                    onChange={(e) => setMessageForm({ ...messageForm, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Schedule Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={messageForm.scheduledDate}
                    onChange={(e) => setMessageForm({ ...messageForm, scheduledDate: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Schedule Time (Optional)
                  </label>
                  <input
                    type="time"
                    value={messageForm.scheduledTime}
                    onChange={(e) => setMessageForm({ ...messageForm, scheduledTime: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Message Content
                  </label>
                  <textarea
                    value={messageForm.content}
                    onChange={(e) => setMessageForm({ ...messageForm, content: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    rows={6}
                    placeholder="Type your message here..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowComposeForm(false)}
                  className="px-4 py-2 border border-zinc-300 text-zinc-700 rounded-md hover:bg-zinc-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-nmims text-white rounded-md font-medium hover:opacity-90 transition flex items-center gap-2"
                >
                  <Send className="size-4" />
                  Send Message
                </button>
              </div>
            </div>
          )}

          {/* Messages List */}
          <div className="bg-white rounded-lg shadow-md border border-zinc-200">
            <div className="p-6 border-b border-zinc-200">
              <h2 className="font-bold text-xl text-zinc-800">Message History</h2>
              <p className="text-zinc-600 mt-1">{filteredAnnouncements.length} messages found</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Message Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Type & Audience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Sent Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Recipients
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-200">
                  {filteredAnnouncements.map((announcement) => (
                    <tr key={announcement.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{announcement.title}</div>
                          <div className="text-sm text-zinc-500 line-clamp-2">{announcement.content}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-zinc-900">{announcement.type}</div>
                          <div className="text-sm text-zinc-500">{announcement.targetAudience}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${announcement.priorityBg} ${announcement.priorityColor}`}>
                          {announcement.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${announcement.statusBg} ${announcement.statusColor}`}>
                          {announcement.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-zinc-900 flex items-center gap-1">
                            <Calendar className="size-3" />
                            {announcement.sentDate}
                          </div>
                          <div className="text-sm text-zinc-500">{announcement.sentTime}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-900 flex items-center gap-1">
                          <Users className="size-3" />
                          {announcement.recipients}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(announcement.id)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Details"
                          >
                            <Eye className="size-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(announcement.id)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Edit Message"
                          >
                            <Edit className="size-4" />
                          </button>
                          {announcement.status === "Sent" && (
                            <button
                              onClick={() => handleResend(announcement.id)}
                              className="text-purple-600 hover:text-purple-900 p-1"
                              title="Resend"
                            >
                              <Send className="size-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(announcement.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Message"
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