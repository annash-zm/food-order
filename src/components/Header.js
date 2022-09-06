import React from 'react';

import {View, Text, StyleSheet, Dimensions, ImageBackground} from 'react-native'
import { colors, parameters } from '../global/styles';

import { Icon } from 'react-native-elements'

export default function Header({title,type,navigation}){
    return (
        <View style = {styles.header}
        //source={{ uri: colors.background }}
        >
            {/* <View style = {{marginLeft : 20}}>
                <Icon 
                    type = "material-community"
                    name = "arrow-left"
                    color = {colors.cardbackground}
                    size = {28}
                    onPress = {()=>{
                        navigation.goBack()
                    }}
                />
            </View> */}
            <View>
                <Text style = {styles.title}>
                    {title}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    header : {
        paddingVertical:20,
    },

    title : {
        color : "black",
        fontSize : 21,
        fontWeight : "bold",
        marginLeft : 30
    }
}) 