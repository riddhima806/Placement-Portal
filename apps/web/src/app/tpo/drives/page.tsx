"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Briefcase,
  Plus,
  Edit,
  Eye,
  Trash2,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";

export default function DriveManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [driveForm, setDriveForm] = useState({
    company: "",
    role: "",
    type: "",
    package: "",
    location: "",
    deadline: "",
    description: "",
    eligibility: "",
    positions: "",
  });

  const drives = [
    {
      id: 1,
      company: "Google India",
      role: "Software Engineer",
      type: "Full Time",
      package: "15-20 LPA",
      location: "Bangalore",
      deadline: "2024-02-15",
      status: "Active",
      applicants: 45,
      positions: 5,
      eligibility: "CGPA ≥ 7.0, No backlogs",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Product Manager",
      type: "Full Time",
      package: "12-18 LPA",
      location: "Hyderabad",
      deadline: "2024-02-20",
      status: "Pending Approval",
      applicants: 32,
      positions: 3,
      eligibility: "CGPA ≥ 6.5, MBA preferred",
      statusColor: "text-yellow-600",
      statusBg: "bg-yellow-100",
    },
    {
      id: 3,
      company: "Amazon",
      role: "Data Scientist",
      type: "Full Time + Internship",
      package: "10-15 LPA",
      location: "Mumbai",
      deadline: "2024-02-18",
      status: "Active",
      applicants: 28,
      positions: 4,
      eligibility: "CGPA ≥ 7.5, ML/AI background",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 4,
      company: "TCS",
      role: "System Engineer",
      type: "Full Time",
      package: "6-8 LPA",
      location: "Pune",
      deadline: "2024-02-10",
      status: "Completed",
      applicants: 67,
      positions: 10,
      eligibility: "CGPA ≥ 6.0, No backlogs",
      statusColor: "text-blue-600",
      statusBg: "bg-blue-100",
    },
  ];

  const filteredDrives = drives.filter((drive) => {
    const matchesSearch = drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drive.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || drive.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = () => {
    console.log("Drive submitted:", driveForm);
    alert("Drive created successfully! Awaiting admin approval.");
    setShowAddForm(false);
    setDriveForm({
      company: "",
      role: "",
      type: "",
      package: "",
      location: "",
      deadline: "",
      description: "",
      eligibility: "",
      positions: "",
    });
  };

  const handleEdit = (driveId: number) => {
    console.log("Edit drive:", driveId);
    alert("Edit functionality will be implemented");
  };

  const handleDelete = (driveId: number) => {
    if (confirm("Are you sure you want to delete this drive?")) {
      console.log("Delete drive:", driveId);
      alert("Drive deleted successfully");
    }
  };

  const handleView = (driveId: number) => {
    console.log("View drive:", driveId);
    alert("View details functionality will be implemented");
  };

  return (
    <main className="w-full max-w-7xl mx-auto mt-10 px-4 pb-16">
          {/* Header */}
          <header className="bg-nmims rounded-tr-full rounded-bl-full w-full p-5 mb-8">
            <h1 className="text-center text-white font-bold text-2xl">
              Drive Management
            </h1>
            <p className="text-center text-white/90 mt-2">
              Create, manage, and track placement drives
            </p>
          </header>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 size-4" />
                  <input
                    type="text"
                    placeholder="Search drives..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending Approval</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-nmims text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition flex items-center gap-2"
              >
                <Plus className="size-4" />
                Add New Drive
              </button>
            </div>
          </div>

          {/* Add Drive Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200 mb-8">
              <h2 className="font-bold text-xl text-zinc-800 mb-6">Create New Drive</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Company
                  </label>
                  <select
                    value={driveForm.company}
                    onChange={(e) => setDriveForm({ ...driveForm, company: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  >
                    <option value="">Select Company</option>
                    <option value="google">Google India</option>
                    <option value="microsoft">Microsoft</option>
                    <option value="amazon">Amazon</option>
                    <option value="tcs">TCS</option>
                    <option value="infosys">Infosys</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={driveForm.role}
                    onChange={(e) => setDriveForm({ ...driveForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="e.g., Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Type
                  </label>
                  <select
                    value={driveForm.type}
                    onChange={(e) => setDriveForm({ ...driveForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  >
                    <option value="">Select Type</option>
                    <option value="fulltime">Full Time</option>
                    <option value="internship">Internship</option>
                    <option value="both">Full Time + Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Package (LPA)
                  </label>
                  <input
                    type="text"
                    value={driveForm.package}
                    onChange={(e) => setDriveForm({ ...driveForm, package: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="12-15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={driveForm.location}
                    onChange={(e) => setDriveForm({ ...driveForm, location: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Positions Available
                  </label>
                  <input
                    type="number"
                    value={driveForm.positions}
                    onChange={(e) => setDriveForm({ ...driveForm, positions: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={driveForm.deadline}
                    onChange={(e) => setDriveForm({ ...driveForm, deadline: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Eligibility Criteria
                  </label>
                  <input
                    type="text"
                    value={driveForm.eligibility}
                    onChange={(e) => setDriveForm({ ...driveForm, eligibility: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="CGPA ≥ 7.0, No backlogs"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Job Description
                  </label>
                  <textarea
                    value={driveForm.description}
                    onChange={(e) => setDriveForm({ ...driveForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    rows={4}
                    placeholder="Job description, requirements, responsibilities..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-zinc-300 text-zinc-700 rounded-md hover:bg-zinc-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-nmims text-white rounded-md font-medium hover:opacity-90 transition"
                >
                  Create Drive
                </button>
              </div>
            </div>
          )}

          {/* Drives List */}
          <div className="bg-white rounded-lg shadow-md border border-zinc-200">
            <div className="p-6 border-b border-zinc-200">
              <h2 className="font-bold text-xl text-zinc-800">All Drives</h2>
              <p className="text-zinc-600 mt-1">{filteredDrives.length} drives found</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Company & Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Type & Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Applicants
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-200">
                  {filteredDrives.map((drive) => (
                    <tr key={drive.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{drive.company}</div>
                          <div className="text-sm text-zinc-500">{drive.role}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-zinc-900">{drive.type}</div>
                          <div className="text-sm text-zinc-500 flex items-center gap-1">
                            <DollarSign className="size-3" />
                            {drive.package}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-900 flex items-center gap-1">
                          <MapPin className="size-3" />
                          {drive.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-900 flex items-center gap-1">
                          <Calendar className="size-3" />
                          {drive.deadline}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${drive.statusBg} ${drive.statusColor}`}>
                          {drive.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-900 flex items-center gap-1">
                          <Users className="size-3" />
                          {drive.applicants}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(drive.id)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Details"
                          >
                            <Eye className="size-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(drive.id)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Edit Drive"
                          >
                            <Edit className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(drive.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Drive"
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