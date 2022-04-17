import React from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";

export default class MCGSCharityUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        {this.props.data.map((charity_lead_users, i) => {
          return (
            <View style={styles.card} key={charity_lead_users.id}>
              <TouchableOpacity style={styles.container}>
                <Text style={styles.id}>{i + 1}</Text>
                <Text style={styles.email}>{charity_lead_users.email}</Text>
                <Text style={styles.charity_id}>Charity ID: {charity_lead_users.charity_id}</Text>
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
    width: '90%',
    marginLeft: '5%',
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
