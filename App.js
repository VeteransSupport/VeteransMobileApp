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
import SignUp from "./components/signUp/SignUp";
import SelectCharity from "./components/selectCharity/SelectCharity";
import NominatedContacts from "./components/nominatedContacts/NominatedContacts";
import Logout from "./components/logout/Logout";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Welcome" options={{ headerShown: true }} component={TrafficLight}/>
      <Drawer.Screen name="Change Details" options={{ headerShown: true }} component={ChangeDetails} />
      <Drawer.Screen name="Contact" options={{ headerShown: true }} component={Contact} />
      <Drawer.Screen name="Info" options={{ headerShown: false }} component={Info} />
      <Drawer.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
      <Drawer.Screen name="SelectCharity" options={{ headerShown: false }} component={SelectCharity} />
      <Drawer.Screen name="NominatedContacts" options={{ headerShown: false }} component={NominatedContacts} />
      <Drawer.Screen name="Home" options={{ headerShown: false }} component={Home} />
      <Drawer.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Drawer.Screen name="Logout" options={{ headerShown: false }} component={Logout} />
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