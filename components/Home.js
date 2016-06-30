import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableHighlight } from 'react-native';
import app from '../firebaseInit';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }
    // componentWillMount() {
    //     AsyncStorage.getItem('User', (err, data) => {
    //         this.setState({email: JSON.parse(data).email});
    //     });
    // }

    logout = () => {
        AsyncStorage.removeItem('User', (result) => {
            if(!result) {
                console.log(AsyncStorage.getItem('User'));
                this.props.navigator.replace({name: 'Login'});
            }
        })
        // .then(() => {
        // });
    }
    render() {
        return (
            <View>
                <Text>{this.state.email}</Text>
                <TouchableHighlight onPress={this.logout}>
                    <Text>Logout</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
