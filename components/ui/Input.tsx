import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInputProps,
} from 'react-native';
import { Colors, BorderRadius, Espacamento, Tipografia } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  icone?: React.ReactNode;
  secureTextEntry?: boolean;
  erro?: string;
}

export default function Input({
  label,
  icone,
  secureTextEntry = false,
  erro,
  ...props
}: InputProps) {
  const [focado, setFocado] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  // Animação suave da borda ao focar
  const animacaoBorda = useRef(new Animated.Value(0)).current;

  const aoFocar = () => {
    setFocado(true);
    Animated.timing(animacaoBorda, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const aoDesfocar = () => {
    setFocado(false);
    Animated.timing(animacaoBorda, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const corBorda = animacaoBorda.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.borda, Colors.bordaFoco],
  });

  const corFundo = animacaoBorda.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.branco, Colors.verdeClaro],
  });

  return (
    <View style={estilos.container}>
      {label && <Text style={estilos.label}>{label}</Text>}
      <Animated.View
        style={[
          estilos.inputContainer,
          { borderColor: corBorda, backgroundColor: corFundo },
          erro ? estilos.inputErro : null,
        ]}
      >
        {icone && <View style={estilos.icone}>{icone}</View>}
        <TextInput
          style={estilos.input}
          placeholderTextColor={Colors.textoSecundario}
          secureTextEntry={secureTextEntry && !senhaVisivel}
          onFocus={aoFocar}
          onBlur={aoDesfocar}
          {...props}
        />
        {/* Toggle de visibilidade para campos de senha */}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setSenhaVisivel(!senhaVisivel)}
            style={estilos.toggleSenha}
          >
            <Text style={estilos.textoToggle}>
              {senhaVisivel ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
      {erro && <Text style={estilos.textoErro}>{erro}</Text>}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    marginBottom: Espacamento.md,
  },
  label: {
    ...Tipografia.label,
    marginBottom: Espacamento.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Espacamento.md,
    height: 52,
  },
  inputErro: {
    borderColor: Colors.erro,
  },
  icone: {
    marginRight: Espacamento.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textoPrincipal,
    fontFamily: 'sans-serif',
  },
  toggleSenha: {
    padding: Espacamento.xs,
  },
  textoToggle: {
    fontSize: 16,
  },
  textoErro: {
    ...Tipografia.pequeno,
    color: Colors.erro,
    marginTop: Espacamento.xs,
  },
});
