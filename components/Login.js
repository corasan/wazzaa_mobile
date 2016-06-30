import React, { Component } from 'react';
import { Actions, AsyncStorage } from 'react-native-router-flux';
import app from '../firebaseInit';
import { View,
    TouchableHighlight,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';

export default class Login extends Component {
    state: {
        email: String,
        password: String
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    componentWillMount() {
        console.log("HEYYY");
    }
    handleEmail = (email) => {
        this.setState({email});
    }
    handlePassword = (password) => {
        this.setState({password});
    }
    navigate() {
        this.props.navigator.push({
            name: 'Home'
        });
    }
    login = () => {
        app.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( (data) => {
            this.props.navigator.push({name: 'Home'});
            // AsyncStorage.setItem()
        }).catch(function(error) {
            console.log(error.message);
        });
    }
    render() {
        return (
            <View style={styles.loginContainer}>
                <TextInput style={styles.input} placeholder="Email" value={this.state.email} onChangeText={this.handleEmail}/>
                <TextInput style={styles.input} placeholder="Password" value={this.state.password}
                    onChangeText={this.handlePassword}
                    secureTextEntry={true}
                />
                <TouchableHighlight style={styles.loginBtn} onPress={this.login}>
                    <Text style={{fontSize: 18, color: 'white'}}>Login</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        marginTop: 80,
        alignItems: 'center'
    },
    input: {
        width: 272,
        paddingLeft: 8,
        paddingBottom: 5,
        fontSize: 18,
        marginBottom: 20
    },
    loginBtn: {
        marginTop: 30,
        height: 50,
        width: 180,
        backgroundColor: '#1ABC9C',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
