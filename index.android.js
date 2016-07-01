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
import Login from './src/scenes/Login';
import Home from './src/scenes/Home';
import Signup from './src/scenes/Signup';
import app from './firebaseInit';

class wazzaa_mobile extends Component {
    renderScene = (route, navigator) => {
        let currentUser = app.auth().currentUser;
        console.log(currentUser);
        switch(route.name) {
            case 'Login':
                return <Login navigator={navigator}/>
            case 'Home':
                return <Home navigator={navigator}/>
            case 'Signup':
                return <Signup navigator={navigator}/>
        }
    }
    render() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{name: 'Login', index: 0}}
                renderScene={this.renderScene}
                configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
            />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#EFEFEF'
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
