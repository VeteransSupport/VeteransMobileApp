import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Charity from "../charity/Charity";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class MainCharityGroupSupport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            token: false,
            authenticated: false,
            userTypeId: '',
        }
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            this.setState({ token: token });
            this.getUserTypeId(token);
            this.getData();
        }

        // Setting timeout to wait for
        // the state to be updated
        setTimeout(this.verityUserType,
            1000
        ); 
    }

    verityUserType = () => { }

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

    navigateToCharityGroupPage = props => {
        props.navigation.navigate('Charity Group');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <Text style={styles.title}>Main Charity Group Support</Text>

                        <ScrollView style={styles.scrollView}>
                            <Charity data={this.state.data}/>
                        </ScrollView>

                        <TouchableOpacity style={styles.CGButton} onPress={() => this.navigateToCharityGroupPage(this.props)}>
                            <Text
                                style={styles.CGText}>
                                My Charity
                            </Text>
                        </TouchableOpacity>
                    </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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
        textAlign: 'center',
        padding: 10,
        color: '#fff',
    },

})
