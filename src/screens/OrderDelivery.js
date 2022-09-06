import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    useWindowDimensions,
    Image,
    TouchableWithoutFeedback,
    //ScrollView,
    SafeAreaView,
    Platform,
} from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
//import MapViewDirections from 'react-native-maps-directions'
import { colors, screen_scale, numberWithCommas } from '../global/styles'
import { Avatar, Badge, Icon } from 'react-native-elements'
import { AppContext } from '../context/app-context'


import Animated,
{
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring, SlideInUp, SlideOutUp
} from 'react-native-reanimated'
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler'


const SPRING_CONFIG = {
    damping: 200,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
}


const OrderDelivery = ({ navigation, route }) => {
    const { nama, data, waktu, price, disk, restoLoc, locate } = route.params

    const context = useContext(AppContext)
    const dimension = useWindowDimensions()

    const [showButton, setShowButton] = useState(true)
    const top = useSharedValue(
        dimension.height
    )

    const diskon = (price) => {
        if (disk) {
          return price * (1 - disk / 100)
        }
        else {
          return price
        }
      }

    const style = useAnimatedStyle(() => {
        return {
            top: withSpring(top.value, SPRING_CONFIG)
        }
    })

    const dismissed = (ok) => {
        setShowButton(ok)
    }

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, contex) {
            contex.startTop = top.value

        },
        onActive(event, contex) {
            top.value = contex.startTop + event.translationY
            
        },
        onEnd(e) {
            if (e.translationY>0) {
                top.value = dimension.height*0.58
                runOnJS(dismissed)(true)
            }
            else {
                top.value = screen_scale.height * 0.06
                runOnJS(dismissed)(false)
            }
        }
    })

    useEffect(() => {
        top.value = withSpring(
            dimension.height*0.58,
            SPRING_CONFIG)
        dismissed(true)
    }, [])

    const myMap = useRef();

    const calculateAngel = (loc1, loc2) => {
        let startLat = loc1.latitude + 0.01
        let startLng = loc1.longitude - 0.026
        let endLat = loc2.latitude
        let endLng = loc2.longitude
        let dx = endLat - startLat
        let dy = endLng - startLng

        return Math.atan2(dy, dx) * 180 / Math.PI
    }

    return (
        <>
            <View style={styles.container}>
                <MapView
                    ref={myMap}
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    showsMyLocationButton={false}
                    initialRegion={{
                        latitude: ((restoLoc.latitude + locate.coords.latitude) - 0.03) / 2,
                        longitude: (restoLoc.longitude + locate.coords.longitude) / 2,
                        latitudeDelta: Math.abs(restoLoc.latitude - locate.coords.latitude) * 3,
                        longitudeDelta: Math.abs(restoLoc.longitude - locate.coords.longitude) * 3
                    }}
                >
                    {/* <MapViewDirections 
                        origin={locate.coords}
                        destination={restoLoc}
                        apikey = "AIzaSyCTzTZfNUPesS8sYPJCSyXI70Q1IIINKuw"
                        strokeWidth={5}
                        strokeColor={colors.buttons}
                        optimizeWaypoints={true}
                    /> */}
                    <Marker
                        coordinate={restoLoc}
                    >
                        <Image
                            source={require("../assets/pin/restaurant-icon-png-4892.png")}
                            style={{ width: 40, height: 40 }}
                            resizeMode="cover"
                            borderRadius={50}
                        />

                    </Marker>

                    <Marker
                        coordinate={{
                            latitude: restoLoc.latitude + 0.01,
                            longitude: restoLoc.longitude - 0.026
                        }}
                        rotation={calculateAngel(restoLoc, restoLoc)}
                    >
                        <Image
                            source={require("../assets/pin/pin_bike.png")}
                            style={{ width: 50, height: 50 }}
                            resizeMode="contain"
                        />

                    </Marker>

                    <Marker
                        coordinate={locate.coords}
                        title="iki omahmu cok"
                    >
                        <Image
                            source={require("../assets/pin/pin_user.png")}
                            style={{ width: 35, height: 35 }}
                            resizeMode="contain"
                        />

                    </Marker>


                </MapView>

            </View>
            <PanGestureHandler
                onGestureEvent={gestureHandler}
                //activeOffsetY={[-10, 10]}
            >

                <Animated.View
                    style={[styles.bottomSheet, style]}
                >
                    {showButton &&
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginBottom: 10 }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    context.setRefresh(true)
                                    navigation.navigate("HomeScreen")
                                }}
                            >
                                <View style={{ backgroundColor: "white", borderRadius: 30, padding: 5 }}>
                                    <Icon
                                        type='material-community'
                                        name='arrow-left'
                                        size={27}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    myMap.current.animateToRegion({
                                        latitude: (restoLoc.latitude+(restoLoc.latitude+0.01))/2,
                                        longitude: (restoLoc.longitude+(restoLoc.longitude-0.026))/2,
                                        latitudeDelta: Math.abs(restoLoc.latitude-(restoLoc.latitude+0.01))*2,
                                        longitudeDelta: Math.abs(restoLoc.longitude-(restoLoc.longitude-0.026))*2,
                                    }, 500)

                                }}
                            >
                                <View style={{ backgroundColor: "white", borderRadius: 30, padding: 5 }}>
                                    <Icon
                                        type='material-community'
                                        name='crosshairs-gps'
                                        size={27}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    }
                    <View style={{
                        backgroundColor: "white",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 20, height: dimension.height
                    }}>
                        <Icon
                            type='material-community'
                            name='minus'
                            size={30}
                            color={colors.grey4}
                        />
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 15
                        }}>
                            <Icon
                                type='material-community'
                                name="cellphone-text"
                                size={35}
                                color={colors.buttons}
                            />
                            <View>
                                <Text style={{ fontWeight: "bold", color: colors.buttons }}>Pesananmu sudah dikonfirmasi</Text>
                                <Text style={{ fontSize: 11 }}>Driver Menuju Restoran</Text>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Annash ZM</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon
                                        type='material-community'
                                        name='phone'
                                        color={colors.buttons}
                                    />
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            navigation.navigate("ChatScreen")
                                        }}
                                    >
                                        <View style={{flexDirection:"row"}}>
                                            <Icon
                                                type='material-community'
                                                name='message-text-outline'
                                                style={{ marginLeft: 10 }}
                                                color={colors.buttons}
                                            />
                                            <Badge
                                                status='error'
                                                containerStyle={{marginLeft:-8}}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={{ marginTop: 15, flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ justifyContent: "space-between", flexDirection: "column" }}>
                                    <Text style={{ fontWeight: "bold", flex: 1 }}>RJ78876G</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon
                                            type='material-community'
                                            name='thermometer'
                                            size={16}
                                            color={colors.lightblue}
                                        />
                                        <Text style={{ marginBottom: 5, fontSize: 12, marginLeft: 5, width: dimension.width * 0.5 }}>Suhu tubuh normal</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon
                                            type='material-community'
                                            name='medical-bag'
                                            size={16}
                                            color={colors.lightblue}
                                        />
                                        <Text style={{ fontSize: 12, marginLeft: 5, width: dimension.width * 0.5 }}>Sudah aman, driver sudah divaksin</Text>
                                    </View>
                                </View>
                                <Avatar
                                    avatarStyle={{ borderRadius: 10 }}
                                    source={require("../assets/pp/pp.jpg")}
                                    size={80}
                                />
                            </View>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.card}>
                                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}>
                                    <Icon
                                        type='material-community'
                                        name='motorbike'
                                        color="red"
                                    />
                                    <Text style={{ fontWeight: "bold", marginLeft: 5, fontSize: 16 }}>Rincian Pengiriman</Text>
                                </View>

                                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                                    <View>
                                        <Icon
                                            type='material-community'
                                            name='silverware-fork-knife'
                                            color="red"
                                            size={17}
                                        />

                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12 }}>Alamat Restoran</Text>
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{nama}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <View>
                                        <Icon
                                            type='material-community'
                                            name='record-circle'
                                            color="red"
                                            size={17}
                                        />

                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12 }}>Alamat Pengiriman</Text>
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Mini Cluster Jatisari</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={styles.card}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Icon
                                        type='material-community'
                                        name='wallet'
                                        color={colors.lightblue}
                                    />
                                    <Text style={{ flex: 1, fontWeight: "bold", marginLeft: 10 }}>DanaKu</Text>
                                    <Text style={{ fontWeight: "bold" }}>{numberWithCommas(diskon(context.tampungTotal) + 13000)}</Text>
                                </View>
                            </View>

                            <View style={styles.card}>
                                <Text style={{ fontWeight: "bold", marginLeft: 5 }}>Pesanan</Text>
                                <View style={{ paddingHorizontal: 5 }}>
                                    {context.saveResto.map((item, index) => (
                                        <View key={index} style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text>{item.namaResto}</Text>
                                            <Text>{item.jumlah}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={{ ...styles.card, marginBottom: 100 }}>
                                <Text style={{ fontWeight: "bold", marginLeft: 5, marginBottom: 5 }}>Ringkasan Pembayaran</Text>
                                <View style={{ paddingHorizontal: 5 }}>
                                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text>Harga</Text>
                                        <Text>{numberWithCommas(diskon(context.tampungTotal))}</Text>
                                    </View>
                                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text>Ongkir</Text>
                                        <Text>10.000</Text>
                                    </View>
                                    <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text>Biaya Aplikasi</Text>
                                        <Text>3.000</Text>
                                    </View>

                                    <View style={{ marginTop: 15, flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ fontWeight: "bold" }}>Total Pembayaran</Text>
                                        <Text style={{ fontWeight: "bold" }}>{numberWithCommas(diskon(context.tampungTotal) + 10000 + 3000)}</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </Animated.View>
            </PanGestureHandler>
            {showButton &&
                <Animated.View entering={SlideInUp} exiting={SlideOutUp} style={styles.topView}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Icon
                            type='material-community'
                            name='google-maps'
                            color="red"
                        />
                        <Text style={{ flex: 1, marginLeft: 5 }}>
                            lat: {locate.coords.latitude} long:{locate.coords.longitude.toString().substring(0,3)+"..."}
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>
                            21 min
                        </Text>
                    </View>
                </Animated.View>
            }
        </>
    )
}

export default OrderDelivery

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomSheet: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,

        elevation: 5,
    },
    card: {
        padding: 12,
        borderWidth: 0.2,
        borderColor: colors.grey4,
        borderRadius: 10,
        marginBottom: 20
    },
    topView: {
        position: "absolute",
        top: Platform.OS === "ios" ? Dimensions.get("window").height * 0.06 : Dimensions.get("window").height * 0.04,
        left: 20,
        right: 20,
        padding: 10,
        backgroundColor: colors.cardbackground,
        borderRadius: 20
    }
})