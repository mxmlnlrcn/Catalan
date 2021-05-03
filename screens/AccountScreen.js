import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import * as firebase from "firebase";

export default class AccountScreen extends React.Component {
  state = {
    email: "",
    Name: "",
    Ciudad: "",
    Direccion: "",
    Comuna: "",
    Telefono: "",
    Doc: "",
    estado: false,
    texto: "Editar datos",
    guardado: null,
  };

  componentDidMount() {
    const { email } = firebase.auth().currentUser;
    this.setState({ email});

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
              Name: doc.data().city,
              Ciudad: doc.data().City,
              Direccion: doc.data().Direction,
              Comuna: doc.data().Comuna,
              Telefono: doc.data().Telefono,
            });
          });
      });
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  update = () => {
    firebase.firestore().collection("Users").doc(this.state.Doc).update({
      Name: this.state.displayName,
      City: this.state.Ciudad,
      Direction: this.state.Direccion,
      Comuna: this.state.Comuna,
      Telefono: this.state.Telefono,
    });
  };

  cambiar = () => {
    if (this.state.estado) {
      this.setState({ estado: false, texto: "Editar datos" });
      this.update();
    } else {
      this.setState({ estado: true, texto: "Guardar" });
    }
  };

  setNombre = (text) => {
    this.setState({ displayName: text });
  };
  setCiudad = (text) => {
    this.setState({ Ciudad: text });
  };
  setDireccion = (text) => {
    this.setState({ Direccion: text });
  };
  setComuna = (text) => {
    this.setState({ Comuna: text });
  };
  setTelefono = (text) => {
    this.setState({ Telefono: text });
  };

  confirmar = () => {
    Alert.alert(
      "¿Realmente deseea cerrar sesión?",
      "te extrañaremos",
      [
        {
          text: "Salir",
          onPress: () => firebase.auth().signOut()
        },
        {
          text: "Cancelar"
        }
      ]

    )
  }

  render() {
    const { estado, texto } = this.state;

    return (
      <View style={styles.container}>

        

        <View style={{marginTop: 20}}>
          <Text style={styles.titulo1}>Datos personales</Text>
          <Text style={styles.campo}>Nombre:</Text>
          <TextInput
            style={styles.input}
            placeholder={this.state.displayName}
            underlineColorAndroid="transparent"
            editable={estado}
            onChangeText={this.setNombre}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.campo}>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder={this.state.Ciudad}
            underlineColorAndroid="transparent"
            editable={estado}
            onChangeText={this.setCiudad}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.campo}>Comuna</Text>
          <TextInput
            style={styles.input}
            placeholder={this.state.Comuna}
            underlineColorAndroid="transparent"
            editable={estado}
            onChangeText={this.setComuna}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.campo}>Direccion</Text>
          <TextInput
            style={styles.input}
            placeholder={this.state.Direccion}
            underlineColorAndroid="transparent"
            editable={estado}
            onChangeText={this.setDireccion}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.campo}>Telefono</Text>
          <TextInput
            style={styles.input}
            placeholder={this.state.Telefono}
            underlineColorAndroid="transparent"
            editable={estado}
            onChangeText={this.setTelefono}
          ></TextInput>
        </View>

        <TouchableOpacity onPress={this.cambiar}>
          <Text style={styles.editar}>{texto}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={this.confirmar}>
          <Text style={styles.Salir}>Cerrar sesion</Text>
        </TouchableOpacity>
        <View style={{height: 300}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo1: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 25,
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
  boton: {
    marginHorizontal: 100,
    backgroundColor: "#1aa3ff",
    borderRadius: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignContent: "center"
  },
  Salir: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
    alignSelf:"center"
  },
  campo: {
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: "bold",
  },
  editar: {
    textAlign: "center",
    marginTop: 5,
    marginHorizontal: 40,
    fontSize: 15,
    fontWeight: "100",
    color: "blue",
  },
  input: {
    marginHorizontal: 40,
    fontSize: 14,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    height: 30,
    marginBottom: 15,
  },
  guardado: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
