import React from 'react';
import { StyleSheet, Text, View, Alert, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class MCGSChangeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            token: false,
            authenticated: false,
            userTypeId: '',
            email: '',
            password: '',
            id: '',
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
            500
        );
    }

    verityUserType = () => {
        if (this.state.userTypeId !== '4' || this.state.userTypeId === '') {
            this.props.navigation.navigate('Home')
        }
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
                this.setState({ authenticated: true, userTypeId: data.results[0].type_id, id: data.results[0].id, email: data.results[0].email });
            })
            .catch((errStatusCode) => {
                console.log('something went wrong :: Status Code ' + errStatusCode.message);
                this.props.navigation.navigate('Home');
                this._clear();
                Alert.alert('Something went wrong', 'Your session may have expired\n\nPlease log in again.');
            });
    }

    updateSupportUser() {
        let url = 'http://urbackup.atwebpages.com/api/edit_support_users';
        let formData = new FormData();
        formData.append('token', this.state.token);
        formData.append('request', 'edit');
        formData.append('id', this.state.id);
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
                this.props.navigation.navigate('Support User');
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
        props.navigation.navigate('Support User');
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

    handleSuccessClick() {
        if (this.state.email !== '' && this.state.password !== '') {
            this.updateSupportUser();
            Alert.alert('Support user Updated:', this.state.email);
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

                <Text style={styles.title}>Change Details</Text>

                <Text style={styles.textStyle}>use the below fields to change your email {'&'} password</Text>
                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.formText}>Email: </Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder='Email'
                            placeholderTextColor='#aaa'
                            onChangeText={(input) => this.setState({ email: input })}
                            value={this.state.email} />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.formText}>Password: </Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder='New Password'
                            secureTextEntry={true}
                            placeholderTextColor='#aaa'
                            onChangeText={(input) => this.setState({ password: input })} />
                    </View>

                    <TouchableOpacity
                        style={styles.addUserBtn}
                        onPress={() => this.handleSuccessClick()}>
                        <Text
                            style={styles.addUserText}>
                            UPDATE DETAILS
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.prev} onPress={() => this.navigateToPrevious(this.props)}>
                        <Text style={styles.continueText}>BACK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
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
        marginTop: 20,
        marginBottom: 40,
        fontWeight: 'bold',
    },

    textStyle: {
        textAlign: 'center',
        marginBottom: 20,
    },

    form: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    input: {
        flexDirection: 'row',
        marginTop: 10,
    },

    formText: {
        width: 80,
        fontSize: 16,
    },

    inputField: {
        width: 200,
        backgroundColor: '#eee',
        alignSelf: 'flex-start',
        fontSize: 16,
        padding: 2,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#000',
        marginLeft: 10,
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

    prev: {
        width: '50%',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        color: 'red',
        backgroundColor: '#000',
    },

    continueText: {
        width: '100%',
        textAlign: 'center',
        color: '#fff',
    },
})
