import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authenticated: false,
      token: 'this is the tokennnnnn'
    }
  }

  componentDidMount() {
  }

  render() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Log-in</Text>

        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#aaa"
            onChangeText={this.props.handleEmail}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            onChangeText={this.props.handlePassword}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={this.props.handleLoginClick}>
          <Text
            style={styles.loginText}>
            LOGIN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          // onPress={this.props.handleSignupClick} // TODO: need to impliment
          >
          <Text
            style={styles.loginText}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // To center horizontally on screen
    width: '60%',
    left: '20%',
  },

  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
  },

  inputView: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#000',
    width: '100%',
    height: 45,
    marginBottom: 20,
    color: '#fff',
    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    width: '100%',
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: '#000',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  loginText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },

  forgot_button: {
    height: 30,
    marginTop: 20,
    marginBottom: 30,
  },
});

export default Login;