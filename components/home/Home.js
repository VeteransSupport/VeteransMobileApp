import React from 'react';
import { StyleSheet, Button, TouchableOpacity, Text, View, Alert, Image, } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from '../login/Login';
import CharityLogin from '../login/CharityLogin';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentPage: 'home'
    }

    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  async componentDidMount() {
    this._retrieveData('token');
  }

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        this.setState({ authenticated: true })
      }
    } catch (e) {
      console.log('Cound not store token in AsyncStorage: ' + e);
      Alert.alert('Error getting token', 'Could not retrieve session token.');
    }
  }

  handleLoginPageClick = (props) => {
    if (this.state.authenticated) {
      props.navigation.navigate('Welcome');
    } else {
      this.setState({ currentPage: 'login' });
    }
  }

  handleCharityLoginPageClick = (props) => {
    if (this.state.authenticated) {
      props.navigation.navigate('Welcome');
    } else {
      this.setState({ currentPage: 'charityLogin' });
    }
  }

  navigateToInfoPage = props => {
    props.navigation.navigate('Info');
  }

  handleCharitiesClick = (props) => {
    props.navigation.navigate('CharitiesList');
  }

  changeCurrentPage = (page) => {
    this.setState({ currentPage: page });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.currentPage === 'home' &&
          <View style={styles.innerContainer}>
            <View style={styles.upperHalf}>
              <View style={styles.urBackUpImage}>
                <Image source={require('../../assets/urbackupTemporary_Transparent.png')} />
              </View>
              <View style={styles.buttons}>
                <Button color="black" title="Military" onPress={() => this.handleLoginPageClick(this.props)} />
                <Button color="black" title="Nominated Contact" />
                <Button color="black" title="Charities" onPress={() => this.handleCharityLoginPageClick(this.props)} />
              </View>
            </View>

            <View style={styles.lowerHalf}>
              <View style={styles.howToButton}>
                <Button color="black" title="How does this app work?" onPress={() => this.navigateToInfoPage(this.props)} />
                <Image style={styles.militaryIcons} source={require('../../assets/militaryIconsTemporary_Transparent.png')} />
              </View>
              <View>
                <Text style={styles.longInfoText}>This app acts to support military personnel and veterans to access already established mental health services and charities. Therefore, by using the app you do so in the knowledge that we waiver any responsibility for the actions or support of any users.</Text>
              </View>
              <TouchableOpacity style={styles.administratorButton}>
                <Text style={styles.administratorText}>Administrator and Charity Administrators</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        {this.state.currentPage === 'login' &&
          <Login navigation={this.props.navigation}
            changeCurrentPage={this.changeCurrentPage} />
        }
        {this.state.currentPage === 'charityLogin' &&
          <CharityLogin navigation={this.props.navigation}
            changeCurrentPage={this.changeCurrentPage} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '90%',
  },

  innerContainer: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '100%',
  },

  upperHalf: {
    width: '100%',
    height: '35%',
    marginTop: '10%',
  },

  lowerHalf: {
    width: '100%',
    height: '50%',
  },

  urBackUpImage: {
    width: '25%',
    height: '25%',
    marginTop: 20,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  howToButton: {
    width: '100%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  militaryIcons: {
    //empty just in case if resizing of image needed.
  },

  longInfoText: {
    color: '#afafaf',
    paddingLeft: 3,
  },

  administratorButton: {
    alignItems: 'center',
    marginTop: 20,
  },

  administratorText: {
    fontSize: 15,
    textDecorationLine: 'underline',
  }
});
