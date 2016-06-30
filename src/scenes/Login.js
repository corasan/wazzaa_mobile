import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import LoginForm from '../components/loginForm';

export default class Login extends Component {
    componentWillMount() {
        AsyncStorage.getItem('User', (err, result) => {
            if(result) {
                this.props.navigator.replace({name: 'Home'});
            }
        });
    }

    render() {
        return <LoginForm/>
    }
}
