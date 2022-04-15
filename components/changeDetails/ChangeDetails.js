import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Button } from 'react-native';
import SignUp from "../signUp/SignUp";
import SelectCharity from "../selectCharity/SelectCharity";
import NominatedContacts from "../nominatedContacts/NominatedContacts";

export default class ChangeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'changedetails',
      pageNumber: 1,
      submit: false,
      name: '',
      email: '',
      serviceNumber: '',
      number: '',
      charityID: '',
      nominated: [],
    }

    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleCharityClick = this.handleCharityClick.bind(this);
  }

  componentDidMount() {
    console.log(this.state.charityID);
  }

  handleLogoClick = () => {
    this.props.navigation.navigate('Home');
  }

  handleNextClick = (pageNumber) => {
    this.setState({ pageNumber: pageNumber });
  }

  handleSubmitClick = () => {
    // TODO: need to impliment
    this.props.navigation.navigate('Login');
  }

  handleCharityClick = (charityID) => {
    this.setState({charityID: charityID});
  }

  render() {
    let page = <SignUp type={this.state.type} 
                  handleNextClick={this.handleNextClick}
                  handleLogoClick={this.handleLogoClick} />;

    if (this.state.pageNumber === 2) {
      page = <SelectCharity type={this.state.type}
                  handleNextClick={this.handleNextClick}
                  handleLogoClick={this.handleLogoClick}
                  handleCharityClick={this.handleCharityClick} />;
    } else if (this.state.pageNumber === 3) {
      page = <NominatedContacts type={this.state.type}
                  handleSubmitClick={this.handleSubmitClick}
                  handleLogoClick={this.handleLogoClick} />;
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
