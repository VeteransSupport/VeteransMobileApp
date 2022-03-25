import React from 'react';
import { StyleSheet, Button, TouchableOpacity, Text, View, Alert, Image, } from 'react-native';

import Login from "../login/Login";
import Logout from "../logout/Logout";

import AsyncStorage from "@react-native-async-storage/async-storage";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      email: '',
      password: '',
      removeUser: false,
      signup: false
    }

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  async componentDidMount() {
    this._retrieveData('token');
  }

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        this.setState({ authenticated: true })
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
          this.setState({ authenticated: true });
        }
      })
      .catch((err) => {
        // let message 
        console.log("something went wrong ", err);
        Alert.alert('We were unable to sign you in!', 'Please check youre username and password and make sure they are correct.');
      })
  }

  render() {
    // let page = (
    //   <Login style={{}}
    //     handleEmail={this.handleEmail}
    //     handlePassword={this.handlePassword}
    //     handleLoginClick={this.handleLoginClick}
    //   />
    // )

    // if (this.state.authenticated) {
    //   page = (
    //     <View>
    //       <Logout handleLogoutClick={this.handleLogoutClick} />
    //       <Text style={styles.email}>Logged in as: {this.state.email}</Text>
    //     </View>
    //   )
    // }

    return (
      <View style={styles.container}>

        <View style={styles.upperHalf}>
          <View style={styles.urBackUpImage}>
            <Image source={require('../../assets/urbackupTemporary.png')} />
          </View>
          <View style={styles.buttons}>
            <Button color="black" title="Military" />
            <Button color="black" title="Nominated Contact" />
            <Button color="black" title="Charities" />
          </View>
        </View>

        <View style={styles.lowerHalf}>
          <View style={styles.howToButton}>
            <Button color="black" title="How does this app work?" />
            <Image style={styles.militaryIcons} source={require('../../assets/militaryIconsTemporary.png')} />
          </View>
          <View>
            <Text style={styles.longInfoText}>This app acts to support military personnel and veterans to access already established mental health services and charities. Therefore, by using the app you do so in the knowledge that we waiver any responsibility for the actions or support of any users.</Text>
          </View>
          <TouchableOpacity style={styles.administratorButton}>
            <Text style={styles.administratorText}>Administrator and Charity Administrators</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },

  upperHalf: {
    width: '100%',
    height: '50%',
  },

  lowerHalf: {
    width: '100%',
    height: '50%',
  },

  urBackUpImage: {
    width: '25%',
    height: '25%',
    marginLeft: 20,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  howToButton: {
    width: '100%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  militaryIcons: {
    //empty just in case if resizing of image needed.
  },

  longInfoText: {
    color: '#afafaf',
    paddingLeft: 3,
  },

  administratorButton: {
    alignItems: 'center',
    paddingTop: 20,
  },

  administratorText: {
    fontSize: 15,
    textDecorationLine: 'underline',
  }
});

export default Home;
