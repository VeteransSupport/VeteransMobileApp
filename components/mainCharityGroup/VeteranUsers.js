import React from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";

export default class VeteranUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    // this.getCharityLeadUser();
  }

  getCharityLeadUser() {
    let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/charity_lead?token=' + this.props.token;

    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(response.statusText)
        }
      })
      .then((results) => {
        this.setState({ data: results.results });
        console.log('results#########');
        console.log(results.results);
      })
      .catch((errStatusCode) => {
        console.log("something went wrong ", errStatusCode);
        Alert.alert('Something went wrong', 'Please log out and log in again.');

        console.log('something went wrong :: Status Code ' + errStatusCode.message);
        Alert.alert('Something went wrong', 'Your session may have expired\n\nPlease log back in and recreate your charity.');
      });
  }

  render() {
    return (
      <View>
        {this.props.data.map((user, i) => {
          return (
            <View style={styles.card} key={user.id}>
              <TouchableOpacity style={styles.container}>
                <Text style={styles.id}>{i + 1}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.charity_id}>Charity ID: {user.charity_id}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 35,
    marginTop: 30,
    alignItems: 'flex-start',
  },

  container: {
    width: '100%',
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
