import React from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function TelaDeFotos() {
  return (
    <SafeAreaView style={estilos.areaSegura}>
      
      <Stack.Screen options={{ headerShown: false }} />

      <View style={estilos.cabecalhoTopo}>
        <View style={estilos.containerLogo}>
          <Ionicons name="color-filter-outline" size={30} color="#9C27B0" />
          <Text style={estilos.textoLogo}>FixForME</Text>
        </View>
        <Ionicons name="notifications-outline" size={28} color="black" />
      </View>

      <View style={estilos.linhaNavegacao}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={estilos.tituloTela}>Fotos</Text>
      </View>

      <View style={estilos.containerPrincipal}>
        <View style={estilos.espacoImagem}>
          <Ionicons name="camera" size={100} color="black" />
        </View>

        <Text style={estilos.rotulo}>Descrição</Text>
        <TextInput 
          style={estilos.entradaTexto} 
          multiline
          placeholder="Digite aqui..."
        />

        <Text style={estilos.rotulo}>Datas disponíveis</Text>
        <View style={estilos.containerGrade}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <View key={item} style={estilos.circulo} />
          ))}
        </View>

        <TouchableOpacity style={estilos.botaoEnviar}>
          <Text style={estilos.textoBotaoEnviar}>Enviar Proposta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cabecalhoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoLogo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  linhaNavegacao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  tituloTela: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginRight: 24, 
  },
  containerPrincipal: {
    padding: 20,
    alignItems: 'center',
  },
  espacoImagem: {
    width: '100%',
    height: 250,
    backgroundColor: '#D1D1D1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  rotulo: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  entradaTexto: {
    width: '100%',
    height: 60,
    backgroundColor: '#D1D1D1',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  containerGrade: {
    flexDirection: 'row', 
    flexWrap: 'wrap',    
    justifyContent: 'center',
    width: '60%',
    gap: 20, 
    marginBottom: 40,
  },
  circulo: {
    width: 35,
    height: 35,
    borderRadius: 20, 
    backgroundColor: '#D1D1D1',
  },
  botaoEnviar: {
    backgroundColor: '#FF4DB8',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textoBotaoEnviar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});