import { Pressable, Text, TextInput, View, Image } from "react-native";
import { styles } from "../styles";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.formTitle}>Novo Usuário</Text>

      <TextInput style={styles.formInput} placeholder="Nome" />

      <TextInput
        style={styles.formInput}
        placeholder="E-mail"
        keyboardType="email-address"
      />

      <TextInput style={styles.formInput} placeholder="Senha" secureTextEntry />

      <Pressable
        android_ripple={{ color: "limegreen", foreground: true }}
        style={styles.formButton}
      >
        <Text style={styles.textButton}>Cadastrar</Text>
      </Pressable>

      <Pressable style={styles.subButton} onPress={() => navigation.goBack()}>
        <Text style={styles.subTextButton}>Voltar para login</Text>
      </Pressable>
    </View>
  );
}
