import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditOrCreateCharity from "./EditOrCreateCharity";
import CharitiesList from "../charitiesList/CharitiesList";

export default class EditCharityPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      userTypeId: '',
      statusCode: '',
      isAdmin: false,
      selectedView: '',
      selectCharityId: '',
      authenticated: false,
    }

    this.handleNavigationClick = this.handleNavigationClick.bind(this);
    this.handleCharityEditClick = this.handleCharityEditClick.bind(this);
  }

  async componentDidMount() {
    if (this.props.editView !== null) {
      this.setState({ editView: this.props.editView });
    }

    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      this.setState({ token: token });
      this.getUserTypeId(token);
    }

    // Setting timeout to wait for
    // the state to be updated
    setTimeout(this.redirectIfUnauthenticated,
      1000
    );
  }

  redirectIfUnauthenticated = () => {
    // If user is not:
    // * appAdmin
    // * appSupport
    // * charityAdmin
    //
    // Then redirect to Home page
    // and display pop-up message
    // else set isAdmin state to 
    // true and allow access.
    if (this.state.authenticated && (
      this.state.userTypeId === '1')) {
      this.setState({ isAdmin: true });
    } else {
      this.props.navigation.navigate('Home');
      console.log(this.state.userTypeId);
      Alert.alert('Access denied', 'You\'re not logged in as an admin or your session has expired. Please logout and login as an admin to access this page.');
    }
  }

  /**
   * Sends the token to the api/user endpoint to validate
   * the JWT and retrieve the user type_id from it.
   * 
   * @param {string} token The login JWT
   */
  getUserTypeId = async (token) => {
    let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/user';
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

  handleLogoClick() {
    this.props.navigation.navigate('Home');
  }

  async _clear() {
    await AsyncStorage.clear();
    console.log('User logged out');
  }

  handleNavigationClick = (page) => {
    this.props.navigation.navigate(page);
  }

  handleCharityEditClick = (charityId) => {
    this.setState({ selectedView: 'charityEdit', selectCharityId: charityId });
  }

  handleEditCharityClick = () => {
    this.setState({ selectedView: 'edit' });
  }

  handleCreateCharityClick = () => {
    this.setState({ selectedView: 'create' });
  }

  handleBackClick = () => {
    this.setState({ selectedView: '' });
  }

  render() {
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView style={styles.scroller}>
          <View style={[this.state.selectedView === 'edit' ? styles.editContainer : styles.container]}>
            {!this.state.isAdmin &&
              <View style={styles.contentContainer}>
                <Text style={styles.loading}>Loading...</Text>
              </View>
            }
            {(this.state.isAdmin && this.state.selectedView === '') &&
              <View style={styles.contentContainer}>

                <View style={styles.header}>
                  <Text style={styles.title}>{'Edit Charities\nPage'}</Text>
                  <TouchableOpacity style={styles.logo} onPress={() => this.handleLogoClick()}>
                    <Image style={styles.logo} source={require('../../assets/urbackupTemporary_Transparent.png')} />
                  </TouchableOpacity>
                </View>

                <View style={styles.selectAction}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.handleEditCharityClick()}>
                    <Text
                      style={styles.btnText}>
                      Edit a Charity
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.handleCreateCharityClick()}>
                    <Text
                      style={styles.btnText}>
                      Create a Charity
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.intoText}>Select from one of the two actions below:</Text>
              </View>
            }
            {this.state.selectedView === 'create' &&
              <EditOrCreateCharity handleNavigationClick={this.handleNavigationClick}
                handleBackClick={this.handleBackClick}
                token={this.state.token}
                userTypeId={this.state.userTypeId}
                editView={false} />
            }
            {this.state.selectedView === 'edit' &&
              <CharitiesList handleNavigationClick={this.handleNavigationClick}
                handleCharityEditClick={this.handleCharityEditClick}  
                handleBackClick={this.handleBackClick}
                isEditView={true} />
            }
            {this.state.selectedView === 'charityEdit' &&
              <EditOrCreateCharity handleNavigationClick={this.handleNavigationClick}
                handleBackClick={this.handleBackClick}
                token={this.state.token}
                userTypeId={this.state.userTypeId}
                charityId={this.state.selectCharityId}
                editView={true} />
            }
          </View>
        </ScrollView>
      </SafeAreaView>
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

  scroller: {
    width: '100%',
  },

  container: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '80%',
  },

  editContainer: {
    width: '100%',
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: 500,
  },

  header: {
    width: '100%',
    height: 100,
    marginTop: '10%',
  },

  title: {
    position: 'absolute',
    marginTop: '30%',
    fontSize: 35,
    left: 0,
    fontWeight: 'bold',
  },

  logo: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 119,
    height: 74,
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

  selectAction: {
    top: '50%',
    width: 160,
    marginTop: -40,
    alignItems: 'center',
  },

  btn: {
    width: '80%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  btnText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },

  intoText: {
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
