import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { Colors, BorderRadius, Espacamento, Sombra } from '../../constants/theme';

type Variante = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  titulo: string;
  onPress: () => void;
  variante?: Variante;
  carregando?: boolean;
  desabilitado?: boolean;
  estilo?: ViewStyle;
  estiloTexto?: TextStyle;
}

export default function Button({
  titulo,
  onPress,
  variante = 'primary',
  carregando = false,
  desabilitado = false,
  estilo,
  estiloTexto,
}: ButtonProps) {
  // Animação de escala ao pressionar
  const escala = new Animated.Value(1);

  const aoPressionar = () => {
    Animated.sequence([
      Animated.timing(escala, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(escala, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  const estilosBotao = [
    estilos.base,
    estilos[variante],
    (desabilitado || carregando) && estilos.desabilitado,
    variante === 'primary' && Sombra.forte,
    estilo,
  ];

  const estilosTexto = [
    estilos.textoBase,
    estilos[`texto_${variante}` as keyof typeof estilos],
    estiloTexto,
  ];

  return (
    <Animated.View style={{ transform: [{ scale: escala }] }}>
      <TouchableOpacity
        style={estilosBotao}
        onPress={aoPressionar}
        disabled={desabilitado || carregando}
        activeOpacity={1}
      >
        {carregando ? (
          <ActivityIndicator
            color={variante === 'primary' ? Colors.branco : Colors.primaria}
            size="small"
          />
        ) : (
          <Text style={estilosTexto}>{titulo}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const estilos = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Espacamento.xl,
  },
  // Variante sólida verde
  primary: {
    backgroundColor: Colors.primaria,
  },
  // Variante com borda verde
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primaria,
  },
  // Variante transparente
  ghost: {
    backgroundColor: 'transparent',
  },
  desabilitado: {
    opacity: 0.5,
  },
  textoBase: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'sans-serif',
  },
  texto_primary: {
    color: Colors.branco,
  },
  texto_secondary: {
    color: Colors.primaria,
  },
  texto_ghost: {
    color: Colors.primaria,
  },
});
