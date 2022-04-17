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
        // this.getVeteranList();
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
        console.log(this.state.userTypeId);
        if (this.state.userTypeId !== '3'){
            this.props.navigation.navigate('Home')
        }
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
        let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/veterans?token=' + token;// '&charity_id=' + charityId;

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

    navigateToPrevious = props => {
        props.navigation.navigate('Home_MCG');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => this.navigateToPrevious(this.props)}>
                    <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Veterans Page</Text>

                <ScrollView style={styles.scrollView}>
                    <VeteranUsers 
                        data={this.state.data} 
                        token={this.state.token}/>
                </ScrollView>

                <Button color="black" title="back" onPress={() => this.navigateToPrevious(this.props)} />
            </View>
        )
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
        width: 300,
        marginTop: '5%',
        marginLeft: '5%',
        marginBottom: '5%',
        fontSize: 35,
        textAlign: 'center',
    },

    scrollView: {
        marginTop: 25,
        marginBottom: 15,
        marginHorizontal: 20,
        color: 'red'
    },
})
