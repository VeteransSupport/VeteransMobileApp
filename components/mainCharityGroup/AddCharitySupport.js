import React from "react";
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
        }
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            this.setState({ token: token });
            this.getUserTypeId(token);
        }

        // Setting timeout to wait for
        // the state to be updated
        setTimeout(this.verityUserType,
            1000
        );
    }

    verityUserType = () => {
    }

    getUserTypeId = async (token) => {
        let url = 'http://urbackup.atwebpages.com/api/user';
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
        let url = 'http://urbackup.atwebpages.com/api/edit_support_users';
        let formData = new FormData();
        formData.append('token', this.state.token);
        formData.append('request', 'add');
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
                this.props.handleNextClick(5);
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

    handleSuccessClick = props => {
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
                <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.handleNextClick(5)}>
                    <Image style={styles.image} source={require("../../assets/urbackupTemporary_Transparent.png")} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Add a Support User!</Text>
                    <Text style={styles.titleText}>Please Enter Email {'&'} Password</Text>
                </View>

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

                <TouchableOpacity
                    style={styles.addUserBtn}
                    onPress={() => this.handleSuccessClick(this.props)}>
                    <Text
                        style={styles.addUserText}>
                        ADD USER
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bkBtn}
                    onPress={() => this.props.handleNextClick(5)}>
                    <Text
                        style={styles.backText}>
                        BACK
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
    },

    textContainer: {
        height: 100,
        width: 300,
        alignItems: 'center',
        marginBottom: 10,
    },

    imageContainer: {
        marginTop: '40%',
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
        fontSize: 15,
        marginTop: 40,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    titleText: {
        marginBottom: 40,
    },

    inputView: {
        backgroundColor: '#eee',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#000',
        width: 230,
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

    addUserBtn: {
        width: 170,
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
        marginTop: 50,
        marginBottom: 40,
        width: '45%',
        borderRadius: 3,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red',
        backgroundColor: '#000',
        zIndex: 999,
    },

    backText: {
        width: '100%',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
})