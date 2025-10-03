import { Container } from "@/components/container";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Edit,
  Calendar,
  TrendingUp,
  Target,
} from "lucide-react-native";

// Sub-component for Profile Stats
function StatItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-1 bg-white rounded-2xl p-4 mx-1">
      <View className="items-center">
        <View className="bg-gray-100 rounded-full p-3 mb-2">
          <Icon size={20} color="#374151" />
        </View>
        <Text className="text-xl font-bold text-gray-900 mb-1">{value}</Text>
        <Text className="text-xs text-gray-600 text-center">{label}</Text>
      </View>
    </View>
  );
}

// Sub-component for Info Row
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center py-4 border-b border-gray-100">
      <View className="bg-gray-100 rounded-full p-2 mr-3">
        <Icon size={18} color="#6b7280" />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-gray-500 mb-1">{label}</Text>
        <Text className="text-sm font-medium text-gray-900">{value}</Text>
      </View>
    </View>
  );
}

// Sub-component for Menu Item
function MenuItem({
  icon: Icon,
  label,
  onPress,
  showChevron = true,
}: {
  icon: any;
  label: string;
  onPress?: () => void;
  showChevron?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-gray-100"
    >
      <View className="bg-gray-100 rounded-full p-2 mr-3">
        <Icon size={18} color="#6b7280" />
      </View>
      <Text className="flex-1 text-sm font-medium text-gray-900">{label}</Text>
      {showChevron && <ChevronRight size={20} color="#9ca3af" />}
    </TouchableOpacity>
  );
}

// Sub-component for Section Header
function SectionHeader({ title }: { title: string }) {
  return (
    <Text className="text-lg font-bold text-gray-900 mb-4 mt-6">{title}</Text>
  );
}

export default function Profile() {
  return (
    <Container>
      {/* Header with Profile Picture */}
      <View className="bg-white px-6 pt-12 pb-6">
        <View className="items-center">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-gray-900 items-center justify-center">
              <Text className="text-white text-3xl font-bold">JD</Text>
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 bg-[#a53c3c] rounded-full p-2">
              <Edit size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-bold text-gray-900 mt-4">
            John Doe
          </Text>
          <Text className="text-sm text-gray-600">
            Computer Science Engineering
          </Text>
          <Text className="text-xs text-gray-500 mt-1">Class of 2026</Text>
        </View>
      </View>

      <ScrollView className="flex-1 bg-gray-50">
        {/* Stats Section */}
        <View className="px-5 py-4">
          <View className="flex-row">
            <StatItem icon={TrendingUp} label="Attendance" value="92%" />
            <StatItem icon={Target} label="Applications" value="24" />
            <StatItem icon={Award} label="Shortlisted" value="8" />
          </View>
        </View>

        {/* Personal Information */}
        <View className="bg-white mx-6 rounded-2xl p-5 mb-4 shadow-sm">
          <SectionHeader title="Personal Information" />
          <InfoRow icon={Mail} label="Email" value="john.doe@college.edu" />
          <InfoRow icon={Phone} label="Phone" value="+91 98765 43210" />
          <InfoRow icon={Calendar} label="Date of Birth" value="15 Jan 2004" />
          <InfoRow icon={MapPin} label="Location" value="Mumbai, Maharashtra" />
        </View>

        {/* Academic Details */}
        <View className="bg-white mx-6 rounded-2xl p-5 mb-4 shadow-sm">
          <SectionHeader title="Academic Details" />
          <InfoRow
            icon={GraduationCap}
            label="Current CGPA"
            value="8.5 / 10.0"
          />
          <InfoRow icon={Briefcase} label="Branch" value="Computer Science" />
          <InfoRow icon={FileText} label="Roll Number" value="CSE21B1234" />
        </View>

        {/* Skills Section */}
        <View className="bg-white mx-6 rounded-2xl p-5 mb-4 shadow-sm">
          <SectionHeader title="Skills" />
          <View className="flex-row flex-wrap">
            {[
              "React Native",
              "JavaScript",
              "Python",
              "Node.js",
              "MongoDB",
              "Git",
            ].map((skill, index) => (
              <View
                key={index}
                className="bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2"
              >
                <Text className="text-sm text-gray-700">{skill}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity className="mt-3">
            <Text className="text-sm font-semibold text-[#a53c3c]">
              + Add Skills
            </Text>
          </TouchableOpacity>
        </View>

        {/* Actions Menu */}
        <View className="bg-white mx-6 rounded-2xl p-5 mb-4 shadow-sm">
          <SectionHeader title="Account" />
          <MenuItem icon={Settings} label="Settings" />
          <MenuItem icon={FileText} label="Resume" />
          <MenuItem icon={Award} label="Certificates" />
          <MenuItem icon={LogOut} label="Logout" showChevron={false} />
        </View>

        {/* Profile Completion */}
        <View className="bg-white mx-6 rounded-2xl p-5 mb-6 shadow-sm">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-semibold text-gray-900">
              Profile Completion
            </Text>
            <Text className="text-sm font-bold text-[#a53c3c]">85%</Text>
          </View>
          <View className="bg-gray-200 rounded-full h-2">
            <View
              className="bg-[#a53c3c] rounded-full h-2"
              style={{ width: "85%" }}
            />
          </View>
          <Text className="text-xs text-gray-500 mt-2">
            Add your resume and certificates to reach 100%
          </Text>
        </View>

        <View className="h-6" />
      </ScrollView>
    </Container>
  );
}
