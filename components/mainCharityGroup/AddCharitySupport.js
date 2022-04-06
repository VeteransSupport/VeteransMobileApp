import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, Button, Image, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AddCharitySupport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            email: '',
            password: '',
            removeUser: false,
            signup: false
        }
    }

    async componentDidMount() {
        this._retrieveData('token');
    }

    _retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                this.setState({ authenticated: true })
            } else {
            }
        } catch (e) {
            console.log('Cound not store token in AsyncStorage: ' + e);
            Alert.alert('Error getting token', 'Could not retrieve session token.');
        }
    }

    _storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(
                key,
                value
            );
        } catch (e) {
            console.log('Error storing token in AsyncStorage: ' + e);
            Alert.alert('Error logging in', 'Could not store session token.');
        }

        console.log('User logged in')
    };

    clearAllAsyncStorage = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log('Could not clear AsyncStorage: ' + e);
            Alert.alert('Error logging out', 'Could not clear session token.');
        }

        console.log('User logged out')
    }

    handleEmail = (text) => {
        this.setState({ email: text });
    }

    handlePassword = (text) => {
        this.setState({ password: text });
    }

    handleSuccessClick = (props) => {
        props.navigation.navigate('Welcome');
    }


    navigateToPrevious = props => {
        props.navigation.navigate('Home | MCG');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.image} onPress={() => this.handleLogoClick(this.props)}>
                    <Image source={require("../../assets/urbackupTemporary_Transparent.png")} />
                </TouchableOpacity>

                <Text style={styles.title}>Add Charity Support Page</Text>

                <StatusBar style="auto" />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        onChangeText={this.handleEmail}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry={true}
                        onChangeText={this.handlePassword}
                    />
                </View>

                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={this.handleLoginClick}>
                    <Text
                        style={styles.loginText}>
                        LOGIN
                    </Text>
                </TouchableOpacity>

                <View style={styles.bkBtn}>
                <Button color="black" title="back" onPress={() => this.navigateToPrevious(this.props)} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 40,
        fontWeight: 'bold',
    },

    inputView: {
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

    TextInput: {
        height: 50,
        width: '100%',
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color: '#000',
    },

    loginBtn: {
        width: '80%',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        color: 'red',
        backgroundColor: '#000',
    },

    loginText: {
        width: '100%',
        textAlign: 'center',
        color: '#fff',
    },

    bkBtn: {
        marginTop: 20,
    },
})