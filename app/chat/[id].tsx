import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput,
  TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { Espacamento, BorderRadius } from '../../constants/theme';

type Msg = { id: string; texto: string; enviada: boolean; hora: string };

const msgsMock: Msg[] = [
  { id: '1', texto: 'Olá, Ana! Como você está se sentindo hoje?', enviada: false, hora: '14:02' },
  { id: '2', texto: 'Oi, Dra. Carla! Estou um pouco ansiosa, mas melhor do que ontem.', enviada: true, hora: '14:04' },
  { id: '3', texto: 'Que bom que está melhor. Quer me contar o que aconteceu?', enviada: false, hora: '14:05' },
];

export default function Chat() {
  const router = useRouter();
  const { cores } = useTheme();
  const { id } = useLocalSearchParams();
  const [msgs, setMsgs] = useState<Msg[]>(msgsMock);
  const [texto, setTexto] = useState('');
  const listRef = useRef<FlatList>(null);

  const enviar = () => {
    if (!texto.trim()) return;
    const nova: Msg = {
      id: Date.now().toString(),
      texto: texto.trim(),
      enviada: true,
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMsgs((p) => [...p, nova]);
    setTexto('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      {/* Header */}
      <View style={[estilos.header, { backgroundColor: cores.primaria }]}>
        <TouchableOpacity onPress={() => router.back()} style={estilos.voltar}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={[estilos.avatarHeader, { backgroundColor: '#f9a825' }]}>
          <Text style={estilos.avatarHeaderTexto}>DM</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={estilos.headerNome}>Dra. Carla Mendes</Text>
          <View style={estilos.onlineRow}>
            <View style={estilos.pontOnline} />
            <Text style={estilos.onlineTexto}>Online</Text>
          </View>
        </View>
        <TouchableOpacity
          style={estilos.headerBtn}
          onPress={() => router.push(`/chamada/${id}?modo=voz` as any)}
        >
          <Ionicons name="call" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.headerBtn}
          onPress={() => router.push(`/chamada/${id}?modo=video` as any)}
        >
          <Ionicons name="videocam" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {msgs.length === 0 ? (
          <View style={estilos.vazio}>
            <Ionicons name="chatbubble-outline" size={60} color={cores.borda} />
            <Text style={[estilos.vazioTexto, { color: '#9e9e9e' }]}>Inicie a conversa</Text>
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={msgs}
            keyExtractor={(i) => i.id}
            contentContainerStyle={estilos.lista}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
            renderItem={({ item }) => (
              <View style={[estilos.bolhaRow, item.enviada ? estilos.bolhaRowDir : estilos.bolhaRowEsq]}>
                <View style={[
                  estilos.bolha,
                  item.enviada
                    ? [estilos.bolhaEnviada, { backgroundColor: cores.primaria }]
                    : [estilos.bolhaRecebida, { backgroundColor: cores.card }],
                ]}>
                  <Text style={[estilos.bolhaTexto, { color: item.enviada ? '#fff' : cores.textoPrincipal }]}>
                    {item.texto}
                  </Text>
                  <Text style={[estilos.hora, { color: item.enviada ? 'rgba(255,255,255,0.65)' : '#9e9e9e' }]}>
                    {item.hora}
                  </Text>
                </View>
              </View>
            )}
          />
        )}

        {/* Input */}
        <View style={[estilos.inputBar, { backgroundColor: cores.card, borderTopColor: '#f0f0f0' }]}>
          <TouchableOpacity style={estilos.anexo}>
            <Ionicons name="attach" size={24} color="#9e9e9e" />
          </TouchableOpacity>
          <TextInput
            style={[estilos.input, { backgroundColor: cores.fundo, color: cores.textoPrincipal }]}
            placeholder="Digite uma mensagem..."
            placeholderTextColor="#9e9e9e"
            value={texto}
            onChangeText={setTexto}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[estilos.enviarBtn, { backgroundColor: cores.primaria, opacity: texto.trim() ? 1 : 0.4 }]}
            onPress={enviar}
            disabled={!texto.trim()}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10 },
  voltar: { padding: 4 },
  avatarHeader: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarHeaderTexto: { color: '#fff', fontWeight: '700', fontSize: 13 },
  headerNome: { color: '#fff', fontWeight: '700', fontSize: 15 },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  pontOnline: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#a5d6a7' },
  onlineTexto: { color: '#a5d6a7', fontSize: 12 },
  headerBtn: { padding: 6 },
  lista: { padding: 16, gap: 8 },
  bolhaRow: { flexDirection: 'row', marginVertical: 2 },
  bolhaRowDir: { justifyContent: 'flex-end' },
  bolhaRowEsq: { justifyContent: 'flex-start' },
  bolha: { maxWidth: '78%', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  bolhaEnviada: { borderBottomRightRadius: 4 },
  bolhaRecebida: { borderBottomLeftRadius: 4 },
  bolhaTexto: { fontSize: 15, lineHeight: 22 },
  hora: { fontSize: 11, marginTop: 4, textAlign: 'right' },
  inputBar: { flexDirection: 'row', alignItems: 'flex-end', padding: 8, borderTopWidth: 1, gap: 8 },
  anexo: { padding: 6 },
  input: { flex: 1, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, maxHeight: 100 },
  enviarBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  vazioTexto: { fontSize: 15 },
});
