import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { Colors, Espacamento, BorderRadius, Tipografia, Sombra } from '../../constants/theme';

// Dados mockados do paciente
const paciente = {
  nome: 'Ana Lima',
  chamadasRestantes: 2,
  assinante: false,
};

// Dados mockados do próximo agendamento
const proximoAgendamento = {
  psicologo: 'Dra. Carla Mendes',
  especialidade: 'Psicóloga Clínica',
  data: 'Hoje, 15h30',
  avatar: null,
};

// Dados mockados do psicólogo vinculado
const meuPsicologo = {
  nome: 'Dra. Carla Mendes',
  especialidade: 'Psicóloga Clínica · CRP 06/12345',
  status: 'online' as const,
  avatar: null,
  sessoes: 8,
};

export default function HomePaciente() {
  const router = useRouter();

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com saudação */}
        <View style={estilos.header}>
          <View>
            <Text style={estilos.saudacao}>Olá, {paciente.nome.split(' ')[0]} 👋</Text>
            <Text style={estilos.subSaudacao}>Como você está hoje?</Text>
          </View>
          <Avatar nome={paciente.nome} tamanho="md" />
        </View>

        {/* Card do próximo agendamento */}
        <View style={estilos.cardAgendamento}>
          <View style={estilos.agendamentoTopo}>
            <Text style={estilos.agendamentoLabel}>Próxima sessão</Text>
            <Badge status="online" mostrarTexto={false} />
          </View>
          <View style={estilos.agendamentoInfo}>
            <Avatar nome={proximoAgendamento.psicologo} tamanho="md" />
            <View style={{ flex: 1 }}>
              <Text style={estilos.agendamentoNome}>{proximoAgendamento.psicologo}</Text>
              <Text style={estilos.agendamentoEspecialidade}>
                {proximoAgendamento.especialidade}
              </Text>
              <Text style={estilos.agendamentoData}>📅 {proximoAgendamento.data}</Text>
            </View>
          </View>
          {/* Botões rápidos de acesso à sessão */}
          <View style={estilos.botoesRapidos}>
            <TouchableOpacity
              style={estilos.botaoRapido}
              onPress={() => router.push('/(paciente)/chat')}
            >
              <Text style={estilos.botaoRapidoIcone}>💬</Text>
              <Text style={estilos.botaoRapidoTexto}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={estilos.botaoRapido}
              onPress={() => router.push({ pathname: '/(paciente)/chamada', params: { modo: 'voz' } })}
            >
              <Text style={estilos.botaoRapidoIcone}>📞</Text>
              <Text style={estilos.botaoRapidoTexto}>Voz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={estilos.botaoRapido}
              onPress={() => router.push({ pathname: '/(paciente)/chamada', params: { modo: 'video' } })}
            >
              <Text style={estilos.botaoRapidoIcone}>📹</Text>
              <Text style={estilos.botaoRapidoTexto}>Vídeo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção do psicólogo vinculado */}
        <Text style={estilos.secaoTitulo}>Seu psicólogo</Text>
        <View style={estilos.cardPsicologo}>
          <Avatar nome={meuPsicologo.nome} tamanho="lg" />
          <View style={estilos.psicologoInfo}>
            <Text style={estilos.psicologoNome}>{meuPsicologo.nome}</Text>
            <Text style={estilos.psicologoEspecialidade}>{meuPsicologo.especialidade}</Text>
            <Badge status={meuPsicologo.status} />
          </View>
          <View style={estilos.psicologoSessoes}>
            <Text style={estilos.sessoesNumero}>{meuPsicologo.sessoes}</Text>
            <Text style={estilos.sessoesLabel}>sessões</Text>
          </View>
        </View>

        {/* Banner de plano — exibido apenas para não assinantes */}
        {!paciente.assinante && (
          <TouchableOpacity
            style={estilos.bannerPlano}
            onPress={() => router.push('/(paciente)/plano')}
            activeOpacity={0.85}
          >
            <View style={estilos.bannerConteudo}>
              <Text style={estilos.bannerIcone}>⚡</Text>
              <View style={{ flex: 1 }}>
                <Text style={estilos.bannerTitulo}>
                  Você tem {paciente.chamadasRestantes} chamadas restantes
                </Text>
                <Text style={estilos.bannerSubtitulo}>
                  Assine e tenha chamadas ilimitadas →
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Atalhos de navegação */}
        <Text style={estilos.secaoTitulo}>Acesso rápido</Text>
        <View style={estilos.atalhos}>
          <TouchableOpacity
            style={estilos.atalho}
            onPress={() => router.push('/(paciente)/plano')}
          >
            <Text style={estilos.atalhoIcone}>💎</Text>
            <Text style={estilos.atalhoTexto}>Meu Plano</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.atalho}>
            <Text style={estilos.atalhoIcone}>📋</Text>
            <Text style={estilos.atalhoTexto}>Histórico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.atalho}>
            <Text style={estilos.atalhoIcone}>⚙️</Text>
            <Text style={estilos.atalhoTexto}>Ajustes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundo,
  },
  conteudo: {
    padding: Espacamento.lg,
    paddingBottom: Espacamento.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Espacamento.xl,
  },
  saudacao: {
    ...Tipografia.titulo,
    fontSize: 26,
  },
  subSaudacao: {
    ...Tipografia.corpoSecundario,
    marginTop: 2,
  },
  cardAgendamento: {
    backgroundColor: Colors.primaria,
    borderRadius: BorderRadius.xl,
    padding: Espacamento.lg,
    marginBottom: Espacamento.xl,
    ...Sombra.forte,
  },
  agendamentoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Espacamento.md,
  },
  agendamentoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'sans-serif',
  },
  agendamentoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamento.md,
    marginBottom: Espacamento.md,
  },
  agendamentoNome: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.branco,
    fontFamily: 'sans-serif',
  },
  agendamentoEspecialidade: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    fontFamily: 'sans-serif',
    marginTop: 2,
  },
  agendamentoData: {
    fontSize: 13,
    color: Colors.branco,
    fontFamily: 'sans-serif',
    marginTop: 4,
    fontWeight: '600',
  },
  botoesRapidos: {
    flexDirection: 'row',
    gap: Espacamento.sm,
    marginTop: Espacamento.sm,
  },
  botaoRapido: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.md,
    paddingVertical: Espacamento.sm,
    alignItems: 'center',
    gap: 4,
  },
  botaoRapidoIcone: {
    fontSize: 20,
  },
  botaoRapidoTexto: {
    fontSize: 12,
    color: Colors.branco,
    fontWeight: '600',
    fontFamily: 'sans-serif',
  },
  secaoTitulo: {
    ...Tipografia.subtitulo,
    marginBottom: Espacamento.md,
  },
  cardPsicologo: {
    backgroundColor: Colors.branco,
    borderRadius: BorderRadius.lg,
    padding: Espacamento.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamento.md,
    marginBottom: Espacamento.xl,
    ...Sombra.leve,
  },
  psicologoInfo: {
    flex: 1,
    gap: 4,
  },
  psicologoNome: {
    ...Tipografia.subtitulo,
    fontSize: 16,
  },
  psicologoEspecialidade: {
    ...Tipografia.pequeno,
    lineHeight: 18,
  },
  psicologoSessoes: {
    alignItems: 'center',
  },
  sessoesNumero: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primaria,
    fontFamily: 'sans-serif',
  },
  sessoesLabel: {
    ...Tipografia.pequeno,
  },
  bannerPlano: {
    backgroundColor: Colors.verdeClaro,
    borderRadius: BorderRadius.lg,
    padding: Espacamento.md,
    marginBottom: Espacamento.xl,
    borderWidth: 1,
    borderColor: Colors.borda,
  },
  bannerConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamento.md,
  },
  bannerIcone: {
    fontSize: 28,
  },
  bannerTitulo: {
    ...Tipografia.label,
    color: Colors.primaria,
  },
  bannerSubtitulo: {
    ...Tipografia.pequeno,
    color: Colors.textoSecundario,
    marginTop: 2,
  },
  atalhos: {
    flexDirection: 'row',
    gap: Espacamento.md,
  },
  atalho: {
    flex: 1,
    backgroundColor: Colors.branco,
    borderRadius: BorderRadius.lg,
    padding: Espacamento.md,
    alignItems: 'center',
    gap: Espacamento.xs,
    ...Sombra.leve,
  },
  atalhoIcone: {
    fontSize: 26,
  },
  atalhoTexto: {
    ...Tipografia.pequeno,
    fontWeight: '600',
    textAlign: 'center',
  },
});
