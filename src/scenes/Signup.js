import React, { Component } from 'react';
import app from '../../firebaseInit';
import { View,
    TouchableHighlight,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    AsyncStorage
} from 'react-native';
import TextInput from 'react-native-md-textinput';
import { Actions } from 'react-native-router-flux';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fname: '',
            lname: ''
        }
    }
    handleEmail = (email) => {
        this.setState({email});
    }
    handlePassword = (password) => {
        this.setState({password});
    }
    handleFirstName = (fname) => {
        this.setState({fname});
    }
    handleLastName = (lname) => {
        this.setState({lname});
    }

    signup = () => {
        app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((data) => {
            return wazzaaID = data.uid.substring(0,15) + '-wazzaaID';
            app.database().ref('users/' + data.uid.substring(0,10) + '-wazzaaID').set({
                first_name: this.state.fname,
                last_name: this.state.lname,
                email: this.state.email,
                wazzaaID: wazzaaID
            });
        }).then((wazzaaID) => {
            app.database().ref('users/' + wazzaaID).on('value', (snapshot) => {
                console.log(snapshot.val());
            });
        }).then(() => {
            app.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                AsyncStorage.setItem('User', JSON.stringify(data));
                this.props.navigator.push({name: 'Home'});
            }).catch(function(error) {
                Alert.alert('Login Error', error.message);
            });
        }).catch(function(error) {
            Alert.alert('Error Signin Up', error.message);
        });
    }

    render() {
        return (
            <View >
                <View style={styles.signupContainer}>
                    <Text style={styles.title}>Sign up!</Text>
                    <TextInput
                        wrapperStyle={{width: 272, marginBottom: 0}}
                        label="First Name" highlightColor={'#00BFA5'}
                        value={this.state.fname} onChangeText={this.handleFirstName}
                        inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                        labelStyle={{fontSize: 16}}
                    />
                    <TextInput
                        wrapperStyle={{width: 272, marginBottom: 15}}
                        label="Last Name" highlightColor={'#00BFA5'}
                        value={this.state.lname} onChangeText={this.handleLastName}
                        inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                        labelStyle={{fontSize: 16}}
                    />
                    <TextInput
                        wrapperStyle={{width: 272, marginBottom: 15}}
                        label="Email" highlightColor={'#00BFA5'}
                        value={this.state.email} onChangeText={this.handleEmail}
                        inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                        labelStyle={{fontSize: 16}}
                    />
                    <TextInput
                        wrapperStyle={{width: 272, marginBottom: 15}}
                        label="Password" highlightColor={'#00BFA5'}
                        value={this.state.password} onChangeText={this.handlePassword}
                        secureTextEntry={true}
                        inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                        labelStyle={{fontSize: 16}}
                    />
                    <TouchableHighlight style={styles.signupBtn} onPress={this.signup}>
                        <Text style={{fontSize: 18, color: 'white'}}>Signup</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.backBtn} onPress={Actions.login()}>
                        <Text style={{fontSize: 16, color: '#75706B'}}>Cancel</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    signupContainer: {
        marginTop: 40,
        alignItems: 'center'
    },
    wrapper: {
        width: 272,
        marginBottom: 20
    },
    signupBtn: {
        marginTop: 40,
        height: 60,
        width: 160,
        backgroundColor: '#00BFA5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2
    },
    backBtn: {
        backgroundColor: '#D1D5D8',
        height: 40,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginTop: 20
    },
    title: {
        color: '#00BFA5',
        fontSize: 26,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    }
});
