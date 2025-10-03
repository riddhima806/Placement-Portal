import { Container } from "@/components/container";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { Bell, Calendar, Users, TrendingUp, Clock } from "lucide-react-native";
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
        <View className="bg-zinc-100 rounded-full p-3 mb-2">
          <Icon size={24} color="#374151" />
        </View>
        <Text className="text-2xl font-bold text-foreground mb-1">{value}</Text>
        <Text className="text-xs text-muted-foreground text-center">
          {label}
        </Text>
      </View>
    </View>
  );
}

// Sub-component for drive cards
function DriveCard({
  company,
  role,
  date,
  status,
  logoUrl,
}: {
  company: string;
  role: string;
  date: string;
  status: string;
  logoUrl: string;
}) {
  return (
    <View className="bg-white rounded-2xl p-4 mr-4 shadow-sm w-64">
      <View className="flex-row items-center mb-3">
        <View className="bg-zinc-100 rounded-full w-12 h-12 items-center justify-center mr-3 overflow-hidden">
          <Image
            source={{ uri: logoUrl }}
            className="w-8 h-8"
            resizeMode="contain"
          />
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-foreground">{company}</Text>
          <Text className="text-sm text-muted-foreground">{role}</Text>
        </View>
      </View>
      <View className="flex-row items-center mb-2">
        <Calendar size={14} color="#6b7280" />
        <Text className="text-xs text-muted-foreground ml-2">{date}</Text>
      </View>
      <View className="bg-zinc-100 rounded-full px-3 py-1 self-start">
        <Text className="text-xs text-gray-700 font-semibold">{status}</Text>
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
      <View className="bg-zinc-100 rounded-full p-2 mr-3">
        <Icon size={18} color="#6b7280" />
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
      {/* Top Bar */}
      <View className="bg-white px-6 pt-12 pb-4 shadow-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 rounded-full bg-zinc-200 items-center justify-center mr-3">
              <Text className="text-gray-700 font-bold text-lg">J</Text>
            </View>
            <View>
              <Text className="text-xs text-muted-foreground">
                Welcome back
              </Text>
              <Text className="text-lg font-bold text-foreground">
                John Doe
              </Text>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-zinc-100 items-center justify-center">
            <Bell size={20} color="#374151" />
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

        {/* Upcoming Drives Section */}
        <View className="pt-2 pb-4">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className="text-xl font-bold text-foreground">
              Upcoming Drives
            </Text>
            <Link href={"/(tabs)/drives"} asChild>
              <TouchableOpacity>
                <Text className="text-sm text-gray-700 font-semibold">
                  View All
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6"
          >
            <DriveCard
              company="Apple"
              role="Software Engineer"
              date="Oct 15, 2025"
              status="Registered"
              logoUrl="https://purepng.com/public/uploads/large/purepng.com-apple-logologobrand-logoiconslogos-251519938788qhgdl.png"
            />
            <DriveCard
              company="Microsoft"
              role="Full Stack Developer"
              date="Oct 20, 2025"
              status="Upcoming"
              logoUrl="https://purepng.com/public/uploads/large/purepng.com-apple-logologobrand-logoiconslogos-251519938788qhgdl.png"
            />
            <DriveCard
              company="Google"
              role="Data Analyst"
              date="Oct 25, 2025"
              status="Open"
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
              <Text className="text-sm text-gray-700 font-semibold">
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
