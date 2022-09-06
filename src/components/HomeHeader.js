import { TouchableOpacity, StyleSheet, Text, View,
AsyncStorage, ImageBackground, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { colors, parameters } from '../global/styles'
import { Icon, withBadge } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../context/app-context'

const HomeHeader = () => {

    //const BadgeIcon = withBadge(3)(Icon)
    const navigation = useNavigation();

    const context = useContext(AppContext)


    return (
        <View style = {{...styles.header, 
            backgroundColor : context.darkTheme ? "black" : colors.cardbackground}}
        //source={{ uri: colors.background}}
        >
            <View style = {{alignItems:"center",justifyContent:"center",marginLeft:15}}>
                <TouchableOpacity onPress = {()=> navigation.openDrawer()}>
                <Icon 
                    type='material-community'
                    name = "sort-variant"
                    color = { context.darkTheme ? "white" : "black" }
                    size = {25}
                />
                </TouchableOpacity>
            </View>

            <View style={{
                flex:1,
                marginHorizontal:10,
                alignItems:"center",
                flexDirection:"row"
            }}>
                <Icon 
                    type='material-community'
                    name='google-maps'
                    size={18}
                    color="red"
                />
                <Text style={{
                    fontWeight:"bold",
                    color: context.darkTheme ? "white" : "black" 
                }}>Jatiasih, Bekasi</Text>
            </View>

            <View style = {{alignItems:"center",justifyContent:"center",marginRight:25}}>
                <Icon 
                    type = "material-community"
                    name = "bell-outline"
                    size = {25}
                    color = { context.darkTheme ? "white" : "black" }
                />
            </View>
        </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    header :{
        flexDirection : "row",
        height : Dimensions.get("window").height*0.07,
        justifyContent : "space-between",
        alignItems:"center",
        borderBottomWidth:0.2,
        borderBottomColor:colors.grey4
    }
})