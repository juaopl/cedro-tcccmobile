import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { Espacamento, BorderRadius, Sombra } from '../../constants/theme';

// Dados mockados
const paciente = { nome: 'Ana Lima', chamadasUsadas: 3, chamadasTotal: 5 };
const agendamento = { psicologo: 'Dra. Carla Mendes', especialidade: 'Psicóloga Clínica', data: 'Hoje, 15h30' };
const psicologo = { nome: 'Dra. Carla Mendes', especialidade: 'Psicóloga Clínica', crp: 'CRP 06/12345', sessoes: 8 };

export default function HomePaciente() {
  const router = useRouter();
  const { cores } = useTheme();

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header saudação */}
        <View style={[estilos.headerSaudacao, { backgroundColor: cores.fundo }]}>
          <View style={{ flex: 1 }}>
            <Text style={[estilos.saudacao, { color: cores.textoPrincipal }]}>
              Olá, {paciente.nome.split(' ')[0]} 👋
            </Text>
            <Text style={[estilos.subSaudacao, { color: cores.textoSecundario }]}>
              Como você está hoje?
            </Text>
          </View>
          {/* Avatar */}
          <View style={[estilos.avatar, { backgroundColor: cores.verdeClaro }]}>
            <Text style={[estilos.avatarTexto, { color: cores.primaria }]}>AL</Text>
          </View>
        </View>

        {/* Card próxima sessão */}
        <View style={[estilos.cardSessao, { backgroundColor: cores.primaria }]}>
          <View style={estilos.sessaoTopo}>
            <Text style={estilos.sessaoLabel}>PRÓXIMA SESSÃO</Text>
            <View style={estilos.pontOnline} />
          </View>
          <View style={estilos.sessaoInfo}>
            <View style={estilos.avatarDM}>
              <Text style={estilos.avatarDMTexto}>DM</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={estilos.sessaoNome}>{agendamento.psicologo}</Text>
              <Text style={estilos.sessaoEspecialidade}>{agendamento.especialidade}</Text>
              <View style={estilos.sessaoDataRow}>
                <Ionicons name="calendar" size={12} color="#a5d6a7" />
                <Text style={estilos.sessaoData}>{agendamento.data}</Text>
              </View>
            </View>
          </View>
          {/* Botões rápidos */}
          <View style={estilos.botoesRapidos}>
            {[
              { icone: 'chatbubble' as const, label: 'Chat', rota: '/chat/1' },
              { icone: 'call' as const, label: 'Voz', rota: '/chamada/1?modo=voz' },
              { icone: 'videocam' as const, label: 'Vídeo', rota: '/chamada/1?modo=video' },
            ].map((b) => (
              <TouchableOpacity
                key={b.label}
                style={estilos.botaoRapido}
                onPress={() => router.push(b.rota as any)}
                activeOpacity={0.8}
              >
                <Ionicons name={b.icone} size={20} color="#fff" />
                <Text style={estilos.botaoRapidoTexto}>{b.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Seção psicólogo */}
        <Text style={[estilos.secaoTitulo, { color: cores.textoPrincipal }]}>Seu psicólogo</Text>
        <View style={[estilos.card, { backgroundColor: cores.card }, Sombra.card]}>
          <View style={estilos.psicRow}>
            <View style={[estilos.avatarDM, { backgroundColor: '#f9a825' }]}>
              <Text style={estilos.avatarDMTexto}>DM</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[estilos.psicNome, { color: cores.textoPrincipal }]}>{psicologo.nome}</Text>
              <Text style={[estilos.psicInfo, { color: cores.textoSecundario }]}>
                {psicologo.especialidade} · {psicologo.crp}
              </Text>
              <View style={[estilos.badgeOnline, { backgroundColor: cores.verdeClaro }]}>
                <Text style={[estilos.badgeOnlineTexto, { color: cores.primaria }]}>● Online</Text>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={[estilos.sessoesNum, { color: cores.primaria }]}>{psicologo.sessoes}</Text>
              <Text style={[estilos.sessoesLabel, { color: cores.textoSecundario }]}>sessões</Text>
            </View>
          </View>
        </View>

        {/* Banner plano */}
        <TouchableOpacity
          style={[estilos.banner, { backgroundColor: cores.verdeClaro }]}
          onPress={() => router.push('/(tabs)/plano' as any)}
          activeOpacity={0.85}
        >
          <Ionicons name="flash" size={24} color="#f9a825" />
          <View style={{ flex: 1 }}>
            <Text style={[estilos.bannerTitulo, { color: cores.primaria }]}>
              Você tem {paciente.chamadasTotal - paciente.chamadasUsadas} chamadas restantes
            </Text>
            <Text style={[estilos.bannerSub, { color: cores.textoSecundario }]}>
              Assine e tenha chamadas ilimitadas →
            </Text>
          </View>
        </TouchableOpacity>

        {/* Acesso rápido */}
        <Text style={[estilos.secaoTitulo, { color: cores.textoPrincipal }]}>Acesso rápido</Text>
        <View style={estilos.atalhos}>
          {[
            { icone: 'diamond-outline' as const, label: 'Meu Plano', rota: '/(tabs)/plano' },
            { icone: 'clipboard-outline' as const, label: 'Histórico', rota: '/(tabs)/agenda' },
            { icone: 'settings-outline' as const, label: 'Ajustes', rota: '/(tabs)/ajustes' },
          ].map((a) => (
            <TouchableOpacity
              key={a.label}
              style={[estilos.atalho, { backgroundColor: cores.card }, Sombra.card]}
              onPress={() => router.push(a.rota as any)}
              activeOpacity={0.85}
            >
              <Ionicons name={a.icone} size={26} color={cores.primaria} />
              <Text style={[estilos.atalhoLabel, { color: cores.textoSecundario }]}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: Espacamento.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  headerSaudacao: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingBottom: 12 },
  saudacao: { fontFamily: 'serif', fontSize: 24, fontWeight: '700' },
  subSaudacao: { fontSize: 14, marginTop: 2 },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarTexto: { fontWeight: '700', fontSize: 16 },
  cardSessao: { marginHorizontal: 16, borderRadius: 20, padding: 20, marginBottom: 20 },
  sessaoTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sessaoLabel: { fontSize: 11, color: '#a5d6a7', fontWeight: '700', letterSpacing: 1.5 },
  pontOnline: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#a5d6a7' },
  sessaoInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  avatarDM: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f9a825', alignItems: 'center', justifyContent: 'center' },
  avatarDMTexto: { color: '#fff', fontWeight: '700', fontSize: 14 },
  sessaoNome: { color: '#fff', fontWeight: '700', fontSize: 17 },
  sessaoEspecialidade: { color: '#a5d6a7', fontSize: 13, marginTop: 2 },
  sessaoDataRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  sessaoData: { color: '#a5d6a7', fontSize: 13 },
  botoesRapidos: { flexDirection: 'row', gap: 8 },
  botaoRapido: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, paddingVertical: 10, alignItems: 'center', gap: 4 },
  botaoRapidoTexto: { color: '#fff', fontSize: 12, fontWeight: '600' },
  secaoTitulo: { fontFamily: 'serif', fontSize: 18, fontWeight: '700', marginHorizontal: 16, marginBottom: 10, marginTop: 4 },
  card: { marginHorizontal: 16, borderRadius: 16, padding: 16, marginBottom: 16 },
  psicRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  psicNome: { fontSize: 16, fontWeight: '700' },
  psicInfo: { fontSize: 13, marginTop: 2 },
  badgeOnline: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, marginTop: 6 },
  badgeOnlineTexto: { fontSize: 11, fontWeight: '700' },
  sessoesNum: { fontSize: 22, fontWeight: '700' },
  sessoesLabel: { fontSize: 12 },
  banner: { marginHorizontal: 16, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  bannerTitulo: { fontSize: 14, fontWeight: '700' },
  bannerSub: { fontSize: 13, marginTop: 2 },
  atalhos: { flexDirection: 'row', marginHorizontal: 16, gap: 10 },
  atalho: { flex: 1, borderRadius: 16, padding: 16, alignItems: 'center', gap: 8 },
  atalhoLabel: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
});
