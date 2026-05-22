import { Ionicons } from '@expo/vector-icons'; 
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function ProviderProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="black" />
        <View style={styles.logoFix}>
          <Image source={require('../../assets/images/image-removebg-preview(1).png')}
            style={styles.FixForMeImage}
          />
        </View>
        <Ionicons name="notifications" size={28} color="black" />
      </View>

      <View style={styles.backSection}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Perfil do prestador</Text>
      </View>

      <View style={styles.centerContent}>
        
        <View style={styles.avatarContainer}>
          <Image 
           source={require('../../assets/images/clebao.webp')}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Nome:</Text> Cleber Santana
          </Text>
          
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Email:</Text> cleber@gmail.com
          </Text>
          
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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar Serviço</Text>
        </TouchableOpacity>

      </View>
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
  logoImage: {
    width: 90,            
    height: 45,
    resizeMode: 'contain',
  },


  backSection: {
    alignItems: 'flex-start', 
    width: '100%',
    marginBottom: 35,
  },
  backText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginTop: 10,        
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
  starsContainer: {
    flexDirection: 'row',
    marginLeft: 8,        
    marginRight: 12,      
    gap: 2,               
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

  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60', 
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
});
