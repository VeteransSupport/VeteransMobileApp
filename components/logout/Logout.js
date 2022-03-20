import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'user@example.com',
      password: 'KLcXUsn990',
      authenticated: false,
      token: 'this is the tokennnnnn'
    }
  }

  async componentDidMount() {
  }

  render() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutBtn}>
          <Text
            style={styles.logoutText}
            onClick={this.props.handleLogoutClick}>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
      color: "#000"
  },

  logoutBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});

export default Logout;