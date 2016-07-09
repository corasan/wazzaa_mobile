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
import { Scene, Router } from 'react-native-router-flux';
import Login from './src/scenes/Login';
import Home from './src/scenes/Home';
import Signup from './src/scenes/Signup';
import app from './firebaseInit';

class wazzaa_mobile extends Component {
    renderScene = (route, navigator) => {
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
            // <Navigator
            //     style={styles.container}
            //     initialRoute={{name: 'Login', index: 0}}
            //     renderScene={this.renderScene}
            //     configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
            // />
            <Router>
                <Scene key="root" hideNavBar>
                    <Scene key="login" component={Login} />
                    <Scene key="signup" component={Signup} />
                    <Scene key="home" title="Wazzaa" component={Home} tabs={true} hideBackImage={true}/>
                </Scene>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#FAFAFA'
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
