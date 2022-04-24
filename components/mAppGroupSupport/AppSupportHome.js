import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default class AppSupportHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.handleNextClick(6)}>
          <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Support Admin</Text>

        <TouchableOpacity style={styles.button} onPress={() => this.props.handleNextClick(3)}>
          <Text
            style={styles.buttonText}>
            Add a User
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.props.handleNextClick(4)}>
          <Text
            style={styles.buttonText}>
            Manage Support Users
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.props.handleNextClick(5)}>
          <Text
            style={styles.buttonText}>
            Veterans List
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
    width: '60%',
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
    marginBottom: '35%',
    marginLeft: '5%',
    fontSize: 35,
    textAlign: 'center',
  },

  button: {
    borderRadius: 5,
    height: 60,
    width: 170,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  buttonText: {
    width: '100%',
    textAlign: 'center',
    padding: 10,
    color: '#fff',
  },
})
