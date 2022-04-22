import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import email from 'react-native-email';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      email: '',
      cc: '',
      bcc: '',
      subject: '',
      message: '',
    }
  }
  
  handleEmailTest() {
    const to = [this.state.email]
    email(to, {
      cc: [this.state.cc],
      bcc: [this.state.bcc],
      subject: this.state.subject,
      body: this.state.message
    }).catch(console.error)
  }

  handleSuccessClick() {
    if (this.state.email !== '' && this.state.subject !== '') {
        this.handleEmailTest();
    } else {
        if (this.state.email === '' && this.state.subject === '' &&  this.state.message === '') {
            Alert.alert('Incomplete Information', 'To:Email, Subject & Message is required.');
        } else if (this.state.email === '' && this.state.subject !== ''  && this.state.message !== '') {
          Alert.alert('Incomplete Information', 'To:Email is missing.');
        } else if (this.state.email !== '' && this.state.subject === ''  && this.state.message !== '') {
          Alert.alert('Incomplete Information', 'Subject is missing.');
        } else if (this.state.email !== '' && this.state.subject !== ''  && this.state.message === '') {
          Alert.alert('Incomplete Information', 'Message is missing.');
        } else if (this.state.email !== '' && this.state.subject === ''  && this.state.message === '') {
          Alert.alert('Incomplete Information', 'Subject & Message is missing.');
        } else if (this.state.email === '' && this.state.subject !== ''  && this.state.message === '') {
          Alert.alert('Incomplete Information', 'To:Email & Message is missing.');
        } else if (this.state.email === '' && this.state.subject === ''  && this.state.message !== '') {
          Alert.alert('Incomplete Information', 'To:Email & Subject is missing.');
        } 
    }
}

  handleBackClick = (props) => {
    props.navigation.navigate('Support User');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => this.handleBackClick(this.props)}>
          <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Contact Form</Text>

        <StatusBar style="auto" />

        <View style={styles.inputoutside}>
          <Text style={styles.headings}>To*: </Text>
          <View style={styles.inputViewEmail}>
            <TextInput
              style={styles.TextInputEmail}
              placeholder="e.g. example@gmail.com"
              placeholderTextColor="#aaa"
              onChangeText={(input) => this.setState({ email: input })}
            />
          </View>
        </View>

        <View style={styles.inputoutside}>
          <Text style={styles.headings}>cc: </Text>
        <View style={styles.inputViewEmail}>
          <TextInput
            style={styles.TextInputEmail}
            placeholder="cc"
            placeholderTextColor="#aaa"
            onChangeText={(input) => this.setState({ cc: input })}
          />
        </View>
        </View>

        <View style={styles.inputoutside}>
          <Text style={styles.headings}>bcc: </Text>
        <View style={styles.inputViewEmail}>
          <TextInput
            style={styles.TextInputEmail}
            placeholder="bcc"
            placeholderTextColor="#aaa"
            onChangeText={(input) => this.setState({ bcc: input })}
          />
        </View>
        </View>

        <View style={styles.inputoutside}>
          <Text style={styles.headings}>subject*: </Text>
        <View style={styles.inputViewEmail}>
          <TextInput
            style={styles.TextInputEmail}
            placeholder="subject"
            placeholderTextColor="#aaa"
            onChangeText={(input) => this.setState({ subject: input })}
          />
        </View>
        </View>

        <View style={styles.inputoutside}>
          <Text style={styles.headings}>message*: </Text>
        <View style={styles.inputViewMessage}>
          <TextInput
            style={styles.TextInputMessage}
            multiline={true}
            placeholder="Content"
            placeholderTextColor="#aaa"
            onChangeText={(input) => this.setState({ message: input })}

          />
        </View>
        </View>

        <TouchableOpacity
          style={styles.sendEmailBtn}
          onPress={() => this.handleSuccessClick()}>
          <Text
            style={styles.submitText}>
            Send Email
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    left: '20%',
  },
  
  inputoutside: {
    flexDirection:"row"
  },

  headings: {
    width: 80,
    fontSize: 16,
  },

  imageContainer: {
    width: '100%',
    height: 74,
    marginLeft: 200,
  },

  image: {
    position: 'absolute',
    width: 119,
    height: 74,
    alignSelf: 'center',
  },

  image: {
    position: 'absolute',
    top: '6%',
    left: '-20%'
  },

  title: {
    fontSize: 32,
    marginTop: 20,
    marginBottom: 40,
    fontWeight: 'bold',
  },

  inputViewEmail: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#000',
    width: '110%',
    height: 40,
    marginBottom: 20,
    color: '#fff',
    alignItems: 'center',
  },

  inputViewMessage: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#000',
    width: '110%',
    height: 145,
    marginBottom: 20,
    color: '#fff',
    alignItems: 'center',
  },

  TextInputEmail: {
    height: 50,
    width: '100%',
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: '#000',
  },

  TextInputMessage: {
    height: 130,
    width: '100%',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 20,
    color: '#000',
  },

  sendEmailBtn: {
    width: '80%',
    borderRadius: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  submitText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },
});
