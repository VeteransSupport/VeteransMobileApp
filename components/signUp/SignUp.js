import React, {useState} from 'react';
import { Text, StyleSheet, Image, View, TextInput, Button, Switch, Linking } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/LogOut';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  

  componentDidMount() {
  }

  render(){
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up page</Text>
          {/* <Image style={styles.logo} source={require('VETERANSMOBILEAPP/assets/favicon.png')}/> */}
        </View>
        
        <View style={styles.form}>
          <View style={styles.input}>
              <Text style={styles.formText}>Full Name: </Text>
              <TextInput style={styles.inputField} placeholder='Full Name'/>
          </View>
          <View style={styles.input}>
              <Text style={styles.formText}>Email: </Text>
              <TextInput style={styles.inputField} placeholder='Email'/>
          </View>
          <View style={styles.input}>
              <Text style={styles.formText}>Service: </Text>
              <TextInput style={styles.inputField} placeholder='Service'/>
          </View>
          <View style={styles.input}>
              <Text style={styles.formText}>Phone Number: </Text>
              <TextInput style={styles.inputField} placeholder='Phone Number'/>
          </View>
          <View style={styles.input}>
              <Text style={styles.formText}>Password: </Text>
              <TextInput style={styles.inputField} placeholder='Password'/>
          </View>
          <View>
            <Text style={styles.termsAndConditions} onPress={()=>Linking.openURL('http://google.com')}>Terms and Conditions</Text>
            <Switch/>
          </View>
          <View style={styles.button}>
          <Button title="Continue" color="#1C1C1C"/>
          </View>
        </View>

        <View style={styles.footer}>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    title:{
      textAlign: "center",
      fontSize: 22,
      margin: 0,
      marginTop: 20,
      fontWeight: "bold"
    },

    header:{
      flex: 1,
      FlexDirection: "row",
      alignItems: "left",
      justifyContent: "center"
    },
    
    page:{
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-evenly",
      writtingDirection: "ltr",
      AlignItems : "flex-start",
      margin: 2,
      padding: 2
      
    },

    inputField:{
      backgroundColor: "#D3D3D3",
      alignSelf: "right",
      fontSize: 16,
      padding: 2
    },

    termsAndConditions:{
      marginTop: 15,
      color: "#03a9f4",
      fontSize: 16
    },

    form:{
      flex: 4,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    
    footer:{
      flex: 1,
      FlexDirection: "row",
      alignItems: "center"
    },

    input:{
      flexDirection: "row",
      marginTop: 10
    },

    formText:{
      width: 80,
      fontSize: 16
    },

    button:{
      marginTop: 15,
    }
})

export default SignUp;