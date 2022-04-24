import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

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
                {charity_lead_users.type_id === '3' && <Text style={styles.cid}>Lead</Text>}
                {charity_lead_users.type_id === '5' && <Text style={styles.vid}>Veteran</Text>}
                <Text style={styles.charity}>{charity_lead_users.title}</Text>
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
    height: 50,
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

  cid: {
    position: 'absolute',
    right: 30,
    top: 2,
    width: 45,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#8b0000',
  },

  vid: {
    position: 'absolute',
    right: 30,
    top: 2,
    width: 60,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#9b870c',
  },

  charity: {
    right: 0,
    width: '100%',
    fontSize: 20,
    color: '#444',
  },

  email: {
    marginBottom: 10,
    right: 0,
    width: '100%',
    height: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
});
