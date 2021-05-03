import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as firebase from "firebase";

export default class PreguntasScreen extends React.Component {
  state = {
    email: "",
    displayName: "",
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });
  }

  render() {
    return (
      <View>

        <View >
          <Text style={styles.contacto}>Contacto</Text>

          <View style={styles.campo}>
            <Text style={styles.Titulo}>Call center</Text>
            <View style={styles.cajita}>
              <Text style={styles.texto}>600 600 9580</Text>
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.Titulo}>Soporte Tecnico</Text>
            <View style={styles.cajita}>
              <Text style={styles.texto}>600 600 9590</Text>
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.Titulo}>Email de ayuda</Text>
            <View style={styles.cajita}>
              <Text style={styles.texto}>ayuda@catalan.cl</Text>
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.Titulo}>Reclamos</Text>
            <View style={styles.cajita}>
              <Text style={styles.texto}>reclamos@catalan.cl</Text>
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.Titulo}>Sitio Web</Text>
            <View style={styles.cajita}>
              <Text style={styles.texto}>distribuidoracatalan.cl</Text>
            </View>
          </View>

          <Image
              source={require("./assets/logo.png")}
              style={styles.pie}
            />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contacto: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
  },
  campo: {
    marginTop: 20,
  },
  Titulo: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8

  },
  cajita: {
    marginHorizontal: 40,
    backgroundColor: "white",
    borderRadius: 5,
    height: 30,
    justifyContent: "center"

  },
  texto: {
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    justifyContent:"center"
  },
  pie: {
    height: 100,  
    width: 100,
    marginTop: 20,
    alignContent: "center",
    justifyContent:"center",
    alignSelf: "center"
  }

});
