import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, Animated, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Espacamento, BorderRadius } from '../../constants/theme';

export default function Chamada() {
  const router = useRouter();
  const { id, modo } = useLocalSearchParams<{ id: string; modo: string }>();
  const [mudo, setMudo] = useState(false);
  const [cameraAtiva, setCameraAtiva] = useState(true);
  const [altoFalante, setAltoFalante] = useState(true);
  const [segundos, setSegundos] = useState(0);

  // Anel pulsante
  const pulso = useRef(new Animated.Value(1)).current;
  const opacidade = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulso, { toValue: 1.3, duration: 900, useNativeDriver: true }),
          Animated.timing(pulso, { toValue: 1, duration: 900, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacidade, { toValue: 0, duration: 900, useNativeDriver: true }),
          Animated.timing(opacidade, { toValue: 0.6, duration: 900, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const tempo = `${String(Math.floor(segundos / 60)).padStart(2, '0')}:${String(segundos % 60).padStart(2, '0')}`;

  return (
    <View style={estilos.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />
      <LinearGradient
        colors={['#1b5e20', '#0d1f0e', '#000000']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Botão alternar câmera */}
      <SafeAreaView style={estilos.topo}>
        <TouchableOpacity style={estilos.alternarCamera}>
          <Ionicons name="camera-reverse" size={26} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Centro */}
      <View style={estilos.centro}>
        {/* Avatar com anel pulsante */}
        <View style={estilos.avatarWrapper}>
          <Animated.View
            style={[estilos.anel, { transform: [{ scale: pulso }], opacity: opacidade }]}
          />
          <View style={estilos.avatar}>
            <Text style={estilos.avatarTexto}>DM</Text>
          </View>
        </View>

        <Text style={estilos.nome}>Dra. Carla Mendes</Text>
        <Text style={estilos.status}>
          Chamada em andamento · {tempo}
        </Text>
      </View>

      {/* Preview câmera local (placeholder) */}
      {modo === 'video' && (
        <View style={estilos.cameraLocal}>
          {cameraAtiva ? (
            <View style={[estilos.cameraPlaceholder, { backgroundColor: '#1a2e1b' }]}>
              <Text style={{ color: '#fff', fontSize: 11 }}>Você</Text>
            </View>
          ) : (
            <View style={[estilos.cameraPlaceholder, { backgroundColor: '#1a2e1b', alignItems: 'center', justifyContent: 'center' }]}>
              <Ionicons name="videocam-off" size={24} color="#fff" />
            </View>
          )}
        </View>
      )}

      {/* Controles */}
      <View style={estilos.controles}>
        <View style={estilos.controleItem}>
          <TouchableOpacity
            style={[estilos.botaoControle, mudo && estilos.botaoAtivo]}
            onPress={() => setMudo(!mudo)}
          >
            <Ionicons name={mudo ? 'mic-off' : 'mic'} size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={estilos.controleLabel}>{mudo ? 'Ativar' : 'Mudo'}</Text>
        </View>

        {modo === 'video' && (
          <View style={estilos.controleItem}>
            <TouchableOpacity
              style={[estilos.botaoControle, !cameraAtiva && estilos.botaoAtivo]}
              onPress={() => setCameraAtiva(!cameraAtiva)}
            >
              <Ionicons name={cameraAtiva ? 'videocam' : 'videocam-off'} size={26} color="#fff" />
            </TouchableOpacity>
            <Text style={estilos.controleLabel}>Câmera</Text>
          </View>
        )}

        <View style={estilos.controleItem}>
          <TouchableOpacity
            style={[estilos.botaoControle, !altoFalante && estilos.botaoAtivo]}
            onPress={() => setAltoFalante(!altoFalante)}
          >
            <Ionicons name="volume-high" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={estilos.controleLabel}>Som</Text>
        </View>

        <View style={estilos.controleItem}>
          <TouchableOpacity style={estilos.botaoEncerrar} onPress={() => router.back()}>
            <View style={{ transform: [{ rotate: '135deg' }] }}>
              <Ionicons name="call" size={28} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={estilos.controleLabel}>Encerrar</Text>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  topo: { alignItems: 'flex-end', paddingHorizontal: 20, paddingTop: 10 },
  alternarCamera: { padding: 8 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  avatarWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center', marginBottom: Espacamento.xl },
  anel: { position: 'absolute', width: 148, height: 148, borderRadius: 74, borderWidth: 2.5, borderColor: '#4caf50' },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#f9a825', alignItems: 'center', justifyContent: 'center' },
  avatarTexto: { color: '#fff', fontWeight: '700', fontSize: 36 },
  nome: { color: '#fff', fontFamily: 'serif', fontSize: 24, fontWeight: '700', marginBottom: 8 },
  status: { color: '#a5d6a7', fontSize: 16 },
  cameraLocal: { position: 'absolute', bottom: 120, right: 20 },
  cameraPlaceholder: { width: 90, height: 130, borderRadius: 12, borderWidth: 2, borderColor: '#fff' },
  controles: { flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 20, paddingBottom: 50, paddingTop: 20 },
  controleItem: { alignItems: 'center', gap: 8 },
  botaoControle: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  botaoAtivo: { backgroundColor: 'rgba(255,255,255,0.3)' },
  botaoEncerrar: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#e53935', alignItems: 'center', justifyContent: 'center' },
  controleLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
});
