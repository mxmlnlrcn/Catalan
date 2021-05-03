import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import * as firebase from "firebase";
import { ImageBackground } from "react-native";

export default class GalonScreen extends React.Component {
  state = {
    email: "",
    displayName: "",
    cilindro: "",
    nivel: 10,
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });

    firebase
      .firestore()
      .collection("Pedidos")
      .where("Email", "==", email)
      .get()
      .then((snapshot) => {
        this.setState({
          cilindro: snapshot.docs[0].data().Pedido.split(" ")[1]
        })
      })

    
  }

  cambiar = () => {
    Alert.prompt(
      "Ingresa los kilos de tu cilindro",
      "Respuestas posibles: 2, 5, 11, 15, 45",
      [
        {
          text: "Actualizar",
          onPress: (tamaño) => {
            if (tamaño == 2 || tamaño == 5 || tamaño == 11 || tamaño == 15 || tamaño == 45) {
              this.setState({
                cilindro: tamaño
              })
              
            }
            else {
              Alert.alert(
                "Número invalido",
                "Respuestas posibles: 2, 5, 11, 15, 45",
                [{
                  text: "Ok"
                }]
              )
            }
          }
        },
        {
          text: "Cancelar"
        }
      ]
    )
  }

  render() {
    const { cilindro, nivel } = this.state;
    return (

      <View style={styles.container}>
        
        <View style={{margintop: 30}}>
          <Text style={styles.titulo1}>Cantidad disponible del cilindro</Text>
          <View style={styles.contenedor1}>
            <ImageBackground style={styles.cilindro} source={require("./assets/gas-cylinder-outline.png")}>
              <View style={cuadrado(nivel)}>
                <Text style={styles.porcentaje}> {nivel}%</Text>
              </View>
            </ImageBackground>
          </View>      
          <Text style={styles.cantidad}>{Math.round(nivel*cilindro/10)/10} kg / {cilindro} kg</Text>
          <TouchableOpacity onPress={this.cambiar}>
            <Text style={styles.editar}>Editar tamaño del cilindro</Text>
          </TouchableOpacity>
          <Text style={styles.titulo2}>Consumo promedio</Text>
          <View style={styles.contenedor2}>
            <Text style={styles.consumo}>1,05 kg/dia</Text>
          </View>
        </View>

      </View>
    );
  }
}

const cuadrado = function(nivel) {
  if (nivel > 15 && nivel <= 100) {
    return {
      backgroundColor:"#1aa3ff",
      width: 120,
      marginLeft: 12,
      borderRadius:15,
      justifyContent: "center",
      height: nivel+20,
      marginTop: 167-nivel,
    }
  }
  else if(nivel <= 15 && nivel >= 0) {
    Alert.alert(
      "Nivel bajo",
      "Se recomienda pedir un nuevo cilindro"
    )
    return {
      backgroundColor:"red",
      width: 120,
      marginLeft: 12,
      borderRadius:15,
      justifyContent: "center",
      height: 35,
      marginTop: 152,
    }
  }
  else if(nivel > 100) {
    return {
      backgroundColor:"#1aa3ff",
      width: 120,
      marginLeft: 12,
      borderRadius:15,
      justifyContent: "center",
      height: 120,
      marginTop: 67,
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  titulo1: {
    marginTop: 22,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    justifyContent: "center"
  },
  titulo2: {
    marginHorizontal: 20,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  contenedor1: {
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: "#E8E8E8",
    borderRadius: 5,
    height: 250,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  contenedor2: {
    marginHorizontal: 30,
    backgroundColor: "#E8E8E8",
    borderRadius: 5,
    height: 90,
    justifyContent: "center",
    marginTop: 15,
  },
  cilindro: {
    height: 220,
    width: 220,
    marginLeft: 70,
  },
  porcentaje: {
    fontSize: 30,
    fontWeight: "800",
    color: "white",
    textAlign: "center",

  },
  cantidad: {
    fontSize: 40,
    fontWeight: "800",
    textAlign: "center",
  },
  editar: {
    fontSize: 12,
    fontWeight: "100",
    color: "red",
    textAlign: "center",
    marginTop: 5,
  },
  consumo: {
    fontSize: 40,
    fontWeight: "800",
    textAlign: "center"

  },

});
