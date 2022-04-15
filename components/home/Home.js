import React from 'react';
import { StyleSheet, Button, TouchableOpacity, Text, View, Alert, Image, } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
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

  handleMilitryClick = (props) => {
    if (this.state.authenticated) {
      props.navigation.navigate('Welcome');
    } else {
      props.navigation.navigate('Login');
    }
  }

  navigateToInfoPage = props => {
    props.navigation.navigate('Info');
  }

  handleCharitiesClick = (props) => {
    props.navigation.navigate('CharitiesList');
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.upperHalf}>
          <View style={styles.urBackUpImage}>
            <Image source={require('../../assets/urbackupTemporary_Transparent.png')} />
          </View>
          <View style={styles.buttons}>
            <Button color="black" title="Military" onPress={() => this.handleMilitryClick(this.props)}/>
            <Button color="black" title="Nominated Contact" />
            <Button color="black" title="Charities" onPress={() => this.handleCharitiesClick(this.props)}/>
          </View>
        </View>

        <View style={styles.lowerHalf}>
          <View style={styles.howToButton}>
            <Button color="black" title="How does this app work?" onPress={() => this.navigateToInfoPage(this.props)}/>
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
