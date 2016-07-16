import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableHighlight } from 'react-native';
import app from '../../firebaseInit';
import MessageInput from '../components/messageInput';
import MessagesList from '../components/messagesList';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    componentWillMount() {
        app.database().ref('messages').on('value', function(data) {
            this.setState({messages: data.val()});
        }.bind(this));
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
            <View style={{marginTop: 50, flex: 1}}>
                <TouchableHighlight onPress={this.logout}>
                    <Text>Logout</Text>
                </TouchableHighlight>
                <MessagesList messages={this.state.messages}/>
                <MessageInput />
            </View>
        )
    }
}
