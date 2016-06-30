import React, { Component } from 'react';
import app from '../firebaseInit';
import { View,
    TouchableHighlight,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    AsyncStorage
} from 'react-native';
import TextInput from 'react-native-md-textinput';

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
            visible: false
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('User', (err, result) => {
            if(result) {
                this.props.navigator.replace({name: 'Home'});
            }
        });
    }
    setModalVisible = (visible) => {
        this.setState({visible: visible});
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
        }).then(() => {
            this.props.navigator.push({name: 'Home'});
        }).catch(function(error) {
            Alert.alert('Login Error', error.message);
        });
    }
    render() {
        return (
            <View style={styles.loginContainer}>
                <ScrollView>
                    <TextInput
                        wrapperStyle={{width: 272, marginBottom: 20}}
                        label="Email" highlightColor={'#1ABC9C'}
                        value={this.state.email} onChangeText={this.handleEmail}
                        inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                        labelStyle={{fontSize: 16}}
                    />
                    <TextInput
                        wrapperStyle={{width: 272, marginBottom: 20}}
                        label="Password" highlightColor={'#1ABC9C'}
                        value={this.state.password} onChangeText={this.handlePassword}
                        secureTextEntry={true}
                        inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                        labelStyle={{fontSize: 16}}
                    />
                </ScrollView>
                <TouchableHighlight style={styles.loginBtn} onPress={this.login}>
                    <Text style={{fontSize: 18, color: 'white'}}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.props.navigator.push({name: 'Home'});}}>
                    <Text style={{fontSize: 18, marginTop: 20, color: '#1ABC9C'}}>Sign up!</Text>
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
    wrapper: {
        width: 272,
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
