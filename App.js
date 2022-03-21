import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import Home from "./components/home/Home";
import SignUp from "./components/signUp/SignUp";
import SelectCharity from "./components/selectCharity/SelectCharity";
import NominatedContacts from "./components/nominatedContacts/NominatedContacts";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
        <Home />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});