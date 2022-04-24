import React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, Alert, } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/Logout';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react/cjs/react.production.min';


export default class TrafficLight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      token: '',
      mood: '',
      user: "Veteran",
      data: [],
      userTypeId: '',
      date: '',
      time: '',
      dateAndTime: ''
    }
  }

  async componentDidMount() {
    this._retrieveData('token');

    if (await AsyncStorage.getItem('token') !== null) {
      this.setState({ authenticated: true });
    }

    if (!this.state.authenticated) {
      this.props.navigation.navigate('Home');
      Alert.alert('Please Log in', 'Youre currently not logged in. Please Login to access that page.')
    }
  }

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        this.setState({ authenticated: true, token: value })
      } else {
      }
    } catch (e) {
      console.log('Could not store token in Async storage: ' + e);
      Alert.alert('Error getting token', 'Could not retrieve session token.');
    }
  }

  updateUserMood = () => {
    let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/update_user';
    let formData = new FormData()
    formData.append('request', 'update_mood')
    formData.append('token', this.state.token)
    formData.append('mood', this.state.mood)
    formData.append('last_updated', this.state.dateAndTime)

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        if (response.status === 204) {
          return response
        } else {
          throw Error(response.statusText)
        }
      })
      .then(() => {
        Alert.alert('Success!', 'Mood sucessfully stored');
      })
      .catch((err) => {
        console.log("something went wrong ", err);
        Alert.alert('Unable to store mood. Please log out and back in again.')
      })
  }

  handleButtonClick(colour) {
    this.setState({ mood: colour });
    this.setCurrentDateandTime();

    setTimeout(this.updateUserMood, 250);
  }

  onPressAlertGreen() {
    Alert.alert("Green selected.", "Thank you for registering your mood today.")
    this.setState({ mood: 'green' });
    this.setCurrentDateandTime();
    this.updateUserMood();

    setTimeout(() => {
      this.test();
    }, 200);
  }

  onPressAlertAmber() {
    Alert.alert("Amber selected.", "We will notify your contacts of your mood today.")
    this.setState({ mood: 'amber' });
    this.setCurrentDateandTime();

    setTimeout(() => {
      this.test();
    }, 200);
  }

  onPressAlertRed() {
    Alert.alert("Red selected.", "Do you require some help? Crisis number.");
    this.setState({ mood: 'red' });
    this.setCurrentDateandTime();

    setTimeout(() => {
      this.test();
    }, 200);
  }

  setCurrentDateandTime = () => {

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

    console.log('datetime');
    console.log(datetime);

    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var fullTime = (hours + ':' + min);
    this.setState({ time: fullTime });

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var fullDate = (date + '-' + month + '-' + year);
    this.setState({ date: fullDate });

    var fullDateAndTime = (fullDate + ' : ' + fullTime)

    this.setState({ dateAndTime: fullDateAndTime });
  }

  test = () => {
    console.log(this.state.dateAndTime, this.state.mood, this.state.token);
  }


  handleLogoClick = (props) => {
    props.navigation.navigate('Home');
  }

  render() {
    const crisis = () => {
      if (this.state.mood == 'Red') {
        return (
          <View style={styles.crisisbar}>
            <Text style={styles.crisisText}>Do you require help? Call this number: 0123456789</Text>
          </View>
        )
      }
    }

    const VeteranView = () => {
      if (this.state.user == "Veteran") {
        return (
          <View style={styles.page}>
            {crisis()}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => this.handleLogoClick(this.props)}>
                <Image source={require('../../assets/urbackupTemporary_Transparent.png')} />
              </TouchableOpacity>
            </View>

            <View style={styles.adjustTop}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.roundButton1} onPress={() => this.handleButtonClick('Green')} />
                <Text style={styles.buttonText}>I'm feeling good and don't need any support right now! I wouldn't mind a social though.</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.roundButton2} onPress={() => this.handleButtonClick('Amber')} />
                <Text style={styles.buttonText}>I'm feeling alright but I've been feeling a bit low or irritable for a couple of days now. I wouldn't mind a chat or a brew.</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.roundButton3} onPress={() => this.handleButtonClick('Red')} />
                <Text style={styles.buttonText}>If I'm being honest with myself, I need some help. I'm consistantly feeling low or irritable.</Text>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  // onPress={() => this.handleQuizClick(this.props)} // TODO: need to impliment
                  style={styles.continueBtn}>
                  <Text
                    style={styles.continueText}>
                    Unsure? Take the quiz!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      }
    }

    const AdminView = () => {
      if (this.state.user !== "Veteran") {
        return (
          <View style={styles.page}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => this.handleLogoClick(this.props)}>
                <Image source={require('../../assets/urbackupTemporary_Transparent.png')} />
              </TouchableOpacity>
            </View>

          </View>
        )
      }
    }

    const state = this.state;
    return (
      <View style={styles.page}>
        {VeteranView()}
        {AdminView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '100%',
  },

  header: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingTop: 20,
  },

  crisisbar: {
    width: "100%",
    backgroundColor: "red",
    height: "10%",
    justifyContent: "center",
  },

  crisisText: {
    alignSelf: "center",
    fontSize: 20,
    margin: 5,
    color: "white",
  },

  adjustTop: {
    flex: 1,
    width: '100%',
    marginTop: '10%',
  },

  buttonContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },

  buttonText: {
    width: "75%",
    marginLeft: 10,
    flexWrap: "wrap",
  },

  footer: {
    flex: 1,
    alignContent: "center",
    width: "90%",
    alignSelf: "center"
  },

  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'green',
  },

  roundButton2: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'yellow',
  },

  roundButton3: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'red',
  },

  continueBtn: {
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  continueText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },
})
