import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground,
    TouchableWithoutFeedback
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AlertShow from '../Components/AlertShow'
import Modal from 'react-native-modal'
import { domain } from '../Utilities/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import startTabs from './StartMainTabs';

import loginBG from '../Asserts/login_screen.svg';
import tickIcon from '../Asserts/tick_icon.svg';
import showIcon from '../Asserts/show.svg';
import hideIcon from '../Asserts/hide.svg';
import popup_bg from '../Asserts/popup_bg.svg';


const greenColor = "#48DC9F"
const grayColor = 'gray'

let passwordArray = [];
export default class loginScreen extends Component {

    constructor() {
        super()
    }

    state = {
        email: '',
        password: '',
        isLoading: false,
        rememberPasswordColor: greenColor,
        showAlert: false,
        alertText: '',
        showPassword: true,
        passwordIcon: hideIcon
    }


    async componentDidMount() {
        let yohoo = await AsyncStorage.getItem('data');
        if (yohoo != null) {
            passwordArray = JSON.parse(yohoo);
        }
    }


    rememberPasswordAction = async () => {
        if (this.state.rememberPasswordColor == greenColor) await this.setState({ rememberPasswordColor: grayColor })
        else await this.setState({ rememberPasswordColor: greenColor })
    }


    signUp = () => {

        Navigation.push(this.props.componentId, {
            component: {
                name: 'SignupScreen',
            }
        });

    }


    hideAlert = async () => {
        await this.setState({ showAlert: false })
    }


    validation = async () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (reg.test(this.state.email) === false) {
            await this.setState({ alertText: 'Please enter your email.', showAlert: true })
            return false;
        } else {
            if (this.state.password.length < 5) {
                await this.setState({ alertText: 'Password must be greater then 5 digit.', showAlert: true })
                return false;
            } else {

                this.loginApi();

            }
        }
    }


    loginApi = () => {

        // hit api
        this.setState({ isLoading: true });
        const url = domain + '/api/Robin_Money/login.php';

        const apiBody = {
            "email": this.state.email,
            "password": this.state.password
        }

        fetch(url, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            // body: data,
            body: JSON.stringify(apiBody),

        })
            .then((response) => response.text())
            .then(async (responseText) => {

                let responseData = JSON.parse(responseText);

                console.log(responseData, "scnz  qqaa");
                if (responseData.code == 200) {
                    await AsyncStorage.setItem('@userToken', responseData.token);
                    if (this.state.rememberPasswordColor === greenColor) {
                        let userCredentails = [...passwordArray, {
                            'email': this.state.email,
                            'password': this.state.password
                        }]

                        await AsyncStorage.setItem('data', JSON.stringify(userCredentails));
                    }
                    startTabs();
                } else {
                    //Alert.alert('Alert', responseData.message);
                    await this.setState({ alertText: responseData.message, showAlert: true })
                }
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                console.log(error, 'error from APi');
            });

        // hit api

    }



    showPasswordAction = async () => {
        if (this.state.showPassword) await this.setState({ showPassword: false, passwordIcon: showIcon })
        else await this.setState({ showPassword: true, passwordIcon: hideIcon })
    }


    passwordAutoFill = async (text) => {
        console.log(passwordArray, 'function called')
        passwordArray.map((item, index) => {
            console.log(item.email, index, text)
            if (text === item.email) this.setState({ password: item.password })
            else console.log('not match')
        })
    }


    render() {

        return (

            <SafeAreaView style={styles.container}>

                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content" />

                <Modal isVisible={this.state.isLoading}>
                    <ActivityIndicator animating={this.state.isLoading} size="large" color={greenColor} />
                </Modal>


                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    <ImageBackground style={styles.container} source={loginBG}>


                        <View style={styles.mainLogo} />

                        <View style={styles.contentContainer}>

                            <TextInput style={styles.inputField}
                                placeholder="e - mail"
                                selectionColor={'green'}
                                placeholderTextColor="#8E9494"
                                onChangeText={(pass) => {
                                    this.passwordAutoFill(pass)
                                    this.setState({ email: pass.trim() })
                                }} />

                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={{ width: '85%', color: '#000' }}
                                    placeholder="password"
                                    selectionColor={'green'}
                                    placeholderTextColor="#8E9494"
                                    value={this.state.password}
                                    secureTextEntry={this.state.showPassword}
                                    onChangeText={(pass) => { this.setState({ password: pass.trim() }) }} />

                                <TouchableWithoutFeedback onPress={this.showPasswordAction}>
                                    <View style={{ width: '15%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={this.state.passwordIcon} />
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>

                            <TouchableOpacity activeOpacity={1} style={styles.rememberPasswordContainer} onPress={this.rememberPasswordAction}>
                                <View style={{ height: 25, width: 25, backgroundColor: this.state.rememberPasswordColor, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                    <Image source={tickIcon} />
                                </View>
                                <Text style={styles.rememberPasswordText}>Remember Password</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.validation}>
                                <View style={{ marginTop: 8, backgroundColor: greenColor, height: 55, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#fff', fontSize: 19, fontWeight: 'bold' }}>Log In</Text>
                                </View>
                            </TouchableOpacity>


                            <View style={{ height: 1, width: "100%", backgroundColor: "#000", marginTop: 20, }}></View>
                            <View
                                activeOpacity={1.0}
                                style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderRadius: 17, height: 35, width: 35, padding: 6, marginTop: -18, alignSelf: 'center' }} >
                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '700' }}>OR</Text>
                            </View>


                            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                                <Text style={styles.rememberPasswordText}>Still don't have account?</Text>
                                <Text style={styles.actionText} onPress={this.signUp}> Sign up</Text>
                            </View>

                        </View>

                    </ImageBackground>

                    <Modal isVisible={this.state.showAlert} style={{ alignItems: 'center' }}>

                        <View style={{ height: 220, width: '60%', backgroundColor: '#fff', borderRadius: 10 }}>

                            <Image style={{ width: '100%', height: 100 }} source={popup_bg} />

                            <Text style={styles.stringText}>{this.state.alertText}</Text>

                            <TouchableOpacity onPress={this.hideAlert} style={{ marginBottom: 40 }}>
                                <View style={{ width: '80%', marginTop: 20, backgroundColor: greenColor, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Ok</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </Modal>

                </KeyboardAwareScrollView>


            </SafeAreaView>

        )


    }


}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    mainLogo: {
        height: 130,
        marginTop: 70,
        marginRight: 20,
        alignSelf: 'center',
        marginBottom: 40

    },
    inputField: {
        height: 55,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: greenColor,
        paddingLeft: 10,
        fontSize: 16,
        color: '#000'
    },
    passwordContainer: {
        height: 55,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: greenColor,
        paddingLeft: 10,
        fontSize: 16,
        flexDirection: 'row'
    },
    contentContainer: {
        marginHorizontal: 20,
    },
    rememberPasswordContainer: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginTop: 0,
        marginLeft: 5
    },
    rememberPasswordText: {
        fontSize: 16,
        paddingLeft: 10,
        color: '#000'
    },
    socialContainer: {
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    socailIcon: {
        width: 40,
        height: 40,
    },
    stringText: {
        color: "#000",
        fontWeight: '300',
        textAlign: 'center',
        fontSize: 15
    },
    actionText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
        textAlign: "center"
    }

});