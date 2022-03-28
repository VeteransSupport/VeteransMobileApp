import React from 'react';
import { Text, View, StyleSheet, Button, Image,TouchableOpacity } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/Logout';

class TrafficLight extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Image source={require('../../assets/urbackupTemporary.png')} />
        </View>
       
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.roundButton1}/>
          <Text style={styles.buttonText}>I'm feeling good and don't need any support right now! I wouldn't mind a social though.</Text>
        </View>
       
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.roundButton2}/>
          <Text style={styles.buttonText}>I'm feeling alright but I've been feeling a bit low or irritable for a couple of days now. I wouldn't mind a chat or a brew.</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.roundButton3}/> 
          <Text style={styles.buttonText}>If I'm being honest with myself, I need some help. I'm consistantly feeling low or irritable.</Text>
        </View>

        <View style={styles.footer}>
          <Button color="black" title="Unsure? Take the quiz!"/>
        </View>
      </View>

    )
  }

}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },

  header:{
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 0,
    paddingBottom: 0
  },
  
  buttonContainer:{
    flex: 2,
    margin: 10,
    flexDirection: "row",
    alignItems: "center"

  },

  buttonText:{
    width: "75%",
    marginLeft: 10,
    flexWrap: "wrap"
  },

  footer:{
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
})

export default TrafficLight;