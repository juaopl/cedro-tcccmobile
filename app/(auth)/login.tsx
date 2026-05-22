import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Colors, Espacamento, BorderRadius, Tipografia, Sombra } from '../../constants/theme';

type Role = 'paciente' | 'psicologo';

// Configuração visual por perfil
const configPorRole: Record<Role, { icone: string; titulo: string; subtitulo: string }> = {
  paciente: {
    icone: '🧘',
    titulo: 'Bem-vindo de volta',
    subtitulo: 'Entre para continuar sua jornada de bem-estar.',
  },
  psicologo: {
    icone: '🩺',
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

  // Simula autenticação e redireciona conforme o perfil
  const entrar = () => {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      if (perfil === 'psicologo') {
        router.replace('/(psicologo)/home');
      } else {
        router.replace('/(paciente)/home');
      }
    }, 1200);
  };

  const voltarParaRoleSelect = () => {
    router.back();
  };

  return (
    <SafeAreaView style={estilos.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={estilos.conteudo}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Botão voltar */}
          <TouchableOpacity style={estilos.botaoVoltar} onPress={voltarParaRoleSelect}>
            <Text style={estilos.textoVoltar}>← Voltar</Text>
          </TouchableOpacity>

          {/* Cabeçalho personalizado por perfil */}
          <Text style={estilos.icone}>{config.icone}</Text>
          <Text style={estilos.titulo}>{config.titulo}</Text>
          <Text style={estilos.subtitulo}>{config.subtitulo}</Text>

          {/* Formulário */}
          <View style={estilos.formulario}>
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

            {/* Link esqueci a senha */}
            <TouchableOpacity style={estilos.linkEsqueci}>
              <Text style={estilos.textoEsqueci}>Esqueci minha senha</Text>
            </TouchableOpacity>

            {/* Botão entrar */}
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

            {/* Botão Google */}
            <TouchableOpacity style={estilos.botaoGoogle} activeOpacity={0.85}>
              <Text style={estilos.iconeGoogle}>G</Text>
              <Text style={estilos.textoGoogle}>Continuar com Google</Text>
            </TouchableOpacity>
          </View>

          {/* Link cadastro */}
          <TouchableOpacity style={estilos.linkCadastro}>
            <Text style={estilos.textoLink}>
              Não tem conta?{' '}
              <Text style={estilos.textoLinkDestaque}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundo,
  },
  conteudo: {
    padding: Espacamento.lg,
    paddingTop: Espacamento.md,
    flexGrow: 1,
  },
  botaoVoltar: {
    alignSelf: 'flex-start',
    paddingVertical: Espacamento.sm,
    marginBottom: Espacamento.md,
  },
  textoVoltar: {
    ...Tipografia.corpoSecundario,
    fontWeight: '600',
    color: Colors.primaria,
  },
  icone: {
    fontSize: 48,
    marginBottom: Espacamento.md,
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
  formulario: {
    gap: 0,
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
  iconeGoogle: {
    fontSize: 18,
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
  },
  textoLink: {
    ...Tipografia.corpoSecundario,
  },
  textoLinkDestaque: {
    color: Colors.primaria,
    fontWeight: '700',
  },
});
