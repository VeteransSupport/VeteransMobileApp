import React from 'react';
import { Text, View, StyleSheet, Button} from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/LogOut';

class SelectCharity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  }
  componentDidMount() {
  }

  render(){
    const { open, value, items } = this.state;

    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.header2}>Select Charity</Text>
          <Text style={styles.paragraph}>
            If you do not already have a charity in mind then we recommend you look into the charities avalible and read their 'about us pages'.
          </Text>
          <Text style={styles.paragraph}>
            Alternatibly, visit the 'how does it work' page for a basic charity desciption. 
          </Text>
          <Text style={styles.paragraph}>
            If you have a charity in mind but they are not on the list, please contact your chosen charity and ask them to register.
          </Text>
          <View style={styles.button}>
            <Button title="Continue" color="#1C1C1C"/>
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
    justifyContent: "flex-start",
    writtingDirection: "ltr",
    AlignItems : "flex-start",
    margin: 2,
    padding: 2
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

  header2:{
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold"
  },

  paragraph:{
    fontSize: 14,
    marginTop: 10
  }
})

export default SelectCharity;