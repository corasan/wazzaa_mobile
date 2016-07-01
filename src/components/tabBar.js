import React, { Component } from 'react';
import app from '../../firebaseInit';
import { View,
    TouchableHighlight,
    Text,
    StyleSheet,
    Alert,
    AsyncStorage,
    ScrollView
} from 'react-native';
import ScrollableTabView, { DefaultTabBar} from 'react-native-scrollable-tab-view';

export default class TabBar extends Component {
    render() {
        return (
            <ScrollableTabView renderTabBar={() => { <DefaultTabBar/> }}>
                <Text tabLabel='Tab #1'>My</Text>
                <Text tabLabel='Tab #2'>favorite</Text>
                <Text tabLabel='Tab #3'>project</Text>
            </ScrollableTabView>
        )
    }
}

// const styles = StyleSheet.create({
//     tab: {
//         backgroundColor: 'white',
//         height: 60
//     }
// });
