import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, Button, Image, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AddCharitySupport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            token: false,
            authenticated: false,
            userTypeId: '',
            email: '',
            password: '',
            charityId: '',
        }
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            this.setState({ token: token });
            this.getUserTypeId(token);
        }
        // this.getData();

        // Setting timeout to wait for
        // the state to be updated
        setTimeout(this.verityUserType,
            1000
        );
    }

    verityUserType = () => {
        // TODO: REMOVE
        console.log(this.state.userTypeId);
    }

    getUserTypeId = async (token) => {
        let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/user';
        let formData = new FormData();
        formData.append('token', token);

        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(JSON.stringify(response.status))
                }
            })
            .then((data) => {
                this.setState({ authenticated: true, userTypeId: data.results[0].type_id });
            })
            .catch((errStatusCode) => {
                console.log('something went wrong :: Status Code ' + errStatusCode.message);
                this.props.navigation.navigate('Home');
                this._clear();
                Alert.alert('Something went wrong', 'Your session may have expired\n\nPlease log in again.');
            });
    }

    createNewSupportUser() {
        let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/support_users'; //?email= ' + 'testsupportuser11' + '&password=' + 'testsupportuser11 ' + '&request=add';
        let formData = new FormData();
        formData.append('token', this.state.token);
        formData.append('request', 'add');
        formData.append('charity_id', this.state.charityId);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);

        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if (response.status === 204) {
                    return response
                } else {
                    throw Error(response.status)
                }
            })
            .then(() => {
                // User created
                // Redirect to all charities page
                this.props.navigation.navigate('Home_MCG');
            })
            .catch((errStatusCode) => {
                console.log("something went wrong ", errStatusCode);
                Alert.alert('Something went wrong', 'Please log out and log in again.');

                console.log('something went wrong :: Status Code ' + errStatusCode.message);
                this.props.navigation.navigate('Home');
                this._clear();
                Alert.alert('Something went wrong', 'Your session may have expired\n\nPlease log back in and recreate your charity.');
            });
    }

    navigateToPrevious = props => {
        props.navigation.navigate('Home_MCG');
    }

    async _clear() {
        await AsyncStorage.clear();
        console.log('User logged out');
    }

    handleEmail = (text) => {
        this.setState({ email: text });
    }

    handlePassword = (text) => {
        this.setState({ password: text });
    }

    handleCharityID = (text) => {
        this.setState({ charityId: text });
    }

    handleSuccessClick = props => {
        // props.navigation.navigate('Welcome');
        if (this.state.email !== '' && this.state.password !== '') {
            this.createNewSupportUser();
            Alert.alert('Support user created:', this.state.email);
        } else {
            if (this.state.email === '' && this.state.password === '') {
                Alert.alert('Incomplete Information', 'Email and Password are required.');
            } else if (this.state.email === '') {
                Alert.alert('Incomplete Information', 'Email is missing.');
            } else if (this.state.password === '') {
                Alert.alert('Incomplete Information', 'Password is missing.');
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => this.navigateToPrevious(this.props)}>
                    <Image style={styles.image} source={require("../../assets/urbackupTemporary_Transparent.png")} />
                </TouchableOpacity>

                <Text style={styles.title}>Add Charity Support Page</Text>

                {/* <StatusBar style="auto" /> */}
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        numberOfLines={1}
                        blurOnSubmit={true}
                        maxLength={125}
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

                <View style={styles.charityIDView}>
                    <TextInput
                        style={styles.charityIDTextInput}
                        placeholder="Charity ID"
                        placeholderTextColor="#aaa"
                        editable = {false}
                        onChangeText={this.handlePassword}
                    />
                </View>

                <TouchableOpacity
                    style={styles.addUserBtn}
                    onPress={() => this.handleSuccessClick(this.props)}>
                    <Text
                        style={styles.addUserText}>
                        ADD USER
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

    charityIDView: {
        backgroundColor: '#eee',
        width: '100%',
        height: 45,
        marginBottom: 20,
        color: '#fff',
        alignItems: 'center',
    },

    charityIDTextInput: {
        height: 50,
        width: '100%',
        flex: 1,
        textAlign: 'center',
        padding: 10,
        marginLeft: 20,
        color: '#000',
    },

    addUserBtn: {
        width: '80%',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        color: 'red',
        backgroundColor: '#000',
    },

    addUserText: {
        width: '100%',
        textAlign: 'center',
        color: '#fff',
    },

    bkBtn: {
        marginTop: 20,
    },
})