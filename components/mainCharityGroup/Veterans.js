import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, StyleSheet, Button, Alert, Image, TouchableOpacity } from 'react-native';
import VeteranUsers from "../mainCharityGroup/VeteranUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Veterans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            token: false,
            authenticated: false,
            userTypeId: '',
            charityId: '',
        }
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            this.setState({ token: token });
            this.getUserTypeId(token);
            this.getVeteranList(token);
        }

        // Setting timeout to wait for
        // the state to be updated
        setTimeout(this.verifyUserType,
            500
        );
    }

    verifyUserType = () => {
        if (this.state.userTypeId !== '3') {
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
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                this.setState({ authenticated: true, userTypeId: data.results[0].type_id });
            })
            .catch((err) => {
                console.log("something went wrong ", err);
                Alert.alert('Something went wrong', 'Please log out and log in again.');
            });
    }

    getVeteranList = async (token) => {
        let url = 'http://urbackup.atwebpages.com/api/veterans?token=' + token;

        fetch(url, {
            method: 'GET',
            headers: new Headers()
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((responseJson) => {
                this.setState({ data: responseJson.results });
            })
            .catch((err) => {
                console.log("something went wrong## ", err);
                Alert.alert('Error', 'Couldnt get list of Veterans');
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.handleNextClick(5)}>
                    <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>List of Veterans</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    <VeteranUsers
                        data={this.state.data}
                        token={this.state.token} />
                </ScrollView>

                <TouchableOpacity
                    style={styles.bkBtn}
                    onPress={() => this.props.handleNextClick(5)}>
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
    container: {
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        height: 574,
        paddingTop: StatusBar.currentHeight,
    },

    imageContainer: {
        width: '100%',
        height: 74,
        alignSelf: 'center',
        left: 0,
    },

    image: {
        position: 'absolute',
        width: 119,
        height: 74,
    },

    textContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    scrollView: {
        height: 450,
        width: 350,
        marginTop: 25,
        marginHorizontal: 10,
        color: 'red',
    },

    bkBtn: {
        marginBottom: 40,
        position: 'absolute',
        top: '100%',
        right: 15,
        width: '25%',
        borderRadius: 3,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -50,
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
