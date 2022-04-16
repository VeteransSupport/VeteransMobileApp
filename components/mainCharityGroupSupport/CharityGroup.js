import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import MCGSCharity from "../mainCharityGroupSupport/MCGSCharity";
import CharityLead from "../mainCharityGroupSupport/CharityLead";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class CharityGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    async componentDidMount() {
        // Promise.all(
            this.getData2()
            // this.getData()
        // )
    }

    getData() {
        return fetch('http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/charity_lead')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson.results });
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Error', 'Couldnt get list of charity Leads');
            });
    }

    getData2() {
        return fetch('http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/charities?id=1')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson.results });
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Error', 'Couldnt get list of charities');
            });
    }

    clearAllAsyncStorage = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log('Couldnt clear AsyncStorage: ' + e);
            Alert.alert('Error logging out', 'Could not clear session token.');
        }

        console.log('User logged out')
    }

    handleBackClick = (props) => {
      props.navigation.navigate('Home_MCGS');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => this.handleBackClick(this.props)}>
                    <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Charity Groups</Text>

                <ScrollView style={styles.scrollView}>
                    <MCGSCharity data={this.state.data}/>
                    {/* <CharityLead data={this.state.data}/> */}
                </ScrollView>

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
})
