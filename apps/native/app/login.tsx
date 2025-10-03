import { Container } from "@/components/container";
import React, { useState } from "react";
import { Link } from "expo-router";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";

export default function Login() {
  const [sapId, setSapId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("SAP ID:", sapId);
    console.log("Password:", password);
  };

  return (
    <Container>
      <View className="flex-1 bg-background items-center justify-center px-6">
        <Image
          source={{
            uri: "https://portal.svkm.ac.in/usermgmt/resources/images/logo.gif",
          }}
          className="w-48 h-24 mb-10"
          resizeMode="contain"
        />
        <View className="w-full space-y-4 items-center justify-center">
          <Text className="text-2xl font-bold text-center mb-2">
            Welcome To Placement Committee
          </Text>
          <Text className="text-sm text-muted-foreground mb-10">
            Login using your university provided credientials
          </Text>
          <TextInput
            className="w-full h-12 border border-zinc-300 rounded-lg px-4 bg-white text-zinc-900 mb-5"
            placeholder="SAP ID"
            value={sapId}
            onChangeText={setSapId}
            autoCapitalize="none"
            keyboardType="numeric"
          />
          <TextInput
            className="w-full h-12 border border-zinc-300 rounded-lg px-4 bg-white text-zinc-900 mb-10"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Link href="/(tabs)" asChild>
            <TouchableOpacity
              className="w-full h-12 bg-[#a53c3c] rounded-lg flex items-center justify-center"
              onPress={handleSubmit}
            >
              <Text className="text-white text-lg font-bold">Login Now</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </Container>
  );
}
