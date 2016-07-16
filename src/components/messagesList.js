import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableHighlight, ListView } from 'react-native';
import app from '../../firebaseInit';

export default class MessagesList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            // dataSource: ds.cloneWithRows([{text: 'hi', sender: 'henry'}, {text: 'hello', sender: 'corasan'}])
            dataSource: ds.cloneWithRows(props.messages)
        }
        console.log('2) Props:', this.props.messages);
    }

    renderRows = (data) => {
        console.log('3) Data:', this.state.dataSource);
        return (
            <View style={{borderColor: 'black', borderWidth: 2, marginTop: 50}}>
                <Text>{data.text}</Text>
            </View>
        )
    }

    render() {
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data) => this.renderRows(data)}
                enableEmptySections={true}
            />
        )
    }
}
