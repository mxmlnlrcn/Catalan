import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.foto}>
          <Image
            source={require("./assets/logo.png")}
            style={{ height: 120, width: 120 }}
          />
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              onSubmitEditing={ () => {this.secondTextInput.focus();}}
              blurOnSubmit={false}
              returnKeyType="next"
              style={styles.input}
              autoCapitalize="none"  
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Contraseña</Text>
            <TextInput
              ref={(input) => {this.secondTextInput = input; }}
              style={styles.input}
              secureTextEntry
              returnKeyType="send"
              returnKeyLabel= "entrar"
              autoCapitalize="none"
              onSubmitEditing={this.handleLogin}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.Entrar}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            ¿No tienes cuenta?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>
              Registrate
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={{height: 300}}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#1aa3ff",
    borderRadius: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  Entrar: {
    color: "#FFF",
    fontWeight: "500",
  },
  logo: {
    width: 40,
    height: 40,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  foto: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
