// Identidade visual do Cedro — plataforma de apoio psicológico

export const Colors = {
  // Cores principais
  primaria: '#2e7d32',
  secundaria: '#4caf50',

  // Fundos
  fundo: '#f9f3f0',
  verdeClaro: '#e8f5e9',
  branco: '#ffffff',
  fundoEscuro: '#1a2e1b',

  // Textos
  textoPrincipal: '#1a2e1b',
  textoSecundario: '#5a7a5c',
  textoClaro: '#ffffff',
  textoDesabilitado: '#a5c8a7',

  // Bordas
  borda: '#c8e6c9',
  bordaFoco: '#2e7d32',

  // Status
  online: '#4caf50',
  offline: '#9e9e9e',
  ocupado: '#ffc107',

  // Ações
  erro: '#c62828',
  aviso: '#f57f17',
  sucesso: '#2e7d32',

  // Chamada
  encerrar: '#d32f2f',
  fundoChamada: '#1a2e1b',

  // Mensagens
  bolhaEnviada: '#2e7d32',
  bolhaRecebida: '#f0f0f0',
  textoBolhaEnviada: '#ffffff',
  textoBolhaRecebida: '#1a2e1b',
};

export const Espacamento = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Tipografia = {
  // Títulos — serif para acolhimento
  tituloGrande: {
    fontFamily: 'serif',
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.textoPrincipal,
  },
  titulo: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.textoPrincipal,
  },
  subtitulo: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.textoPrincipal,
  },

  // Corpo — sans-serif para legibilidade
  corpo: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    color: Colors.textoPrincipal,
  },
  corpoSecundario: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    color: Colors.textoSecundario,
  },
  pequeno: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    color: Colors.textoSecundario,
  },
  label: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.textoPrincipal,
  },
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const Sombra = {
  leve: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  media: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  forte: {
    shadowColor: '#2e7d32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
