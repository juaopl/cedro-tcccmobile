import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  titulo?: string;
  mostrarVoltar?: boolean;
  mostrarLogo?: boolean;
  direita?: React.ReactNode;
}

export default function Header({ titulo, mostrarVoltar = false, mostrarLogo = false, direita }: HeaderProps) {
  const router = useRouter();
  const { cores } = useTheme();

  return (
    <View style={[estilos.header, { backgroundColor: cores.primaria }]}>
      {/* Esquerda */}
      <View style={estilos.lado}>
        {mostrarVoltar && (
          <TouchableOpacity onPress={() => router.back()} style={estilos.botaoVoltar}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        {mostrarLogo && (
          <View style={estilos.logo}>
            <Ionicons name="leaf" size={22} color="#fff" />
            <Text style={estilos.logoTexto}>CEDRO</Text>
          </View>
        )}
      </View>

      {/* Centro */}
      {titulo && !mostrarLogo && (
        <Text style={estilos.titulo}>{titulo}</Text>
      )}

      {/* Direita */}
      <View style={estilos.lado}>
        {direita}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  lado: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoVoltar: {
    padding: 4,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 3,
  },
  titulo: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'serif',
    flex: 1,
    textAlign: 'center',
  },
});
