import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default class VeteranUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() { }

  render() {
    return (
      <View>
        {this.props.data.map((user, i) => {
          return (
            <View style={styles.card} key={user.id}>
              <TouchableOpacity style={styles.container}>
                <Text style={styles.id}>{i + 1}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.charity}>{user.title}</Text>
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
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: '#eee',
  },

  id: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 25,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#444',
  },

  email: {
    marginBottom: 10,
    right: 0,
    width: '100%',
    height: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },

  charity: {
    right: 0,
    width: '100%',
    fontSize: 20,
    color: '#444',
  },

});
