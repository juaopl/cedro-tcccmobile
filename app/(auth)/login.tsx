import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { Colors, Espacamento, BorderRadius, Tipografia, Sombra } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

type Role = 'paciente' | 'psicologo';

const configPorRole: Record<Role, { titulo: string; subtitulo: string }> = {
  paciente: {
    titulo: 'Bem-vindo de volta',
    subtitulo: 'Entre para continuar sua jornada de bem-estar.',
  },
  psicologo: {
    titulo: 'Área do psicólogo',
    subtitulo: 'Acesse sua agenda e conecte-se com seus pacientes.',
  },
};

export default function Login() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: Role }>();
  const perfil = role ?? 'paciente';
  const config = configPorRole[perfil];

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [carregandoGoogle, setCarregandoGoogle] = useState(false);

  // Animação de entrada do card
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const { request, promptAsync } = useGoogleAuth(() => {
    setCarregandoGoogle(false);
    router.replace(perfil === 'psicologo' ? '/(psicologo)/home' : '/(paciente)/home');
  });

  const entrar = () => {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      router.replace(perfil === 'psicologo' ? '/(psicologo)/home' : '/(paciente)/home');
    }, 1200);
  };

  const entrarComGoogle = async () => {
    setCarregandoGoogle(true);
    await promptAsync();
    setCarregandoGoogle(false);
  };

  return (
    <View style={estilos.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaria} />

      {/* ── HEADER ── */}
      <View style={estilos.header}>
        <TouchableOpacity style={estilos.botaoVoltar} onPress={() => router.back()}>
          <Text style={estilos.textoVoltar}>←</Text>
        </TouchableOpacity>
        <View style={estilos.logo}>
          <Text style={estilos.logoIcone}>🌲</Text>
          <Text style={estilos.logoTexto}>CEDRO</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={estilos.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── HERO com gradiente ── */}
          <View style={estilos.hero}>
            <LinearGradient
              colors={['#1b5e20', '#2e7d32', '#388e3c', '#66bb6a']}
              locations={[0, 0.4, 0.7, 1]}
              style={StyleSheet.absoluteFillObject}
            />

            {/* Elementos decorativos de natureza */}
            <View style={estilos.natureza}>
              <Text style={estilos.arvoreGrande}>🌳</Text>
              <Text style={estilos.arvoreMedia}>🌲</Text>
              <Text style={estilos.arvorePequena}>🌿</Text>
            </View>
            <Text style={estilos.personagem}>🧘</Text>
            <View style={estilos.chao} />

            {/* Card glassmorphism */}
            <View style={estilos.cardGlass}>
              <Text style={estilos.cardIcone}>💚</Text>
              <Text style={estilos.cardTitulo}>Cedro</Text>
              <Text style={estilos.cardTagline}>
                Seu espaço seguro e acolhedor{'\n'}para o cuidado emocional
              </Text>
            </View>
          </View>

          {/* ── FORMULÁRIO ── */}
          <Animated.View
            style={[
              estilos.formularioContainer,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={estilos.titulo}>{config.titulo}</Text>
            <Text style={estilos.subtitulo}>{config.subtitulo}</Text>

            <Input
              label="E-mail"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Input
              label="Senha"
              placeholder="Sua senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />

            <TouchableOpacity style={estilos.linkEsqueci}>
              <Text style={estilos.textoEsqueci}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <Button
              titulo="Entrar"
              onPress={entrar}
              carregando={carregando}
              desabilitado={!email || !senha}
            />

            {/* Divisor */}
            <View style={estilos.divisor}>
              <View style={estilos.linhaDivisor} />
              <Text style={estilos.textoDivisor}>ou</Text>
              <View style={estilos.linhaDivisor} />
            </View>

            {/* Google */}
            <TouchableOpacity
              style={estilos.botaoGoogle}
              onPress={entrarComGoogle}
              disabled={!request || carregandoGoogle}
              activeOpacity={0.85}
            >
              <View style={estilos.googleIconeContainer}>
                <Text style={estilos.googleIconeTexto}>G</Text>
              </View>
              <Text style={estilos.textoGoogle}>
                {carregandoGoogle ? 'Conectando...' : 'Continuar com Google'}
              </Text>
            </TouchableOpacity>

            {/* Cadastro */}
            <TouchableOpacity
              style={estilos.linkCadastro}
              onPress={() => router.push({ pathname: '/(auth)/cadastro', params: { role: perfil } })}
            >
              <Text style={estilos.textoLink}>
                Não tem conta?{' '}
                <Text style={estilos.textoLinkDestaque}>Cadastre-se grátis</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── BOTÃO SOS FLUTUANTE ── */}
      <TouchableOpacity style={estilos.botaoSOS} activeOpacity={0.85}>
        <Text style={estilos.sosTelefone}>📞</Text>
        <Text style={estilos.sosTexto}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundo,
  },

  // Header
  header: {
    height: 56,
    backgroundColor: Colors.primaria,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Espacamento.md,
  },
  botaoVoltar: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoVoltar: {
    fontSize: 22,
    color: Colors.branco,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcone: {
    fontSize: 22,
  },
  logoTexto: {
    color: Colors.branco,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 4,
    fontFamily: 'sans-serif',
  },

  // Hero
  hero: {
    height: 220,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  natureza: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: Espacamento.xl,
  },
  arvoreGrande: {
    fontSize: 64,
  },
  arvoreMedia: {
    fontSize: 48,
  },
  arvorePequena: {
    fontSize: 36,
  },
  personagem: {
    position: 'absolute',
    bottom: 36,
    fontSize: 40,
    zIndex: 2,
  },
  chao: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 32,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  // Card glassmorphism
  cardGlass: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: BorderRadius.lg,
    padding: Espacamento.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    maxWidth: 160,
  },
  cardIcone: {
    fontSize: 20,
    marginBottom: 4,
  },
  cardTitulo: {
    color: Colors.branco,
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 1,
    fontFamily: 'sans-serif',
  },
  cardTagline: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
    marginTop: 4,
    fontFamily: 'sans-serif',
  },

  // Formulário
  scroll: {
    flexGrow: 1,
  },
  formularioContainer: {
    backgroundColor: Colors.branco,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Espacamento.xl,
    paddingTop: Espacamento.xl,
    flex: 1,
    marginTop: -20,
    ...Sombra.media,
  },
  titulo: {
    ...Tipografia.titulo,
    marginBottom: Espacamento.xs,
  },
  subtitulo: {
    ...Tipografia.corpoSecundario,
    lineHeight: 22,
    marginBottom: Espacamento.xl,
  },
  linkEsqueci: {
    alignSelf: 'flex-end',
    marginBottom: Espacamento.lg,
    marginTop: -Espacamento.sm,
  },
  textoEsqueci: {
    ...Tipografia.corpoSecundario,
    color: Colors.primaria,
    fontWeight: '600',
  },
  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Espacamento.lg,
    gap: Espacamento.md,
  },
  linhaDivisor: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borda,
  },
  textoDivisor: {
    ...Tipografia.corpoSecundario,
  },

  // Botão Google customizado
  botaoGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.borda,
    backgroundColor: Colors.branco,
    gap: Espacamento.sm,
    ...Sombra.leve,
  },
  googleIconeContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#dadce0',
  },
  googleIconeTexto: {
    fontSize: 13,
    fontWeight: '900',
    color: '#4285F4',
    fontFamily: 'sans-serif',
  },
  textoGoogle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textoPrincipal,
    fontFamily: 'sans-serif',
  },
  linkCadastro: {
    alignItems: 'center',
    marginTop: Espacamento.xl,
    paddingVertical: Espacamento.sm,
    paddingBottom: Espacamento.xxl,
  },
  textoLink: {
    ...Tipografia.corpoSecundario,
  },
  textoLinkDestaque: {
    color: Colors.primaria,
    fontWeight: '700',
  },

  // Botão SOS flutuante
  botaoSOS: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e53935',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#e53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    gap: 2,
  },
  sosTelefone: {
    fontSize: 20,
  },
  sosTexto: {
    color: Colors.branco,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    fontFamily: 'sans-serif',
  },
});
