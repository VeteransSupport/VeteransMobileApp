import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/LogOut';

class NominatedContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render(){

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View>
            <Text>Add your nominated contact(s)</Text>
            
            <View style={styles.contactsForm}>
              <View style={styles.contactInfo}>
                <Text>*1)</Text>
                <View style={styles.input}>
                  <Text style={styles.formText}>Name </Text>
                  <TextInput style={styles.inputField} placeholder='Full Name'/>
                </View>
                <View style={styles.input}>
                  <Text style={styles.formText}>Email </Text>
                  <TextInput style={styles.inputField} placeholder='Email'/>
                </View>
              </View>

              <View style={styles.contactInfo}>
                <Text>2)</Text>
                <View style={styles.input}>
                  <Text style={styles.formText}>Name </Text>
                  <TextInput style={styles.inputField} placeholder='Full Name'/>
                </View>
                <View style={styles.input}>
                  <Text style={styles.formText}>Email </Text>
                  <TextInput style={styles.inputField} placeholder='Email'/>
                </View>
              </View>

              <View style={styles.contactInfo}>
                <Text>3)</Text>
                <View style={styles.input}>
                  <Text style={styles.formText}>Name </Text>
                  <TextInput style={styles.inputField} placeholder='Full Name'/>
                </View>
                <View style={styles.input}>
                  <Text style={styles.formText}>Email </Text>
                  <TextInput style={styles.inputField} placeholder='Email'/>
                </View>
              </View>
            </View>

            <View>
              <Text>Add your 6 digit acess code:</Text>
              <TextInput style={styles.inputField2} placeholder='6 digit code'/>
              <Text>Your nominated contacts will receive an email reminding them to download the app.</Text>
              <Text>REMEMBER: You must give them their access code for registration.</Text>
            </View>

            <View style={styles.button}>
              <Button title="Complete registration" color="#1C1C1C"/>
            </View>

        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  page:{
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "space-evenly",
    writtingDirection: "ltr",
    AlignItems : "center",
    margin: 10,
    padding: 10
  },

  header:{
    flex: 1,
    margin: 0,
    marginBottom: 3
  },

  body:{
    flex: 1
  },

  button:{
    marginTop: 15,
  },

  title:{
    textAlign: "flex-start",
    alignSelf: "flex-start",
    fontSize: 35,
    margin: 0,
    marginTop: 20,
    fontWeight: "bold",

  },

  contactInfo:{
    alignSelf: "center"
  },

  contactsForm:{
    alignContent: "center",
  },

  inputField:{
    backgroundColor: "#D3D3D3",
    alignSelf: "right",
    fontSize: 16,
    padding: 2
  },

  inputField2:{
    backgroundColor: "#D3D3D3",
    alignSelf: "center",
    fontSize: 16,
    padding: 2,
    textAlign: "center"
  },

  input:{
    flexDirection: "row",
  },

  formText:{
    width: 50,
  },

  button:{
    marginTop: 15,
    width: 200,
    alignSelf: "center"
  }
})
export default NominatedContacts;