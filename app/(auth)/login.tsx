import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  ScrollView, KeyboardAvoidingView, Platform, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { Espacamento, BorderRadius, Sombra } from '../../constants/theme';

type Role = 'paciente' | 'psicologo';

export default function Login() {
  const router = useRouter();
  const { cores } = useTheme();
  const { role } = useLocalSearchParams<{ role: Role }>();
  const perfil = role ?? 'paciente';
  const ehPsicologo = perfil === 'psicologo';

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [crp, setCrp] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [focado, setFocado] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  const { request, promptAsync } = useGoogleAuth(() => {
    router.replace(ehPsicologo ? '/(psicologo)/home' : '/(tabs)');
  });

  // Validações
  const validarEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validarSenha = (v: string) => v.length >= 6;
  const validarCrp = (v: string) => /^CRP \d{2}\/\d{5}$/.test(v);

  const formularioValido = () => {
    if (!validarEmail(email) || !validarSenha(senha)) return false;
    if (ehPsicologo && (!validarCrp(crp) || !especialidade.trim())) return false;
    return true;
  };

  const entrar = () => {
    const novosErros: Record<string, string> = {};
    if (!validarEmail(email)) novosErros.email = '⚠ Digite um e-mail válido';
    if (!validarSenha(senha)) novosErros.senha = '⚠ Mínimo 6 caracteres';
    if (ehPsicologo && !validarCrp(crp)) novosErros.crp = '⚠ Formato: CRP XX/XXXXX';
    if (ehPsicologo && !especialidade.trim()) novosErros.especialidade = '⚠ Campo obrigatório';
    if (Object.keys(novosErros).length > 0) { setErros(novosErros); return; }
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      router.replace(ehPsicologo ? '/(psicologo)/home' : '/(tabs)');
    }, 1200);
  };

  const estiloInput = (campo: string) => ({
    borderColor: erros[campo] ? cores.erro : focado === campo ? cores.bordaFoco : cores.borda,
    borderWidth: focado === campo ? 2 : 1.5,
    backgroundColor: focado === campo ? cores.inputFundoFocado : cores.inputFundo,
  });

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <Header mostrarLogo />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <TouchableOpacity style={estilos.voltar} onPress={() => router.back()}>
            <Text style={[estilos.voltarTexto, { color: cores.primaria }]}>← Voltar</Text>
          </TouchableOpacity>

          {/* Ícone topo */}
          <Ionicons
            name={ehPsicologo ? 'medkit' : 'person-circle'}
            size={56} color={cores.primaria}
            style={{ marginBottom: Espacamento.md }}
          />
          <Text style={[estilos.titulo, { color: cores.textoPrincipal }]}>
            {ehPsicologo ? 'Área do Psicólogo' : 'Bem-vindo de volta'}
          </Text>
          <Text style={[estilos.subtitulo, { color: cores.textoSecundario }]}>
            {ehPsicologo
              ? 'Área exclusiva para psicólogos cadastrados no Cedro.'
              : 'Entre para continuar sua jornada de bem-estar.'}
          </Text>

          {/* E-mail */}
          <Text style={[estilos.label, { color: cores.textoSecundario }]}>E-mail</Text>
          <TextInput
            style={[estilos.input, estiloInput('email'), { color: cores.textoPrincipal }]}
            placeholder="seu@email.com" placeholderTextColor="#9e9e9e"
            value={email} onChangeText={(v) => { setEmail(v); setErros((e) => ({ ...e, email: '' })); }}
            keyboardType="email-address" autoCapitalize="none"
            onFocus={() => setFocado('email')} onBlur={() => setFocado('')}
          />
          {erros.email && <Text style={[estilos.erro, { color: cores.erro }]}>{erros.email}</Text>}

          {/* Senha */}
          <Text style={[estilos.label, { color: cores.textoSecundario }]}>Senha</Text>
          <View style={[estilos.inputRow, estiloInput('senha')]}>
            <TextInput
              style={[estilos.inputFlex, { color: cores.textoPrincipal }]}
              placeholder="Sua senha" placeholderTextColor="#9e9e9e"
              value={senha} onChangeText={(v) => { setSenha(v); setErros((e) => ({ ...e, senha: '' })); }}
              secureTextEntry={!senhaVisivel}
              onFocus={() => setFocado('senha')} onBlur={() => setFocado('')}
            />
            <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} style={estilos.olho}>
              <Ionicons name={senhaVisivel ? 'eye' : 'eye-off'} size={20} color="#9e9e9e" />
            </TouchableOpacity>
          </View>
          {erros.senha && <Text style={[estilos.erro, { color: cores.erro }]}>{erros.senha}</Text>}

          {/* Campos psicólogo */}
          {ehPsicologo && (
            <>
              <Text style={[estilos.label, { color: cores.textoSecundario }]}>CRP</Text>
              <TextInput
                style={[estilos.input, estiloInput('crp'), { color: cores.textoPrincipal }]}
                placeholder="CRP 06/12345" placeholderTextColor="#9e9e9e"
                value={crp} onChangeText={(v) => { setCrp(v); setErros((e) => ({ ...e, crp: '' })); }}
                autoCapitalize="characters"
                onFocus={() => setFocado('crp')} onBlur={() => setFocado('')}
              />
              {erros.crp && <Text style={[estilos.erro, { color: cores.erro }]}>{erros.crp}</Text>}

              <Text style={[estilos.label, { color: cores.textoSecundario }]}>Especialidade</Text>
              <TextInput
                style={[estilos.input, estiloInput('especialidade'), { color: cores.textoPrincipal }]}
                placeholder="Ex: Psicóloga Clínica" placeholderTextColor="#9e9e9e"
                value={especialidade} onChangeText={(v) => { setEspecialidade(v); setErros((e) => ({ ...e, especialidade: '' })); }}
                autoCapitalize="words"
                onFocus={() => setFocado('especialidade')} onBlur={() => setFocado('')}
              />
              {erros.especialidade && <Text style={[estilos.erro, { color: cores.erro }]}>{erros.especialidade}</Text>}
            </>
          )}

          <TouchableOpacity style={estilos.esqueci}>
            <Text style={[estilos.esqueciTexto, { color: cores.primaria }]}>Esqueci minha senha</Text>
          </TouchableOpacity>

          {/* Botão entrar */}
          <TouchableOpacity
            style={[estilos.botao, { backgroundColor: formularioValido() ? cores.primaria : cores.botaoDesabilitado }]}
            onPress={entrar} disabled={carregando} activeOpacity={0.85}
          >
            <Text style={estilos.botaoTexto}>{carregando ? 'Entrando...' : 'Entrar'}</Text>
          </TouchableOpacity>

          {/* Divisor */}
          <View style={estilos.divisor}>
            <View style={[estilos.linha, { backgroundColor: cores.borda }]} />
            <Text style={[estilos.ou, { color: '#9e9e9e' }]}>ou</Text>
            <View style={[estilos.linha, { backgroundColor: cores.borda }]} />
          </View>

          {/* Google */}
          <TouchableOpacity
            style={[estilos.botaoGoogle, { borderColor: cores.borda, backgroundColor: cores.card }]}
            onPress={() => promptAsync()} disabled={!request} activeOpacity={0.85}
          >
            <Text style={estilos.googleG}>G</Text>
            <Text style={[estilos.googleTexto, { color: cores.textoPrincipal }]}>Continuar com Google</Text>
          </TouchableOpacity>

          {/* Cadastro */}
          <TouchableOpacity
            style={estilos.linkCadastro}
            onPress={() => router.push({ pathname: '/(auth)/cadastro', params: { role: perfil } })}
          >
            <Text style={[estilos.linkTexto, { color: cores.textoSecundario }]}>
              Não tem conta?{' '}
              <Text style={[estilos.linkDestaque, { color: cores.primaria }]}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  conteudo: { padding: Espacamento.md, paddingBottom: Espacamento.xxl },
  voltar: { marginBottom: Espacamento.lg },
  voltarTexto: { fontSize: 15, fontWeight: '600' },
  titulo: { fontFamily: 'serif', fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitulo: { fontSize: 14, lineHeight: 22, marginBottom: Espacamento.xl },
  label: { fontSize: 13, marginBottom: 6 },
  input: { borderRadius: 10, padding: 14, paddingHorizontal: 16, marginBottom: 4, fontSize: 15 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, marginBottom: 4, paddingHorizontal: 16 },
  inputFlex: { flex: 1, paddingVertical: 14, fontSize: 15 },
  olho: { padding: 4 },
  erro: { fontSize: 12, marginBottom: Espacamento.sm },
  esqueci: { alignSelf: 'flex-end', marginBottom: Espacamento.lg, marginTop: 4 },
  esqueciTexto: { fontSize: 13, fontWeight: '600' },
  botao: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: Espacamento.md, shadowColor: '#2e7d32', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, elevation: 4 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
  divisor: { flexDirection: 'row', alignItems: 'center', gap: Espacamento.md, marginVertical: Espacamento.md },
  linha: { flex: 1, height: 1 },
  ou: { fontSize: 13 },
  botaoGoogle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 52, borderRadius: 12, borderWidth: 1.5, gap: Espacamento.sm, marginBottom: Espacamento.md },
  googleG: { fontSize: 20, fontWeight: '900', color: '#4285F4' },
  googleTexto: { fontSize: 15, fontWeight: '600' },
  linkCadastro: { alignItems: 'center', paddingVertical: Espacamento.sm },
  linkTexto: { fontSize: 14 },
  linkDestaque: { fontWeight: '700' },
});
