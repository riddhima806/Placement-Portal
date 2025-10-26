"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Search,
  Filter,
  ExternalLink,
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  Briefcase,
  Clock,
  Star,
  Bookmark,
  Share2,
} from "lucide-react";

export default function ScrapedOpportunities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const opportunities = [
    {
      id: 1,
      company: "Sundawn Engineering",
      title: "Design Engineer - Cloud Solutions",
      location: "Bengaluru",
      type: "Full-time",
      salary: "8-12 LPA",
      experience: "2-4 years",
      postedDate: "2024-02-10",
      source: "LinkedIn",
      description: "We are looking for a Design Engineer with expertise in cloud solutions and modern design principles.",
      skills: ["AutoCAD", "SolidWorks", "Cloud Architecture", "CAD"],
      isBookmarked: false,
      isNew: true,
    },
    {
      id: 2,
      company: "TechCorp Solutions",
      title: "Senior Mechanical Engineer",
      location: "Remote",
      type: "Full-time",
      salary: "12-18 LPA",
      experience: "5+ years",
      postedDate: "2024-02-09",
      source: "Indeed",
      description: "Remote position for experienced mechanical engineer with strong background in product design.",
      skills: ["Mechanical Design", "Product Development", "CAD", "FEA"],
      isBookmarked: true,
      isNew: false,
    },
    {
      id: 3,
      company: "Digital Innovations",
      title: "Frontend Developer - React/Next.js",
      location: "Hybrid",
      type: "Full-time",
      salary: "6-10 LPA",
      experience: "1-3 years",
      postedDate: "2024-02-08",
      source: "Naukri",
      description: "Join our frontend team to build modern web applications using React and Next.js.",
      skills: ["React", "Next.js", "JavaScript", "CSS", "TypeScript"],
      isBookmarked: false,
      isNew: true,
    },
    {
      id: 4,
      company: "DataFlow Analytics",
      title: "Data Analyst - SQL/PowerBI",
      location: "Mumbai",
      type: "Full-time",
      salary: "5-8 LPA",
      experience: "1-2 years",
      postedDate: "2024-02-07",
      source: "Glassdoor",
      description: "Analyze business data and create insights using SQL and PowerBI tools.",
      skills: ["SQL", "PowerBI", "Excel", "Data Analysis", "Python"],
      isBookmarked: false,
      isNew: false,
    },
    {
      id: 5,
      company: "ProductHub",
      title: "Product Manager - SaaS Platforms",
      location: "Bengaluru",
      type: "Full-time",
      salary: "15-25 LPA",
      experience: "3-6 years",
      postedDate: "2024-02-06",
      source: "LinkedIn",
      description: "Lead product strategy for our SaaS platform serving enterprise clients.",
      skills: ["Product Management", "SaaS", "Agile", "Analytics", "Strategy"],
      isBookmarked: true,
      isNew: false,
    },
    {
      id: 6,
      company: "CloudTech Systems",
      title: "DevOps Engineer - AWS/GCP",
      location: "Remote",
      type: "Full-time",
      salary: "10-15 LPA",
      experience: "2-5 years",
      postedDate: "2024-02-05",
      source: "Indeed",
      description: "Manage cloud infrastructure and deployment pipelines for our microservices architecture.",
      skills: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD"],
      isBookmarked: false,
      isNew: true,
    },
    {
      id: 7,
      company: "DesignStudio Pro",
      title: "UX Designer - Figma/Sketch",
      location: "Mumbai",
      type: "Full-time",
      salary: "7-12 LPA",
      experience: "2-4 years",
      postedDate: "2024-02-04",
      source: "Behance",
      description: "Create user-centered designs for mobile and web applications.",
      skills: ["Figma", "Sketch", "UI/UX", "Prototyping", "User Research"],
      isBookmarked: false,
      isNew: false,
    },
    {
      id: 8,
      company: "Backend Solutions",
      title: "Backend Developer - Node.js/Python",
      location: "Pune",
      type: "Full-time",
      salary: "8-14 LPA",
      experience: "2-4 years",
      postedDate: "2024-02-03",
      source: "Naukri",
      description: "Build scalable backend services using Node.js and Python frameworks.",
      skills: ["Node.js", "Python", "Express", "Django", "MongoDB"],
      isBookmarked: true,
      isNew: false,
    },
  ];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = locationFilter === "all" || opp.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === "all" || opp.type.toLowerCase().includes(typeFilter.toLowerCase());
    return matchesSearch && matchesLocation && matchesType;
  });

  const handleBookmark = (id: number) => {
    console.log("Bookmark opportunity:", id);
    alert("Bookmark functionality will be implemented");
  };

  const handleShare = (id: number) => {
    console.log("Share opportunity:", id);
    alert("Share functionality will be implemented");
  };

  const handleApply = (id: number) => {
    console.log("Apply to opportunity:", id);
    alert("Application functionality will be implemented");
  };

  return (
    <main className="w-full max-w-7xl mx-auto mt-10 px-4 pb-16">
          {/* Header */}
          <header className="bg-nmims rounded-tr-full rounded-bl-full w-full p-5 mb-8">
            <h1 className="text-center text-white font-bold text-2xl">
              Scraped Opportunities
            </h1>
            <p className="text-center text-white/90 mt-2">
              Discover job opportunities from various sources to reduce R&D efforts
            </p>
          </header>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Total Opportunities</p>
                  <p className="text-3xl font-bold text-zinc-900">{opportunities.length}</p>
                </div>
                <div className="p-3 rounded-full bg-nmims text-white">
                  <Globe className="size-6" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">New This Week</p>
                  <p className="text-3xl font-bold text-green-600">
                    {opportunities.filter(o => o.isNew).length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-nmims text-white">
                  <Star className="size-6" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Bookmarked</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {opportunities.filter(o => o.isBookmarked).length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-nmims text-white">
                  <Bookmark className="size-6" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">Sources</p>
                  <p className="text-3xl font-bold text-purple-600">5</p>
                </div>
                <div className="p-3 rounded-full bg-nmims text-white">
                  <Building2 className="size-6" />
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
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                  />
                </div>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                >
                  <option value="all">All Locations</option>
                  <option value="bengaluru">Bengaluru</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="pune">Pune</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nmims"
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>
          </div>

          {/* Opportunities List */}
          <div className="space-y-6">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-lg shadow-md p-6 border border-zinc-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-zinc-900">{opportunity.title}</h3>
                      {opportunity.isNew && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="size-4" />
                        {opportunity.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="size-4" />
                        {opportunity.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="size-4" />
                        {opportunity.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="size-4" />
                        {opportunity.salary}
                      </div>
                    </div>
                    <p className="text-zinc-700 mb-4">{opportunity.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {opportunity.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-zinc-100 text-zinc-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        Posted: {opportunity.postedDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        {opportunity.experience}
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="size-4" />
                        Source: {opportunity.source}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => handleBookmark(opportunity.id)}
                      className={`p-2 rounded-lg transition ${
                        opportunity.isBookmarked
                          ? "bg-nmims text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark className="size-4" />
                    </button>
                    <button
                      onClick={() => handleShare(opportunity.id)}
                      className="p-2 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition"
                      title="Share"
                    >
                      <Share2 className="size-4" />
                    </button>
                    <button
                      onClick={() => handleApply(opportunity.id)}
                      className="px-4 py-2 bg-nmims text-white rounded-lg font-medium hover:opacity-90 transition"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <Globe className="size-12 text-zinc-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 mb-2">No opportunities found</h3>
              <p className="text-zinc-600">Try adjusting your search criteria</p>
            </div>
          )}
    </main>
  );
}