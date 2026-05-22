import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { Espacamento, Sombra } from '../../constants/theme';

type Status = 'confirmado' | 'pendente' | 'concluido';

const agendamentos = {
  proximos: [
    { id: '1', nome: 'Dra. Carla Mendes', data: 'Hoje', hora: '15h30', status: 'confirmado' as Status },
    { id: '2', nome: 'Dra. Carla Mendes', data: 'Sex, 23 Mai', hora: '10h00', status: 'pendente' as Status },
  ],
  passados: [
    { id: '3', nome: 'Dra. Carla Mendes', data: 'Seg, 19 Mai', hora: '15h30', status: 'concluido' as Status },
    { id: '4', nome: 'Dra. Carla Mendes', data: 'Seg, 12 Mai', hora: '15h30', status: 'concluido' as Status },
  ],
};

const configStatus: Record<Status, { label: string; fundo: string; texto: string }> = {
  confirmado: { label: 'Confirmado', fundo: '#e8f5e9', texto: '#2e7d32' },
  pendente: { label: 'Pendente', fundo: '#fff8e1', texto: '#f57f17' },
  concluido: { label: 'Concluído', fundo: '#f5f5f5', texto: '#9e9e9e' },
};

export default function Agenda() {
  const { cores } = useTheme();
  const [aba, setAba] = useState<'proximos' | 'passados'>('proximos');
  const dados = agendamentos[aba];

  const iniciais = (nome: string) =>
    nome.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <Header titulo="Agenda" mostrarLogo />

      {/* Tabs internas */}
      <View style={[estilos.tabs, { backgroundColor: cores.fundo, borderBottomColor: cores.borda }]}>
        {(['proximos', 'passados'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[estilos.tab, aba === t && { borderBottomColor: cores.primaria, borderBottomWidth: 2 }]}
            onPress={() => setAba(t)}
          >
            <Text style={[estilos.tabTexto, { color: aba === t ? cores.primaria : '#9e9e9e' }]}>
              {t === 'proximos' ? 'Próximos' : 'Passados'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {dados.length === 0 ? (
        <View style={estilos.vazio}>
          <Ionicons name="calendar-outline" size={80} color={cores.borda} />
          <Text style={[estilos.vazioTexto, { color: cores.textoSecundario }]}>
            Nenhum horário agendado
          </Text>
        </View>
      ) : (
        <FlatList
          data={dados}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ padding: Espacamento.md }}
          renderItem={({ item }) => {
            const cfg = configStatus[item.status];
            return (
              <View style={[estilos.card, { backgroundColor: cores.card }, Sombra.card]}>
                <View style={estilos.cardTopo}>
                  <View style={[estilos.avatar, { backgroundColor: cores.verdeClaro }]}>
                    <Text style={[estilos.avatarTexto, { color: cores.primaria }]}>
                      {iniciais(item.nome)}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[estilos.nome, { color: cores.textoPrincipal }]}>{item.nome}</Text>
                    <View style={estilos.horaRow}>
                      <Ionicons name="time-outline" size={13} color={cores.textoSecundario} />
                      <Text style={[estilos.hora, { color: cores.textoSecundario }]}>
                        {item.data} · {item.hora}
                      </Text>
                    </View>
                  </View>
                  <View style={[estilos.badge, { backgroundColor: cfg.fundo }]}>
                    <Text style={[estilos.badgeTexto, { color: cfg.texto }]}>{cfg.label}</Text>
                  </View>
                </View>
                {item.status !== 'concluido' && (
                  <View style={[estilos.acoes, { borderTopColor: cores.separador }]}>
                    <TouchableOpacity style={[estilos.botaoOutline, { borderColor: cores.erro }]}>
                      <Text style={[estilos.botaoOutlineTexto, { color: cores.erro }]}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[estilos.botaoOutline, { borderColor: cores.primaria }]}>
                      <Text style={[estilos.botaoOutlineTexto, { color: cores.primaria }]}>Reagendar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  tabs: { flexDirection: 'row', borderBottomWidth: 1 },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabTexto: { fontSize: 15, fontWeight: '600' },
  card: { borderRadius: 16, padding: 16, marginBottom: 12 },
  cardTopo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarTexto: { fontWeight: '700', fontSize: 14 },
  nome: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  horaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  hora: { fontSize: 13 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeTexto: { fontSize: 12, fontWeight: '600' },
  acoes: { flexDirection: 'row', gap: 10, marginTop: 12, paddingTop: 12, borderTopWidth: 1 },
  botaoOutline: { flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5, alignItems: 'center' },
  botaoOutlineTexto: { fontSize: 13, fontWeight: '600' },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  vazioTexto: { fontFamily: 'serif', fontSize: 18 },
});
