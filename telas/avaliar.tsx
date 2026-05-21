import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
 
const NOTAS = [
  { valor: 1, label: "Ruim" },
  { valor: 2, label: "Regular" },
  { valor: 3, label: "Bom" },
  { valor: 4, label: "Muito bom" },
  { valor: 5, label: "Excelente" },
];
 
const servico = {
  id: "3",
  titulo: "Limpeza pós-obra",
  status: "concluido",
  valor: "R$ 400,00",
  contratante: "Ana Martins",
  prestador: "Clara Oliveira",
  descricao: "Limpeza completa após reforma.",
};
 
export default function App() {
  const [notaSelecionada, setNotaSelecionada] = useState(0);
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [avaliacaoEnviada, setAvaliacaoEnviada] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
 
  const labelNota =
    notaSelecionada > 0
      ? NOTAS.find((n) => n.valor === notaSelecionada)?.label
      : "Toque para avaliar";
 
  function handleEnviar() {
    if (notaSelecionada === 0) {
      Alert.alert("Atenção", "Por favor, selecione uma nota antes de enviar.");
      return;
    }
 
    setEnviando(true);
 
    setTimeout(() => {
      setEnviando(false);
      setAvaliacaoEnviada(true);
      setModalSucesso(true);
    }, 1000);
  }
 
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.titulo}>Avaliar serviço</Text>
      <Text style={styles.subtitulo}>
        Compartilhe sua experiência com o prestador
      </Text>
 
      <View style={styles.card}>
        <Text style={styles.nomeServico}>{servico.titulo}</Text>
        <Text style={styles.info}>Prestador: {servico.prestador}</Text>
        <Text style={styles.info}>Contratante: {servico.contratante}</Text>
        <Text style={styles.info}>Valor: {servico.valor}</Text>
        <Text style={styles.info}>Descrição: {servico.descricao}</Text>
 
        <View style={styles.statusConcluido}>
          <Text style={styles.textoStatus}>Concluído</Text>
        </View>
      </View>
 
      <Text style={styles.secaoTitulo}>Sua nota</Text>
 
      <View style={styles.card}>
        <View style={styles.estrelas}>
          {NOTAS.map((nota) => (
            <TouchableOpacity
              key={nota.valor}
              onPress={() => setNotaSelecionada(nota.valor)}
              disabled={avaliacaoEnviada}
            >
              <Text
                style={[
                  styles.estrela,
                  nota.valor <= notaSelecionada && styles.estrelaAtiva,
                ]}
              >
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
 
        <Text style={styles.labelNota}>{labelNota}</Text>
      </View>
 
      <Text style={styles.secaoTitulo}>Comentário</Text>
 
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Descreva sua experiência com o prestador..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          maxLength={300}
          value={comentario}
          onChangeText={setComentario}
          editable={!avaliacaoEnviada}
          textAlignVertical="top"
        />
        <Text style={styles.contador}>{comentario.length}/300</Text>
      </View>
 
      <TouchableOpacity
        style={[
          styles.botaoEnviar,
          (enviando || avaliacaoEnviada) && styles.botaoDesabilitado,
        ]}
        onPress={handleEnviar}
        disabled={enviando || avaliacaoEnviada}
      >
        <Text style={styles.textoBotao}>
          {enviando
            ? "Enviando..."
            : avaliacaoEnviada
            ? "Avaliação enviada"
            : "Enviar avaliação"}
        </Text>
      </TouchableOpacity>
 
      <Modal visible={modalSucesso} animationType="slide" transparent>
        <View style={styles.fundoModal}>
          <View style={styles.modal}>
            <Text style={styles.tituloModal}>Avaliação registrada!</Text>
 
            <Text style={styles.detalhe}>
              <Text style={styles.negrito}>Serviço: </Text>
              {servico.titulo}
            </Text>
 
            <Text style={styles.detalhe}>
              <Text style={styles.negrito}>Nota: </Text>
              {"★".repeat(notaSelecionada)}
              {"☆".repeat(5 - notaSelecionada)} —{" "}
              {NOTAS.find((n) => n.valor === notaSelecionada)?.label}
            </Text>
 
            {comentario.length > 0 && (
              <Text style={styles.detalhe}>
                <Text style={styles.negrito}>Comentário: </Text>
                {comentario}
              </Text>
            )}
 
            <Text style={styles.detalhe}>
              <Text style={styles.negrito}>Prestador: </Text>
              {servico.prestador}
            </Text>
 
            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={() => setModalSucesso(false)}
            >
              <Text style={styles.textoBotao}>Fechar</Text>
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
    backgroundColor: "#F5F7FA",
  },
  conteudo: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
  },
  subtitulo: {
    fontSize: 15,
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
  },
  nomeServico: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  statusConcluido: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
    backgroundColor: "#D4EDDA",
  },
  textoStatus: {
    fontWeight: "bold",
    color: "#333",
  },
  secaoTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
    marginLeft: 2,
  },
  estrelas: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 10,
  },
  estrela: {
    fontSize: 38,
    color: "#CCC",
  },
  estrelaAtiva: {
    color: "#F5A623",
  },
  labelNota: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  input: {
    fontSize: 14,
    color: "#333",
    minHeight: 90,
    lineHeight: 22,
  },
  contador: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 6,
  },
  botaoEnviar: {
    backgroundColor: "#2F80ED",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  botaoDesabilitado: {
    opacity: 0.5,
  },
  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  fundoModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 22,
    maxHeight: "80%",
  },
  tituloModal: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
  },
  detalhe: {
    fontSize: 15,
    color: "#444",
    marginBottom: 10,
    lineHeight: 22,
  },
  negrito: {
    fontWeight: "bold",
  },
  botaoFechar: {
    backgroundColor: "#2F80ED",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
});
