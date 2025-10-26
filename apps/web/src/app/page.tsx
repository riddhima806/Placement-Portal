"use client";
import { useState } from "react";
import {
  Building2,
  Briefcase,
  ClipboardCheck,
  FileText,
  Globe,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const [companyForm, setCompanyForm] = useState({
    name: "",
    industry: "",
    website: "",
    hrName: "",
    hrEmail: "",
    hrPhone: "",
  });

  const [driveForm, setDriveForm] = useState({
    company: "",
    role: "",
    type: "",
    package: "",
    location: "",
    deadline: "",
    description: "",
  });

  const handleCompanySubmit = () => {
    console.log("Company submitted:", companyForm);
    alert("Company added successfully!");
  };

  const handleDriveSubmit = () => {
    console.log("Drive submitted:", driveForm);
    alert("Drive created successfully!");
  };

  const otherActions = [
    {
      icon: ClipboardCheck,
      title: "Mark Attendance",
      description: "Track interview participation",
      stats: "Today: 28/45",
      link: "/attendance",
    },
    {
      icon: FileText,
      title: "Generate Reports",
      description: "Export placement analytics",
      stats: "12 This Month",
      link: "/reports",
    },
    {
      icon: Globe,
      title: "Scraped Opportunities",
      description: "Review external job postings",
      stats: "23 New",
      link: "/opportunities",
    },
  ];

  return (
    <div className="relative">
      <img
        className="fixed h-screen w-screen opacity-50 z-0"
        src="/bg.png"
        alt="Background"
      />
      <section className="relative z-20 min-h-screen">
        <div className="h-10 w-full bg-gradient-to-br from-neutral-900 to-nmims"></div>
        <header className="bg-white p-5 flex flex-row justify-between items-center w-full shadow-sm">
          <img src="/nmims.png" className="max-h-14" alt="NMIMS Logo" />
          <div className="max-w-fit flex flex-row justify-around items-center gap-9 font-medium text-zinc-600">
            <a className="hover:underline hover:cursor-pointer hover:text-nmims transition">
              Companies
            </a>
            <a className="hover:underline hover:cursor-pointer hover:text-nmims transition">
              Drives
            </a>
            <a className="hover:underline hover:cursor-pointer hover:text-nmims transition">
              Attendance
            </a>
            <a className="hover:underline hover:cursor-pointer hover:text-nmims transition">
              Students
            </a>
            <a className="hover:underline hover:cursor-pointer hover:text-nmims transition">
              Opportunities
            </a>
            <a className="flex flex-row justify-center items-center gap-2 hover:cursor-pointer">
              <img
                src="https://thispersondoesnotexist.com/"
                className="size-10 rounded-full"
                alt="Profile"
              />
              Yash Deshpande
            </a>
          </div>
        </header>
        <main className="w-full flex flex-col md:flex-row justify-around px-4">
          <section className="w-full max-w-7xl mx-auto mt-10 px-4 pb-16">
            <header className="bg-nmims rounded-tr-full rounded-bl-full w-full p-5 mb-8">
              <h1 className="text-center text-white font-bold text-xl">
                Quick Actions
              </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-nmims text-white">
                    <Building2 className="size-5" />
                  </div>
                  <h2 className="font-bold text-lg text-zinc-800">
                    Add New Company
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setCompanyForm({
                          ...companyForm,
                          industry: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    >
                      <option value="">Select Industry</option>
                      <option value="IT">IT & Software</option>
                      <option value="Finance">Finance & Banking</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Manufacturing">Manufacturing</option>
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
                      onChange={(e) =>
                        setCompanyForm({
                          ...companyForm,
                          website: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                      placeholder="https://company.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        HR Name
                      </label>
                      <input
                        type="text"
                        value={companyForm.hrName}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            hrName: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            hrEmail: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            hrPhone: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCompanySubmit}
                    className="w-full bg-nmims text-white py-2 rounded-md font-medium hover:opacity-90 transition"
                  >
                    Add Company
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-nmims text-white">
                    <Briefcase className="size-5" />
                  </div>
                  <h2 className="font-bold text-lg text-zinc-800">
                    Create New Drive
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Company
                    </label>
                    <select
                      value={driveForm.company}
                      onChange={(e) =>
                        setDriveForm({ ...driveForm, company: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    >
                      <option value="">Select Company</option>
                      <option value="google">Google India</option>
                      <option value="microsoft">Microsoft</option>
                      <option value="amazon">Amazon</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Role Title
                    </label>
                    <input
                      type="text"
                      value={driveForm.role}
                      onChange={(e) =>
                        setDriveForm({ ...driveForm, role: e.target.value })
                      }
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
                      onChange={(e) =>
                        setDriveForm({ ...driveForm, type: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    >
                      <option value="">Select Type</option>
                      <option value="fulltime">Full Time</option>
                      <option value="internship">Internship</option>
                      <option value="both">Full Time + Internship</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Package (LPA)
                      </label>
                      <input
                        type="text"
                        value={driveForm.package}
                        onChange={(e) =>
                          setDriveForm({
                            ...driveForm,
                            package: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setDriveForm({
                            ...driveForm,
                            location: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                        placeholder="Mumbai"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      value={driveForm.deadline}
                      onChange={(e) =>
                        setDriveForm({ ...driveForm, deadline: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={driveForm.description}
                      onChange={(e) =>
                        setDriveForm({
                          ...driveForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                      rows={3}
                      placeholder="Job description, requirements, eligibility..."
                    />
                  </div>

                  <button
                    onClick={handleDriveSubmit}
                    className="w-full bg-nmims text-white py-2 rounded-md font-medium hover:opacity-90 transition"
                  >
                    Create Drive
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <h2 className="font-bold text-lg text-zinc-800 mb-4">
                Other Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherActions.map((action, index) => (
                  <div
                    key={index}
                    className="p-4 border border-zinc-200 rounded-lg hover:shadow-md hover:border-nmims transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-nmims text-white">
                        <action.icon className="size-4" />
                      </div>
                      <h3 className="font-bold text-zinc-800">
                        {action.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-600 mb-2">
                      {action.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500">
                        {action.stats}
                      </span>
                      <ChevronRight className="size-4 text-nmims group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>{" "}
          <div className="md:max-w-sm w-full  bg-white border my-10 rounded h-fit">
            <header className="bg-gradient-to-br from-neutral-900 to-nmims p-4 rounded">
              <h1 className=" font-medium text-white text-center">
                Recently Scraped
              </h1>
            </header>
            <div className="*:border-t *:border-b *:p-5 *:text-sm *:hover:underline *:hover:text-nmims *:hover:cursor-pointer">
              <p>
                Sundawn Engineering, an up-and-coming SaaS firm, has open
                positions for Design Engineers
              </p>
              <p>Design Engineer - Cloud Solutions - Bengaluru</p>
              <p>Senior Mechanical Engineer - Remote - 5+ years experience</p>
              <p>Frontend Developer - React/Next.js - Hybrid</p>
              <p>Data Analyst - SQL/PowerBI - Full-time</p>
              <p>Product Manager - SaaS Platforms - Bengaluru</p>
              <p>DevOps Engineer - AWS/GCP - Remote</p>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
