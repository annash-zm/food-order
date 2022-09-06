import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import HomeScreen from '../screens/HomeScreen'
import { colors } from '../global/styles'
import SearchScreen from '../screens/SearchScreen'
import MyOrdersScreen from '../screens/MyOrdersScreen'
import MyAccountScreen from '../screens/MyAccountScreen'


const ClientTabs = createBottomTabNavigator();

const RootClientTab = () => {
    return (
        <ClientTabs.Navigator
            screenOptions={() => ({
                headerShown: false,
                tabBarStyle: {
                    paddingTop:5,
                },
                tabBarActiveTintColor:colors.buttons,
                tabBarLabelStyle:{marginBottom:3, fontSize:12}
            })}
        >


            <ClientTabs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={
                    {
                        headerShown: false,
                        tabBarLabel: "Home",
                        tabBarShowLabel: true,
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name='home'
                                type='material'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }
            />



            <ClientTabs.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={
                    {
                        headerShown: false,
                        tabBarLabel: "Search",
                        tabBarShowLabel: true,
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name='search'
                                type='material'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }
            />

            

            <ClientTabs.Screen
                name="MyOrdersScreen"
                component={MyOrdersScreen}
                options={
                    {
                        tabBarBadge: 3,
                        headerShown: false,
                        tabBarLabel: "Orders",
                        tabBarShowLabel: true,
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name='clipboard-text-outline'
                                type='material-community'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }
            />



            <ClientTabs.Screen
                name="MyAccount"
                component={MyAccountScreen}
                options={
                    {
                        headerShown: false,
                        tabBarLabel: "Account",
                        tabBarShowLabel: true,
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name='person'
                                type='material'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }
            />
        </ClientTabs.Navigator>
    )
}

export default RootClientTab

const styles = StyleSheet.create({})