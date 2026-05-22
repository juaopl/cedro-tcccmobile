import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  Dimensions, Animated, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { Espacamento, BorderRadius } from '../../constants/theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icone: 'leaf' as const,
    titulo: 'Bem-vindo ao Cedro',
    texto: 'Saúde mental acessível para todos. Encontre apoio psicológico de qualidade, no seu ritmo e no seu tempo.',
  },
  {
    id: '2',
    icone: 'chatbubbles' as const,
    titulo: 'Conecte-se com seu psicólogo',
    texto: 'Converse por chat, faça chamadas de voz ou videochamadas. Você escolhe como quer se comunicar.',
  },
  {
    id: '3',
    icone: 'lock-closed' as const,
    titulo: 'Privacidade em primeiro lugar',
    texto: 'Todas as suas conversas são confidenciais e protegidas. Seu bem-estar é nossa prioridade.',
  },
];

export default function Onboarding() {
  const router = useRouter();
  const { cores } = useTheme();
  const [indice, setIndice] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const ultimo = indice === slides.length - 1;

  const avancar = () => {
    if (ultimo) { router.replace('/(auth)/role-select'); return; }
    const prox = indice + 1;
    flatListRef.current?.scrollToIndex({ index: prox, animated: true });
    setIndice(prox);
  };

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(i) => i.id}
        horizontal pagingEnabled showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => setIndice(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <View style={[estilos.slide, { width }]}>
            <Ionicons name={item.icone} size={80} color={cores.primaria} style={{ marginBottom: Espacamento.xl }} />
            <Text style={[estilos.titulo, { color: cores.textoPrincipal }]}>{item.titulo}</Text>
            <Text style={[estilos.texto, { color: cores.textoSecundario }]}>{item.texto}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={estilos.dots}>
        {slides.map((_, i) => {
          const largura = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [8, 24, 8], extrapolate: 'clamp',
          });
          const bg = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [cores.borda, cores.primaria, cores.borda], extrapolate: 'clamp',
          });
          return <Animated.View key={i} style={[estilos.dot, { width: largura, backgroundColor: bg }]} />;
        })}
      </View>

      {/* Botões */}
      <View style={estilos.rodape}>
        <TouchableOpacity
          style={[estilos.botao, { backgroundColor: cores.primaria }]}
          onPress={avancar} activeOpacity={0.85}
        >
          <Text style={estilos.botaoTexto}>{ultimo ? 'Começar agora →' : 'Continuar'}</Text>
        </TouchableOpacity>
        {!ultimo && (
          <TouchableOpacity onPress={() => router.replace('/(auth)/role-select')} style={{ marginTop: Espacamento.md }}>
            <Text style={[estilos.pular, { color: cores.textoSecundario }]}>Pular</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Espacamento.xl },
  titulo: { fontFamily: 'serif', fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: Espacamento.md },
  texto: { fontSize: 16, textAlign: 'center', lineHeight: 26 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: Espacamento.xs, marginBottom: Espacamento.lg },
  dot: { height: 8, borderRadius: 4 },
  rodape: { paddingHorizontal: Espacamento.lg, paddingBottom: Espacamento.xl, alignItems: 'center' },
  botao: { width: '100%', paddingVertical: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#2e7d32', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, elevation: 4 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
  pular: { fontSize: 15, fontWeight: '500' },
});
