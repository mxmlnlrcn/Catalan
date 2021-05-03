import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import * as firebase from "firebase";
import { SafeAreaView, StackActions } from "react-navigation";

export default class HomeScreen extends React.Component {
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
      
      <View style={styles.container}>
        
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <Image
            source={require("./assets/catalan2.png")}
            style={{ width: "100%", height: 204 }}
          />
        </View>
        <View>

        </View>
        <View style={styles.botones}>
          <TouchableOpacity
            style={styles.cuadrado}
            onPress={() => this.props.navigation.navigate("Galon")}
          >
            <Image
              source={require("./assets/gas.png")}
              style={{ height: 85, width: 85 , marginTop: 8 }}
            />
            <Text style={styles.texto_boton}>Mi Balon</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cuadrado}
            onPress={() => this.props.navigation.navigate("Pedir")}
          >
            <Image
              source={require("./assets/cart.png")}
              style={{ height: 85, width: 85 , marginTop: 8}}
            />

            <Text style={styles.texto_boton}>Pedir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.botones}>
          <TouchableOpacity
            style={styles.cuadrado}
            onPress={() => this.props.navigation.navigate("Historial")}
          >
            <Image
              source={require("./assets/history.png")}
              style={{ height: 100, width: 100 }}
            />
            <Text style={styles.texto_boton}>Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cuadrado}
            onPress={() => this.props.navigation.navigate("Preguntas")}
          >
            <Image
              source={require("./assets/question-mark.png")}
              style={{ height: 85, width: 85 , marginTop: 8}}
            />
            <Text style={styles.texto_boton}>Preguntas</Text>
          </TouchableOpacity>
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
  texto_boton: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  botones: {
    marginTop: 20,
    justifyContent: "space-around",
    flexDirection: "row",
    marginHorizontal: 15,
  },
  cuadrado: {
    height: 150,
    width: 150,
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
