import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/Logout';
import { Picker } from '@react-native-picker/picker';

export default class SelectCharity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charitiesList: [],
      selectedCharity: '1',
    }
  }

  componentDidMount() {
    this.getCharitiesList();
  }

  getCharitiesList() {
    return fetch('http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/charities')
      .then((response) => response.json())
      .then((responseJson) => {
        // set charitiesList state as the data returned
        // set selectedCharity state as the id of the first charity in the data returned
        this.setState({ charitiesList: responseJson.results, selectedCharity: responseJson.results[0].id });
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Error', 'Couldent get list of charities');
      });
  }

  handleNextClick = props => {
    props.navigation.navigate('NominatedContacts');
  }

  handleLogoClick = props => {
    props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
          <TouchableOpacity style={styles.logo} onPress={() => this.handleLogoClick(this.props)}>
            <Image source={require('../../assets/urbackupTemporary_Transparent.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.header2}>Select Charity</Text>

          <TouchableOpacity style={styles.dropdownContainer}>
            <Picker
              selectedValue={this.state.selectedCharity}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) => this.setState({ selectedCharity: itemValue })}>
              {this.state.charitiesList.map((charity, i) => {
                return (
                  <Picker.Item key={charity.id} label={charity.title} value={charity.id} />
                )
              })}
            </Picker>
          </TouchableOpacity>

          <Text style={styles.paragraph}>
            If you do not already have a charity in mind then we recommend you look into the charities avalible and read their 'about us pages'.
          </Text>
          <Text style={styles.paragraph}>
            Alternatibly, visit the 'how does it work' page for a basic charity desciption.
          </Text>
          <Text style={styles.paragraph}>
            If you have a charity in mind but they are not on the list, please contact your chosen charity and ask them to register.
          </Text>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => this.handleNextClick(this.props)} // TODO: need to impliment
          >
            <Text
              style={styles.continueText}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '80%',
  },

  dropdownContainer: {
    backgroundColor: '#e5e5e5',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 15,
    marginBottom: 30,
  },

  dropdown: {
    height: 50,
    width: '100%',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    textAlign: 'left',
  },

  logo: {
    position: 'absolute',
    right: 0,
    top: 40,
  },

  title: {
    textAlign: 'center',
    fontSize: 35,
    margin: 0,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 10,
  },

  body: {
    flex: 1,
  },

  header2: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginTop: '20%',
    fontWeight: 'bold',
  },

  button: {
    marginTop: 15,
  },

  paragraph: {
    fontSize: 14,
    marginTop: 10,
  },

  continueBtn: {
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  continueText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },
})
