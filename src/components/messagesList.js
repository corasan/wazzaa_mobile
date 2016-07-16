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
        console.log('getDataSource:', messages);
    }

    componentDidMount() {
        this.setState({dataSource: this.getDataSource(this.props.messages)});
    }

    componentWillReceiveProps(props) {
        this.setState({dataSource: this.getDataSource(props.messages)});
    }

    renderRows = (data) => {
        console.log(data);
        return (
            <View style={{marginLeft: 10, marginBottom: 15}}>
                <Text style={{fontSize: 16, fontWeight: '900'}}>{data.sender}</Text>
                <View style={styles.message}>
                    <Text style={{fontSize: 16}}>{data.text}</Text>
                </View>
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
        marginBottom: 10,
        width: 250,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 4,
        elevation: 3,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: -10},
        shadowOpacity: 0.1,
        shadowRadius: 4
    }
})
