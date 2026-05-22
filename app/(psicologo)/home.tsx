import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { Espacamento, Sombra } from '../../constants/theme';

const psicologo = { nome: 'Carla Mendes', crp: 'CRP 06/12345' };

const pacientesHoje = [
  { id: '1', nome: 'Ana Lima', hora: '09:00', sessao: 8, concluido: false },
  { id: '2', nome: 'Bruno Souza', hora: '10:30', sessao: 3, concluido: false },
  { id: '3', nome: 'Camila Rocha', hora: '14:00', sessao: 1, concluido: true },
  { id: '4', nome: 'Diego Ferreira', hora: '15:30', sessao: 12, concluido: false },
];

export default function HomePsicologo() {
  const router = useRouter();
  const { cores } = useTheme();
  const [online, setOnline] = useState(true);

  const iniciais = (nome: string) =>
    nome.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={[estilos.headerSaudacao, { backgroundColor: cores.fundo }]}>
          <View style={{ flex: 1 }}>
            <Text style={[estilos.saudacao, { color: cores.textoPrincipal }]}>
              Olá, Dr(a). {psicologo.nome.split(' ')[0]}
            </Text>
            <Text style={[estilos.crp, { color: cores.textoSecundario }]}>{psicologo.crp}</Text>
          </View>
          <View style={estilos.headerDireita}>
            <View style={estilos.toggleContainer}>
              <Text style={[estilos.toggleLabel, { color: cores.textoSecundario }]}>
                {online ? 'Online' : 'Offline'}
              </Text>
              <Switch
                value={online}
                onValueChange={setOnline}
                trackColor={{ false: '#9e9e9e', true: cores.primaria }}
                thumbColor="#fff"
              />
            </View>
            <View style={[estilos.avatar, { backgroundColor: cores.verdeClaro }]}>
              <Text style={[estilos.avatarTexto, { color: cores.primaria }]}>CM</Text>
            </View>
          </View>
        </View>

        {/* Card resumo */}
        <View style={[estilos.card, { backgroundColor: cores.card }, Sombra.card]}>
          <View style={estilos.resumoRow}>
            <Ionicons name="calendar" size={24} color={cores.primaria} />
            <View style={{ flex: 1 }}>
              <Text style={[estilos.resumoTitulo, { color: cores.textoPrincipal }]}>Hoje</Text>
              <Text style={[estilos.resumoNum, { color: cores.primaria }]}>
                {pacientesHoje.length} sessões agendadas
              </Text>
            </View>
          </View>
          {/* Mini resumo */}
          <View style={[estilos.resumoStats, { borderTopColor: cores.separador }]}>
            {[
              { label: 'Total', valor: pacientesHoje.length },
              { label: 'Concluídas', valor: pacientesHoje.filter((p) => p.concluido).length },
              { label: 'Pendentes', valor: pacientesHoje.filter((p) => !p.concluido).length },
            ].map((s) => (
              <View key={s.label} style={estilos.statItem}>
                <Text style={[estilos.statNum, { color: cores.primaria }]}>{s.valor}</Text>
                <Text style={[estilos.statLabel, { color: cores.textoSecundario }]}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Lista pacientes */}
        <Text style={[estilos.secaoTitulo, { color: cores.textoPrincipal }]}>Pacientes de hoje</Text>
        {pacientesHoje.map((p) => (
          <View key={p.id} style={[estilos.cardPaciente, { backgroundColor: cores.card }, Sombra.card]}>
            <View style={[estilos.avatarPac, { backgroundColor: cores.verdeClaro }]}>
              <Text style={[estilos.avatarPacTexto, { color: cores.primaria }]}>{iniciais(p.nome)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[estilos.pacNome, { color: cores.textoPrincipal }]}>{p.nome}</Text>
              <View style={estilos.horaRow}>
                <Ionicons name="time-outline" size={13} color={cores.textoSecundario} />
                <Text style={[estilos.pacHora, { color: cores.textoSecundario }]}>
                  {p.hora} · Sessão #{p.sessao}
                </Text>
              </View>
            </View>
            {/* Badge avaliar */}
            {p.concluido && (
              <TouchableOpacity
                style={[estilos.badgeAvaliar, { backgroundColor: '#fff8e1' }]}
                onPress={() => router.push(`/(psicologo)/avaliar/${p.id}` as any)}
              >
                <Text style={[estilos.badgeAvaliarTexto, { color: '#f9a825' }]}>Avaliar</Text>
              </TouchableOpacity>
            )}
            {/* Botões ação */}
            {!p.concluido && (
              <View style={estilos.acoes}>
                <TouchableOpacity
                  style={[estilos.botaoOutline, { borderColor: cores.primaria }]}
                  onPress={() => router.push(`/chat/${p.id}` as any)}
                >
                  <Text style={[estilos.botaoOutlineTexto, { color: cores.primaria }]}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[estilos.botaoSolido, { backgroundColor: cores.primaria }]}
                  onPress={() => router.push(`/chamada/${p.id}?modo=voz` as any)}
                >
                  <Text style={estilos.botaoSolidoTexto}>Chamada</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        <View style={{ height: Espacamento.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  headerSaudacao: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingBottom: 12 },
  saudacao: { fontFamily: 'serif', fontSize: 24, fontWeight: '700' },
  crp: { fontSize: 13, marginTop: 2 },
  headerDireita: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleContainer: { alignItems: 'center', gap: 2 },
  toggleLabel: { fontSize: 11, fontWeight: '600' },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarTexto: { fontWeight: '700', fontSize: 16 },
  card: { marginHorizontal: 16, borderRadius: 16, padding: 16, marginBottom: 16 },
  resumoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  resumoTitulo: { fontFamily: 'serif', fontSize: 18, fontWeight: '700' },
  resumoNum: { fontSize: 15, fontWeight: '700', marginTop: 2 },
  resumoStats: { flexDirection: 'row', borderTopWidth: 1, paddingTop: 12 },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '700' },
  statLabel: { fontSize: 12, marginTop: 2 },
  secaoTitulo: { fontFamily: 'serif', fontSize: 18, fontWeight: '700', marginHorizontal: 16, marginBottom: 10 },
  cardPaciente: { marginHorizontal: 16, borderRadius: 16, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarPac: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  avatarPacTexto: { fontWeight: '700', fontSize: 14 },
  pacNome: { fontSize: 15, fontWeight: '700' },
  horaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  pacHora: { fontSize: 13 },
  badgeAvaliar: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  badgeAvaliarTexto: { fontSize: 12, fontWeight: '700' },
  acoes: { flexDirection: 'row', gap: 6 },
  botaoOutline: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1.5 },
  botaoOutlineTexto: { fontSize: 12, fontWeight: '600' },
  botaoSolido: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  botaoSolidoTexto: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
