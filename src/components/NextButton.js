import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React,{useEffect,useRef, useState} from 'react'
import Svg,{G,Circle} from 'react-native-svg'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../global/styles'

const NextButton = ({percentage, scrollTo}) => {
    const size = 128
    const strokeWidth =2;
    const center = size/2;
    const radius = size/2-strokeWidth/2
    const circumference = 2*Math.PI*radius

    const progressAnimation = useRef(new Animated.Value(0)).current
    const progressRef = useRef(null)

    const [das,setDas] = useState(0)

    const animation = (toValue)=>{
      return Animated.timing(progressAnimation, {
        toValue,
        duration:100,
        useNativeDriver:true
      }).start()
    }

    useEffect (()=>{
        animation(percentage)
    },[percentage])

    useEffect (()=>{
      progressAnimation.addListener((value)=>{
        const strokeDashoffset = circumference- (circumference*value.value)/100;
        setDas(strokeDashoffset)
      },[percentage])
    })

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G origin={center} rotation="-90">
            <Circle 
                stroke="#E6E7E8" 
                cx={center} 
                cy={center} 
                r={radius}  
                strokeWidth={strokeWidth}
            />
            <Circle 
                stroke="#F4338F"
                cx = {center}
                cy = {center}
                r = {radius}
                strokeWidth = {strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={das}
            />
          </G>
      </Svg>
      <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
          <AntDesign name='arrowright' size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

export default NextButton

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    button : {
      position:"absolute",
      backgroundColor:colors.buttons,
      borderRadius : 100,
      padding:20
    }
})