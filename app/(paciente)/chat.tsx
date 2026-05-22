import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { Colors, Espacamento, BorderRadius, Tipografia, Sombra } from '../../constants/theme';

const mensagensIniciais = [
  { id: '1', texto: 'Olá, Ana! Como você está se sentindo hoje?', enviada: false, hora: '14:02' },
  { id: '2', texto: 'Oi, Dra. Carla! Estou um pouco ansiosa, mas melhor do que ontem.', enviada: true, hora: '14:04' },
  { id: '3', texto: 'Que bom que está melhor. Quer me contar o que aconteceu ontem?', enviada: false, hora: '14:05' },
  { id: '4', texto: 'Sim, tive uma situação no trabalho que me deixou bem estressada...', enviada: true, hora: '14:07' },
  { id: '5', texto: 'Entendo. Vamos explorar isso juntas. Pode me descrever como foi essa situação?', enviada: false, hora: '14:08' },
];

type Mensagem = { id: string; texto: string; enviada: boolean; hora: string };

// Bolha com animação de entrada (fade + slide lateral)
function Bolha({ item, nova }: { item: Mensagem; nova?: boolean }) {
  const anim = useRef(new Animated.Value(nova ? 0 : 1)).current;
  const translateX = useRef(new Animated.Value(nova ? (item.enviada ? 40 : -40) : 0)).current;

  useEffect(() => {
    if (nova) {
      Animated.parallel([
        Animated.timing(anim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(translateX, { toValue: 0, useNativeDriver: true, tension: 80, friction: 8 }),
      ]).start();
    }
  }, []);

  return (
    <Animated.View
      style={[
        estilos.bolhaContainer,
        item.enviada ? estilos.bolhaContainerEnviada : estilos.bolhaContainerRecebida,
        { opacity: anim, transform: [{ translateX }] },
      ]}
    >
      <View style={[estilos.bolha, item.enviada ? estilos.bolhaEnviada : estilos.bolhaRecebida]}>
        <Text style={[estilos.textoBolha, item.enviada ? estilos.textoBolhaEnviada : estilos.textoBolhaRecebida]}>
          {item.texto}
        </Text>
        <Text style={[estilos.hora, item.enviada ? estilos.horaEnviada : estilos.horaRecebida]}>
          {item.hora}
        </Text>
      </View>
    </Animated.View>
  );
}

export default function ChatPaciente() {
  const router = useRouter();
  const [mensagens, setMensagens] = useState<(Mensagem & { nova?: boolean })[]>(mensagensIniciais);
  const [texto, setTexto] = useState('');
  const flatListRef = useRef<FlatList>(null);
  // Animação de escala do botão enviar
  const escalaEnviar = useRef(new Animated.Value(1)).current;

  const enviarMensagem = () => {
    if (!texto.trim()) return;
    // Pulsa o botão ao enviar
    Animated.sequence([
      Animated.timing(escalaEnviar, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.spring(escalaEnviar, { toValue: 1, useNativeDriver: true }),
    ]).start();
    const nova: Mensagem & { nova: boolean } = {
      id: Date.now().toString(),
      texto: texto.trim(),
      enviada: true,
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      nova: true,
    };
    setMensagens((prev) => [...prev, nova]);
    setTexto('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={estilos.container}>
      {/* Header */}
      <View style={estilos.header}>
        <TouchableOpacity onPress={() => router.back()} style={estilos.botaoVoltar}>
          <Text style={estilos.textoVoltar}>←</Text>
        </TouchableOpacity>
        <Avatar nome="Dra. Carla Mendes" tamanho="sm" />
        <View style={estilos.headerInfo}>
          <Text style={estilos.headerNome}>Dra. Carla Mendes</Text>
          <Badge status="online" />
        </View>
        <View style={estilos.headerAcoes}>
          <TouchableOpacity
            style={estilos.botaoHeader}
            onPress={() => router.push({ pathname: '/(paciente)/chamada', params: { modo: 'voz' } })}
          >
            <Text style={estilos.botaoHeaderIcone}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={estilos.botaoHeader}
            onPress={() => router.push({ pathname: '/(paciente)/chamada', params: { modo: 'video' } })}
          >
            <Text style={estilos.botaoHeaderIcone}>📹</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0}>
        <FlatList
          ref={flatListRef}
          data={mensagens}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Bolha item={item} nova={(item as any).nova} />}
          contentContainerStyle={estilos.listaMensagens}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

        {/* Input */}
        <View style={estilos.inputContainer}>
          <TouchableOpacity style={estilos.botaoAnexo}>
            <Text style={estilos.botaoAnexoIcone}>📎</Text>
          </TouchableOpacity>
          <TextInput
            style={estilos.input}
            placeholder="Digite uma mensagem..."
            placeholderTextColor={Colors.textoSecundario}
            value={texto}
            onChangeText={setTexto}
            multiline
            maxLength={500}
          />
          <Animated.View style={{ transform: [{ scale: escalaEnviar }] }}>
            <TouchableOpacity
              style={[estilos.botaoEnviar, !texto.trim() && estilos.botaoEnviarDesabilitado]}
              onPress={enviarMensagem}
              disabled={!texto.trim()}
            >
              <Text style={estilos.botaoEnviarIcone}>➤</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundo,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Espacamento.md,
    backgroundColor: Colors.branco,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borda,
    gap: Espacamento.sm,
    ...Sombra.leve,
  },
  botaoVoltar: {
    padding: Espacamento.xs,
  },
  textoVoltar: {
    fontSize: 22,
    color: Colors.primaria,
  },
  headerInfo: {
    flex: 1,
    gap: 3,
  },
  headerNome: {
    ...Tipografia.label,
    fontSize: 15,
  },
  headerAcoes: {
    flexDirection: 'row',
    gap: Espacamento.xs,
  },
  botaoHeader: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoHeaderIcone: {
    fontSize: 16,
  },
  listaMensagens: {
    padding: Espacamento.md,
    gap: Espacamento.sm,
  },
  bolhaContainer: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  bolhaContainerEnviada: {
    justifyContent: 'flex-end',
  },
  bolhaContainerRecebida: {
    justifyContent: 'flex-start',
  },
  bolha: {
    maxWidth: '78%',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Espacamento.md,
    paddingVertical: Espacamento.sm,
  },
  bolhaEnviada: {
    backgroundColor: Colors.primaria,
    borderBottomRightRadius: 4,
  },
  bolhaRecebida: {
    backgroundColor: Colors.branco,
    borderBottomLeftRadius: 4,
    ...Sombra.leve,
  },
  textoBolha: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'sans-serif',
  },
  textoBolhaEnviada: {
    color: Colors.branco,
  },
  textoBolhaRecebida: {
    color: Colors.textoPrincipal,
  },
  hora: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: 'sans-serif',
  },
  horaEnviada: {
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'right',
  },
  horaRecebida: {
    color: Colors.textoSecundario,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: Espacamento.md,
    backgroundColor: Colors.branco,
    borderTopWidth: 1,
    borderTopColor: Colors.borda,
    gap: Espacamento.sm,
  },
  botaoAnexo: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoAnexoIcone: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: Colors.fundo,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Espacamento.md,
    paddingVertical: Espacamento.sm,
    fontSize: 15,
    color: Colors.textoPrincipal,
    fontFamily: 'sans-serif',
    borderWidth: 1,
    borderColor: Colors.borda,
  },
  botaoEnviar: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaria,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoEnviarDesabilitado: {
    opacity: 0.4,
  },
  botaoEnviarIcone: {
    fontSize: 16,
    color: Colors.branco,
  },
});
