import React from "react";
import { StyleSheet, View, Text, CheckBox, TouchableOpacity } from "react-native";

export default class SupportUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() { }

  render() {
    return (
      <View>
        {this.props.data.map((user, i) => {
          return (
            <View style={styles.card} key={user.id}>
                <TouchableOpacity style={styles.container} onPress={() => this.props.handlePageChange(user.id, 'user')}>
                  <Text style={styles.id}>{i + 1}</Text>
                  <Text style={styles.email}>{user.email}</Text>
                  <Text style={styles.charity}>Charity: {user.title}</Text>
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
    height: 70,
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
    right: 25,
    width: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#444',
  },

  charity: {
    position: 'center',
    right: 0,
    width: '100%',
    // fontWeight: 500,
    fontSize: 20,
    color: '#444',
  },

  email: {
    // position: 'absolute',
    marginBottom: 10,
    right: 0,
    width: '100%',
    height: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },

  password: {
    position: 'center',
    right: 0,
    width: '60%',
    height: 20,
    fontWeight: 'normal',
    color: '#444',
  },
});
