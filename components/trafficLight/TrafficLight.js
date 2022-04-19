import React from 'react';
import { Text, View, StyleSheet, Alert, Button, Image, TouchableOpacity } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/Logout';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class TrafficLight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  }

  async componentDidMount() {
    if (await AsyncStorage.getItem('token') !== null) {
      this.setState({ authenticated: true });
    }

    if (!this.state.authenticated) {
      this.props.navigation.navigate('Home');
      Alert.alert('Please Log in', 'Youre currently not logged in. Please Login to access that page.')
    }
  }

  handleLogoClick = (props) => {
    props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.handleLogoClick(this.props)}>
            <Image source={require('../../assets/urbackupTemporary_Transparent.png')} />
          </TouchableOpacity>

        </View>
        <View style={styles.adjustTop}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.roundButton1} />
            <Text style={styles.buttonText}>I'm feeling good and don't need any support right now! I wouldn't mind a social though.</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.roundButton2} />
            <Text style={styles.buttonText}>I'm feeling alright but I've been feeling a bit low or irritable for a couple of days now. I wouldn't mind a chat or a brew.</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.roundButton3} />
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '90%',
  },

  header: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 0,
    paddingBottom: 0,
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

  },

  buttonText: {
    width: "75%",
    marginLeft: 10,
    flexWrap: "wrap",
  },

  footer: {
    flex: 1,
    alignContent: "center"
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
