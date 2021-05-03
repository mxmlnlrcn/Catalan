import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

export default class PedirScreen extends React.Component {
  state = {
      email: "",
      displayName: "",
      Ciudad: "",
      Comuna: "",
      Direccion: "",
      Gas: ""
    };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });

    firebase
      .firestore()
      .collection("Users")
      .where("Email", "==", email)
      .get()
      .then((snapshot) => {
        this.setState({ Doc: snapshot.docs[0].id });
        firebase
          .firestore()
          .collection("Users")
          .doc(this.state.Doc)
          .get()
          .then((doc) => {
            this.setState({
              Ciudad: doc.data().City,
              Direccion: doc.data().Direction,
              Comuna: doc.data().Comuna,
            });
          });
      });
  };

  confirm(tipo) {
    let variable = [tipo][0]+ "\n"
    let datos = this.state.displayName + ", " + this.state.Direccion + ", " + this.state.Comuna + ", " + this.state.Ciudad
    let texto = "Deseas confirmar el pedido de: \n".concat(variable, " A: \n ", datos)
    console.log(this.state.displayName)
    console.log(this.state.Direccion)
    console.log(this.state.Comuna)
    console.log(this.state.Ciudad)
    if (this.state.displayName == undefined || this.state.Direccion == "" || this.state.Comuna == undefined || this.state.Ciudad == undefined) {
      Alert.alert(
        "Error",
        "Por favor completa tus datos",
        [
          {
            text: "Editar Datos",
            onPress: () => this.props.navigation.navigate("Account")
          },
          {
            text: "cancelar"
          }
        ]
      )
    }
    else {
      Alert.alert(
        "Confirmar pedido",
        texto,
        [
          {
            text: "Confirmar",
            onPress: () => {
              let dia = new Date().getDate();
              let mes = new Date().getMonth()+1;
              let año = new Date().getFullYear();
              let fecha = dia+"/"+mes+"/"+año
              firebase.firestore().collection("Pedidos").add({
                Email: this.state.email,
                Estado: "Solicitado",
                Fecha: fecha,
                Pedido: [tipo][0],
              })
              Alert.alert(
                "Pedido confirmado",
                "podrás ver su estado en Historial",
                [
                  {
                    text: "Ir a Historial",
                    onPress: () => {
                      this.props.navigation.navigate("Historial")
                    }
                  },
                  {
                    text: "Ver mas tarde"
                  }
                ]
              )
            },
          },
          {
            text: "Editar datos",
            onPress: () => {
              this.props.navigation.navigate("Account")
            }
          },
          {
            text: "Cancelar",
            style: "cancel",
          }
        ],
        { cancelable: false }
      );


    }

  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.Titulo}>Pide tu cilindro!</Text>
        <View style={styles.cuadros}>
          <View style={styles.gas}>
            <Image
              source={require("./assets/licuado-2kg.png")}
              style={{ height: 170, width: 170 }}
            />
          </View>
          <View style={styles.texto}>
            <Text style={styles.cilindros}>GASCO 2 kg</Text>
            <TouchableOpacity
              style={styles.btnpedir}
              onPress={this.confirm.bind(this, 'GASCO 2 kg')}
            >
              <Text style={styles.pedir}>Pedir</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cuadros}>
          <View style={styles.gas}>
            <Image
              source={require("./assets/licuado-11kg.png")}
              style={{ height: 170, width: 170 }}
            />
          </View>
          <View style={styles.texto}>
            <Text style={styles.cilindros}>GASCO 5 kg</Text>
            <TouchableOpacity
              style={styles.btnpedir}
              onPress={this.confirm.bind(this, 'GASCO 5 kg')}
            >
              <Text style={styles.pedir}>Pedir</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cuadros}>
          <View style={styles.gas}>
            <Image
              source={require("./assets/licuado-11kg.png")}
              style={{ height: 170, width: 170 }}
            />
          </View>
          <View style={styles.texto}>
            <Text style={styles.cilindros}>GASCO 11 kg</Text>
            <TouchableOpacity
              style={styles.btnpedir}
              onPress={this.confirm.bind(this, 'GASCO 11 kg')}
            >
              <Text style={styles.pedir}>Pedir</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cuadros}>
          <View style={styles.gas}>
            <Image
              source={require("./assets/licuado-2kg.png")}
              style={{ height: 170, width: 170 }}
            />
          </View>
          <View style={styles.texto}>
            <Text style={styles.cilindros}>GASCO 15 kg</Text>
            <TouchableOpacity
              style={styles.btnpedir}
              onPress={this.confirm.bind(this, 'GASCO 15 kg')}
            >
              <Text style={styles.pedir}>Pedir</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cuadros}>
          <View style={styles.gas}>
            <Image
              source={require("./assets/licuado-45kg.png")}
              style={{ height: 170, width: 170 }}
            />
          </View>
          <View style={styles.texto}>
            <Text style={styles.cilindros}>GASCO 45 kg</Text>
            <TouchableOpacity
              style={styles.btnpedir}
              onPress={this.confirm.bind(this, 'GASCO 45 kg')}
            >
              <Text style={styles.pedir}>Pedir</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 30 }}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  bar: {
    height: 70,
    backgroundColor: "#1aa3ff",
    flexDirection: "row",
  },
  foto: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  volver: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cuadros: {
    backgroundColor: "#E8E8E8",
    height: 180,
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: 20,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  gas: {
    flex: 2,
    alignContent: "center",
    alignItems: "center",
  },
  texto: {
    flex: 3,

    alignItems: "center",
  },
  cilindros: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  btnpedir: {
    marginTop: 30,
    backgroundColor: "#1aa3ff",
    borderRadius: 20,
    height: 40,
    width: 150,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  pedir: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  Titulo: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 30,
    fontWeight: "800",
  },
});
