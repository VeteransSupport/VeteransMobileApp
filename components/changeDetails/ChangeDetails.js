import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, Alert, View, Button } from 'react-native';
import SignUp from "../signUp/SignUp";
import SelectCharity from "../selectCharity/SelectCharity";
import NominatedContacts from "../nominatedContacts/NominatedContacts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ChangeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      type: 'changedetails',
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
      isLoaded: false
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

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      this.setState({ token: token });
      this.getUserDetails(token);
    } else {
      this.props.navigation.navigate('Home');
      Alert.alert('Not logged in', 'Please login to change your details.');
    }
  }

  getUserDetails(token) {
    let url = 'http://urbackup.atwebpages.com/api/user';
    let formData = new FormData();
    formData.append('token', this.state.token);

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(response.status)
        }
      })
      .then((data) => {
        // Converting JSON string to array
        // JSON string contains &#34; instead of "
        // Reformatting JSON string to allow it to be parsed
        let contactsArray = JSON.parse(data.results[0].contacts.replace(/&#34;/g, "\""));
        this.setState({
          charityID: data.results[0].charity_id,
          name: data.results[0].full_name,
          email: data.results[0].email,
          serviceNumber: data.results[0].service_number,
          number: data.results[0].phone_number,
          nominated: contactsArray,
          sixDigitCode: data.results[0].six_digit_code,
          isLoaded: true,
        });
      })
      .catch((errStatusCode) => {
        console.log('something went wrong :: Status Code ' + errStatusCode.message);
        this.props.navigation.navigate('Home');
        Alert.alert('Something went wrong', 'Your token may have expired. Please log out and then log back in to try again.');
      });
  }

  handleLogoClick = () => {
    this.props.navigation.navigate('Home');
  }

  handleNextClick = (pageNumber) => {
    if (pageNumber === 2) {
      if (this.state.name === '' ||
        this.state.email === '' ||
        this.state.serviceNumber === '' ||
        this.state.number === '') {
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
      setTimeout(this.updateUpUser, 250);
    } else {
      Alert.alert('Something went wrong', 'There was an error when saving your nominated contacts information. Please try again.');
      this.props.navigation.navigate('Home');
    }
  }

  updateUpUser = () => {
    console.log('###');
    let url = 'http://urbackup.atwebpages.com/api/update_user';
    let formData = new FormData();

    formData.append('token', this.state.token);
    formData.append('request', 'change_details');
    formData.append('full_name', this.state.name);
    formData.append('username', this.state.email);
    formData.append('service_number', this.state.serviceNumber);
    formData.append('phone_number', this.state.number);
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
        this.props.navigation.navigate('Welcome');
        Alert.alert('Registration Complete', 'Thank you ' + this.state.name + ', your details have been updated.');
      })
      .catch((errStatusCode) => {
        console.log('something went wrong :: Status Code ' + errStatusCode.message);
        this.props.navigation.navigate('Home');
        Alert.alert('Something went wrong', 'We went able to sign you up. Please try again.');
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
      handlePasswordClick={this.handlePasswordClick}
      name={this.state.name}
      email={this.state.email}
      service={this.state.serviceNumber}
      phone={this.state.number} />;

    if (this.state.pageNumber === 2) {
      page = <SelectCharity type={this.state.type}
        handleNextClick={this.handleNextClick}
        handleLogoClick={this.handleLogoClick}
        handleCharityClick={this.handleCharityClick}
        charityID={this.state.charityID} />;
    } else if (this.state.pageNumber === 3) {
      page = <NominatedContacts type={this.state.type}
        handleSubmitClick={this.handleSubmitClick}
        handleLogoClick={this.handleLogoClick}
        handleSixDigitCodeClick={this.handleSixDigitCodeClick}
        nominated={this.state.nominated}
        sixDigitCode={this.state.sixDigitCode} />;
    }

    return (
      <View style={styles.page}>
        {!this.state.isLoaded &&
          <View style={styles.contentContainer}>
            <Text style={styles.loading}>Loading...</Text>
          </View>
        }
        {this.state.isLoaded &&
          page
        }
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

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: 500,
  },

  loading: {
    position: 'absolute',
    top: '50%',
    height: 60,
    marginTop: -30,
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },
});
