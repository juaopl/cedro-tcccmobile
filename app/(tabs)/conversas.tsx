import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, SafeAreaView, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { Espacamento } from '../../constants/theme';

const conversasMock = [
  { id: '1', nome: 'Dra. Carla Mendes', preview: 'Até amanhã! Cuide-se 🌿', hora: '15:42', naoLidas: 0 },
  { id: '2', nome: 'Dr. Rafael Costa', preview: 'Vamos remarcar para sexta?', hora: '10:20', naoLidas: 2 },
  { id: '3', nome: 'Dra. Beatriz Lima', preview: 'Ótima sessão hoje!', hora: 'Ontem', naoLidas: 0 },
];

export default function Conversas() {
  const router = useRouter();
  const { cores } = useTheme();
  const [busca, setBusca] = useState('');

  const filtradas = conversasMock.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const iniciais = (nome: string) =>
    nome.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <Header titulo="Conversas" mostrarLogo />

      {/* Busca */}
      <View style={[estilos.buscaContainer, { backgroundColor: cores.fundo }]}>
        <View style={[estilos.buscaInput, { backgroundColor: '#f0f0f0' }]}>
          <Ionicons name="search" size={18} color="#9e9e9e" />
          <TextInput
            style={[estilos.buscaTexto, { color: cores.textoPrincipal }]}
            placeholder="Buscar conversa..."
            placeholderTextColor="#9e9e9e"
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

      {filtradas.length === 0 ? (
        // Estado vazio
        <View style={estilos.vazio}>
          <Ionicons name="chatbubbles-outline" size={80} color={cores.borda} />
          <Text style={[estilos.vazioTitulo, { color: cores.textoSecundario }]}>
            Nenhuma conversa ainda
          </Text>
          <Text style={[estilos.vazioSub, { color: '#9e9e9e' }]}>
            Suas conversas com psicólogos aparecerão aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtradas}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[estilos.item, { borderBottomColor: '#f0f0f0' }]}
              onPress={() => router.push(`/chat/${item.id}` as any)}
              activeOpacity={0.7}
            >
              {/* Avatar */}
              <View style={[estilos.avatar, { backgroundColor: cores.verdeClaro }]}>
                <Text style={[estilos.avatarTexto, { color: cores.primaria }]}>
                  {iniciais(item.nome)}
                </Text>
              </View>
              {/* Info */}
              <View style={{ flex: 1 }}>
                <Text style={[estilos.nome, { color: cores.textoPrincipal }]}>{item.nome}</Text>
                <Text style={[estilos.preview, { color: cores.textoSecundario }]} numberOfLines={1}>
                  {item.preview}
                </Text>
              </View>
              {/* Direita */}
              <View style={estilos.direita}>
                <Text style={[estilos.hora, { color: '#9e9e9e' }]}>{item.hora}</Text>
                {item.naoLidas > 0 && (
                  <View style={[estilos.badge, { backgroundColor: cores.primaria }]}>
                    <Text style={estilos.badgeTexto}>{item.naoLidas}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  buscaContainer: { padding: Espacamento.md, paddingTop: Espacamento.sm },
  buscaInput: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  buscaTexto: { flex: 1, fontSize: 15 },
  item: { flexDirection: 'row', alignItems: 'center', padding: Espacamento.md, borderBottomWidth: 1, gap: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  avatarTexto: { fontWeight: '700', fontSize: 16 },
  nome: { fontSize: 16, fontWeight: '700', marginBottom: 3 },
  preview: { fontSize: 14 },
  direita: { alignItems: 'flex-end', gap: 6 },
  hora: { fontSize: 12 },
  badge: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  badgeTexto: { color: '#fff', fontSize: 11, fontWeight: '700' },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: Espacamento.xl },
  vazioTitulo: { fontFamily: 'serif', fontSize: 20 },
  vazioSub: { fontSize: 14, textAlign: 'center' },
});
