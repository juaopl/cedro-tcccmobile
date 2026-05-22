import { Stack } from 'expo-router';

export default function PsicologoLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="avaliar/[pacienteId]" />
    </Stack>
  );
}
