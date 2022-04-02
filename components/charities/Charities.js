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

export default class Charities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  async componentDidMount() {
    this.getData();
  }

  getData() {
    return fetch('http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/charities')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson.results });
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

  handleBackClick = (props) => {
    props.navigation.navigate('Home');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => this.handleBackClick(this.props)}>
          <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Charities</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => this.handleBackClick(this.props)}>
          <Text
            style={styles.backText}>
            BACK
          </Text>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
          <Charity data={this.state.data} />
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
});
