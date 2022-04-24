import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default class EditSUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() { }

  render() {
    return (
      <View>
        {this.props.data.map((support_users, i) => {
          return (
            <View style={styles.card} key={support_users.id}>
                <TouchableOpacity style={styles.container}>
                  <Text style={styles.id}>{i + 1}</Text>
                  <Text style={styles.email}>{support_users.email}</Text>
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
    height: 30,
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
    right: 0,
    width: '100%',
    height: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },

});
