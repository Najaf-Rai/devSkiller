import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, FlatList, StatusBar, TouchableOpacity, Alert, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { domain } from '../Utilities/api'
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhotoPost from '../Components/PhotoPost';


const greenColor = "#48DC9F"

export default class HomeScreen extends Component {

    constructor() {
        super()
    }

    state = {
        isLoading: false,
        feedList : []
    }

    async componentDidMount() {
        await this.setState({ isLoading: true })

    }


    render() {

        return (

            <SafeAreaView style={styles.container}>

                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content" />

                <View style={styles.container}>

                    <ScrollView>

                        <View style={{ marginHorizontal: 20 }}>


                        <FlatList
                                style={{ marginBottom: 20 }}
                                data={this.state.feedList}
                                onEndReachedThreshold={0.2}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) =>

                                    <PhotoPost
                                        item={item}
                                        index={index}
                                        />
                                }
                            />

                        </View>
                    </ScrollView>

                </View>

            </SafeAreaView>

        )


    }


}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1,

    },
    stringText: {
        color: "#000",
        fontWeight: '300',
        textAlign: 'center',
        fontSize: 15
    },

});