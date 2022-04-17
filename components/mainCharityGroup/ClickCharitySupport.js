import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView, StyleSheet, Alert, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import SupportUser from "./SupportUser";
import EditSupportUser from "./EditSupportUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ClickCharitySupport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            token: false,
            authenticated: false,
            userTypeId: '',
            page: 'list', // list, user
            currentSupportUser: '',
        }

        this.handlePageChange = this.handlePageChange.bind();
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            this.setState({ token: token });
            this.getUserTypeId(token);
            this.getSupportUsers(token);
        }

        // Setting timeout to wait for
        // the state to be updated
        setTimeout(this.verifyUserType,
            1000
        );
    }

    verifyUserType = () => {
        console.log('type_id: ' + this.state.userTypeId);
        if (this.state.userTypeId === '5' || this.state.userTypeId === '') {
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

    getSupportUsers = async (token) => {
        let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/support_users?token=' + token;

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
                console.log("something went wrong ", err);
                Alert.alert('Error', 'Couldnt get list of Support Users');
            });
    }

    navigateToPrevious = props => {
        props.navigation.navigate('Home_MCG');
    }

    handlePageChange = (id, pageName) => {
        this.setState({ page: pageName, currentSupportUser: id });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => this.navigateToPrevious(this.props)}>
                        <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
                    </TouchableOpacity>
                {this.state.page === 'list' &&
                    <View style={styles.container}>
                        <Text style={styles.title}>Charity Support Users</Text>

                        <ScrollView style={styles.scrollView}>
                            <SupportUser data={this.state.data} handlePageChange={this.handlePageChange} />
                        </ScrollView>
                    </View>
                }
                {this.state.page === 'user' &&
                    <View style={styles.container}>
                        <EditSupportUser handlePageChange={this.handlePageChange}
                            supportUserID={this.state.currentSupportUser}
                            token={this.state.token}
                            navigation={this.props.navigation}/>
                    </View>
                }
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => this.navigateToPrevious(this.props)}>
                    <Text
                        style={styles.backText}>
                        BACK
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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

    backBtn: {
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
