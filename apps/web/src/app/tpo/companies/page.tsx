"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Edit,
  Eye,
  Trash2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
} from "lucide-react";

export default function CompanyManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [companyForm, setCompanyForm] = useState({
    name: "",
    industry: "",
    website: "",
    hrName: "",
    hrEmail: "",
    hrPhone: "",
    address: "",
    description: "",
  });

  const companies = [
    {
      id: 1,
      name: "Google India",
      industry: "IT & Software",
      website: "https://careers.google.com",
      hrName: "Sarah Johnson",
      hrEmail: "sarah.johnson@google.com",
      hrPhone: "+91 98765 43210",
      address: "Bangalore, Karnataka",
      status: "Approved",
      drives: 3,
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 2,
      name: "Microsoft",
      industry: "IT & Software",
      website: "https://careers.microsoft.com",
      hrName: "Rajesh Kumar",
      hrEmail: "rajesh.kumar@microsoft.com",
      hrPhone: "+91 98765 43211",
      address: "Hyderabad, Telangana",
      status: "Approved",
      drives: 2,
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 3,
      name: "Amazon",
      industry: "E-commerce & Cloud",
      website: "https://amazon.jobs",
      hrName: "Priya Sharma",
      hrEmail: "priya.sharma@amazon.com",
      hrPhone: "+91 98765 43212",
      address: "Mumbai, Maharashtra",
      status: "Pending Approval",
      drives: 1,
      statusColor: "text-yellow-600",
      statusBg: "bg-yellow-100",
    },
    {
      id: 4,
      name: "TCS",
      industry: "IT Services",
      website: "https://careers.tcs.com",
      hrName: "Amit Patel",
      hrEmail: "amit.patel@tcs.com",
      hrPhone: "+91 98765 43213",
      address: "Pune, Maharashtra",
      status: "Approved",
      drives: 4,
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 5,
      name: "StartupXYZ",
      industry: "Fintech",
      website: "https://startupxyz.com",
      hrName: "Neha Singh",
      hrEmail: "neha.singh@startupxyz.com",
      hrPhone: "+91 98765 43214",
      address: "Delhi, NCR",
      status: "Rejected",
      drives: 0,
      statusColor: "text-red-600",
      statusBg: "bg-red-100",
    },
  ];

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || company.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = () => {
    console.log("Company submitted:", companyForm);
    alert("Company added successfully! Awaiting admin approval.");
    setShowAddForm(false);
    setCompanyForm({
      name: "",
      industry: "",
      website: "",
      hrName: "",
      hrEmail: "",
      hrPhone: "",
      address: "",
      description: "",
    });
  };

  const handleEdit = (companyId: number) => {
    console.log("Edit company:", companyId);
    alert("Edit functionality will be implemented");
  };

  const handleDelete = (companyId: number) => {
    if (confirm("Are you sure you want to delete this company?")) {
      console.log("Delete company:", companyId);
      alert("Company deleted successfully");
    }
  };

  const handleView = (companyId: number) => {
    console.log("View company:", companyId);
    alert("View details functionality will be implemented");
  };

  return (
    <main className="w-full max-w-7xl mx-auto mt-10 px-4 pb-16">
          {/* Header */}
          <header className="bg-nmims rounded-tr-full rounded-bl-full w-full p-5 mb-8">
            <h1 className="text-center text-white font-bold text-2xl">
              Company Management
            </h1>
            <p className="text-center text-white/90 mt-2">
              Add, manage, and track company partnerships
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
                    placeholder="Search companies..."
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
                  <option value="approved">Approved</option>
                  <option value="pending">Pending Approval</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-nmims text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition flex items-center gap-2"
              >
                <Plus className="size-4" />
                Add New Company
              </button>
            </div>
          </div>

          {/* Add Company Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200 mb-8">
              <h2 className="font-bold text-xl text-zinc-800 mb-6">Add New Company</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="e.g., Google India"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Industry
                  </label>
                  <select
                    value={companyForm.industry}
                    onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  >
                    <option value="">Select Industry</option>
                    <option value="IT & Software">IT & Software</option>
                    <option value="Finance & Banking">Finance & Banking</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="E-commerce & Cloud">E-commerce & Cloud</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    value={companyForm.website}
                    onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="https://company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={companyForm.address}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    HR Contact Name
                  </label>
                  <input
                    type="text"
                    value={companyForm.hrName}
                    onChange={(e) => setCompanyForm({ ...companyForm, hrName: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="Contact person"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    HR Email
                  </label>
                  <input
                    type="email"
                    value={companyForm.hrEmail}
                    onChange={(e) => setCompanyForm({ ...companyForm, hrEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="hr@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    HR Phone
                  </label>
                  <input
                    type="tel"
                    value={companyForm.hrPhone}
                    onChange={(e) => setCompanyForm({ ...companyForm, hrPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Company Description
                  </label>
                  <textarea
                    value={companyForm.description}
                    onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    rows={3}
                    placeholder="Brief description of the company..."
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
                  Add Company
                </button>
              </div>
            </div>
          )}

          {/* Companies List */}
          <div className="bg-white rounded-lg shadow-md border border-zinc-200">
            <div className="p-6 border-b border-zinc-200">
              <h2 className="font-bold text-xl text-zinc-800">All Companies</h2>
              <p className="text-zinc-600 mt-1">{filteredCompanies.length} companies found</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Company Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Drives
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-200">
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{company.name}</div>
                          <div className="text-sm text-zinc-500 flex items-center gap-1">
                            <Globe className="size-3" />
                            <a 
                              href={company.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-nmims transition"
                            >
                              {company.website}
                            </a>
                            <ExternalLink className="size-3" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-900">{company.industry}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-zinc-900 flex items-center gap-1">
                            <Mail className="size-3" />
                            {company.hrEmail}
                          </div>
                          <div className="text-sm text-zinc-500 flex items-center gap-1">
                            <Phone className="size-3" />
                            {company.hrPhone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-900 flex items-center gap-1">
                          <MapPin className="size-3" />
                          {company.address}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${company.statusBg} ${company.statusColor}`}>
                          {company.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-900">{company.drives} drives</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(company.id)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Details"
                          >
                            <Eye className="size-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(company.id)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Edit Company"
                          >
                            <Edit className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(company.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Company"
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