import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, } from 'react-native';
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
      mood: null,
      data: [],
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
        if(this.state.mood == 1)
        {
        Alert.alert('Success!', 'Mood sucessfully stored as green.');
        } else if(this.state.mood == 2)
        {
          Alert.alert('Success!', 'Mood sucessfully stored as amber.');
        } else if(this.state.mood == 3){
          Alert.alert('Mood successfully stored!', 'Mood sucessfully stored as red. \n\nWe hope you dont need them but here are some numbers to call: \nThe Samaritans - 116 123 \nCombat Stress - 0800 138 1619');
        }
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

  setCurrentDateandTime = () => {

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

    this.setState({ dateAndTime: datetime });
  }
  
  handleQuizClick(props) {
    props.navigation.navigate('Quiz');
  }

  handleLogoClick = (props) => {
    props.navigation.navigate('Home');
  }

  render() {
    const crisis = () => {
      if (this.state.mood == 3) {
        return (
          <View style={styles.crisisbar}>
            <Text style={styles.crisisText}>We hope you don't need to use these numbers but just incase:</Text>
            <Text style={styles.crisisText}>The Samaritans - 116 123</Text>
            <Text style={styles.crisisText}>Combat Stress - 0800 138 1619</Text>
            <Text style={styles.crisisText}>111 or 999</Text>
            <Text style={styles.crisisText2}>Remember You are not alone, people care and it will get better!</Text>
          </View>
        )
      }
    }

    const state = this.state;
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
            <TouchableOpacity style={styles.roundButton1} onPress={() => this.handleButtonClick(1)} />
            <Text style={styles.buttonText}>I'm feeling good and don't need any support right now! I wouldn't mind a social though.</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.roundButton2} onPress={() => this.handleButtonClick(2)} />
            <Text style={styles.buttonText}>I'm feeling alright but I've been feeling a bit low or irritable for a couple of days now. I wouldn't mind a chat or a brew.</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.roundButton3} onPress={() => this.handleButtonClick(3)} />
            <Text style={styles.buttonText}>If I'm being honest with myself, I need some help. I'm consistantly feeling low or irritable.</Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => this.handleQuizClick(this.props)}
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
    backgroundColor: '#ADD8E6',
    height: "20%",
    justifyContent: "center",
  },

  crisisText: {
    paddingTop: 3,
    alignSelf: "center",
    fontSize: 12,
    color: "white",
  },

  crisisText2: {
    paddingTop: 3,
    alignSelf: "center",
    fontSize: 12,
    margin: 2,
    color: "white",
    fontWeight: "bold"
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
