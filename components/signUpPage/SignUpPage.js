import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, Alert, View, Button } from 'react-native';
import SignUp from "../signUp/SignUp";
import SelectCharity from "../selectCharity/SelectCharity";
import NominatedContacts from "../nominatedContacts/NominatedContacts";

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'signup',
      pageNumber: 1,
      submit: false,
      name: '',
      email: '',
      serviceNumber: '',
      number: '',
      password: '',
      charityID: '',
      sixDigitCode: '',
      nominated: [],
    }

    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);
    this.handleServiceNumberClick = this.handleServiceNumberClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handlePasswordClick = this.handlePasswordClick.bind(this);
    this.handleCharityClick = this.handleCharityClick.bind(this);
    this.handleSixDigitCodeClick = this.handleSixDigitCodeClick.bind(this);
  }

  componentDidMount() {
  }

  handleLogoClick = () => {
    this.props.navigation.navigate('Home');
  }

  handleNextClick = (pageNumber) => {
    if (pageNumber === 2) {
      if (this.state.name === '' ||
        this.state.email === '' ||
        this.state.serviceNumber === '' ||
        this.state.number === '' ||
        this.state.password === '') {
        Alert.alert('Missing fields', 'All fields are required. Please fill in all fields on this page.');
        return;
      }
    }

    if (pageNumber === 3) {
      if (this.state.charityID === '') {
        Alert.alert('Please Select a charity', 'To continue to the next page you must select a charity.');
        return;
      }
    }
    this.setState({ pageNumber: pageNumber });
  }

  handleNameClick = (name) => {
    this.setState({ name: name });
  }

  handleEmailClick = (email) => {
    this.setState({ email: email });
  }

  handleServiceNumberClick = (serviceNumber) => {
    this.setState({ serviceNumber: serviceNumber });
  }

  handleNumberClick = (number) => {
    this.setState({ number: number });
  }

  handlePasswordClick = (password) => {
    this.setState({ password: password });
  }

  handleCharityClick = (charityID) => {
    this.setState({ charityID: charityID });
  }

  handleSixDigitCodeClick = (sixDigitCode) => {
    console.log(this.state.sixDigitCode);
    this.setState({ sixDigitCode: sixDigitCode });
  }

  handleSubmitClick = (contacts) => {
    if (contacts.length > 0) {
      this.setState({ nominated: JSON.stringify(contacts) });
      setTimeout(this.signUpUser, 250);
    } else {
      Alert.alert('Something went wrong', 'There was an error when saving your nominated contacts information. Please try again.');
      this.props.navigation.navigate('Home');
    }
  }

  signUpUser = () => {
    let url = 'http://urbackup.atwebpages.com/api/update_user';
    let formData = new FormData();

    formData.append('request', 'signup');
    formData.append('full_name', this.state.name);
    formData.append('username', this.state.email);
    formData.append('service_number', this.state.serviceNumber);
    formData.append('phone_number', this.state.number);
    formData.append('password', this.state.password);
    formData.append('charity_id', this.state.charityID);
    formData.append('contacts', this.state.nominated);
    formData.append('six_digit_code', this.state.sixDigitCode);

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        if (response.status === 204) {
          return response
        } else {
          throw Error(response.status)
        }
      })
      .then(() => {
        // User created
        // Redirect to Home Page
        this.props.navigation.navigate('Home');
        Alert.alert('Registration Complete', 'Thank you ' + this.state.name + ', click the "Military" button and login using your email and password.');
      })
      .catch((errStatusCode) => {
        console.log('something went wrong :: Status Code ' + errStatusCode.message);
        this.props.navigation.navigate('Home');
        this._clear();
        Alert.alert('Something went wrong', 'You have been logged out. Your session may have expired.\n\nPlease log back in and recreate your charity.');
      });
  }

  render() {
    let page = <SignUp type={this.state.type}
      handleNextClick={this.handleNextClick}
      handleLogoClick={this.handleLogoClick}
      handleNameClick={this.handleNameClick}
      handleEmailClick={this.handleEmailClick}
      handleServiceNumberClick={this.handleServiceNumberClick}
      handleNumberClick={this.handleNumberClick}
      handlePasswordClick={this.handlePasswordClick} />;

    if (this.state.pageNumber === 2) {
      page = <SelectCharity type={this.state.type}
        handleNextClick={this.handleNextClick}
        handleLogoClick={this.handleLogoClick}
        handleCharityClick={this.handleCharityClick} />;
    } else if (this.state.pageNumber === 3) {
      page = <NominatedContacts type={this.state.type}
        handleSubmitClick={this.handleSubmitClick}
        handleLogoClick={this.handleLogoClick}
        handleSixDigitCodeClick={this.handleSixDigitCodeClick} />;
    }

    return (
      <View style={styles.page}>
        {page}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
