import { Container } from "@/components/container";
import { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi! I'm your placement assistant. I can help you find suitable drives, hackathons, and internships based on your profile.",
      sender: "bot",
      timestamp: "10:30 AM"
    },
    {
      id: "2",
      text: "Ask me things like:\n• Which drives am I eligible for?\n• Show me upcoming hackathons\n• Recommend internships for me",
      sender: "bot",
      timestamp: "10:30 AM"
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    };

    const responses = [
      "Based on your profile, you're eligible for 3 upcoming drives: TCS Digital, Infosys Power Programmer, and Wipro WILP.",
      "I found 2 hackathons for you: Smart India Hackathon (Dec 15) and Code For Good by JP Morgan (Dec 20).",
      "Your attendance is at 78%. Keep it above 75% to maintain placement eligibility!",
      "I recommend applying to the Infosys drive - it matches your skill set in Java and React.",
      "You have 2 upcoming interviews this week. Make sure to prepare!",
    ];

    const botMessage = {
      id: (Date.now() + 1).toString(),
      text: responses[Math.floor(Math.random() * responses.length)],
      sender: "bot",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputText("");
  };

  return (
    <Container>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1">
          {/* Header */}
          <View className="px-6 pt-8 pb-4 border-b border-zinc-800">
            <Text className="text-2xl font-bold text-zinc-100">AI Assistant</Text>
            <Text className="text-sm text-zinc-400 mt-1">Get personalized placement recommendations</Text>
          </View>

          {/* Messages */}
          <ScrollView className="flex-1 px-6 pt-4">
            {messages.map((message) => (
              <View
                key={message.id}
                className={`mb-4 ${message.sender === "user" ? "items-end" : "items-start"}`}
              >
                <View
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-[#A43C3B]"
                      : "bg-zinc-800 border border-zinc-700"
                  }`}
                >
                  <Text className={`text-base ${message.sender === "user" ? "text-white" : "text-zinc-100"}`}>
                    {message.text}
                  </Text>
                  <Text className={`text-xs mt-1 ${message.sender === "user" ? "text-zinc-200" : "text-zinc-500"}`}>
                    {message.timestamp}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Quick Actions */}
          <View className="px-6 py-3 border-t border-zinc-800">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
              <TouchableOpacity 
                className="bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 mr-2"
                onPress={() => setInputText("Show my eligible drives")}
              >
                <Text className="text-zinc-100 text-sm">Eligible Drives</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 mr-2"
                onPress={() => setInputText("Upcoming hackathons")}
              >
                <Text className="text-zinc-100 text-sm">Hackathons</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2"
                onPress={() => setInputText("Check my attendance")}
              >
                <Text className="text-zinc-100 text-sm">Attendance</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Input */}
          <View className="px-6 pb-6 border-t border-zinc-800">
            <View className="flex-row items-center bg-zinc-900 border border-zinc-800 rounded-2xl mt-3">
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask me anything..."
                placeholderTextColor="#71717a"
                className="flex-1 px-4 py-3 text-zinc-100 text-base"
                multiline
              />
              <TouchableOpacity
                onPress={handleSend}
                className="bg-[#A43C3B] rounded-full w-10 h-10 items-center justify-center mr-2"
              >
                <Text className="text-white text-lg font-bold">→</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}