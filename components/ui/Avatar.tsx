import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, BorderRadius } from '../../constants/theme';

type Tamanho = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  nome?: string;
  uri?: string;
  tamanho?: Tamanho;
}

// Dimensões por tamanho
const dimensoes: Record<Tamanho, number> = {
  sm: 36,
  md: 48,
  lg: 72,
  xl: 120,
};

// Gera iniciais a partir do nome completo
function gerarIniciais(nome: string): string {
  const partes = nome.trim().split(' ');
  if (partes.length === 1) return partes[0][0].toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

// Gera cor de fundo baseada no nome (consistente por usuário)
function gerarCorFundo(nome: string): string {
  const cores = [
    '#a5d6a7', '#80cbc4', '#90caf9', '#ce93d8',
    '#ffcc80', '#ef9a9a', '#b0bec5', '#c5e1a5',
  ];
  let soma = 0;
  for (let i = 0; i < nome.length; i++) soma += nome.charCodeAt(i);
  return cores[soma % cores.length];
}

export default function Avatar({ nome = '', uri, tamanho = 'md' }: AvatarProps) {
  const tamanhoPixel = dimensoes[tamanho];
  const tamanhoFonte = tamanhoPixel * 0.38;

  const estiloCirculo = {
    width: tamanhoPixel,
    height: tamanhoPixel,
    borderRadius: tamanhoPixel / 2,
    backgroundColor: uri ? 'transparent' : gerarCorFundo(nome),
  };

  return (
    <View style={[estilos.base, estiloCirculo]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[estilos.imagem, { borderRadius: tamanhoPixel / 2 }]}
        />
      ) : (
        <Text style={[estilos.iniciais, { fontSize: tamanhoFonte }]}>
          {gerarIniciais(nome || '?')}
        </Text>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  iniciais: {
    fontWeight: '700',
    color: Colors.fundoEscuro,
    fontFamily: 'sans-serif',
  },
});
