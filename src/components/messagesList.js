import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableHighlight, ListView } from 'react-native';
import app from '../../firebaseInit';

export default class MessagesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
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
