// app/_layout.tsx
import { Stack, Redirect } from "expo-router";
import "../global.css"; 

export default function RootLayout() {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
