import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

export default class MCGSCharity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() { }

  render() {
    return (
      <View>
        {this.props.data.map((charity, i) => {
          return (
            <View style={styles.card} key={charity.id}>
              <TouchableOpacity style={styles.container}>
                <Image style={styles.image} source={require('../../assets/favicon.png')} />
                <Text style={styles.id}>{i + 1}</Text>
                <Text style={styles.title}>{charity.title}</Text>
                <Text style={styles.description}>{charity.description}</Text>
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
    marginTop: 30,
    alignItems: 'flex-start',
  },

  container: {
    width: '100%',
  },

  image: {
    width: 100,
    height: 100,
  },

  id: {
    position: 'absolute',
    top: -20,
    right: 5,
    width: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#444',
  },

  title: {
    position: 'absolute',
    right: 0,
    width: '60%',
    height: 20,
    fontWeight: 'bold',
    color: '#444',
  },

  description: {
    position: 'absolute',
    right: 0,
    top: 20,
    width: '60%',
    height: 80,
    color: '#444',
  },
});
