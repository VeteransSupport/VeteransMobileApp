import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

export default class MCGSChangeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    navigateToPrevious = props => {
        props.navigation.navigate('Home_MCGS');
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.title}>Change Details</Text>

                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.formText}>Email: </Text>
                        <TextInput style={styles.inputField} placeholder='Email' placeholderTextColor='#aaa' />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.formText}>Password: </Text>
                        <TextInput style={styles.inputField} placeholder='Password' placeholderTextColor='#aaa' />
                    </View>
                    
                    <TouchableOpacity
                        style={styles.prev}
                        onPress={() => this.navigateToPrevious(this.props)}>
                        <Text
                            style={styles.continueText}>
                            BACK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        textAlign: 'left',
    },

    title: {
        fontSize: 32,
        marginTop: 20,
        marginBottom: 40,
        fontWeight: 'bold',
    },

    form: {
        // flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    input: {
        flexDirection: 'row',
        marginTop: 10,
    },

    formText: {
        width: 80,
        fontSize: 16,
    },

    inputField: {
        backgroundColor: '#eee',
        alignSelf: 'flex-start',
        fontSize: 16,
        padding: 2,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#000',
        marginLeft: 10,
    },

    prev: {
        width: '50%',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        color: 'red',
        backgroundColor: '#000',
    },

    continueText: {
        width: '100%',
        textAlign: 'center',
        color: '#fff',
    },
})
