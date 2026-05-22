import { Stack } from 'expo-router';

// Layout do grupo de autenticação — sem header nativo
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="role-select" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
