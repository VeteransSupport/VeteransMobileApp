import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet, Text, View, Button} from 'react-native';

const NavigateToDetails = props => {
    props.navigation.navigate('Change Details');//used to navigate using a component
}

const NavigateToContact = props => {
    props.navigation.navigate('Contact');//used to navigate using a component
}

const Main = props => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title='Go To Change Details Screen' onPress={()=> NavigateToDetails(props)} />
        <Button title='Go To Contact Screen' onPress={()=> NavigateToContact(props)} />
      </View>
    );
  }

export default Main;