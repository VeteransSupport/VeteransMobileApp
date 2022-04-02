import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
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
