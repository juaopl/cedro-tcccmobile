import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../../components/Header';
import { useTheme } from '../../../hooks/useTheme';
import { Espacamento, Sombra } from '../../../constants/theme';

const usuario = { nome: 'Ana Lima', email: 'ana@email.com', telefone: '(11) 99999-9999' };

export default function Perfil() {
  const router = useRouter();
  const { cores } = useTheme();
  const iniciais = usuario.nome.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <Header titulo="Meu Perfil" mostrarLogo />
      <ScrollView contentContainerStyle={estilos.conteudo} showsVerticalScrollIndicator={false}>

        {/* Avatar */}
        <View style={estilos.avatarSection}>
          <View style={[estilos.avatar, { backgroundColor: cores.verdeClaro }]}>
            <Text style={[estilos.avatarTexto, { color: cores.primaria }]}>{iniciais}</Text>
          </View>
          <Text style={[estilos.nome, { color: cores.textoPrincipal }]}>{usuario.nome}</Text>
          <Text style={[estilos.email, { color: cores.textoSecundario }]}>{usuario.email}</Text>
        </View>

        {/* Card info */}
        <View style={[estilos.card, { backgroundColor: cores.card }, Sombra.card]}>
          {[
            { icone: 'person-outline' as const, label: 'Nome', valor: usuario.nome },
            { icone: 'mail-outline' as const, label: 'E-mail', valor: usuario.email },
            { icone: 'call-outline' as const, label: 'Telefone', valor: usuario.telefone },
          ].map((item, i) => (
            <View key={i} style={[estilos.infoItem, { borderBottomColor: cores.separador }]}>
              <Ionicons name={item.icone} size={18} color={cores.primaria} />
              <View style={{ flex: 1 }}>
                <Text style={[estilos.infoLabel, { color: cores.textoSecundario }]}>{item.label}</Text>
                <Text style={[estilos.infoValor, { color: cores.textoPrincipal }]}>{item.valor}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[estilos.botaoEditar, { backgroundColor: cores.primaria }]}
          onPress={() => router.push('/(tabs)/perfil/editar' as any)}
          activeOpacity={0.85}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={estilos.botaoEditarTexto}>Editar perfil</Text>
        </TouchableOpacity>

        <View style={{ height: Espacamento.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  conteudo: { padding: Espacamento.md },
  avatarSection: { alignItems: 'center', paddingVertical: Espacamento.xl },
  avatar: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarTexto: { fontFamily: 'serif', fontSize: 32, fontWeight: '700' },
  nome: { fontFamily: 'serif', fontSize: 22, fontWeight: '700', marginBottom: 4 },
  email: { fontSize: 14 },
  card: { borderRadius: 16, padding: 4, marginBottom: 16 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderBottomWidth: 1 },
  infoLabel: { fontSize: 12, marginBottom: 2 },
  infoValor: { fontSize: 15, fontWeight: '500' },
  botaoEditar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 12 },
  botaoEditarTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
