"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Briefcase,
  ClipboardCheck,
  FileText,
  Users,
  BarChart3,
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  UserCheck,
  Download,
  Bell,
  ChevronRight,
  Globe,
} from "lucide-react";

export default function TPODashboard() {
  const [announcement, setAnnouncement] = useState("");

  const handleAnnouncement = () => {
    if (announcement.trim()) {
      console.log("Announcement sent:", announcement);
      alert("Announcement sent to all students!");
      setAnnouncement("");
    }
  };

  const stats = [
    {
      title: "Active Drives",
      value: "4",
      icon: Briefcase,
    },
    {
      title: "Pending Approvals",
      value: "2",
      icon: Clock,
    },
    {
      title: "Total Applicants",
      value: "150",
      icon: Users,
    },
    {
      title: "Placement Rate",
      value: "78%",
      icon: TrendingUp,
    },
  ];

  const quickActions = [
    {
      icon: Building2,
      title: "Manage Companies",
      description: "Add or edit company details",
      link: "/tpo/companies",
    },
    {
      icon: Briefcase,
      title: "Drive Management",
      description: "Create and manage placement drives",
      link: "/tpo/drives",
    },
    {
      icon: Users,
      title: "Student Management",
      description: "View eligible students and shortlists",
      link: "/tpo/students",
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description: "Generate placement statistics",
      link: "/tpo/reports",
    },
    {
      icon: ClipboardCheck,
      title: "Attendance",
      description: "Mark placement session attendance",
      link: "/tpo/attendance" as any,
    },
    {
      icon: MessageSquare,
      title: "Communications",
      description: "Send announcements and reminders",
      link: "/tpo/communications",
    },
    {
      icon: Globe,
      title: "Scraped Opportunities",
      description: "Review external job postings",
      link: "/tpo/opportunities",
    },
  ];

  const recentDrives = [
    {
      company: "Google India",
      role: "Software Engineer",
      applicants: 45,
      status: "Active",
      deadline: "2024-02-15",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      company: "Microsoft",
      role: "Product Manager",
      applicants: 32,
      status: "Pending Approval",
      deadline: "2024-02-20",
      statusColor: "text-yellow-600",
      statusBg: "bg-yellow-100",
    },
    {
      company: "Amazon",
      role: "Data Scientist",
      applicants: 28,
      status: "Active",
      deadline: "2024-02-18",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
  ];

  return (
    <main className="w-full flex flex-col md:flex-row justify-around px-4">
      <section className="w-full max-w-7xl mx-auto mt-10 px-4 pb-16">
        {/* Welcome Header */}
        <header className="bg-nmims rounded-tr-full rounded-bl-full w-full p-5 mb-8">
          <h1 className="text-center text-white font-bold text-2xl">
            TPO Dashboard
          </h1>
          <p className="text-center text-white/90 mt-2">
            Manage placement drives, companies, and student data
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-zinc-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-zinc-900">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-nmims text-white">
                  <stat.icon className="size-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200 mb-8">
          <h2 className="font-bold text-xl text-zinc-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.link}
                className="p-4 border border-zinc-200 rounded-lg hover:shadow-md hover:border-nmims transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-nmims text-white">
                    <action.icon className="size-4" />
                  </div>
                  <h3 className="font-bold text-zinc-800">{action.title}</h3>
                </div>
                <p className="text-sm text-zinc-600 mb-2">
                  {action.description}
                </p>
                <div className="flex items-center justify-end">
                  <ChevronRight className="size-4 text-nmims group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Drives */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
            <h2 className="font-bold text-xl text-zinc-800 mb-6">
              Recent Drives
            </h2>
            <div className="space-y-4">
              {recentDrives.map((drive, index) => (
                <div
                  key={index}
                  className="p-4 border border-zinc-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-zinc-800">
                      {drive.company}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${drive.statusBg} ${drive.statusColor}`}
                    >
                      {drive.status}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 mb-2">{drive.role}</p>
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <span>{drive.applicants} applicants</span>
                    <span>Deadline: {drive.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/tpo/drives"
              className="block text-center text-nmims hover:underline mt-4"
            >
              View All Drives →
            </Link>
          </div>

          {/* Quick Announcement */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
            <h2 className="font-bold text-xl text-zinc-800 mb-6">
              Quick Announcement
            </h2>
            <div className="space-y-4">
              <textarea
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                rows={4}
                placeholder="Type your announcement here..."
              />
              <button
                onClick={handleAnnouncement}
                className="w-full bg-nmims text-white py-2 rounded-md font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <Bell className="size-4" />
                Send Announcement
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Scraped Opportunities Panel */}
      <div className="md:max-w-sm w-full bg-white border my-10 rounded h-fit">
        <header className="bg-gradient-to-br from-neutral-900 to-nmims p-4 rounded">
          <h1 className="font-medium text-white text-center">
            Recently Scraped
          </h1>
        </header>
        <div className="*:border-t *:border-b *:p-5 *:text-sm *:hover:underline *:hover:text-nmims *:hover:cursor-pointer">
          <p>
            Sundawn Engineering, an up-and-coming SaaS firm, has open positions
            for Design Engineers
          </p>
          <p>Design Engineer - Cloud Solutions - Bengaluru</p>
          <p>Senior Mechanical Engineer - Remote - 5+ years experience</p>
          <p>Frontend Developer - React/Next.js - Hybrid</p>
          <p>Data Analyst - SQL/PowerBI - Full-time</p>
          <p>Product Manager - SaaS Platforms - Bengaluru</p>
          <p>DevOps Engineer - AWS/GCP - Remote</p>
          <p>UX Designer - Figma/Sketch - Mumbai</p>
          <p>Backend Developer - Node.js/Python - Pune</p>
          <p>Mobile Developer - React Native - Delhi</p>
          <p>Data Scientist - ML/AI - Bangalore</p>
        </div>
      </div>
    </main>
  );
}
