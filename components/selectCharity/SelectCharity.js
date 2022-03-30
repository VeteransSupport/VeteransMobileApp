import React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/Logout';

class SelectCharity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  handleNextClick = props => {
    props.navigation.navigate('NominatedContacts');
  }

  handleLogoClick = props => {
      props.navigation.navigate('Home');
  }

  render() {
    const { open, value, items } = this.state;

    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
          <TouchableOpacity style={styles.logo} onPress={() => this.handleLogoClick(this.props)}>
            <Image source={require('../../assets/urbackupTemporary_Transparent.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.header2}>Select Charity</Text>
          <Text style={styles.paragraph}>
            If you do not already have a charity in mind then we recommend you look into the charities avalible and read their 'about us pages'.
          </Text>
          <Text style={styles.paragraph}>
            Alternatibly, visit the 'how does it work' page for a basic charity desciption.
          </Text>
          <Text style={styles.paragraph}>
            If you have a charity in mind but they are not on the list, please contact your chosen charity and ask them to register.
          </Text>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => this.handleNextClick(this.props)} // TODO: need to impliment
          >
            <Text
              style={styles.continueText}>
              Continue
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
  },

  header2: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginTop: '20%',
    fontWeight: 'bold',
  },

  button: {
    marginTop: 15,
  },

  paragraph: {
    fontSize: 14,
    marginTop: 10,
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

export default SelectCharity;