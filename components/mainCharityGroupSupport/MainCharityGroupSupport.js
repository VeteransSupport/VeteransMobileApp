import React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from 'react-native';
import SupportHome from "../mainCharityGroupSupport/SupportHome";
import CharityGroup from "../mainCharityGroupSupport/CharityGroup";
import CharityLead from "../mainCharityGroupSupport/CharityLead";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class MainCharityGroupSupport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            token: false,
            authenticated: false,
            userTypeId: '',
            type: 'supportUser',
            pageNumber: 1,
        }

        this.handleLogoClick = this.handleLogoClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            this.setState({ token: token });
            this.getUserTypeId(token);
            this.getData();
        }

        setTimeout(this.verityUserType,
            500
        );
    }

    verityUserType = () => {
        if (this.state.userTypeId !== '4' || this.state.userTypeId === '') {
            this.props.navigation.navigate('Home')
        }
    }

    handleLogoClick = () => {
        this.props.navigation.navigate('Support User');
    }

    handleNextClick = (pageNumber) => {
        this.setState({ pageNumber: pageNumber });
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

    getData() {
        return fetch('http://urbackup.atwebpages.com/api/charities')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson.results });
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Error', 'Couldnt get list of charities');
            });
    }

    render() {
        let page = <SupportHome type={this.state.type}SupportHome
            handleNextClick={this.handleNextClick}
            handleLogoClick={this.handleLogoClick} />;

        if (this.state.pageNumber === 2) {
            page = <CharityGroup type={this.state.type}
                handleNextClick={this.handleNextClick}
                handleLogoClick={this.handleLogoClick}
                />;
        } else if (this.state.pageNumber === 3) {
            page = <CharityLead type={this.state.type}
                handleLogoClick={this.handleLogoClick}
                />;
        } else if (this.state.pageNumber === 4) {
            page = <SupportHome type={this.state.type}SupportHome
            handleNextClick={this.handleNextClick}
            handleLogoClick={this.handleLogoClick} />
        }

        return (
            <View style={styles.container}>
                {page}
            </View>
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
