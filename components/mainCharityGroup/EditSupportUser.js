import React from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SupportUser from "./EditSUser";

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
        let url = 'http://urbackup.atwebpages.com/api/support_users?token=' + this.props.token + '&id=' + this.props.supportUserID;

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
                console.log('results');
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
        let url = 'http://urbackup.atwebpages.com/api/edit_support_users';
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
                this.setState({ isRemoved: true });
                this.props.handleBClick()
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
                <Text style={styles.title}>Delete Support User?</Text>
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

                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => this.props.handleBClick()}>
                    <Text
                        style={styles.backText}>
                        BACK
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    scrollView: {
        height: 120,
        width: 350,
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

    title: {
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '5%',
        fontSize: 35,
        textAlign: 'center',
    },

    backBtn: {
        position: 'absolute',
        top: '100%',
        right: 15,
        width: '25%',
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
});
