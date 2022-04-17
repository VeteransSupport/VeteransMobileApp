import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Alert, Image, TextInput, TouchableOpacity, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SupportUser from "./SupportUser";
import { Button } from "react-native-web";

export default class EditSupportUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: false,
            isRemoved: true,
            data: [],
        }
    }

    componentDidMount() {
        this.getSupportUser();
    }

    getSupportUser() {
        let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/support_users?token=' + this.props.token + '&id=' + this.props.supportUserID;

        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((results) => {
                this.setState({ data: results.results });
                console.log('results#########');
                console.log(results.results);
            })
            .catch((errStatusCode) => {
                console.log("something went wrong ", errStatusCode);
                Alert.alert('Something went wrong', 'Please log out and log in again.');

                console.log('something went wrong :: Status Code ' + errStatusCode.message);
                this.props.handlePageChange('', 'list');
                Alert.alert('Something went wrong', 'Your session may have expired\n\nPlease log back in and recreate your charity.');
            });
    }

    removeSupportUser() {
        let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/edit_support_users';
        let formData = new FormData();
        formData.append('token', this.props.token);
        formData.append('request', 'delete');
        formData.append('id', this.props.supportUserID);

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
                // Support User deleted
                // Change state
                this.setState({ isRemoved: true });
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

    async _clear() {
        await AsyncStorage.clear();
        console.log('User logged out');
    }

    navigateToList = props => {
        props.navigation.navigate('list');
    }

    handleDeleteClick() {
        this.removeSupportUser();
    }

    render() {
        return (
            <View>
                <ScrollView style={styles.scrollView}>
                    <SupportUser data={this.state.data} />
                </ScrollView>
                <TouchableOpacity 
                        style={styles.deleteBtn} 
                        onPress={() => this.handleDeleteClick()} >
                    <Text style={styles.deleteText}>
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    scrollView: {
        marginTop: 25,
        marginBottom: 15,
        marginHorizontal: 20,
        color: 'red'
    },

    deleteBtn: {
        position: 'absolute',
        top: '100%',
        right: '37%',
        width: '25%',
        borderRadius: 3,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        color: 'red',
        backgroundColor: '#000',
        zIndex: 999,
    },

    deleteText: {
        width: '100%',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
});
