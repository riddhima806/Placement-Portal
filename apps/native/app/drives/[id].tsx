import { Container } from "@/components/container";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Clock,
  Briefcase,
  DollarSign,
  GraduationCap,
  Building2,
  Globe,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

// Mock data - In production, fetch this based on the ID from your API
const getDriveData = (id: string) => {
  const drives: Record<string, any> = {
    "techcorp-swe-2025": {
      company: "TechCorp Solutions",
      role: "Software Engineer",
      location: "On-Campus",
      date: "Oct 15, 2025",
      applicants: "234",
      deadline: "Oct 10, 2025",
      status: "open",
      ctc: "₹12-18 LPA",
      type: "Full Time",
      experience: "0-2 years",
      openings: "25 positions",
      about:
        "TechCorp Solutions is a leading technology company specializing in enterprise software solutions. We work with Fortune 500 companies to deliver cutting-edge applications that transform businesses. With over 10,000 employees globally, we're committed to innovation and excellence.",
      jobDescription:
        "We are looking for passionate Software Engineers to join our dynamic team. You will work on challenging projects involving modern web technologies, cloud infrastructure, and scalable systems. This role offers tremendous learning opportunities and career growth.",
      responsibilities: [
        "Design and develop scalable web applications using modern frameworks",
        "Collaborate with cross-functional teams to define and ship new features",
        "Write clean, maintainable, and efficient code",
        "Participate in code reviews and provide constructive feedback",
        "Contribute to technical documentation and best practices",
        "Debug and resolve production issues in a timely manner",
      ],
      requirements: [
        "B.Tech/B.E. in Computer Science or related field",
        "Strong proficiency in at least one programming language (Java, Python, JavaScript)",
        "Solid understanding of data structures and algorithms",
        "Good problem-solving and analytical skills",
        "Excellent communication and teamwork abilities",
        "CGPA of 7.0 or above",
      ],
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "SQL",
        "Git",
        "AWS",
        "Docker",
      ],
      selectionProcess: [
        "Online Assessment (90 minutes)",
        "Technical Interview Round 1 - DSA Focus",
        "Technical Interview Round 2 - System Design",
        "HR Interview",
      ],
      benefits: [
        "Competitive salary package with performance bonuses",
        "Comprehensive health insurance for self and family",
        "Learning & development budget for courses and certifications",
        "Work-life balance with flexible working hours",
        "Remote work options available",
        "Annual team outings and events",
      ],
      companyWebsite: "https://techcorp.example.com",
      registrationLink: "https://careers.techcorp.example.com/apply",
    },
    "innovatelabs-fsd-2025": {
      company: "InnovateLabs",
      role: "Full Stack Developer",
      location: "Virtual",
      date: "Oct 20, 2025",
      applicants: "189",
      deadline: "Oct 12, 2025",
      status: "closing-soon",
      ctc: "₹10-15 LPA",
      type: "Full Time",
      experience: "0-1 years",
      openings: "15 positions",
      about:
        "InnovateLabs is a fast-growing startup focused on building innovative SaaS products. We believe in rapid iteration, creative problem-solving, and building products that users love.",
      jobDescription:
        "Join our engineering team to build full-stack applications that serve thousands of users. You'll work across the entire stack and have significant ownership over features.",
      responsibilities: [
        "Build features from frontend to backend",
        "Design and implement RESTful APIs",
        "Optimize application performance",
        "Work closely with product and design teams",
        "Deploy and maintain production systems",
      ],
      requirements: [
        "B.Tech/B.E. in any branch",
        "Experience with modern web frameworks",
        "Understanding of database design",
        "Self-motivated and quick learner",
        "CGPA of 6.5 or above",
      ],
      skills: [
        "React",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Express",
        "REST APIs",
      ],
      selectionProcess: [
        "Coding Challenge",
        "Technical Interview - Full Stack",
        "Founder Round",
      ],
      benefits: [
        "Equity options",
        "Health insurance",
        "Flexible work from home",
        "Latest tech gadgets",
        "Unlimited coffee and snacks",
      ],
      companyWebsite: "https://innovatelabs.example.com",
      registrationLink: "https://careers.innovatelabs.example.com/apply",
    },
    "datasystems-analyst-2025": {
      company: "DataSystems Inc",
      role: "Data Analyst",
      location: "Hybrid",
      date: "Oct 25, 2025",
      applicants: "156",
      deadline: "Oct 18, 2025",
      status: "registered",
      ctc: "₹8-12 LPA",
      type: "Full Time",
      experience: "0-1 years",
      openings: "10 positions",
      about:
        "DataSystems Inc specializes in data analytics and business intelligence solutions. We help companies make data-driven decisions through advanced analytics and visualization.",
      jobDescription:
        "We're seeking Data Analysts to join our analytics team. You'll work with large datasets, create insightful reports, and help drive business decisions.",
      responsibilities: [
        "Analyze complex datasets to extract insights",
        "Create dashboards and reports using BI tools",
        "Collaborate with stakeholders to understand requirements",
        "Present findings to leadership teams",
        "Automate data collection and reporting processes",
      ],
      requirements: [
        "B.Tech/B.E. or relevant degree",
        "Strong analytical and statistical skills",
        "Proficiency in SQL and Excel",
        "Experience with data visualization tools",
        "CGPA of 7.0 or above",
      ],
      skills: [
        "SQL",
        "Python",
        "Tableau",
        "Power BI",
        "Excel",
        "Statistics",
      ],
      selectionProcess: [
        "Analytical Test",
        "Case Study Presentation",
        "Technical Interview",
        "HR Round",
      ],
      benefits: [
        "Competitive compensation",
        "Health and wellness benefits",
        "Professional development programs",
        "Hybrid work model",
        "Mentorship from industry experts",
      ],
      companyWebsite: "https://datasystems.example.com",
      registrationLink: "https://careers.datasystems.example.com/apply",
    },
    "cloudtech-devops-2025": {
      company: "CloudTech",
      role: "DevOps Engineer",
      location: "On-Campus",
      date: "Nov 2, 2025",
      applicants: "298",
      deadline: "Oct 28, 2025",
      status: "open",
      ctc: "₹14-20 LPA",
      type: "Full Time",
      experience: "0-2 years",
      openings: "20 positions",
      about:
        "CloudTech is a cloud infrastructure company providing scalable solutions to enterprises worldwide. We manage millions of servers and handle petabytes of data daily.",
      jobDescription:
        "Join our DevOps team to build and maintain robust infrastructure. You'll work with cutting-edge cloud technologies and ensure high availability of our systems.",
      responsibilities: [
        "Design and implement CI/CD pipelines",
        "Manage cloud infrastructure on AWS/Azure/GCP",
        "Automate deployment and scaling processes",
        "Monitor system performance and reliability",
        "Implement security best practices",
        "Troubleshoot production issues",
      ],
      requirements: [
        "B.Tech/B.E. in Computer Science or related field",
        "Understanding of Linux systems",
        "Knowledge of containerization and orchestration",
        "Scripting skills in Python or Bash",
        "Strong problem-solving abilities",
        "CGPA of 7.5 or above",
      ],
      skills: [
        "Docker",
        "Kubernetes",
        "AWS",
        "Jenkins",
        "Terraform",
        "Python",
        "Linux",
        "Git",
      ],
      selectionProcess: [
        "Technical Assessment",
        "System Design Interview",
        "DevOps Practical Round",
        "Managerial Round",
      ],
      benefits: [
        "Industry-leading compensation",
        "Premium health insurance",
        "Cloud certifications sponsored",
        "Conference attendance opportunities",
        "Stock options",
        "Relocation assistance",
      ],
      companyWebsite: "https://cloudtech.example.com",
      registrationLink: "https://careers.cloudtech.example.com/apply",
    },
  };

  return drives[id] || drives["techcorp-swe-2025"];
};

