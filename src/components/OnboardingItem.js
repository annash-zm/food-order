import { StyleSheet, Text, View, useWindowDimensions, Image, Animated } from 'react-native'
import React from 'react'
import { colors } from '../global/styles'

const OnboardingItem = ({item}) => {
    const {width} = useWindowDimensions()

  return (
    <View style={[styles.container,{width}]}>
      <Image 
            source={item.image}
            style={[styles.image,{width, resizeMode:"contain"}]}
      />

      <View style={{flex:0.1}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
    container : {
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    image : {
        flex:0.7,
        justifyContent:"center"
    },
    title : {
        fontWeight:"800",
        fontSize:20,
        marginBottom:10,
        color:colors.buttons,
        textAlign:"center"
    },
    description : {
        fontWeight:"300",
        color:"#62656B",
        textAlign:"center",
        paddingHorizontal:20
    }
})