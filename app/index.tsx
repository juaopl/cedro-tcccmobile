import { Redirect } from 'expo-router';

// Ponto de entrada — redireciona para o onboarding
export default function Index() {
  return <Redirect href="/(auth)/onboarding" />;
}
