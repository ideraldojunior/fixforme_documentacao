import { Pressable, Text, TextInput, View, Image } from "react-native";
import { styles } from "../styles";

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.formTitle}>Recuperar Senha</Text>

      <TextInput
        style={styles.formInput}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
      />

      <Pressable
        android_ripple={{ color: "limegreen", foreground: true }}
        style={styles.formButton}
      >
        <Text style={styles.textButton}>Enviar recuperação</Text>
      </Pressable>

      <Pressable style={styles.subButton} onPress={() => navigation.goBack()}>
        <Text style={styles.subTextButton}>Voltar para login</Text>
      </Pressable>
    </View>
  );
}
