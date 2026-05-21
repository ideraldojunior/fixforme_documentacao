import { Ionicons } from '@expo/vector-icons'; // Para os ícones
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. No seu JSX, mude o estilo do ScrollView e adicione uma View interna para o conteúdo:
export default function ProviderProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="black" />
        <View style={styles.logoFix}>
          <Image source={require('../../assets/images/image-removebg-preview(1).png')}
            style={styles.FixForMeImage}
          />
        </View>
        <Ionicons name="notifications" size={28} color="black" />
      </View>

      {/* Bloco de Voltar */}
      <View style={styles.backSection}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Perfil do prestador</Text>
      </View>

      {/* Uma View para agrupar o que vai centralizado na tela */}
      <View style={styles.centerContent}>
        
        {/* Foto do Perfil */}
        <View style={styles.avatarContainer}>
          <Image 
           source={require('../../assets/images/clebao.webp')}
            style={styles.profileImage}
          />
        </View>

        {/* Bloco de Informações */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Nome:</Text> Cleber Santana
          </Text>
          
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Email:</Text> cleber@gmail.com
          </Text>
          
          {/* Linha da Avaliação em formato de linha (row) */}
          <View style={styles.ratingRow}>
            <Text style={styles.boldText}>Avaliação: </Text>
            <Ionicons name="star" size={18} color="#f1c40f" />
            <Ionicons name="star" size={18} color="#f1c40f" />
            <Ionicons name="star" size={18} color="#f1c40f" />
            <Ionicons name="star" size={18} color="#f1c40f" />
            <Ionicons name="star-half" size={18} color="#f1c40f" />
            <Text style={styles.ratingValue}> 4.5</Text>
          </View>

          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Especializações:</Text>
          </Text>
          
          <Text style={styles.subInfoText}>Azulegista</Text>
          <Text style={styles.subInfoText}>Pintor</Text>
        </View>

        {/* Bloco do Botão */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar Serviço</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // 1. A base de toda a tela
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingTop: 60,       // Espaço para não cobrir a barra de status do celular
    paddingHorizontal: 24, // Margem lateral idêntica à do protótipo
    paddingBottom: 40,
  },

  // 2. O Cabeçalho (Menu, Logo, Notificação)
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  logoImage: {
    width: 90,            // Tamanho ideal para o topo
    height: 45,
    resizeMode: 'contain',
  },

  // 3. Seção "Voltar" e Título da Tela
  backSection: {
    alignItems: 'flex-start', // Garante que a seta fique totalmente na esquerda
    width: '100%',
    marginBottom: 35,
  },
  backText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginTop: 10,        // Espaço entre a seta e o texto "Perfil do prestador"
  },

  // 4. Container do Miolo (Foto + Infos + Botão)
  centerContent: {
    alignItems: 'center', // Centraliza a foto e o botão no meio da tela
    width: '100%',
  },
  avatarContainer: {
    marginBottom: 40,     // Empurra as informações para baixo dando respiro
  },
  profileImage: {
    width: 180,           // Foto imponente igual ao print
    height: 180,
    borderRadius: 24,     // Cantos levemente arredondados
  },

  // 5. Bloco de Textos (O grande truque de alinhamento)
  infoContainer: {
    width: '100%',        // Ocupa a largura total para alinhar os textos à esquerda
    alignItems: 'flex-start', // Alinha Nome, Email, etc., perfeitamente à esquerda
    paddingHorizontal: 10,
    marginBottom: 45,     // Espaço generoso antes do botão
  },
  infoText: {
    fontSize: 22,
    color: '#000',
    lineHeight: 32,       // Dá o espaçamento vertical natural entre as linhas de texto
  },
  boldText: {
    fontWeight: 'bold',
  },
  
  // Linha especial da Avaliação
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginLeft: 8,        // Afasta as estrelas da palavra "Avaliação:"
    marginRight: 12,       // Afasta as estrelas do número "4.5"
    gap: 2,               // Gruda as estrelinhas uma na outra
  },
  ratingValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },

  // 6. O Botão "Enviar Serviço"
  button: {
    backgroundColor: '#9c27b0', // Roxo vivo do protótipo
    width: '80%',               // Largura proporcional à imagem
    paddingVertical: 16,        // Botão mais gordinho e fácil de clicar
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    
    // Sombra para dar o efeito de relevo (Card)
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
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
    paddingLeft: 5, // Dá um leve recuo para a esquerda se você quiser alinhar igual ao print
  },

  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60', 
  },

  FixForMeImage: {
    width: 70,                // Ajuste fino no tamanho para casar com a altura do texto
    height: 70,
    resizeMode: 'contain',
  },

  logoFix: {    
    alignItems: 'center',     // Alinha verticalmente os dois no meio
    justifyContent: 'center', // Centraliza o bloco do logo no meio do Header
    gap: 6,                   // Cria um espacinho perfeito entre a imagem e o texto
  },
});
