import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Alert,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Charity from "../charity/Charity";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class CharitiesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      authenticated: false,
      userTypeId: '',
      loaded: false,
      isEditView: false,
    }

    this.handleCharityEditClick = this.handleCharityEditClick.bind(this);
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      this.getUserTypeId(token);
    }
    this.getData();

    // Setting timeout to wait for
    // the state to be updated
    setTimeout(this.verityUserType,
      500
    );
  }

  verityUserType = () => {
    this.setState({ loaded: true });
    // Only app admin, app support and charity admin can edit charity
    if (this.props.isEditView !== undefined &&
      this.props.isEditView !== null &&
      this.props.isEditView === true &&
      (this.state.userTypeId === '1' ||
        this.state.userTypeId === '2' ||
        this.state.userTypeId === '3')) {
      this.setState({ isEditView: true });
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
          throw Error(response.statusText)
        }
      })
      .then((data) => {
        this.setState({ authenticated: true, userTypeId: data.results[0].type_id });
      })
      .catch((err) => {
        console.log("something went wrong ", err);
        Alert.alert('Something went wrong', 'Please log out and log in again.');
      });
  }

  getData() {
    return fetch('http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/charities')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data.results });
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Error', 'Couldent get list of charities');
      });
  }

  clearAllAsyncStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.log('Could not clear AsyncStorage: ' + e);
      Alert.alert('Error logging out', 'Could not clear session token.');
    }

    console.log('User logged out')
  }

  handleLogoClick = (props) => {
    if (this.props.handleNavigationClick !== undefined &&
      this.props.handleNavigationClick !== null) {
      this.props.handleNavigationClick('Home');
    } else {
      props.navigation.navigate('Home');
    }
  }

  handleBackClick = (props) => {
    if (this.props.handleNavigationClick !== undefined &&
      this.props.handleNavigationClick !== null) {
      this.props.handleChangeSelectedView('');
    } else {
      props.navigation.navigate('Home');
    }
  }

  handleCharityEditClick = (charityId) => {
    this.props.handleCharityEditClick(charityId);
  }

  render() {
    let enableEdit = false;
    if (this.props.isEditView !== undefined &&
      this.props.isEditView !== null &&
      this.props.isEditView === true) {
      enableEdit = true;
    }

    let title = 'Charities List';
    if (this.props.isEditView !== undefined &&
      this.props.isEditView !== null &&
      this.props.isEditView === true &&
      (this.state.userTypeId === '1' ||
        this.state.userTypeId === '2' ||
        this.state.userTypeId === '3')) {
      title = 'Edit Charities';
    }

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => this.handleLogoClick(this.props)}>
          <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        {this.state.isEditView &&
          <View style={styles.subSection}>
            <Text style={styles.adjustBackBtnTxt}>Select a charity below to edit it's information.</Text>
            <Text style={styles.adjustBackBtnTxt}>Or use the button below to go back to the previous page.</Text>
          </View>
        }

        <TouchableOpacity
          style={[enableEdit ? styles.backBtn_v2 : styles.backBtn]}
          onPress={() => this.handleBackClick(this.props)}>
          <Text
            style={[enableEdit ? styles.backText_v2 : styles.backText]}>
            BACK
          </Text>
        </TouchableOpacity>

        <ScrollView style={styles.scrollView}>
          {!this.state.loaded &&
            <Text>LOADING....</Text>
          }
          {this.state.loaded &&
            <Charity isEditView={this.state.isEditView} handleCharityEditClick={this.handleCharityEditClick} data={this.state.data} />
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    paddingTop: StatusBar.currentHeight,
  },

  imageContainer: {
    width: '100%',
    height: 74,
  },

  image: {
    position: 'absolute',
    right: '5%',
    width: 119,
    height: 74,
  },

  title: {
    marginLeft: '5%',
    fontSize: 45,
  },

  subSection: {
    marginTop: 25,
  },

  adjustBackBtnTxt: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },

  scrollView: {
    marginTop: 25,
    marginHorizontal: 20,
    color: 'red'
  },

  text: {
    fontSize: 42,
  },

  backBtn: {
    position: 'absolute',
    top: '100%',
    right: 15,
    width: '25%',
    borderRadius: 3,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    color: 'red',
    backgroundColor: '#000',
    zIndex: 999,
  },

  backText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },

  backBtn_v2: {
    width: '25%',
    borderRadius: 3,
    height: 35,
    marginLeft: 25,
    justifyContent: 'center',
    color: 'red',
    marginTop: 20,
    backgroundColor: '#000',
    zIndex: 999,
  },

  backText_v2: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
});
