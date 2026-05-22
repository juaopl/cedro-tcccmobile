import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius, Espacamento } from '../../constants/theme';

type StatusBadge = 'online' | 'offline' | 'ocupado';

interface BadgeProps {
  status: StatusBadge;
  mostrarTexto?: boolean;
}

const configStatus: Record<StatusBadge, { cor: string; texto: string }> = {
  online: { cor: Colors.online, texto: 'Online' },
  offline: { cor: Colors.offline, texto: 'Offline' },
  ocupado: { cor: Colors.ocupado, texto: 'Ocupado' },
};

export default function Badge({ status, mostrarTexto = true }: BadgeProps) {
  const config = configStatus[status];

  return (
    <View style={[estilos.container, { backgroundColor: config.cor + '22' }]}>
      <View style={[estilos.ponto, { backgroundColor: config.cor }]} />
      {mostrarTexto && (
        <Text style={[estilos.texto, { color: config.cor }]}>{config.texto}</Text>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Espacamento.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    gap: 5,
  },
  ponto: {
    width: 7,
    height: 7,
    borderRadius: BorderRadius.full,
  },
  texto: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'sans-serif',
  },
});
