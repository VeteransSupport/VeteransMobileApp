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
  container: {
    flex: 1,
    marginTop: 35,
    paddingTop: StatusBar.currentHeight,
  },

});
