import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as firebase from "firebase";

export default class MenuScreen extends React.Component {
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
      <View style={styles.bar}>
        <TouchableOpacity
          style={styles.volver}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Image
            source={require("./assets/previous.png")}
            style={{ height: 40, width: 40 }}
          />
        </TouchableOpacity>

        <View style={styles.foto}>
          <Image
            source={require("./assets/logo.png")}
            style={{ height: 85, width: 85 }}
          />
        </View>

        <View style={styles.volver}></View>
      </View>
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
});
