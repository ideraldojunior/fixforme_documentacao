import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { buscarPrestadores, Prestador } from './api';
// ⚠️ Ajuste o caminho do import acima ('../services/api') conforme onde você
// salvar o arquivo api.ts dentro do seu projeto.

const PLACEHOLDER_AVATAR = 'https://via.placeholder.com/80x80.png?text=Foto';

/**
 * Tela de Busca
 * Permite que o usuário pesquise por especialização e veja, na mesma tela,
 * os prestadores que atendem esse critério. Também permite descrever o
 * serviço desejado e o valor, que serão levados para a tela de perfil
 * quando o usuário escolher um prestador.
 */
export default function SearchScreen() {
  const [especializacao, setEspecializacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const [prestadores, setPrestadores] = useState<Prestador[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [buscou, setBuscou] = useState(false);

  const router = useRouter();

  const handleSearch = async () => {
    setCarregando(true);
    setErro(null);
    setBuscou(true);

    try {
      const resultado = await buscarPrestadores(especializacao.trim());
      setPrestadores(resultado);
    } catch (e) {
      console.log('Erro ao buscar prestadores:', e);
      setErro('Não foi possível buscar os prestadores. Tente novamente.');
      setPrestadores([]);
    } finally {
      setCarregando(false);
    }
  };

  const handleSelecionarPrestador = (prestador: Prestador) => {
    // Leva o id do prestador escolhido + a descrição/valor do serviço
    // preenchidos aqui para a tela de perfil.
    router.push({
      pathname: '/perfil_prestador',
      params: {
        id: String(prestador.id),
        descricao,
        valor,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>O que você precisa?</Text>
        <Text style={styles.subtitle}>Pesquise pelo serviço desejado</Text>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Ex: Pintor, Azulejista..."
          value={especializacao}
          onChangeText={setEspecializacao}
          placeholderTextColor="#999"
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar Prestador</Text>
      </TouchableOpacity>

      <View style={styles.serviceContainer}>
        <Text style={styles.sectionLabel}>Descrição do serviço</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Descreva o que você precisa..."
          value={descricao}
          onChangeText={setDescricao}
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.sectionLabel}>Valor oferecido (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 150.00"
          value={valor}
          onChangeText={setValor}
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>

      {carregando && (
        <ActivityIndicator size="large" color="#9c27b0" style={{ marginTop: 30 }} />
      )}

      {!carregando && erro && <Text style={styles.errorText}>{erro}</Text>}

      {!carregando && !erro && buscou && prestadores.length === 0 && (
        <Text style={styles.emptyText}>
          Nenhum prestador encontrado para essa especialização.
        </Text>
      )}

      {!carregando && prestadores.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.sectionLabel}>Prestadores encontrados</Text>

          {prestadores.map((prestador) => (
            <TouchableOpacity
              key={prestador.id}
              style={styles.card}
              onPress={() => handleSelecionarPrestador(prestador)}
            >
              <Image
                source={{ uri: prestador.fotoUrl || PLACEHOLDER_AVATAR }}
                style={styles.cardAvatar}
              />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{prestador.nome}</Text>
                <Text style={styles.cardSpecs} numberOfLines={1}>
                  {prestador.especializacoes?.join(', ')}
                </Text>
                <View style={styles.cardRatingRow}>
                  <Ionicons name="star" size={14} color="#f1c40f" />
                  <Text style={styles.cardRating}>{prestador.avaliacao}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#9c27b0',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceContainer: {
    marginTop: 36,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    marginTop: 16,
  },
  textArea: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 15,
    fontSize: 16,
    color: '#000',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  errorText: {
    marginTop: 24,
    color: '#c0392b',
    fontSize: 15,
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 24,
    color: '#666',
    fontSize: 15,
    textAlign: 'center',
  },
  listContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardAvatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSpecs: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  cardRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardRating: {
    fontSize: 13,
    color: '#000',
    marginLeft: 4,
    fontWeight: '600',
  },
});
