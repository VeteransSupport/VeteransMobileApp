import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
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
    let url = 'http://urbackup.atwebpages.com/api/charity_lead?token=' + this.props.token;

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
        Alert.alert('Error', 'Couldnt get list of Users');
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <MCGSCharityUsers data={this.state.data} />
          </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    paddingTop: StatusBar.currentHeight,
  },

  scrollView: {
      marginHorizontal: 10,
      color: 'red'
  },

});
