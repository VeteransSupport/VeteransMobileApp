import React, { useState } from "react";
import { StyleSheet, Button, View, } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/home/Home';
import ChangeDetails from './components/changeDetails/ChangeDetails';
import Contact from './components/contact/Contact';
import Login from "./components/login/Login";
import TrafficLight from './components/trafficLight/TrafficLight';
import Info from "./components/info/Info";
import SignUpPage from "./components/signUpPage/SignUpPage";
import Logout from "./components/logout/Logout";
import Charities from "./components/charities/Charities";
import CreateCharity from "./components/createCharity/CreateCharity";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Drawer.Navigator initialRouteName="CreateCharity">
      <Drawer.Screen name="Welcome" unmountOnBlur={true} options={{ headerShown: true, unmountOnBlur: true }} component={TrafficLight}/>
      <Drawer.Screen name="Charities" unmountOnBlur={true} options={{ headerShown: false, unmountOnBlur: true }} component={Charities} />
      <Drawer.Screen name="Home" unmountOnBlur={true} options={{ headerShown: false, unmountOnBlur: true }} component={Home} />
      <Drawer.Screen name="Info" unmountOnBlur={true} options={{ headerShown: false, unmountOnBlur: true }} component={Info} />
      <Drawer.Screen name="Contact" unmountOnBlur={true} options={{ headerShown: true, unmountOnBlur: true }} component={Contact} />
      <Drawer.Screen name="Change Details" unmountOnBlur={true} options={{ headerShown: true, unmountOnBlur: true }} component={ChangeDetails} />
      <Drawer.Screen name="CreateCharity" unmountOnBlur={true} options={{ headerShown: false, unmountOnBlur: true }} component={CreateCharity} />
      <Drawer.Screen name="SignUp" unmountOnBlur={true} options={{ headerShown: false, unmountOnBlur: true }} component={SignUpPage} />
      <Drawer.Screen name="Login" unmountOnBlur={true} options={{ headerShown: false, unmountOnBlur: true }} component={Login} />
      <Drawer.Screen name="Logout" unmountOnBlur={true} options={{ headerShown: false, unmountOnBlur: true }} component={Logout} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
