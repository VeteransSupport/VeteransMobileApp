import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet, Text, View, Button} from 'react-native';

const NavigateToMain = props => {
    props.navigation.navigate('Main');//used to navigate using a component
}

const Contact = props => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title='Go To Main Screen' onPress={()=> NavigateToMain(props)} />
      </View>
    );
  }

export default Contact;