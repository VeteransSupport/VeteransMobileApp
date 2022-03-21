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
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={this.props.handleLogoutClick}>
          <Text style={styles.logoutText}>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // To center horizontally on screen
    width: '60%',
    left: '20%',
  },

  logoutText: {
    color: '#fff',
  },

  logoutBtn: {
    width: '80%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#000',
  },
});

export default Logout;