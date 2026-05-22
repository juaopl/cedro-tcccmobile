import { Stack } from 'expo-router';

// Layout do grupo paciente — sem header nativo (cada tela tem o seu)
export default function PacienteLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="chamada" />
      <Stack.Screen name="plano" />
    </Stack>
  );
}
