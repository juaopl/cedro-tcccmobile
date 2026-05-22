import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaskedTextInput } from 'react-native-mask-text';
import { useRouter } from 'expo-router';
import Header from '../../../components/Header';
import { useTheme } from '../../../hooks/useTheme';
import { Espacamento, Sombra } from '../../../constants/theme';

export default function EditarPerfil() {
  const router = useRouter();
  const { cores } = useTheme();

  const [nome, setNome] = useState('Ana Lima');
  const [telefone, setTelefone] = useState('(11) 99999-9999');
  const [focado, setFocado] = useState('');
  const [salvando, setSalvando] = useState(false);

  const iniciais = nome.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

  const salvar = async () => {
    setSalvando(true);
    await AsyncStorage.setItem('user_profile', JSON.stringify({ nome, telefone }));
    setTimeout(() => { setSalvando(false); router.back(); }, 800);
  };

  const estiloInput = (campo: string) => ({
    borderColor: focado === campo ? cores.bordaFoco : cores.borda,
    borderWidth: focado === campo ? 2 : 1.5,
    backgroundColor: focado === campo ? cores.inputFundoFocado : cores.inputFundo,
  });

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <Header titulo="Meu Perfil" mostrarVoltar />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Avatar */}
          <View style={estilos.avatarSection}>
            <View style={estilos.avatarWrapper}>
              <View style={[estilos.avatar, { backgroundColor: cores.verdeClaro }]}>
                <Text style={[estilos.avatarTexto, { color: cores.primaria }]}>{iniciais}</Text>
              </View>
              <View style={[estilos.cameraBtn, { backgroundColor: cores.primaria }]}>
                <Ionicons name="camera" size={18} color="#fff" />
              </View>
            </View>
          </View>

          {/* Campos */}
          <View style={[estilos.card, { backgroundColor: cores.card }, Sombra.card]}>

            <Text style={[estilos.label, { color: cores.textoSecundario }]}>Nome completo</Text>
            <TextInput
              style={[estilos.input, estiloInput('nome'), { color: cores.textoPrincipal }]}
              value={nome} onChangeText={setNome}
              autoCapitalize="words"
              onFocus={() => setFocado('nome')} onBlur={() => setFocado('')}
            />

            <Text style={[estilos.label, { color: cores.textoSecundario }]}>Telefone</Text>
            <MaskedTextInput
              mask="(99) 99999-9999"
              style={[estilos.input, estiloInput('telefone'), { color: cores.textoPrincipal }]}
              value={telefone} onChangeText={setTelefone}
              keyboardType="phone-pad"
              onFocus={() => setFocado('telefone')} onBlur={() => setFocado('')}
            />

            <Text style={[estilos.label, { color: cores.textoSecundario }]}>E-mail</Text>
            <TextInput
              style={[estilos.input, { backgroundColor: '#f5f5f5', borderColor: cores.borda, borderWidth: 1.5, color: '#9e9e9e' }]}
              value="ana@email.com" editable={false}
            />
          </View>

          <TouchableOpacity
            style={[estilos.botao, { backgroundColor: cores.primaria }]}
            onPress={salvar} disabled={salvando} activeOpacity={0.85}
          >
            <Text style={estilos.botaoTexto}>{salvando ? 'Salvando...' : 'Salvar alterações'}</Text>
          </TouchableOpacity>

          <View style={{ height: Espacamento.xxl }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  conteudo: { padding: Espacamento.md },
  avatarSection: { alignItems: 'center', paddingVertical: Espacamento.xl },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  avatarTexto: { fontFamily: 'serif', fontSize: 32, fontWeight: '700' },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  card: { borderRadius: 16, padding: 16, marginBottom: 16 },
  label: { fontSize: 13, marginBottom: 6 },
  input: { borderRadius: 10, padding: 14, paddingHorizontal: 16, marginBottom: 16, fontSize: 15 },
  botao: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#2e7d32', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, elevation: 4 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
