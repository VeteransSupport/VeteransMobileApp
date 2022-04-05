import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/Logout';

export default class NominatedContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
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
        <View style={styles.body}>
          <Text>Add your nominated contact(s)</Text>

          <View style={styles.contactsForm}>
            <View style={styles.contactInfo}>
              <Text>*1)</Text>
              <View style={styles.input}>
                <Text style={styles.formText}>Name </Text>
                <TextInput style={styles.inputField} placeholder='Full Name' />
              </View>
              <View style={styles.input}>
                <Text style={styles.formText}>Email </Text>
                <TextInput style={styles.inputField} placeholder='Email' />
              </View>
            </View>

            <View style={styles.contactInfo}>
              <Text>2)</Text>
              <View style={styles.input}>
                <Text style={styles.formText}>Name </Text>
                <TextInput style={styles.inputField} placeholder='Full Name' />
              </View>
              <View style={styles.input}>
                <Text style={styles.formText}>Email </Text>
                <TextInput style={styles.inputField} placeholder='Email' />
              </View>
            </View>

            <View style={styles.contactInfo}>
              <Text>3)</Text>
              <View style={styles.input}>
                <Text style={styles.formText}>Name </Text>
                <TextInput style={styles.inputField} placeholder='Full Name' />
              </View>
              <View style={styles.input}>
                <Text style={styles.formText}>Email </Text>
                <TextInput style={styles.inputField} placeholder='Email' />
              </View>
            </View>
          </View>

          <View style={styles.accessCode}>
            <Text>Add your 6 digit acess code:</Text>
            <TextInput style={styles.inputField2} placeholder='6 digit code' />
            <Text>Your nominated contacts will receive an email reminding them to download the app.</Text>
            <Text>REMEMBER: You must give them their access code for registration.</Text>
          </View>

          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => this.props.handleSubmitClick()}
          >
            <Text
              style={styles.continueText}>
              Complete Registration
            </Text>
          </TouchableOpacity>

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

  logo: {
    position: 'absolute',
    right: 0,
    top: 40,
  },

  title: {
    textAlign: 'center',
    fontSize: 35,
    margin: 0,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 10,
  },

  body: {
    flex: 1,
    marginTop: 10,
  },

  button: {
    marginTop: 15,
  },

  contactInfo: {
    marginTop: 10,
  },

  contactsForm: {
    alignContent: 'center',
  },

  input: {
    flexDirection: 'row',
    marginLeft: '10%',
  },

  inputField: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
    fontSize: 16,
    padding: 2,
    width: '60%',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#000',
    marginTop: 10,
  },

  accessCode: {
    marginTop: 20,
  },

  inputField2: {
    backgroundColor: '#eee',
    alignSelf: 'center',
    fontSize: 16,
    padding: 2,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#000',
    textAlign: 'center',
  },

  formText: {
    width: 50,
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
