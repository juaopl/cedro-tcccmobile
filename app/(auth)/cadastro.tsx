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
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { Colors, Espacamento, BorderRadius, Tipografia, Sombra } from '../../constants/theme';

type Role = 'paciente' | 'psicologo';

const configPorRole: Record<Role, { icone: string; titulo: string; subtitulo: string }> = {
  paciente: {
    icone: '🧘',
    titulo: 'Criar sua conta',
    subtitulo: 'Comece sua jornada de bem-estar com o Cedro.',
  },
  psicologo: {
    icone: '🩺',
    titulo: 'Cadastro de psicólogo',
    subtitulo: 'Crie sua conta e comece a atender pela plataforma.',
  },
};

export default function Cadastro() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: Role }>();
  const perfil = role ?? 'paciente';
  const config = configPorRole[perfil];

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [crp, setCrp] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [carregandoGoogle, setCarregandoGoogle] = useState(false);
  const [erroSenha, setErroSenha] = useState('');

  const { request, promptAsync } = useGoogleAuth(() => {
    setCarregandoGoogle(false);
    router.replace(perfil === 'psicologo' ? '/(psicologo)/home' : '/(paciente)/home');
  });

  const cadastrar = () => {
    if (senha !== confirmarSenha) {
      setErroSenha('As senhas não coincidem');
      return;
    }
    setErroSenha('');
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      router.replace(perfil === 'psicologo' ? '/(psicologo)/home' : '/(paciente)/home');
    }, 1400);
  };

  const cadastrarComGoogle = async () => {
    setCarregandoGoogle(true);
    await promptAsync();
    setCarregandoGoogle(false);
  };

  const formularioValido =
    nome.trim() &&
    email.trim() &&
    senha.trim() &&
    confirmarSenha.trim() &&
    (perfil === 'paciente' || (crp.trim() && especialidade.trim()));

  return (
    <SafeAreaView style={estilos.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={estilos.conteudo}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Botão voltar */}
          <TouchableOpacity style={estilos.botaoVoltar} onPress={() => router.back()}>
            <Text style={estilos.textoVoltar}>← Voltar</Text>
          </TouchableOpacity>

          {/* Header */}
          <Text style={estilos.icone}>{config.icone}</Text>
          <Text style={estilos.titulo}>{config.titulo}</Text>
          <Text style={estilos.subtitulo}>{config.subtitulo}</Text>

          {/* Campos comuns */}
          <Input
            label="Nome completo"
            placeholder="Seu nome"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />
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
            placeholder="Mínimo 6 caracteres"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <Input
            label="Confirmar senha"
            placeholder="Repita sua senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
            erro={erroSenha}
          />

          {/* Campos exclusivos do psicólogo */}
          {perfil === 'psicologo' && (
            <>
              <View style={estilos.separador}>
                <Text style={estilos.separadorTexto}>Dados profissionais</Text>
              </View>
              <Input
                label="CRP"
                placeholder="Ex: 06/12345"
                value={crp}
                onChangeText={setCrp}
                autoCapitalize="characters"
              />
              <Input
                label="Especialidade"
                placeholder="Ex: Psicologia Clínica"
                value={especialidade}
                onChangeText={setEspecialidade}
                autoCapitalize="words"
              />
            </>
          )}

          {/* Termos */}
          <Text style={estilos.termos}>
            Ao se cadastrar, você concorda com os{' '}
            <Text style={estilos.termosLink}>Termos de Uso</Text>
            {' '}e a{' '}
            <Text style={estilos.termosLink}>Política de Privacidade</Text>
            {' '}do Cedro.
          </Text>

          <Button
            titulo="Criar conta"
            onPress={cadastrar}
            carregando={carregando}
            desabilitado={!formularioValido}
          />

          {/* Divisor */}
          <View style={estilos.divisor}>
            <View style={estilos.linhaDivisor} />
            <Text style={estilos.textoDivisor}>ou</Text>
            <View style={estilos.linhaDivisor} />
          </View>

          {/* Google */}
          <Button
            titulo={carregandoGoogle ? 'Conectando...' : 'Cadastrar com Google'}
            onPress={cadastrarComGoogle}
            variante="secondary"
            carregando={carregandoGoogle}
            desabilitado={!request}
          />

          {/* Link login */}
          <TouchableOpacity
            style={estilos.linkLogin}
            onPress={() => router.push({ pathname: '/(auth)/login', params: { role: perfil } })}
          >
            <Text style={estilos.textoLink}>
              Já tem conta?{' '}
              <Text style={estilos.textoLinkDestaque}>Entrar</Text>
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
  separador: {
    borderTopWidth: 1,
    borderTopColor: Colors.borda,
    paddingTop: Espacamento.md,
    marginBottom: Espacamento.md,
    marginTop: Espacamento.sm,
  },
  separadorTexto: {
    ...Tipografia.label,
    color: Colors.textoSecundario,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 11,
  },
  termos: {
    ...Tipografia.pequeno,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Espacamento.lg,
    marginTop: Espacamento.sm,
  },
  termosLink: {
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
  linkLogin: {
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
