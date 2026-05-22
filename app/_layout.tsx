import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Layout raiz — define a pilha de navegação global
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(paciente)" />
        <Stack.Screen name="(psicologo)" />
      </Stack>
    </>
  );
}
