import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView, StyleSheet, Alert, Image, ScrollView, TouchableOpacity } from "react-native";
import MCGSCharity from "../mainCharityGroupSupport/MCGSCharity";
import CharityLead from "../mainCharityGroupSupport/CharityLead";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class CharityGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            token: false,
            authenticated: false,
            userTypeId: '',
            id: '',
            page: 'charity', // charity, userList
            currentSupportUser: '',
        }

        this.handlePageChange = this.handlePageChange.bind();
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            this.setState({ token: token });
            this.getUserTypeId(token);
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
        } else {
            this.myCharityGroup(this.state.token);
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
                this.setState({ authenticated: true, userTypeId: data.results[0].type_id, id: data.results[0].id });
            })
            .catch((err) => {
                console.log("something went wrong ", err);
                Alert.alert('Something went wrong', 'Please log out and log in again.');
            });
    }

    myCharityGroup = async (token) => {
        console.log('id###: ' + this.state.id)
        let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/charity_lead?token=' + token + '&id=' + this.state.id;

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

    handleBackClick = (props) => {
        props.navigation.navigate('Home_MCGS');
    }

    handlePageChange = (id, pageName) => {
        this.setState({ page: pageName, currentSupportUser: id });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => this.handleBackClick(this.props)}>
                    <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
                </TouchableOpacity>
                {this.state.page === 'charity' &&
                    <View style={styles.container}>
                        <Text style={styles.title}>Charity Groups</Text>

                        <ScrollView style={styles.scrollView}>
                            <MCGSCharity data={this.state.data} handlePageChange={this.handlePageChange} />
                        </ScrollView>
                    </View>
                }
                {this.state.page === 'userList' &&
                    <View style={styles.container}>
                        <CharityLead
                            handlePageChange={this.handlePageChange}
                            supportUserID={this.state.currentSupportUser}
                            token={this.state.token} />
                    </View>
                }
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => this.handleBackClick(this.props)}>
                    <Text
                        style={styles.backText}>
                        BACK
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 100,
        marginBottom: -20,
        alignItems: 'flex-start',
    },

    // container: {
    //     width: '100%',
    // },

    id: {
        position: 'absolute',
        marginTop: 20,
        top: -20,
        right: 5,
        width: 25,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#444',
    },

    charity_id: {
        position: 'center',
        right: 0,
        width: 100,
        fontWeight: 500,
        color: '#444',
    },

    email: {
        // position: 'absolute',
        marginBottom: 10,
        right: 0,
        width: '60%',
        height: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444',
    },
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
        marginTop: 50,
        marginHorizontal: 20,
        color: 'red'
    },

    text: {
        fontSize: 42,
    },

    backBtn: {
        height: 35,
        width: 115,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 3,
        backgroundColor: '#000',
    },

    backText: {
        width: '100%',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
});
