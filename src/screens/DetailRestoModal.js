import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    Dimensions, Image, Animated, TouchableOpacity
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../global/styles'
import { Icon } from 'react-native-elements'


const Screen_Height = Dimensions.get("window").height
const Screen_Width = Dimensions.get("window").width

const DetailRestoModal = ({ isVisible, isClose, image, judul, deskripsi, harga, disc }) => {

    const modalAnimatedValue = useRef(new Animated.Value(0)).current

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    const [showFilterModal, setShowFilterModal] = useState(isVisible)
    useEffect(() => {
        if (showFilterModal) {
            Animated.spring(modalAnimatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start(() => isClose())
        }
    }, [showFilterModal])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [Screen_Height, Screen_Height - 610]
    })

    const [like, setLike] = useState(false)

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isVisible}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(10, 10, 10,0.7)'
            }}>
                <TouchableWithoutFeedback
                    onPress={() =>
                        setShowFilterModal(false)
                    }
                >
                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}>

                    </View>

                </TouchableWithoutFeedback>
                <Animated.View
                    style={{
                        position: "absolute",
                        left: 0,
                        top: modalY,
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: colors.cardbackground,
                        //transform:[{ translateY: translateY}]
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            isClose()
                        }}
                    >
                        <View>
                            <Icon
                                type='material-community'
                                name="minus"
                                size={40}
                                color={colors.grey4}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
                        <Image
                            source={{ uri: image }}
                            borderRadius={20}
                            style={{
                                height: Dimensions.get("window").width * 0.9,
                                width: Dimensions.get("window").width * 0.9,
                                borderWidth: 0.4, borderColor: colors.grey4
                            }}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>{judul}</Text>
                        <Text style={{ marginBottom: 15 }}>{deskripsi}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {disc ?
                                <Text style={{
                                    fontSize: 16, fontWeight: "bold", textDecorationLine: "line-through",
                                    textDecorationStyle: "double"
                                }}>{numberWithCommas(harga)}</Text>
                                :
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{numberWithCommas(harga)}</Text>
                            }
                            {disc ?
                                <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>{numberWithCommas((harga) * (1 - (disc / 100)))}</Text> :
                                null
                            }
                            {disc &&
                                <View style={{
                                    marginLeft: 10, backgroundColor: "red", padding: 5,
                                    borderRadius: 10
                                }}>
                                    <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>Promo</Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                            <TouchableOpacity
                                onPress={() => {
                                    setLike(ubah => !ubah)
                                }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Icon
                                        type='material-community'
                                        name='heart'
                                        size={22}
                                        color={like ? "red" : colors.grey4}
                                    />
                                    <Text style={
                                        {
                                            marginLeft: 5,
                                            fontWeight: "bold",
                                            color: like ? "black" : colors.grey4
                                        }
                                    }>Suka</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    
                                }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Icon
                                        type='material-community'
                                        name='share'
                                        size={22}
                                    />
                                    <Text style={
                                        {
                                            marginLeft: 5,
                                            fontWeight: "bold",
                                        }
                                    }>Bagikan</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* <TouchableWithoutFeedback
                                onPress={() => {
                                    isClose()
                                }}

                            >
                                <View style={{
                                    ...styles.applyButton,
                                }}>
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Tambah Pesanan</Text>
                                </View>
                            </TouchableWithoutFeedback> */}
                    </View>
                </Animated.View>
            </View>

        </Modal>
    )
}

export default DetailRestoModal

const styles = StyleSheet.create({
    applyButton: {
        borderWidth: 0.4,
        padding: 10,
        marginRight: 20,
        borderRadius: 10,
        borderColor: colors.grey4,
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
        backgroundColor: colors.buttons
    }
})