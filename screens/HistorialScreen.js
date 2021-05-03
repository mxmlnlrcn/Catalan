import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import * as firebase from "firebase";

export default class HistorialScreen extends React.Component {
  state = {
    email: "",
    displayName: "",
    orders: [],
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
        let ordenes = [];
        snapshot.docs.forEach( doc => {
          ordenes.push({
            Fecha: doc.data().Fecha,
            Pedido: doc.data().Pedido,
            Estado: doc.data().Estado,
          })
        })
        this.setState({
          orders: ordenes
        })

      }
      )
  }

  

  render() {
    return (
      <ScrollView style={styles.container}>

        <Text style={styles.Titulo}>Historial</Text>

        <View style={styles.subtitulos}>
          <View style={styles.subalin}>
            <Text style={styles.encabezado}>Fecha</Text>
          </View>
          <View style={styles.subalin2}>
            <Text style={styles.encabezado}>Pedido</Text>
          </View>
          <View style={styles.subalin}>
            <Text style={styles.encabezado}>Estado</Text>
          </View>
          
        </View>

        <View style={{marginTop: 10}}>
          {this.state.orders.map( post => {
            return(
            <View style={styles.barra}>
              <View style={{flex: 3}}>
                <Text style={styles.campo1}>{post.Fecha}</Text>
              </View>
              <View style={{flex: 4}}>
                <Text style={styles.campo2}>{post.Pedido}</Text>
              </View>
              <View style={{flex: 3}}>
                <Text style={styles.campo1}>{post.Estado}</Text> 
              </View>
            </View>
            )
          })}
        </View>

      </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  Titulo: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 35,
    fontWeight: "800",
  },
  subtitulos: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 20,
  },
  subalin: {
    flex: 3,
    alignContent: "center",
    justifyContent: "center",
  },
  subalin2: {
    flex: 4,
    alignContent: "center",
    justifyContent: "center",
  },
  encabezado: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "600",
  },
  barra: {
    flexDirection: "row",
    backgroundColor: "#E8E8E8",
    marginTop: 15,
    height: 40,
    marginHorizontal: 15,
    borderRadius: 10,
    justifyContent: "center",
  },
  campo1: {
    flex: 3,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10
  },
  campo2: {
    flex: 4,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10
  }
});
