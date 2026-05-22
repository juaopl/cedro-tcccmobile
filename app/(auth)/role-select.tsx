import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { Espacamento, BorderRadius, Sombra } from '../../constants/theme';

type Role = 'paciente' | 'psicologo';

const opcoes = [
  {
    role: 'paciente' as Role,
    icone: 'person' as const,
    titulo: 'Sou paciente',
    descricao: 'Quero encontrar apoio psicológico e cuidar da minha saúde mental.',
  },
  {
    role: 'psicologo' as Role,
    icone: 'medical' as const,
    titulo: 'Sou psicólogo(a)',
    descricao: 'Quero atender pacientes e oferecer suporte psicológico pela plataforma.',
  },
];

export default function RoleSelect() {
  const router = useRouter();
  const { cores } = useTheme();
  const [selecionado, setSelecionado] = useState<Role | null>(null);

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      <Header mostrarLogo />
      <ScrollView contentContainerStyle={estilos.conteudo} showsVerticalScrollIndicator={false}>
        <Text style={[estilos.titulo, { color: cores.textoPrincipal }]}>
          Como você está entrando?
        </Text>
        <Text style={[estilos.subtitulo, { color: cores.textoSecundario }]}>
          Escolha seu perfil para personalizar sua experiência no Cedro.
        </Text>

        {opcoes.map((op) => {
          const ativo = selecionado === op.role;
          return (
            <TouchableOpacity
              key={op.role}
              style={[
                estilos.card,
                { backgroundColor: cores.card, borderColor: ativo ? cores.primaria : cores.borda },
                Sombra.card,
              ]}
              onPress={() => setSelecionado(op.role)}
              activeOpacity={0.85}
            >
              {/* Ícone */}
              <View style={[estilos.iconeContainer, { backgroundColor: cores.verdeClaro }]}>
                <Ionicons name={op.icone} size={26} color={cores.primaria} />
              </View>

              {/* Texto */}
              <View style={{ flex: 1 }}>
                <Text style={[estilos.cardTitulo, { color: cores.textoPrincipal }]}>{op.titulo}</Text>
                <Text style={[estilos.cardDescricao, { color: cores.textoSecundario }]}>{op.descricao}</Text>
              </View>

              {/* Radio */}
              <View style={[estilos.radio, { borderColor: ativo ? cores.primaria : cores.borda }]}>
                {ativo && (
                  <View style={[estilos.radioCheck, { backgroundColor: cores.primaria }]}>
                    <Ionicons name="checkmark" size={12} color="#fff" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Botão continuar */}
        <TouchableOpacity
          style={[
            estilos.botao,
            { backgroundColor: selecionado ? cores.primaria : cores.botaoDesabilitado },
          ]}
          onPress={() => selecionado && router.push({ pathname: '/(auth)/login', params: { role: selecionado } })}
          disabled={!selecionado}
          activeOpacity={0.85}
        >
          <Text style={estilos.botaoTexto}>Continuar</Text>
        </TouchableOpacity>

        {/* Link login */}
        <TouchableOpacity
          style={estilos.linkContainer}
          onPress={() => router.push({ pathname: '/(auth)/login', params: { role: 'paciente' } })}
        >
          <Text style={[estilos.linkTexto, { color: cores.textoSecundario }]}>
            Já tem conta?{' '}
            <Text style={[estilos.linkDestaque, { color: cores.primaria }]}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  conteudo: { padding: Espacamento.md, paddingTop: Espacamento.lg },
  titulo: { fontFamily: 'serif', fontSize: 24, fontWeight: '700', marginBottom: Espacamento.xs },
  subtitulo: { fontSize: 14, lineHeight: 22, marginBottom: Espacamento.xl },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: Espacamento.md,
    borderRadius: 16, padding: Espacamento.md, borderWidth: 2,
    marginBottom: Espacamento.md,
  },
  iconeContainer: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardTitulo: { fontSize: 17, fontWeight: '700', marginBottom: 4 },
  cardDescricao: { fontSize: 13, lineHeight: 20 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioCheck: { width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  botao: {
    paddingVertical: 16, borderRadius: 12, alignItems: 'center',
    marginTop: Espacamento.sm, marginBottom: Espacamento.md,
    shadowColor: '#2e7d32', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, elevation: 4,
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
  linkContainer: { alignItems: 'center', paddingVertical: Espacamento.sm },
  linkTexto: { fontSize: 14 },
  linkDestaque: { fontWeight: '700' },
});
