import React, { Component } from 'react';
import { View, Text } from 'react-native';
import app from '../firebaseInit';

export default class Home extends Component {
    render() {
        return (
            <View>
                <Text>{app.auth().currentUser.email}</Text>
            </View>
        )
    }
}
