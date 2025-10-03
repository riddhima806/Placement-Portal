import { Container } from "@/components/container";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import {
  Calendar,
  MapPin,
  Users,
  Briefcase,
  Award,
  Clock,
  ChevronRight,
} from "lucide-react-native";
import { useState } from "react";

// Sub-component for Drive Card
function DriveCard({
  company,
  role,
  location,
  date,
  applicants,
  deadline,
  status,
}: {
  company: string;
  role: string;
  location: string;
  date: string;
  applicants: string;
  deadline: string;
  status: "open" | "closing-soon" | "registered";
}) {
  const getStatusColor = () => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-700";
      case "closing-soon":
        return "bg-orange-100 text-orange-700";
      case "registered":
        return "bg-blue-100 text-blue-700";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "open":
        return "Open";
      case "closing-soon":
        return "Closing Soon";
      case "registered":
        return "Registered";
    }
  };

  return (
    <TouchableOpacity className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            {company}
          </Text>
          <Text className="text-sm text-gray-600">{role}</Text>
        </View>
        <View className={`rounded-full px-3 py-1 ${getStatusColor()}`}>
          <Text className="text-xs font-semibold">{getStatusText()}</Text>
        </View>
      </View>

      <View className="space-y-2 mb-4">
        <View className="flex-row items-center">
          <MapPin size={16} color="#6b7280" />
          <Text className="text-sm text-gray-600 ml-2">{location}</Text>
        </View>
        <View className="flex-row items-center">
          <Calendar size={16} color="#6b7280" />
          <Text className="text-sm text-gray-600 ml-2">{date}</Text>
        </View>
        <View className="flex-row items-center">
          <Users size={16} color="#6b7280" />
          <Text className="text-sm text-gray-600 ml-2">
            {applicants} applicants
          </Text>
        </View>
      </View>

      <View className="border-t border-gray-100 pt-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Clock size={14} color="#a53c3c" />
          <Text className="text-xs text-gray-500 ml-1">
            Deadline: {deadline}
          </Text>
        </View>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-sm font-semibold text-[#a53c3c] mr-1">
            View Details
          </Text>
          <ChevronRight size={16} color="#a53c3c" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// Sub-component for Hackathon Card
function HackathonCard({
  title,
  organizer,
  prize,
  difficulty,
  deadline,
  participants,
  status,
}: {
  title: string;
  organizer: string;
  prize: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  deadline: string;
  participants: string;
  status: "open" | "ending-soon" | "registered";
}) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-50 text-green-700";
      case "Intermediate":
        return "bg-yellow-50 text-yellow-700";
      case "Advanced":
        return "bg-red-50 text-red-700";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-700";
      case "ending-soon":
        return "bg-orange-100 text-orange-700";
      case "registered":
        return "bg-blue-100 text-blue-700";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "open":
        return "Open";
      case "ending-soon":
        return "Ending Soon";
      case "registered":
        return "Registered";
    }
  };

  return (
    <TouchableOpacity className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1 mr-2">
          <Text className="text-lg font-bold text-gray-900 mb-1">{title}</Text>
          <Text className="text-sm text-gray-600">{organizer}</Text>
        </View>
        <View className={`rounded-full px-3 py-1 ${getStatusColor()}`}>
          <Text className="text-xs font-semibold">{getStatusText()}</Text>
        </View>
      </View>

      <View className="flex-row items-center mb-4">
        <View className={`rounded-full px-3 py-1 ${getDifficultyColor()}`}>
          <Text className="text-xs font-semibold">{difficulty}</Text>
        </View>
        <View className="bg-gray-100 rounded-full px-3 py-1 ml-2">
          <Text className="text-xs font-semibold text-gray-700">{prize}</Text>
        </View>
      </View>

      <View className="space-y-2 mb-4">
        <View className="flex-row items-center">
          <Users size={16} color="#6b7280" />
          <Text className="text-sm text-gray-600 ml-2">
            {participants} participants
          </Text>
        </View>
        <View className="flex-row items-center">
          <Calendar size={16} color="#6b7280" />
          <Text className="text-sm text-gray-600 ml-2">Ends: {deadline}</Text>
        </View>
      </View>

      <TouchableOpacity className="bg-gray-900 rounded-xl py-3 items-center">
        <Text className="text-white font-semibold">Register Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function Drives() {
  const [activeTab, setActiveTab] = useState<"drives" | "hackathons">("drives");

  return (
    <Container>
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900 mb-1">
          Opportunities
        </Text>
        <Text className="text-sm text-gray-600">
          Explore upcoming drives and hackathons
        </Text>
      </View>

      {/* Tab Selector */}
      <View className="bg-white px-6 py-4 flex-row">
        <TouchableOpacity
          onPress={() => setActiveTab("drives")}
          className={`flex-1 py-3 rounded-xl mr-2 ${
            activeTab === "drives" ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          <View className="flex-row items-center justify-center">
            <Briefcase
              size={18}
              color={activeTab === "drives" ? "#ffffff" : "#6b7280"}
            />
            <Text
              className={`ml-2 font-semibold ${
                activeTab === "drives" ? "text-white" : "text-gray-700"
              }`}
            >
              Drives
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("hackathons")}
          className={`flex-1 py-3 rounded-xl ml-2 ${
            activeTab === "hackathons" ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          <View className="flex-row items-center justify-center">
            <Award
              size={18}
              color={activeTab === "hackathons" ? "#ffffff" : "#6b7280"}
            />
            <Text
              className={`ml-2 font-semibold ${
                activeTab === "hackathons" ? "text-white" : "text-gray-700"
              }`}
            >
              Hackathons
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-gray-50 px-6 pt-4">
        {activeTab === "drives" ? (
          <>
            <DriveCard
              company="TechCorp Solutions"
              role="Software Engineer"
              location="On-Campus"
              date="Oct 15, 2025"
              applicants="234"
              deadline="Oct 10"
              status="open"
            />
            <DriveCard
              company="InnovateLabs"
              role="Full Stack Developer"
              location="Virtual"
              date="Oct 20, 2025"
              applicants="189"
              deadline="Oct 12"
              status="closing-soon"
            />
            <DriveCard
              company="DataSystems Inc"
              role="Data Analyst"
              location="Hybrid"
              date="Oct 25, 2025"
              applicants="156"
              deadline="Oct 18"
              status="registered"
            />
            <DriveCard
              company="CloudTech"
              role="DevOps Engineer"
              location="On-Campus"
              date="Nov 2, 2025"
              applicants="298"
              deadline="Oct 28"
              status="open"
            />
          </>
        ) : (
          <>
            <HackathonCard
              title="AI Innovation Challenge"
              organizer="Tech Community"
              prize="₹50K Prize"
              difficulty="Advanced"
              deadline="Oct 30, 2025"
              participants="1,245"
              status="open"
            />
            <HackathonCard
              title="Web3 Building Blocks"
              organizer="Blockchain Guild"
              prize="₹30K Prize"
              difficulty="Intermediate"
              deadline="Oct 18, 2025"
              participants="892"
              status="ending-soon"
            />
            <HackathonCard
              title="Green Tech Solutions"
              organizer="EcoTech Foundation"
              prize="₹75K Prize"
              difficulty="Beginner"
              deadline="Nov 5, 2025"
              participants="2,156"
              status="registered"
            />
            <HackathonCard
              title="FinTech Revolution"
              organizer="Finance Innovators"
              prize="₹100K Prize"
              difficulty="Advanced"
              deadline="Nov 12, 2025"
              participants="3,421"
              status="open"
            />
          </>
        )}
        <View className="h-6" />
      </ScrollView>
    </Container>
  );
}
