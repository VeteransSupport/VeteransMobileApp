import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppAdminHome from "./AppAdminHome";
import AddSupport from "./supportUser/AddSupport";
import ClickSupport from "./supportUser/ClickSupport";
import Veterans from "./veterans/Veterans";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      token: false,
      authenticated: false,
      userTypeId: '', 
      type: 'appAdminHome',
      pageNumber: 1,
    }

    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleCharityClick = this.handleCharityClick.bind(this);
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      this.setState({ token: token });
      this.getUserTypeId(token);
    }

    setTimeout(this.verityUserType,
      500
    );
  }

  verityUserType = () => { 
    if (this.state.userTypeId !== '1' || this.state.userTypeId === '') {
      this.props.navigation.navigate('Home');
    }
  }

  handleCharityClick = () => {
    this.props.navigation.navigate('EditCharityPage');
  }

  handleLogoClick = () => {
    this.props.navigation.navigate('App Admin');
  }

  handleNextClick = (pageNumber) => {
    this.setState({ pageNumber: pageNumber });
  }

  getUserTypeId = async (token) => {
    let url = 'http://urbackup.atwebpages.com/api/user';
    let formData = new FormData();
    formData.append('token', token);

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(JSON.stringify(response.status))
        }
      })
      .then((data) => {
        this.setState({ authenticated: true, userTypeId: data.results[0].type_id });
      })
      .catch((errStatusCode) => {
        console.log('something went wrong :: Status Code ' + errStatusCode.message);
        this.props.navigation.navigate('Home');
        this._clear();
        Alert.alert('Something went wrong', 'Your session may have expired\n\nPlease log in again.');
      });
  }

  render() {

    let page = <AppAdminHome type={this.state.type} AppAdminHome
      handleNextClick={this.handleNextClick}
      handleLogoClick={this.handleLogoClick}
      handleCharityClick={this.handleCharityClick} />;

    if (this.state.pageNumber === 3) {
      page = <AddSupport type={this.state.type}
        handleNextClick={this.handleNextClick}
        handleLogoClick={this.handleLogoClick}
      />;
    } else if (this.state.pageNumber === 4) {
      page = <ClickSupport type={this.state.type}
        handleNextClick={this.handleNextClick}
        handleLogoClick={this.handleLogoClick}
      />;
    } else if (this.state.pageNumber === 5) {
      page = <Veterans type={this.state.type} AppAdminHome
        handleNextClick={this.handleNextClick}
        handleLogoClick={this.handleLogoClick}
      />;
    } else if (this.state.pageNumber === 6) {
      page = <AppAdminHome type={this.state.type} AppAdminHome
        handleNextClick={this.handleNextClick}
        handleLogoClick={this.handleLogoClick}
      />;
    }

    return (
      <View style={styles.container}>
        {page}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
