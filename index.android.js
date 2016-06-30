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
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Login from './components/Login';
import Home from './components/Home';

class wazzaa_mobile extends Component {
  render() {
    return (
      <Router sceneStyle={styles.container}>
          <Scene key="login" component={Login} title="Login"/>
          <Scene key="home" component={Home}/>
      </Router>
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
