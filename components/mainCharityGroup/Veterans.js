import React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';

export default class Veterans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    navigateToPrevious = props => {
        props.navigation.navigate('Home | MCG');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => this.handleBackClick(this.props)}>
                    <Image style={styles.image} source={require('../../assets/urbackupTemporary_Transparent.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Veterans Page</Text>

                <Button color="black" title="back" onPress={() => this.navigateToPrevious(this.props)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        left: '20%',
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
})
