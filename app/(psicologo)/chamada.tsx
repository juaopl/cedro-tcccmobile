import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Avatar from '../../components/ui/Avatar';
import { Colors, Espacamento, BorderRadius } from '../../constants/theme';

export default function ChamadaPsicologo() {
  const router = useRouter();
  const { modo: modoParam } = useLocalSearchParams<{ modo: string }>();

  const [modo, setModo] = useState<'voz' | 'video'>(
    modoParam === 'video' ? 'video' : 'voz'
  );
  const [mudo, setMudo] = useState(false);
  const [altoFalante, setAltoFalante] = useState(true);
  const [cameraAtiva, setCameraAtiva] = useState(true);
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(intervalo);
  }, []);

  const formatarTempo = (s: number) => {
    const min = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  const encerrar = () => router.back();

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.gradienteTopo} />
      <View style={estilos.gradienteFundo} />

      <View style={estilos.conteudo}>
        <View style={estilos.modoBadge}>
          <Text style={estilos.modoTexto}>
            {modo === 'video' ? '📹 Vídeo' : '📞 Voz'}
          </Text>
        </View>

        {/* Participante: paciente */}
        <View style={estilos.avatarContainer}>
          <Avatar nome="Ana Lima" tamanho="xl" />
          <View style={estilos.anel} />
        </View>

        <Text style={estilos.nome}>Ana Lima</Text>
        <Text style={estilos.status}>
          Chamada em andamento · {formatarTempo(segundos)}
        </Text>

        <View style={estilos.alternarModo}>
          <TouchableOpacity
            style={[estilos.botaoModo, modo === 'voz' && estilos.botaoModoAtivo]}
            onPress={() => setModo('voz')}
          >
            <Text style={estilos.botaoModoIcone}>📞</Text>
            <Text style={[estilos.botaoModoTexto, modo === 'voz' && estilos.botaoModoTextoAtivo]}>
              Voz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.botaoModo, modo === 'video' && estilos.botaoModoAtivo]}
            onPress={() => setModo('video')}
          >
            <Text style={estilos.botaoModoIcone}>📹</Text>
            <Text style={[estilos.botaoModoTexto, modo === 'video' && estilos.botaoModoTextoAtivo]}>
              Vídeo
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={estilos.controles}>
        <View style={estilos.controleItem}>
          <TouchableOpacity
            style={[estilos.botaoControle, mudo && estilos.botaoControleAtivo]}
            onPress={() => setMudo(!mudo)}
          >
            <Text style={estilos.botaoControleIcone}>{mudo ? '🔇' : '🎤'}</Text>
          </TouchableOpacity>
          <Text style={estilos.controleLabel}>{mudo ? 'Ativar' : 'Mudo'}</Text>
        </View>

        {modo === 'video' && (
          <View style={estilos.controleItem}>
            <TouchableOpacity
              style={[estilos.botaoControle, !cameraAtiva && estilos.botaoControleAtivo]}
              onPress={() => setCameraAtiva(!cameraAtiva)}
            >
              <Text style={estilos.botaoControleIcone}>
                {cameraAtiva ? '📷' : '🚫'}
              </Text>
            </TouchableOpacity>
            <Text style={estilos.controleLabel}>
              {cameraAtiva ? 'Câmera' : 'Sem câmera'}
            </Text>
          </View>
        )}

        <View style={estilos.controleItem}>
          <TouchableOpacity
            style={[estilos.botaoControle, !altoFalante && estilos.botaoControleAtivo]}
            onPress={() => setAltoFalante(!altoFalante)}
          >
            <Text style={estilos.botaoControleIcone}>
              {altoFalante ? '🔊' : '🔈'}
            </Text>
          </TouchableOpacity>
          <Text style={estilos.controleLabel}>
            {altoFalante ? 'Alto-falante' : 'Fone'}
          </Text>
        </View>

        <View style={estilos.controleItem}>
          <TouchableOpacity style={estilos.botaoEncerrar} onPress={encerrar}>
            <Text style={estilos.botaoControleIcone}>📵</Text>
          </TouchableOpacity>
          <Text style={estilos.controleLabel}>Encerrar</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundoEscuro,
  },
  gradienteTopo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#1a3d1c',
    opacity: 0.9,
  },
  gradienteFundo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: Colors.fundoEscuro,
  },
  conteudo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Espacamento.xl,
  },
  modoBadge: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: Espacamento.md,
    paddingVertical: Espacamento.xs,
    borderRadius: BorderRadius.full,
    marginBottom: Espacamento.xl,
  },
  modoTexto: {
    color: Colors.branco,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'sans-serif',
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Espacamento.xl,
  },
  anel: {
    position: 'absolute',
    width: 148,
    height: 148,
    borderRadius: 74,
    borderWidth: 2,
    borderColor: 'rgba(76, 175, 80, 0.4)',
  },
  nome: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.branco,
    fontFamily: 'serif',
    marginBottom: Espacamento.sm,
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    fontFamily: 'sans-serif',
    marginBottom: Espacamento.xl,
  },
  alternarModo: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.xl,
    padding: 4,
    gap: 4,
  },
  botaoModo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Espacamento.lg,
    paddingVertical: Espacamento.sm,
    borderRadius: BorderRadius.lg,
    gap: Espacamento.xs,
  },
  botaoModoAtivo: {
    backgroundColor: Colors.secundaria,
  },
  botaoModoIcone: {
    fontSize: 16,
  },
  botaoModoTexto: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'sans-serif',
  },
  botaoModoTextoAtivo: {
    color: Colors.branco,
  },
  controles: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: Espacamento.lg,
    paddingBottom: Espacamento.xxl,
    paddingTop: Espacamento.lg,
  },
  controleItem: {
    alignItems: 'center',
    gap: Espacamento.xs,
  },
  botaoControle: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoControleAtivo: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  botaoControleIcone: {
    fontSize: 26,
  },
  botaoEncerrar: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.encerrar,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controleLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
});
