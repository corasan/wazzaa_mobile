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

    render() {
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.input}>
                        <TextInput value={this.state.text} onChangeText={this.handleText} />
                    </View>
                    <Text>Hello</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid',
        marginTop: 20,
        paddingTop: -10,
        paddingBottom: -10,
    }
});
