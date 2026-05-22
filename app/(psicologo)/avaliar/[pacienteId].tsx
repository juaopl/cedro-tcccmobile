import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../../components/Header';
import { useTheme } from '../../../hooks/useTheme';
import { Espacamento, Sombra } from '../../../constants/theme';

const humores = ['Ansioso', 'Calmo', 'Resistente', 'Aberto', 'Triste', 'Motivado', 'Confuso', 'Reflexivo'];

function Estrelas({ valor, onChange }: { valor: number; onChange: (v: number) => void }) {
  const { cores } = useTheme();
  return (
    <View style={estilos.estrelas}>
      {[1, 2, 3, 4, 5].map((i) => (
        <TouchableOpacity key={i} onPress={() => onChange(i)}>
          <Ionicons name="star" size={36} color={i <= valor ? '#f9a825' : '#e0e0e0'} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function AvaliarPaciente() {
  const router = useRouter();
  const { cores } = useTheme();
  const { pacienteId } = useLocalSearchParams<{ pacienteId: string }>();

  const [engajamento, setEngajamento] = useState(0);
  const [evolucao, setEvolucao] = useState(0);
  const [humoresSel, setHumoresSel] = useState<string[]>([]);
  const [notas, setNotas] = useState('');
  const [proximosPassos, setProximosPassos] = useState('');
  const [continuidade, setContinuidade] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const toggleHumor = (h: string) =>
    setHumoresSel((prev) => prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]);

  const salvar = async () => {
    setSalvando(true);
    const chave = `avaliacoes:${pacienteId}:${Date.now()}`;
    await AsyncStorage.setItem(chave, JSON.stringify({
      engajamento, evolucao, humores: humoresSel, notas, proximosPassos, continuidade,
    }));
    setTimeout(() => { setSalvando(false); router.back(); }, 800);
  };

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <Header titulo="Avaliar sessão" mostrarVoltar />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Info paciente */}
          <View style={[estilos.card, { backgroundColor: cores.card }, Sombra.card]}>
            <View style={[estilos.avatarPac, { backgroundColor: cores.verdeClaro }]}>
              <Text style={[estilos.avatarTexto, { color: cores.primaria }]}>AL</Text>
            </View>
            <View>
              <Text style={[estilos.pacNome, { color: cores.textoPrincipal }]}>Ana Lima</Text>
              <Text style={[estilos.pacData, { color: cores.textoSecundario }]}>Sessão de hoje · 09:00</Text>
            </View>
          </View>

          {/* Engajamento */}
          <View style={[estilos.secao, { backgroundColor: cores.card }, Sombra.card]}>
            <Text style={[estilos.secaoLabel, { color: cores.textoPrincipal }]}>Engajamento do paciente</Text>
            <Estrelas valor={engajamento} onChange={setEngajamento} />
          </View>

          {/* Evolução */}
          <View style={[estilos.secao, { backgroundColor: cores.card }, Sombra.card]}>
            <Text style={[estilos.secaoLabel, { color: cores.textoPrincipal }]}>Evolução percebida</Text>
            <Estrelas valor={evolucao} onChange={setEvolucao} />
          </View>

          {/* Humor */}
          <View style={[estilos.secao, { backgroundColor: cores.card }, Sombra.card]}>
            <Text style={[estilos.secaoLabel, { color: cores.textoPrincipal }]}>Como o paciente chegou?</Text>
            <View style={estilos.chips}>
              {humores.map((h) => {
                const ativo = humoresSel.includes(h);
                return (
                  <TouchableOpacity
                    key={h}
                    style={[
                      estilos.chip,
                      {
                        borderColor: ativo ? cores.primaria : cores.borda,
                        backgroundColor: ativo ? cores.verdeClaro : cores.card,
                      },
                    ]}
                    onPress={() => toggleHumor(h)}
                  >
                    <Text style={[estilos.chipTexto, { color: ativo ? cores.primaria : cores.textoSecundario, fontWeight: ativo ? '700' : '400' }]}>
                      {h}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Notas privadas */}
          <View style={[estilos.secao, { backgroundColor: cores.card }, Sombra.card]}>
            <Text style={[estilos.secaoLabel, { color: cores.textoPrincipal }]}>🔒 Notas privadas</Text>
            <TextInput
              style={[estilos.textarea, { backgroundColor: cores.amareloFundo, borderColor: cores.amarelo, color: cores.textoPrincipal }]}
              placeholder="Observações clínicas privadas — visível apenas para você"
              placeholderTextColor="#9e9e9e"
              value={notas}
              onChangeText={setNotas}
              multiline
              textAlignVertical="top"
            />
            <Text style={[estilos.avisoNotas, { color: cores.amarelo }]}>
              Estas notas são confidenciais e não são compartilhadas com o paciente.
            </Text>
          </View>

          {/* Próximos passos */}
          <View style={[estilos.secao, { backgroundColor: cores.card }, Sombra.card]}>
            <Text style={[estilos.secaoLabel, { color: cores.textoPrincipal }]}>Próximos passos</Text>
            <TextInput
              style={[estilos.textarea, { backgroundColor: cores.inputFundo, borderColor: cores.borda, color: cores.textoPrincipal }]}
              placeholder="O que trabalhar na próxima sessão?"
              placeholderTextColor="#9e9e9e"
              value={proximosPassos}
              onChangeText={setProximosPassos}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Toggle continuidade */}
          <View style={[estilos.secao, { backgroundColor: cores.card }, Sombra.card]}>
            <View style={estilos.toggleRow}>
              <Text style={[estilos.toggleLabel, { color: cores.textoPrincipal, flex: 1 }]}>
                Recomendar continuidade do acompanhamento
              </Text>
              <TouchableOpacity
                style={[estilos.switch, { backgroundColor: continuidade ? cores.primaria : cores.borda }]}
                onPress={() => setContinuidade(!continuidade)}
              >
                <View style={[estilos.switchThumb, { alignSelf: continuidade ? 'flex-end' : 'flex-start' }]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botão salvar */}
          <TouchableOpacity
            style={[estilos.botao, { backgroundColor: cores.primaria }]}
            onPress={salvar}
            disabled={salvando}
            activeOpacity={0.85}
          >
            <Text style={estilos.botaoTexto}>{salvando ? 'Salvando...' : 'Salvar avaliação'}</Text>
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
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 16, padding: 16, marginBottom: 12 },
  avatarPac: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarTexto: { fontWeight: '700', fontSize: 16 },
  pacNome: { fontSize: 16, fontWeight: '700' },
  pacData: { fontSize: 13, marginTop: 2 },
  secao: { borderRadius: 16, padding: 16, marginBottom: 12 },
  secaoLabel: { fontSize: 14, fontWeight: '700', marginBottom: 12 },
  estrelas: { flexDirection: 'row', gap: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5 },
  chipTexto: { fontSize: 13 },
  textarea: { borderRadius: 10, borderWidth: 1.5, padding: 14, minHeight: 100, fontSize: 14, lineHeight: 22 },
  avisoNotas: { fontSize: 12, marginTop: 8 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleLabel: { fontSize: 14 },
  switch: { width: 48, height: 28, borderRadius: 14, padding: 3, justifyContent: 'center' },
  switchThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff' },
  botao: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#2e7d32', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, elevation: 4 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
