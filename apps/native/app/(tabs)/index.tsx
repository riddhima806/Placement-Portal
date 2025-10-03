import { Container } from "@/components/container";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { Bell, Calendar, Users, TrendingUp, Clock, MapPin, Search, Briefcase } from "lucide-react-native";
import { Link } from "expo-router";

// Sub-component for stat cards
function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) {
  return (
    <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm mx-1">
      <View className="items-center">
        <View className="bg-red-50 rounded-full p-3 mb-2">
          <Icon size={24} color="#A43C3B" />
        </View>
        <Text className="text-2xl font-bold text-foreground mb-1">{value}</Text>
        <Text className="text-xs text-muted-foreground text-center">
          {label}
        </Text>
      </View>
    </View>
  );
}

// Sub-component for job cards
function JobCard({
  company,
  role,
  location,
  type,
  salary,
  logoUrl,
}: {
  company: string;
  role: string;
  location: string;
  type: string;
  salary: string;
  logoUrl: string;
}) {
  return (
    <View className="bg-white rounded-2xl p-4 mr-4 shadow-sm w-72">
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="bg-zinc-100 rounded-xl w-12 h-12 items-center justify-center mr-3 overflow-hidden">
            <Image
              source={{ uri: logoUrl }}
              className="w-8 h-8"
              resizeMode="contain"
            />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-foreground mb-1">{role}</Text>
            <Text className="text-sm text-muted-foreground">{company}</Text>
          </View>
        </View>
        <TouchableOpacity className="p-1">
          <View className="w-6 h-6 items-center justify-center">
            <Text className="text-lg text-gray-400">♡</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center mb-2">
        <MapPin size={14} color="#6b7280" />
        <Text className="text-xs text-muted-foreground ml-1">{location}</Text>
      </View>
      <View className="flex-row items-center mb-3">
        <View className="bg-zinc-100 rounded-full px-3 py-1 mr-2">
          <Text className="text-xs text-gray-700 font-semibold">{type}</Text>
        </View>
        <Text className="text-sm font-bold text-[#A43C3B]">{salary}</Text>
      </View>
    </View>
  );
}

// Sub-component for notification items
function NotificationItem({
  icon: Icon,
  text,
  time,
}: {
  icon: any;
  text: string;
  time: string;
}) {
  return (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm flex-row items-center">
      <View className="bg-red-50 rounded-full p-2 mr-3">
        <Icon size={18} color="#A43C3B" />
      </View>
      <View className="flex-1">
        <Text className="text-sm text-foreground mb-1">{text}</Text>
        <Text className="text-xs text-muted-foreground">{time}</Text>
      </View>
    </View>
  );
}

export default function TabOne() {
  return (
    <Container>
      {/* Top Bar with Red Theme */}
      <View className="bg-[#A43C3B] px-6 pt-12 pb-6 rounded-b-3xl">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-3">
              <Text className="text-white font-bold text-lg">J</Text>
            </View>
            <View>
              <Text className="text-xs text-white/70">
                Welcome back
              </Text>
              <Text className="text-lg font-bold text-white">
                John Doe
              </Text>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
            <Bell size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Location Dropdown */}
        <View className="flex-row items-center mb-4">
          <MapPin size={16} color="#ffffff" />
          <Text className="text-white text-sm font-medium ml-1">New York, USA</Text>
          <Text className="text-white text-sm ml-1">▼</Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center">
          <View className="flex-1 bg-white rounded-xl px-4 py-3 flex-row items-center mr-3">
            <Search size={20} color="#6b7280" />
            <Text className="text-gray-400 ml-2">Search</Text>
          </View>
          <TouchableOpacity className="bg-yellow-400 rounded-xl p-3">
            <Briefcase size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 bg-gray-50">
        {/* Stats Section */}
        <View className="px-5 pt-6 pb-4">
          <View className="flex-row">
            <StatCard icon={TrendingUp} value="92%" label="Attendance" />
            <StatCard icon={Users} value="18" label="Drives Attended" />
            <StatCard icon={Calendar} value="12" label="Interviews" />
          </View>
        </View>

        {/* Suggested Jobs Section */}
        <View className="pt-2 pb-4">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className="text-xl font-bold text-foreground">
              Suggested Jobs
            </Text>
            <Link href={"/(tabs)/drives"} asChild>
              <TouchableOpacity>
                <Text className="text-sm text-[#A43C3B] font-semibold">
                  See all
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6"
          >
            <JobCard
              company="BrioSoft Solutions"
              role="UI Designer"
              location="New York, USA"
              type="Full-Time"
              salary="$42k - $48k"
              logoUrl="https://purepng.com/public/uploads/large/purepng.com-apple-logologobrand-logoiconslogos-251519938788qhgdl.png"
            />
            <JobCard
              company="AmplifyAvenue"
              role="React Developer"
              location="Remote"
              type="Contract"
              salary="$50k - $65k"
              logoUrl="https://purepng.com/public/uploads/large/purepng.com-apple-logologobrand-logoiconslogos-251519938788qhgdl.png"
            />
            <JobCard
              company="TechFlow Inc"
              role="Data Analyst"
              location="San Francisco, USA"
              type="Part-Time"
              salary="$35k - $42k"
              logoUrl="https://purepng.com/public/uploads/large/purepng.com-apple-logologobrand-logoiconslogos-251519938788qhgdl.png"
            />
          </ScrollView>
        </View>

        {/* Notifications Section */}
        <View className="px-6 pt-2 pb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-foreground">
              Notifications
            </Text>
            <TouchableOpacity>
              <Text className="text-sm text-[#A43C3B] font-semibold">
                Mark All Read
              </Text>
            </TouchableOpacity>
          </View>
          <NotificationItem
            icon={Users}
            text="You are shortlisted for XYZ Technologies"
            time="2 hours ago"
          />
          <NotificationItem
            icon={Calendar}
            text="New Hackathon: ABC Challenge is now open"
            time="5 hours ago"
          />
          <NotificationItem
            icon={Clock}
            text="Interview scheduled with DEF Corp on Oct 10"
            time="1 day ago"
          />
          <NotificationItem
            icon={TrendingUp}
            text="Your profile completeness increased to 95%"
            time="2 days ago"
          />
        </View>
      </ScrollView>
    </Container>
  );
}