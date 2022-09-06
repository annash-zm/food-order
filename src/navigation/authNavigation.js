import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'

import { createNativeStackNavigator, TransitionPresets } from '@react-navigation/native-stack'
import SignInWelcomeScreen from '../screens/authscreens/SignInWelcomeScreen'
import SignInScreen from '../screens/authscreens/SignInScreen'
import HomeScreen from '../screens/HomeScreen'
import RootClientTab from './ClientTab'

import DrawerNavigator from './DrawerNavigator'
import SignUpScreen from '../screens/authscreens/SignUpScreen'
import MyAccountScreen from '../screens/MyAccountScreen'
import DetailRestoScreen from '../screens/DetailResto/DetailRestoScreen'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import CheckOutScreen from '../screens/CheckOutScreen'
import OrderDelivery from '../screens/OrderDelivery'
import SearchScreen from '../screens/SearchScreen'
import FilterResultScreen from '../screens/FilterResultScreen'
import ChatScreen from '../screens/ChatScreen'
import BottomSheetScreen from '../screens/BottomSheetScreen'

const AuthStack = createNativeStackNavigator();

export default function authNavigation() {

    const navigation = useNavigation()
    return (
        <AuthStack.Navigator>

            <AuthStack.Screen
                name="DrawerNavigator"
                component={DrawerNavigator}
                options={{
                    headerShown: false,
                }}
            />


            <AuthStack.Screen
                name="RootClientTab"
                component={RootClientTab}
                options={{
                    headerShown: false
                }}
            />


            <AuthStack.Screen
                name="SignInWelcomeScreen"
                component={SignInWelcomeScreen}
                options={{
                    headerShown: false,
                    //animation: 'none'
                }}
            />

            <AuthStack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    headerShown: false,
                    //animation: 'none'
                }}
            />

            <AuthStack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    headerShown: false,
                    //animation: 'none'
                }}
            />



            <AuthStack.Screen
                name="MyAccountScreen"
                component={MyAccountScreen}
                options={{
                    headerShown: false,

                    //animation: 'none'
                }}
            />

            <AuthStack.Screen
                name="DetailRestoScreen"
                component={DetailRestoScreen}
                options={{
                    headerShown: false,
                    // headerLeft: () => (
                    //     <TouchableOpacity onPress={() => {
                    //         navigation.goBack()
                    //     }}>
                    //         <Icon
                    //             type='material-community'
                    //             name="arrow-left"
                    //         />
                    //     </TouchableOpacity>
                    // ),
                    // headerRight: () => (
                    //     <View style={{ flexDirection: "row" }}>
                    //         <Icon
                    //             type="material-community"
                    //             name='magnify'
                    //         />
                    //         <Icon
                    //             type='material-community'
                    //             name='share-variant'
                    //         />
                    //     </View>
                    // ),
                    // headerTitle: ""
                    //animation: 'none'
                }}
            />

            <AuthStack.Screen
                name="CheckOutScreen"
                component={CheckOutScreen}
                options={{
                    headerShown: false,
                    // headerLeft: () => (
                    //     <TouchableOpacity onPress={() => {
                    //         navigation.goBack()
                    //     }}>
                    //         <Icon
                    //             type='material-community'
                    //             name="arrow-left"
                    //         />
                    //     </TouchableOpacity>
                    // ),
                    // headerRight: () => (
                    //     <View style={{ flexDirection: "row" }}>
                    //         <Icon
                    //             type="material-community"
                    //             name='magnify'
                    //         />
                    //         <Icon
                    //             type='material-community'
                    //             name='share-variant'
                    //         />
                    //     </View>
                    // ),
                    // headerTitle: "Check Out"
                    // //animation: 'none'
                }}
            />

            <AuthStack.Screen
                name="OrderDelivery"
                component={OrderDelivery}
                options={{
                    headerShown: false,

                    //animation: 'none'
                }}
            />

            <AuthStack.Screen
                name="FilterResultScreen"
                component={FilterResultScreen}
                options={{
                    headerShown: false,

                    //animation: 'none'
                }}
            />

            <AuthStack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    headerShown: false,

                    //animation: 'none'
                }}
            />

            <AuthStack.Screen
                name="BottomSheetScreen"
                component={BottomSheetScreen}
                options={{
                    headerShown: false,

                    //animation: 'none'
                }}
            />

        </AuthStack.Navigator>
    )
}

