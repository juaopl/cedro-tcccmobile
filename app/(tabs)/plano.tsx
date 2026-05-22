import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { Espacamento, Sombra } from '../../constants/theme';

const dadosPlano = { usadas: 3, total: 5, assinante: false };

const beneficios = [
  { icone: 'infinite' as const, cor: '#7c4dff', texto: 'Chamadas ilimitadas de voz e vídeo' },
  { icone: 'flash' as const, cor: '#f9a825', texto: 'Prioridade no suporte e atendimento' },
  { icone: 'clipboard' as const, cor: '#2e7d32', texto: 'Histórico completo de sessões' },
  { icone: 'notifications' as const, cor: '#f9a825', texto: 'Lembretes personalizados de sessão' },
  { icone: 'lock-closed' as const, cor: '#2e7d32', texto: 'Criptografia de ponta a ponta' },
  { icone: 'bar-chart' as const, cor: '#2e7d32', texto: 'Relatórios de progresso mensais' },
];

export default function Plano() {
  const { cores } = useTheme();
  const { usadas, total } = dadosPlano;
  const percentual = usadas / total;

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <Header titulo="Meu Plano" mostrarLogo />
      <ScrollView contentContainerStyle={estilos.conteudo} showsVerticalScrollIndicator={false}>

        {/* Card uso */}
        <View style={[estilos.card, { backgroundColor: cores.card }, Sombra.card]}>
          <View style={estilos.usoTopo}>
            <Ionicons name="bar-chart" size={22} color={cores.primaria} />
            <Text style={[estilos.usoTitulo, { color: cores.textoPrincipal }]}>Uso este mês</Text>
          </View>
          <Text style={[estilos.usoTexto, { color: cores.textoPrincipal }]}>
            Você usou{' '}
            <Text style={{ color: cores.primaria, fontWeight: '700' }}>{usadas}</Text>
            {' '}de{' '}
            <Text style={{ color: cores.primaria, fontWeight: '700' }}>{total}</Text>
            {' '}chamadas este mês
          </Text>
          <View style={[estilos.barraFundo, { backgroundColor: cores.verdeClaro }]}>
            <View style={[estilos.barraPreench, { width: `${percentual * 100}%` as any, backgroundColor: percentual >= 0.8 ? '#f57f17' : cores.primaria }]} />
          </View>
          <Text style={[estilos.restantes, { color: cores.textoSecundario }]}>
            {total - usadas} chamadas restantes
          </Text>
        </View>

        {/* Card Premium */}
        <View style={[estilos.card, { backgroundColor: cores.card, borderColor: cores.primaria, borderWidth: 2 }, Sombra.card]}>
          <View style={[estilos.badgePremium, { backgroundColor: cores.primaria }]}>
            <Text style={estilos.badgePremiumTexto}>⭐ MAIS POPULAR</Text>
          </View>
          <Text style={[estilos.premiumTitulo, { color: cores.textoPrincipal }]}>Plano Premium</Text>
          <View style={estilos.precoRow}>
            <Text style={[estilos.precoMoeda, { color: cores.primaria }]}>R$</Text>
            <Text style={[estilos.precoValor, { color: cores.primaria }]}>49,90</Text>
            <Text style={[estilos.precoPeriodo, { color: cores.textoSecundario }]}>/mês</Text>
          </View>
          <Text style={[estilos.precoAnual, { color: cores.textoSecundario }]}>
            ou R$ 479,90/ano — economize 20%
          </Text>
          <View style={[estilos.divisor, { backgroundColor: '#f0f0f0' }]} />
          {beneficios.map((b, i) => (
            <View key={i} style={[estilos.beneficioItem, { borderBottomColor: '#f9f3f0' }]}>
              <Ionicons name={b.icone} size={20} color={b.cor} />
              <Text style={[estilos.beneficioTexto, { color: cores.textoPrincipal }]}>{b.texto}</Text>
            </View>
          ))}
          <TouchableOpacity style={[estilos.botaoAssinar, { backgroundColor: cores.primaria }]}>
            <Text style={estilos.botaoAssinarTexto}>Assinar agora</Text>
          </TouchableOpacity>
          <Text style={[estilos.cancelamento, { color: '#9e9e9e' }]}>
            Cancele quando quiser · Sem fidelidade
          </Text>
        </View>

        {/* Plano gratuito */}
        <View style={[estilos.card, { backgroundColor: cores.fundo }]}>
          <Text style={[estilos.gratuitoTitulo, { color: cores.textoSecundario }]}>Plano Gratuito (atual)</Text>
          {['5 chamadas por mês', 'Chat ilimitado', 'Suporte padrão'].map((item) => (
            <Text key={item} style={[estilos.gratuitoItem, { color: cores.textoSecundario }]}>• {item}</Text>
          ))}
        </View>

        <View style={{ height: Espacamento.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  conteudo: { padding: Espacamento.md },
  card: { borderRadius: 16, padding: 16, marginBottom: 16 },
  usoTopo: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  usoTitulo: { fontSize: 16, fontWeight: '700' },
  usoTexto: { fontSize: 15, marginBottom: 12 },
  barraFundo: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  barraPreench: { height: '100%', borderRadius: 4 },
  restantes: { fontSize: 13 },
  badgePremium: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginBottom: 12 },
  badgePremiumTexto: { color: '#fff', fontSize: 11, fontWeight: '700' },
  premiumTitulo: { fontFamily: 'serif', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  precoRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, marginBottom: 4 },
  precoMoeda: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  precoValor: { fontSize: 42, fontWeight: '900', lineHeight: 48 },
  precoPeriodo: { fontSize: 16, marginBottom: 6 },
  precoAnual: { fontSize: 13, marginBottom: 12 },
  divisor: { height: 1, marginBottom: 8 },
  beneficioItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1 },
  beneficioTexto: { fontSize: 14, flex: 1 },
  botaoAssinar: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 16, marginBottom: 8 },
  botaoAssinarTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cancelamento: { fontSize: 12, textAlign: 'center' },
  gratuitoTitulo: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  gratuitoItem: { fontSize: 14, lineHeight: 26 },
});
