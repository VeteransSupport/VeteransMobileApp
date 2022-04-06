import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";

function empty(val){
  let retVal = false;
  if(typeof val === 'undefined' || val == '' || val == null || val == NaN || val == 0){
    retVal = true;
  }
  return retVal;
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      email: '',
      message: ''
    }
  }

  handleEmail = (text) => {
    this.setState({ email: text });
  }

  handleMessage = (text) => {
    this.setState({ message: text });
  }

  submitForm = () => {
    //alert(this.state.message)

    const email = this.state.email;
    const message = this.state.message;

    if(!empty(email) && !empty(message)){
      //alert("All good.")
      let form = new FormData();
      form.append('email', email);
      form.append('message', message);

      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          if(xhttp.responseText == 'success'){
            alert("Thank you for you enquiry.");
          } else{
            alert("Something went wrong, please try again later.");
          }
        }
      };
      xhttp.open("POST",'http://unn-w18021407.newnumyspace.co.uk/kf6002/sendEmail.php');
      xhttp.send(form);
    } else {
      alert("please fill out all the required fields");
    }
  }

  render() {
    return (
        <View style={styles.container}>

          <Text style={styles.title}>Contact Form</Text>

          <StatusBar style="auto" />
          <View style={styles.inputViewEmail}>
            <TextInput
              style={styles.TextInputEmail}
              placeholder="e.g. example@gmail.com"
              placeholderTextColor="#aaa"
              onChangeText={this.handleEmail}
            />
          </View>

          <View style={styles.inputViewMessage}>
            <TextInput
              style={styles.TextInputMessage}
              multiline={true}
              placeholder="Content"
              placeholderTextColor="#aaa"
              onChangeText={this.handleMessage}
            />
          </View>

          <TouchableOpacity
            style={styles.sendEmailBtn}
            onPress={this.submitForm}>
            <Text
              style={styles.submitText}>
              Send Email
            </Text>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // To center horizontally on screen
    width: '60%',
    left: '20%',
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
    width: '100%',
    height: 45,
    marginBottom: 20,
    color: '#fff',
    alignItems: 'center',
  },

  inputViewMessage: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#000',
    width: '100%',
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
