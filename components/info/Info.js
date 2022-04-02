import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  navigateToMainPage = props => {
    props.navigation.navigate('Home');
  }

  navigateToCharitiesPage = props => {
    props.navigation.navigate('Charities');
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>How does it work?</Text>
          <Text style={styles.userText}>User - Sign up, nominate your contact(s) and charity, keep a daily note of your mood. The contact details you upload will be shader with your nominations.</Text>
        </View>

        <View style={styles.mainBody}>
          <View style={styles.trafficLightImage}>
            <Image source={require('../../assets/trafficLightTemporary.png')} />
          </View>
          <View style={styles.trafficlightDescription}>
            <Text>Red - If i'm being honest with myself, I need some help. I'm consistantly feeling low or irritable.</Text>
            <Text>Amber - I'm feeling alright but i've been feeling a bit low or irritable for a couple of days now. I wouldn't mind a chat or a brew.</Text>
            <Text>Green - I'm feeling good and don't need any support right now! I wouldn't mind a social though.</Text>
          </View>
          <View style={styles.bottomDescription}>
            <Text style={styles.nominatedText}>Nominated Contact - Sign Up using your code and be alerted to changes in the traffic light mood system. It is your responsibility to inform the user of changes to your availability on this system.</Text>
            <Text style={styles.charitiesText}>Charities - Have your support lead message us to register an account. You can monitor and administrate all beneficiaries. The lead can add support worker accounts. Support worker accounts will be alerted to traffic light mood system changes.</Text>
          </View>
        </View>

        <View style={styles.guideButtons}>
          <Button color="black" title="back" onPress={() => this.navigateToMainPage(this.props)} />
          <Button color="black" title="visit charity list" onPress={() => this.navigateToCharitiesPage(this.props)} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#fff'
  },

  header: {
    width: '100%',
    height: '22%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    width: '100%',
    height: '50%',
    textAlign: 'center',
    paddingTop: 40,
    fontSize: 35,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },

  userText: {
    width: '100%',
    height: '50%',
    padding: 10,
    paddingLeft: 15,
  },

  mainBody: {
    width: '100%',
    height: '66%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  trafficLightImage: {
    width: '35%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  trafficlightDescription: {
    width: '65%',
    height: '55%',
    justifyContent: 'space-evenly',
    padding: 5,
  },

  bottomDescription: {
    width: '100%',
    height: '45%',
    padding: 10
  },

  nominatedText: {
    width: '100%',
    height: '40%',
  },

  charitiesText: {
    width: '100%',
    height: '60%',
  },

  guideButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 2,
  },
});