export default function DriveDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const drive = getDriveData(id as string);

  const getStatusColor = () => {
    switch (drive.status) {
      case "open":
        return "bg-green-50 text-green-700 border-green-200";
      case "closing-soon":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "registered":
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getStatusText = () => {
    switch (drive.status) {
      case "open":
        return "Open for Applications";
      case "closing-soon":
        return "Closing Soon";
      case "registered":
        return "Already Registered";
    }
  };

  const getStatusIcon = () => {
    if (drive.status === "registered") {
      return <CheckCircle2 size={16} color="#2563eb" />;
    }
    return <AlertCircle size={16} color="#f59e0b" />;
  };

  const isRegistered = drive.status === "registered";

  return (
    <Container>
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <ArrowLeft size={20} color="#374151" />
          <Text className="text-base text-gray-700 ml-2 font-medium">
            Back to Opportunities
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-gray-50">
        {/* Company Header Card */}
        <View className="bg-white px-6 py-6 border-b-8 border-gray-100">
          <View className="flex-row items-start mb-4">
            <View className="w-16 h-16 bg-blue-100 rounded-xl mr-4 items-center justify-center">
              <Building2 size={32} color="#2563eb" />
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                {drive.role}
              </Text>
              <Text className="text-lg text-gray-700 font-medium mb-2">
                {drive.company}
              </Text>
              <View className="flex-row items-center">
                <MapPin size={14} color="#6b7280" />
                <Text className="text-sm text-gray-600 ml-1">
                  {drive.location}
                </Text>
                <Text className="text-gray-400 mx-2">•</Text>
                <Text className="text-sm text-gray-600">{drive.type}</Text>
              </View>
            </View>
          </View>

          {/* Status Badge */}
          <View
            className={`rounded-xl px-4 py-3 border ${getStatusColor()} flex-row items-center justify-center mb-4`}
          >
            {getStatusIcon()}
            <Text className="font-semibold ml-2">{getStatusText()}</Text>
          </View>

          {/* Quick Info Grid */}
          <View className="flex-row flex-wrap -mx-2">
            <View className="w-1/2 px-2 mb-3">
              <View className="bg-gray-50 rounded-xl p-3">
                <View className="flex-row items-center mb-1">
                  <DollarSign size={16} color="#6b7280" />
                  <Text className="text-xs text-gray-600 ml-1 font-medium">
                    CTC Package
                  </Text>
                </View>
                <Text className="text-sm font-bold text-gray-900">
                  {drive.ctc}
                </Text>
              </View>
            </View>

            <View className="w-1/2 px-2 mb-3">
              <View className="bg-gray-50 rounded-xl p-3">
                <View className="flex-row items-center mb-1">
                  <Calendar size={16} color="#6b7280" />
                  <Text className="text-xs text-gray-600 ml-1 font-medium">
                    Drive Date
                  </Text>
                </View>
                <Text className="text-sm font-bold text-gray-900">
                  {drive.date}
                </Text>
              </View>
            </View>

            <View className="w-1/2 px-2 mb-3">
              <View className="bg-gray-50 rounded-xl p-3">
                <View className="flex-row items-center mb-1">
                  <Users size={16} color="#6b7280" />
                  <Text className="text-xs text-gray-600 ml-1 font-medium">
                    Applicants
                  </Text>
                </View>
                <Text className="text-sm font-bold text-gray-900">
                  {drive.applicants}
                </Text>
              </View>
            </View>

            <View className="w-1/2 px-2 mb-3">
              <View className="bg-gray-50 rounded-xl p-3">
                <View className="flex-row items-center mb-1">
                  <Clock size={16} color="#ef4444" />
                  <Text className="text-xs text-gray-600 ml-1 font-medium">
                    Deadline
                  </Text>
                </View>
                <Text className="text-sm font-bold text-red-600">
                  {drive.deadline}
                </Text>
              </View>
            </View>

            <View className="w-1/2 px-2 mb-3">
              <View className="bg-gray-50 rounded-xl p-3">
                <View className="flex-row items-center mb-1">
                  <Briefcase size={16} color="#6b7280" />
                  <Text className="text-xs text-gray-600 ml-1 font-medium">
                    Experience
                  </Text>
                </View>
                <Text className="text-sm font-bold text-gray-900">
                  {drive.experience}
                </Text>
              </View>
            </View>

            <View className="w-1/2 px-2 mb-3">
              <View className="bg-gray-50 rounded-xl p-3">
                <View className="flex-row items-center mb-1">
                  <Users size={16} color="#6b7280" />
                  <Text className="text-xs text-gray-600 ml-1 font-medium">
                    Openings
                  </Text>
                </View>
                <Text className="text-sm font-bold text-gray-900">
                  {drive.openings}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* About Company */}
        <View className="bg-white px-6 py-6 mb-2">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            About {drive.company}
          </Text>
          <Text className="text-sm text-gray-700 leading-6">
            {drive.about}
          </Text>
          <TouchableOpacity className="flex-row items-center mt-3">
            <Globe size={16} color="#2563eb" />
            <Text className="text-sm text-blue-600 ml-2 font-medium">
              Visit Company Website
            </Text>
            <ExternalLink size={14} color="#2563eb" className="ml-1" />
          </TouchableOpacity>
        </View>

        {/* Job Description */}
        <View className="bg-white px-6 py-6 mb-2">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Job Description
          </Text>
          <Text className="text-sm text-gray-700 leading-6">
            {drive.jobDescription}
          </Text>
        </View>

        {/* Key Responsibilities */}
        <View className="bg-white px-6 py-6 mb-2">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Key Responsibilities
          </Text>
          {drive.responsibilities.map((item: string, index: number) => (
            <View key={index} className="flex-row items-start mb-3">
              <View className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3" />
              <Text className="text-sm text-gray-700 flex-1 leading-6">
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* Requirements */}
        <View className="bg-white px-6 py-6 mb-2">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Requirements & Eligibility
          </Text>
          {drive.requirements.map((item: string, index: number) => (
            <View key={index} className="flex-row items-start mb-3">
              <CheckCircle2 size={18} color="#10b981" className="mt-0.5 mr-3" />
              <Text className="text-sm text-gray-700 flex-1 leading-6">
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* Skills Required */}
        <View className="bg-white px-6 py-6 mb-2">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Skills Required
          </Text>
          <View className="flex-row flex-wrap -mx-1">
            {drive.skills.map((skill: string, index: number) => (
              <View
                key={index}
                className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 m-1"
              >
                <Text className="text-sm font-medium text-blue-700">
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Selection Process */}
        <View className="bg-white px-6 py-6 mb-2">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Selection Process
          </Text>
          {drive.selectionProcess.map((step: string, index: number) => (
            <View key={index} className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold text-sm">
                  {index + 1}
                </Text>
              </View>
              <Text className="text-sm text-gray-700 flex-1 font-medium">
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Benefits & Perks */}
        <View className="bg-white px-6 py-6 mb-2">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Benefits & Perks
          </Text>
          {drive.benefits.map((benefit: string, index: number) => (
            <View key={index} className="flex-row items-start mb-3">
              <CheckCircle2 size={18} color="#10b981" className="mt-0.5 mr-3" />
              <Text className="text-sm text-gray-700 flex-1 leading-6">
                {benefit}
              </Text>
            </View>
          ))}
        </View>

        {/* Application Deadline Warning */}
        {drive.status === "closing-soon" && (
          <View className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-4 mx-6 mb-4">
            <View className="flex-row items-center">
              <AlertCircle size={20} color="#f59e0b" />
              <Text className="text-sm font-semibold text-orange-900 ml-2">
                Applications closing soon!
              </Text>
            </View>
            <Text className="text-xs text-orange-700 mt-1">
              Deadline: {drive.deadline}. Apply now to not miss this opportunity.
            </Text>
          </View>
        )}

        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>

      {/* Bottom Fixed CTA */}
      {!isRegistered && (
        <View className="bg-white px-6 py-4 border-t border-gray-200">
          <TouchableOpacity className="bg-blue-600 rounded-xl py-4 items-center">
            <Text className="text-white font-bold text-base">
              Apply Now
            </Text>
          </TouchableOpacity>
          <Text className="text-xs text-gray-500 text-center mt-2">
            By applying, you agree to share your profile with {drive.company}
          </Text>
        </View>
      )}

      {isRegistered && (
        <View className="bg-white px-6 py-4 border-t border-gray-200">
          <View className="bg-blue-50 border border-blue-200 rounded-xl py-4 items-center flex-row justify-center">
            <CheckCircle2 size={20} color="#2563eb" />
            <Text className="text-blue-700 font-bold text-base ml-2">
              Application Submitted
            </Text>
          </View>
          <Text className="text-xs text-gray-500 text-center mt-2">
            You'll receive updates via email and notifications
          </Text>
        </View>
      )}
    </Container>
  );
}