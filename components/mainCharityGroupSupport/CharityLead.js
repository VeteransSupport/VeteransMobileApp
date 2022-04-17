import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert, Text, TouchableOpacity } from "react-native";
import MCGSCharityUsers from "../mainCharityGroupSupport/MCGSCharityUsers";

export default class CharityLead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  async componentDidMount() {
    this.myCharityGroup();
  }

  myCharityGroup() {
    let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/charity_lead?token=' + this.props.token;

    fetch(url, {
      method: 'GET',
      headers: new Headers()
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(response.statusText)
        }
      })
      .then((responseJson) => {
        this.setState({ data: responseJson.results });
      })
      .catch((err) => {
        console.log("something went wrong ", err);
        Alert.alert('Error', 'Couldnt get list of Support Users');
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <ScrollView style={styles.scrollView}>
            <MCGSCharityUsers data={this.state.data} />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 100,
    marginBottom: -20,
    alignItems: 'flex-start',
  },

  container: {
    flex: 1,
    marginTop: 35,
    paddingTop: StatusBar.currentHeight,
  },

  id: {
    position: 'absolute',
    marginTop: 20,
    top: -20,
    right: 5,
    width: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#444',
  },

  charity_id: {
    position: 'center',
    right: 0,
    width: 100,
    fontWeight: 500,
    color: '#444',
  },

  email: {
    // position: 'absolute',
    marginBottom: 10,
    right: 0,
    width: '60%',
    height: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
});
