/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Login from './components/Login';
import Home from './components/Home';

class wazzaa_mobile extends Component {
    renderScene = (route, navigator) => {
        switch(route.name) {
            case 'Login':
                return <Login navigator={navigator}/>
            case 'Home':
                return <Home navigator={navigator}/>
        }
    }
    render() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{name: 'Login', index: 0}}
                renderScene={this.renderScene}
            />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('wazzaa_mobile', () => wazzaa_mobile);
