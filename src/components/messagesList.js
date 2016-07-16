import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableHighlight, ListView } from 'react-native';
import app from '../../firebaseInit';

export default class MessagesList extends Component {
    constructor(props) {
        super(props);
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
        // this.state = {
        //     // dataSource: ds.cloneWithRows([{text: 'hi', sender: 'henry'}, {text: 'hello', sender: 'corasan'}])
        //     dataSource: ds.cloneWithRows(props.messages)
        // }
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
        console.log('2) Props:', this.props.messages);
    }

    getDataSource(messages: Array<any>): ListView.DataSource {
        if(!messages) return;
        return this.state.dataSource.cloneWithRows(messages);
    }

    componentDidMount() {
        this.setState({dataSource: this.getDataSource(this.props.messages)});
    }

    componentWillReceiveProps(props) {
        this.setState({dataSource: this.getDataSource(props.messages)});
    }

    renderRows = (data) => {
        return (
            <View style={{borderColor: 'black', borderWidth: 2, marginTop: 50}}>
                <Text>{data.sender}</Text>
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
