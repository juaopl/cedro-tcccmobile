import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

// Substitua pelo seu Client ID em console.cloud.google.com
const GOOGLE_CLIENT_ID = 'SEU_CLIENT_ID.apps.googleusercontent.com';

export type GoogleUser = { nome: string; email: string };

export function useGoogleAuth(onSuccess: (user: GoogleUser) => void) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    androidClientId: GOOGLE_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const token = response.authentication?.accessToken;
      if (!token) return;
      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => onSuccess({ nome: data.name, email: data.email }))
        .catch(() => {});
    }
  }, [response]);

  return { request, promptAsync };
}
