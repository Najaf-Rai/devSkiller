import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from "react-native-navigation";
const selectedColor = "#705BDE"
const unSelectedColor = "#7D7D7D"
const startTabs = () => {

  Navigation.setDefaultOptions({

    animations: {
      dismissModal: { enabled: false },
      pop: { enabled: false },
      push: { enabled: false },
      setRoot: { enabled: false },
      showModal: { enabled: false },
    },

    topBar: {
      visible: false,
      drawBehind: true,
      animated: true,
    },
    statusBar: {
      style: "dark",
      backgroundColor: '#FFF',
    },
    layout: { orientation: ["portrait"] }
  });

  allTabsroot = {

    root: {
      bottomTabs: {

        children: [
          {
            stack: {
              children: [{
                component: {
                  name: 'HomeScreen',
                  passProps: {
                    text: ''
                  },

                }
              }],
              options: {
                bottomTab: {
                  text: 'Feeds',
                  icon: require('../Asserts/homeIcon.svg'),
                  selectedTextColor: selectedColor,
                  selectedIconColor: selectedColor,
                  selectedIcon: require('../Asserts/selectedHomeIcon.svg'),
                }
              }
            }
          },
          {
            stack: {
              children: [{
                component: {
                  name: 'ConfigScreen',
                  passProps: {
                    text: 'This is tab 3'
                  },
                }
              }],
              options: {
                bottomTab: {
                  text: 'Setting',
                  icon: require('../Asserts/config.svg'),
                  selectedTextColor: selectedColor,
                  selectedIconColor: selectedColor,
                  selectedIcon: require('../Asserts/selectedSettingsIcon.svg'),
                }
              }
            }
          },
        ],
        options: {
          bottomTabs: {
            visible: true,
            animate: false,
            translucent: false,
            fontFamily: 'Helvetica',
            fontSize: 5,
            titleDisplayMode: 'alwaysShow',
            backgroundColor: "white",
            drawBehind: true,
          }
        }
      }
    }
  };


  Navigation.setRoot(allTabsroot);


};



export default startTabs;