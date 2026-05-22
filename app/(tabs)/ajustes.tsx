import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { Espacamento, Sombra } from '../../constants/theme';

export default function Ajustes() {
  const router = useRouter();
  const { cores, escuro, alternarTema } = useTheme();

  const ItemRow = ({
    icone, label, onPress, direita,
  }: {
    icone: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress?: () => void;
    direita?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={[estilos.item, { borderBottomColor: cores.separador }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Ionicons name={icone} size={22} color={cores.primaria} />
      <Text style={[estilos.itemLabel, { color: cores.textoPrincipal }]}>{label}</Text>
      <View style={estilos.itemDireita}>
        {direita ?? <Ionicons name="chevron-forward" size={18} color="#9e9e9e" />}
      </View>
    </TouchableOpacity>
  );

  const Secao = ({ titulo, children }: { titulo: string; children: React.ReactNode }) => (
    <View style={estilos.secao}>
      <Text style={[estilos.secaoTitulo, { color: '#9e9e9e' }]}>{titulo}</Text>
      <View style={[estilos.secaoCard, { backgroundColor: cores.card }, Sombra.card]}>
        {children}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <Header titulo="Ajustes" mostrarLogo />
      <ScrollView contentContainerStyle={estilos.conteudo} showsVerticalScrollIndicator={false}>

        <Secao titulo="APARÊNCIA">
          <ItemRow
            icone="moon"
            label="Modo escuro"
            direita={
              <Switch
                value={escuro}
                onValueChange={alternarTema}
                trackColor={{ false: cores.borda, true: cores.primaria }}
                thumbColor="#fff"
              />
            }
          />
        </Secao>

        <Secao titulo="CONTA">
          <ItemRow icone="person" label="Editar perfil" onPress={() => router.push('/(tabs)/perfil/editar' as any)} />
          <ItemRow icone="lock-closed" label="Alterar senha" onPress={() => {}} />
          <ItemRow icone="notifications" label="Notificações" onPress={() => {}} />
        </Secao>

        <Secao titulo="SUPORTE">
          <ItemRow icone="shield-checkmark" label="Privacidade e segurança" onPress={() => {}} />
          <ItemRow icone="document-text" label="Termos de uso" onPress={() => {}} />
          <ItemRow icone="information-circle" label="Sobre o Cedro" onPress={() => {}} />
        </Secao>

        {/* Botão sair */}
        <TouchableOpacity
          style={[estilos.botaoSair, { backgroundColor: '#fff5f5', borderColor: '#ffcdd2' }]}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out" size={20} color={cores.erro} />
          <Text style={[estilos.botaoSairTexto, { color: cores.erro }]}>Sair</Text>
        </TouchableOpacity>

        <View style={{ height: Espacamento.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  conteudo: { padding: Espacamento.md },
  secao: { marginBottom: Espacamento.lg },
  secaoTitulo: { fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' },
  secaoCard: { borderRadius: 16, overflow: 'hidden' },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderBottomWidth: 1 },
  itemLabel: { flex: 1, fontSize: 15 },
  itemDireita: { alignItems: 'center', justifyContent: 'center' },
  botaoSair: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, marginTop: 32, borderRadius: 12, padding: 16, borderWidth: 1,
  },
  botaoSairTexto: { fontSize: 16, fontWeight: '700' },
});
