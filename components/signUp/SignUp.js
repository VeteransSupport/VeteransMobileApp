import React, { useState } from 'react';
import { Text, StyleSheet, Image, View, TextInput, Button, Switch, Linking, TouchableOpacity } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/Logout';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TnC: false,
      name: '',
      email: '',
      service: '',
      phone: '',
    }
  }

  componentDidMount() {
    if (this.props.type === 'changedetails') {
      this.setState({
        name: this.props.name,
        email: this.props.email,
        service: this.props.service,
        phone: this.props.phone,
      });
    }
  }

  toggleSwitch = (value) => {
    this.setState({ TnC: value });
  }

  updateInput(inputName, input) {
    if (inputName === 'name') {
      this.setState({name: input});
      this.props.handleNameClick(input)
    } else if (inputName === 'email') {
      this.setState({email: input});
      this.props.handleEmailClick(input)
    } else if (inputName === 'service') {
      this.setState({service: input});
      this.props.handleServiceNumberClick(input)
    } else if (inputName === 'phone') {
      this.setState({phone: input});
      this.props.handleNumberClick(input)
    }
  }

  render() {
    let title = 'Sign Up';
    if (this.props.type === 'changedetails') {
      title = 'Change\nDetails';
    }

    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.logo} onPress={() => this.props.handleLogoClick()}>
            <Image source={require('../../assets/urbackupTemporary_Transparent.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.formText}>Full Name: </Text>
            <TextInput style={styles.inputField}
              placeholder='Full Name'
              placeholderTextColor='#aaa'
              value={this.state.name}
              onChangeText={(input) => this.updateInput('name', input)} />
          </View>
          <View style={styles.input}>
            <Text style={styles.formText}>Email: </Text>
            <TextInput style={styles.inputField}
              placeholder='Email'
              placeholderTextColor='#aaa'
              value={this.state.email}
              onChangeText={(input) => this.updateInput('email', input)} />
          </View>
          <View style={styles.input}>
            <Text style={styles.formText}>Service Number: </Text>
            <TextInput style={styles.inputField}
              placeholder='Service Number'
              placeholderTextColor='#aaa'
              value={this.state.service}
              onChangeText={(input) => this.updateInput('service', input)} />
          </View>
          <View style={styles.input}>
            <Text style={styles.formText}>Phone Number: </Text>
            <TextInput style={styles.inputField}
              placeholder='Phone Number'
              placeholderTextColor='#aaa'
              value={this.state.phone}
              onChangeText={(input) => this.updateInput('phone', input)} />
          </View>
          {this.props.type === 'signup' &&
            <View style={styles.input}>
              <Text style={styles.formText}>Password: </Text>
              <TextInput style={styles.inputField}
                placeholder='Password'
                placeholderTextColor='#aaa'
                onChangeText={(input) => this.props.handlePasswordClick(input)} />
            </View>
          }
          <View style={styles.adjustInline}>
            <Text style={styles.termsAndConditions} onPress={() => Linking.openURL('http://google.com')}>Terms and Conditions</Text>
            <Switch style={styles.toggle} onValueChange={this.toggleSwitch} value={this.state.TnC} />
          </View>
          <TouchableOpacity disabled={!this.state.TnC}
            style={[this.state.TnC ? styles.continueBtn : styles.continueBtnDisabled]}
            onPress={() => this.props.handleNextClick(2)}>
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
    alignSelf: 'center',
    width: '80%',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    textAlign: 'left',
  },

  title: {
    textAlign: 'center',
    fontSize: 35,
    margin: 0,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 10,
  },

  logo: {
    position: 'absolute',
    right: 0,
    top: 40,
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
});
