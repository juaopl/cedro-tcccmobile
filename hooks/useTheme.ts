import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../constants/theme';

const CHAVE = 'theme_preference';

export function useTheme() {
  const [escuro, setEscuro] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE).then((val) => {
      if (val === 'dark') setEscuro(true);
    });
  }, []);

  const alternarTema = async () => {
    const novo = !escuro;
    setEscuro(novo);
    await AsyncStorage.setItem(CHAVE, novo ? 'dark' : 'light');
  };

  return { cores: escuro ? colors.dark : colors.light, escuro, alternarTema };
}
