import React from 'react';
import {
  Text,
  View,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/Logout';

export default class NominatedContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOne: '',
      nameTwo: '',
      nameThree: '',
      emailOne: '',
      emailTwo: '',
      emailThree: '',
      code: '',
      nominatedContacts: [],
    }
  }

  componentDidMount() {
  }

  handleSixDigitCodeChange(input) {
    this.setState({ code: input.replace(/[^0-9]/g, '') });
  }

  handleInputChange(type, nominatedId, value) {
    if (type === 'name') {
      if (nominatedId === 1) {
        this.setState({ nameOne: value });
      } else if (nominatedId === 2) {
        this.setState({ nameTwo: value });
      } else if (nominatedId === 3) {
        this.setState({ nameThree: value });
      }
    } else if (type === 'email') {
      if (nominatedId === 1) {
        this.setState({ emailOne: value });
      } else if (nominatedId === 2) {
        this.setState({ emailTwo: value });
      } else if (nominatedId === 3) {
        this.setState({ emailThree: value });
      }
    }
  }

  submit() {
    if ((this.state.nameOne === '' && this.state.emailOne === '') &&
      (this.state.nameTwo === '' && this.state.emailTwo === '') &&
      (this.state.nameThree === '' && this.state.emailThree === '')) {
      Alert.alert('Please provide a nominated contact', 'You must provide at least one nominated contact to complete registration.');
      return;
    }

    if (((this.state.nameOne !== '' && this.state.emailOne === '') || (this.state.nameOne === '' && this.state.emailOne !== '')) ||
      ((this.state.nameTwo !== '' && this.state.emailTwo === '') || (this.state.nameTwo === '' && this.state.emailTwo !== '')) ||
      ((this.state.nameThree !== '' && this.state.emailThree === '') || (this.state.nameThree === '' && this.state.emailThree !== ''))) {
      Alert.alert('Incomplete information', 'You have provided only a name or email. If you wish to add a nominated contact you must provide both their name and email.');
      return;
    }

    if (this.state.code === '') {
      Alert.alert('Please enter a 6 digit code', 'You must enter a 6 digit code for your nominated contacts to complete registration.');
      return;
    }

    if (this.state.code.length !== 6) {
      Alert.alert('Code Not 6 digits', 'The code you entered is not 6 digits. Please enter a 6 digit code to complete registration.');
      return;
    }

    let contacts = [];

    if (this.state.nameOne !== '' && this.state.emailOne !== '') {
      contacts.push({
        name: this.state.nameOne,
        email: this.state.emailOne
      });
    }
    if (this.state.nameTwo !== '' && this.state.emailTwo !== '') {
      contacts.push({
        name: this.state.nameTwo,
        email: this.state.emailTwo
      });
    }
    if (this.state.nameThree !== '' && this.state.emailThree !== '') {
      contacts.push({
        name: this.state.nameThree,
        email: this.state.emailThree
      });
    }

    this.props.handleSubmitClick(contacts);
  }

  render() {
    let title = 'Sign Up';
    if (this.props.type === 'changedetails') {
      title = 'Change\nDetails';
    }

    return (
      <SafeAreaView style={styles.pageContainer}>
        <ScrollView style={styles.pageContainer}>
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
                    <TextInput style={styles.inputField}
                      placeholder='Full Name'
                      onChangeText={(value) => this.handleInputChange('name', 1, value)} />
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.formText}>Email </Text>
                    <TextInput style={styles.inputField}
                      placeholder='Email'
                      onChangeText={(value) => this.handleInputChange('email', 1, value)} />
                  </View>
                </View>

                <View style={styles.contactInfo}>
                  <Text>2)</Text>
                  <View style={styles.input}>
                    <Text style={styles.formText}>Name </Text>
                    <TextInput style={styles.inputField}
                      placeholder='Full Name'
                      onChangeText={(value) => this.handleInputChange('name', 2, value)} />
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.formText}>Email </Text>
                    <TextInput style={styles.inputField}
                      placeholder='Email'
                      onChangeText={(value) => this.handleInputChange('email', 2, value)} />
                  </View>
                </View>

                <View style={styles.contactInfo}>
                  <Text>3)</Text>
                  <View style={styles.input}>
                    <Text style={styles.formText}>Name </Text>
                    <TextInput style={styles.inputField}
                      placeholder='Full Name'
                      onChangeText={(value) => this.handleInputChange('name', 3, value)} />
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.formText}>Email </Text>
                    <TextInput style={styles.inputField}
                      placeholder='Email'
                      onChangeText={(value) => this.handleInputChange('email', 3, value)} />
                  </View>
                </View>
              </View>

              <View style={styles.accessCode}>
                <Text>Add your 6 digit acess code:</Text>
                <TextInput style={styles.inputField2}
                  placeholder='6 digit code'
                  value={this.state.code}
                  blurOnSubmit={true}
                  maxLength={6}
                  onChangeText={(input) => this.handleSixDigitCodeChange(input)} />
                <Text>Your nominated contacts will receive an email reminding them to download the app.</Text>
                <Text>REMEMBER: You must give them their access code for registration.</Text>
              </View>

              <TouchableOpacity
                style={styles.continueBtn}
                onPress={() => this.submit()}
              >
                <Text
                  style={styles.continueText}>
                  Complete Registration
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: '100%',
  },

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
