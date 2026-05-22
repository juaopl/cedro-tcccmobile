import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Modal, Linking, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { BorderRadius, Espacamento } from '../constants/theme';

export default function SOSButton() {
  const { cores } = useTheme();
  const [visivel, setVisivel] = useState(false);

  return (
    <>
      {/* Botão flutuante */}
      <TouchableOpacity style={estilos.botao} onPress={() => setVisivel(true)} activeOpacity={0.85}>
        <Ionicons name="call" size={24} color="#fff" />
        <Text style={estilos.label}>SOS</Text>
      </TouchableOpacity>

      {/* Modal de crise */}
      <Modal visible={visivel} transparent animationType="fade">
        <Pressable style={estilos.overlay} onPress={() => setVisivel(false)}>
          <Pressable style={[estilos.card, { backgroundColor: cores.card }]} onPress={() => {}}>
            {/* Fechar */}
            <TouchableOpacity style={estilos.fechar} onPress={() => setVisivel(false)}>
              <Ionicons name="close" size={24} color="#9e9e9e" />
            </TouchableOpacity>

            <Ionicons name="heart" size={48} color="#e53935" style={{ marginBottom: Espacamento.md }} />
            <Text style={[estilos.modalTitulo, { color: cores.textoPrincipal }]}>
              Você não está sozinho(a)
            </Text>
            <Text style={[estilos.modalTexto, { color: cores.textoSecundario }]}>
              O CVV oferece apoio emocional gratuito e sigiloso 24 horas, 7 dias por semana.
              Você pode ligar, conversar por chat ou e-mail.
            </Text>

            <TouchableOpacity
              style={[estilos.botaoLigar, { backgroundColor: cores.primaria }]}
              onPress={() => Linking.openURL('tel:188')}
            >
              <Text style={estilos.botaoLigarTexto}>📞 Ligar 188 agora</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[estilos.botaoChat, { borderColor: cores.primaria }]}
              onPress={() => Linking.openURL('https://cvv.org.br')}
            >
              <Text style={[estilos.botaoChatTexto, { color: cores.primaria }]}>
                💬 Chat no site do CVV
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const estilos = StyleSheet.create({
  botao: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e53935',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#e53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 999,
  },
  label: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: 32,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    width: '85%',
  },
  fechar: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalTitulo: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Espacamento.md,
  },
  modalTexto: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Espacamento.xl,
  },
  botaoLigar: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Espacamento.sm,
  },
  botaoLigarTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  botaoChat: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  botaoChatTexto: {
    fontWeight: '700',
    fontSize: 16,
  },
});
