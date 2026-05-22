import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { Colors, Espacamento, BorderRadius, Tipografia, Sombra } from '../../constants/theme';

// Dados mockados do psicólogo
const psicologo = {
  nome: 'Carla Mendes',
  crp: 'CRP 06/12345',
  especialidade: 'Psicóloga Clínica',
};

// Pacientes agendados para hoje
const pacientesHoje = [
  {
    id: '1',
    nome: 'Ana Lima',
    horario: '09:00',
    status: 'confirmado',
    sessaoNumero: 8,
  },
  {
    id: '2',
    nome: 'Bruno Souza',
    horario: '10:30',
    status: 'confirmado',
    sessaoNumero: 3,
  },
  {
    id: '3',
    nome: 'Camila Rocha',
    horario: '14:00',
    status: 'pendente',
    sessaoNumero: 1,
  },
  {
    id: '4',
    nome: 'Diego Ferreira',
    horario: '15:30',
    status: 'confirmado',
    sessaoNumero: 12,
  },
];

export default function HomePsicologo() {
  const router = useRouter();
  const [online, setOnline] = useState(true);

  const totalHoje = pacientesHoje.length;
  const confirmados = pacientesHoje.filter((p) => p.status === 'confirmado').length;

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com saudação e toggle de status */}
        <View style={estilos.header}>
          <View style={estilos.headerEsquerda}>
            <Avatar nome={psicologo.nome} tamanho="md" />
            <View>
              <Text style={estilos.saudacao}>
                Olá, Dra. {psicologo.nome.split(' ')[0]}
              </Text>
              <Text style={estilos.crp}>{psicologo.crp}</Text>
            </View>
          </View>
          {/* Toggle online/offline */}
          <View style={estilos.toggleContainer}>
            <Text style={estilos.toggleLabel}>{online ? 'Online' : 'Offline'}</Text>
            <Switch
              value={online}
              onValueChange={setOnline}
              trackColor={{ false: Colors.offline, true: Colors.online }}
              thumbColor={Colors.branco}
            />
          </View>
        </View>

        {/* Badge de status atual */}
        <View style={estilos.statusBadge}>
          <Badge status={online ? 'online' : 'offline'} />
          <Text style={estilos.statusTexto}>
            {online
              ? 'Você está disponível para atendimentos'
              : 'Você está indisponível no momento'}
          </Text>
        </View>

        {/* Resumo do dia */}
        <Text style={estilos.secaoTitulo}>Resumo de hoje</Text>
        <View style={estilos.resumo}>
          <View style={estilos.resumoCard}>
            <Text style={estilos.resumoNumero}>{totalHoje}</Text>
            <Text style={estilos.resumoLabel}>Agendadas</Text>
          </View>
          <View style={[estilos.resumoCard, estilos.resumoCardDestaque]}>
            <Text style={[estilos.resumoNumero, { color: Colors.branco }]}>
              {confirmados}
            </Text>
            <Text style={[estilos.resumoLabel, { color: 'rgba(255,255,255,0.8)' }]}>
              Confirmadas
            </Text>
          </View>
          <View style={estilos.resumoCard}>
            <Text style={estilos.resumoNumero}>{totalHoje - confirmados}</Text>
            <Text style={estilos.resumoLabel}>Pendentes</Text>
          </View>
        </View>

        {/* Lista de pacientes do dia */}
        <Text style={estilos.secaoTitulo}>Pacientes de hoje</Text>
        <View style={estilos.listaPacientes}>
          {pacientesHoje.map((paciente) => (
            <View key={paciente.id} style={estilos.cardPaciente}>
              {/* Horário */}
              <View style={estilos.horarioContainer}>
                <Text style={estilos.horario}>{paciente.horario}</Text>
                <View
                  style={[
                    estilos.statusDot,
                    {
                      backgroundColor:
                        paciente.status === 'confirmado'
                          ? Colors.online
                          : Colors.ocupado,
                    },
                  ]}
                />
              </View>

              {/* Info do paciente */}
              <Avatar nome={paciente.nome} tamanho="sm" />
              <View style={estilos.pacienteInfo}>
                <Text style={estilos.pacienteNome}>{paciente.nome}</Text>
                <Text style={estilos.pacienteSessao}>
                  Sessão #{paciente.sessaoNumero}
                </Text>
              </View>

              {/* Botões de ação */}
              <View style={estilos.acoes}>
                <TouchableOpacity
                  style={estilos.botaoAcao}
                  onPress={() => router.push('/(psicologo)/chat')}
                >
                  <Text style={estilos.botaoAcaoIcone}>💬</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[estilos.botaoAcao, estilos.botaoAcaoPrimario]}
                  onPress={() =>
                    router.push({
                      pathname: '/(psicologo)/chamada',
                      params: { modo: 'voz' },
                    })
                  }
                >
                  <Text style={estilos.botaoAcaoIcone}>📞</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    marginBottom: Espacamento.md,
  },
  headerEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamento.md,
  },
  saudacao: {
    ...Tipografia.subtitulo,
    fontSize: 17,
  },
  crp: {
    ...Tipografia.pequeno,
    marginTop: 2,
  },
  toggleContainer: {
    alignItems: 'center',
    gap: 4,
  },
  toggleLabel: {
    ...Tipografia.pequeno,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamento.sm,
    marginBottom: Espacamento.xl,
    backgroundColor: Colors.branco,
    padding: Espacamento.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.borda,
  },
  statusTexto: {
    ...Tipografia.corpoSecundario,
    flex: 1,
  },
  secaoTitulo: {
    ...Tipografia.subtitulo,
    marginBottom: Espacamento.md,
  },
  resumo: {
    flexDirection: 'row',
    gap: Espacamento.md,
    marginBottom: Espacamento.xl,
  },
  resumoCard: {
    flex: 1,
    backgroundColor: Colors.branco,
    borderRadius: BorderRadius.lg,
    padding: Espacamento.md,
    alignItems: 'center',
    ...Sombra.leve,
  },
  resumoCardDestaque: {
    backgroundColor: Colors.primaria,
    ...Sombra.forte,
  },
  resumoNumero: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primaria,
    fontFamily: 'sans-serif',
  },
  resumoLabel: {
    ...Tipografia.pequeno,
    marginTop: 4,
    textAlign: 'center',
  },
  listaPacientes: {
    gap: Espacamento.sm,
  },
  cardPaciente: {
    backgroundColor: Colors.branco,
    borderRadius: BorderRadius.lg,
    padding: Espacamento.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamento.md,
    ...Sombra.leve,
  },
  horarioContainer: {
    alignItems: 'center',
    width: 44,
  },
  horario: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaria,
    fontFamily: 'sans-serif',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
  pacienteInfo: {
    flex: 1,
  },
  pacienteNome: {
    ...Tipografia.label,
  },
  pacienteSessao: {
    ...Tipografia.pequeno,
    marginTop: 2,
  },
  acoes: {
    flexDirection: 'row',
    gap: Espacamento.xs,
  },
  botaoAcao: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoAcaoPrimario: {
    backgroundColor: Colors.primaria,
  },
  botaoAcaoIcone: {
    fontSize: 16,
  },
});
