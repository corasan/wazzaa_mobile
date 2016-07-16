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
        app.database().ref('messages/one').on('value', function(snapshot) {
            let data = snapshot.val();
            // for(let i in data) {
            //     this.state.messages.push(data[i]);
            // }
            this.setState({messages: data});
        }.bind(this));
    }

    // logout = () => {
    //     AsyncStorage.removeItem('User', (result) => {
    //         if(!result) {
    //             this.props.navigator.replace({name: 'Login'});
    //         }
    //     })
    // }
    render() {
        return (
            <View style={{marginTop: 50}}>
                <MessagesList messages={this.state.messages}/>
            </View>
        )
    }
}
