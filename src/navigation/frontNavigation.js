import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { createNativeStackNavigator, TransitionPresets } from '@react-navigation/native-stack'
import SignInWelcomeScreen from '../screens/authscreens/SignInWelcomeScreen'
import SignInScreen from '../screens/authscreens/SignInScreen'
import DrawerNavigator from './DrawerNavigator'
import RootClientTab from './ClientTab'
import SignUpScreen from '../screens/authscreens/SignUpScreen'
import MyAccountScreen from '../screens/MyAccountScreen'
import DetailRestoScreen from '../screens/DetailResto/DetailRestoScreen'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import CheckOutScreen from '../screens/CheckOutScreen'
import OrderDelivery from '../screens/OrderDelivery'
import FilterResultScreen from '../screens/FilterResultScreen'
import ChatScreen from '../screens/ChatScreen'

const FrontStack = createNativeStackNavigator();
export default function frontNavigation() {

    const navigation = useNavigation()
    return (
        <FrontStack.Navigator>
            <FrontStack.Screen
                name="SignInWelcomeScreen"
                component={SignInWelcomeScreen}
                options={{
                    headerShown: false
                }}
            />

            <FrontStack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    headerShown: false
                }}
            />

            <FrontStack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    headerShown: false
                }}
            />


            <FrontStack.Screen
                name="DrawerNavigator"
                component={DrawerNavigator}
                options={{
                    headerShown: false
                }}
            />

            <FrontStack.Screen
                name="RootClientTab"
                component={RootClientTab}
                options={{
                    headerShown: false
                }}
            />



            <FrontStack.Screen
                name="MyAccountScreen"
                component={MyAccountScreen}
                options={{
                    headerShown: false,
                    //animation: 'none'
                }}
            />

            <FrontStack.Screen
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
                    // //animation: 'none'
                }}
            />

            <FrontStack.Screen
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

            <FrontStack.Screen
                name="OrderDelivery"
                component={OrderDelivery}
                options={{
                    headerShown: false,

                    //animation: 'none'
                }}
            />

            <FrontStack.Screen
                name="FilterResultScreen"
                component={FilterResultScreen}
                options={{
                    headerShown: false,

                    //animation: 'none'
                }}
            />

            <FrontStack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    headerShown: false,

                    //animation: 'none'
                }}
            />


        </FrontStack.Navigator>
    )
}

