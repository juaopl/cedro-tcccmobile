import { Stack } from 'expo-router';

// Layout do grupo psicólogo — sem header nativo
export default function PsicologoLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="chamada" />
    </Stack>
  );
}
