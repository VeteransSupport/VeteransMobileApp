import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default class CharityLead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() { }

  render() {
    return (
      <View>
        {this.props.data.map((charityLead, i) => {
          return (
            <View style={styles.card} key={charityLead.id}>
              <TouchableOpacity style={styles.container}>
                <Text style={styles.id}>{i + 1}</Text>
                <Text style={styles.email}>{charityLead.email}</Text>
                <Text style={styles.charity_id}>Charity ID: {charityLead.charity_id}</Text>
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
    height: 100,
    marginBottom: -20,
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
