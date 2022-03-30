import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    // this.clearAllAsyncStorage();
    this.props.navigation.navigate('Login');
  }

  clearAllAsyncStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.log('Could not clear AsyncStorage: ' + e);
      Alert.alert('Error logging out', 'Could not clear session token.');
    }

    console.log('User logged out')
  }

  handleLogoutClick = (props) => {
    this.clearAllAsyncStorage();
    props.navigation.navigate('Home');
  }

  render() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => this.handleLogoutClick(this.props)}>
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
    position: 'absolute',
    top: '50%',
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
    backgroundColor: '#000',
  },
});

export default Logout;