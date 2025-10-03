// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#a53c3c", // Indigo-600
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5, // For Android
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="drives"
        options={{
          tabBarLabel: "Drives",
          tabBarIcon: ({ color }) => (
            <Ionicons name="briefcase-outline" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          tabBarLabel: "Assistant",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
