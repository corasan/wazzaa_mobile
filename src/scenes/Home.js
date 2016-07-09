import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableHighlight } from 'react-native';
import app from '../../firebaseInit';
import Toolbar from '../components/toolbar';
import { Actions } from 'react-native-router-flux';

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
                // this.props.navigator.replace({name: 'Login'});
                Actions.login();
            }
        })
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
