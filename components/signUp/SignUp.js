import React, { useState } from 'react';
import { Text, StyleSheet, Image, View, TextInput, Button, Switch, Linking, TouchableOpacity } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/Logout';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TnC: false
    }
  }

  toggleSwitch = (value) => {
    this.setState({ TnC: value });
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
          <Image style={styles.logo} source={require('../../assets/favicon.png')} />
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.formText}>Full Name: </Text>
            <TextInput style={styles.inputField} placeholder='Full Name' placeholderTextColor='#aaa' />
          </View>
          <View style={styles.input}>
            <Text style={styles.formText}>Email: </Text>
            <TextInput style={styles.inputField} placeholder='Email' placeholderTextColor='#aaa' />
          </View>
          <View style={styles.input}>
            <Text style={styles.formText}>Service: </Text>
            <TextInput style={styles.inputField} placeholder='Service' placeholderTextColor='#aaa' />
          </View>
          <View style={styles.input}>
            <Text style={styles.formText}>Phone Number: </Text>
            <TextInput style={styles.inputField} placeholder='Phone Number' placeholderTextColor='#aaa' />
          </View>
          <View style={styles.input}>
            <Text style={styles.formText}>Password: </Text>
            <TextInput style={styles.inputField} placeholder='Password' placeholderTextColor='#aaa' />
          </View>
          <View style={styles.adjustInline}>
            <Text style={styles.termsAndConditions} onPress={() => Linking.openURL('http://google.com')}>Terms and Conditions</Text>
            <Switch style={styles.toggle} onValueChange={this.toggleSwitch} value={this.state.TnC} />
          </View>
          <TouchableOpacity disabled={!this.state.TnC}
            style={[this.state.TnC ? styles.continueBtn : styles.continueBtnDisabled]}
          // onPress={this.props.handleContinueClick} // TODO: need to impliment
          >
            <Text
              style={styles.continueText}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
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
    width: '80%',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    textAlign: 'left',
  },

  logo: {
    position: 'absolute',
    right: 0,
    top: 50,
  },

  title: {
    textAlign: 'center',
    fontSize: 35,
    margin: 0,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 10,
  },

  inputField: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
    fontSize: 16,
    padding: 2,
    width: '50%',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#000',
    marginLeft: 10,
  },

  adjustInline: {
    display: 'flex',
    flexDirection: 'row',
  },

  termsAndConditions: {
    marginTop: 15,
    color: '#03a9f4',
    fontSize: 16,
  },

  toggle: {
    marginTop: 15,
    marginLeft: 10,
  },

  form: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 40,
    width: '100%',
  },

  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
    flexDirection: 'row',
    marginTop: 10,
  },

  formText: {
    width: 80,
    fontSize: 16,
  },

  continueBtn: {
    width: '50%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  continueBtnDisabled: {
    width: '50%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#ccc',
  },

  continueText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },
})

export default SignUp;