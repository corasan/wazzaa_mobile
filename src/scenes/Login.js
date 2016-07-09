import React, { Component } from 'react';
import app from '../../firebaseInit';
import { View,
    TouchableHighlight,
    Text,
    StyleSheet,
    Alert,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import TextInput from 'react-native-md-textinput';
import Overlay from 'react-native-overlay';
import { Actions } from 'react-native-router-flux';

export default class Login extends Component {
    state: {
        email: String,
        password: String
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            animating: true
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('User', (err, result) => {
            if(result) {
                this.setState({animating: true});
                setTimeout(() => {
                    this.setState({animating: !this.state.animating});
                    // this.props.navigator.push({name: 'Home'});
                    Actions.home();
                }, 2000);
            } else {
                this.setState({animating: !this.state.animating});
            }
        });
    }

    handleEmail = (email) => {
        this.setState({email});
    }
    handlePassword = (password) => {
        this.setState({password});
    }

    login = () => {
        app.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((data) => {
            AsyncStorage.setItem('User', JSON.stringify(data));
            // this.props.navigator.push({name: 'Home'});
            Actions.home();
        }).catch(function(error) {
            Alert.alert('Login Error', error.message);
        });
    }

    signupScene = () => {
        Actions.signup();
    }

    render() {
        return (
            <View style={styles.loginContainer}>
                <Text style={styles.title}>Wazzaa!</Text>
                <TextInput
                    wrapperStyle={{width: 272, marginBottom: 20}}
                    label="Email" highlightColor={'#00BFA5'}
                    value={this.state.email} onChangeText={this.handleEmail}
                    inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                    labelStyle={{fontSize: 16}}
                />
                <TextInput
                    wrapperStyle={{width: 272, marginBottom: 20}}
                    label="Password" highlightColor={'#00BFA5'}
                    value={this.state.password} onChangeText={this.handlePassword}
                    secureTextEntry={true}
                    inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                    labelStyle={{fontSize: 16}}
                />
                <TouchableHighlight style={styles.loginBtn} onPress={this.login}>
                    <Text style={{fontSize: 18, color: 'white'}}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.signupScene}>
                    <Text style={{fontSize: 18, marginTop: 40, color: '#00BFA5'}}>Sign up!</Text>
                </TouchableHighlight>

                <ActivityIndicator size="large" color="#00BFA5" animating={this.state.animating}
                    style={{marginTop: -270}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        marginTop: 70,
        alignItems: 'center'
    },
    wrapper: {
        width: 272,
        marginBottom: 20
    },
    loginBtn: {
        marginTop: 40,
        height: 60,
        width: 160,
        backgroundColor: '#00BFA5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2
    },
    title: {
        color: '#00BFA5',
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginBottom: 30
    }
});
