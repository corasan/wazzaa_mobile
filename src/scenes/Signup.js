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
            app.database().ref('users/' + data.uid.substring(0,10) + '-wazzaaID').set({
                first_name: this.state.fname,
                last_name: this.state.lname,
                email: this.state.email,
                wazzaaID: data.uid.substring(0,10) + '-wazzaaID'
            });
            return wazzaaID = data.uid.substring(0,10) + '-wazzaaID';
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
                    <TextInput
                        wrapperStyle={{width: 272, marginBottom: 15}}
                        label="First Name" highlightColor={'#1ABC9C'}
                        value={this.state.fname} onChangeText={this.handleFirstName}
                        inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                        labelStyle={{fontSize: 16}}
                    />
                    <TextInput
                        wrapperStyle={{width: 272, marginBottom: 15}}
                        label="Last Name" highlightColor={'#1ABC9C'}
                        value={this.state.lname} onChangeText={this.handleLastName}
                        inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                        labelStyle={{fontSize: 16}}
                    />
                    <TextInput
                        wrapperStyle={{width: 272, marginBottom: 15}}
                        label="Email" highlightColor={'#1ABC9C'}
                        value={this.state.email} onChangeText={this.handleEmail}
                        inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                        labelStyle={{fontSize: 16}}
                    />
                    <TextInput
                        wrapperStyle={{width: 272, marginBottom: 15}}
                        label="Password" highlightColor={'#1ABC9C'}
                        value={this.state.password} onChangeText={this.handlePassword}
                        secureTextEntry={true}
                        inputStyle={{paddingBottom: 2, paddingTop: 2, fontSize: 18}}
                        labelStyle={{fontSize: 16}}
                    />
                    <TouchableHighlight style={styles.signupBtn} onPress={this.signup}>
                        <Text style={{fontSize: 18, color: 'white'}}>Signup</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.backBtn} onPress={() => {this.props.navigator.jumpBack();}}>
                        <Text style={{fontSize: 16, color: '#75706B'}}>Cancel</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    signupContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    wrapper: {
        width: 272,
        marginBottom: 20
    },
    signupBtn: {
        marginTop: 40,
        height: 60,
        width: 180,
        backgroundColor: '#1ABC9C',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    backBtn: {
        // fontSize: 18,
        // marginTop: 40,
        // color: 'white',
        backgroundColor: '#D1D5D8',
        height: 40,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 20
    }
});