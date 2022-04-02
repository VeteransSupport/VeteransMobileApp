import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

export default class Charity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() { }

  render() {
    return (
      <View>
        {this.props.data.map((paper, i) => {
          return (
            <View style={styles.card} key={i + paper.paper_id}>
              <Image style={styles.image} source={require('../../assets/favicon.png')} />
              <Text style={styles.id}>{i + 1}</Text>
              <Text style={styles.title}>{paper.paper_id}</Text>
              <Text style={styles.description}>{paper.paper_title}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 100,
    marginTop: 30,
    alignItems: 'flex-start',
  },

  image: {
    width: 100,
    height: 100,
  },

  id: {
    position: 'absolute',
    right: 0,
    width: 30,
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
