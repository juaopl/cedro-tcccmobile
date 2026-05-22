import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  ScrollView, KeyboardAvoidingView, Platform, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaskedTextInput } from 'react-native-mask-text';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { Espacamento } from '../../constants/theme';

type Role = 'paciente' | 'psicologo';

export default function Cadastro() {
  const router = useRouter();
  const { cores } = useTheme();
  const { role } = useLocalSearchParams<{ role: Role }>();
  const perfil = role ?? 'paciente';
  const ehPsicologo = perfil === 'psicologo';

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [crp, setCrp] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarVisivel, setConfirmarVisivel] = useState(false);
  const [termos, setTermos] = useState(false);
  const [focado, setFocado] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  const validarEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const formularioValido = () => {
    if (!nome.trim() || !validarEmail(email) || telefone.length < 14) return false;
    if (senha.length < 6 || senha !== confirmar) return false;
    if (!termos) return false;
    if (ehPsicologo && (!crp.trim() || !especialidade.trim())) return false;
    return true;
  };

  const cadastrar = () => {
    const novosErros: Record<string, string> = {};
    if (!nome.trim()) novosErros.nome = '⚠ Campo obrigatório';
    if (!validarEmail(email)) novosErros.email = '⚠ E-mail inválido';
    if (telefone.length < 14) novosErros.telefone = '⚠ Telefone inválido';
    if (senha.length < 6) novosErros.senha = '⚠ Mínimo 6 caracteres';
    if (senha !== confirmar) novosErros.confirmar = '⚠ As senhas não coincidem';
    if (!termos) novosErros.termos = '⚠ Aceite os termos para continuar';
    if (ehPsicologo && !crp.trim()) novosErros.crp = '⚠ Campo obrigatório';
    if (ehPsicologo && !especialidade.trim()) novosErros.especialidade = '⚠ Campo obrigatório';
    if (Object.keys(novosErros).length > 0) { setErros(novosErros); return; }
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      router.replace(ehPsicologo ? '/(psicologo)/home' : '/(tabs)');
    }, 1400);
  };

  const estiloInput = (campo: string) => ({
    borderColor: erros[campo] ? cores.erro : focado === campo ? cores.bordaFoco : cores.borda,
    borderWidth: focado === campo ? 2 : 1.5,
    backgroundColor: focado === campo ? cores.inputFundoFocado : cores.inputFundo,
  });

  const Campo = ({ campo, label, children }: { campo: string; label: string; children: React.ReactNode }) => (
    <View style={{ marginBottom: Espacamento.sm }}>
      <Text style={[estilos.label, { color: cores.textoSecundario }]}>{label}</Text>
      {children}
      {erros[campo] ? <Text style={[estilos.erro, { color: cores.erro }]}>{erros[campo]}</Text> : null}
    </View>
  );

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <Header
        titulo={ehPsicologo ? 'Cadastro de psicólogo' : 'Criar conta'}
        mostrarVoltar
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Nome */}
          <Campo campo="nome" label="Nome completo">
            <View style={[estilos.inputRow, estiloInput('nome')]}>
              <Ionicons name="person-outline" size={18} color="#9e9e9e" style={estilos.inputIcone} />
              <TextInput
                style={[estilos.inputFlex, { color: cores.textoPrincipal }]}
                placeholder="Seu nome completo" placeholderTextColor="#9e9e9e"
                value={nome} onChangeText={(v) => { setNome(v); setErros((e) => ({ ...e, nome: '' })); }}
                autoCapitalize="words"
                onFocus={() => setFocado('nome')} onBlur={() => setFocado('')}
              />
            </View>
          </Campo>

          {/* E-mail */}
          <Campo campo="email" label="E-mail">
            <View style={[estilos.inputRow, estiloInput('email')]}>
              <Ionicons name="mail-outline" size={18} color="#9e9e9e" style={estilos.inputIcone} />
              <TextInput
                style={[estilos.inputFlex, { color: cores.textoPrincipal }]}
                placeholder="seu@email.com" placeholderTextColor="#9e9e9e"
                value={email} onChangeText={(v) => { setEmail(v); setErros((e) => ({ ...e, email: '' })); }}
                keyboardType="email-address" autoCapitalize="none"
                onFocus={() => setFocado('email')} onBlur={() => setFocado('')}
              />
            </View>
          </Campo>

          {/* Telefone */}
          <Campo campo="telefone" label="Telefone">
            <View style={[estilos.inputRow, estiloInput('telefone')]}>
              <Ionicons name="call-outline" size={18} color="#9e9e9e" style={estilos.inputIcone} />
              <MaskedTextInput
                mask="(99) 99999-9999"
                style={[estilos.inputFlex, { color: cores.textoPrincipal }]}
                placeholder="(11) 99999-9999" placeholderTextColor="#9e9e9e"
                value={telefone} onChangeText={(v) => { setTelefone(v); setErros((e) => ({ ...e, telefone: '' })); }}
                keyboardType="phone-pad"
                onFocus={() => setFocado('telefone')} onBlur={() => setFocado('')}
              />
            </View>
          </Campo>

          {/* CRP e Especialidade — psicólogo */}
          {ehPsicologo && (
            <>
              <Campo campo="crp" label="CRP">
                <View style={[estilos.inputRow, estiloInput('crp')]}>
                  <Ionicons name="card-outline" size={18} color="#9e9e9e" style={estilos.inputIcone} />
                  <MaskedTextInput
                    mask="CRP 99/99999"
                    style={[estilos.inputFlex, { color: cores.textoPrincipal }]}
                    placeholder="CRP 06/12345" placeholderTextColor="#9e9e9e"
                    value={crp} onChangeText={(v) => { setCrp(v); setErros((e) => ({ ...e, crp: '' })); }}
                    autoCapitalize="characters"
                    onFocus={() => setFocado('crp')} onBlur={() => setFocado('')}
                  />
                </View>
              </Campo>
              <Campo campo="especialidade" label="Especialidade">
                <View style={[estilos.inputRow, estiloInput('especialidade')]}>
                  <Ionicons name="briefcase-outline" size={18} color="#9e9e9e" style={estilos.inputIcone} />
                  <TextInput
                    style={[estilos.inputFlex, { color: cores.textoPrincipal }]}
                    placeholder="Ex: Psicóloga Clínica" placeholderTextColor="#9e9e9e"
                    value={especialidade} onChangeText={(v) => { setEspecialidade(v); setErros((e) => ({ ...e, especialidade: '' })); }}
                    autoCapitalize="words"
                    onFocus={() => setFocado('especialidade')} onBlur={() => setFocado('')}
                  />
                </View>
              </Campo>
            </>
          )}

          {/* Senha */}
          <Campo campo="senha" label="Senha">
            <View style={[estilos.inputRow, estiloInput('senha')]}>
              <Ionicons name="lock-closed-outline" size={18} color="#9e9e9e" style={estilos.inputIcone} />
              <TextInput
                style={[estilos.inputFlex, { color: cores.textoPrincipal }]}
                placeholder="Mínimo 6 caracteres" placeholderTextColor="#9e9e9e"
                value={senha} onChangeText={(v) => { setSenha(v); setErros((e) => ({ ...e, senha: '' })); }}
                secureTextEntry={!senhaVisivel}
                onFocus={() => setFocado('senha')} onBlur={() => setFocado('')}
              />
              <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} style={estilos.olho}>
                <Ionicons name={senhaVisivel ? 'eye' : 'eye-off'} size={20} color="#9e9e9e" />
              </TouchableOpacity>
            </View>
          </Campo>

          {/* Confirmar senha */}
          <Campo campo="confirmar" label="Confirmar senha">
            <View style={[estilos.inputRow, estiloInput('confirmar')]}>
              <Ionicons name="lock-closed-outline" size={18} color="#9e9e9e" style={estilos.inputIcone} />
              <TextInput
                style={[estilos.inputFlex, { color: cores.textoPrincipal }]}
                placeholder="Repita sua senha" placeholderTextColor="#9e9e9e"
                value={confirmar} onChangeText={(v) => { setConfirmar(v); setErros((e) => ({ ...e, confirmar: '' })); }}
                secureTextEntry={!confirmarVisivel}
                onFocus={() => setFocado('confirmar')} onBlur={() => setFocado('')}
              />
              <TouchableOpacity onPress={() => setConfirmarVisivel(!confirmarVisivel)} style={estilos.olho}>
                <Ionicons name={confirmarVisivel ? 'eye' : 'eye-off'} size={20} color="#9e9e9e" />
              </TouchableOpacity>
            </View>
          </Campo>

          {/* Checkbox termos */}
          <TouchableOpacity
            style={estilos.checkboxRow}
            onPress={() => { setTermos(!termos); setErros((e) => ({ ...e, termos: '' })); }}
            activeOpacity={0.8}
          >
            <View style={[estilos.checkbox, { borderColor: termos ? cores.primaria : cores.borda, backgroundColor: termos ? cores.primaria : 'transparent' }]}>
              {termos && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <Text style={[estilos.checkboxTexto, { color: cores.textoSecundario }]}>
              Li e aceito os{' '}
              <Text style={[estilos.checkboxLink, { color: cores.primaria }]}>Termos de Uso</Text>
            </Text>
          </TouchableOpacity>
          {erros.termos && <Text style={[estilos.erro, { color: cores.erro }]}>{erros.termos}</Text>}

          {/* Botão criar conta */}
          <TouchableOpacity
            style={[estilos.botao, { backgroundColor: formularioValido() ? cores.primaria : cores.botaoDesabilitado, marginTop: Espacamento.md }]}
            onPress={cadastrar} disabled={carregando} activeOpacity={0.85}
          >
            <Text style={estilos.botaoTexto}>{carregando ? 'Criando conta...' : 'Criar conta'}</Text>
          </TouchableOpacity>

          {/* Link login */}
          <TouchableOpacity
            style={estilos.linkLogin}
            onPress={() => router.push({ pathname: '/(auth)/login', params: { role: perfil } })}
          >
            <Text style={[estilos.linkTexto, { color: cores.textoSecundario }]}>
              Já tem conta?{' '}
              <Text style={[estilos.linkDestaque, { color: cores.primaria }]}>Entrar</Text>
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
  label: { fontSize: 13, marginBottom: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, paddingHorizontal: 12 },
  inputIcone: { marginRight: 8 },
  inputFlex: { flex: 1, paddingVertical: 14, fontSize: 15 },
  olho: { padding: 4 },
  erro: { fontSize: 12, marginTop: 2, marginBottom: 4 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: Espacamento.sm, marginBottom: 4 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  checkboxTexto: { fontSize: 14, flex: 1 },
  checkboxLink: { fontWeight: '600' },
  botao: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#2e7d32', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, elevation: 4 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
  linkLogin: { alignItems: 'center', paddingVertical: Espacamento.md },
  linkTexto: { fontSize: 14 },
  linkDestaque: { fontWeight: '700' },
});
