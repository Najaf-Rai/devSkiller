import { Navigation } from "react-native-navigation";

import loginScreen from "./loginScreen";
import SignupScreen from "./SignupScreen";

import TermConditionScreen from "./TermConditionScreen";
import mainScreen from "./mainScreen"; 

import HomeScreen from "./HomeScreen"; 
import ConfigScreen from "./ConfigScreen"; 

export function registerScreens() {

    Navigation.registerComponent('loginScreen', () => loginScreen);
    Navigation.registerComponent('SignupScreen', () => SignupScreen);

    Navigation.registerComponent('TermConditionScreen', () => TermConditionScreen);
    Navigation.registerComponent('mainScreen', () => mainScreen);

    Navigation.registerComponent('HomeScreen', () => HomeScreen);
    Navigation.registerComponent('ConfigScreen', () => ConfigScreen);

    
}