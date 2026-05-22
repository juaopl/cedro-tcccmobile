import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import SOSButton from '../components/SOSButton';

// Telas onde o SOS não aparece
const TELAS_SEM_SOS = ['/chamada'];

export default function RootLayout() {
  const pathname = usePathname();
  const mostrarSOS = !TELAS_SEM_SOS.some((t) => pathname.includes(t));

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(psicologo)" />
        <Stack.Screen name="chat/[id]" />
        <Stack.Screen name="chamada/[id]" />
      </Stack>
      {mostrarSOS && <SOSButton />}
    </View>
  );
}
