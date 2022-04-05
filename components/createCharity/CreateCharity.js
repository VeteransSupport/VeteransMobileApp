import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class CreateCharity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusCode: '',
      authenticated: false,
      token: '',
      isAdmin: false,
      userTypeId: '',
      title: '',
      image: null,
      description: '',
    }
  }

  // async componentDidMount() {
  //   const token = await AsyncStorage.getItem('token');
  //   if (token !== null) {
  //     this.setState({ token: token });
  //     this.getUserTypeId(token);
  //   } else {
  //     // Redirect unauthenticated users to login page
  //     this.props.navigation.navigate('Home');
  //     Alert.alert('Unauthorised', 'Only admin users can create a charity.');
  //   }

  //   // Setting timeout to wait for
  //   // the state to be updated
  //   setTimeout(this.redirectIfUnauthenticated,
  //     500
  //   );
  // }

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
    if (this.state.authenticated &&
      this.state.userTypeId !== 1 &&
      this.state.userTypeId !== 2 &&
      this.state.userTypeId !== 3) {
      this.props.navigation.navigate('Home');
      Alert.alert('Unauthorised', 'Only authorised users can create a charity.\n\nPlease login as an admin to do so.');
    } else {
      this.setState({ isAdmin: true });
    }
  }

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

  createNewCharity() {
    let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/user';
    let formData = new FormData();
    formData.append('token', this.state.token);
    formData.append('request', 'create');
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('image', this.state.image);

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
        // remove (data)
        // Do Something
        // this.setState({ authenticated: true, userTypeId: data.results[0].type_id });
      })
      .catch((err) => {
        console.log("something went wrong ", err);
        Alert.alert('Something went wrong', 'Please log out and log in again.');

        console.log('something went wrong :: Status Code ' + errStatusCode.message);
        this.props.navigation.navigate('Home');
        this._clear();
        Alert.alert('Something went wrong', 'Your session may have expired\n\nPlease log back in and recreate your charity.');
      });
  }

  handleLogoClick() {
    this.props.navigation.navigate('Home');
  }

  async _clear() {
    await AsyncStorage.clear();
    console.log('User logged out');
  }

  render() {
    const title = 'Create\nCharity';
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView style={styles.scroller}>
          <View style={styles.container}>
            {/* {!this.state.isAdmin &&
            <Text style={styles.loading}>Loading...</Text>
            } */}
            {!this.state.isAdmin &&
              <View style={styles.mainContainer}>
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  <TouchableOpacity onPress={() => this.handleLogoClick()}>
                    <Image style={styles.logo} source={require('../../assets/urbackupTemporary_Transparent.png')} />
                  </TouchableOpacity>
                </View>

                <View style={styles.subSection}>
                  <Text style={styles.headings}>Charity Title</Text>
                  <TextInput multiline={false} maxLength={30} style={styles.titleField} placeholder='Title' placeholderTextColor='#aaa' />
                  <Text style={styles.textLimitInfo}>Max character limit is 35</Text>
                </View>
                <View style={styles.subSection}>
                  <Text style={styles.headings}>Charity Description</Text>
                  <TextInput multiline={true} maxLength={125} style={styles.descriptionField} placeholder='Title' placeholderTextColor='#aaa' />
                  <Text style={styles.textLimitInfo}>Max character limit is 125</Text>
                </View>
                <View style={styles.subSection}>
                  <Text style={styles.headings}>Charity Image</Text>
                  <TouchableOpacity style={styles.uploadButton}>
                    <Text style={styles.uploadText}>Upload Image</Text>
                  </TouchableOpacity>
                  <Text style={styles.infoText}>You will see your uploaded image below:</Text>
                  <Image style={styles.image} source={require('../../assets/image-icon.png')} />
                </View>
              </View>
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

  loading: {
    position: 'absolute',
    top: '50%',
    height: 60,
    marginTop: -30,
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },

  mainContainer: {
    width: '100%',
    height: '100%',
    marginTop: '10%',
  },

  header: {
    width: '100%',
    height: 100,
  },

  title: {
    position: 'absolute',
    textAlign: 'center',
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

  subSection: {
    marginTop: 35,
  },

  headings: {
    fontSize: 22,
    fontWeight: '500',
  },

  textLimitInfo: {
    alignSelf: 'center',
  },

  titleField: {
    backgroundColor: '#eee',
    alignSelf: 'center',
    fontSize: 16,
    padding: 2,
    width: '90%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#000',
    marginTop: 25,
    height: 45,
    textAlignVertical: 'top',
  },

  descriptionField: {
    backgroundColor: '#eee',
    alignSelf: 'center',
    fontSize: 16,
    padding: 2,
    width: '90%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#000',
    marginTop: 25,
    height: 150,
    textAlignVertical: 'top',
  },

  uploadButton: {
    width: '50%',
    borderRadius: 5,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  uploadText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },

  infoText: {
    marginTop: 10,
  },

  image: {
    alignSelf: 'center',
    width: 154,
    height: 125,
    marginTop: 25,
    marginBottom: 15,
  },
});
