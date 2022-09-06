import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, TouchableOpacity, } from 'react-native'
import React, { useRef, useEffect, useContext } from 'react'
import { colors } from '../global/styles'

import Animated, { BounceInDown, BounceOutDown, SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { AppContext } from '../context/app-context'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const FloatingCheckOut = ({ countItem, tampungTotal, restoName, harga, disc, time, restoLoc }) => {
    const context = useContext(AppContext)
    const navigation = useNavigation()  
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const diskon = (price) => {
        if (disc) {
          return price * (1 - disc / 100)
        }
        else {
          return price
        }
      }

    return (
        <TouchableWithoutFeedback
            onPress={()=>{
                context.setRefresh(false)
                navigation.navigate("CheckOutScreen",
                {
                    nama : restoName, 
                    data:context.saveResto, 
                    waktu:time, 
                    price:context.tampungTotal, 
                    disk : disc,
                    restoLoc: restoLoc
                })
            }}
        >
        <Animated.View entering={SlideInDown.duration(500)} exiting={SlideOutDown.duration(500)} style={styles.floatButton}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View>
                    <Text style={{ color: "white", fontWeight: "bold", marginBottom: 5 }}>{countItem} Item
                        {disc &&
                            <Text style={{ color: "white" }}> (Anda Hemat {numberWithCommas(context.tampungTotal - harga)})</Text>
                        }
                    </Text>
                    <Text style={{ color: "white", fontSize: 12 }}>
                        Pesan Antar dari {restoName.length > 20 ? restoName.substring(0, 20) + "..." : restoName}</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                    <Text style={{ fontWeight: "bold", color: "white", marginRight:2 }}>
                        {numberWithCommas(diskon(context.tampungTotal))}
                    </Text>
                    <Icon 
                        type='material-community'
                        name="shopping"
                        color="white"
                        size={15}
                    />
                </View>
            </View>
        </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default FloatingCheckOut

const styles = StyleSheet.create({
    floatButton: {
        position: "absolute",
        backgroundColor: colors.buttons,
        bottom: 40,
        left:30,
        right: 30,
        padding: 10,
        borderRadius: 10,
        width: width * 0.85,
    }
})