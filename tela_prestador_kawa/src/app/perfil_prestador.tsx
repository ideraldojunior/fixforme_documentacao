import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { buscarPrestadorPorId, enviarServico, Prestador } from './api';
// ⚠️ Ajuste o caminho do import acima ('../services/api') conforme onde você
// salvar o arquivo api.ts dentro do seu projeto.

const PLACEHOLDER_AVATAR = 'https://via.placeholder.com/180x180.png?text=Foto';

// ⚠️ Usamos um Modal próprio em vez de Alert.alert porque o Alert do React
// Native NÃO funciona no Expo Web (react-native-web não implementa essa API
// — a chamada simplesmente não faz nada). Esse Modal funciona igual em web,
// iOS e Android.
type Feedback = {
  tipo: 'sucesso' | 'erro' | 'aviso';
  titulo: string;
  mensagem: string;
} | null;

export default function ProviderProfileScreen() {
  // id vem da tela de busca (index). descricao/valor são o serviço que o
  // usuário já tinha preenchido antes de escolher o prestador.
  const { id, descricao, valor } = useLocalSearchParams<{
    id: string;
    descricao?: string;
    valor?: string;
  }>();

  const router = useRouter();

  const [prestador, setPrestador] = useState<Prestador | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    if (!id) return;

    const carregarPrestador = async () => {
      setCarregando(true);
      setErro(null);
      try {
        const dados = await buscarPrestadorPorId(id);
        setPrestador(dados);
      } catch (e) {
        console.log('Erro ao buscar prestador:', e);
        setErro('Não foi possível carregar os dados do prestador.');
      } finally {
        setCarregando(false);
      }
    };

    carregarPrestador();
  }, [id]);

  const renderEstrelas = (avaliacao: number) => {
    const estrelasCheias = Math.floor(avaliacao);
    const temMeia = avaliacao - estrelasCheias >= 0.5;
    const estrelas = [];

    for (let i = 0; i < estrelasCheias; i++) {
      estrelas.push(<Ionicons key={`cheia-${i}`} name="star" size={18} color="#f1c40f" />);
    }
    if (temMeia) {
      estrelas.push(<Ionicons key="meia" name="star-half" size={18} color="#f1c40f" />);
    }

    return estrelas;
  };

  const handleEnviarServico = async () => {
    if (!prestador) return;

    if (!descricao || !valor) {
      setFeedback({
        tipo: 'aviso',
        titulo: 'Faltam informações',
        mensagem: 'Volte à busca e preencha a descrição e o valor do serviço antes de enviar.',
      });
      return;
    }

    setEnviando(true);
    try {
      await enviarServico({
        prestadorId: prestador.id,
        descricao: String(descricao),
        valor: parseFloat(String(valor).replace(',', '.')),
      });
      setFeedback({
        tipo: 'sucesso',
        titulo: 'Oferta enviada!',
        mensagem: `Sua proposta foi enviada para ${prestador.nome} com sucesso.`,
      });
    } catch (e) {
      console.log('Erro ao enviar serviço:', e);
      setFeedback({
        tipo: 'erro',
        titulo: 'Erro',
        mensagem: 'Não foi possível enviar o serviço. Tente novamente.',
      });
    } finally {
      setEnviando(false);
    }
  };

  const handleFecharFeedback = () => {
    const foiSucesso = feedback?.tipo === 'sucesso';
    setFeedback(null);

    if (foiSucesso) {
      // router.replace (em vez de back) força o index a remontar do zero,
      // o que limpa a especialização pesquisada, a lista de resultados,
      // a descrição e o valor digitados.
      router.replace('/');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="black" />
        <View style={styles.logoFix}>
          <Image
            source={require('../../assets/images/image-removebg-preview(1).png')}
            style={styles.FixForMeImage}
          />
        </View>
        <Ionicons name="notifications" size={28} color="black" />
      </View>

      <TouchableOpacity style={styles.backSection} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Perfil do prestador</Text>
      </TouchableOpacity>

      {carregando && (
        <ActivityIndicator size="large" color="#9c27b0" style={{ marginTop: 60 }} />
      )}

      {!carregando && erro && (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{erro}</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {!carregando && !erro && prestador && (
        <View style={styles.centerContent}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: prestador.fotoUrl || PLACEHOLDER_AVATAR }}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Nome:</Text> {prestador.nome}
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Email:</Text> {prestador.email}
            </Text>

            <View style={styles.ratingRow}>
              <Text style={styles.boldText}>Avaliação: </Text>
              {renderEstrelas(prestador.avaliacao)}
              <Text style={styles.ratingValue}> {prestador.avaliacao}</Text>
            </View>

            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Especializações:</Text>
            </Text>

            {prestador.especializacoes?.map((especializacao) => (
              <Text key={especializacao} style={styles.subInfoText}>
                {especializacao}
              </Text>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, enviando && styles.buttonDisabled]}
            onPress={handleEnviarServico}
            disabled={enviando}
          >
            {enviando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Enviar Serviço</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={!!feedback}
        transparent
        animationType="fade"
        onRequestClose={handleFecharFeedback}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Ionicons
              name={
                feedback?.tipo === 'sucesso'
                  ? 'checkmark-circle'
                  : feedback?.tipo === 'erro'
                  ? 'close-circle'
                  : 'alert-circle'
              }
              size={48}
              color={
                feedback?.tipo === 'sucesso'
                  ? '#27ae60'
                  : feedback?.tipo === 'erro'
                  ? '#c0392b'
                  : '#f39c12'
              }
              style={{ marginBottom: 12 }}
            />
            <Text style={styles.modalTitle}>{feedback?.titulo}</Text>
            <Text style={styles.modalMessage}>{feedback?.mensagem}</Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleFecharFeedback}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },

  backSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 35,
  },
  backText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginLeft: 10,
  },

  centerContent: {
    alignItems: 'center',
    width: '100%',
  },
  avatarContainer: {
    marginBottom: 40,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 24,
    backgroundColor: '#eee',
  },

  infoContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 45,
  },
  infoText: {
    fontSize: 22,
    color: '#000',
    lineHeight: 32,
  },
  boldText: {
    fontWeight: 'bold',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  ratingValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },

  button: {
    backgroundColor: '#9c27b0',
    width: '80%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  subInfoText: {
    fontSize: 22,
    color: '#000',
    lineHeight: 32,
    paddingLeft: 5,
  },

  errorText: {
    fontSize: 16,
    color: '#c0392b',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  FixForMeImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },

  logoFix: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: '#9c27b0',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});