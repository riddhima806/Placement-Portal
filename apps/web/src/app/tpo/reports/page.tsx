"use client";
import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  Users,
  Building2,
  Briefcase,
  Calendar,
  PieChart,
  Activity,
  Award,
  Target,
  Filter,
  Calendar as CalendarIcon,
} from "lucide-react";

export default function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const placementStats = {
    totalStudents: 150,
    placedStudents: 117,
    placementRate: 78,
    averagePackage: 8.5,
    highestPackage: 25,
    totalCompanies: 45,
    totalDrives: 12,
  };

  const departmentStats = [
    { name: "Computer Science", placed: 45, total: 50, rate: 90 },
    { name: "Information Technology", placed: 32, total: 40, rate: 80 },
    { name: "Electronics", placed: 25, total: 35, rate: 71 },
    { name: "Mechanical", placed: 15, total: 25, rate: 60 },
  ];

  const companyStats = [
    { name: "Google India", offers: 8, avgPackage: 18 },
    { name: "Microsoft", offers: 12, avgPackage: 15 },
    { name: "Amazon", offers: 15, avgPackage: 12 },
    { name: "TCS", offers: 25, avgPackage: 6 },
    { name: "Infosys", offers: 18, avgPackage: 7 },
    { name: "Wipro", offers: 10, avgPackage: 5 },
  ];

  const monthlyPlacements = [
    { month: "Jan", placed: 15, drives: 2 },
    { month: "Feb", placed: 22, drives: 3 },
    { month: "Mar", placed: 18, drives: 2 },
    { month: "Apr", placed: 25, drives: 4 },
    { month: "May", placed: 20, drives: 3 },
    { month: "Jun", placed: 17, drives: 2 },
  ];

  const handleExportReport = (type: string) => {
    console.log(`Exporting ${type} report...`);
    alert(`${type} report exported successfully!`);
  };

  const handleGenerateCustomReport = () => {
    console.log("Generating custom report...");
    alert("Custom report generation functionality will be implemented");
  };

  return (
    <main className="w-full max-w-7xl mx-auto mt-10 px-4 pb-16">
          {/* Header */}
          <header className="bg-nmims rounded-tr-full rounded-bl-full w-full p-5 mb-8">
            <h1 className="text-center text-white font-bold text-2xl">
              Reports & Analytics
            </h1>
            <p className="text-center text-white/90 mt-2">
              Generate placement reports and analyze performance metrics
            </p>
          </header>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="size-4 text-zinc-500" />
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="size-4 text-zinc-500" />
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  >
                    <option value="all">All Departments</option>
                    <option value="cs">Computer Science</option>
                    <option value="it">Information Technology</option>
                    <option value="electronics">Electronics</option>
                    <option value="mechanical">Mechanical</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleGenerateCustomReport}
                className="bg-nmims text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition flex items-center gap-2"
              >
                <FileText className="size-4" />
                Generate Custom Report
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Total Students</p>
                  <p className="text-3xl font-bold text-zinc-900">{placementStats.totalStudents}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Users className="size-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Placed Students</p>
                  <p className="text-3xl font-bold text-green-600">{placementStats.placedStudents}</p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <Award className="size-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Placement Rate</p>
                  <p className="text-3xl font-bold text-purple-600">{placementStats.placementRate}%</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Target className="size-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Avg Package (LPA)</p>
                  <p className="text-3xl font-bold text-orange-600">{placementStats.averagePackage}</p>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <TrendingUp className="size-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Department-wise Placement */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <h2 className="font-bold text-xl text-zinc-800 mb-6">Department-wise Placement</h2>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-zinc-800">{dept.name}</h3>
                      <p className="text-sm text-zinc-600">{dept.placed}/{dept.total} students placed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-nmims">{dept.rate}%</p>
                      <div className="w-20 bg-zinc-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-nmims h-2 rounded-full" 
                          style={{ width: `${dept.rate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company-wise Offers */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <h2 className="font-bold text-xl text-zinc-800 mb-6">Company-wise Offers</h2>
              <div className="space-y-4">
                {companyStats.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-zinc-800">{company.name}</h3>
                      <p className="text-sm text-zinc-600">{company.offers} offers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-nmims">{company.avgPackage} LPA</p>
                      <p className="text-sm text-zinc-600">Avg Package</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200 mb-8">
            <h2 className="font-bold text-xl text-zinc-800 mb-6">Monthly Placement Trends</h2>
            <div className="grid grid-cols-6 gap-4">
              {monthlyPlacements.map((month, index) => (
                <div key={index} className="text-center">
                  <div className="bg-nmims text-white p-3 rounded-lg mb-2">
                    <p className="text-sm font-medium">{month.month}</p>
                  </div>
                  <p className="text-lg font-bold text-zinc-800">{month.placed}</p>
                  <p className="text-xs text-zinc-600">Placed</p>
                  <p className="text-sm text-zinc-500">{month.drives} drives</p>
                </div>
              ))}
            </div>
          </div>

          {/* Report Generation */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
            <h2 className="font-bold text-xl text-zinc-800 mb-6">Generate Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => handleExportReport("Placement Summary")}
                className="p-4 border border-zinc-200 rounded-lg hover:shadow-md hover:border-nmims transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500 text-white">
                    <BarChart3 className="size-5" />
                  </div>
                  <h3 className="font-bold text-zinc-800">Placement Summary</h3>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Complete placement statistics and metrics</p>
                <div className="flex items-center text-nmims group-hover:underline">
                  <Download className="size-4 mr-1" />
                  Download PDF
                </div>
              </button>

              <button
                onClick={() => handleExportReport("Student List")}
                className="p-4 border border-zinc-200 rounded-lg hover:shadow-md hover:border-nmims transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-500 text-white">
                    <Users className="size-5" />
                  </div>
                  <h3 className="font-bold text-zinc-800">Student List</h3>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Detailed student records and applications</p>
                <div className="flex items-center text-nmims group-hover:underline">
                  <Download className="size-4 mr-1" />
                  Download Excel
                </div>
              </button>

              <button
                onClick={() => handleExportReport("Company Analysis")}
                className="p-4 border border-zinc-200 rounded-lg hover:shadow-md hover:border-nmims transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-500 text-white">
                    <Building2 className="size-5" />
                  </div>
                  <h3 className="font-bold text-zinc-800">Company Analysis</h3>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Company-wise placement analysis and trends</p>
                <div className="flex items-center text-nmims group-hover:underline">
                  <Download className="size-4 mr-1" />
                  Download PDF
                </div>
              </button>

              <button
                onClick={() => handleExportReport("Drive Report")}
                className="p-4 border border-zinc-200 rounded-lg hover:shadow-md hover:border-nmims transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-orange-500 text-white">
                    <Briefcase className="size-5" />
                  </div>
                  <h3 className="font-bold text-zinc-800">Drive Report</h3>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Detailed analysis of all placement drives</p>
                <div className="flex items-center text-nmims group-hover:underline">
                  <Download className="size-4 mr-1" />
                  Download PDF
                </div>
              </button>

              <button
                onClick={() => handleExportReport("Department Report")}
                className="p-4 border border-zinc-200 rounded-lg hover:shadow-md hover:border-nmims transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-red-500 text-white">
                    <PieChart className="size-5" />
                  </div>
                  <h3 className="font-bold text-zinc-800">Department Report</h3>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Department-wise placement performance</p>
                <div className="flex items-center text-nmims group-hover:underline">
                  <Download className="size-4 mr-1" />
                  Download PDF
                </div>
              </button>

              <button
                onClick={() => handleExportReport("NAAC Report")}
                className="p-4 border border-zinc-200 rounded-lg hover:shadow-md hover:border-nmims transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indigo-500 text-white">
                    <Activity className="size-5" />
                  </div>
                  <h3 className="font-bold text-zinc-800">NAAC Report</h3>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Official report for accreditation purposes</p>
                <div className="flex items-center text-nmims group-hover:underline">
                  <Download className="size-4 mr-1" />
                  Download PDF
                </div>
              </button>
            </div>
          </div>
    </main>
  );
}