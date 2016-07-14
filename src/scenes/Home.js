import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableHighlight } from 'react-native';
import app from '../../firebaseInit';
import MessageInput from '../components/messageInput';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('User', (err, data) => {
            this.setState({email: JSON.parse(data).email});
        });
    }

    logout = () => {
        AsyncStorage.removeItem('User', (result) => {
            if(!result) {
                this.props.navigator.replace({name: 'Login'});
            }
        })
    }
    render() {
        return (
            <View>
            </View>
        )
    }
}
