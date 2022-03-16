import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator,
    FlatList,
    Text,
    Dimensions
} from 'react-native';
import { Image as Imagee } from 'react-native-elements';
import Imageee from 'react-native-scalable-image';

import heartIcon from '../Asserts/heart.png';
import shareIcon from '../Asserts/share.png';
import commentIcon from '../Asserts/comment.png';
import yellowStarIcon from '../Asserts/yellowstar.png';

class PhotoPost extends Component {

    render() {

        return (

            <TouchableWithoutFeedback>

                <View style={{ marginBottom: 20 }}>

                    {/* header container */}

                    <View style={{ flexDirection: 'row', height: 60, marginTop: 10, width: '100%' }}>

                        <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>

                            <Imagee source={{ uri: this.props.item.profile_image }}
                                PlaceholderContent={<ActivityIndicator animating={true} size="small" color={"#D6D543"} />}
                                placeholderStyle={{ backgroundColor: null }}
                                transition={false}
                                style={{
                                    marginLeft: 15,
                                    width: 50,
                                    height: 50,
                                    borderRadius: 30,
                                    alignSelf: 'center',
                                }}
                            ></Imagee></View>

                        <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{
                                width: '100%',
                                alignSelf: 'center',
                                color: 'black',
                                paddingLeft: 10,
                                fontSize: 14,
                                fontFamily: 'Raleway-SemiBold'

                            }}>{this.props.item.name}</Text>

                            <Text style={{
                                width: '100%',
                                alignSelf: 'center',
                                color: '#BABABA',
                                paddingLeft: 10,
                                fontSize: 12,
                                fontFamily: 'Raleway-Regular'
                            }}>{this.props.createdAt}</Text>
                        </View>

                    </View>

                    {/* photo container */}
                    <TouchableWithoutFeedback >
                        <View style={{ backgroundColor: '#FFF', marginTop: 10 }}>

                            <Imageee
                                width={Dimensions.get('window').width} // height will be calculated automatically
                                source={{ uri: this.props.item.image }} />

                        </View>
                    </TouchableWithoutFeedback>
                    {/* comment and favorite view */}

                    <View style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 17 }}>

                        <Text style={{
                            width: '87%',
                            alignSelf: 'center',
                            color: '#AAAAAA',
                            fontSize: 14,
                            fontFamily: 'Raleway-Regular'
                        }}>Comments...</Text>

                        {/* total images count view */}
                        {this.props.item.photos.length > 1 &&
                            <TouchableWithoutFeedback>
                                <View style={{ position: 'absolute', right: 0, top: -40, backgroundColor: 'black', width: 60, height: 25, borderRadius: 10, opacity: 0.6, }}>
                                    <Text style={{ color: '#fff', fontFamily: 'Raleway-Regular', fontSize: 14, alignSelf: 'center' }}>1/5</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                        <TouchableWithoutFeedback>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                alignSelf: 'flex-end'
                            }}>
                                <Image source={yellowStarIcon}
                                    style={{
                                        width: 18,
                                        height: 18,
                                        alignSelf: 'center',
                                    }}
                                ></Image>


                                <Text style={{
                                    alignSelf: 'center',
                                    color: '#AAAAAA',
                                    fontSize: 12,
                                    fontFamily: 'Raleway-Regular'
                                }}>Favorite</Text>

                            </View>

                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 17 }}>


                        <Text style={{
                            alignSelf: 'center',
                            color: '#AAAAAA',
                            fontSize: 14,
                            marginRight: 10,
                            fontFamily: 'Raleway-Regular'
                        }}>01 Me gusta</Text>

                        <Text style={{
                            alignSelf: 'center',
                            color: '#AAAAAA',
                            fontSize: 14,
                            fontFamily: 'Raleway-Regular'
                        }}>Comentarios</Text>


                    </View>

                    <View style={{ height: 1, backgroundColor: '#B3B3B3', marginTop: 3, marginHorizontal: 17 }}></View>

                    {/* like share comment container */}

                    <View style={{ marginHorizontal: 18, flexDirection: 'row', height: 40 }}>

                        <TouchableWithoutFeedback>

                            <View style={{ marginLeft: 5, flexDirection: 'row', width: '33%' }}>



                                <Image source={heartIcon}
                                    style={{
                                        width: 19,
                                        height: 18,
                                        alignSelf: 'center',
                                        marginTop: 5
                                    }}
                                ></Image>


                                <Text style={{
                                    alignSelf: 'center',
                                    color: '#AAAAAA',
                                    paddingLeft: 10,
                                    fontSize: 14,
                                    fontFamily: 'Raleway-Regular',

                                }}>Me gusta</Text>


                                <View style={{ width: 1, backgroundColor: '#B3B3B3', marginLeft: 15, marginVertical: 8 }}></View>
                            </View>

                        </TouchableWithoutFeedback>


                        <TouchableWithoutFeedback>

                            <View style={{ flexDirection: 'row', width: '35%' }}>
                                <Image source={shareIcon}
                                    style={{
                                        width: 18,
                                        height: 18,
                                        marginLeft: 15,
                                        alignSelf: 'center',
                                    }}
                                ></Image>

                                <Text style={{
                                    alignSelf: 'center',
                                    paddingLeft: 10,
                                    color: '#AAAAAA',
                                    fontSize: 14,
                                    fontFamily: 'Raleway-Regular',
                                }}>Compartir</Text>

                                <View style={{ width: 1, backgroundColor: '#B3B3B3', marginLeft: 13, marginVertical: 8 }}></View>
                            </View>

                        </TouchableWithoutFeedback>


                        <View style={{ flexDirection: 'row', width: '33%', alignItems: 'center', justifyContent: 'center' }}>

                            <Image source={commentIcon}
                                style={{
                                    width: 18,
                                    height: 18,
                                    marginTop: 5
                                }}
                            ></Image>

                            <Text style={{
                                color: '#AAAAAA',
                                fontSize: 14,
                                fontFamily: 'Raleway-Regular',
                                paddingLeft: 10
                            }}>Comentario</Text>

                        </View>

                    </View>


                </View>

            </TouchableWithoutFeedback >

        );
    }
}

const styles = StyleSheet.create({

});

export default PhotoPost;
