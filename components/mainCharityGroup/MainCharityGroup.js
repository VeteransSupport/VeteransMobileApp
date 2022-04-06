import React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default class MainCharityGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  navigateToAddCharitySupportPage = props => {
    props.navigation.navigate('AddCharitySupport');
  }

  navigateToClickCharitySupportPage = props => {
    props.navigation.navigate('ClickCharitySupport');
  }

  navigateToVeteransPage = props => {
    props.navigation.navigate('Veterans');
  }

  handleBackClick = (props) => {
    props.navigation.navigate('Home');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => this.handleBackClick(this.props)}>
          <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Main Charity Group Support</Text>


        <TouchableOpacity style={styles.addButton} onPress={() => this.navigateToAddCharitySupportPage(this.props)}>
          <Text
            style={styles.buttonText}>
            Add Charity Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clickButton} onPress={() => this.navigateToClickCharitySupportPage(this.props)}>
          <Text
            style={styles.buttonText}>
            Click Charity Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.veteransButton} onPress={() => this.navigateToVeteransPage(this.props)}>
          <Text
            style={styles.buttonText}>
            Veterans
          </Text>
        </TouchableOpacity>
      </SafeAreaView>

    );
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

  imageContainer: {
    width: '100%',
    height: 74,
  },

  image: {
    position: 'absolute',
    width: 119,
    height: 74,
    alignSelf: 'center',
  },

  title: {
    width: 400,
    marginTop: '5%',
    marginLeft: '5%',
    fontSize: 35,
    textAlign: 'center',
  },

  addButton: {
    borderRadius: 5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  clickButton: {
    borderRadius: 5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  veteransButton: {
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  buttonText: {
    width: '100%',
    justifyContent: 'center',
    padding: 10,
    color: '#fff',
  },
})
