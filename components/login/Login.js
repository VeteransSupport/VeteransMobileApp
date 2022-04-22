import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      token: '',
      userTypeId: '',
      email: '',
      password: '',
      removeUser: false,
      signup: false
    }
  }

  async componentDidMount() {
    this._retrieveData('token');
  }

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        this.setState({ authenticated: true, token: value })
      } else {
      }
    } catch (e) {
      console.log('Cound not store token in AsyncStorage: ' + e);
      Alert.alert('Error getting token', 'Could not retrieve session token.');
    }
  }

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        key,
        value
      );
    } catch (e) {
      console.log('Error storing token in AsyncStorage: ' + e);
      Alert.alert('Error logging in', 'Could not store session token.');
    }

    console.log('User logged in')
  };

  clearAllAsyncStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.log('Could not clear AsyncStorage: ' + e);
      Alert.alert('Error logging out', 'Could not clear session token.');
    }

    console.log('User logged out')
  }

  handleEmail = (text) => {
    this.setState({ email: text });
  }

  handlePassword = (text) => {
    this.setState({ password: text });
  }

  handleLogoutClick = () => {
    this.clearAllAsyncStorage();
    this.setState({ authenticated: false, email: '', password: '' });
  }

  handleLogoClick = () => {
    this.props.changeCurrentPage('home');
  }

  handleSignupClick = (props) => {
    props.navigation.navigate('SignUp');
  }

  handleSuccessClick = () => {
    this.getUserTypeId(this.state.token);

    setTimeout(this.redirect,
      250
    );
  }

  redirect = () => {
    if (this.state.userTypeId === '3' || this.state.userTypeId === '4') {
      this.clearAllAsyncStorage();
      this.props.navigation.navigate('Welcome');
      Alert.alert('Unauthorised', 'Please login through the charity login portal accessible through the home page.');
    } else {
      this.props.navigation.navigate('Welcome');
    }
  }

  getUserTypeId = async (token) => {
    let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/user';
    let formData = new FormData();
    formData.append('token', token);

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(response.statusText)
        }
      })
      .then((data) => {
        this.setState({ userTypeId: data.results[0].type_id });
      })
      .catch((err) => {
        console.log("something went wrong ", err);
        Alert.alert('Something went wrong', 'Please log out and log in again.');
      });
  }

  handleLoginClick = async () => {
    let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/authenticate';
    let formData = new FormData()
    formData.append('username', this.state.email)
    formData.append('password', this.state.password)

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        // Successful authentication will return
        // a 200 status code.
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(response.statusText)
        }
      })
      .then((data) => {
        // If results include a token,
        // store token and change state to authenticated
        if ("token" in data.results) {
          this._storeData('token', data.results.token);
          this.setState({ authenticated: true, token: data.results.token });
          this.handleSuccessClick();
        }
      })
      .catch((err) => {
        console.log("something went wrong ", err);
        Alert.alert('Unable to login!', 'Make sure your username and password are correct.');
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.image} onPress={() => this.handleLogoClick()}>
          <Image source={require("../../assets/urbackupTemporary_Transparent.png")} />
        </TouchableOpacity>

        <Text style={styles.title}>Log-in</Text>

        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#aaa"
            onChangeText={this.handleEmail}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            onChangeText={this.handlePassword}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={this.handleLoginClick}>
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
          onPress={() => this.handleSignupClick(this.props)}>
          <Text
            style={styles.loginText}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginLeft: '20%',
  },

  image: {
    position: 'absolute',
    top: '6%',
    left: '-20%'
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
