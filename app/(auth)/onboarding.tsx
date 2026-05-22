import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Espacamento, BorderRadius, Tipografia } from '../../constants/theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icone: '🌿',
    titulo: 'Bem-vindo ao Cedro',
    descricao:
      'Saúde mental acessível para todos. Encontre apoio psicológico de qualidade, no seu ritmo e no seu tempo.',
  },
  {
    id: '2',
    icone: '💬',
    titulo: 'Conecte-se com seu psicólogo',
    descricao:
      'Converse por chat, faça chamadas de voz ou videochamadas. Você escolhe como quer se comunicar.',
  },
  {
    id: '3',
    icone: '🔒',
    titulo: 'Privacidade em primeiro lugar',
    descricao:
      'Todas as suas conversas são confidenciais e protegidas. Seu bem-estar é nossa prioridade.',
  },
];

// Componente de slide com animação de entrada (fade + translateY)
function Slide({ item, scrollX, index }: { item: typeof slides[0]; scrollX: Animated.Value; index: number }) {
  const opacidade = scrollX.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });
  const translateY = scrollX.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [40, 0, 40],
    extrapolate: 'clamp',
  });
  // Escala do ícone ao entrar no slide
  const escalaIcone = scrollX.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  return (
    <View style={estilos.slide}>
      <Animated.Text style={[estilos.icone, { transform: [{ scale: escalaIcone }] }]}>
        {item.icone}
      </Animated.Text>
      <Animated.Text style={[estilos.titulo, { opacity: opacidade, transform: [{ translateY }] }]}>
        {item.titulo}
      </Animated.Text>
      <Animated.Text style={[estilos.descricao, { opacity: opacidade, transform: [{ translateY }] }]}>
        {item.descricao}
      </Animated.Text>
    </View>
  );
}

export default function Onboarding() {
  const router = useRouter();
  const [indiceAtual, setIndiceAtual] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  // Animação de entrada da tela inteira
  const fadeEntrada = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeEntrada, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const ehUltimoSlide = indiceAtual === slides.length - 1;

  const avancar = () => {
    if (ehUltimoSlide) {
      router.replace('/(auth)/role-select');
      return;
    }
    const proximo = indiceAtual + 1;
    flatListRef.current?.scrollToIndex({ index: proximo, animated: true });
    setIndiceAtual(proximo);
  };

  const pular = () => router.replace('/(auth)/role-select');

  const aoMudarSlide = (e: any) => {
    const novoIndice = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndiceAtual(novoIndice);
  };

  return (
    <SafeAreaView style={estilos.container}>
      <Animated.View style={[{ flex: 1 }, { opacity: fadeEntrada }]}>
        <View style={estilos.header}>
          {!ehUltimoSlide && (
            <TouchableOpacity onPress={pular}>
              <Text style={estilos.textoPular}>Pular</Text>
            </TouchableOpacity>
          )}
        </View>

        <Animated.FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={aoMudarSlide}
          renderItem={({ item, index }) => (
            <Slide item={item} scrollX={scrollX} index={index} />
          )}
        />

        {/* Dots de paginação animados */}
        <View style={estilos.dots}>
          {slides.map((_, i) => {
            const largura = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            const opacidade = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={[estilos.dot, { width: largura, opacity: opacidade }]}
              />
            );
          })}
        </View>

        <View style={estilos.rodape}>
          <TouchableOpacity style={estilos.botao} onPress={avancar} activeOpacity={0.85}>
            <Text style={estilos.textoBotao}>
              {ehUltimoSlide ? 'Começar agora →' : 'Continuar'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundo,
  },
  header: {
    height: 52,
    alignItems: 'flex-end',
    paddingHorizontal: Espacamento.lg,
    justifyContent: 'center',
  },
  textoPular: {
    ...Tipografia.corpoSecundario,
    fontWeight: '600',
    color: Colors.textoSecundario,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Espacamento.xl,
  },
  icone: {
    fontSize: 80,
    marginBottom: Espacamento.xl,
  },
  titulo: {
    ...Tipografia.tituloGrande,
    textAlign: 'center',
    marginBottom: Espacamento.md,
  },
  descricao: {
    ...Tipografia.corpo,
    textAlign: 'center',
    color: Colors.textoSecundario,
    lineHeight: 26,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Espacamento.xs,
    marginBottom: Espacamento.xl,
  },
  dot: {
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaria,
  },
  rodape: {
    paddingHorizontal: Espacamento.lg,
    paddingBottom: Espacamento.xl,
  },
  botao: {
    backgroundColor: Colors.primaria,
    height: 56,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primaria,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  textoBotao: {
    color: Colors.branco,
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'sans-serif',
  },
});
