import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";

const servicos = [
  {
    id: "1",
    titulo: "Pintura residencial",
    status: "andamento",
    valor: "R$ 850,00",
    contratante: "Maria Souza",
    prestador: "João Pereira",
    avaliacao: "Ainda não avaliado",
    descricao: "Serviço de pintura da sala e cozinha.",
  },
  {
    id: "2",
    titulo: "Conserto elétrico",
    status: "andamento",
    valor: "R$ 250,00",
    contratante: "Carlos Lima",
    prestador: "Pedro Santos",
    avaliacao: "Ainda não avaliado",
    descricao: "Troca de tomadas e revisão da fiação.",
  },
  {
    id: "3",
    titulo: "Limpeza pós-obra",
    status: "concluido",
    valor: "R$ 400,00",
    contratante: "Ana Martins",
    prestador: "Clara Oliveira",
    avaliacao: "5 estrelas",
    descricao: "Limpeza completa após reforma.",
  },
];

export default function App() {
  const [abaSelecionada, setAbaSelecionada] = useState("andamento");
  const [servicoSelecionado, setServicoSelecionado] = useState(null);

  const listaFiltrada = servicos.filter(
    (servico) => servico.status === abaSelecionada
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Serviços</Text>
      <Text style={styles.subtitulo}>
        Visualize serviços em andamento e histórico
      </Text>

      <View style={styles.abas}>
        <TouchableOpacity
          style={[
            styles.aba,
            abaSelecionada === "andamento" && styles.abaAtiva,
          ]}
          onPress={() => setAbaSelecionada("andamento")}
        >
          <Text
            style={[
              styles.textoAba,
              abaSelecionada === "andamento" && styles.textoAbaAtiva,
            ]}
          >
            Em andamento
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.aba,
            abaSelecionada === "concluido" && styles.abaAtiva,
          ]}
          onPress={() => setAbaSelecionada("concluido")}
        >
          <Text
            style={[
              styles.textoAba,
              abaSelecionada === "concluido" && styles.textoAbaAtiva,
            ]}
          >
            Histórico
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listaFiltrada}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setServicoSelecionado(item)}
          >
            <Text style={styles.nomeServico}>{item.titulo}</Text>
            <Text style={styles.info}>Prestador: {item.prestador}</Text>
            <Text style={styles.info}>Valor: {item.valor}</Text>

            <View
              style={[
                styles.status,
                item.status === "andamento"
                  ? styles.statusAndamento
                  : styles.statusConcluido,
              ]}
            >
              <Text style={styles.textoStatus}>
                {item.status === "andamento" ? "Em andamento" : "Concluído"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!servicoSelecionado} animationType="slide" transparent>
        <View style={styles.fundoModal}>
          <View style={styles.modal}>
            <ScrollView>
              <Text style={styles.tituloModal}>Detalhes do Serviço</Text>

              {servicoSelecionado && (
                <>
                  <Text style={styles.nomeModal}>
                    {servicoSelecionado.titulo}
                  </Text>

                  <Text style={styles.detalhe}>
                    <Text style={styles.negrito}>Descrição: </Text>
                    {servicoSelecionado.descricao}
                  </Text>

                  <Text style={styles.detalhe}>
                    <Text style={styles.negrito}>Valor: </Text>
                    {servicoSelecionado.valor}
                  </Text>

                  <Text style={styles.detalhe}>
                    <Text style={styles.negrito}>Contratante: </Text>
                    {servicoSelecionado.contratante}
                  </Text>

                  <Text style={styles.detalhe}>
                    <Text style={styles.negrito}>Prestador: </Text>
                    {servicoSelecionado.prestador}
                  </Text>

                  <Text style={styles.detalhe}>
                    <Text style={styles.negrito}>Avaliação: </Text>
                    {servicoSelecionado.avaliacao}
                  </Text>
                </>
              )}

              <TouchableOpacity
                style={styles.botaoFechar}
                onPress={() => setServicoSelecionado(null)}
              >
                <Text style={styles.textoBotao}>Fechar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
    paddingTop: 55,
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
  abas: {
    flexDirection: "row",
    backgroundColor: "#E6EAF0",
    borderRadius: 12,
    padding: 5,
    marginBottom: 20,
  },
  aba: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  abaAtiva: {
    backgroundColor: "#2F80ED",
  },
  textoAba: {
    color: "#444",
    fontWeight: "600",
  },
  textoAbaAtiva: {
    color: "#FFF",
  },
  lista: {
    paddingBottom: 20,
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
  status: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  statusAndamento: {
    backgroundColor: "#FFF3CD",
  },
  statusConcluido: {
    backgroundColor: "#D4EDDA",
  },
  textoStatus: {
    fontWeight: "bold",
    color: "#333",
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
  nomeModal: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#2F80ED",
    marginBottom: 15,
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
  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});