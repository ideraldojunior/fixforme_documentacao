import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { styles } from "./styles";

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.logo} />
      <Text style={styles.formTitle}>Login no Sistema</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Informe o E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <TextInput
        style={styles.formInput}
        placeholder="Informe a Senha"
        autoCapitalize="none"
        secureTextEntry
      />
      <Pressable
        android_ripple={{ color: "limegreen", foreground: true }}
        style={styles.formButton}
      >
        <Text style={styles.textButton}>Logar</Text>
      </Pressable>
      <View style={styles.subContainer}>
        <Pressable style={styles.subButton}>
          <Text style={styles.subTextButton}>Esqueci a senha</Text>
        </Pressable>
        <Pressable style={styles.subButton}>
          <Text style={styles.subTextButton}>Novo usuário</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
