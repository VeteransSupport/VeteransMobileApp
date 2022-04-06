import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Charity from "../charity/Charity";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class MainCharityGroupSupport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    async componentDidMount() {
        this.getData();
    }

    getData() {
        return fetch('http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/charities')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson.results });
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Error', 'Couldnt get list of charities');
            });
    }

    clearAllAsyncStorage = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log('Couldnt clear AsyncStorage: ' + e);
            Alert.alert('Error logging out', 'Could not clear session token.');
        }

        console.log('User logged out')
    }

    navigateToCharityGroupPage = props => {
      props.navigation.navigate('Charity Group');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Main Charity Group Support</Text>

                <ScrollView style={styles.scrollView}>
                    <Charity data={this.state.data} />
                </ScrollView>

                <TouchableOpacity style={styles.CGButton} onPress={() => this.navigateToCharityGroupPage(this.props)}>
                    <Text
                        style={styles.CGText}>
                        Charity Group
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: '60%',
        // left: '20%',
        flex: 1,
        marginTop: 35,
        paddingTop: StatusBar.currentHeight,
    },

    imageContainer: {
        width: '100%',
        height: 74,
    },

    image: {
        position: 'absolute',
        width: 119,
        height: 74,
        alignSelf: 'center',
    },

    title: {
        marginTop: '5%',
        marginLeft: '5%',
        fontSize: 35,
        textAlign: 'center',
    },

    scrollView: {
        marginTop: 25,
        marginHorizontal: 20,
        color: 'red'
    },

    text: {
        fontSize: 42,
    },

    CGButton: {
      borderRadius: 5,
      height: 50,
      width: 115,
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: '#000',
    },
  
    CGText: {
      width: '100%',
      justifyContent: 'center',
      padding: 10,
      color: '#fff',
    },

})
