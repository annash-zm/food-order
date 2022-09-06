import {
    StyleSheet, Text, View, TouchableOpacity, Alert,
    AsyncStorage, ImageBackground
} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'

import { Avatar, Button, Icon, Switch } from 'react-native-elements'
import { colors } from '../global/styles'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
//import RestaurantMapScreen from '../screens/RestaurantMapScreen'

import { auth, db } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native'

import { doc, getDocs, query, where, collection } from 'firebase/firestore'

import { AppContext } from '../context/app-context'


const DrawerContent = (props) => {
    const [cek, setCek] = useState('')
    const [nama, setNama] = useState('')

    const context = useContext(AppContext)

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
            .signOut()
            .then( () => {
                Alert.alert(
                    "Sign Out",
                    "Apakah Anda yakin untuk keluar ?",
                    [
                        {
                            text: "Batal",
                            //onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        {
                            text: "OK", onPress: async() => {
                                await AsyncStorage.removeItem('isLoggedIn')
                                await AsyncStorage.removeItem('email')
                                await AsyncStorage.removeItem('simpanNama')
                                await AsyncStorage.removeItem('simpanHp')
                                navigation.replace('SignInScreen')
                            }
                        }
                    ]
                );
            })
            .catch(error => alert(error.message))
    }

    const check = async () => {
        const val = await AsyncStorage.getItem('email')
        setCek(val)
        const val2 = await AsyncStorage.getItem("simpanNama")
        setNama(val2)
    }

    useEffect(() => {
        check()
    }, [])


    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View 
                //source={{uri:colors.background}}
                style={{ borderBottomWidth:0.2, borderColor:colors.grey3, marginBottom:10, paddingBottom:10 }}>
                    <View style={{ paddingVertical: 15, paddingLeft: 20, flexDirection: "row", alignItems: "center" }}>
                        <Avatar
                            rounded
                            avatarStyle={styles.avatar}
                            source={require("../assets/pp/pp.jpg")}
                            size={60}
                        />

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{...styles.nama, color: context.darkTheme ? "white" : "black"}}>{nama}</Text>
                            <Text style={{ fontSize: 12, color: context.darkTheme ? "white" : "black" }}>{cek}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-evenly", paddingBottom: 5 }}>

                        <View style={{ flexDirection: 'row', marginTop: 0, }}>
                            <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}  >
                                <Text style={{ fontWeight: 'bold', color: context.darkTheme ? "white" : "black", fontSize: 18 }}>1</Text>
                                <Text style={{ color: context.darkTheme ? "white" : "black", fontSize: 14 }} >My Favorites</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 0 }}>
                            <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}  >
                                <Text style={{ fontWeight: 'bold', color: context.darkTheme ? "white" : "black", fontSize: 18 }}>3</Text>
                                <Text style={{ color: context.darkTheme ? "white" : "black", fontSize: 14 }} >My Cart</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <DrawerItemList {...props} />

                <DrawerItem
                    label="Payment"
                    icon={({ color, size }) => (
                        <Icon
                            type="material-community"
                            name="credit-card-outline"
                            color={color}
                            size={size}
                        />
                    )}
                />


                <DrawerItem
                    label="Promotions"
                    icon={({ color, size }) => (
                        <Icon
                            type="material-community"
                            name="tag-heart"
                            color={color}
                            size={size}
                        />
                    )}
                />



                <DrawerItem
                    label="Settings"
                    icon={({ color, size }) => (
                        <Icon
                            type="material-community"
                            name="cog-outline"
                            color={color}
                            size={size}
                        />
                    )}
                />



                <DrawerItem
                    label="Help"
                    icon={({ color, size }) => (
                        <Icon
                            type="material-community"
                            name="help-circle-outline"
                            color={color}
                            size={size}
                        />
                    )}
                />

                <View style={{ borderTopWidth: 0.2, borderTopColor: colors.grey3 }}>
                    <Text style={styles.preferences}>Preferences</Text>

                    <View style={styles.switchText}>
                        <Text style={styles.darkthemeText}>Dark Theme</Text>
                        <View style={{ paddingRight: 10 }}>
                            <Switch
                                value={context.darkTheme}
                                color={colors.buttons}
                                onValueChange={val => {
                                    context.setDarkTheme(val)
                                }}
                            />
                        </View>
                    </View>

                </View>

                <TouchableOpacity
                    onPress={() => { handleSignOut() }}
                >
                    <View style={{
                        flexDirection: "row",
                        marginHorizontal: 19, paddingVertical: 10,
                        alignItems: "center"
                    }}>

                        <Icon
                            type="material-community"
                            name="logout-variant"
                            color={colors.grey3}
                        />
                        <Text style={{color: context.darkTheme ? colors.grey3 : "black" , 
                        marginHorizontal: 30, fontSize: 14, fontWeight:"bold" }}>Sign Out</Text>
                    </View>
                </TouchableOpacity>

            </DrawerContentScrollView>

        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    avatar: {
        borderWidth: 1,
        borderColor: colors.cardbackground

    },

    nama: {
        fontWeight: "bold",
        fontSize: 16
    },

    preferences: {
        fontSize: 16,
        color: colors.grey2,
        paddingTop: 10,
        paddingLeft: 20,
    },

    switchText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingVertical: 5,
        paddingRight: 10
    },
    darkthemeText: {
        fontSize: 16,
        color: colors.grey2,
        paddingTop: 10,
        paddingLeft: 0,
        fontWeight: "bold"
    }
})