import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, StyleSheet, ScrollView } from 'react-native';
import app from '../../firebaseInit';

export default class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleText = (text) => {
        this.setState({text});
    }

    sendMessage = () => {
        app.database().ref('messages/').push({
            sender: 'user',
            text: this.state.text
        });
        this.setState({text: ''});
    }

    render() {
        return(
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <TextInput value={this.state.text} onChangeText={this.handleText} style={{width: 290, fontSize: 16}}/>
                </View>
                <TouchableHighlight onPress={this.sendMessage} style={styles.sendBtn}>
                    <Text style={{color: 'white', fontWeight: '900'}}>Send</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        elevation: 4,
        flexDirection: 'row',
        backgroundColor: '#E0E0E0',
    },

    input: {
        borderStyle: 'solid',
        marginTop: 20,
        paddingTop: -10,
        paddingBottom: -10,
        width: 290,
        marginBottom: 20,
        marginLeft: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    sendBtn: {
        backgroundColor: '#00BFA5',
        width: 50,
        marginLeft: 6,
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        marginTop: 20,
        borderRadius: 4
    }
});
