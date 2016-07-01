import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableHighlight } from 'react-native';
import app from '../../firebaseInit';
import TabBar from '../components/tabBar';

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
                {/*<TabBar/>*/}
                <Text>{this.state.email}</Text>
                <TouchableHighlight onPress={this.logout}>
                    <Text>Logout</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
