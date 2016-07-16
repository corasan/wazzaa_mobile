import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableHighlight, ListView, StyleSheet } from 'react-native';
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
            <View style={{marginLeft: 10, marginBottom: 15}}>
                <Text>{data.sender}</Text>
                <Text style={styles.message}>{data.text}</Text>
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

const styles = StyleSheet.create({
    message: {
        marginTop: 5,
        width: 250,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid'
    }
})
