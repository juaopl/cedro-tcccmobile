import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Colors, Espacamento, BorderRadius, Tipografia, Sombra } from '../../constants/theme';

type Role = 'paciente' | 'psicologo';

// Opções de perfil disponíveis
const opcoes: { role: Role; icone: string; titulo: string; descricao: string }[] = [
  {
    role: 'paciente',
    icone: '🧘',
    titulo: 'Sou paciente',
    descricao: 'Quero encontrar apoio psicológico e cuidar da minha saúde mental.',
  },
  {
    role: 'psicologo',
    icone: '🩺',
    titulo: 'Sou psicólogo(a)',
    descricao: 'Quero atender pacientes e oferecer suporte psicológico pela plataforma.',
  },
];

export default function RoleSelect() {
  const router = useRouter();
  const [selecionado, setSelecionado] = useState<Role | null>(null);

  const continuar = () => {
    if (!selecionado) return;
    router.push({ pathname: '/(auth)/login', params: { role: selecionado } });
  };

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <Text style={estilos.emoji}>🌱</Text>
        <Text style={estilos.titulo}>Como você está{'\n'}entrando?</Text>
        <Text style={estilos.subtitulo}>
          Escolha seu perfil para personalizar sua experiência no Cedro.
        </Text>

        {/* Cards de seleção */}
        <View style={estilos.cards}>
          {opcoes.map((opcao) => {
            const ativo = selecionado === opcao.role;
            return (
              <TouchableOpacity
                key={opcao.role}
                style={[estilos.card, ativo && estilos.cardAtivo]}
                onPress={() => setSelecionado(opcao.role)}
                activeOpacity={0.85}
              >
                <Text style={estilos.cardIcone}>{opcao.icone}</Text>
                <View style={estilos.cardTexto}>
                  <Text style={[estilos.cardTitulo, ativo && estilos.cardTituloAtivo]}>
                    {opcao.titulo}
                  </Text>
                  <Text style={estilos.cardDescricao}>{opcao.descricao}</Text>
                </View>
                {/* Indicador de seleção */}
                <View style={[estilos.radio, ativo && estilos.radioAtivo]}>
                  {ativo && <View style={estilos.radioPonto} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Botão continuar */}
        <TouchableOpacity
          style={[estilos.botao, !selecionado && estilos.botaoDesabilitado]}
          onPress={continuar}
          disabled={!selecionado}
          activeOpacity={0.85}
        >
          <Text style={estilos.textoBotao}>Continuar</Text>
        </TouchableOpacity>

        {/* Link para login direto */}
        <Link href={{ pathname: '/(auth)/login', params: { role: 'paciente' } }} asChild>
          <TouchableOpacity style={estilos.linkLogin}>
            <Text style={estilos.textoLink}>
              Já tem conta?{' '}
              <Text style={estilos.textoLinkDestaque}>Entrar</Text>
            </Text>
          </TouchableOpacity>
        </Link>
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
    paddingTop: Espacamento.xxl,
    flexGrow: 1,
  },
  emoji: {
    fontSize: 48,
    marginBottom: Espacamento.md,
  },
  titulo: {
    ...Tipografia.tituloGrande,
    marginBottom: Espacamento.sm,
  },
  subtitulo: {
    ...Tipografia.corpoSecundario,
    lineHeight: 22,
    marginBottom: Espacamento.xl,
  },
  cards: {
    gap: Espacamento.md,
    marginBottom: Espacamento.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.branco,
    borderRadius: BorderRadius.lg,
    padding: Espacamento.lg,
    borderWidth: 2,
    borderColor: Colors.borda,
    gap: Espacamento.md,
    ...Sombra.leve,
  },
  cardAtivo: {
    borderColor: Colors.primaria,
    backgroundColor: Colors.verdeClaro,
  },
  cardIcone: {
    fontSize: 36,
  },
  cardTexto: {
    flex: 1,
  },
  cardTitulo: {
    ...Tipografia.subtitulo,
    fontSize: 16,
    marginBottom: 4,
  },
  cardTituloAtivo: {
    color: Colors.primaria,
  },
  cardDescricao: {
    ...Tipografia.corpoSecundario,
    lineHeight: 20,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.borda,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioAtivo: {
    borderColor: Colors.primaria,
  },
  radioPonto: {
    width: 11,
    height: 11,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaria,
  },
  botao: {
    backgroundColor: Colors.primaria,
    height: 56,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Espacamento.lg,
    shadowColor: Colors.primaria,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  botaoDesabilitado: {
    opacity: 0.45,
  },
  textoBotao: {
    color: Colors.branco,
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'sans-serif',
  },
  linkLogin: {
    alignItems: 'center',
    paddingVertical: Espacamento.sm,
  },
  textoLink: {
    ...Tipografia.corpoSecundario,
  },
  textoLinkDestaque: {
    color: Colors.primaria,
    fontWeight: '700',
  },
});
