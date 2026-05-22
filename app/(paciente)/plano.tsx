import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../../components/ui/Button';
import { Colors, Espacamento, BorderRadius, Tipografia, Sombra } from '../../constants/theme';

// Dados mockados do plano atual do usuário
const dadosPlano = {
  assinante: false,
  chamadasUsadas: 3,
  chamadasTotal: 5,
  renovacaoEm: '15/08/2025',
};

// Benefícios do plano Premium
const beneficios = [
  { icone: '♾️', texto: 'Chamadas ilimitadas de voz e vídeo' },
  { icone: '⚡', texto: 'Prioridade no suporte e atendimento' },
  { icone: '📋', texto: 'Histórico completo de sessões' },
  { icone: '🔔', texto: 'Lembretes personalizados de sessão' },
  { icone: '🔒', texto: 'Criptografia de ponta a ponta' },
  { icone: '📊', texto: 'Relatórios de progresso mensais' },
];

export default function Plano() {
  const router = useRouter();
  const { assinante, chamadasUsadas, chamadasTotal, renovacaoEm } = dadosPlano;

  // Percentual de uso das chamadas
  const percentualUso = chamadasUsadas / chamadasTotal;
  const chamadasRestantes = chamadasTotal - chamadasUsadas;

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TouchableOpacity style={estilos.botaoVoltar} onPress={() => router.back()}>
          <Text style={estilos.textoVoltar}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={estilos.titulo}>Meu Plano</Text>

        {/* Banner de uso atual */}
        <View style={estilos.bannerUso}>
          <View style={estilos.bannerTopo}>
            <Text style={estilos.bannerTitulo}>
              {assinante ? '✅ Plano Premium ativo' : '📊 Uso este mês'}
            </Text>
            {assinante && (
              <Text style={estilos.renovacao}>Renova em {renovacaoEm}</Text>
            )}
          </View>

          {!assinante && (
            <>
              <Text style={estilos.usoTexto}>
                Você usou{' '}
                <Text style={estilos.usoDestaque}>{chamadasUsadas}</Text>
                {' '}de{' '}
                <Text style={estilos.usoDestaque}>{chamadasTotal}</Text>
                {' '}chamadas este mês
              </Text>

              {/* Barra de progresso */}
              <View style={estilos.barraContainer}>
                <View
                  style={[
                    estilos.barraPreenchimento,
                    {
                      width: `${percentualUso * 100}%`,
                      backgroundColor:
                        percentualUso >= 0.8 ? Colors.aviso : Colors.primaria,
                    },
                  ]}
                />
              </View>

              <Text style={estilos.restantesTexto}>
                {chamadasRestantes > 0
                  ? `${chamadasRestantes} chamada${chamadasRestantes > 1 ? 's' : ''} restante${chamadasRestantes > 1 ? 's' : ''}`
                  : '⚠️ Você atingiu o limite do plano gratuito'}
              </Text>
            </>
          )}
        </View>

        {/* Card do plano Premium */}
        {!assinante && (
          <View style={estilos.cardPremium}>
            {/* Badge de destaque */}
            <View style={estilos.badgePremium}>
              <Text style={estilos.badgePremiumTexto}>⭐ MAIS POPULAR</Text>
            </View>

            <Text style={estilos.premiumTitulo}>Plano Premium</Text>
            <View style={estilos.precoContainer}>
              <Text style={estilos.precoMoeda}>R$</Text>
              <Text style={estilos.precoValor}>49</Text>
              <Text style={estilos.precoCentavos}>,90</Text>
              <Text style={estilos.precoPeriodo}>/mês</Text>
            </View>
            <Text style={estilos.precoAnual}>
              ou R$ 479,90/ano — economize 20%
            </Text>

            {/* Lista de benefícios */}
            <View style={estilos.beneficios}>
              {beneficios.map((b, i) => (
                <View key={i} style={estilos.beneficioItem}>
                  <Text style={estilos.beneficioIcone}>{b.icone}</Text>
                  <Text style={estilos.beneficioTexto}>{b.texto}</Text>
                </View>
              ))}
            </View>

            {/* Botão de assinatura */}
            <Button
              titulo="Assinar agora"
              onPress={() => {}}
              variante="primary"
              estilo={estilos.botaoAssinar}
            />

            <Text style={estilos.cancelamento}>
              Cancele quando quiser · Sem fidelidade
            </Text>
          </View>
        )}

        {/* Estado: já assinante */}
        {assinante && (
          <View style={estilos.cardAssinante}>
            <Text style={estilos.assinanteTitulo}>✅ Você é Premium!</Text>
            <Text style={estilos.assinanteTexto}>
              Aproveite todos os benefícios ilimitados do Cedro.
            </Text>
            <View style={estilos.beneficios}>
              {beneficios.map((b, i) => (
                <View key={i} style={estilos.beneficioItem}>
                  <Text style={estilos.beneficioIcone}>{b.icone}</Text>
                  <Text style={estilos.beneficioTexto}>{b.texto}</Text>
                </View>
              ))}
            </View>
            <Button
              titulo="Gerenciar assinatura"
              onPress={() => {}}
              variante="secondary"
            />
          </View>
        )}

        {/* Plano gratuito — comparativo */}
        {!assinante && (
          <View style={estilos.planoGratuito}>
            <Text style={estilos.planoGratuitoTitulo}>Plano Gratuito (atual)</Text>
            <Text style={estilos.planoGratuitoTexto}>
              • {chamadasTotal} chamadas por mês{'\n'}
              • Chat ilimitado{'\n'}
              • Suporte padrão
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundo,
  },
  conteudo: {
    padding: Espacamento.lg,
    paddingBottom: Espacamento.xxl,
  },
  botaoVoltar: {
    alignSelf: 'flex-start',
    paddingVertical: Espacamento.sm,
    marginBottom: Espacamento.md,
  },
  textoVoltar: {
    ...Tipografia.corpoSecundario,
    fontWeight: '600',
    color: Colors.primaria,
  },
  titulo: {
    ...Tipografia.titulo,
    marginBottom: Espacamento.xl,
  },
  bannerUso: {
    backgroundColor: Colors.branco,
    borderRadius: BorderRadius.lg,
    padding: Espacamento.lg,
    marginBottom: Espacamento.xl,
    borderWidth: 1,
    borderColor: Colors.borda,
    ...Sombra.leve,
  },
  bannerTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Espacamento.md,
  },
  bannerTitulo: {
    ...Tipografia.label,
  },
  renovacao: {
    ...Tipografia.pequeno,
    color: Colors.primaria,
    fontWeight: '600',
  },
  usoTexto: {
    ...Tipografia.corpo,
    marginBottom: Espacamento.md,
  },
  usoDestaque: {
    fontWeight: '700',
    color: Colors.primaria,
  },
  barraContainer: {
    height: 10,
    backgroundColor: Colors.verdeClaro,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Espacamento.sm,
  },
  barraPreenchimento: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  restantesTexto: {
    ...Tipografia.corpoSecundario,
    fontWeight: '600',
  },
  cardPremium: {
    backgroundColor: Colors.branco,
    borderRadius: BorderRadius.xl,
    padding: Espacamento.xl,
    marginBottom: Espacamento.lg,
    borderWidth: 2,
    borderColor: Colors.primaria,
    ...Sombra.forte,
    overflow: 'hidden',
  },
  badgePremium: {
    backgroundColor: Colors.primaria,
    alignSelf: 'flex-start',
    paddingHorizontal: Espacamento.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    marginBottom: Espacamento.md,
  },
  badgePremiumTexto: {
    color: Colors.branco,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    fontFamily: 'sans-serif',
  },
  premiumTitulo: {
    ...Tipografia.titulo,
    marginBottom: Espacamento.sm,
  },
  precoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  precoMoeda: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primaria,
    fontFamily: 'sans-serif',
    marginBottom: 6,
  },
  precoValor: {
    fontSize: 52,
    fontWeight: '900',
    color: Colors.primaria,
    fontFamily: 'sans-serif',
    lineHeight: 56,
  },
  precoCentavos: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primaria,
    fontFamily: 'sans-serif',
    marginBottom: 8,
  },
  precoPeriodo: {
    fontSize: 16,
    color: Colors.textoSecundario,
    fontFamily: 'sans-serif',
    marginBottom: 8,
    marginLeft: 4,
  },
  precoAnual: {
    ...Tipografia.corpoSecundario,
    marginBottom: Espacamento.xl,
  },
  beneficios: {
    gap: Espacamento.md,
    marginBottom: Espacamento.xl,
  },
  beneficioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamento.md,
  },
  beneficioIcone: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
  beneficioTexto: {
    ...Tipografia.corpo,
    flex: 1,
  },
  botaoAssinar: {
    marginBottom: Espacamento.md,
  },
  cancelamento: {
    ...Tipografia.pequeno,
    textAlign: 'center',
  },
  cardAssinante: {
    backgroundColor: Colors.verdeClaro,
    borderRadius: BorderRadius.xl,
    padding: Espacamento.xl,
    marginBottom: Espacamento.lg,
    borderWidth: 1,
    borderColor: Colors.borda,
  },
  assinanteTitulo: {
    ...Tipografia.subtitulo,
    color: Colors.primaria,
    marginBottom: Espacamento.sm,
  },
  assinanteTexto: {
    ...Tipografia.corpoSecundario,
    marginBottom: Espacamento.xl,
  },
  planoGratuito: {
    backgroundColor: Colors.branco,
    borderRadius: BorderRadius.lg,
    padding: Espacamento.lg,
    borderWidth: 1,
    borderColor: Colors.borda,
  },
  planoGratuitoTitulo: {
    ...Tipografia.label,
    marginBottom: Espacamento.sm,
    color: Colors.textoSecundario,
  },
  planoGratuitoTexto: {
    ...Tipografia.corpoSecundario,
    lineHeight: 24,
  },
});
